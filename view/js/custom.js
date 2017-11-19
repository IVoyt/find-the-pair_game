(function () {

	var timerStartpage = setTimeout(function () {
		if(document.getElementById('start-text') != null) {
			window.start_block = document.getElementById('start-block');
			window.start_text = document.getElementById('start-text');
			clearTimeout(timerStartpage);
		}
		else {
      timerStartpage;
		}
	}, 200);

	var timerGameField;
	function checkFieldLoaded () {
		if(document.getElementById('field') != null) {
			clearTimeout(timerGameField);
			startTimer();
		}
		else {
      timerGameField = setTimeout(checkFieldLoaded, 500);
		}
	}
	checkFieldLoaded();

})();