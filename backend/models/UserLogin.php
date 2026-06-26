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
}
