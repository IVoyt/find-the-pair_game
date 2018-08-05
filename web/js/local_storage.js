function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function saveToLocalStorage () {
  if (supports_html5_storage() !== false) {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();

    var field_size = fieldSize.getAttribute('value');
    var playerName = document.getElementById('player-name').innerHTML;

    var lsLen;
    if (typeof localStorage[field_size] === 'undefined') {
      lsLen = 0;
    }
    else {
      var record = JSON.parse(localStorage[field_size]);
      lsLen = record.length;
    }

    time = function () {
      var m = totalTime / 60;
      var s = totalTime;
      if (m > 1) {
        m = parseInt(m);
        s = totalTime - (m * 60);
        if (m < 10) {
          m = '0' + m;
        }
      }
      else {
        m = '00'
      }
      if (s < 10) {
        s = '0' + s;
      }
      return m + ':' + s;
    };

    record[lsLen] = {
       player_name: playerName,
       game_score:  score,
       game_time:   time(),
       game_date:   curr_year + '-' + curr_month + '-' + curr_date
     };
    localStorage.setItem(fieldSize, JSON.stringify(record));
  }
}