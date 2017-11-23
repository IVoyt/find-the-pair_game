function tileFlip(front, back, mode) {

	var len = front.length;

	if (mode != 'back') {
		for (var i = 0; i < len; i++) {
			front[i].style.zIndex = 0;
			front[i].style.transform = 'rotateY(180deg)';
			front[i].style.mozTransform = 'rotateY(180deg)';
			front[i].style.webkitTransform = 'rotateY(180deg)';

			back[i].style.transform = 'rotateY(0deg)';
			back[i].style.mozTransform = 'rotateY(0deg)';
			back[i].style.webkitTransform = 'rotateY(0deg)';
		}
	}
	else {
		for (var i = 0; i < len; i++) {
      if (!(back[i].classList.contains('opened'))) {
        front[i].style.zIndex = 3;
        front[i].style.transform = '';
        front[i].style.mozTransform = '';
        front[i].style.webkitTransform = '';

        back[i].style.transform = '';
        back[i].style.mozTransform = '';
        back[i].style.webkitTransform = '';
      }
      else {
        back[i].style.opacity = 0;
      }
		}
    selTilesFront = [];
    selTilesBack = [];
    selTilesClass = [];

    if (triggerBtn.dataset['pause'] == '') {
      tileEventListener('add');
    }
	}
}