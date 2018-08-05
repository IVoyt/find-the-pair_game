/**
 * @param mode : boolean
 *
 * true     - addEventListener
 * false    - removeEventListener
 */
function tileEventListener(mode) {
    for (var i = 0; i < tiles.length; i++) {
        if (mode === true) {
            tiles[i].addEventListener('click', tileOnClick, false);
        } else {
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

    // console.log(childrenCount);
    // console.log(frontTile);
    // console.log(backTile);

    if (selTilesFront.length < 2) {
    frontTile.style.zIndex = 0;
    selTilesFront.push(frontTile);
    selTilesBack.push(backTile);
    selTilesClass.push(backTile.dataset[ 'tile' ]);
    tileFlip(selTilesFront, selTilesBack, '');

        if (selTilesFront.length === 2) {
            tileEventListener(false);
            tries++;
            triesNum.innerHTML = tries;

            scoring();

            console.log('Tries: ' + tries);
            console.log('Found: ' + found);
            console.log('lastTry: ' + lastTrie);
            console.log('score: ' + score);

        }
    }
}

/**
 * @param front : Object
 * @param back : Object
 * @param mode : string
 */
function tileFlip(front, back, mode) {
    console.log(front);
    console.log(back);
    console.log(mode);

    var len = front.length;

    var i = 0;
    if (mode !== 'back') {
        for (i = 0; i < len; i++) {
            front[i].style.zIndex           = 0;
            front[i].style.transform        = 'rotateY(180deg)';
            front[i].style.mozTransform     = 'rotateY(180deg)';
            front[i].style.webkitTransform  = 'rotateY(180deg)';

            back[i].style.transform         = 'rotateY(0deg)';
            back[i].style.mozTransform      = 'rotateY(0deg)';
            back[i].style.webkitTransform   = 'rotateY(0deg)';
        }
    } else {
        for (i = 0; i < len; i++) {
            if (!(back[i].classList.contains('opened'))) {
                front[i].style.zIndex           = 3;
                front[i].style.transform        = '';
                front[i].style.mozTransform     = '';
                front[i].style.webkitTransform  = '';

                back[i].style.transform         = '';
                back[i].style.mozTransform      = '';
                back[i].style.webkitTransform   = '';
            } else {
                back[i].style.opacity           = 0;
            }
        }
        selTilesFront   = [];
        selTilesBack    = [];
        selTilesClass   = [];

        if (gameTriggerBtn.dataset['pause'] === '') {
            tileEventListener(false);
        }
    }
}