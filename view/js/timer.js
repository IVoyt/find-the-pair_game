var sec = 0, min = 0, totalTime = 0, tileOpenTime = 0;
var divSec = document.getElementById('game-time-sec');
var divMin = document.getElementById('game-time-min');
var timerGame;

function startTimer () {
	sec++;
  totalTime++;
  tileOpenTime++;

	if (sec < 10) { divSec.innerHTML = '0' + sec; }
	else          { divSec.innerHTML = sec; }

	if (sec == 60) {
		sec = 0;  min++;
		divSec.innerHTML = '00';
		if (min < 10) { divMin.innerHTML = '0' + min; }
		else          { divMin.innerHTML = min; }
	}
  timerGame = setTimeout(startTimer,1000);
}

function stopTimer () {
  clearTimeout(timerGame);
  triggerBtn.removeEventListener('click', pauseTimer, false);
  triggerBtn.addEventListener('click', restartGame, false);
  triggerBtnText.innerHTML = buttonText['restart'];
  triggerBtn.dataset['status'] = 'stop';
}

function pauseTimer () {
  if (triggerBtn.dataset['pause'] == '') {
    clearTimeout(timerGame);
    triggerBtn.dataset['pause'] = 'paused';
    triggerBtnText.innerHTML = buttonText['continue'];
    tileEventListener('remove');
  }
  else {
    triggerBtn.dataset['pause'] = '';
    triggerBtnText.innerHTML = buttonText['pause'];
    tileEventListener('add');
    setTimeout(function () {
      if (triggerBtn.dataset['status'] != 'stop') {
        startTimer();
      }
    },1000);
  }
}

function clearTimer () {
  sec = 0;  min = 0;
  divSec.innerHTML = '00';
  divMin.innerHTML = '00';
  totalTime = 0;
}