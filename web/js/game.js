// game = new Game;
window.Game = function(){
    //--------------------
    // properties start
    //--------------------
    // this.record             = [];
    this.highScore  = [];

    this.timer      = null;
    this.stats      = null;
    this.field      = null;
    this.highScores = null;

    var self        = this;
    //--------------------
    // properties end
    //--------------------


    //--------------------
    // methods start
    //--------------------
    this.init = function() {
        app.nodes.fieldSizeItems    = document.querySelectorAll('.field-size-item');
        app.nodes.gameStartBtn      = document.querySelector('#start-game');
        app.nodes.errorMsg          = document.querySelector('#error-msg');

        app.nodes.gameStartBtn.onclick = function(){
            self.start();
        };

        let fieldSizeCount = app.nodes.fieldSizeItems.length;
        for (let i = 0; i < fieldSizeCount; i++) {
            app.nodes.fieldSizeItems[i].onclick = function() {
                self.setFieldSize(app.nodes.fieldSizeItems[i]);
            };
        }
    };
    this.infoInit = function() {
        app.nodes.scoreNum.innerHTML  = self.stats.score;
        app.nodes.triesNum.innerHTML  = self.stats.tries;
        app.nodes.foundNum.innerHTML  = self.stats.found + ' / 0';

        self.tiles.selectedTilesFront   = [];
        self.tiles.selectedTilesBack    = [];
        self.tiles.selectedTilesClass   = [];
    };
    this.setFieldSize = function(elm) {
        app.nodes.errorMsg.innerHTML = '';
        let fieldSizeCount = app.nodes.fieldSizeItems.length;
        for (let i = 0; i < fieldSizeCount; i++) {
            let classList = app.nodes.fieldSizeItems[i].getAttribute('class');
            app.nodes.fieldSizeItems[i].classList = classList.replace(/field-size-selected/, '');
        }
        elm.classList = elm.classList + ' field-size-selected';
    };
    this.checkAllOpened     = function() {
        if (parseInt(self.stats.found) === parseInt(app.nodes.fieldSize.value)) {
            self.timer.stop();

            let fieldSizeCount = app.nodes.fieldSizeItems.length;
            for (let i = 0; i < fieldSizeCount; i++) {
                app.nodes.fieldSizeItems[i].removeEventListener('click', self.setFieldSize);
            }

            // app.console('Score: ' + self.stats.score);

            let fieldId = document.querySelector('#field-size-id').dataset.fieldsize;
            let postBody = 'field_id=' + fieldId + '&score=' + self.stats.score + '&time=' + self.timer.total;
            let ajaxWinGame = new XMLHttpRequest();

            ajaxWinGame.open('POST', '/game/win', true);
            ajaxWinGame.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            ajaxWinGame.send(postBody);

            ajaxWinGame.onreadystatechange = function () {
                if (ajaxWinGame.readyState === 4) {
                    if ( ajaxWinGame.status !== 200 ) {
                        alert(ajaxWinGame.status + ': ' + ajaxWinGame.statusText);
                    } else {
                        // app.console(ajaxWinGame.response);
                    }
                }
            };

            // saveToLocalStorage();
        }
    };

    /**
     * sends game data and starts new game
     */
    this.start  = function() {
        self.stats.found = 0;
        self.tiles.flipStatus = false;
        app.nodes.fieldSizeSelected = document.querySelector('.field-size-selected');
        if (app.nodes.fieldSizeSelected === null || typeof app.nodes.fieldSize === 'undefined') {
            return app.nodes.errorMsg.innerHTML = 'Select field size!';
        }
        app.nodes.fieldSizeData = app.nodes.fieldSizeSelected.dataset.fieldsize;
        let postBody        = '&field_size=' + app.nodes.fieldSizeData;
        let ajaxStartGame   = new XMLHttpRequest();
        ajaxStartGame.timeout = 3000;
        ajaxStartGame.onreadystatechange = function () {
            if (ajaxStartGame.readyState === 4) {
                if ( ajaxStartGame.status !== 200 ) {
                    alert(ajaxStartGame.status + ': ' + ajaxStartGame.statusText);
                    app.console(ajaxStartGame.statusText);
                } else {
                    let content     = document.getElementById('content');
                    let error_block = document.getElementById('error-msg');
                    try {
                        let json = JSON.parse(ajaxStartGame.responseText);
                        app.console(ajaxStartGame.responseText);
                        app.console(json);
                        if (json.err === 1) {
                            error_block.innerHTML = json.response;
                            return;
                        }
                    } catch (e) {
                        // app.console(e);
                    }
                    error_block.innerHTML               = '';
                    app.nodes.start_block.style.opacity = '0';
                    app.nodes.triggerBtn.style.display  = '';
                    document.body.style.height          = '100%';

                    setTimeout(function() {
                        app.nodes.start_block.remove();
                        content.innerHTML = ajaxStartGame.responseText;
                        app.nodes.fieldSize = document.querySelector('#field-size');
                        app.nodes.tiles = document.querySelectorAll('.card');
                        self.tiles.eventListener(true);
                        window.addEventListener("resize", self.field.calculateSize);
                        app.nodes.triggerBtn.addEventListener('click', app.game.timer.pause);
                        app.nodes.foundNum.innerHTML = self.stats.found + ' / ' + app.nodes.fieldSize.value;
                        setTimeout(function ()  {
                            app.nodes.field                     = document.querySelector('#field');
                            app.nodes.field.style.opacity       = '1';
                            app.nodes.triggerBtnText.innerHTML  = app.msg.pause;
                            app.nodes.triggerBtn.style.opacity  = '1';
                            self.field.calculateSize();
                            self.timer.start();
                        }, 300);
                    }, 500);
                }
            }
        };
        ajaxStartGame.ontimeout = function () {
            alert('Waiting time expired. Please try again later...');
        };

        ajaxStartGame.open('POST', '/game/start', true);
        ajaxStartGame.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajaxStartGame.send(postBody);
    };

    /**
     * sends game data and restarts game
     */
    this.restart    = function() {
        let ajaxReStartGame = new XMLHttpRequest();
        let postBody = 'restart=1?&field_size=' + app.nodes.fieldSizeData;

        ajaxReStartGame.timeout = 3000;
        ajaxReStartGame.onreadystatechange = function () {
            if (ajaxReStartGame.readyState === 4) {
                if ( ajaxReStartGame.status !== 200 ) {
                    alert(ajaxReStartGame.status + ': ' + ajaxReStartGame.statusText);
                } else {
                    let content = document.querySelector('#content');
                    content.innerHTML = ajaxReStartGame.responseText;
                    self.init();
                    content.style.opacity = '';
                    setTimeout(function() {
                        app.nodes.start_block = document.querySelector('#start-block');
                        app.nodes.start_block.style.opacity = '1';
                        app.nodes.start_block.style.filter = 'blur(0)';
                        app.nodes.start_block.style.transform = 'perspective(10px) translate3d(0px, -50%, 0px)';
                        app.nodes.triggerBtn.style.display = 'none';
                    }, 700);

                    app.nodes.triggerBtn.style.opacity = 0;
                    app.nodes.triggerBtn.removeEventListener('click', app.game.restart, false);

                    self.stats.clear();
                    self.infoInit();
                    self.timer.clear();
                }
            }
        };
        ajaxReStartGame.ontimeout = function () {
            alert('Waiting time expired. Please try again later...');
        };
        ajaxReStartGame.open('POST', '/', true);
        ajaxReStartGame.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajaxReStartGame.send(postBody);
    };
    /**
     * calculating game score
     */
    this.scoring    = function() {
        if (self.tiles.selectedTilesClass[0] !== self.tiles.selectedTilesClass[1]) {
            clearTimeout(self.timer.flipBack);
            self.timer.flipBack = setTimeout(function () {
                self.tiles.flip(self.tiles.selectedTilesFront, self.tiles.selectedTilesBack, 'back');
                self.tiles.eventListener(true);
            }, 1000);
            self.stats.lastTrie++;
        } else {
            self.checkAllOpened();
            clearTimeout(self.timer.flipBack);
            self.stats.found++;
            app.nodes.foundNum.innerHTML = self.stats.found + ' / ' + app.nodes.fieldSize.value;

            if (this.lastTrie === 0) {
                if (100 - self.timer.tileOpen <= 0) {
                    self.stats.score++;
                } else {
                    self.stats.score += (100 - self.timer.tileOpen);
                }
            } else {
                if ((100 - self.stats.lastTrie * 10) - self.timer.tileOpen <= 0) {
                    self.stats.score++;
                } else {
                    self.stats.score += ((100 - self.stats.lastTrie * 10) - self.timer.tileOpen);
                }
            }

            self.stats.lastTrie = 0;
            self.timer.tileOpen = 0;
            app.nodes.scoreNum.innerHTML = self.stats.score;

            let selTilesBackLength = self.tiles.selectedTilesBack.length;
            for (let i = 0; i < selTilesBackLength; i++) {
                var hasClass = self.tiles.selectedTilesBack[i].getAttribute('class');
                if (!(hasClass.match(/opened/))) {
                    self.tiles.selectedTilesBack[i].className = hasClass + ' opened';
                    self.tiles.selectedTilesBack[i].removeEventListener('click', self.tiles.onClick, false);
                }
            }
            let stopGame = self.checkAllOpened();
            if (stopGame === 1) {
                self.timer.stop();
            }
            self.tiles.flip(self.tiles.selectedTilesFront, self.tiles.selectedTilesBack, 'back');

            self.tiles.eventListener(true);
        }
    };

    this.init();
};





// function qwe() {
//     console.log(iter);
//     console.log('timeout function init');
//     var elmStyle = 'linear-gradient(90deg, #FEFEFE ' + (-100 + iter) + '%, #F60000 ' + (-50 + iter) + '%, #FFFFFF ' + (iter) + '%)';
//     game.enter_player_name.style.background = elmStyle;
//     if (iter === 200) {
//         iter = 0;
//         if (mouseout === 1) {
//             console.log('timer should be cleared');
//             clearTimeout();
//         } else {
//             setTimeout(qwe, 15);
//         }
//     } else {
//         setTimeout(qwe, 15);
//         iter++;
//     }
//
// }
// window.iter = 0;
// game.enter_player_name.onmouseover = function () {
//     window.mouseout = 0;
//     qwe();
// };
// game.enter_player_name.onmouseout = function () {
//     window.mouseout = 1;
// };




// for (let elm in selectFieldSize) {
//     selectFieldSize[elm].onclick = function() {
//         game.setFieldSize(selectFieldSize[elm]);
//     };
// }

