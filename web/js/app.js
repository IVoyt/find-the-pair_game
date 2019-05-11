window.App = function() {
    this.game   = null;
    this.nodes  = null;

    this.msg    = null;

    this.debug  = false;

    this.backgroundStyle            = '';

    this.backgroundTimer = null;

    var self = this;

    this.showBackground = function(trigger) {
        if (trigger !== 'field' && !self.nodes.backgroundsList.classList.contains('bg-list-opened')) {
            self.nodes.backgroundsList.style.display = 'block';
            clearTimeout(self.backgroundTimer);
            setTimeout(function () {
                self.nodes.backgroundsList.classList = 'bg-list-opened';
            }, 10);
        } else {
            self.nodes.backgroundsList.classList = '';
            clearTimeout(self.backgroundTimer);
            self.backgroundTimer = setTimeout(function () {
                self.nodes.backgroundsList.style.display = '';
            }, 500);
        }
    };

    this.setBackground = function(elm) {
        if (typeof elm === 'undefined' || elm === null) {
            return app.console('expecting DOM node');
        }
        self.backgroundStyle                    = getComputedStyle(elm);
        self.nodes.backgroundsListData.dataset['bg']  = this.backgroundStyle.background;
        self.nodes.background.style.background        = this.backgroundStyle.background;

        let ajaxSetBackground = new XMLHttpRequest();
        let postBody = 'background=' + this.backgroundsListData.dataset['bg'];
        ajaxSetBackground.open('POST', '/main/set-background', true);
        ajaxSetBackground.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajaxSetBackground.send(postBody);
        ajaxSetBackground.onreadystatechange = function () {
            if (ajaxSetBackground.readyState === 4) {
                if (ajaxSetBackground.status !== 200) {
                    alert(ajaxSetBackground.status + ': ' + ajaxSetBackground.statusText);
                } else {
                    // app.console(ajaxSetBackground.response);
                }
            }
        };
    };

    this.selectLanguage = function(elm) {
        app.console(elm);
        elm = elm.replace('lang-', '');

        let ajaxLanguage = new XMLHttpRequest();
        ajaxLanguage.open('POST', '/main/set-language', true);
        ajaxLanguage.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajaxLanguage.send('lang='+elm);

        ajaxLanguage.onreadystatechange = function () {
            if (ajaxLanguage.readyState === 4) {
                if ( ajaxLanguage.status !== 200 ) {
                    alert(ajaxLanguage.status + ': ' + ajaxLanguage.statusText);
                    app.console(ajaxLanguage.statusText);
                } else {
                    try {
                        let json = JSON.parse(ajaxLanguage.responseText);
                        app.console(elm);
                        app.console(json);
                        // return;
                    } catch (e) {
                        app.console(e);
                    }
                }
                window.location.reload();
            }
        };
    };

    /**
     * @param toConsole
     * @param logLevel (1 - info, 2 - log, 3 - warn, 4 - error)
     */
    this.console = function(toConsole, logLevel = 3) {
        switch (logLevel) {
            case 1: console.dir(toConsole);     break;
            case 2: console.info(toConsole);    break;
            case 3: console.log(toConsole);     break;
            case 4: console.warn(toConsole);    break;
            case 5: console.error(toConsole);   break;
        }
    };

    this.init = function() {
        var initTimer = setTimeout(function () {
            if (self.nodes === null) {
                setTimeout(initTimer,10);
            } else {
                self.nodes.backgroundTrigger.addEventListener('click', self.showBackground);
                let content = document.querySelector('#content');
                content.addEventListener('click', function(){
                    self.showBackground('field');
                });
            }
        }, 10);
    };

    this.init();
};


window.app          = new App();
app.nodes           = new Nodes();
app.game            = new Game();
app.game.timer      = new Timer();
app.game.stats      = new Stats();
app.game.field      = new Field();
app.game.tiles      = new Tiles();
app.game.highScores = new Highscores();

app.msg = JSON.parse(app.nodes.triggerBtn.dataset.btntext);

var backgroundItemsCount = app.nodes.backgrounds.length;
for (let i = 0; i < backgroundItemsCount; i++) {
    app.nodes.backgrounds[i].addEventListener('click', function() {
        app.setBackground(this);
    });
}

var languagesCount = app.nodes.selectLanguage.length;
for (var i = 0; i < languagesCount; i++) {
    app.nodes.selectLanguage[i].addEventListener("click", function (e) {
        var elm = e.target;
        var elmId = elm.getAttribute('id');
        if (elmId === null) {
            elm = elm.parentNode;
            elmId = elm.getAttribute('id');
        }
        app.console(elm);
        app.console(elmId);
        e.preventDefault();
        app.selectLanguage(elmId);
    });
}

app.nodes.highScoresTrigger.addEventListener('click', app.game.highScores.showModal);


document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        app.nodes.start_block.style.filter    = 'blur(0)';
        app.nodes.start_block.style.opacity   = '1';
        app.nodes.start_block.style.transform = 'perspective(10px) translate3d(0, -50%, 0)';

        app.nodes.header.style.top            = 0;
        app.nodes.footer.style.bottom         = 0;
    }, 350);

    app.game.infoInit();
});