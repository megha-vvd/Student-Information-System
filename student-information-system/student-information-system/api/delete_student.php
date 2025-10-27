<?php
include '../db_connect.php';
header('Content-Type: application/json; charset=utf-8');
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if(!$id){ http_response_code(400); echo json_encode(['error'=>'Missing id']); exit(); }
$stmt = $conn->prepare('DELETE FROM students WHERE id=?');
$stmt->bind_param('i',$id);
if($stmt->execute()){
  echo json_encode(['success'=>true]);
} else {
  http_response_code(500);
  echo json_encode(['error'=>'Delete failed']);
}
?>