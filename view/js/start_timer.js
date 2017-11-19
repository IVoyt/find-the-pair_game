var sec = 0;
var min = 0;

function startTimer () {

	var divSec = document.getElementById('game-time-sec');
	var divMin = document.getElementById('game-time-min');
	sec++;

	if (sec < 10) { divSec.innerHTML = '0' + sec; }
	else          { divSec.innerHTML = sec; }

	if (sec == 60) {
		sec = 0;
		min++;
		divSec.innerHTML = '00';
		if (min < 10) { divMin.innerHTML = '0' + min; }
		else          { divMin.innerHTML = min; }
	}
	setTimeout(startTimer,1000);

}
