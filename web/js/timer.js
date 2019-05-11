window.Timer = function(){
    this.sec            = 0;
    this.min            = 0;
    this.total          = 0;
    this.tileOpen       = 0;
    this.loop           = null;
    this.gameField      = null;
    this.flipBack       = null;
    this.visible        = null;

    var self = this;

    this.start =          function() {
        self.sec++;
        self.total++;
        self.tileOpen++;

        if (parseInt(self.sec) < 10) {
            app.nodes.divSec.innerHTML = '0' + self.sec;
        } else {
            app.nodes.divSec.innerHTML = self.sec;
        }

        if (parseInt(self.sec) === 60) {
            self.sec = 0;  self.min++;
            app.nodes.divSec.innerHTML = '00';
            if (self.min < 10)  { app.nodes.divMin.innerHTML = '0' + self.min; }
            else                { app.nodes.divMin.innerHTML = self.min; }
        }
        self.loop = setTimeout(self.start,1000);
    };
    this.stop =           function() {
        clearTimeout(self.loop);
        app.nodes.triggerBtn.removeEventListener('click', self.pause, false);
        window.removeEventListener("resize", app.game.field.calculateSize);
        app.nodes.triggerBtn.addEventListener('click', app.game.restart, false);
        app.nodes.triggerBtnText.innerHTML        = app.msg.restart;
        app.nodes.triggerBtn.dataset['status']    = 'stop';
    };
    this.pause =          function() {
        if (app.nodes.triggerBtn.dataset.pause === '') {
            clearTimeout(self.loop);
            app.nodes.triggerBtn.dataset.pause  = 'paused';
            app.nodes.triggerBtnText.innerHTML  = app.msg.continue;
            app.game.tiles.eventListener(false);
        } else {
            app.nodes.triggerBtn.dataset.pause  = '';
            app.nodes.triggerBtnText.innerHTML  = app.msg.pause;
            app.game.tiles.eventListener(true);
            setTimeout(function () {
                if (app.nodes.triggerBtn.dataset.status !== 'stop') {
                    self.start();
                }
            }, 1000);
        }
    };
    this.clear =          function() {
        self.sec = self.min = self.total = 0;
        app.nodes.divSec.innerHTML = '00';
        app.nodes.divMin.innerHTML = '00';
    };
};