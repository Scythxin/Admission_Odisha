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
        if (in_array($action->id, ['api-contact', 'api-course-detail', 'api-field-detail', 'api-colleges', 'api-college-detail'])) {
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
                    'Origin' => ['http://localhost:5173', 'http://127.0.0.1:5173'],
                    'Access-Control-Request-Method' => ['GET', 'POST', 'OPTIONS'],
                    'Access-Control-Request-Headers' => ['*'],
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
}
