<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" http-equiv="content-type" content="text/html">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="<?=$css_dir?>style.css">
  <title><?=$text['find_the_pair']?></title>
  <!-- flag icons used from https://www.iconfinder.com/iconsets/finalflags -->
</head>

<body>
  <div id="header">
    <div id="menu">
      <div id="menu-img">
        <img src="<?=V_DIR?>img/list-menu.png" />
      </div>
      <div id="menu-text">
        <?=$text['choose_background']?>
      </div>
    </div>

    <div id="header-separator"></div>

    <div id="player-text">
      <?=$text['player_name']?>:
    </div>
    <div id="player-name">qwe</div>

    <div id="game-time">
      <div id="game-time-text">
        <?=$text['game_time']?>:
      </div>
      <div id="game-time-num">
        <div id="game-time-min">00</div>
        <div id="game-time-separator">:</div>
        <div id="game-time-sec">00</div>
      </div>
    </div>

    <div id="score">
      <?=$text['score']?>:
    </div>
    <div id="score-count">
      0
    </div>
  </div>
  <div id="content">