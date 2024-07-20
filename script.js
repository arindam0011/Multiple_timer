
document.addEventListener("DOMContentLoaded", (event) => {

    const setBtn = document.getElementById("setBtn");
    const container = document.getElementById("container");
    const userHours = document.getElementById("Hours");
    const userMinutes = document.getElementById("Minutes");
    const userSeconds = document.getElementById("Seconds");

    userHours.addEventListener("input", () => {
        sessionStorage.setItem("hours", userHours.value);
    });

    userMinutes.addEventListener("input", () => {
        sessionStorage.setItem("minutes", uaserMinutes.value);
    });

    userSeconds.addEventListener("input", () => {
        sessionStorage.setItem("seconds", userSeconds.value);
    });
    setBtn.addEventListener("click", () => {
        setTimer();
    });

    function setTimer() {
        let hours = userHours.value || 0;
        let minutes = userMinutes.value || 0;
        let seconds = userSeconds.value || 0;

        if (parseInt(hours) > 0 || parseInt(minutes) > 0 || parseInt(seconds) > 0) {
            let newTimer = document.createElement("div");
            newTimer.classList.add("timer");

            newTimer.innerHTML = `
        <div id="text">
            <p>Time Left :</p>
        </div>
        <div id="set">
            <input type="text" class="counting" value=${hours}><span>:</span>
            <input type="text" class="counting" value=${minutes}><span>:</span>
            <input type="text" class="counting" value=${seconds}>
        </div>
        <button class="btn stopBtn">Stop</button>`;

            container.appendChild(newTimer);

            let stopBtn = newTimer.querySelector(".stopBtn");
            stopBtn.addEventListener("click", (event) => {
                newTimer.innerHTML = `<p class="timeOutText">Time is Up!</p>
                                  <button class="btn deleteBtn">Delete</button>`;
                newTimer.classList.add("newTimer");

                let deleteBtn = newTimer.querySelector(".deleteBtn");
                deleteBtn.addEventListener("click", (event) => {
                    newTimer.remove();
                })
            })

            hours = parseInt(hours);
            minutes = parseInt(minutes);
            seconds = parseInt(seconds);

            let counter = setInterval(() => {

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    clearInterval(counter);
                    newTimer.innerHTML = `<p class="timeOutText">Time is Up!</p>
                <button class="btn deleteBtn">Delete</button>`;
                    newTimer.classList.add("newTimer");

                    let deleteBtn = newTimer.querySelector(".deleteBtn");
                    deleteBtn.addEventListener("click", (event) => {
                        newTimer.remove();
                    })
                }
                newTimer.querySelectorAll(".counting")[0].value = hours < 10 ? `0${hours}` : hours;
                newTimer.querySelectorAll(".counting")[1].value = minutes < 10 ? `0${minutes}` : minutes;
                newTimer.querySelectorAll(".counting")[2].value = seconds < 10 ? `0${seconds}` : seconds;
            }, 1000)
        }
    }
});