<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;

use app\models\User;
use app\models\OtpVerification;
use app\models\UserLogin;
use app\models\UserActivity;

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

        $existing = User::find()->where(['email' => $data['email']])->one();

        if ($existing) {
            return [
                "status" => "error",
                "message" => "Email already registered"
            ];
        }

        // HASH PASSWORD
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

        // INSERT USER
        $user = new User();
        $user->name = $data['name'] ?? null;
        $user->email = $data['email'];
        $user->phone = $data['phone'] ?? null;
        $user->password = $hashedPassword;
        $user->city = $data['city'] ?? null;
        $user->created_at = date('Y-m-d H:i:s');
        $user->is_status = 1;
        $user->save(false);

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
        $user = User::find()->where(['email' => $email, 'is_status' => 1])->one();

        // USER NOT FOUND
        if (!$user) {
            return [
                "status" => "error",
                "message" => "Account not found"
            ];
        }

        // PASSWORD VERIFY
        if (!password_verify($password, $user->password)) {
            return [
                "status" => "error",
                "message" => "Invalid password"
            ];
        }

        // RATE LIMITING
        $timeLimit = date('Y-m-d H:i:s', strtotime('-1 minute'));
        $recentOtp = OtpVerification::find()
            ->where(['contact' => $email])
            ->andWhere(['>=', 'created_at', $timeLimit])
            ->one();

        if ($recentOtp) {
            return [
                "status" => "error",
                "message" => "Please wait 60 seconds before requesting a new OTP"
            ];
        }

        // GENERATE OTP
        $otp = (string) random_int(100000, 999999);

        // SAVE OTP
        $otpRecord = new OtpVerification();
        $otpRecord->contact = $email;
        $otpRecord->otp = $otp;
        $otpRecord->expires_at = date('Y-m-d H:i:s', strtotime('+5 minutes'));
        $otpRecord->is_used = 0;
        $otpRecord->created_at = date('Y-m-d H:i:s');
        $otpRecord->is_status = 1;
        $otpRecord->save(false);
        try {
            $senderEmail = Yii::$app->params['senderEmail'] ?? 'yourgmail@gmail.com';
            $senderName = Yii::$app->params['senderName'] ?? 'Admission Odisha';
            Yii::$app->mailer->compose()
                ->setFrom([$senderEmail => $senderName])
                ->setTo($email)
                ->setSubject('Your OTP Verification Code')
                ->setHtmlBody("
        <h2>Your OTP is:</h2>
        <h1>$otp</h1>
        <p>This OTP expires in 5 minutes.</p>
    ")
                ->send();
        } catch (\Exception $e) {
            return [
                "status" => "error",
                "message" => "Email sending failed"
            ];
        }

        return [
            "status" => "needs_verification",
            "message" => "OTP sent successfully"
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
        $otpData = OtpVerification::find()
             ->where(['contact' => $email, 'is_used' => 0])
             ->orderBy(['id' => SORT_DESC])
             ->one();

        if (!$otpData) {
            return [
                "status" => "error",
                "message" => "No active OTP found"
            ];
        }

        // OTP EXPIRED
        if (strtotime($otpData->expires_at) < time()) {
            return [
                "status" => "error",
                "message" => "OTP expired"
            ];
        }

        // COOLDOWN CHECK
        if ($otpData->failed_attempts >= 3) {
            $updatedAt = $otpData->updated_at ? strtotime($otpData->updated_at) : strtotime($otpData->created_at);
            $timeSinceLastFail = time() - $updatedAt;
            if ($timeSinceLastFail < 30) {
                $timeLeft = 30 - $timeSinceLastFail;
                return [
                    "status" => "error",
                    "message" => "Too many failed attempts. Please wait $timeLeft seconds."
                ];
            }
        }

        // INVALID OTP
        if (!hash_equals((string)$otpData->otp, (string)$otp)) {
            $failedAttempts = $otpData->failed_attempts >= 3 ? 1 : $otpData->failed_attempts + 1;
            
            $otpData->failed_attempts = $failedAttempts;
            $otpData->updated_at = date('Y-m-d H:i:s');
            $otpData->save(false);

            if ($failedAttempts >= 3) {
                return [
                    "status" => "error",
                    "message" => "Too many failed attempts. You are on a 30 second cooldown."
                ];
            }

            $triesLeft = 3 - $failedAttempts;
            return [
                "status" => "error",
                "message" => "Invalid OTP. $triesLeft attempts remaining."
            ];
        }

        // MARK OTP USED
        $otpData->is_used = 1;
        $otpData->updated_at = date('Y-m-d H:i:s');
        $otpData->save(false);

        // GET USER
        $user = User::find()->where(['email' => $email])->one();

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

        $userLogin = new UserLogin();
        $userLogin->user_id = $user->id;
        $userLogin->login_time = date('Y-m-d H:i:s');
        $userLogin->ip_address = Yii::$app->request->userIP;
        $userLogin->device = $device;
        $userLogin->browser = $browser;
        $userLogin->os = $os;
        $userLogin->token = $token;
        $userLogin->created_at = date('Y-m-d H:i:s');
        $userLogin->is_status = 1;
        $userLogin->save(false);

        UserActivity::log($user->id, 'Login');

        return [
            "status" => "success",
            "message" => "OTP verified successfully",
            "token" => $token,
            "user" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "phone" => $user->phone,
                "city" => $user->city,
                "gender" => $user->gender,
                "dob" => $user->dob,
                "is_admin" => (int) $user->is_admin,
                "profile_photo" => $user->profile_photo ?? null
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

        $userLogin = UserLogin::find()->where(['token' => $token])->one();

        if (!$userLogin) {
            return [
                "status" => "error",
                "message" => "Invalid or expired session"
            ];
        }

        $user = User::findOne($userLogin->user_id);
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

        $userLogin = UserLogin::find()->where(['token' => $token])->one();

        if (!$userLogin) {
            return [
                "status" => "error",
                "message" => "Invalid or expired session"
            ];
        }

        $user = User::findOne($userLogin->user_id);
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
            $existingEmail = User::find()->where(['email' => $data['email']])->andWhere(['!=', 'id', $user->id])->one();
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
            $existingPhone = User::find()->where(['phone' => $data['phone']])->andWhere(['!=', 'id', $user->id])->one();
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
            UserActivity::log($user->id, 'Profile Updated', 'Profile', $user->id);
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

        $userLogin = UserLogin::find()->where(['token' => $token])->one();

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

        $user = User::findOne($userLogin->user_id);

        if (!$user) {
            return [
                "status" => "error",
                "message" => "User not found"
            ];
        }

        if (!password_verify($currentPassword, $user->password)) {
            return [
                "status" => "error",
                "message" => "Incorrect current password"
            ];
        }

        $user->password = password_hash($newPassword, PASSWORD_DEFAULT);
        $user->updated_at = date('Y-m-d H:i:s');
        $user->save(false);

        return [
            "status" => "success",
            "message" => "Password updated successfully"
        ];
    }

    // =========================
    // FORGOT PASSWORD
    // =========================
    public function actionForgotPassword()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $email = $data['email'] ?? '';

        if (empty($email)) {
            return [
                "status" => "error",
                "message" => "Email is required"
            ];
        }

        // FIND USER
        $user = User::find()->where(['email' => $email, 'is_status' => 1])->one();

        if (!$user) {
            return [
                "status" => "error",
                "message" => "Account not found with this email"
            ];
        }

        // RATE LIMITING
        $timeLimit = date('Y-m-d H:i:s', strtotime('-1 minute'));
        $recentOtp = OtpVerification::find()
            ->where(['contact' => $email])
            ->andWhere(['>=', 'created_at', $timeLimit])
            ->one();

        if ($recentOtp) {
            return [
                "status" => "error",
                "message" => "Please wait 60 seconds before requesting a new OTP"
            ];
        }

        // GENERATE OTP
        $otp = (string) random_int(100000, 999999);

        // SAVE OTP
        $otpRecord = new OtpVerification();
        $otpRecord->contact = $email;
        $otpRecord->otp = $otp;
        $otpRecord->expires_at = date('Y-m-d H:i:s', strtotime('+5 minutes'));
        $otpRecord->is_used = 0;
        $otpRecord->created_at = date('Y-m-d H:i:s');
        $otpRecord->is_status = 1;
        $otpRecord->save(false);

        try {
            $senderEmail = Yii::$app->params['senderEmail'] ?? 'yourgmail@gmail.com';
            $senderName = Yii::$app->params['senderName'] ?? 'Admission Odisha';
            Yii::$app->mailer->compose()
                ->setFrom([$senderEmail => $senderName])
                ->setTo($email)
                ->setSubject('Password Reset OTP')
                ->setHtmlBody("
                <h2>Password Reset Request</h2>
                <p>Your OTP to reset your password is:</p>
                <h1>$otp</h1>
                <p>This OTP expires in 5 minutes.</p>
            ")
                ->send();
        } catch (\Exception $e) {
            return [
                "status" => "error",
                "message" => "Email sending failed"
            ];
        }

        return [
            "status" => "success",
            "message" => "OTP sent successfully to your email"
        ];
    }

    // =========================
    // RESET PASSWORD
    // =========================
    public function actionResetPassword()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $email = $data['email'] ?? '';
        $otp = $data['otp'] ?? '';
        $newPassword = $data['new_password'] ?? '';

        if (empty($email) || empty($otp) || empty($newPassword)) {
            return [
                "status" => "error",
                "message" => "Email, OTP and new password are required"
            ];
        }

        // FIND OTP
        $otpData = OtpVerification::find()
             ->where(['contact' => $email, 'is_used' => 0])
             ->orderBy(['id' => SORT_DESC])
             ->one();

        if (!$otpData) {
            return [
                "status" => "error",
                "message" => "No active OTP found"
            ];
        }

        // OTP EXPIRED
        if (strtotime($otpData->expires_at) < time()) {
            return [
                "status" => "error",
                "message" => "OTP expired"
            ];
        }

        // COOLDOWN CHECK
        if ($otpData->failed_attempts >= 3) {
            $updatedAt = $otpData->updated_at ? strtotime($otpData->updated_at) : strtotime($otpData->created_at);
            $timeSinceLastFail = time() - $updatedAt;
            if ($timeSinceLastFail < 30) {
                $timeLeft = 30 - $timeSinceLastFail;
                return [
                    "status" => "error",
                    "message" => "Too many failed attempts. Please wait $timeLeft seconds."
                ];
            }
        }

        // INVALID OTP
        if (!hash_equals((string)$otpData->otp, (string)$otp)) {
            $failedAttempts = $otpData->failed_attempts >= 3 ? 1 : $otpData->failed_attempts + 1;
            
            $otpData->failed_attempts = $failedAttempts;
            $otpData->updated_at = date('Y-m-d H:i:s');
            $otpData->save(false);

            if ($failedAttempts >= 3) {
                return [
                    "status" => "error",
                    "message" => "Too many failed attempts. You are on a 30 second cooldown."
                ];
            }

            $triesLeft = 3 - $failedAttempts;
            return [
                "status" => "error",
                "message" => "Invalid OTP. $triesLeft attempts remaining."
            ];
        }

        // FIND USER
        $user = User::find()->where(['email' => $email])->one();

        if (!$user) {
            return [
                "status" => "error",
                "message" => "User not found"
            ];
        }

        // MARK OTP USED AND UPDATE PASSWORD
        $transaction = Yii::$app->db->beginTransaction();
        try {
            $otpData->is_used = 1;
            $otpData->updated_at = date('Y-m-d H:i:s');
            $otpData->save(false);

            $user->password = password_hash($newPassword, PASSWORD_DEFAULT);
            $user->updated_at = date('Y-m-d H:i:s');
            $user->save(false);

            $transaction->commit();
        } catch (\Exception $e) {
            $transaction->rollBack();
            return [
                "status" => "error",
                "message" => "Failed to reset password"
            ];
        }

        return [
            "status" => "success",
            "message" => "Password has been reset successfully"
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

        $userLogin = UserLogin::find()->where(['token' => $token])->one();
        if ($userLogin) {
            $userLogin->logout_time = date('Y-m-d H:i:s');
            $userLogin->updated_at = date('Y-m-d H:i:s');
            $userLogin->save(false);
            UserActivity::log($userLogin->user_id, 'Logout');
        }

        return [
            "status" => "success",
            "message" => "Logout successful"
        ];
    }
}
