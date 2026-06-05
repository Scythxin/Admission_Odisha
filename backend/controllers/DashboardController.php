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

    public function actionGetFields()
    {
        $fields = Yii::$app->db->createCommand("SELECT * FROM fields ORDER BY id DESC")->queryAll();
        foreach ($fields as &$f) {
            $f['id'] = (int)$f['id'];
            $f['description'] = $f['short_desc'];
            $f['status'] = ((int)$f['is_status'] === 1) ? 'Active' : 'Inactive';
        }
        return ['status' => 'success', 'data' => $fields];
    }

    public function actionCreateField()
    {
        $data = Yii::$app->request->getBodyParams();
        $name = $data['name'] ?? '';
        $description = $data['description'] ?? '';
        $status = $data['status'] ?? 'Active';
        $icon = $data['icon'] ?? 'fa-cogs';

        if (empty($name)) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'message' => 'Field name is required.'];
        }

        $is_status = ($status === 'Active') ? 1 : 0;

        Yii::$app->db->createCommand()->insert('fields', [
            'name' => $name,
            'short_desc' => $description,
            'icon' => $icon,
            'is_status' => $is_status,
            'created_at' => date('Y-m-d H:i:s'),
        ])->execute();

        $id = Yii::$app->db->getLastInsertID();

        return [
            'status' => 'success',
            'message' => 'Field created successfully.',
            'data' => [
                'id' => (int)$id,
                'name' => $name,
                'description' => $description,
                'icon' => $icon,
                'status' => $status,
            ]
        ];
    }

    public function actionUpdateField()
    {
        $data = Yii::$app->request->getBodyParams();
        $id = $data['id'] ?? null;
        $name = $data['name'] ?? '';
        $description = $data['description'] ?? '';
        $status = $data['status'] ?? 'Active';
        $icon = $data['icon'] ?? null;

        if (!$id) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'message' => 'Field ID is required.'];
        }

        $is_status = ($status === 'Active') ? 1 : 0;
        
        $updateData = [
            'name' => $name,
            'short_desc' => $description,
            'is_status' => $is_status,
            'updated_at' => date('Y-m-d H:i:s'),
        ];
        if ($icon !== null) {
            $updateData['icon'] = $icon;
        }

        Yii::$app->db->createCommand()->update('fields', $updateData, 'id = :id', [':id' => $id])->execute();

        return ['status' => 'success', 'message' => 'Field updated successfully.'];
    }

    public function actionDeleteField()
    {
        $id = Yii::$app->request->get('id');
        if (!$id) {
            $data = Yii::$app->request->getBodyParams();
            $id = $data['id'] ?? null;
        }

        if (!$id) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'message' => 'Field ID is required.'];
        }

        Yii::$app->db->createCommand()->delete('fields', 'id = :id', [':id' => $id])->execute();

        return ['status' => 'success', 'message' => 'Field deleted successfully.'];
    }
    public function actionGetSpecializations()
    {
        $specializations = Yii::$app->db->createCommand("
            SELECT s.*, f.name as field_name 
            FROM specializations s
            LEFT JOIN fields f ON s.field_id = f.id
            ORDER BY s.id DESC
        ")->queryAll();
        
        foreach ($specializations as &$s) {
            $s['id'] = (int)$s['id'];
            $s['field_id'] = (int)$s['field_id'];
            $s['description'] = $s['short_desc'];
            $s['icon'] = $s['image'];
            $s['status'] = ((int)$s['is_status'] === 1) ? 'Active' : 'Inactive';
        }
        return ['status' => 'success', 'data' => $specializations];
    }

    public function actionCreateSpecialization()
    {
        $data = Yii::$app->request->getBodyParams();
        $name = $data['name'] ?? '';
        $field_id = $data['field_id'] ?? null;
        $description = $data['description'] ?? '';
        $icon = $data['icon'] ?? 'code';
        $status = $data['status'] ?? 'Active';

        if (empty($name) || empty($field_id)) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'message' => 'Name and Field ID are required.'];
        }

        $is_status = ($status === 'Active') ? 1 : 0;

        Yii::$app->db->createCommand()->insert('specializations', [
            'name' => $name,
            'field_id' => $field_id,
            'short_desc' => $description,
            'image' => $icon,
            'is_status' => $is_status,
            'created_at' => date('Y-m-d H:i:s'),
        ])->execute();

        return ['status' => 'success', 'message' => 'Specialization created successfully.'];
    }

    public function actionUpdateSpecialization()
    {
        $data = Yii::$app->request->getBodyParams();
        $id = $data['id'] ?? null;
        $name = $data['name'] ?? '';
        $field_id = $data['field_id'] ?? null;
        $description = $data['description'] ?? '';
        $icon = $data['icon'] ?? null;
        $status = $data['status'] ?? 'Active';

        if (!$id || empty($name) || empty($field_id)) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'message' => 'ID, Name, and Field ID are required.'];
        }

        $is_status = ($status === 'Active') ? 1 : 0;

        $updateData = [
            'name' => $name,
            'field_id' => $field_id,
            'short_desc' => $description,
            'is_status' => $is_status,
            'updated_at' => date('Y-m-d H:i:s'),
        ];
        if ($icon !== null) {
            $updateData['image'] = $icon;
        }

        Yii::$app->db->createCommand()->update('specializations', $updateData, 'id = :id', [':id' => $id])->execute();

        return ['status' => 'success', 'message' => 'Specialization updated successfully.'];
    }

    public function actionDeleteSpecialization()
    {
        $id = Yii::$app->request->get('id');
        if (!$id) {
            $data = Yii::$app->request->getBodyParams();
            $id = $data['id'] ?? null;
        }

        if (!$id) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'message' => 'ID is required.'];
        }

        Yii::$app->db->createCommand()->delete('specializations', 'id = :id', [':id' => $id])->execute();
        return ['status' => 'success', 'message' => 'Specialization deleted successfully.'];
    }

    public function actionGetEnquiries()
    {
        $search = Yii::$app->request->get('search', '');
        $date = Yii::$app->request->get('date', '');
        $statusFilter = Yii::$app->request->get('status', '');
        $page = (int)Yii::$app->request->get('page', 1);
        $perPage = (int)Yii::$app->request->get('perPage', 5);
        if ($page < 1) $page = 1;
        if ($perPage < 1) $perPage = 5;

        // Base Query
        $where = ['and'];
        
        // Search filter
        if (!empty($search)) {
            $where[] = ['or', 
                ['like', 'full_name', $search],
                ['like', 'phone', $search],
                ['like', 'courses', $search],
                ['like', 'colleges', $search]
            ];
        }

        // Date filter
        if (!empty($date)) {
            // date matches yyyy-mm-dd, so match created_at prefix
            $where[] = ['like', 'created_at', $date . '%', false];
        }

        // Status filter
        if (!empty($statusFilter)) {
            $where[] = ['status' => $statusFilter];
        }

        // Count query
        $countQuery = (new \yii\db\Query())
            ->from('enquiries')
            ->where($where);
        
        $total = (int)$countQuery->count();

        // Fetch data
        $offset = ($page - 1) * $perPage;
        $enquiries = (new \yii\db\Query())
            ->from('enquiries')
            ->where($where)
            ->orderBy(['created_at' => SORT_DESC])
            ->limit($perPage)
            ->offset($offset)
            ->all();

        // Calculate counts for stats cards
        $totalCount = (int)(new \yii\db\Query())->from('enquiries')->count();
        $newCount = (int)(new \yii\db\Query())->from('enquiries')->where(['status' => 'New'])->count();
        $contactedCount = (int)(new \yii\db\Query())->from('enquiries')->where(['status' => 'Contacted'])->count();
        $closedCount = (int)(new \yii\db\Query())->from('enquiries')->where(['status' => 'Closed'])->count();

        return [
            'status' => 'success',
            'data' => $enquiries,
            'total' => $total,
            'stats' => [
                'total' => $totalCount,
                'new' => $newCount,
                'contacted' => $contactedCount,
                'closed' => $closedCount,
            ]
        ];
    }

    public function actionUpdateEnquiryStatus()
    {
        $data = Yii::$app->request->getBodyParams();
        $id = $data['id'] ?? null;
        $status = $data['status'] ?? null;

        if (!$id || !$status) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'message' => 'Enquiry ID and status are required.'];
        }

        try {
            Yii::$app->db->createCommand()->update('enquiries', [
                'status' => $status
            ], 'id = :id', [':id' => $id])->execute();

            return ['status' => 'success', 'message' => 'Status updated successfully.'];
        } catch (\Exception $e) {
            Yii::$app->response->statusCode = 500;
            return ['status' => 'error', 'message' => 'Failed to update status.'];
        }
    }

    public function actionDeleteEnquiry()
    {
        $id = Yii::$app->request->get('id');
        if (!$id) {
            $data = Yii::$app->request->getBodyParams();
            $id = $data['id'] ?? null;
        }

        if (!$id) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'message' => 'Enquiry ID is required.'];
        }

        try {
            Yii::$app->db->createCommand()->delete('enquiries', 'id = :id', [':id' => $id])->execute();
            return ['status' => 'success', 'message' => 'Enquiry deleted successfully.'];
        } catch (\Exception $e) {
            Yii::$app->response->statusCode = 500;
            return ['status' => 'error', 'message' => 'Failed to delete enquiry.'];
        }
    }

    public function actionGetCourses()
    {
        $courses = Yii::$app->db->createCommand("
            SELECT c.*, s.name as specialization_name, f.name as field_name, f.icon as field_icon
            FROM courses c
            LEFT JOIN specializations s ON c.specialization_id = s.id
            LEFT JOIN fields f ON s.field_id = f.id
            ORDER BY c.id DESC
        ")->queryAll();

        foreach ($courses as &$c) {
            $c['id'] = (int)$c['id'];
            $c['specialization_id'] = $c['specialization_id'] ? (int)$c['specialization_id'] : null;
            $c['status'] = ((int)$c['is_status'] === 1) ? 'Active' : 'Inactive';
        }
        return ['status' => 'success', 'data' => $courses];
    }
}

