<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "otp_verification".
 */
class OtpVerification extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'otp_verification';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['contact', 'otp', 'expires_at'], 'required'],
            [['is_used', 'failed_attempts', 'created_by', 'updated_by', 'is_status'], 'integer'],
            [['expires_at', 'created_at', 'updated_at'], 'safe'],
            [['contact'], 'string', 'max' => 255],
            [['otp'], 'string', 'max' => 10],
        ];
    }
}
