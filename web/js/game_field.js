var timerGameField;
function checkFieldLoaded () {
    if(document.getElementById('field') != null) {
        clearTimeout(timerGameField);
        window.tiles = document.getElementsByClassName('card');
        gameTriggerBtn.addEventListener('click', pauseTimer, false);
        tileEventListener(true);
        window.fieldSize = document.getElementById('field-size');
        foundNum.innerHTML = found + ' / ' + fieldSize.value;
        //setTimeout(startTimer,1000);
    } else {
        timerGameField = setTimeout(checkFieldLoaded, 500);
    }
}
checkFieldLoaded();

/**
 * @param elm : string
 */
function selectFieldSize (elm) {
    var elms = document.getElementsByClassName('select-field-size');
    var elmsLength = elms.length;
    for (var i = 0; i < elmsLength; i++) {
        var div = document.getElementById('field'+i).classList;
        if (div.contains('select-field-size-selected')) {
            div.remove('select-field-size-selected');
        }
    }

    var selected = document.getElementById(elm);
    var classes = selected.getAttribute('class');
    classes = classes + ' select-field-size-selected';
    selected.setAttribute('class',classes);
}



function calculateFieldSize () {
    var fieldSize = document.getElementById('field-size');
    var field = document.getElementById('field');
    var tiles = document.getElementsByClassName('cards');
    var margin = window.getComputedStyle(tiles[0]).getPropertyValue('margin');
    var padding = window.getComputedStyle(field).getPropertyValue('padding');
    margin = parseInt(margin.replace(/px/,''));
    padding = parseInt(padding.replace(/px/,''));

    console.log('Field Size is ' + fieldSize.value);
    console.log('Field padding is ' + padding);
    console.log('Tile margin is ' + margin);


    tileWidthSumm = parseInt( (fieldSize.value * 2) * (field.offsetWidth / fieldSize.value) - (fieldSize.value * margin) );
    tileHeightSumm = parseInt( (fieldSize.value * 2) * (field.offsetHeight / fieldSize.value) - (fieldSize.value * margin) );
    //var tileWidth = parseInt( ((field.offsetWidth / (fieldSize.value * 2)) - (2 * (margin + padding))) * 4);
    var tileWidth = parseInt( ((field.offsetHeight / (fieldSize.value * 2)) - (2 * (margin + padding))) * 4);
    //var tileHeight = parseInt( ((field.offsetHeight / (fieldSize.value * 2)) - (2 * (margin + padding))) * 4);
    var tileHeight = parseInt( ((field.offsetWidth / (fieldSize.value * 2)) - (2 * (margin + padding))) * 4);

    console.log('field.offsetHeight is ' + field.offsetHeight);

    console.log('Tile width is ' + tileWidth);
    console.log('Tile height is ' + tileHeight);
    console.log('Tile width summ is ' + tileWidthSumm);
    console.log('Tile height summ is ' + tileHeightSumm);
    console.log('Field width is ' + field.offsetWidth);
    console.log('Field height is ' + field.offsetHeight);
    console.log('window width is ' + window.innerWidth);
    console.log('window height is ' + window.innerHeight);

    if (window.offsetWidth !== field.offsetWidth || window.offsetHeight !== field.offsetHeight) {
        if (tileWidthSumm < tileHeightSumm) {
            //tileWidth = tileWidth - (tileHeightSumm - tileWidthSumm) / 2;
            for(i = 0; i < tiles.length; i++) {
                tiles[i].style.width = tileWidth + 'px';
                tiles[i].style.height = tileWidth + 'px';
            }
            console.log('tileWidth < tileHeight');
        }
        else {
            for(i = 0; i < tiles.length; i++) {
                tiles[i].style.width = tileHeight + 'px';
                tiles[i].style.height = tileHeight + 'px';
            }
            console.log('tileWidth > tileHeight');
        }
    }


}

//window.onresize = function() {
//  calculateFieldSize();
//};
window.addEventListener("resize", calculateFieldSize);