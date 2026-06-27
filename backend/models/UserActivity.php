<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "user_activity".
 */
class UserActivity extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_activity';
    }

    /**
     * Helper method to log an activity.
     * 
     * @param int $userId The ID of the user performing the action.
     * @param string $activityType e.g., 'Login', 'Profile Updated', 'Wishlist Added'
     * @param string|null $referenceType e.g., 'College', 'Course'
     * @param int|null $referenceId The ID of the reference entity
     * @param string|null $description Custom details
     * @return bool
     */
    public static function log($userId, $activityType, $referenceType = null, $referenceId = null, $description = null)
    {
        if (!$userId) {
            $token = Yii::$app->request->headers->get('Authorization');
            if ($token) {
                $userLogin = Yii::$app->db->createCommand("SELECT user_id FROM user_login WHERE token = :token")
                    ->bindValue(':token', $token)->queryOne();
                if ($userLogin) {
                    $userId = $userLogin['user_id'];
                }
            }
        }

        if (!$userId) {
            return false;
        }

        try {
            Yii::$app->db->createCommand()->insert(self::tableName(), [
                'user_id' => $userId,
                'activity_type' => $activityType,
                'reference_type' => $referenceType,
                'reference_id' => $referenceId,
                'description' => $description,
                'ip_address' => Yii::$app->request->userIP,
                'created_at' => date('Y-m-d H:i:s'),
            ])->execute();
            return true;
        } catch (\Exception $e) {
            file_put_contents(Yii::getAlias('@runtime/logs/activity_error.log'), date('Y-m-d H:i:s') . ' - ' . $e->getMessage() . "\n", FILE_APPEND);
            return false;
        }
    }
}
