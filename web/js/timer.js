divSec       = document.getElementById('game-time-sec');
divMin       = document.getElementById('game-time-min');
timerGame    = null;

function startTimer () {
    sec++;
    totalTime++;
    tileOpenTime++;
    console.log(totalTime);

    if (parseInt(sec) < 10) { divSec.innerHTML = '0' + sec; }
    else                    { divSec.innerHTML = sec; }

    if (parseInt(sec) === 60) {
        sec = 0;  min++;
        divSec.innerHTML = '00';
        if (min < 10) { divMin.innerHTML = '0' + min; }
        else          { divMin.innerHTML = min; }
    }
    timerGame = setTimeout(startTimer,1000);
}

function stopTimer () {
    clearTimeout(timerGame);
    gameTriggerBtn.removeEventListener('click', pauseTimer, false);
    gameTriggerBtn.addEventListener('click', restartGame, false);
    gameTriggerBtnText.innerHTML        = buttonText['restart'];
    gameTriggerBtn.dataset['status']    = 'stop';
}

function pauseTimer () {
    if (gameTriggerBtn.dataset['pause'] === '') {
        clearTimeout(timerGame);
        gameTriggerBtn.dataset['pause'] = 'paused';
        gameTriggerBtnText.innerHTML    = buttonText['continue'];
        tileEventListener(false);
    } else {
        gameTriggerBtn.dataset['pause'] = '';
        gameTriggerBtnText.innerHTML    = buttonText['pause'];
        tileEventListener(true);
        setTimeout(function () {
            if (gameTriggerBtn.dataset['status'] !== 'stop') {
                startTimer();
            }
        }, 1000);
    }
}

function clearTimer () {
    sec = min = totalTime = 0;
    divSec.innerHTML = '00';
    divMin.innerHTML = '00';
}