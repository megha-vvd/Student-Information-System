<?php
// db_connect.php - update credentials if needed
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "student_sis_db";

header('Content-Type: application/json; charset=utf-8');

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}
?>