let wpm = localStorage.getItem("wpm");
let accuracy = localStorage.getItem("accuracy");
let char = localStorage.getItem("Characters");
const retype = document.getElementById("restrt");
document.getElementById("wpm4").innerText = wpm;
document.getElementById("wpm5").innerText = wpm;
document.getElementById("output").innerText = accuracy + "%";
document.getElementById("output1").innerText = char;

retype.addEventListener("click",()=>{
    window.location.href = "index.html";
})