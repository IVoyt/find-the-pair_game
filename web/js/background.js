function showBackgrounds () {
    var bgDiv = document.getElementById('backgrounds');
    var bgData = document.getElementById('game-bg-visible');

    if (bgData.dataset.bg === '0') {
        bgDiv.style.top = '65px';
        bgData.dataset.bg = 1;
    } else {
        bgDiv.style.top = '';
        bgData.dataset.bg = 0;
    }
}


/**
 * @param elm : Object
 */
function setBackground (elm) {
    var bgStyle = getComputedStyle(elm);
    var bgData = document.getElementById('bg-data');
    var background = document.getElementById('bg');

    bgData.dataset['bg'] = bgStyle.background;
    background.style.background = bgStyle.background;

    var ajaxSetBackground = new XMLHttpRequest();
    var postBody = 'background=' + bgData.dataset['bg'];
    ajaxSetBackground.open('POST', '/main/set-background', false);
    ajaxSetBackground.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajaxSetBackground.send(postBody);

    if (ajaxSetBackground.status !== 200) {
        alert(ajaxSetBackground.status + ': ' + ajaxSetBackground.statusText);
    } else {
        console.log(ajaxSetBackground.response);
    }
}