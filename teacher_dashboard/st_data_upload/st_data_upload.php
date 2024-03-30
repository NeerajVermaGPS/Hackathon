<?php
session_start();
if (!isset($_SESSION["user"]) || $_SESSION["user"] !== "teacher") {
   header("Location: login.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Student Data</title>
<link rel="stylesheet" href="../styles.css">
</head>
<body>
<div class="container">
  <h2>Student Data Form</h2>
  <form id="stDataForm">
    <label for="roll">Roll Number:</label>
    <input type="text" id="roll" name="roll" value="STU001" required>
    <label for="full_name">Full Name:</label>
    <input type="text" id="full_name" name="full_name" value="Neeraj" required>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" value="neeraj@gmail.com" required>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" value="123" required>
    <button type="submit">Submit</button>
  </form>
</div>
<div id="student_data_view"></div>
    <button id="uploadButton">Upload Quiz Data</button>
<script src="script.js"></script>
</body>
</html>
