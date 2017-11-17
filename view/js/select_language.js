function selectLanguage (elm) {
	var selected = document.getElementById(elm);
	var lang = document.getElementById('form-lang-input');
	var form = document.getElementById('form-lang');
	lang.value = selected.id.replace(/lang-/,'');
	form.submit();
}