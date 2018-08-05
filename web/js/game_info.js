var timerVisible, timerFlipBack;

function gameInfoInit () {
    score = tries = lastTrie = found = sec = min = totalTime = tileOpenTime = 0;
    scoreNum            = document.getElementById('game-score-num');
    triesNum            = document.getElementById('game-moves-num');
    foundNum            = document.getElementById('game-found-num');
    scoreNum.innerHTML  = score;
    triesNum.innerHTML  = tries;
    foundNum.innerHTML  = found + ' / 0';
    selTilesFront       = [];
    selTilesBack        = [];
    selTilesClass       = [];
}

// function checkVisible () {
//     if (tiles.length !== 0) {
//         clearTimeout(timerVisible);
//         tileEventListener(true);
//     }
//     else {
//         timerVisible = setTimeout(checkVisible,1000);
//     }
// }
// checkVisible();

function checkAllOpened () {
    var opened = 0;
    var len = tiles.length;
    for (var i = 0; i < len; i++) {
        var hasClass = tiles[i].getAttribute('class');
        if ((hasClass.match(/opened/))) { opened++; }
        if ((opened / 2) === parseInt(fieldSize.value)) {

            console.log('Score: ' + score);

            var playerId = document.getElementById('player-id').getAttribute('value');
            fieldId = document.getElementById('field-size-id').getAttribute('value');
            var postBody = 'player_id=' + playerId + '&field_id=' + fieldId + '&score=' + score + '&time=' + totalTime;
            var ajaxWinGame = new XMLHttpRequest();

            ajaxWinGame.open('POST', '/game/win', false);
            ajaxWinGame.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            ajaxWinGame.send(postBody);

            if ( ajaxWinGame.status !== 200 ) {
                alert(ajaxWinGame.status + ': ' + ajaxWinGame.statusText);
            } else {
                console.log(ajaxWinGame.response);
            }

            // saveToLocalStorage();

            return 1;
        }
    }
}