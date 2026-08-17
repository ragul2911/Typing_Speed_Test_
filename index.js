let mode = "timed";      // Default mode
let timer;
let timeLeft = 60;
let startTime;
let passageTimer;
let isTyping = false;
let correctCharacters = 0;
let wpm = 0;
let accuracy = 100;
let highWPM = 5;
let highAcc = 5;
let highScore = localStorage.getItem("highScore");
// width************************************************************
// if (window.innerWidth <= 375) {
//     window.location.href = "../mobile/index.html";
// }
//  else {
//     window.location.href = "index.html";
// }
function checkScreenWidth() {
    if (window.innerWidth <= 420) {
        if (!window.location.pathname.endsWith("mobile/index.html")) {
            window.location.href = "mobile/index.html";
        }
    } else {
        if (!window.location.pathname.endsWith("index.html")) {
            window.location.href = "index.html";
        }
    }
}

checkScreenWidth();

window.addEventListener("resize", checkScreenWidth);
//TIMER**************************
document.getElementById("timed-btn").addEventListener("click", () => {
    mode = "timed";
});
document.getElementById("passage-btn").addEventListener("click", () => {
    mode = "passage";
});
//********************************************************


//BLURRINESS**********************************************
const overlay = document.getElementById("overlay");
const button2 = document.getElementById("btn1");
// ******************************
button2.addEventListener("click",()=>{
    overlay.classList.add("hide");
    overlay.remove();
});
//to make blur behind the button and disappear the button and blurriness when the button is clicked
//*********************************************************


//JSON TO JS***********************************************
let passage ={};
// ******************************
fetch("paragraphs.json")
    .then(response => response.json())
    .then(data =>{
        passage = data
    });
    //to convert the json file into js readable and fetch into js 
//*********************************************************


//RANDOM PARA SELECTION************************************
function showRandomParagraph(level) {

    const selectedArray = passage[level];
    const randomIndex = Math.floor(Math.random() * selectedArray.length);
    const randomParagraph = selectedArray[randomIndex];
    const paragraph = document.getElementById("paragraph");

    paragraph.innerHTML = "";

    randomParagraph.text.split("").forEach(letter => {

        const span = document.createElement("span");

        span.innerText = letter;

        paragraph.appendChild(span);
        

    });
    input.focus();

}
// make select random paragraph of each category like easy medium hard
//*********************************************************


//BUTTON DIFFICULTIES*************
document.getElementById("easy-btn").addEventListener("click" , () =>{
    showRandomParagraph("easy");
});
document.getElementById("medium-btn").addEventListener("click",() =>{
    showRandomParagraph("medium");
});
document.getElementById("hard-btn").addEventListener("click",() =>{
    showRandomParagraph("hard");
});
//gives random paragraph from each category when button is clicked
//*********************************************************


//DIFFICULTIES ACTIVE**************************************
const level = document.querySelectorAll(".level");
// ******************************
level.forEach(button =>{
    button.addEventListener("click",function(){
        level.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
    });
});
//make any one button 
// to stay active and another inactice while it is active
//*********************************************************


//MODE ACTIVE**********************************************
const mode1 = document.querySelectorAll(".mode1");
// ******************************
mode1.forEach(button =>{
    button.addEventListener("click",function(){
        mode1.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
    });
    
});
//*********************************************************


//MODE SELECTION//*****************************************
const input = document.getElementById("typing-input");
// ******************************
input.addEventListener("input" ,() =>{

    const typed = input.value;
    let typedChar = typed.length;
    const letters = document.querySelectorAll("#paragraph span");
    correctCharacters = 0;
    if(!isTyping){

        isTyping = true;
        if(mode === "timed"){
            startCountdown();
        }
        else{
            startPassageTimer();
        }     
    }
    //CORRECT,WRONG TEXT//***************      
    letters.forEach((span,index) =>{
        const typedLetter = typed[index];
       
        
        if(typedLetter == null){
            span.classList.remove("correct");
            span.classList.remove("wrong");
        }
        else if(typedLetter == span.innerText){
            span.classList.add("correct");
            span.classList.remove("wrong");
            correctCharacters++;
        }
        else{
            span.classList.remove("correct");
            span.classList.add("wrong");
        }
        // console.log(correctCharacters);
    });
// ****************************************
    if(typed.length === letters.length){

    finishTest();
    }
//****************************************
    if(typedChar > 0){
       accuracy = Math.round( (correctCharacters/typedChar) * 100 );
    }
    document.getElementById("accuracy").innerText = accuracy + "%";
    
    let elapsedMinutes;

    if(mode === "timed"){
        elapsedMinutes = (60 - timeLeft) / 60;
    }
    else{
        elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
    }
    if(elapsedMinutes > 0){
    wpm = Math.round((correctCharacters / 5) / elapsedMinutes);
    }
    else{
        wpm = 0;
    }

    document.getElementById("wpm2").innerText = wpm;
    document.getElementById("wpm3").innerText = wpm;
    document.getElementById("char").innerText = correctCharacters;
   
   
}); 
// /************************************************************* */
let refresh = document.getElementById("refresh");
refresh.addEventListener("click",() =>{
    localStorage.clear();
    window.location.href = "index.html";
})

//*********************************************************
  
//LIMITED TIME//*******************************************

function startCountdown(){

    timeLeft = 60;

    timer = setInterval(() => {

        timeLeft--;

        document.getElementById("time").innerText = timeLeft;

        if(timeLeft <= 0){

            clearInterval(timer);

            input.disabled = true;

            finishTest();

        }

    },1000);
 
}
//*********************************************************


//UNLIMITED TIME//*****************************************
function startPassageTimer(){

   startTime = Date.now();

    passageTimer = setInterval(() => {

        const seconds = Math.floor((Date.now() - startTime) / 1000);

        document.getElementById("time").innerText = seconds + " sec";

    }, 1000);
   
}
//*********************************************************


function finishTest(){

    let currentScore = wpm;
    
    if(mode === "timed"){

        clearInterval(timer);

        alert("Timed test completed!");

    }
    else{

        elapsedSeconds = Math.floor((Date.now() - startTime)/1000);
        clearInterval(passageTimer);
        alert("You completed the passage in " + elapsedSeconds + " seconds.");

    }
    input.disabled = true;
    localStorage.setItem("wpm",wpm);
    localStorage.setItem("accuracy",accuracy);
    localStorage.setItem("Characters",correctCharacters);
    console.log("current score:", currentScore);
    console.log("high score:", highScore);

    if (highScore === null) {
        localStorage.setItem("highScore",currentScore);
        window.location.href = "Baseline.html";
        console.log("Saved:", localStorage.getItem("highScore"));
        
    }
    else{
        highScore = Number(highScore);
        if(currentScore > highScore){
            localStorage.setItem("highScore",currentScore);
            window.location.href = "highScore.html";
            console.log("Saved:", localStorage.getItem("highScore"));
        
        }
        else{
            window.location.href = "testComplete.html";
        }
    }

}
    