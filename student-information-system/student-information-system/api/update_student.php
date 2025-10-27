<?php
include '../db_connect.php';
header('Content-Type: application/json; charset=utf-8');
$input = json_decode(file_get_contents('php://input'), true);
if(!$input || !isset($input['id']) || !isset($input['name']) || !isset($input['email'])){
  http_response_code(400);
  echo json_encode(['error'=>'Invalid input']);
  exit();
}
$id = (int)$input['id'];
$name = $conn->real_escape_string($input['name']);
$email = $conn->real_escape_string($input['email']);
$stmt = $conn->prepare('UPDATE students SET name=?, email=? WHERE id=?');
$stmt->bind_param('ssi',$name,$email,$id);
if($stmt->execute()){
  echo json_encode(['success'=>true]);
} else {
  http_response_code(500);
  echo json_encode(['error'=>'Update failed']);
}
?>