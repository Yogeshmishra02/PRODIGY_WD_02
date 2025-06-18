let timer = null;
let startTime = 0;
let elapsedTime = 0;
let running = false;

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const lapsEl = document.getElementById('laps');

function updateDisplay(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    millisecondsEl.textContent = String(milliseconds).padStart(2, '0');
}

function startTimer() {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 10);
    }
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(timer);
    }
}

function resetTimer() {
    running = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    lapsEl.innerHTML = '';
}

function addLap() {
    if (elapsedTime === 0) return;
    const li = document.createElement('li');
    li.textContent = `${minutesEl.textContent}:${secondsEl.textContent}:${millisecondsEl.textContent}`;
    lapsEl.appendChild(li);
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', addLap);

// Initialize display
updateDisplay(0); 