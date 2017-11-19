function selectGame () {

	start_text.style.opacity = 0;

	var ajaxSelectGame = new XMLHttpRequest();
	ajaxSelectGame.open('POST', '/selectgame', false);
	ajaxSelectGame.send();

	if (ajaxSelectGame.status != 200) {
		alert( ajaxSelectGame.status + ': ' + ajaxSelectGame.statusText );
	}
	else {
		setTimeout(function () {
			start_block.style.height = '300px';
			//start_block.style.margin = '30vh 0 0 12.5%';
			start_block.style.top = '25vh';
			start_text.remove();
			start_block.innerHTML = ajaxSelectGame.responseText;
		}, 300);

		setTimeout(function() {
			var playername = document.getElementById('select-game');
			playername.style.opacity = 1;
		}, 700);
	}

}