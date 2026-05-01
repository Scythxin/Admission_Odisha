<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';
$secrets = file_exists(__DIR__ . '/secrets.php') ? require __DIR__ . '/secrets.php' : [];

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'components' => [
        'request' => [
    'cookieValidationKey' => 'EazsQFD7tKLBk0Da2TzlxvR19Hpst0aV',
    'parsers' => [
        'application/json' => 'yii\web\JsonParser',
    ]
],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => \yii\symfonymailer\Mailer::class,
            'viewPath' => '@app/mail',
            // To send real emails, changed 'useFileTransport' to false and configured the 'transport' array below.
            // When true, it just saves emails as files inside backend/runtime/mail/ so I changed it to false to send real emails.
            'useFileTransport' => false,
            
            // Gmail SMTP Configuration
            'transport' => [
                'scheme' => 'smtps',
                'host' => 'smtp.gmail.com',
                'username' => '2004bshree@gmail.com', // Your Gmail address
                'password' => $secrets['gmail_app_password'] ?? 'PUT_YOUR_APP_PASSWORD_HERE',
                'port' => 465,
            ],
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        /*
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
            ],
        ],
        */
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];
}

return $config;
