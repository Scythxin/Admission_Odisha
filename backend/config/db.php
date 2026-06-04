<?php

return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=admission_odisha',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8mb4',
];

$host = "localhost";
$user = "root";
$password = "";
$database = "admission_odisha";

$conn = mysqli_connect(
    $host,
    $user,
    $password,
    $database
);

if (!$conn) {
    die(json_encode([
        "success" => false,
        "message" => "Database Connection Failed"
    ]));
}

?>