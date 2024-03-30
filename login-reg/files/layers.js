const body = document.body;
const layer1 = document.getElementsByClassName("loadpage")[0];
const layer2 = document.getElementsByClassName("student-detail")[0];
const layer3 = document.getElementById("instruction");
const layer4 = document.getElementById("main");

let header = `
        <div class="titbarsd center row">
			<div class="sdlogo center"><img src="files/files/poornima_logo.png" alt="Logo"></div>
			<div class="sdtit center column">
				<div class="instname comfont">POORNIMA COLLEGE OF ENGINEERING, JAIPUR</div>
				<div class="exname comfont">OPEN BOOK TEST - III</div>
			</div>
		</div>
`

let accessDenied = () => {
    layer1.remove();
    layer2.remove();
    layer3.remove();
    layer4.remove();
    const newMain = document.createElement("main");
    newMain.setAttribute("id", "noAccessDiv");
    newMain.classList.add("center");
    newMain.innerHTML = header + `
    <div class="noAccess center">
    <div class="warnBox center column">
    <div class="warntxt">You have lost access to the test paper. It generally happens when you press back button or close the window without completing the test. If you think it is a mistake you can send email to your tutor. You can also send a message to your tutor.</div>
    <a href="mailto: vermaneerajgreatpower@gmail.com" target="_blank"><div class="warnbtn" style="background-color: #ed2939;">Send Email</div></a>
    <a href="https://wa.me/919352298110" target="_blank"><div class="warnbtn">Send Message</div></a>
    </div>
    </div>
    `;
    body.appendChild(newMain);
}

let alreadySubmitted = () => {
    layer1.remove();
    layer2.remove();
    layer3.remove();
    layer4.remove();
    const newMain = document.createElement("main");
    newMain.setAttribute("id", "alreadySubmitted");
    newMain.classList.add("center");
    newMain.innerHTML = header + `
    <div class="noAccess center">
    <div class="warnBox center column">
    <div class="warntxt">Dear candidate, you have already submitted the test. You can not attempt the test again. If you think it is a mistake you can send email to your tutor. You can also send a message to your tutor.</div>
    <a href="mailto: vermaneerajgreatpower@gmail.com" target="_blank"><div class="warnbtn" style="background-color: #ed2939;">Send Email</div></a>
    <a href="https://wa.me/919352298110" target="_blank"><div class="warnbtn">Send Message</div></a>
    </div>
    </div>
    `;
    body.appendChild(newMain);
}

let onSubmission = () => {
    layer1.remove();
    layer2.remove();
    layer3.remove();
    layer4.remove();
    const newMain = document.createElement("main");
    newMain.setAttribute("id", "onSubmission");
    newMain.classList.add("center");
    newMain.innerHTML = header + `
        <div class="dia-box center column">
            <div class="dia-header center">Test Submitted</div>
            <div class="dia-opt center">
                <div class="test-rating center column">
                    <div class="rate-tit">Rate your experience(Out of 5):</div>
                    <div class="rate-opt">
                        <button class="rate-rank">1</button>
                        <button class="rate-rank">2</button>
                        <button class="rate-rank">3</button>
                        <button class="rate-rank">4</button>
                        <button class="rate-rank">5</button>                        
                    </div>
                </div>
            </div>
            <div class="dia-footer center">
                <a href="logout.php"<div class="dia-btn center">Skip</div></a>
            </div>
        </div>
    `;
    body.appendChild(newMain);
    rateClick();
}