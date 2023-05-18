let pomodoro = document.querySelector(".pomodoro");
let shortbreak = document.querySelector(".shortbreak");
let longbreak = document.querySelector(".longbreak");
let favicon = document.querySelector("#favicon");
let title = document.querySelector("title");
let message = document.querySelector("#message");
let cycles = document.querySelector("#one");
let dunno = document.querySelector("#dunno");

let zeroTune = new Audio("./Images/tunak_tunak.mp3");
var nexxt = 0;
var looong = 0;
let count;

cycles.addEventListener("click", function () {
  if (confirm("Do you want to refresh the pomodoro count?")) {
    cycles.innerHTML = "1";
    count = 1;
    localStorage.setItem("count", count);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  pomodoro.setAttribute("id", "black");
  startMin = 25;
  time = startMin * 60;
  nexxt = 1;
  title.innerHTML = "25:00 - Time to focus!";
  count = localStorage.getItem("count");
  if (count) {
    count = parseInt(count);
  } else {
    count = 1;
  }
  cycles.innerHTML = count;
});

pomodoro.addEventListener("click", pd);
function pd() {
  clearInterval(intervalID);
  intervalID = -1;
  pomodoro.setAttribute("id", "black");
  document.body.style.backgroundColor = "rgb(84, 87, 100)";
  shortbreak.removeAttribute("id", "green");
  longbreak.removeAttribute("id", "blue");
  favicon.setAttribute("href", "./Images/favicon-black.ico");
  timer.innerHTML = "25:00";
  startMin = 25;
  time = startMin * 60;
  start.innerHTML = "START";
  nexxt = 1;
  title.innerHTML = "25:00 - Time to focus!";
}

shortbreak.addEventListener("click", sb);
function sb() {
  clearInterval(intervalID);
  intervalID = -1;
  shortbreak.setAttribute("id", "green");
  document.body.style.backgroundColor = "rgb(56, 133, 138)";
  pomodoro.removeAttribute("id", "black");
  longbreak.removeAttribute("id", "blue");
  favicon.setAttribute("href", "./Images/favicon-green.ico");
  timer.innerHTML = "05:00";
  startMin = 5;
  time = startMin * 60;
  start.innerHTML = "START";
  nexxt = 2;
  title.innerHTML = "05:00 - Time for a break!";
  message.innerHTML = "Time for a break!";
}

longbreak.addEventListener("click", lb);
function lb() {
  clearInterval(intervalID);
  intervalID = -1;
  longbreak.setAttribute("id", "blue");
  document.body.style.backgroundColor = "rgb(57, 112, 151)";
  pomodoro.removeAttribute("id", "black");
  shortbreak.removeAttribute("id", "green");
  favicon.setAttribute("href", "./Images/logo.png");
  timer.innerHTML = "30:00";
  startMin = 30;
  time = startMin * 60;
  start.innerHTML = "START";
  title.innerHTML = "30:00 - Time for a break!";
  message.innerHTML = "Time for a break!";
  nexxt = 0;
}

//clock
let startMin = 0;
let time = 0;
let timer = document.querySelector("#timer");
let start = document.querySelector("#start");

function updateTimer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  timer.innerHTML = `${minutes}:${seconds}`;
  if (nexxt == 1) {
    title.innerHTML = `${minutes}:${seconds} - Time to focus!`;
  } else {
    title.innerHTML = `${minutes}:${seconds} - Time for a break!`;
  }
  time--;
}

let intervalID = -1;
start.addEventListener("click", startInt);

function startInt() {
  if (intervalID == -1) {
    start.innerHTML = "PAUSE";
    document.getElementById("black")
      ? favicon.setAttribute("href", "./Images/favicon-black.ico")
      : document.getElementById("green")
      ? favicon.setAttribute("href", "./Images/favicon-green.ico")
      : favicon.setAttribute("href", "./Images/favicon-blue.ico");

    intervalID = setInterval(function () {
      if (timer.innerHTML !== "00:00") {
        updateTimer();
      } else {
        if (timer.innerHTML === "00:00" && document.getElementById("blue")) {
          zeroTune.play();
          count++;
          localStorage.setItem("count", count);
          document.getElementById("one").innerHTML = count;
          pd();
        } else {
          if (timer.innerHTML === "00:00") {
            zeroTune.play();
            if (looong === 9) {
              lb();
              looong = 0;
            } else {
              if (nexxt === 1) {
                sb();
              } else {
                if (nexxt === 2) {
                  pd();
                }
              }
              looong += nexxt;
            }
          }
        }
      }
    }, 1000);
  } else {
    start.innerHTML = "START";
    favicon.setAttribute("href", "./Images/favicon-pause.png");
    clearInterval(intervalID);
    intervalID = -1;
  }
}

let donny = 1;
dunno.addEventListener("click", function () {
  if (nexxt === 1) {
    sb();
  } else {
    if (nexxt === 2) {
      pd();
    }
  }
  donny++;
  if (donny === 8) {
    lb();
    donny = 0;
  }
});
