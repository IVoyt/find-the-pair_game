window.Highscores = function() {

    this.container          = '';
    this.modal              = '';
    this.modalBg            = '';
    this.closeModalTrigger  = '';
    this.content            = '';
    this.tabResults         = '';
    var self                = this;

    this.init = function() {
        self.content            = document.querySelector('#main');
        self.modal              = document.querySelector('#highscores-modal');
        self.modalBg            = document.querySelector('#highscores-modal-bg');
        self.closeModalTrigger  = document.querySelector('#close-modal');
        self.tabResults         = document.querySelectorAll('.tab-results')
    };

    this.showModal = function() {
        console.log('showModal triggered');
        var ajaxGetHighscores = new XMLHttpRequest();
        ajaxGetHighscores.timeout = 3000;
        ajaxGetHighscores.onreadystatechange = function () {
            if (ajaxGetHighscores.readyState === 4) {
                if ( ajaxGetHighscores.status !== 200 ) {
                    alert(ajaxGetHighscores.status + ': ' + ajaxGetHighscores.statusText);
                    console.log(ajaxGetHighscores);
                } else {
                    self.container = document.createElement('div');
                    self.container.innerHTML += ajaxGetHighscores.response;
                    document.body.appendChild(self.container);

                    self.init();

                    self.modal.style.display   = 'block';
                    self.modalBg.style.display = 'block';
                    self.modalBg.addEventListener('click', self.closeModal, false);
                    self.closeModalTrigger.addEventListener('click', self.closeModal, false);
                    setTimeout(function() {
                        self.content.style.filter  = 'blur(2px) brightness(45%) grayscale(1)';
                        self.modal.style.filter    = 'blur(0px)';
                        self.modal.style.transform = 'scale(1,1)';
                        self.modal.style.opacity   = '1';
                    }, 100);
                }
            }
        };
        ajaxGetHighscores.ontimeout = function () {
            alert('Waiting time expired. Please try again later...');
        };
        ajaxGetHighscores.open('POST','/game/highscores', true);
        ajaxGetHighscores.send();
    };

    this.closeModal = function() {
        self.modal.style.transform  = '';
        self.modal.style.filter     = 'blur(2px)';
        self.modal.style.opacity    = '';
        self.modalBg.style.display  = '';
        self.content.style.filter   = '';
        setTimeout(function() {
            self.modal.remove();
            self.modalBg.remove();
        }, 700);
    };

    this.selectResultsTab = function(elm) {
        var len = self.tabResults.length;

        for(var i = 0; i < len; i++) {
            if (self.tabResults[i].id === elm) {
                self.tabResults[i].className += ' selected-tab-results';
                self.tabResults[i].style.background = '#dadada';

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
                self.tabResults[i].className = 'tab-results';
                self.tabResults[i].style.background = '';
            }
        }
    };

};

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

    ajaxGetFieldType.timeout = 3000;
    ajaxGetFieldType.onreadystatechange = function () {
        if (ajaxGetFieldType.readyState === 4) {
            if ( ajaxGetFieldType.status !== 200 ) {
                alert(ajaxGetFieldType.status + ': ' + ajaxGetFieldType.statusText);
            } else {
                var response    = JSON.parse(ajaxGetFieldType.response);
                var fieldtype   = response[0];
                var th_text     = response[1];
            }
        }
    };
    ajaxGetFieldType.timeout = function () {
        alert('Waiting time expired. Please try again later...');
    };

    ajaxGetFieldType.open('POST', '/game/my-results', true);
    ajaxGetFieldType.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajaxGetFieldType.send();



    var tab_field_my = document.getElementById('results-my');
    tab_field_my.innerHTML = '';

    for (var k1 in fieldtype) {
        tab_field_my.innerHTML += '<div id="tab-field-my-' + k1 + '" class="tab-field-table tab-field-table-my">';
        var thisTab = document.getElementById('tab-field-my-' + k1);
        var content = '';
        if (typeof localStorage[k1] === 'undefined') {
            thisTab.innerHTML += th_text['no_results'];
        } else {
            content +=
                '<table class= "highscores-table">' +
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