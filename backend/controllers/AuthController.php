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
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");

        if (Yii::$app->request->isOptions) {
            exit(0);
        }

        Yii::$app->response->format = Response::FORMAT_JSON;
        return parent::beforeAction($action);
    }

    // ✅ REGISTER + OTP SEND
    public function actionRegister()
    {
        $data = json_decode(Yii::$app->request->getRawBody(), true);

        if (!$data) return ["status"=>"error","message"=>"No data"];

        $existing = Yii::$app->db->createCommand("
            SELECT * FROM users WHERE email = :email
        ")->bindValue(':email', $data['email'])->queryOne();

        if ($existing) return ["status"=>"error","message"=>"Email exists"];

        Yii::$app->db->createCommand()->insert('users', [
            'name'=>$data['name'],
            'email'=>$data['email'],
            'phone'=>$data['phone'],
            'password'=>password_hash($data['password'], PASSWORD_DEFAULT),
            'city'=>$data['city'],
            'created_at'=>date('Y-m-d H:i:s')
        ])->execute();

        // OTP
        $otp = rand(100000,999999);

        Yii::$app->db->createCommand()->insert('otp_verification', [
            'contact'=>$data['email'],
            'otp'=>$otp,
            'expires_at'=>date('Y-m-d H:i:s', strtotime('+5 minutes')),
            'created_at'=>date('Y-m-d H:i:s')
        ])->execute();

        // 📩 MAIL
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;

            $mail->Username = 'YOUR_EMAIL@gmail.com';        // 🔴 change
            $mail->Password = 'YOUR_APP_PASSWORD';           // 🔴 change

            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('YOUR_EMAIL@gmail.com', 'Admission Odisha');
            $mail->addAddress($data['email']);

            $mail->isHTML(true);
            $mail->Subject = 'OTP Verification';
            $mail->Body = "Your OTP is <b>$otp</b>";

            $mail->send();

        } catch (Exception $e) {
            return ["status"=>"error","message"=>"Mail failed"];
        }

        return ["status"=>"success","message"=>"OTP sent"];
    }

    // ✅ VERIFY OTP
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
            'is_used'=>1
        ], ['id'=>$otpData['id']])->execute();

        return ["status"=>"success"];
    }

    // ✅ LOGIN
    public function actionLogin()
    {
        $data = json_decode(Yii::$app->request->getRawBody(), true);

        $user = Yii::$app->db->createCommand("
            SELECT * FROM users WHERE email = :email
        ")->bindValue(':email',$data['email'])->queryOne();

        if (!$user || !password_verify($data['password'],$user['password'])) {
            return ["status"=>"error","message"=>"Invalid credentials"];
        }

        if ($user['is_verified']==0) {
            return ["status"=>"error","message"=>"Verify OTP first"];
        }

        return ["status"=>"success","token"=>"simple_token"];
    }
}