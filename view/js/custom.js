(function () {
	var iter = 0;
	var timer = setTimeout(function () {
		if(document.getElementById('start-text').length != 0) {
			window.start_block = document.getElementById('start-block');
			window.start_text = document.getElementById('start-text');
			console.log(++iter);
			clearTimeout(timer);
		}
		else {
			console.log(++iter);
			timer;
		}
	}, 200);
})();