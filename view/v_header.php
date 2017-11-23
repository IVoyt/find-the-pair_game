<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" http-equiv="content-type" content="text/html">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="<?=$css_dir?>style.css">
  <title><?=$text['find_the_pair']?></title>
  <!-- flag icons used from https://www.iconfinder.com/iconsets/finalflags -->
</head>

<body <?=(isset($_SESSION['background'])) ? 'style="background: ' . $_SESSION['background'] . '"' : ''?>>



  <div class="content">

  <div id="header">
    <div id="game-bg" onclick="showBackgrounds()">
      <input id="game-bg-visible" data-bg="0" style="display: none">
      <div id="game-bg-text">
        <?=$text['choose_background']?>
      </div>
    </div>

    <div id="player-text">
      <?=$text['player_name']?>:
    </div>
    <div id="player-name"></div>

    <div class="game-info">
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

      <div id="game-moves">
        <div id="game-moves-text">
          <?=$text['moves']?>:
        </div>
        <div id="game-moves-num">0</div>
      </div>

      <div id="game-found">
        <div id="game-found-text">
          <?=$text['found']?>:
        </div>
        <div id="game-found-num">0 / 0</div>
      </div>

      <div id="game-score">
        <div id="game-score-text">
          <?=$text['score']?>:
        </div>
        <div id="game-score-num">
          0
        </div>
      </div>
    </div>

    <div id="backgrounds">
      <div id="arrow"></div>
      <div id="bg1" class="bg" onclick="setBackground(this)"></div>
      <div id="bg2" class="bg" onclick="setBackground(this)"></div>
      <div id="bg3" class="bg" onclick="setBackground(this)"></div>
      <div id="bg4" class="bg" onclick="setBackground(this)"></div>
      <div id="bg5" class="bg" onclick="setBackground(this)"></div>
      <div id="bg6" class="bg" onclick="setBackground(this)"></div>
      <input id="bg-data" data-bg="" style="display: none;" />
    </div>

  </div>

  <div id="content">