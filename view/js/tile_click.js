tiles = document.getElementsByClassName('card');
var timerVisible;
var timerFlip;
window.selTilesFront = [];
window.selTilesBack = [];
window.selTilesClass = [];

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

function tileEventListener(mode) {
  console.log('mode is ' + mode);
  for (var i = 0; i < tiles.length; i++) {
		if (mode == 'add') {
			tiles[i].addEventListener('click', tileOnClick, false);
		}
		else {
			tiles[i].removeEventListener('click', '', false);
		}
	}
}

function tileOnClick () {
	var childrenCount = this.parentNode.childNodes.length;
	var frontTile = document.getElementById(this.id);
	frontTile.style.zIndex = 3;

	function hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

	for (var i = 0; i < childrenCount; i++) {
		var child = this.parentNode.childNodes[i];
		if (hasClass(child,'back')) {
			var backTile = child;
		}
	}

  clearTimeout(timerFlip);
  console.log('timeout should be cleared');
  function checkClicked () {
		if (frontTile.style.zIndex == 0) {
			if (selTilesClass[0] != selTilesClass[1]) {
			  console.log('if if');
        clearTimeout(timerFlip);
        console.log('timeout should be cleared');
        tileFlip(selTilesFront, selTilesBack, 'back');
			}
			else if (selTilesClass[0] == selTilesClass[1]) {
        console.log('else if');
        clearTimeout(timerFlip);
        console.log('timeout should be cleared');

        var selTilesBackLength = selTilesBack.length;
        for (var i = 0; i < selTilesBackLength; i++) {
          var hasClass = selTilesBack[i].getAttribute('class');
          if (!(hasClass.match(/opened/))) {
            selTilesBack[i].className = hasClass + ' opened';
          }
        }
        tileFlip(selTilesFront, selTilesBack, 'back');
      }
		}
		else {
      console.log('else');
			frontTile.style.zIndex = 0;
			timerFlip = setTimeout(checkClicked,2000);
		}
	}
	checkClicked();

	if (selTilesFront.length < 2) {
    selTilesFront.push(frontTile);
    selTilesBack.push(backTile);
    selTilesClass.push(backTile.dataset[ 'tile' ]);
    console.log(selTilesClass);

    tileFlip(selTilesFront, selTilesBack, '', backTile);

    if ( selTilesFront.length == 2 ) {
      tileEventListener('remove');
    }
  }

}