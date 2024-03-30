<?php
$hostName = "localhost";
$dbUser = "root";
$dbPassword = "";
$dbName = "quiz_db";
$conn = mysqli_connect($hostName, $dbUser, $dbPassword, $dbName);
if (!$conn) {
    die("Something went wrong;");
}

$sql = "SELECT question_number, question, option_a, option_b, option_c, option_d FROM Quiz";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $quizData = array();

    while ($row = $result->fetch_assoc()) {
        $quizData[] = $row;
    }

    header('Content-Type: application/json');

    echo json_encode($quizData, JSON_PRETTY_PRINT);
} else {
    echo "0 results";
}

$conn->close();
?>
