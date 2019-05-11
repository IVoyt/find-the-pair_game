window.Nodes = function() {
    this.header             = document.querySelector('#header');
    this.footer             = document.querySelector('#footer');
    this.start_block        = document.querySelector('#start-block');
    this.start_text         = document.querySelector('#start-text');

    this.background                 = document.querySelector('#background');
    this.backgroundsList            = document.querySelector('#backgrounds-list');
    this.backgroundsListData        = document.querySelector('#backgrounds-list-data');
    this.backgroundTrigger          = document.querySelector('#background-trigger');

    this.fieldSize          = '';
    this.fieldSizeData      = '';
    this.fieldSizeItems     = '';
    this.fieldSizeSelected  = '';
    this.field              = '';
    this.tiles              = '';
    this.errorMsg           = '';

    this.triggerBtn         = document.querySelector('#game-pause');
    this.triggerBtnText     = document.querySelector('#game-pause-text');
    this.highScoresTrigger  = document.querySelector('#highscores-trigger');

    this.divSec             = document.querySelector('#game-time-sec');
    this.divMin             = document.querySelector('#game-time-min');
    this.scoreNum           = document.querySelector('#game-score-num');
    this.triesNum           = document.querySelector('#game-moves-num');
    this.foundNum           = document.querySelector('#game-found-num');

    this.gameStartBtn       = '';
    this.selectLanguage     = document.querySelectorAll('.flag');

    this.backgrounds        = document.querySelectorAll('.bg-list');

};