function showHighscoresModal () {
    var ajaxGetHighscores = new XMLHttpRequest();
    ajaxGetHighscores.open('POST','/highscores',false);
    ajaxGetHighscores.send();

    if ( ajaxGetHighscores.status !== 200 ) {
        alert(ajaxGetHighscores.status + ': ' + ajaxGetHighscores.statusText);
    } else {
        document.body.innerHTML += ajaxGetHighscores.response;

        var content             = document.getElementById('main');
        var highscoresModal     = document.getElementById('highscores-modal');
        var highscoresModalBg   = document.getElementById('highscores-modal-bg');

        highscoresModal.style.display = 'block';
        setTimeout(function() {
            highscoresModal.style.transform = 'scale(1,1)';
            highscoresModal.style.opacity = '1';
        }, 100);
        highscoresModalBg.style.display = 'block';
        content.style.transition        = 'filter 0.5s ease 0s';
        content.style.filter            = 'blur(2px) brightness(45%) grayscale(0.75)';
        highscoresModalBg.addEventListener('click', closeHighscoresModal, false);
    }
}

function closeHighscoresModal() {
    var content             = document.getElementById('main');
    var highscoresModal     = document.getElementById('highscores-modal');
    var highscoresModalBg   = document.getElementById('highscores-modal-bg');

    highscoresModal.style.transform = '';
    highscoresModal.style.opacity   = '';
    highscoresModalBg.style.display = '';
    content.style.transition        = 'filter 0.5s ease 0s';
    content.style.filter            = '';
    setTimeout(function() {
        highscoresModal.remove();
        highscoresModalBg.remove();
    }, 700);
}

function selectResultsTab(elm) {
    var resTabs = document.getElementsByClassName('tab-results');
    var len = resTabs.length;

    for(var i = 0; i < len; i++) {
        if (resTabs[i].id === elm) {
            resTabs[i].className += ' selected-tab-results';
            resTabs[i].style.background = '#dadada';

            if (elm === 'tab-results-my') { window.tab_results = 'my' }
            else { window.tab_results = 'total' }

            var tables = document.getElementsByClassName("tab-field-table");
            var fieldTabs = document.getElementsByClassName("tab-field");
            var j;
            for (j = 0; j < fieldTabs.length; j++) {
                fieldTabs[j].style.background = "";
            }
            for (j = 0; j < tables.length; j++) {
                tables[j].style.display = "none";
            }
        } else {
            resTabs[i].className = 'tab-results';
            resTabs[i].style.background = '';
        }
    }
}

function showFieldTab(selected, fieldTab) {
    var elm = document.getElementById(selected);
    var fieldTabs = document.getElementsByClassName("tab-field");
    var tables = document.getElementsByClassName("tab-field-table-" + tab_results);

    for (var i = 0; i < tables.length; i++) {
        tables[i].style.display = "none";
        //tables[i].style.borderBottom = "";
        tables[i].className = tables[i].className.replace(" active", "");
        fieldTabs[i].style.background = "";
    }

    fieldTab.style.background = "#c8ffbe";
    elm.style.display = "block";
    elm.classList += " active";
}

function showMyResults() {

    var ajaxGetFieldType = new XMLHttpRequest();
    ajaxGetFieldType.open('POST', '/fieldtype', false);
    ajaxGetFieldType.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajaxGetFieldType.send();

    if ( ajaxGetFieldType.status !== 200 ) {
        alert(ajaxGetFieldType.status + ': ' + ajaxGetFieldType.statusText);
    } else {
        var response    = JSON.parse(ajaxGetFieldType.response);
        var fieldtype   = response[0];
        var th_text     = response[1];
    }

    var tab_field_my = document.getElementById('results-my');
    tab_field_my.innerHTML = '';

    for (var k1 in fieldtype) {
        tab_field_my.innerHTML += '<div id="tab-field-my-' + k1 + '" class="tab-field-table tab-field-table-my">';
        var thisTab = document.getElementById('tab-field-my-' + k1);
        var content = '';
        if (typeof localStorage[k1] === 'undefined') {
            thisTab.innerHTML += th_text['no_results'];
        } else {
            content +=  '<table class= "highscores-table">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th>' + th_text["player_name"] + '</th>' +
                                    '<th>' + th_text["score"] + '</th>' +
                                    '<th>' + th_text["time"] + '</th>' +
                                    '<th>' + th_text["date"] + '</th>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody align="center">';

            var ls = JSON.parse(localStorage[k1]);
            ls.sort(function(a,b){return a.game_score - b.game_score});
            ls.reverse();
            for(var k2 in ls) {
            content +=          '<tr>' +
                                    '<td>' + ls[k2]["player_name"] + '</td>' +
                                    '<td>' + ls[k2]["game_score"] + '</td>' +
                                    '<td>' + ls[k2]["game_time"] + '</td>' +
                                    '<td>' + ls[k2]["game_date"] + '</td>' +
                                '</tr>';
            }
            content +=      '</tbody>' +
                        '</table>';
            thisTab.innerHTML = content;
        }
        tab_field_my.innerHTML += '</div>';
    }

}