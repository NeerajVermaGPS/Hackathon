const html = document.querySelector("html");
const main = document.getElementById("main");
let submitStatus = false;
let quizData;

var k,l;
  fetch('files/files/scripts/get_session_user.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(sessionData => {
      k = sessionData.user_name;
      l = sessionData.user_id;
    })
    .catch(error => {
      console.error('Error fetching session data:', error);
    });

// Layer 1
setTimeout(closeLoad, 4000);
function closeLoad() {
  let loadpage = document.getElementsByClassName("loadpage")[0];
  submitPara();
  loadpage.style.display = "none";
  let accessStatus = getCookie("noAccess");
  let submitStatusC = getCookie("submitted");
  
  if (accessStatus == "true" || submitStatusC == "false"){
      accessDenied();
  }
  if (submitStatusC == "true"){
      alreadySubmitted();
  }
}

// Login Form
function submitPara() {
    enter();
    document.querySelector("#instuser").innerText = `WELCOME, ${k}`;
    document.querySelector("#instroll").innerText = `Roll No.: ${l}`;
    document.querySelector("#mainuser").innerText = `WELCOME, ${k}`;
    document.querySelector("#mainroll").innerText = `Roll No.: ${l}`;
}
function enter() {
  document.getElementById("instruction").style.display = "flex";
}

// Screen Change Handling
function openFullscreen() {
  if (html.requestFullscreen) {
    html.requestFullscreen();
  } else if (html.mozRequestFullScreen) {
    html.mozRequestFullScreen();
  } else if (html.webkitRequestFullscreen) {
    html.webkitRequestFullscreen();
  } else if (html.msRequestFullscreen) {
    html.msRequestFullscreen();
  }
  screenChangeNo++;
  loadQuestion();
}
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

// Full Screen Exit Event
document.addEventListener("fullscreenchange", function (event) {
  if (!document.fullscreenElement) {
    console.log("Exited full screen mode.");
    if (!submitStatus){
      document.cookie = `noAccess = true; expires=Mon, 01 Jan 2024 00:00:00 UTC, path=/`;
      accessDenied();
      clearInterval(timeInterval)
      console.log("Submit Status is False.");
    } else {
      console.log("Submit Status is True.");
    }
    stopRecording();
  }
});

// Choice Click
function rateClick() {
  let rateElements = document.querySelectorAll(".rate-rank");
  document.cookie = `rated${userNo}= N/A; expires=Mon, 01 Jan 2024 00:00:00 UTC; path=/;`;
  rateElements.forEach((rateElement) => {
    rateElement.addEventListener("click", function() {
      rateElements.forEach((element) => {
        element.classList.remove("rated");
      });
  
      this.classList.add("rated");
      let rating = this.innerText;
      document.cookie = `rated${userNo}= ${rating}; expires=Mon, 01 Jan 2024 00:00:00 UTC; path=/;`;
      document.getElementsByClassName("dia-btn")[0].innerText = "Done";
    });
  });
  }

  let questions;

fetch('/hackathon/quiz_project/files/quiz_data.php')
  .then(response => response.json())
  .then(data => {
    quizData = data.map(question => ({
      question_number: question.question_number,
      question: question.question,
      choices: [question.option_a,question.option_b,question.option_c,question.option_d, "Skip"]
    }));
    console.log(quizData)
  })
  .catch(error => console.error('Error fetching quiz data:', error));

// Choice Click
function choiceClick(e) {
  let choiceElements = document.querySelectorAll(e);
  
  choiceElements.forEach((choiceElement) => {
    choiceElement.addEventListener("click", function() {
      choiceElements.forEach((element) => {
        element.classList.remove("checkedchoices");
      });
  
      this.classList.add("checkedchoices");
    });
  });
  }  

// Getting Back Quiz Data
const quizContainer = document.getElementById("quiz");
const questionContainer = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const submitButton = document.getElementById("submit");
let currentQuestion = 0;
let score = 0;
let screenChangeNo = 0;

// Add Next Button to Question
function addNext() {
  let submitBtn = document.createElement("button");
  submitBtn.setAttribute("id", "submit");
  submitBtn.textContent = "Next";
  quizContainer.appendChild(submitBtn);
  submitBtn.addEventListener("click", checkAnswer);
}

//Timer
let totalTime, second, minute, hour, secInterval, timeInterval;
hour = "00";
minute = 5;
totalTime = 60*5;

function startTimer(){
  secInterval = setInterval(createSec, 1000); 
  timeInterval = setInterval(timing, 1000);
}

function createSec(){
  totalTime = totalTime - 1;
  if(totalTime >= 0){
      if(second > 0){
          second = second - 1;
          if(second<10){
              second = `0${second}`;
          }
      } else {
          second = 59; 
          if(minute > 0){
          minute = minute - 1;
              if(minute<10){
                  minute = `0${minute}`;
              }
          } else {
              minute = 59;
              hour = parseInt(hour) - 1;
                  if(hour<10){
                      hour = `0${hour}`;
                  }
          }  
      }            
  } else if (totalTime < 0){
      clearInterval(secInterval);
  }      
}

function timing(){
  let timerId = document.getElementById("timer");
  if(totalTime >= 0){
      let time = hour+":"+minute+":"+second;
      timerId.innerHTML = time;;
  } else {
      submitQuiz();
  }
}

