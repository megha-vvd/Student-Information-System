<?php
include '../db_connect.php';
header('Content-Type: application/json; charset=utf-8');
$out = [];
$res = $conn->query("SELECT id,name,email FROM students ORDER BY id DESC");
while($row = $res->fetch_assoc()) $out[] = $row;
echo json_encode($out);
?>