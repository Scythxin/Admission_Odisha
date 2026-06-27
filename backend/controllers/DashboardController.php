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
    public function actionGetUsers()
    {
        $search = Yii::$app->request->get('search', '');
        $city = Yii::$app->request->get('city', 'All Cities');
        $statusFilter = Yii::$app->request->get('status', 'All Status');
        $gender = Yii::$app->request->get('gender', 'All Gender');
        $page = (int)Yii::$app->request->get('page', 1);
        $perPage = (int)Yii::$app->request->get('perPage', 10);
        
        if ($page < 1) $page = 1;
        if ($perPage < 1) $perPage = 10;

        $query = (new \yii\db\Query())
            ->from('users');

        if (!empty($search)) {
            $query->andWhere(['or', 
                ['like', 'name', $search], 
                ['like', 'email', $search],
                ['like', 'phone', $search]
            ]);
        }

        if ($city !== 'All Cities' && !empty($city)) {
            $query->andWhere(['city' => $city]);
        }

        if ($gender !== 'All Gender' && !empty($gender)) {
            $query->andWhere(['gender' => $gender]);
        }

        if ($statusFilter !== 'All Status' && !empty($statusFilter)) {
            if ($statusFilter === 'Active') {
                $query->andWhere(['is_status' => 1]);
            } elseif ($statusFilter === 'Inactive') {
                $query->andWhere(['is_status' => 0]);
            } elseif ($statusFilter === 'Blocked') {
                $query->andWhere(['is_status' => 2]);
            }
        }

        $totalCount = $query->count();
        $users = $query->orderBy(['created_at' => SORT_DESC])
            ->offset(($page - 1) * $perPage)
            ->limit($perPage)
            ->all();

        // Format data
        $formattedUsers = [];
        foreach ($users as $u) {
            $statusStr = 'Inactive';
            if ((int)$u['is_status'] === 1) $statusStr = 'Active';
            elseif ((int)$u['is_status'] === 2) $statusStr = 'Blocked';

            $formattedUsers[] = [
                'id' => (int)$u['id'],
                'name' => $u['name'] ?? 'Unknown',
                'email' => $u['email'] ?? '',
                'phone' => $u['phone'] ?? '',
                'city' => $u['city'] ?? '-',
                'gender' => $u['gender'] ?? '-',
                'status' => $statusStr,
                'joinedOn' => !empty($u['created_at']) ? date('d M Y', strtotime($u['created_at'])) : '-',
                'lastLogin' => !empty($u['last_login']) ? date('d M Y, h:i A', strtotime($u['last_login'])) : '-',
            ];
        }

        // Stats
        $totalUsers = (int)(new \yii\db\Query())->from('users')->count();
        $activeUsers = (int)(new \yii\db\Query())->from('users')->where(['is_status' => 1])->count();
        $inactiveUsers = (int)(new \yii\db\Query())->from('users')->where(['is_status' => 0])->count();
        $blockedUsers = (int)(new \yii\db\Query())->from('users')->where(['is_status' => 2])->count();
        $newThisMonth = (int)(new \yii\db\Query())->from('users')->where(['>=', 'created_at', date('Y-m-01')])->count();

        return [
            'status' => 'success',
            'data' => [
                'users' => $formattedUsers,
                'stats' => [
                    'total' => $totalUsers,
                    'active' => $activeUsers,
                    'inactive' => $inactiveUsers,
                    'blocked' => $blockedUsers,
                    'newMonth' => $newThisMonth
                ],
                'pagination' => [
                    'total' => (int)$totalCount,
                    'page' => $page,
                    'perPage' => $perPage
                ]
            ]
        ];
    }

    public function actionGetUserActivity()
    {
        $search = Yii::$app->request->get('search', '');
        $activityType = Yii::$app->request->get('activityType', 'All Activities');
        $userFilter = Yii::$app->request->get('userFilter', 'All Users');
        $page = (int)Yii::$app->request->get('page', 1);
        $perPage = (int)Yii::$app->request->get('perPage', 10);
        if ($page < 1) $page = 1;
        if ($perPage < 1) $perPage = 10;

        $query = (new \yii\db\Query())
            ->select([
                'ua.id',
                'u.name',
                'u.email',
                'u.is_status as user_status',
                'ua.activity_type',
                'ua.reference_type',
                'ua.reference_id',
                'ua.description',
                'ua.ip_address',
                'ua.created_at',
                'f.name as field_name',
                'c.name as course_name',
                'col.name as college_name',
                'ref_c.name as ref_course_name'
            ])
            ->from('user_activity ua')
            ->leftJoin('users u', 'ua.user_id = u.id')
            ->leftJoin('fields f', 'ua.field_id = f.id')
            ->leftJoin('courses c', 'ua.course_id = c.id')
            ->leftJoin('colleges col', "ua.reference_type = 'College' AND ua.reference_id = col.id")
            ->leftJoin('courses ref_c', "ua.reference_type = 'Course' AND ua.reference_id = ref_c.id");

        if (!empty($search)) {
            $query->andWhere(['or', ['like', 'u.name', $search], ['like', 'u.email', $search]]);
        }
        if ($activityType !== 'All Activities') {
            if ($activityType === 'Wishlist') {
                $query->andWhere(['like', 'ua.activity_type', 'Wishlist']);
            } elseif ($activityType === 'Enquiry') {
                $query->andWhere(['like', 'ua.activity_type', 'Enquiry']);
            } else {
                $query->andWhere(['ua.activity_type' => $activityType]);
            }
        }
        if ($userFilter === 'Active Users') {
            $query->andWhere(['u.is_status' => 1]);
        } elseif ($userFilter === 'Inactive Users') {
            $query->andWhere(['u.is_status' => 0]);
        }

        $totalCount = $query->count();
        $logs = $query->orderBy(['ua.created_at' => SORT_DESC])
            ->offset(($page - 1) * $perPage)
            ->limit($perPage)
            ->all();

        $formattedLogs = [];
        foreach ($logs as $log) {
            $details = $log['description'];
            if (!$details) {
                if (strpos($log['activity_type'], 'Login') !== false) {
                    $details = 'User logged in to the platform';
                } elseif (strpos($log['activity_type'], 'Logout') !== false) {
                    $details = 'User logged out from the platform';
                } elseif (strpos($log['activity_type'], 'Wishlist') !== false) {
                    $item = $log['course_name'] ?? $log['field_name'] ?? 'item';
                    $details = "Action on Wishlist for $item";
                } elseif (strpos($log['activity_type'], 'Enquiry') !== false) {
                    $details = 'Submitted an enquiry';
                } elseif (strpos($log['activity_type'], 'Course') !== false) {
                    $details = 'Viewed course details';
                } elseif (strpos($log['activity_type'], 'College') !== false) {
                    $details = 'Viewed college details';
                } elseif (strpos($log['activity_type'], 'Profile') !== false) {
                    $details = 'Updated profile information';
                } else {
                    $details = 'Performed ' . $log['activity_type'];
                }
            }

            $reference = '-';
            if (!empty($log['reference_type'])) {
                if (!empty($log['reference_id'])) {
                    $refName = '';
                    if ($log['reference_type'] === 'College' && !empty($log['college_name'])) {
                        $refName = $log['college_name'];
                    } elseif ($log['reference_type'] === 'Course' && !empty($log['ref_course_name'])) {
                        $refName = $log['ref_course_name'];
                    }
                    
                    if ($refName) {
                        $reference = $refName . ' (ID: ' . $log['reference_id'] . ')';
                    } else {
                        $reference = $log['reference_type'] . ' (ID: ' . $log['reference_id'] . ')';
                    }
                } else {
                    // If no ID exists, try to extract the reference name from the description
                    $extractedName = str_replace(['Viewed general course ', 'Viewed '], '', $log['description']);
                    $reference = $extractedName ? $extractedName : $log['reference_type'];
                }
            }

            $formattedLogs[] = [
                'id' => (int)$log['id'],
                'name' => $log['name'] ?? 'Unknown User',
                'email' => $log['email'] ?? '',
                'type' => $log['activity_type'],
                'reference_type' => !empty($log['reference_type']) ? $log['reference_type'] : '-',
                'reference' => $reference,
                'details' => $details,
                'ip' => $log['ip_address'] ?? 'Unknown',
                'date' => date('d M Y, h:i A', strtotime($log['created_at'])),
                'date1' => date('d M Y', strtotime($log['created_at'])),
                'date2' => date('h:i A', strtotime($log['created_at']))
            ];
        }

        $totalActivities = (new \yii\db\Query())->from('user_activity')->count();
        $logins = (new \yii\db\Query())->from('user_activity')->where(['like', 'activity_type', 'Login'])->count();
        $wishlist = (new \yii\db\Query())->from('user_activity')->where(['like', 'activity_type', 'Wishlist'])->count();
        $enquiries = (new \yii\db\Query())->from('user_activity')->where(['like', 'activity_type', 'Enquiry'])->count();
        $profile = (new \yii\db\Query())->from('user_activity')->where(['like', 'activity_type', 'Profile'])->count();

        return [
            'status' => 'success',
            'data' => [
                'stats' => [
                    'totalActivities' => (int)$totalActivities,
                    'logins' => (int)$logins,
                    'wishlistActions' => (int)$wishlist,
                    'enquiriesSubmitted' => (int)$enquiries,
                    'profileUpdates' => (int)$profile
                ],
                'logs' => $formattedLogs,
                'pagination' => [
                    'total' => (int)$totalCount,
                    'page' => $page,
                    'perPage' => $perPage
                ]
            ]
        ];
    }

    // --- FAQS CRUD ---

    public function actionGetFaqs()
    {
        $faqs = Yii::$app->db->createCommand("SELECT * FROM faqs ORDER BY id DESC")->queryAll();
        return ['status' => 'success', 'data' => $faqs];
    }

    public function actionCreateFaq()
    {
        $data = Yii::$app->request->getBodyParams();
        $question = $data['question'] ?? '';
        $answer = $data['answer'] ?? '';
        $category = $data['category'] ?? 'Admission';
        $status = $data['status'] ?? 'Active';

        if (empty($question) || empty($answer)) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'message' => 'Question and answer are required.'];
        }

        $lastUpdated = date('d M Y');

        Yii::$app->db->createCommand()->insert('faqs', [
            'question' => $question,
            'answer' => $answer,
            'category' => $category,
            'status' => $status,
            'lastUpdated' => $lastUpdated,
            'created_at' => date('Y-m-d H:i:s'),
        ])->execute();

        return ['status' => 'success', 'message' => 'FAQ created successfully.'];
    }

    public function actionUpdateFaq()
    {
        $data = Yii::$app->request->getBodyParams();
        $id = $data['id'] ?? null;
        $question = $data['question'] ?? '';
        $answer = $data['answer'] ?? '';
        $category = $data['category'] ?? 'Admission';
        $status = $data['status'] ?? 'Active';

        if (!$id || empty($question) || empty($answer)) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'message' => 'ID, question, and answer are required.'];
        }

        $lastUpdated = date('d M Y');

        Yii::$app->db->createCommand()->update('faqs', [
            'question' => $question,
            'answer' => $answer,
            'category' => $category,
            'status' => $status,
            'lastUpdated' => $lastUpdated,
            'updated_at' => date('Y-m-d H:i:s'),
        ], 'id = :id', [':id' => $id])->execute();

        return ['status' => 'success', 'message' => 'FAQ updated successfully.'];
    }

    public function actionDeleteFaq()
    {
        $id = Yii::$app->request->get('id');
        if (!$id) {
            $data = Yii::$app->request->getBodyParams();
            $id = $data['id'] ?? null;
        }

        if (!$id) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'message' => 'FAQ ID is required.'];
        }

        Yii::$app->db->createCommand()->delete('faqs', 'id = :id', [':id' => $id])->execute();

        return ['status' => 'success', 'message' => 'FAQ deleted successfully.'];
    }
}
