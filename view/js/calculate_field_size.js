function calculateFieldSize () {
	var fieldSize = document.getElementById('field_size');
	var field = document.getElementById('field');
	var tiles = document.getElementsByClassName('cards');
	var margin = window.getComputedStyle(tiles[0]).getPropertyValue('margin');
	var padding = window.getComputedStyle(field).getPropertyValue('padding');
	var rows = (fieldSize.value * 2 / 4);
	margin = parseInt(margin.replace(/px/,''));
	padding = parseInt(padding.replace(/px/,''));
	console.log('Field Size is ' + fieldSize.value);
	console.log('Field padding is ' + padding);
	console.log('Tile margin is ' + margin);
	console.log('Rows count is ' + rows);


	tileWidthSumm = parseInt( (fieldSize.value * 2) * (field.offsetWidth / fieldSize.value) - (fieldSize.value * margin) );
	tileHeightSumm = parseInt( (fieldSize.value * 2) * (field.offsetHeight / fieldSize.value) - (fieldSize.value * margin) );
	var tileWidth = parseInt( (field.offsetWidth / 4) - (2 * (margin + padding)) );
	var tileHeight = parseInt( (field.offsetHeight / 4) - (2 * (margin + padding)));
	console.log('tileHeightSum is ' + tileHeight + ' * ' + rows + ' = ' + (tileHeight * rows));
	console.log('field.offsetHeight is ' + field.offsetHeight);


	console.log('Tile width is ' + tileWidth);
	console.log('Tile height is ' + tileHeight);
	console.log('Tile width summ is ' + tileWidthSumm);
	console.log('Tile height summ is ' + tileHeightSumm);
	console.log('Field width is ' + field.offsetWidth);
	console.log('Field height is ' + field.offsetHeight);


	if (tileWidthSumm < tileHeightSumm) {
		tileWidth = tileWidth - (tileHeightSumm - tileWidthSumm) / 2;
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