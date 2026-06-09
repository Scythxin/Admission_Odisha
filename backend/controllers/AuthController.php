<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class AuthController extends Controller
{
    public $enableCsrfValidation = false;

    public function beforeAction($action)
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");

        if (Yii::$app->request->isOptions) {
            exit(0);
        }

        Yii::$app->response->format = Response::FORMAT_JSON;

        return parent::beforeAction($action);
    }

    // =========================
    // REGISTER
    // =========================
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
            return [
                "status" => "error",
                "message" => "Email already registered"
            ];
        }

        // HASH PASSWORD
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

        // INSERT USER
        Yii::$app->db->createCommand()->insert('users', [
            'name' => $data['name'] ?? null,
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'password' => password_hash($data['password'], PASSWORD_DEFAULT),
            'city' => $data['city'] ?? null,
            'created_at' => date('Y-m-d H:i:s'),
            'created_by' => null,
            'updated_at' => null,
            'updated_by' => null,
            'is_status' => 1
        ])->execute();

        return [
            "status" => "success",
            "message" => "Registration successful"
        ];

    }

    // =========================
    // LOGIN
    // =========================
    public function actionLogin()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        // FIND USER
        $user = Yii::$app->db->createCommand(
            "SELECT * FROM users 
             WHERE email = :email 
             AND is_status = 1"
        )
            ->bindValue(':email', $email)
            ->queryOne();

        // USER NOT FOUND
        if (!$user) {
            return [
                "status" => "error",
                "message" => "Account not found"
            ];
        }

        // PASSWORD VERIFY
        if (!password_verify($password, $user['password'])) {
            return [
                "status" => "error",
                "message" => "Invalid password"
            ];
        }

        // GENERATE OTP
        $otp = rand(100000, 999999);

        // SAVE OTP
        Yii::$app->db->createCommand()->insert('otp_verification', [
            'contact' => $email,
            'otp' => $otp,
            'expires_at' => date('Y-m-d H:i:s', strtotime('+5 minutes')),
            'is_used' => 0,

            'created_at' => date('Y-m-d H:i:s'),
            'created_by' => null,
            'updated_at' => null,
            'updated_by' => null,
            'is_status' => 1
        ])->execute();
        $mail = new PHPMailer(true);

        try {

            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;

            $mail->Username = 'kajalthakur0520@gmail.com';
            $mail->Password = 'jnwt fmwa enrz hfsb';

            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('yourgmail@gmail.com', 'Admission Odisha');

            $mail->addAddress($email);

            $mail->isHTML(true);

            $mail->Subject = 'Your OTP Verification Code';

            $mail->Body = "
        <h2>Your OTP is:</h2>
        <h1>$otp</h1>
        <p>This OTP expires in 5 minutes.</p>
    ";

            $mail->send();

        } catch (Exception $e) {

            return [
                "status" => "error",
                "message" => "Email sending failed"
            ];
        }

        // TEMPORARY RETURN OTP
        // REMOVE OTP IN PRODUCTION
        return [
            "status" => "needs_verification",
            "message" => "OTP sent successfully",
            "otp" => $otp
        ];
    }

    // =========================
    // VERIFY OTP
    // =========================
    public function actionVerifyOtp()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $email = $data['email'] ?? '';
        $otp = $data['otp'] ?? '';

        // FIND OTP
        $otpData = Yii::$app->db->createCommand(
            "SELECT * FROM otp_verification
             WHERE contact = :email
             AND otp = :otp
             AND is_used = 0
             ORDER BY id DESC
             LIMIT 1"
        )
            ->bindValue(':email', $email)
            ->bindValue(':otp', $otp)
            ->queryOne();

        // INVALID OTP
        if (!$otpData) {
            return [
                "status" => "error",
                "message" => "Invalid OTP"
            ];
        }

        // OTP EXPIRED
        if (strtotime($otpData['expires_at']) < time()) {
            return [
                "status" => "error",
                "message" => "OTP expired"
            ];
        }

        // MARK OTP USED
        Yii::$app->db->createCommand()->update(
            'otp_verification',
            [
                'is_used' => 1,
                'updated_at' => date('Y-m-d H:i:s')
            ],
            ['id' => $otpData['id']]
        )->execute();

        // GET USER
        $user = Yii::$app->db->createCommand(
            "SELECT * FROM users WHERE email = :email"
        )
            ->bindValue(':email', $email)
            ->queryOne();

        if (!$user) {
            Yii::$app->response->statusCode = 404;
            return [
                "status" => "error",
                "message" => "User not found"
            ];
        }

        // GENERATE TOKEN
        $token = bin2hex(random_bytes(32));

        // OPTIONAL LOGIN HISTORY
        // ================= DEVICE INFO =================

        $userAgent = Yii::$app->request->userAgent;

        // DEVICE TYPE
        $device = "Desktop";

        if (preg_match('/mobile/i', $userAgent)) {
            $device = "Mobile";
        }

        // BROWSER
        $browser = "Unknown";

        if (strpos($userAgent, 'Chrome') !== false) {
            $browser = "Chrome";
        } elseif (strpos($userAgent, 'Firefox') !== false) {
            $browser = "Firefox";
        } elseif (strpos($userAgent, 'Safari') !== false) {
            $browser = "Safari";
        } elseif (strpos($userAgent, 'Edge') !== false) {
            $browser = "Edge";
        }

        // OS
        $os = "Unknown";

        if (strpos($userAgent, 'Windows') !== false) {
            $os = "Windows";
        } elseif (strpos($userAgent, 'Linux') !== false) {
            $os = "Linux";
        } elseif (strpos($userAgent, 'Mac') !== false) {
            $os = "Mac";
        } elseif (strpos($userAgent, 'Android') !== false) {
            $os = "Android";
        } elseif (strpos($userAgent, 'iPhone') !== false) {
            $os = "iOS";
        }

        // ================= SAVE LOGIN =================

        Yii::$app->db->createCommand()->insert('user_login', [

            'user_id' => $user['id'],

            'login_time' => date('Y-m-d H:i:s'),

            'ip_address' => Yii::$app->request->userIP,

            'device' => $device,
            'browser' => $browser,
            'os' => $os,

            'token' => $token,

            'created_at' => date('Y-m-d H:i:s'),
            'created_by' => null,

            'updated_at' => null,
            'updated_by' => null,

            'is_status' => 1

        ])->execute();
        return [
            "status" => "success",
            "message" => "OTP verified successfully",
            "token" => $token,
            "user" => [
                "id" => $user['id'],
                "name" => $user['name'],
                "email" => $user['email'],
                "phone" => $user['phone'],
                "city" => $user['city'],
                "gender" => $user['gender'],
                "dob" => $user['dob'],
                "is_admin" => (int) $user['is_admin'],
                "profile_photo" => $user['profile_photo'] ?? null
            ]
        ];
    }

    // =========================
    // GET PROFILE
    // =========================
    public function actionGetProfile()
    {
        $token = Yii::$app->request->headers->get('Authorization');

        if (!$token) {
            return [
                "status" => "error",
                "message" => "Token missing"
            ];
        }

        $userLogin = Yii::$app->db->createCommand("SELECT user_id FROM user_login WHERE token = :token")
            ->bindValue(':token', $token)->queryOne();

        if (!$userLogin) {
            return [
                "status" => "error",
                "message" => "Invalid or expired session"
            ];
        }

        $user = \app\models\User::findOne($userLogin['user_id']);
        if (!$user) {
            return [
                "status" => "error",
                "message" => "User not found"
            ];
        }

        return [
            "status" => "success",
            "user" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "phone" => $user->phone,
                "city" => $user->city,
                "gender" => $user->gender,
                "dob" => $user->dob,
                "is_admin" => (int) $user->is_admin,
                "profile_photo" => $user->profile_photo
            ]
        ];
    }

    // =========================
    // UPDATE PROFILE
    // =========================
    public function actionUpdateProfile()
    {
        $token = Yii::$app->request->headers->get('Authorization');

        if (!$token) {
            return [
                "status" => "error",
                "message" => "Token missing"
            ];
        }

        $userLogin = Yii::$app->db->createCommand("SELECT user_id FROM user_login WHERE token = :token")
            ->bindValue(':token', $token)->queryOne();

        if (!$userLogin) {
            return [
                "status" => "error",
                "message" => "Invalid or expired session"
            ];
        }

        $user = \app\models\User::findOne($userLogin['user_id']);
        if (!$user) {
            return [
                "status" => "error",
                "message" => "User not found"
            ];
        }

        $data = json_decode(Yii::$app->request->getRawBody(), true);
        if (!$data) {
            return [
                "status" => "error",
                "message" => "Invalid request body"
            ];
        }

        // Validate unique email (excluding current user)
        if (isset($data['email']) && $data['email'] !== $user->email) {
            $existingEmail = \app\models\User::find()->where(['email' => $data['email']])->andWhere(['!=', 'id', $user->id])->one();
            if ($existingEmail) {
                return [
                    "status" => "error",
                    "message" => "Email already registered by another user"
                ];
            }
            $user->email = $data['email'];
        }

        // Validate unique phone (excluding current user)
        if (isset($data['phone']) && $data['phone'] !== $user->phone) {
            $existingPhone = \app\models\User::find()->where(['phone' => $data['phone']])->andWhere(['!=', 'id', $user->id])->one();
            if ($existingPhone) {
                return [
                    "status" => "error",
                    "message" => "Mobile number already registered by another user"
                ];
            }
            $user->phone = $data['phone'];
        }

        if (isset($data['name'])) {
            $user->name = $data['name'];
        }
        if (isset($data['city'])) {
            $user->city = $data['city'];
        }
        if (isset($data['gender'])) {
            $user->gender = $data['gender'];
        }
        if (isset($data['dob'])) {
            $user->dob = empty($data['dob']) ? null : $data['dob'];
        }

        if (array_key_exists('profile_photo', $data)) {
            $user->profile_photo = empty($data['profile_photo']) ? null : $data['profile_photo'];
        }

        $user->updated_at = date('Y-m-d H:i:s');

        if ($user->save()) {
            return [
                "status" => "success",
                "message" => "Profile updated successfully",
                "user" => [
                    "id" => $user->id,
                    "name" => $user->name,
                    "email" => $user->email,
                    "phone" => $user->phone,
                    "city" => $user->city,
                    "gender" => $user->gender,
                    "dob" => $user->dob,
                    "is_admin" => (int) $user->is_admin,
                    "profile_photo" => $user->profile_photo
                ]
            ];
        } else {
            $errors = $user->getFirstErrors();
            $errorMessage = reset($errors) ?: "Failed to update profile";
            return [
                "status" => "error",
                "message" => $errorMessage
            ];
        }
    }

    // =========================
    // CHANGE PASSWORD
    // =========================
    public function actionChangePassword()
    {
        $token = Yii::$app->request->headers->get('Authorization');

        if (!$token) {
            return [
                "status" => "error",
                "message" => "Token missing"
            ];
        }

        $userLogin = Yii::$app->db->createCommand("SELECT user_id FROM user_login WHERE token = :token")
            ->bindValue(':token', $token)->queryOne();

        if (!$userLogin) {
            return [
                "status" => "error",
                "message" => "Invalid or expired session"
            ];
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $currentPassword = $data['current_password'] ?? '';
        $newPassword = $data['new_password'] ?? '';

        if (empty($currentPassword) || empty($newPassword)) {
            return [
                "status" => "error",
                "message" => "Current password and new password are required"
            ];
        }

        $user = Yii::$app->db->createCommand("SELECT * FROM users WHERE id = :id")
            ->bindValue(':id', $userLogin['user_id'])->queryOne();

        if (!$user) {
            return [
                "status" => "error",
                "message" => "User not found"
            ];
        }

        if (!password_verify($currentPassword, $user['password'])) {
            return [
                "status" => "error",
                "message" => "Incorrect current password"
            ];
        }

        Yii::$app->db->createCommand()->update(
            'users',
            [
                'password' => password_hash($newPassword, PASSWORD_DEFAULT),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            ['id' => $user['id']]
        )->execute();

        return [
            "status" => "success",
            "message" => "Password updated successfully"
        ];
    }

    // =========================
    // LOGOUT
    // =========================
    public function actionLogout()
    {
        $token = Yii::$app->request->headers->get('Authorization');

        if (!$token) {
            return [
                "status" => "error",
                "message" => "Token missing"
            ];
        }

        Yii::$app->db->createCommand()->update(
            'user_login',
            [
                'logout_time' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            ['token' => $token]
        )->execute();

        return [
            "status" => "success",
            "message" => "Logout successful"
        ];
    }
}
