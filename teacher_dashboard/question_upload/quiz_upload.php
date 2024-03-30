<?php
session_start();
if (!isset($_SESSION["user"]) || $_SESSION["user"] !== "teacher") {
   header("Location: /hackathon/login-reg/login.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quiz Form</title>
<link rel="stylesheet" href="../styles.css">
</head>
<body>
<div class="container">
  <h2>Quiz Form</h2>
  <form id="quizForm">
    <label for="question">Question:</label>
    <input type="text" id="question" name="question" value="What is capital of India?" required>
    <label for="optionA">Option A:</label>
    <input type="text" id="optionA" name="optionA" value="Kolkata" required>
    <label for="optionB">Option B:</label>
    <input type="text" id="optionB" name="optionB" value="Delhi" required>
    <label for="optionC">Option C:</label>
    <input type="text" id="optionC" name="optionC" value="Mumbai" required>
    <label for="optionD">Option D:</label>
    <input type="text" id="optionD" name="optionD" value="Chennai" required>
    <label for="answer">Correct Answer:</label>
    <select id="answer" name="answer" required>
      <option value="A">Option A</option>
      <option value="B">Option B</option>
      <option value="C">Option C</option>
      <option value="D">Option D</option>
    </select>
    <button type="submit">Submit</button>
  </form>
</div>
<div id="quizResult"></div>
    <button id="uploadButton">Upload Quiz Data</button>
<script src="script.js"></script>
</body>
</html>
