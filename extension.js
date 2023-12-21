class Timer {
  constructor() {
    this.stop = false;
    this.countdown = null;
  }

  startTimer(duration, display) {
    let timer = duration,
      hours,
      minutes,
      seconds;
    console.log(`Start timer, current time: ${timer}`);
    this.countdown = setInterval(function () {
      hours = parseInt(timer / 3600, 10);
      minutes = parseInt((timer % 3600) / 60, 10);
      seconds = parseInt(timer % 60, 10);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = hours + ":" + minutes + ":" + seconds;

      if (--timer < 0) {
        alert(`Time's Up Loser!`);
        clearInterval(this.countdown);
      }

      console.log(typeof this.stop);
      if (this.stop === true) {
        console.log(`Here: should stop ${this.stop}, timer ${timer}`);
        clearInterval(countdown);
        return timer;
      }
    }, 1000);
  }
}

function returnText() {
  let inputLink = document.getElementById("website").value;
  let inputLinkURL = new URL(inputLink);
  let inputLinkHost = inputLinkURL.hostname;

  let hoursInput = Number(document.getElementById("time-hour").value);
  let minutesInput = Number(document.getElementById("time-minute").value);
  alert(`Set timer for ${hoursInput} hour(s) ${minutesInput} minute(s)!`);

  let form = document.getElementById("input-form");
  form.remove();

  const countdownDiv = document.createElement("div");
  countdownDiv.setAttribute("id", "countdown-div");
  document.body.appendChild(countdownDiv);

  let totalTime = (60 * hoursInput + minutesInput) * 60;
  let timerObject = new Timer();

  let timerRunning = false;

  const checkIfUsing = setInterval(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let currentTab = tabs[0];
      let currentTabUrl = new URL(currentTab.url);
      let currentTabHostname = currentTabUrl.hostname;

      console.log(
        `currentTabHostname: ${currentTabHostname}, inputLinkHost: ${inputLinkHost}`
      );

      if (inputLinkHost === currentTabHostname && !timerRunning) {
        console.log("You are watching on the specified website!");
        timerObject.stop = false;
        timerRunning = true;
        timerObject.startTimer(totalTime, countdownDiv);
      } else if (inputLinkHost !== currentTabHostname && timerRunning) {
        // stop timer
        // record the remaining time
        // Use the remaining time to trigger the timer once go to the website again
        // invoke check if using
        clearInterval(timerObject.countdown);
        timerObject.stop = true;
        timerRunning = false;
        // remainingTime = startTimer(remainingTime, countdownDiv, true);
      }
    });
  }, 2000);
}

document.getElementById("submit").addEventListener("click", returnText);

// *****************************************************************************************

// function startTimer(duration, display) {
//   let timer = duration,
//     hours,
//     minutes,
//     seconds;

//   let countdown = setInterval(function () {
//     hours = parseInt(timer / 3600, 10);
//     minutes = parseInt((timer % 3600) / 60, 10);
//     seconds = parseInt(timer % 60, 10);

//     hours = hours < 10 ? "0" + hours : hours;
//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;

//     display.textContent = hours + ":" + minutes + ":" + seconds;

//     if (--timer < 0) {
//       alert(`Time's Up Loser!`);
//       clearInterval(countdown);
//     }
//   }, 1000);

//   return countdown;
// }

// function returnText() {
//   let inputLink = document.getElementById("website").value;
//   let inputLinkURL = new URL(inputLink);
//   let inputLinkHost = inputLinkURL.hostname;

//   let hoursInput = Number(document.getElementById("time-hour").value);
//   let minutesInput = Number(document.getElementById("time-minute").value);
//   alert(`Set timer for ${hoursInput} hour(s) ${minutesInput} minute(s)!`);

//   let form = document.getElementById("input-form");
//   form.remove();

//   const countdownDiv = document.createElement("div");
//   countdownDiv.setAttribute("id", "countdown-div");
//   document.body.appendChild(countdownDiv);

//   let totalTime = (60 * hoursInput + minutesInput) * 60;

//   let countdown = startTimer(totalTime, countdownDiv);

//   chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     if (changeInfo.url) {
//       let currentTabUrl = new URL(changeInfo.url);
//       let currentTabHostname = currentTabUrl.hostname;

//       if (inputLinkHost === currentTabHostname) {
//         if (!countdown) {
//           countdown = startTimer(totalTime, countdownDiv);
//         }
//       } else {
//         if (countdown) {
//           alert("Left the specified website. Timer stopped!");
//           clearInterval(countdown);
//           countdown = null;
//         }
//       }
//     }
//   });

//   chrome.tabs.onActivated.addListener(function (activeInfo) {
//     chrome.tabs.get(activeInfo.tabId, function (tab) {
//       let currentTabUrl = new URL(tab.url);
//       let currentTabHostname = currentTabUrl.hostname;

//       if (inputLinkHost === currentTabHostname) {
//         if (!countdown) {
//           countdown = startTimer(totalTime, countdownDiv);
//         }
//       } else {
//         if (countdown) {
//           alert("Left the specified website. Timer stopped!");
//           clearInterval(countdown);
//           countdown = null;
//         }
//       }
//     });
//   });
// }

// document.getElementById("submit").addEventListener("click", returnText);
