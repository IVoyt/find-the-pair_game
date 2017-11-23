triggerBtn      = document.getElementById('game-pause');
triggerBtnText  = document.getElementById('game-pause-text');
buttonText      = JSON.parse(triggerBtn.dataset['btntext']);
triggerBtnText.innerHTML = buttonText['pause'];

var timerStartpage = setTimeout(function () {
  if(document.getElementById('start-block') != null) {
    start_block = document.getElementById('start-block');
    start_text = document.getElementById('start-text');
    clearTimeout(timerStartpage);
  }
  else {
    timerStartpage;
  }
}, 200);

var timerGameField;
function checkFieldLoaded () {
  if(document.getElementById('field') != null) {
    clearTimeout(timerGameField);
    tiles = 0;
    tiles = document.getElementsByClassName('card');
    triggerBtn.addEventListener('click', pauseTimer, false);
    tileEventListener('add');
    var fieldSize = document.getElementById('field-size');
    foundNum.innerHTML = found + ' / ' + fieldSize.value;
    setTimeout(startTimer,1000);
  }
  else {
    timerGameField = setTimeout(checkFieldLoaded, 500);
  }
}
checkFieldLoaded();

function showBackgrounds () {
  var bgDiv = document.getElementById('backgrounds');
  var bgData = document.getElementById('game-bg-visible');

  if (bgData.dataset.bg == 0) {
    bgDiv.style.top = '65px';
    bgData.dataset.bg = 1;
  }
  else {
    bgDiv.style.top = '';
    bgData.dataset.bg = 0;
  }
}

function setBackground (elm) {
  var bgStyle = getComputedStyle(elm);
  var bgData = document.getElementById('bg-data');
  var background = document.body;

  bgData.dataset['bg'] = bgStyle.background;
  background.style.background = bgStyle.background;

  var ajaxSetBackground = new XMLHttpRequest('POST','/setbackground',false);
  var postBody = 'background=' + bgData.dataset['bg'];
  ajaxSetBackground.open('POST', '/background', false);
  ajaxSetBackground.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  ajaxSetBackground.send(postBody);

  if ( ajaxSetBackground.status != 200 ) {
    alert(ajaxSetBackground.status + ': ' + ajaxSetBackground.statusText);
  }
  else {
    console.log(ajaxSetBackground.response);
  }
}
