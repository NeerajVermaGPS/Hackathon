<?php
// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quiz_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Decode JSON data sent from JavaScript
$quizData = json_decode(file_get_contents('php://input'), true);

// Prepare and execute SQL insert statements
foreach ($quizData as $question) {
    $question_text = $question['question'];
    $option_a = $question['option_a'];
    $option_b = $question['option_b'];
    $option_c = $question['option_c'];
    $option_d = $question['option_d'];
    $correct_answer = $question['correct_answer'];

    $sql = "INSERT INTO Quiz (question, option_a, option_b, option_c, option_d, correct_answer) VALUES ('$question_text', '$option_a', '$option_b', '$option_c', '$option_d', '$correct_answer')";

    if ($conn->query($sql) !== TRUE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close database connection
$conn->close();
?>
