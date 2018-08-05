/**
 * sends game data and starts game
 */
function startGame () {
    console.log('function "startGame()" executing');
    var sendPlayerName  = document.getElementById('enter-player-name').value;
    var fieldSize       = document.querySelector('.select-field-size-selected');
    var postBody        = 'player_name=' + sendPlayerName + '&field_size=' + fieldSize.dataset.fieldsize;
    var ajaxStartGame   = new XMLHttpRequest();

    // postBody = 'player_name=qwe&field_size=1';

    ajaxStartGame.open('POST', '/game/start', false);
    ajaxStartGame.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajaxStartGame.send(postBody);

    if ( ajaxStartGame.status !== 200 ) {
        alert(ajaxStartGame.status + ': ' + ajaxStartGame.statusText);
        console.log(ajaxStartGame.statusText);
    } else {
        var content     = document.getElementById('content');
        var error_block = document.getElementById('error-msg');
        try {
            var json = JSON.parse(ajaxStartGame.responseText);
            if (json.err === 1) {
                error_block.innerHTML = json.response;
                return;
            }
        } catch (e) {
            console.log(e);
        }
        error_block.innerHTML       = '';
        start_block.style.opacity   = 0;
        document.body.style.height  = '100vh';

        var playerName = document.getElementById('player-name');

        setTimeout(function() {
            start_block.remove();
            content.innerHTML = ajaxStartGame.responseText;
            setTimeout(function ()  {
                var field                       = document.getElementById('field');
                field.style.opacity             = 1;
                gameTriggerBtnText.innerHTML    = buttonText['pause'];
                gameTriggerBtn.style.opacity    = 1;
                playerName.innerHTML            = sendPlayerName;
                calculateFieldSize();
                startTimer();
            }, 300);
        }, 800);
    }
}

/**
 * sends game data and restarts game
 */
function restartGame() {
    console.log('function "restartGame()" executing');
    var ajaxReStartGame = new XMLHttpRequest();
    var postBody = 'restart=1';

    ajaxReStartGame.open('POST', '/', false);
    ajaxReStartGame.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajaxReStartGame.send(postBody);

    if ( ajaxReStartGame.status !== 200 ) {
        alert(ajaxReStartGame.status + ': ' + ajaxReStartGame.statusText);
    } else {
        var content = document.getElementById('content');
        content.style.opacity = 0;
        setTimeout(function() {
            content.innerHTML = ajaxReStartGame.responseText;
            checkFieldLoaded();
            setTimeout(function ()  {
                var field = document.getElementById('field');
                content.style.opacity = 1;
            }, 100);
        }, 700);

        gameTriggerBtn.removeEventListener('click', restartGame, false);
        gameTriggerBtn.style.opacity = 0;
        gameInfoInit();
        clearTimer();
        startTimer();
    }
}

/**
 * calculating game score
 */
function scoring() {
    if (selTilesClass[0] !== selTilesClass[1]) {
        clearTimeout(timerFlipBack);
        timerFlipBack = setTimeout(function () {
            tileFlip(selTilesFront, selTilesBack, 'back');
        }, 2000);
        lastTrie++;
    } else {
        clearTimeout(timerFlipBack);
        found++;
        foundNum.innerHTML = found + ' / ' + fieldSize.value;

        if (lastTrie === 0) {
            if (100 - tileOpenTime <= 0) {
                score += 1;
            } else {
                score += (100 - tileOpenTime);
            }
        }
        //else if (lastTrie <= 9) {
        else {
            if ((100 - lastTrie * 10) - tileOpenTime <= 0) {
                score += 1;
            } else {
                score += ((100 - lastTrie * 10) - tileOpenTime);
            }
        }

        lastTrie = 0;
        tileOpenTime = 0;
        scoreNum.innerHTML = score;

        var selTilesBackLength = selTilesBack.length;
        for (var i = 0; i < selTilesBackLength; i++) {
            var hasClass = selTilesBack[i].getAttribute('class');
            if (!(hasClass.match(/opened/))) {
                selTilesBack[i].className = hasClass + ' opened';
            }
        }
        var stopGame = checkAllOpened();
        if (stopGame === 1) {
            stopTimer();
        }
        tileFlip(selTilesFront, selTilesBack, 'back');

        tileEventListener(true);
    }
}