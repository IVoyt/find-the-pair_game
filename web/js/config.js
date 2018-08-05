start_block         = document.getElementById('start-block');
field               = document.getElementById('field');
gameTriggerBtn      = document.getElementById('game-pause');
gameTriggerBtnText  = document.getElementById('game-pause-text');
highscores          = document.getElementById('highscores-trigger');
buttonText          = JSON.parse(gameTriggerBtn.dataset['btntext']);
record              = [];

gameTriggerBtnText.innerHTML = buttonText['pause'];


/**
 * @param elm : string
 */
function selectLanguage (elm) {
    elm = elm.replace('lang-', '');

    var ajaxLanguage = new XMLHttpRequest();
    ajaxLanguage.open('POST', '/main/set-language', false);
    ajaxLanguage.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajaxLanguage.send('lang='+elm);

    if ( ajaxLanguage.status !== 200 ) {
        alert(ajaxLanguage.status + ': ' + ajaxLanguage.statusText);
        console.log(ajaxLanguage.statusText);
    } else {
        try {
            var json = JSON.parse(ajaxLanguage.responseText);
            console.log(elm);
            console.log(json);
            // return;
        } catch (e) {
            console.log(e);
        }
    }
    location.reload();
}


function qwe() {
    console.log(iter);
    console.log('timeout function init');
    var elmStyle = 'linear-gradient(90deg, #FEFEFE ' + (-100 + iter) + '%, #F60000 ' + (-50 + iter) + '%, #FFFFFF ' + (iter) + '%)';
    enter_player_name.style.background = elmStyle;
    if (iter === 200) {
        iter = 0;
        if (mouseout === 1) {
            console.log('timer should be cleared');
            clearTimeout();
        } else {
            setTimeout(qwe, 15);
        }
    } else {
        setTimeout(qwe, 15);
        iter++;
    }

}
window.iter = 0;
var enter_player_name = document.getElementById('enter-player-name');
// enter_player_name.onmouseover = function () {
//     window.mouseout = 0;
//     qwe();
// };
// enter_player_name.onmouseout = function () {
//     window.mouseout = 1;
// };

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        var header  = document.getElementById('header');
        var footer  = document.getElementById('footer');
        start_block = document.getElementById('start-block');
        start_text  = document.getElementById('start-text');

        highscores.addEventListener('click', showHighscoresModal, false);

        start_block.style.filter    = 'blur(0)';
        start_block.style.opacity   = '1';
        start_block.style.transform = 'perspective(10px) translate3d(0, -50%, 0)';

        header.style.top            = 0;
        footer.style.bottom         = 0;
    }, 350);

    gameInfoInit();
});