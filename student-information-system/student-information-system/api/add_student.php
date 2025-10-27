<?php
include '../db_connect.php';
header('Content-Type: application/json; charset=utf-8');
$input = json_decode(file_get_contents('php://input'), true);
if(!$input || !isset($input['name']) || !isset($input['email'])){
  http_response_code(400);
  echo json_encode(['error'=>'Invalid input']);
  exit();
}
$name = $conn->real_escape_string($input['name']);
$email = $conn->real_escape_string($input['email']);
$stmt = $conn->prepare('INSERT INTO students (name,email) VALUES (?,?)');
$stmt->bind_param('ss',$name,$email);
if($stmt->execute()){
  echo json_encode(['success'=>true,'id'=>$stmt->insert_id]);
} else {
  http_response_code(500);
  echo json_encode(['error'=>'Insert failed']);
}
?>