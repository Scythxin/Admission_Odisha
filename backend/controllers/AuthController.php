<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;

class AuthController extends Controller
{
    public $enableCsrfValidation = false;

    public function beforeAction($action)
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");

        if (Yii::$app->request->isOptions) {
            exit(0);
        }

        Yii::$app->response->format = Response::FORMAT_JSON;
        return parent::beforeAction($action);
    }

    // REGISTER + OTP SEND
    public function actionRegister()
    {
        $data = json_decode(Yii::$app->request->getRawBody(), true);

        if (!$data || !isset($data['email']) || !isset($data['password'])) {
            return ["status" => "error", "message" => "Required fields missing"];
        }

        $existing = Yii::$app->db->createCommand("
            SELECT * FROM users WHERE email = :email
        ")->bindValue(':email', $data['email'])->queryOne();

        if ($existing) {
            return ["status" => "error", "message" => "Email already registered"];
        }

        Yii::$app->db->createCommand()->insert('users', [
            'name' => $data['name'] ?? null,
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'password' => password_hash($data['password'], PASSWORD_DEFAULT),
            'city' => $data['city'] ?? null,
            'created_at' => date('Y-m-d H:i:s'),
            'is_verified' => 0,
            'login_count' => 0,
            'is_status' => 1
        ])->execute();

        return ["status" => "success", "message" => "Registered Successfully"];
    }

    // VERIFY OTP
    public function actionVerifyOtp()
    {
        $data = json_decode(Yii::$app->request->getRawBody(), true);

        $otpData = Yii::$app->db->createCommand("
            SELECT * FROM otp_verification 
            WHERE contact = :email 
            ORDER BY id DESC LIMIT 1
        ")->bindValue(':email', $data['email'])->queryOne();

        if (!$otpData) return ["status"=>"error","message"=>"OTP not found"];

        if ($otpData['is_used']==1) return ["status"=>"error","message"=>"Used OTP"];

        if (strtotime($otpData['expires_at']) < time())
            return ["status"=>"error","message"=>"Expired OTP"];

        if ($otpData['otp'] != $data['otp'])
            return ["status"=>"error","message"=>"Wrong OTP"];

        Yii::$app->db->createCommand()->update('users', [
            'is_verified'=>1
        ], ['email'=>$data['email']])->execute();

        Yii::$app->db->createCommand()->update('otp_verification', [
            'is_used' => 1
        ], ['id' => $otpData['id']])->execute();

        // Get user for login response
        $user = Yii::$app->db->createCommand("SELECT * FROM users WHERE email = :email")
            ->bindValue(':email', $data['email'])->queryOne();

        // Create login log and token
        $token = bin2hex(random_bytes(32));
        Yii::$app->db->createCommand()->insert('user_login', [
            'user_id' => $user['id'],
            'login_time' => date('Y-m-d H:i:s'),
            'ip_address' => Yii::$app->request->userIP,
            'device' => 'Desktop',
            'browser' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown',
            'token' => $token,
            'created_at' => date('Y-m-d H:i:s')
        ])->execute();

        return [
            "status" => "success",
            "token" => $token,
            "user" => [
                "id" => $user['id'],
                "name" => $user['name'],
                "email" => $user['email']
            ]
        ];
    }

    // LOGIN
    public function actionLogin()
    {
        $data = json_decode(Yii::$app->request->getRawBody(), true);

        if (!$data || !isset($data['email']) || !isset($data['password'])) {
            return ["status" => "error", "message" => "Email and password are required"];
        }

        $user = Yii::$app->db->createCommand("
            SELECT * FROM users WHERE email = :email
        ")->bindValue(':email', $data['email'])->queryOne();

        if (!$user) {
            return ["status" => "error", "message" => "Account not found. Please register first."];
        }

        if (!password_verify($data['password'], $user['password'])) {
            return ["status" => "error", "message" => "Invalid credentials"];
        }

        if ($user['is_verified'] == 0) {
            // Generate and send new OTP
            $otp = rand(100000, 999999);
            Yii::$app->db->createCommand()->insert('otp_verification', [
                'contact' => $user['email'],
                'otp' => (string)$otp,
                'expires_at' => date('Y-m-d H:i:s', strtotime('+5 minutes')),
                'created_at' => date('Y-m-d H:i:s'),
                'is_used' => 0,
                'is_status' => 1
            ])->execute();

            // Move email sending to after the response is sent to the user to speed up the process
            Yii::$app->response->on(Response::EVENT_AFTER_SEND, function() use ($user, $otp) {
                if (function_exists('fastcgi_finish_request')) {
                    fastcgi_finish_request();
                }
                $this->sendOtpEmail($user['email'], $otp);
            });

            return [
                "status" => "needs_verification", 
                "message" => "Account not verified. OTP sent to your email.",
                "email" => $user['email']
            ];
        }

        // Update User Table
        Yii::$app->db->createCommand()->update('users', [
            'last_login' => date('Y-m-d H:i:s'),
            'login_count' => $user['login_count'] + 1,
        ], ['id' => $user['id']])->execute();

        // Log the login attempt
        $token = bin2hex(random_bytes(32));
        Yii::$app->db->createCommand()->insert('user_login', [
            'user_id' => $user['id'],
            'login_time' => date('Y-m-d H:i:s'),
            'ip_address' => Yii::$app->request->userIP,
            'device' => 'Desktop', // Simplified for now
            'browser' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown',
            'token' => $token,
            'created_at' => date('Y-m-d H:i:s')
        ])->execute();

        return [
            "status" => "success",
            "message" => "Login successful",
            "token" => $token,
            "user" => [
                "id" => $user['id'],
                "name" => $user['name'],
                "email" => $user['email']
            ]
        ];
    }

    /**
     * Helper method to send OTP email
     */
    private function sendOtpEmail($toEmail, $otp)
    {
        try {
            return Yii::$app->mailer->compose()
                ->setTo($toEmail)
                ->setFrom([Yii::$app->params['senderEmail'] => Yii::$app->params['senderName']])
                ->setSubject('Your OTP Verification Code - Admission Odisha')
                ->setHtmlBody("
                    <div style='font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1a202c;'>
                        <div style='text-align: center; margin-bottom: 30px;'>
                            <h1 style='color: #4f46e5; margin: 0; font-size: 28px; font-weight: 800;'>Admission Odisha</h1>
                            <p style='color: #718096; margin-top: 8px;'>Secure Account Verification</p>
                        </div>
                        
                        <div style='background-color: #f8fafc; border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px; border: 1px dashed #cbd5e0;'>
                            <p style='margin-bottom: 20px; font-size: 16px; color: #4a5568;'>Your one-time password (OTP) is:</p>
                            <div style='font-size: 42px; font-weight: 800; letter-spacing: 10px; color: #1a202c; font-family: monospace;'>$otp</div>
                            <p style='margin-top: 20px; font-size: 14px; color: #e53e3e; font-weight: 600;'>Valid for 5 minutes only</p>
                        </div>

                        <div style='line-height: 1.6; font-size: 15px;'>
                            <p>Hello,</p>
                            <p>To complete your verification, please enter the code above in the application. This code will ensure that only you can access your account.</p>
                            <p style='color: #718096; font-size: 14px; margin-top: 20px;'>If you didn't request this code, you can safely ignore this email.</p>
                        </div>

                        <hr style='border: 0; border-top: 1px solid #edf2f7; margin: 30px 0;' />
                        
                        <div style='text-align: center; font-size: 12px; color: #a0aec0;'>
                            <p>&copy; " . date('Y') . " Admission Odisha. All rights reserved.</p>
                            <p>Bhubaneswar, Odisha, India</p>
                        </div>
                    </div>
                ")
                ->send();
        } catch (\Exception $e) {
            Yii::error("Failed to send OTP email to $toEmail: " . $e->getMessage());
            return false;
        }
    }
}
