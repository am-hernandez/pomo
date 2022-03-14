// target elements in the dom and set variable
let timer_display = document.getElementById("timer_display");
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let time_remaining = document.getElementById("time_remaining");
let sessions_remaining = document.getElementById("sessions_remaining");
let durationInput = document.getElementById("duration");
let sessionsInput = document.getElementById("sessions");
let form_submit = document.getElementById("form_submit");
let duration;

// timer countdown function
function countdown() {
  if (duration === 0) {
    secondsLabel.innerHTML = pad(duration % 60);
    minutesLabel.innerHTML = pad(parseInt(duration / 60));
    if (sessions_remaining.children.length > 0) {
      killChild(sessions_remaining, 0);
      if (sessions_remaining.children.length > 0) {
        if (sessions_remaining.children[0].innerText === "small break!") {
          timer_display.style.backgroundColor = "#ede8b1";
          duration = 5 * 60;
          secondsLabel.innerHTML = pad(duration % 60);
          minutesLabel.innerHTML = pad(parseInt(duration / 60));
        } else if (sessions_remaining.children[0].innerText === "long break!") {
          timer_display.style.backgroundColor = "#ede8b1";
          duration = 30 * 60;
          secondsLabel.innerHTML = pad(duration % 60);
          minutesLabel.innerHTML = pad(parseInt(duration / 60));
        } else {
          timer_display.style.backgroundColor = "#b6edb1";
          duration = durationInput.value * 60;
        }
      } else {
        form_submit.disabled = false;
        timer_display.style.backgroundColor = "#edb1b6";
        time_remaining.innerText = "done!";
      }
    }
  } else if (duration > 0) {
    secondsLabel.innerHTML = pad(duration % 60);
    minutesLabel.innerHTML = pad(parseInt(duration / 60));
    duration--;
  }
}

// pad time with 0s
function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// remove session <li> function
function killChild(parent, childIdx) {
  parent.children[childIdx].remove();
}

// listen for click on form submit button
form_submit.addEventListener("click", function () {
  form_submit.disabled = true;

  // create sessions list
  let sessions = parseInt(sessionsInput.value);
  for (let i = 1; i <= sessions; i++) {
    let li = document.createElement("li");
    sessions_remaining.appendChild(li).innerHTML = `Session: ${i}`;
    if (i !== sessions && i % 3 === 0) {
      let longBreakLi = document.createElement("li");
      sessions_remaining.appendChild(longBreakLi).innerHTML = `long break!`;
    } else if (i === sessions) {
      continue;
    } else {
      let smallBreakLi = document.createElement("li");
      sessions_remaining.appendChild(smallBreakLi).innerHTML = `small break!`;
    }
  }

  // get session length in seconds, start interval
  duration = durationInput.value * 60;
  timer_display.style.backgroundColor = "#b6edb1";
  setInterval(countdown, 1000);
});
