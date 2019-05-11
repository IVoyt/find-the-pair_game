<?php

  function siteURL()
  {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https:/" : "http:/";
    $domainName = $_SERVER['REQUEST_URI'];
    return $protocol.$domainName;
  }

  $route = siteURL();

  if (isset($_POST['lang_id'])) {
    $_SESSION['lang_id'] = $_POST['lang_id'];
  }

  switch ($route) {
    case (parse_url($route, PHP_URL_HOST) == '' || parse_url($route, PHP_URL_HOST) == 'index.php'):
      isset($_POST['restart']) ? $restart = 1 : $restart = 0;
      new C_Header('header', $restart);
      require_once C_DIR . 'c_startpage.php';
      new C_Startpage('startpage');
      new C_Footer('footer', $restart);
      break;

    case parse_url($route, PHP_URL_HOST) == 'startgame':
      require_once C_DIR . 'c_startgame.php';
      new C_Startgame('startgame');
      break;

    case parse_url($route, PHP_URL_HOST) == 'background':
      if (isset($_POST['background'])) {
        $bg = $_POST['background'];
      }
      else $bg = '';
      require_once C_DIR . 'c_background.php';
      new Background($bg);
      break;

    case parse_url($route, PHP_URL_HOST) == 'win' : //$route == '/win':
      if (isset($_REQUEST['score'])) {
        $player_id = $_REQUEST['player_id'];
        $field_id = $_REQUEST['field_id'];
        $score = $_REQUEST['score'];
        $time = $_REQUEST['time'];
      }
      else {
        $player_id = '';
        $field_id = '';
        $score = '';
        $time = '';
      }
      require_once C_DIR . 'c_win.php';
      new C_Win($player_id, $field_id, $score, $time);
      break;

    case parse_url($route, PHP_URL_HOST) == 'highscores':
      require_once C_DIR . 'c_highscores.php';
      new C_Highscores('highscores');
      break;

    case parse_url($route, PHP_URL_HOST) == 'fieldtype':
      require_once C_DIR . 'c_fieldtype.php';
      new C_Fieldtype();
      break;

    default:
      require_once C_DIR . 'Controller404.php';
      new C_404NotFound('404');
      break;
  }