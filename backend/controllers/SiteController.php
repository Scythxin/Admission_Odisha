<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use app\models\ApiContactForm;

class SiteController extends Controller
{
    /**
     * @inheritdoc
     */
    public function beforeAction($action)
    {            
        if (in_array($action->id, ['api-contact', 'api-course-detail', 'api-general-course-detail', 'api-field-detail', 'api-colleges', 'api-college-detail', 'api-college-course-specializations', 'api-submit-enquiry', 'api-get-wishlist', 'api-toggle-wishlist', 'api-get-wishlist-colleges', 'api-clear-wishlist'])) {
            $this->enableCsrfValidation = false;
        }
        return parent::beforeAction($action);
    }

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => \yii\filters\Cors::class,
                'cors' => [
                    // Allow common development ports
                    'Origin' => [
                        'http://localhost:5173', 
                        'http://127.0.0.1:5173',
                        'http://localhost:3000',
                        'http://localhost:4173',
                    ],
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Allow-Credentials' => true,
                    'Access-Control-Max-Age' => 86400,
                ],
            ],
            'access' => [
                'class' => AccessControl::class,
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        return $this->render('index');
    }

    /**
     * Login action.
     *
     * @return Response|string
     */
    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        }

        $model->password = '';
        return $this->render('login', [
            'model' => $model,
        ]);
    }

    /**
     * Logout action.
     *
     * @return Response
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Displays contact page.
     *
     * @return Response|string
     */
    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');

            return $this->refresh();
        }
        return $this->render('contact', [
            'model' => $model,
        ]);
    }

    /**
     * Displays about page.
     *
     * @return string
     */
    public function actionAbout()
    {
        return $this->render('about');
    }

    /**
     * Handles API contact form submission.
     *
     * @return Response|array
     */
    public function actionApiContact()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $model = new ApiContactForm();
        
        // Load data from JSON body
        $requestData = Yii::$app->request->getBodyParams();
        
        if ($model->load($requestData, '') && $model->contact(Yii::$app->params['adminEmail'])) {
            return ['status' => 'success', 'message' => 'Your message has been sent successfully.'];
        }

        Yii::$app->response->statusCode = 400;
        return ['status' => 'error', 'message' => 'Failed to send message.', 'errors' => $model->errors];
    }

    /**
     * Handles API course detail fetching.
     *
     * @return Response|array
     */
    public function actionApiCourseDetail()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        
        $name = Yii::$app->request->get('name', 'Computer Science Engineering');
        
        $specialization = Yii::$app->db->createCommand("SELECT * FROM specializations WHERE name = :name", [':name' => $name])->queryOne();
        
        if (!$specialization) {
            Yii::$app->response->statusCode = 404;
            return ['status' => 'error', 'message' => 'Specialization not found'];
        }
        
        $details = Yii::$app->db->createCommand("SELECT * FROM specialization_details WHERE specialization_id = :id", [':id' => $specialization['id']])->queryOne();
        
        $courses = Yii::$app->db->createCommand("SELECT * FROM courses WHERE specialization_id = :id AND is_status = 1", [':id' => $specialization['id']])->queryAll();
        
        $universities = [];
        if (!empty($courses)) {
            $courseIds = array_column($courses, 'id');
            $namedParams = [];
            $paramBindings = [];
            foreach ($courseIds as $i => $id) {
                $key = ':cid' . $i;
                $namedParams[] = $key;
                $paramBindings[$key] = $id;
            }
            $placeholders = implode(',', $namedParams);
            $sql = "SELECT DISTINCT c.* FROM colleges c 
                    JOIN college_courses cc ON c.id = cc.college_id 
                    WHERE cc.course_id IN ($placeholders) AND c.is_status = 1";
            $universities = Yii::$app->db->createCommand($sql, $paramBindings)->queryAll();
        }
        
        // Ensure eligibility is decoded if it's stored as JSON string
        if ($details && !empty($details['eligibility'])) {
            $eligibilityDecoded = json_decode($details['eligibility'], true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $details['eligibility'] = $eligibilityDecoded;
            }
        }
        
        $field = Yii::$app->db->createCommand("SELECT * FROM fields WHERE id = :id", [':id' => $specialization['field_id']])->queryOne();
        
        return [
            'status' => 'success',
            'data' => [
                'specialization' => $specialization,
                'field' => $field,
                'details' => $details,
                'courses' => $courses,
                'universities' => $universities
            ]
        ];
    }

    /**
     * Handles API general course detail fetching (e.g. B.Tech).
     *
     * @return Response|array
     */
    public function actionApiGeneralCourseDetail()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        
        $slug = Yii::$app->request->get('slug', 'btech');
        
        $course = Yii::$app->db->createCommand("SELECT * FROM course_details WHERE slug = :slug", [':slug' => $slug])->queryOne();
        
        if (!$course) {
            Yii::$app->response->statusCode = 404;
            return ['status' => 'error', 'message' => 'Course not found'];
        }
        
        // Fetch general course data for duration, level, mode, degree
        $generalCourse = Yii::$app->db->createCommand("SELECT * FROM general_courses WHERE LOWER(REPLACE(name, '.', '')) = :slug OR name = :sname", [
            ':slug' => $slug,
            ':sname' => $course['short_name']
        ])->queryOne();
        
        if ($generalCourse) {
            $course['duration'] = $generalCourse['duration'];
            $course['degree'] = $generalCourse['name'];
            $course['mode'] = $generalCourse['course_type'];
            $course['level'] = $generalCourse['degree_level'];
        }

        // Fetch top specializations dynamically
        $specializations = Yii::$app->db->createCommand("
            SELECT s.name as label 
            FROM specializations s 
            JOIN courses c ON c.specialization_id = s.id 
            WHERE c.name LIKE :cname OR c.name = :cname2
            GROUP BY s.id 
            LIMIT 5
        ", [
            ':cname' => $course['short_name'] . ' %',
            ':cname2' => $course['short_name']
        ])->queryAll();
        
        $course['top_specializations'] = $specializations;

        // Fetch top colleges dynamically
        $colleges = Yii::$app->db->createCommand("
            SELECT name, location as city, rating 
            FROM colleges 
            WHERE courses LIKE :cname 
            AND is_status = 1
            ORDER BY rating DESC 
            LIMIT 6
        ", [
            ':cname' => '%"' . $course['short_name'] . '"%'
        ])->queryAll();

        $course['top_colleges'] = $colleges;
        
        // Decode remaining JSON fields
        $jsonFields = ['career_opportunities', 'eligibility'];
        foreach ($jsonFields as $field) {
            if (!empty($course[$field])) {
                $decoded = json_decode($course[$field], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $course[$field] = $decoded;
                }
            }
        }
        
        return [
            'status' => 'success',
            'data' => $course
        ];
    }

    /**
     * Returns a field's details and all its specializations.
     *
     * @return Response|array
     */
    public function actionApiFieldDetail()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $fieldName = Yii::$app->request->get('field', '');

        $field = Yii::$app->db->createCommand(
            "SELECT * FROM fields WHERE name = :name AND is_status = 1",
            [':name' => $fieldName]
        )->queryOne();

        if (!$field) {
            Yii::$app->response->statusCode = 404;
            return ['status' => 'error', 'message' => 'Field not found'];
        }

        $specializations = Yii::$app->db->createCommand(
            "SELECT * FROM specializations WHERE field_id = :fid AND is_status = 1",
            [':fid' => $field['id']]
        )->queryAll();

        return [
            'status' => 'success',
            'data' => [
                'field' => $field,
                'specializations' => $specializations
            ]
        ];
    }
    /**
     * Returns all colleges.
     *
     * @return Response|array
     */
    public function actionApiColleges()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $colleges = Yii::$app->db->createCommand("SELECT * FROM colleges WHERE is_status = 1")->queryAll();
        return [
            'status' => 'success',
            'data' => $colleges
        ];
    }

    /**
     * Returns a college's details.
     *
     * @return Response|array
     */
    public function actionApiCollegeDetail()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $id = Yii::$app->request->get('id');
        
        $college = Yii::$app->db->createCommand("SELECT * FROM colleges WHERE id = :id AND is_status = 1", [':id' => $id])->queryOne();
        
        if (!$college) {
            Yii::$app->response->statusCode = 404;
            return ['status' => 'error', 'message' => 'College not found'];
        }

        if (!empty($college['courses'])) {
            $decoded = json_decode($college['courses'], true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $college['courses'] = $decoded;
            }
        }
        
        // Fetch courses offered by this college
        $sql = "SELECT co.*, cc.id as mapping_id FROM courses co 
                JOIN college_courses cc ON co.id = cc.course_id 
                WHERE cc.college_id = :cid AND co.is_status = 1";
        $courses = Yii::$app->db->createCommand($sql, [':cid' => $id])->queryAll();
        
        return [
            'status' => 'success',
            'data' => [
                'college' => $college,
                'courses' => $courses
            ]
        ];
    }
    /**
     * Returns a college's specializations for a specific general course.
     *
     * @return Response|array
     */
    public function actionApiCollegeCourseSpecializations()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $collegeId = Yii::$app->request->get('college_id');
        $courseName = Yii::$app->request->get('course_name');
        
        $college = Yii::$app->db->createCommand("SELECT * FROM colleges WHERE id = :id AND is_status = 1", [':id' => $collegeId])->queryOne();
        
        if (!$college) {
            Yii::$app->response->statusCode = 404;
            return ['status' => 'error', 'message' => 'College not found'];
        }

        $course = Yii::$app->db->createCommand("SELECT * FROM general_courses WHERE name = :name", [':name' => $courseName])->queryOne();
        
        if (!$course) {
            Yii::$app->response->statusCode = 404;
            return ['status' => 'error', 'message' => 'Course not found'];
        }
        
        $sql = "SELECT s.name, s.image, ccs.total_seats, ccs.short_desc 
                FROM college_course_specializations ccs
                JOIN specializations s ON ccs.specialization_id = s.id
                WHERE ccs.college_id = :cid AND ccs.course_id = :course_id AND ccs.is_status = 1";
        $specializations = Yii::$app->db->createCommand($sql, [':cid' => $collegeId, ':course_id' => $course['id']])->queryAll();
        
        return [
            'status' => 'success',
            'data' => [
                'college' => $college,
                'course' => $course,
                'specializations' => $specializations
            ]
        ];
    }
    /**
     * Handles API enquiry submission from the floating popup.
     *
     * @return Response|array
     */
    public function actionApiSubmitEnquiry()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $requestData = Yii::$app->request->getBodyParams();
        
        $fullName = isset($requestData['fullName']) ? $requestData['fullName'] : '';
        $phone = isset($requestData['phone']) ? $requestData['phone'] : '';
        $courses = isset($requestData['courses']) ? $requestData['courses'] : '';
        $colleges = isset($requestData['colleges']) ? $requestData['colleges'] : '';
        $location = isset($requestData['location']) ? $requestData['location'] : '';
        $guidance = isset($requestData['guidance']) ? $requestData['guidance'] : 'yes';

        if (empty($fullName) || empty($phone)) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'message' => 'Name and Phone are required.'];
        }

        try {
            Yii::$app->db->createCommand()->insert('enquiries', [
                'full_name' => $fullName,
                'phone' => $phone,
                'courses' => $courses,
                'colleges' => $colleges,
                'location' => $location,
                'guidance' => $guidance,
                'created_at' => date('Y-m-d H:i:s'),
            ])->execute();

            return ['status' => 'success', 'message' => 'Enquiry submitted successfully.'];
        } catch (\Exception $e) {
            Yii::$app->response->statusCode = 500;
            return ['status' => 'error', 'message' => 'Failed to save enquiry.'];
        }
    }

    /**
     * Handles API to get user's wishlist
     */
    public function actionApiGetWishlist()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $token = Yii::$app->request->headers->get('Authorization');
        
        if (!$token) {
            Yii::$app->response->statusCode = 401;
            return ['status' => 'error', 'message' => 'Unauthorized'];
        }
        
        $userLogin = Yii::$app->db->createCommand("SELECT user_id FROM user_login WHERE token = :token")
            ->bindValue(':token', $token)->queryOne();
            
        if (!$userLogin) {
            Yii::$app->response->statusCode = 401;
            return ['status' => 'error', 'message' => 'Invalid token'];
        }
        
        $wishlist = Yii::$app->db->createCommand("SELECT college_id FROM wishlist WHERE user_id = :uid")
            ->bindValue(':uid', $userLogin['user_id'])->queryColumn();
            
        return ['status' => 'success', 'data' => $wishlist];
    }

    /**
     * Handles API to toggle wishlist item
     */
    public function actionApiToggleWishlist()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        
        $token = Yii::$app->request->headers->get('Authorization');
        if (!$token) {
            Yii::$app->response->statusCode = 401;
            return ['status' => 'error', 'message' => 'Unauthorized'];
        }
        
        $userLogin = Yii::$app->db->createCommand("SELECT user_id FROM user_login WHERE token = :token")
            ->bindValue(':token', $token)->queryOne();
            
        if (!$userLogin) {
            Yii::$app->response->statusCode = 401;
            return ['status' => 'error', 'message' => 'Invalid token'];
        }
        
        $data = json_decode(Yii::$app->request->getRawBody(), true);
        $collegeId = $data['college_id'] ?? null;
        
        if (!$collegeId) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'message' => 'College ID is required'];
        }
        
        $existing = Yii::$app->db->createCommand("SELECT * FROM wishlist WHERE user_id = :uid AND college_id = :cid")
            ->bindValue(':uid', $userLogin['user_id'])
            ->bindValue(':cid', $collegeId)
            ->queryOne();
            
        if ($existing) {
            Yii::$app->db->createCommand()->delete('wishlist', ['user_id' => $userLogin['user_id'], 'college_id' => $collegeId])->execute();
            return ['status' => 'success', 'message' => 'Removed from wishlist', 'is_wishlisted' => false];
        } else {
            Yii::$app->db->createCommand()->insert('wishlist', [
                'user_id' => $userLogin['user_id'],
                'college_id' => $collegeId,
                'created_at' => date('Y-m-d H:i:s')
            ])->execute();
            return ['status' => 'success', 'message' => 'Added to wishlist', 'is_wishlisted' => true];
        }
    }

    /**
     * Handles API to get full college details for user's wishlist
     */
    public function actionApiGetWishlistColleges()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $token = Yii::$app->request->headers->get('Authorization');
        
        if (!$token) {
            Yii::$app->response->statusCode = 401;
            return ['status' => 'error', 'message' => 'Unauthorized'];
        }
        
        $userLogin = Yii::$app->db->createCommand("SELECT user_id FROM user_login WHERE token = :token")
            ->bindValue(':token', $token)->queryOne();
            
        if (!$userLogin) {
            Yii::$app->response->statusCode = 401;
            return ['status' => 'error', 'message' => 'Invalid token'];
        }
        
        $colleges = Yii::$app->db->createCommand("
            SELECT c.* FROM colleges c
            JOIN wishlist w ON c.id = w.college_id
            WHERE w.user_id = :uid AND c.is_status = 1
        ")->bindValue(':uid', $userLogin['user_id'])->queryAll();
            
        foreach ($colleges as &$college) {
            if (!empty($college['courses']) && is_string($college['courses'])) {
                $decoded = json_decode($college['courses'], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $college['courses'] = $decoded;
                }
            }
        }
            
        return ['status' => 'success', 'data' => $colleges];
    }

    /**
     * Handles API to clear user's wishlist
     */
    public function actionApiClearWishlist()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        
        $token = Yii::$app->request->headers->get('Authorization');
        if (!$token) {
            Yii::$app->response->statusCode = 401;
            return ['status' => 'error', 'message' => 'Unauthorized'];
        }
        
        $userLogin = Yii::$app->db->createCommand("SELECT user_id FROM user_login WHERE token = :token")
            ->bindValue(':token', $token)->queryOne();
            
        if (!$userLogin) {
            Yii::$app->response->statusCode = 401;
            return ['status' => 'error', 'message' => 'Invalid token'];
        }
        
        Yii::$app->db->createCommand()->delete('wishlist', ['user_id' => $userLogin['user_id']])->execute();
        
        return ['status' => 'success', 'message' => 'Wishlist cleared'];
    }
}
