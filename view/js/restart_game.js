function restartGame() {

	var ajaxRestartGame = new XMLHttpRequest('POST', '/startpage', false);
	ajaxRestartGame.open();
	ajaxRestartGame.send();
	if (ajaxRestartGame.status != 200) {
		alert('error restart');
		console.log('error restart');
	}
	else {
		var content = document.getElementById('content');
		content.style.opacity = 0;
		setTimeout(function () {
			content.innerHTML = ajaxRestartGame.responseText;
			content.style.opacity = 1;
		}, 500);
	}

}