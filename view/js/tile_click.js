function tileEventListener(mode) {
  for (var i = 0; i < tiles.length; i++) {
		if (mode == 'add') {
			tiles[i].addEventListener('click', tileOnClick, false);
		}
		else {
			tiles[i].removeEventListener('click', tileOnClick, false);
		}
	}
}

function tileOnClick () {
	var childrenCount = this.parentNode.childNodes.length;
	var frontTile = document.getElementById(this.id);
	frontTile.style.zIndex = 3;

	for (var i = 0; i < childrenCount; i++) {
		var child = this.parentNode.childNodes[i];
		if ((' ' + child.className + ' ').indexOf(' ' + 'back' + ' ') > -1) {
			var backTile = child;
		}
	}

  if (selTilesFront.length < 2) {
    frontTile.style.zIndex = 0;
    selTilesFront.push(frontTile);
    selTilesBack.push(backTile);
    selTilesClass.push(backTile.dataset[ 'tile' ]);
    tileFlip(selTilesFront, selTilesBack, '');

    if (selTilesFront.length == 2) {
      tileEventListener('remove');
      tries++;
      triesNum.innerHTML = tries;
      console.log('Tries: ' + tries);
      console.log('Found: ' + found);

      if (selTilesClass[0] != selTilesClass[1]) {
        clearTimeout(timerFlipBack);
        timerFlipBack = setTimeout(function () {
          tileFlip(selTilesFront, selTilesBack, 'back');
        }, 2000);
        lastTrie++;
      }
      else {
        clearTimeout(timerFlipBack);
        var fieldSize = document.getElementById('field-size');
        found++;
        foundNum.innerHTML = found + ' / ' + fieldSize.value;
        console.log('Found: ' + found);

        if (lastTrie == 0) {
          score += (100 - tileOpenTime);
        }
        else {
          if (lastTrie <= 9) {
            score += ((100 - lastTrie * 10) - tileOpenTime);
          }
          else {
            score += 10;
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
        if (stopGame == 1) {
          stopTimer();
        }
        tileFlip(selTilesFront, selTilesBack, 'back');
      }

      console.log('lastTry: ' + lastTrie);
      console.log('score: ' + score);

    }
  }
}