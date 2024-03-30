<?php
// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login_register";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Decode JSON data sent from JavaScript
$studentData = json_decode(file_get_contents('php://input'), true);

// Prepare and execute SQL insert statements
foreach ($studentData as $student) {
    $roll = $student['roll'];
    $name = $student['name'];
    $email = $student['email'];
    $password = $student['password'];
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO student (rollno, full_name, email, password) VALUES ('$roll', '$name', '$email', '$passwordHash')";

    if ($conn->query($sql) !== TRUE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close database connection
$conn->close();
?>
