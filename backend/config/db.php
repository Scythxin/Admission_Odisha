<?php

require_once __DIR__ . '/dotenv.php';

$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbName = getenv('DB_NAME') ?: 'admission_odisha';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : '';
$dbPort = getenv('DB_PORT') ?: '3306';
$dbCharset = getenv('DB_CHARSET') ?: 'utf8mb4';

return [
    'class' => 'yii\db\Connection',
    'dsn' => "mysql:host={$dbHost};port={$dbPort};dbname={$dbName}",
    'username' => $dbUser,
    'password' => $dbPass,
    'charset' => $dbCharset,
];
