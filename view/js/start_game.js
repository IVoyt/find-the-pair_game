function startGame () {
	var playername = document.getElementById('enter-player-name').value;

	if (playername.length == 0) {
		alert('You should enter your name');
	}
	else if (document.getElementsByClassName('select-field-size-selected').length == 0) {
		alert('You should select field size');
	}
	else {
		var fieldsize = document.querySelector('.select-field-size-selected'), data = fieldsize.dataset;
		var body = 'player_name=' + playername + '&field_size=' + fieldsize.dataset.fieldsize;
		var ajaxStartGame = new XMLHttpRequest();

		ajaxStartGame.open('POST', '/startgame', false);
		ajaxStartGame.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		ajaxStartGame.send(body);

		if ( ajaxStartGame.status != 200 ) {
			alert(ajaxStartGame.status + ': ' + ajaxStartGame.statusText);
		}
		else {
			start_block.style.opacity = 0;
			document.body.style.height = '100vh';
			var content = document.getElementById('content');

			setTimeout(function() {
				start_block.remove();
				content.innerHTML = ajaxStartGame.responseText;
				setTimeout(function ()  {
					var field = document.getElementById('field');
					field.style.opacity = 1;
					calculateFieldSize();
				}, 100);
			}, 700);

		}
	}
}