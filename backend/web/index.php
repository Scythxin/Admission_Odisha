<?php

// Automatically enable dev mode on localhost, otherwise run in production mode
$host = $_SERVER['HTTP_HOST'] ?? '';
$isLocal = strpos($host, 'localhost') !== false || strpos($host, '127.0.0.1') !== false;

defined('YII_DEBUG') or define('YII_DEBUG', getenv('YII_DEBUG') !== false ? filter_var(getenv('YII_DEBUG'), FILTER_VALIDATE_BOOLEAN) : $isLocal);
defined('YII_ENV') or define('YII_ENV', getenv('YII_ENV') ?: ($isLocal ? 'dev' : 'prod'));

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../vendor/yiisoft/yii2/Yii.php';

$config = require __DIR__ . '/../config/web.php';

(new yii\web\Application($config))->run();
