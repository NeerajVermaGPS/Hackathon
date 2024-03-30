<?php
session_start();

if (isset($_SESSION["user"]) && isset($_SESSION["student_name"]) && isset($_SESSION["student_id"])) {
    $sessionData = array(
        "user" => $_SESSION["user"],
        "user_name" => $_SESSION["student_name"],
        "user_id" => $_SESSION["student_id"],
    );
    header('Content-Type: application/json');
    echo json_encode($sessionData);
} else if (isset($_SESSION["user"]) && isset($_SESSION["teacher_name"]) && isset($_SESSION["teacher_id"])) {
    $sessionData = array(
        "user" => $_SESSION["user"],
        "user_name" => $_SESSION["teacher_name"],
        "user_id" => $_SESSION["teacher_id"],
    );
    header('Content-Type: application/json');
    echo json_encode($sessionData);
} else {
    echo "Session data not found";
}
?>
