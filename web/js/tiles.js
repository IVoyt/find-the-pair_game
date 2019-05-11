window.Tiles = function() {
    //--------------------
    // properties start
    //--------------------
    this.selectedTilesFront = [];
    this.selectedTilesBack  = [];
    this.selectedTilesClass = [];

    this.flipStatus         = false;

    var self = this;
    //--------------------
    // properties end
    //--------------------


    //--------------------
    // methods start
    //--------------------
    this.eventListener = function(mode) {
        for (var i = 0; i < app.nodes.tiles.length; i++) {
            if (mode === true) {
                var hasClass = app.nodes.tiles[i].getAttribute('class');
                if (!(hasClass.match(/opened/))) {
                    app.nodes.tiles[i].addEventListener('click', self.onClick, false);
                }
            } else {
                app.nodes.tiles[i].removeEventListener('click', self.onClick, false);
            }
        }
    };

    this.onClick = function() {
        var childrenCount = this.parentNode.childNodes.length;
        var frontTile = document.querySelector('#' + this.id);
        frontTile.style.zIndex = 3;

        // preventing to remove tile on dblClick as of program thinks pair has been found
        let back = document.querySelector('#'+this.id.replace('card', 'back'));
        back.removeEventListener('click', self.onClick);

        for (var i = 0; i < childrenCount; i++) {
            var child = this.parentNode.childNodes[i];
            if ((' ' + child.className + ' ').indexOf(' ' + 'back' + ' ') > -1) {
                var backTile = child;
            }
        }

        if (self.selectedTilesFront.length < 2) {
            frontTile.style.zIndex = 0;
            self.selectedTilesFront.push(frontTile);
            self.selectedTilesBack.push(backTile);
            self.selectedTilesClass.push(backTile.dataset.tile);
            self.flip(self.selectedTilesFront, self.selectedTilesBack, '');

            if (self.selectedTilesFront.length === 2) {
                self.eventListener(false);
                app.game.stats.tries++;
                app.nodes.triesNum.innerHTML = app.game.stats.tries;

                app.game.scoring();
            } else {
                clearTimeout(app.game.timer.flipBack);
                app.game.timer.flipBack = setTimeout(function () {
                    self.flip(self.selectedTilesFront, self.selectedTilesBack, 'back');
                    self.eventListener(true);
                }, 3000);
            }
        }
    };

    this.flip = function(front, back, mode) {
        var len = front.length;

        var i = 0;
        if (mode !== 'back') {  // flip forward
            for (i; i < len; i++) {
                front[i].style.zIndex           = 0;
                front[i].style.transform        = 'rotateY(180deg)';
                front[i].style.mozTransform     = 'rotateY(180deg)';
                front[i].style.webkitTransform  = 'rotateY(180deg)';

                back[i].style.transform         = 'rotateY(0deg)';
                back[i].style.mozTransform      = 'rotateY(0deg)';
                back[i].style.webkitTransform   = 'rotateY(0deg)';
            }
        } else {    // flip back
            for (i; i < len; i++) {
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
            self.selectedTilesFront = [];
            self.selectedTilesBack  = [];
            self.selectedTilesClass = [];

            if (app.nodes.triggerBtn.dataset.pause === '') {
                self.eventListener(false);
            }
        }
    };

    this.flipAll = function() {
        if (app.debug === true) {
            let tilesCount = app.nodes.tiles.length;
            for (var i = 0; i < tilesCount; i++) {
                if (self.flipStatus === false) {  // flip forward
                    if (app.nodes.tiles[i].classList.contains('front')) {
                        app.nodes.tiles[i].style.zIndex = 0;
                        app.nodes.tiles[i].style.transform = 'rotateY(180deg)';
                        app.nodes.tiles[i].style.mozTransform = 'rotateY(180deg)';
                        app.nodes.tiles[i].style.webkitTransform = 'rotateY(180deg)';
                    } else {
                        app.nodes.tiles[i].style.transform = 'rotateY(0deg)';
                        app.nodes.tiles[i].style.mozTransform = 'rotateY(0deg)';
                        app.nodes.tiles[i].style.webkitTransform = 'rotateY(0deg)';
                    }
                } else {    // flip back
                    if (app.nodes.tiles[i].classList.contains('front')) {
                        app.nodes.tiles[i].style.zIndex = 3;
                        app.nodes.tiles[i].style.transform = '';
                        app.nodes.tiles[i].style.mozTransform = '';
                        app.nodes.tiles[i].style.webkitTransform = '';
                    } else {
                        app.nodes.tiles[i].style.transform = '';
                        app.nodes.tiles[i].style.mozTransform = '';
                        app.nodes.tiles[i].style.webkitTransform = '';
                    }
                }
            }
            if (self.flipStatus === true) {
                self.flipStatus = false;
            } else {
                self.flipStatus = true;
            }
        }
    };

};