<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "user_login".
 */
class UserLogin extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_login';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'token'], 'required'],
            [['user_id', 'created_by', 'updated_by', 'is_status'], 'integer'],
            [['login_time', 'logout_time', 'created_at', 'updated_at'], 'safe'],
            [['ip_address'], 'string', 'max' => 45],
            [['device', 'browser', 'os'], 'string', 'max' => 50],
            [['token'], 'string', 'max' => 255],
        ];
    }

    /**
     * Validate an active token and implement a sliding window expiration.
     * Default lifetime is 14 days (or from params.php 'tokenLifetime').
     *
     * @param string|null $rawToken
     * @return UserLogin|null
     */
    public static function validateToken($rawToken)
    {
        if (empty($rawToken)) {
            return null;
        }

        $token = str_replace('Bearer ', '', trim($rawToken));
        if (empty($token)) {
            return null;
        }

        $userLogin = self::find()
            ->where(['token' => $token, 'is_status' => 1])
            ->andWhere(['is', 'logout_time', null])
            ->one();

        if (!$userLogin) {
            return null;
        }

        $lifetime = Yii::$app->params['tokenLifetime'] ?? (14 * 24 * 60 * 60);
        $lastActiveTime = $userLogin->updated_at ? strtotime($userLogin->updated_at) : strtotime($userLogin->created_at ?: $userLogin->login_time);

        // Check if token has expired
        if ($lastActiveTime && (time() - $lastActiveTime > $lifetime)) {
            $userLogin->is_status = 0;
            $userLogin->logout_time = date('Y-m-d H:i:s');
            $userLogin->save(false);
            return null;
        }

        // Sliding expiration: touch updated_at periodically (e.g. at most once every 10 minutes to save DB writes)
        if (!$lastActiveTime || (time() - $lastActiveTime > 600)) {
            $userLogin->updated_at = date('Y-m-d H:i:s');
            $userLogin->save(false);
        }

        return $userLogin;
    }
}
