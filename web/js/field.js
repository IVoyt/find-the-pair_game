window.Field = function() {

    /**
     * calculating field & tiles sizes
     *
     * return void
     */
    this.calculateSize = function() {
        var fieldSize       = document.getElementById('field-size');
        var field           = document.getElementById('field');
        var fieldContainer  = document.getElementById('fieldContainer');
        var gameField       = document.getElementById('gameField');
        var tiles           = document.getElementsByClassName('cards');
        var tilesCount      = tiles.length;
        var fieldWidth      = window.getComputedStyle(field).getPropertyValue('width');
        var fieldHeight     = window.getComputedStyle(field).getPropertyValue('height');
        var margin          = window.getComputedStyle(tiles[0]).getPropertyValue('margin');
        fieldWidth          = parseInt(fieldWidth.replace(/px/,''));
        fieldHeight         = parseInt(fieldHeight.replace(/px/,''));
        margin              = parseInt(margin.replace(/px/,''));

        var tileSize;
        var itemsInRow = fieldSize.value / 2;
        if (itemsInRow < 4) itemsInRow = 4;

        if (fieldWidth >= fieldHeight) {
            fieldContainer.style.width      = fieldHeight + 'px';
            fieldContainer.style.height     = fieldHeight + 'px';
            fieldContainer.style.marginLeft = ((fieldWidth - fieldHeight) / 2) + 'px';
            fieldContainer.style.marginTop  = 0;
            gameField.style.width           = fieldHeight + 'px';

            tileSize = ((fieldHeight - (itemsInRow * margin * 2)) / itemsInRow) - 4;

            for(i = 0; i < tilesCount; i++) {
                tiles[i].style.width = tileSize + 'px';
                tiles[i].style.height = tileSize + 'px';
            }
        } else {
            fieldContainer.style.width      = fieldWidth + 'px';
            fieldContainer.style.height     = fieldWidth + 'px';
            fieldContainer.style.marginLeft = 0;
            fieldContainer.style.marginTop  = ((fieldHeight - fieldWidth) / 2) + 'px';
            gameField.style.width           = fieldWidth + 'px';

            tileSize = ((fieldWidth - (itemsInRow * margin * 2)) / itemsInRow) - 4;

            for(i = 0; i < tilesCount; i++) {
                tiles[i].style.width = tileSize + 'px';
                tiles[i].style.height = tileSize + 'px';
            }
        }

        var gameFieldHeight = window.getComputedStyle(gameField).getPropertyValue('height');
        var gameFieldWidth  = window.getComputedStyle(gameField).getPropertyValue('width');
        gameFieldHeight     = parseInt(gameFieldHeight.replace(/px/,''));
        gameFieldWidth      = parseInt(gameFieldWidth.replace(/px/,''));
        if (gameFieldWidth >= gameFieldHeight) {
            gameField.style.marginTop = ((gameFieldWidth - gameFieldHeight) / 2) + 'px';
        } else {
            gameField.style.marginTop = ((gameFieldHeight - gameFieldWidth) / 2) + 'px';
        }
    };
};
