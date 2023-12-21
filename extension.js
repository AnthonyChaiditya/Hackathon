// chrome.runtime.onInstalled.addListener(() => {
//   console.log("testing");
//   //   function returnText() {
//   //     let inputLink = document.getElementById("website").value;
//   //     let hoursInput = document.getElementById("time-hour").value;
//   //     let minutesInput = document.getElementById("time-minute").value;
//   //     console.log(`${inputLink}`);
//   //     alert(inputLink, hoursInput, minutes, input);
//   //   }
// });

console.log("testing");
function returnText() {
  let inputLink = document.getElementById("website").value;
  let hoursInput = document.getElementById("time-hour").value;
  let minutesInput = document.getElementById("time-minute").value;
  alert(`Set timer for ${hoursInput} hour(s) ${minutesInput} minute(s)!`);
}

document.getElementById("submit").addEventListener("click", returnText);
