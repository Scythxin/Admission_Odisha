<?php

$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbName = getenv('DB_NAME') ?: 'admi_admission_odisha';
$dbUser = getenv('DB_USER') ?: 'admi_ashirbaddas';
$dbPass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : 'TgU3to7@^86p%my';
$dbPort = getenv('DB_PORT') ?: '3306';

return [
    'class' => 'yii\db\Connection',
    'dsn' => "mysql:host={$dbHost};port={$dbPort};dbname={$dbName}",
    'username' => $dbUser,
    'password' => $dbPass,
    'charset' => 'utf8mb4',
];