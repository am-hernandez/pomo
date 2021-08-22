// target elements in the dom and set variable
let time_remaining = document.getElementById("time_remaining");
let sessions_remaining = document.getElementById("sessions_remaining");
let durationInput = document.getElementById("duration");
let sessionsInput = document.getElementById("sessions");
let form_submit = document.getElementById("form_submit");
let duration;

// timer countdown function
function countdown(){
    if (duration === 0) {
        time_remaining.innerText = duration;
        if(sessions_remaining.children.length > 0){
            killChild(sessions_remaining, 0);
            if(sessions_remaining.children.length > 0){
                duration = durationInput.value;
            } else {
                form_submit.disabled = false;
            }
        }
    } else if(duration >= 1){
        time_remaining.innerText = duration;
        duration--;
    }
}

// create h3 for ul
function createH3(reference){
    let h3 = document.createElement("h3");
    sessions_remaining.parentNode.appendChild(h3);
    sessions_remaining.parentNode.insertBefore(h3, referenceNode);
    h3.innerHTML = "Sessions remaining:";
}

// remove session <li> function
function killChild(parent, childIdx){
    parent.children[childIdx].remove();
}

// listen for click on form submit button
form_submit.addEventListener("click", function() {
    form_submit.disabled = true;
    duration = durationInput.value;
    // time_remaining.innerHTML = duration;
    let sessions = sessionsInput.value;
    for(let i=1; i<=sessions; i++){
        let li = document.createElement("li");
        sessions_remaining.appendChild(li).innerHTML = `Session ${i}`;
    }
    // createH3(sessions_remaining);
    setInterval(countdown, 1000);
});
