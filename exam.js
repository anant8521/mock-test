/* ===================================
YOUTH PUBLICATION CBT ENGINE
=================================== */

let currentQuestion = 0;
let userAnswers = {};
let timerInterval;
let timeLeft = 0;
let examStarted = false;
let tabSwitchCount = 0;

/* ===================================
START TEST
=================================== */

function startTest(){

let hours =
parseInt(
document.getElementById(
"hourInput"
).value
) || 0;

let minutes =
parseInt(
document.getElementById(
"minuteInput"
).value
) || 0;

timeLeft =
(hours * 3600) +
(minutes * 60);

if(timeLeft <= 0){

alert(
"Please Select Valid Duration"
);

return;

}

document.getElementById(
"startScreen"
).style.display = "none";

examStarted = true;

if(
document.documentElement
.requestFullscreen
){
document.documentElement
.requestFullscreen();
}

startTimer();

renderPalette();

renderQuestion();

}

/* ===================================
TIMER
=================================== */

function startTimer(){

updateTimer();

timerInterval =
setInterval(()=>{

timeLeft--;

updateTimer();

if(timeLeft === 600){
alert("10 Minutes Remaining");
}

if(timeLeft === 300){
alert("5 Minutes Remaining");
}

if(timeLeft === 60){
alert("1 Minute Remaining");
}

if(timeLeft <= 0){

clearInterval(
timerInterval
);

alert(
"Time Over"
);

submitTest();

}

},1000);

}

function updateTimer(){

let h =
Math.floor(
timeLeft / 3600
);

let m =
Math.floor(
(timeLeft % 3600)/60
);

let s =
timeLeft % 60;

document.getElementById(
"timer"
).innerHTML =

String(h).padStart(2,"0")

* ":" +

String(m).padStart(2,"0")

* ":" +

String(s).padStart(2,"0");

}

/* ===================================
QUESTION RENDER
=================================== */

function renderQuestion(){

const q =
questions[currentQuestion];

let html =

`

<div class="question-text">
${q.question}
</div>
`;

for(let key in q.options){

html +=

`

<div
class="option"

onclick="selectAnswer('${key}')">

<input
type="radio"

${userAnswers[currentQuestion]
=== key

? "checked"
: ""}

>

<b>${key}.</b>

${q.options[key]}

</div>
`;

}

document.getElementById(
"questionBox"
).innerHTML = html;

updatePalette();

updateStats();

}

/* ===================================
ANSWER SELECT
=================================== */

function selectAnswer(option){

userAnswers[
currentQuestion
] = option;

saveProgress();

renderQuestion();

}

/* ===================================
SAVE
=================================== */

function saveProgress(){

localStorage.setItem(
location.pathname,
JSON.stringify(
userAnswers
)
);

}

function loadProgress(){

const saved =
localStorage.getItem(
location.pathname
);

if(saved){

userAnswers =
JSON.parse(saved);

}

}

/* ===================================
NAVIGATION
=================================== */

function nextQ(){

if(
currentQuestion <
questions.length-1
){

currentQuestion++;

renderQuestion();

}

}

function prevQ(){

if(
currentQuestion > 0
){

currentQuestion--;

renderQuestion();

}

}

function gotoQuestion(index){

currentQuestion = index;

renderQuestion();

}

/* ===================================
CLEAR
=================================== */

function clearAns(){

delete userAnswers[
currentQuestion
];

saveProgress();

renderQuestion();

}

function clearAllAnswers(){

if(
confirm(
"Clear All Answers?"
)
){

userAnswers = {};

localStorage.removeItem(
location.pathname
);

renderQuestion();

}

}

/* ===================================
PALETTE
=================================== */

function renderPalette(){

let html="";

questions.forEach(
(q,index)=>{

html +=

`
<button

id="p${index}"

onclick=
"gotoQuestion(${index})">

${index+1}

</button>
`;

});

document.getElementById(
"palette"
).innerHTML = html;

updatePalette();

}

function updatePalette(){

questions.forEach(
(q,index)=>{

const btn =
document.getElementById(
"p"+index
);

if(!btn) return;

btn.className = "";

if(
userAnswers[index]
){

btn.classList.add(
"attempted"
);

}

if(
index ===
currentQuestion
){

btn.classList.add(
"current"
);

}

});

}

/* ===================================
STATS
=================================== */

function updateStats(){

let attempted =

Object.keys(
userAnswers
).length;

document.getElementById(
"attempted"
).innerHTML =
attempted;

document.getElementById(
"totalQuestions"
).innerHTML =
questions.length;

}

/* ===================================
SUBMIT
=================================== */

function confirmSubmit(){

if(
confirm(
"Submit Test?"
)
){

submitTest();

}

}

function submitTest(){

clearInterval(
timerInterval
);

let score = 0;

let attempted = 0;

questions.forEach(
(q,index)=>{

if(
userAnswers[index]
){

attempted++;

}

if(
userAnswers[index]
=== q.answer
){

score++;

}

});

let percent =

(
score /
questions.length
*100
).toFixed(2);

document.getElementById(
"result"
).innerHTML =

`

<div
class="result-card">

<h2>
🎯 Final Result
</h2>

<p>
Score :
${score}
/
${questions.length}
</p>

<p>
Percentage :
${percent}%
</p>

<p>
Attempted :
${attempted}
</p>

<p>
Skipped :
${questions.length
-attempted}
</p>

</div>
`;

localStorage.removeItem(
location.pathname
);

window.scrollTo(
0,
document.body.scrollHeight
);

}

/* ===================================
SECURITY
=================================== */

document.addEventListener(
"visibilitychange",
()=>{

if(
examStarted &&
document.hidden
){

tabSwitchCount++;

if(
tabSwitchCount >= 3
){

alert(
"Multiple Tab Switches Detected"
);

submitTest();

}

}

});

document.addEventListener(
"contextmenu",
e=>e.preventDefault()
);

document.addEventListener(
"copy",
e=>e.preventDefault()
);

history.pushState(
null,
null,
location.href
);

window.onpopstate =
()=>history.go(1);

/* ===================================
INIT
=================================== */

loadProgress();


