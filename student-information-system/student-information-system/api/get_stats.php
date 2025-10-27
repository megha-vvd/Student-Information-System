<?php
include '../db_connect.php';
// counts
$resp = ['students'=>0,'courses'=>0,'enrollments'=>0];
$r = $conn->query("SELECT COUNT(*) as c FROM students")->fetch_assoc(); $resp['students'] = (int)$r['c'];
$r = $conn->query("SELECT COUNT(*) as c FROM courses")->fetch_assoc(); $resp['courses'] = (int)$r['c'];
$r = $conn->query("SELECT COUNT(*) as c FROM enrollments")->fetch_assoc(); $resp['enrollments'] = (int)$r['c'];
echo json_encode($resp);
?>