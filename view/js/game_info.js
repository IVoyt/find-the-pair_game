var timerVisible, timerFlipBack;

function gameInfoInit () {
  tiles     = 0;
  score     = 0;
  tries     = 0;
  lastTrie  = 0;
  found     = 0;
  scoreNum  = document.getElementById('game-score-num');
  triesNum  = document.getElementById('game-moves-num');
  foundNum  = document.getElementById('game-found-num');
  scoreNum.innerHTML = score;
  triesNum.innerHTML = tries;
  foundNum.innerHTML = found + ' / 0';
  selTilesFront = [];
  selTilesBack = [];
  selTilesClass = [];
}
gameInfoInit();

function checkVisible () {
  if (tiles.length != 0) {
    clearTimeout(timerVisible);
    tileEventListener('add');
  }
  else {
    timerVisible = setTimeout(checkVisible,1000);
  }
}
checkVisible();

function checkAllOpened () {
  var opened = 0;
  var len = tiles.length;
  for (var i = 0; i < len; i++) {
    var hasClass = tiles[i].getAttribute('class');
    if ((hasClass.match(/opened/))) {
      opened++;
    }
    var fieldSize = document.getElementById('field-size');
    if ((opened / 2) == fieldSize.value) {

      console.log('Score: ' + score);

      var playerId = document.getElementById('player-id').getAttribute('value');
      var fieldId = document.getElementById('field-size-id').getAttribute('value');
      var postBody = 'player_id=' + playerId + '&field_id=' + fieldId + '&score=' + score;
      var ajaxWinGame = new XMLHttpRequest();

      ajaxWinGame.open('POST', '/win', false);
      ajaxWinGame.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      ajaxWinGame.send(postBody);

      if ( ajaxWinGame.status != 200 ) {
        alert(ajaxWinGame.status + ': ' + ajaxWinGame.statusText);
      }
      else {
        console.log(ajaxWinGame.response);
      }

      return 1;
    }
  }
}