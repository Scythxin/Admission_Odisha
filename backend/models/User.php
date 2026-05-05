<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "users".
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $password
 * @property string|null $city
 * @property int|null $is_verified
 * @property string|null $last_login
 * @property int|null $login_count
 * @property string|null $created_at
 * @property int|null $created_by
 * @property string|null $updated_at
 * @property int|null $updated_by
 * @property int|null $is_status
 */
class User extends ActiveRecord implements IdentityInterface
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'users';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['is_verified', 'login_count', 'created_by', 'updated_by', 'is_status'], 'integer'],
            [['last_login', 'created_at', 'updated_at'], 'safe'],
            [['name', 'email', 'city'], 'string', 'max' => 100],
            [['phone'], 'string', 'max' => 15],
            [['password'], 'string', 'max' => 255],
            [['email'], 'unique'],
            [['phone'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        // For JWT or custom token-based auth
        // You would typically look this up in the user_login table
        $login = Yii::$app->db->createCommand("SELECT user_id FROM user_login WHERE token = :token")
            ->bindValue(':token', $token)
            ->queryOne();
        
        if ($login) {
            return static::findOne($login['user_id']);
        }
        return null;
    }

    /**
     * Finds user by email
     *
     * @param string $email
     * @return static|null
     */
    public static function findByEmail($email)
    {
        return static::findOne(['email' => $email]);
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
        // Not used in this simple implementation but required by interface
        return null;
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey)
    {
        return false;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password);
    }
}
