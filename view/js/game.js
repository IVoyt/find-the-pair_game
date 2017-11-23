function startGame () {
	var sendPlayerName = document.getElementById('enter-player-name').value;
	var errorMsg = JSON.parse(document.getElementById('start-msg').dataset['msg']);

	if (sendPlayerName.length == 0) {
		alert(errorMsg['enter_player_name']);
	}
	else if (document.getElementsByClassName('select-field-size-selected').length == 0) {
		alert(errorMsg['choose_field_size']);
	}
	else {
		var fieldSize = document.querySelector('.select-field-size-selected');
		var postBody = 'player_name=' + sendPlayerName + '&field_size=' + fieldSize.dataset.fieldsize;
		var ajaxStartGame = new XMLHttpRequest();

		ajaxStartGame.open('POST', '/startgame', false);
		ajaxStartGame.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		ajaxStartGame.send(postBody);

		if ( ajaxStartGame.status != 200 ) {
			alert(ajaxStartGame.status + ': ' + ajaxStartGame.statusText);
		}
		else {
			console.log(ajaxStartGame.response);
			start_block.style.opacity = 0;
			document.body.style.height = '100vh';
			var content = document.getElementById('content');
			var playerName = document.getElementById('player-name');

			setTimeout(function() {
				start_block.remove();
				content.innerHTML = ajaxStartGame.responseText;
				setTimeout(function ()  {
					var field = document.getElementById('field');
					field.style.opacity = 1;
          triggerBtnText.innerHTML = buttonText['pause'];
          triggerBtn.style.opacity = 1;
					calculateFieldSize();
          playerName.innerHTML = sendPlayerName;
				}, 100);
			}, 700);
		}
	}
}

function restartGame() {
  var ajaxReStartGame = new XMLHttpRequest();
  var postBody = 'restart=1';

  ajaxReStartGame.open('POST', '/', false);
  ajaxReStartGame.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  ajaxReStartGame.send(postBody);

  if ( ajaxReStartGame.status != 200 ) {
    alert(ajaxReStartGame.status + ': ' + ajaxReStartGame.statusText);
  }
  else {
    var content = document.getElementById('content');
    content.style.opacity = 0;
    setTimeout(function() {
      content.innerHTML = ajaxReStartGame.responseText;
      setTimeout(function ()  {
        var field = document.getElementById('field');
        content.style.opacity = 1;
      }, 100);
    }, 700);

    triggerBtn.removeEventListener('click', restartGame, false);
    triggerBtn.style.opacity = 0;

    gameInfoInit();
    //checkFieldLoaded();
    clearTimer();
  }
}