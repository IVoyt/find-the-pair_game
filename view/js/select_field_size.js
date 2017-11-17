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