(function() {
	var tiles = document.getElementsByClassName('card');
	var timerVisible;
	var timerFlip;
	window.selectedTilesFront = [];
	window.selectedTilesBack = [];

	function checkVisible () {
		if (tiles.length != 0) {
			clearTimeout(timerVisible);
			flipTile();
		}
		else {
			timerVisible = setTimeout(checkVisible,1000);
		}
	}
	checkVisible();

	function flipTile() {
		for (var i = 0; i < tiles.length; i++) {
			tiles[i].addEventListener('click', function(){

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

				selectedTilesFront.push(frontTile);
				selectedTilesBack.push(backTile);
				console.log(selectedTilesFront);
				console.log(selectedTilesBack);

				function checkClicked () {
					console.log(frontTile.style.zIndex);
					console.log(timerFlip);
					clearTimeout(timerFlip);
					if (frontTile.style.zIndex == 0) {
						clearTimeout(timerFlip);
						tileFlip(selectedTilesFront, selectedTilesBack, 'back');
					}
					else {
						timerFlip = setTimeout(checkClicked,2000);
					}
				}
				checkClicked();

				tileFlip(selectedTilesFront, selectedTilesBack);

			}, false);
		}
	}

})();