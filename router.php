<?php

  $route = $_SERVER['REQUEST_URI'];

  if (isset($_POST['lang_id'])) {
    $_SESSION['lang_id'] = $_POST['lang_id'];
  }

  switch ($route) {
    case ($route == '/' || $route == '/index.php'):
      isset($_POST['restart']) ? $restart = 1 : $restart = 0;
      new C_Header('header', $restart);
      require_once C_DIR . 'c_startpage.php';
      new C_Startpage('startpage');
      new C_Footer('footer', $restart);
      break;

    case $route == '/startgame':
      require_once C_DIR . 'c_startgame.php';
      new C_Startgame('startgame');
      break;

    case $route == '/background':
      if (isset($_POST['background'])) {
        $bg = $_POST['background'];
      }
      else $bg = '';
      require_once C_DIR . 'background.php';
      new Background($bg);
      break;

    case $route == '/win':
      print_r($_POST);
      if (isset($_POST['score'])) {
        $player_id = $_POST['player_id'];
        $field_id = $_POST['field_id'];
        $score = $_POST['score'];
      }
      else {
        $player_id = '';
        $field_id = '';
        $score = '';
      }
      require_once C_DIR . 'c_win.php';
      new C_Win($player_id, $field_id, $score);
      break;

    case $route == '/highscores':
      require_once C_DIR . 'c_highscores.php';
      new C_Highscores('highscores');
      break;

    default:
      require_once C_DIR . 'c_404.php';
      new C_404NotFound('404');
      break;
  }