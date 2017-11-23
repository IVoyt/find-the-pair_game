function loadHighscores () {
  if (document.getElementById('highscores-modal') == null) {
    console.log('IF executed');
    var ajaxGetHighscores = new XMLHttpRequest();
    ajaxGetHighscores.open('POST','/highscores',false);
    ajaxGetHighscores.send();

    if ( ajaxGetHighscores.status != 200 ) {
      alert(ajaxGetHighscores.status + ': ' + ajaxGetHighscores.statusText);
    }
    else {
      document.body.innerHTML += ajaxGetHighscores.response;
    }
  }
  showHighscores();
}

function showHighscores () {
  var content = document.getElementById('main');
  var highscoresModal = document.getElementById('highscores-modal');
  var highscoresModalBg = document.getElementById('highscores-modal-bg');
  var highscoresModalStyle = getComputedStyle(highscoresModal);

  if (highscoresModalStyle.opacity == 0) {
    highscoresModal.style.display = 'block';
    setTimeout(function() {
      highscoresModal.style.transform = 'scale(1,1)';
      highscoresModal.style.opacity = '1';
    }, 100);
    highscoresModalBg.style.display = 'block';
    content.style.transition = 'filter 0.5s ease 0s';
    content.style.filter = 'blur(2px) brightness(45%) grayscale(0.9)';
    highscoresModalBg.addEventListener('click',closeModal,false);
  }
  else {
    console.log('other condition');
  }
}

function closeModal() {
  var content = document.getElementById('main');
  var highscoresModal = document.getElementById('highscores-modal');
  var highscoresModalBg = document.getElementById('highscores-modal-bg');

  highscoresModal.style.transform = '';
  highscoresModal.style.opacity = '';
  highscoresModalBg.style.display = '';
  content.style.transition = 'filter 0.5s ease 0s';
  content.style.filter = '';
  setTimeout(function() {
    highscoresModal.style.display = '';
    }, 700);
}