// Load Questions and Options
function loadQuestion() {
	let optionTit = ["A", "B", "C", "D", "E"];
  const qstnNum = document.getElementById("qstnno");
	qstnNum.textContent = `Question ${(currentQuestion+1)}/${quizData.length}`;
  const currentQuizData = quizData[currentQuestion];
  questionContainer.textContent = currentQuizData.question;
  choicesContainer.innerHTML = "";
  let chatBotQstn = document.getElementsByClassName("chatqstn");
  let chatBotAns = document.getElementsByClassName("chatans");
  for (let chatNumber = 0; chatNumber < chatBotQstn.length; chatNumber++) {
      chatBotQstn[chatNumber].innerHTML = "";
      chatBotAns[chatNumber].innerHTML = "";
  }
  let i = 0;

  currentQuizData.choices.forEach((choice) => {
    const choicediv = document.createElement("div");
    const label = document.createElement("label");
    const radio = document.createElement("input");
    const opttitle = document.createElement("div");
    const optcont = document.createElement("div");
    radio.type = "radio";
    radio.name = "choice";
    radio.value = choice;
    optcont.textContent = choice;
	  opttitle.textContent = optionTit[i];
    choicediv.classList.add("choices");
    opttitle.classList.add("opttit");
    label.appendChild(opttitle);
    label.appendChild(optcont);
    label.appendChild(radio);
    choicesContainer.appendChild(choicediv);
    choicediv.appendChild(label);
	i++;
  });

  choiceClick(".choices");

  if (screenChangeNo == 1 && currentQuestion == 0) {
    addNext();
    setUser();
    recordVideo();
    startTimer();
    document.cookie = `submitted = false; expires=Mon, 01 Jan 2024 00:00:00 UTC, path=/`;
    document.getElementById("instruction").style.display = "none";
    document.getElementById("main").style.display = "block";
  }

  document.querySelectorAll('input[name="choice"]')[4].checked = true;
}

// Checking Answer and Assigning Marks
function checkAnswer() {
  let userAnswer = document.querySelector('input[name="choice"]:checked').value;

  if (userAnswer === quizData[currentQuestion].answer) {
    score = score + 4;
  } else if (userAnswer === "Skip") {
    score = score;
  } else if (userAnswer != quizData[currentQuestion].answer) {
    score = score - 1;
  }
  
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    quizOver();
  }
}

// Quiz Over Page
function quizOver() {
  quizContainer.innerHTML = `
		<h2 style="text-align: center; width: 100%; font-size: 25px" class="comfont">Thanks For attempting the test.</h2>
	`;
}

// Submit Quiz
function submitQuiz() {
  submitStatus = true;
  closeFullscreen();
  clearInterval(timeInterval);
  document.cookie = `submitted = true; expires=Mon, 01 Jan 2024 00:00:00 UTC, path=/`;
  onSubmission();
  stopRecording();
}

//Camera Recording
let stream, videoElement, recorder, chunks;
async function recordVideo() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    videoElement = document.getElementById("recordedVideo");
    videoElement.srcObject = stream;
    recorder = new MediaRecorder(stream, {
      mimeType: "video/webm; codecs=vp9",
    });
    chunks = [];
    recorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };
    recorder.onstop = async () => {
      setTimeout(videoURL, 200);
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      videoElement.src = url;
      const formData = new FormData();
      formData.append("video", blob);
    };
    recorder.start();
  } catch (error) {
    console.error(`Failed to record video: ${error.toString()}`);
  }
}

// Stop Recording
function stopRecording() {
  recorder.stop();
  stream.getTracks().forEach((track) => track.stop());
  videoURL();
}

// Send URL and All Credentials to Cookies on Submit
let video, source;
function videoURL() {
  video = document.getElementById("recordedVideo");
  source = video.getAttribute("src");
  backEnd();
}

// Open and Close Chatbot
let chatBotCont = document.getElementsByClassName("chatBotCont")[0];
let chatBotBtn = document.getElementsByClassName("openChatBot")[0];
function openChatBot() {
  chatBotCont.style.display = "block";
  chatBotBtn.style.display = "none";
}
function closeChatBot() {
  chatBotBtn.style.display = "block";
  chatBotCont.style.display = "none";
}

// Storing Credentials in Variables
let user, roll, email, userNo;
function setUser() {
  user = "";
  roll = "";
  email = "";
  userNo = ""; // Changes according to roll no.
}

// Storing Credentials in Cookies on Submit
function backEnd() {
  const d = new Date();
  d.setTime(d.getTime() + (1*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = `user${userNo} = ${user}; ${expires}, path=/`;
  document.cookie = `roll${userNo} = ${roll}; ${expires}, path=/`;
  document.cookie = `email${userNo} = ${email}; ${expires}, path=/`;
  document.cookie = `score${userNo} = ${score}; ${expires}, path=/`;
  document.cookie = `videoLink${userNo} = ${source}; ${expires}, path=/`;
}

// Read Cookies
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let h = 0; h < ca.length; h++) {
    let c = ca[h];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Edit Credentials
function editCredentials(){
  document.querySelector("#instruction").style.display = "none";
  document.getElementsByClassName("student-detail")[0].style.display = "flex";
}
