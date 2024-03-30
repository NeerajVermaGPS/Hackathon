<?php
session_start();
if (isset($_SESSION["user"]) && $_SESSION["user"] === "student") {
    header("Location: student_index.php");
} else if (isset($_SESSION["user"]) && $_SESSION["user"] === "teacher") {
    header("Location: teacher_index.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Form</title>
    <link rel="stylesheet" href="files/styles.css">
    <link rel="stylesheet" href="files/files/components/select/style.css">
    <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div class="container">
        <?php
        if (isset($_POST["login"])) {
           $email = $_POST["email"];
           $password = $_POST["password"];
           $userRole = $_POST["role"];
            require_once "database.php";
            if($userRole == 1){
                $sql = "SELECT * FROM student WHERE email = '$email'";
                $result = mysqli_query($conn, $sql);
                $user = mysqli_fetch_array($result, MYSQLI_ASSOC);
                if ($user) {
                    if (password_verify($password, $user["password"])) {
                        session_start();
                        $_SESSION["user"] = "student";
                        $_SESSION["student_name"] = $user["full_name"];
                        $_SESSION["student_id"] = $user["rollno"];
                        header("Location: student_index.php");
                        die();
                    }else{
                        echo "<div class='alert-danger'>Password is wrong!</div>";
                    }
                }else{
                    echo "<div class='alert-danger'>Sorry, User not found!</div>";
                }
            } else if($userRole == 2){
                $sql = "SELECT * FROM teacher WHERE email = '$email'";
                $result = mysqli_query($conn, $sql);
                $user = mysqli_fetch_array($result, MYSQLI_ASSOC);
                if ($user) {
                    if (password_verify($password, $user["password"])) {
                        session_start();
                        $_SESSION["user"] = "teacher";
                        $_SESSION["teacher_name"] = $user["full_name"];
                        $_SESSION["teacher_id"] = $user["facultyId"];
                        header("Location: teacher_index.php");
                        die();
                    }else{
                        echo "<div class='alert-danger'>Password is wrong!</div>";
                    }
                }else{
                    echo "<div class='alert-danger'>Sorry, User not found!</div>";
                }
            } else {
                echo "<div class='alert-danger'>Please select a role!</div>";
            }
        }
        ?>
        <div class="l-form">
            <div class="circlea"></div>
            <div class="circleb"></div>

            <div class="form">
                <img src="files/authentication.png" alt="" class="fimg">

                <form  action="login.php" method="post" class="fcontent">
                    <h1 class="ftitle">Welcome</h1>

                    <div class="fdiv">
                        <div class="ficon">
                            <i class='bx bx-user-circle'></i>
                        </div>

                        <div class="fdiv-input">
                            <label for="" class="flabel">Email</label>
                            <input type="text" class="finput" name="email">
                        </div>
                    </div>

                    <div class="fdiv">
                        <div class="ficon">
                            <img src="files/rollno.svg" alt="roll">
                        </div>

                        <div class="fdiv-input">
                            <label for="" class="flabel">Roll Number/ Teacher ID</label>
                            <input type="roll" class="finput" name="roll">
                        </div>
                    </div>

                    <div class="fdiv">
                        <div class="ficon">
                            <i class='bx bx-lock' ></i>
                        </div>

                        <div class="fdiv-input">
                            <label for="" class="flabel">Password</label>
                            <input type="password" class="finput" name="password">
                        </div>
                    </div>

                    <div class="fdiv">
                        <div class="ficon">
                            <img src="files/role.svg" alt="roll" style="width: 90%; margin-left: 5px;">
                        </div>

                        <div class="fdiv-input">
                            <div class="custom-select" width="100%">
                                <select name="role">
                                    <option value="0">Select Role</option>
                                    <option value="1">Student</option>
                                    <option value="2">Teacher</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <input type="submit" name="login" class="fbutton" value="Login">
                </form>
            </div>

        </div>
        <script src="files/main.js"></script>
        <script src="files/files/components/select/script.js"></script>
    </div>
</body>
</html>