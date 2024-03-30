<?php
session_start();
if (!isset($_SESSION["user"]) || $_SESSION["user"] !== "teacher") {
   header("Location: login.php");
   exit();
}

$teacherName = $_SESSION["teacher_name"];
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Page</title>
<link rel="stylesheet" href="files/ti.css">
</head>
<body>

<div class="navbar">
  <span>Welcome, <?php echo $teacherName; ?></span>
</div>

<div class="sidebar">
  <ul>
    <li><a href="/hackathon/teacher_dashboard/st_data_upload/st_data_upload.php">Student Data Upload</a></li>
    <li><a href="/hackathon/teacher_dashboard/question_upload/quiz_upload.php">Quiz Upload</a></li>
    <li><a href="logout.php">Logout</a></li>
  </ul>
</div>

<div class="content">
  <h2>Admin Page</h2>
  <p>Welcome to the admin page. Use the links in the sidebar to navigate.</p>
</div>

</body>
</html>
