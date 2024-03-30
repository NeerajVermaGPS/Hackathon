<?php
session_start();
if (!isset($_SESSION["user"]) || $_SESSION["user"] !== "student") {
   header("Location: login.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="/hackathon/chatbot/chat_style.css">
	<link rel="stylesheet" type="text/css" href="files/style.css">
    <link href='https://fonts.googleapis.com/css?family=Alata' rel='stylesheet'>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.3.1/styles/default.min.css">
    <title>User Dashboard</title>
</head>
<body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <div class="container">
        <h1>Welcome to Dashboard</h1>
        <a href="logout.php" class="btn btn-warning">Logout</a>
    </div>
    <div class="loadpage center column">
        <div class="load-header center column">
            <img src="files/files/poornima_logo.png" alt="Logo"><br>
            POORNIMA WELCOMES YOU
        </div>
        <div class="load column center">
            <div class="loader"><img src="files/files/loading-gif.gif" alt="loading-gif"></div>
            <div class="load-text" style="text-align: center;">Please Wait while we are loading...</div>
        </div>
    </div>
	<div class="student-detail center column">
		<div class="titbarsd center row">
			<div class="sdlogo center"><img src="files/files/poornima_logo.png" alt="Logo"></div>
			<div class="sdtit center column">
				<div class="instname comfont">POORNIMA COLLEGE OF ENGINEERING, JAIPUR</div>
				<div class="exname comfont">OPEN BOOK TEST - III</div>
			</div>
		</div>
    </div>
	<main id="instruction" class="center column">
		<div class="titbarsd center row">
			<div class="sdlogo center"><img src="files/files/user.png" alt="Logo" style="filter: invert(1)"></div>
			<div class="sdtit center column" style="justify-content: center;">
				<div class="instname comfont" id="instuser">WELCOME, <?php echo $_SESSION["user_name"] ?></div>
				<div class="exname comfont" id="instroll">Roll No.: <?php echo $_SESSION["user_id"] ?></div>
			</div>
		</div>
		<div class="inst-tit comfont">Instructions</div>
		<div class="instruct">
			<b style="color: red">This exam has different pattern from other classical online exams, so read all the INSTRUCTIONS carefully before starting the exam.</b>
			<br><br>
			<b>1.</b> Before starting the test keep in mind that if you exits full screen mode, clicks back button or tried to change the tab, the test will be auto-submitted and you will not be able to reattempt the test untill you send a request and your behaviour is not verified as non-suspicious. 
			<br><br>
			<b>2.</b> You are allowed to submit only once, make sure that you have correctly attempted all the questions before submission.
		</div>
		<button onclick="openFullscreen()" id="button" style="margin-bottom: 60px;">Start Test</button>
	</main>
	<main id="main">
		<div class="titbarsd center">
			<div class="mainUD center row">
				<div class="sdlogo center"><img src="files/files/user.png" alt="Logo" style="filter: invert(1)"></div>
				<div class="sdtit center column" style="justify-content: center;">
					<div class="instname comfont" id="mainuser">WELCOME, <?php echo $_SESSION["user_name"] ?></div>
					<div class="exname comfont" id="mainroll">Roll No.: <?php echo $_SESSION["user_id"] ?></div>
				</div>
			</div>	
			<div class="timer">Time left: <div id="timer"></div></div>
		</div>
		<div id="quiz">
			<div id="qstnno" class="qstn-no"></div>
			<div id="question"></div>
			<hr class="qstnspt">
			<div id="choices"></div>
		</div>
		<center><button id="submit2" onclick="submitQuiz()" style="margin: 20px; margin-bottom: 80px;">Submit</button></center>
		<div class="openChatBot" onclick="openChatBot()">OPEN CHAT</div>
		<div class="chatBotCont">
			<div class="chatbot">
				<div class="chathead">
					<div style="width: 90%; display: flex; align-items: center;">Your Assistant</div>
					<div class="minimize center" style="height: 30px;" onclick="closeChatBot()"><img src="files/files/close.svg" alt="Close" style="height: 20px;">
					</div>
				</div>
				<div class="chatmain">
					<div class="cb_container">
						<div class="chat-container" id="chatContainer">
						</div>
						<div class="prompt-cont">
							<form class="prompt">
							<textarea id="promptInput" placeholder="Enter your prompt here..." rows="1" maxlength="2000" autofocus></textarea>
							<div id="cb_submitButton"><img src="/hackathon/chatbot/files/send.svg" alt="send"></div>
							</form>
						</div>
					</div>
					<aside id="informations" class="center"></aside>
				</div>
			</div>
		</div>
	</main>
	<div class="camera-container" style="display: none">
		<video id="recordedVideo" autoplay></video>
	</div>
    <script type="module" src="/hackathon/chatbot/gemini_txt.js"></script>
    <script src="files/script.js"></script>
    <script src="/hackathon/chatbot/preprocessor.js"></script>
	<script src="files/layers.js"></script>
</body>
</html>