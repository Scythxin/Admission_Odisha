<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;

class DashboardController extends Controller
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

    public function actionStats()
    {
        $stats = [
            'totalFields' => (int)Yii::$app->db->createCommand("SELECT COUNT(*) FROM fields")->queryScalar(),
            'totalSpecializations' => (int)Yii::$app->db->createCommand("SELECT COUNT(*) FROM specializations")->queryScalar(),
            'totalCourses' => (int)Yii::$app->db->createCommand("SELECT COUNT(*) FROM courses")->queryScalar(),
            'totalColleges' => (int)Yii::$app->db->createCommand("SELECT COUNT(*) FROM colleges")->queryScalar(),
            'recentEnquiries' => Yii::$app->db->createCommand("
                SELECT u.name, u.email, ua.activity_type as subject, ua.created_at as date, 'New' as status, 'text-indigo-600 bg-indigo-50' as statusColor
                FROM user_activity ua
                LEFT JOIN users u ON ua.user_id = u.id
                ORDER BY ua.created_at DESC
                LIMIT 5
            ")->queryAll(),
            'recentUsers' => Yii::$app->db->createCommand("
                SELECT name, email, created_at as joined, IF(is_status=1, 'Active', 'Inactive') as status, IF(is_status=1, 'text-green-600 bg-green-50', 'text-red-500 bg-red-50') as statusColor
                FROM users
                ORDER BY created_at DESC
                LIMIT 5
            ")->queryAll(),
            'topFields' => Yii::$app->db->createCommand("
                SELECT f.name, COUNT(ua.id) as value
                FROM fields f
                LEFT JOIN user_activity ua ON f.id = ua.field_id
                GROUP BY f.id
                ORDER BY value DESC
                LIMIT 5
            ")->queryAll()
        ];

        return $stats;
    }
}
