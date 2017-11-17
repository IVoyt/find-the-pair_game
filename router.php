<?php

  $route = $_SERVER['REQUEST_URI'];

  if (isset($_POST['lang_id'])) {
    $_SESSION['lang_id'] = $_POST['lang_id'];
  }

  switch ($route) {
    case ($route == '/' || $route == '/index.php'):
      $header = new C_Header('header');
      require_once C_DIR . 'c_startpage.php';
      $obj = new C_Startpage('startpage');
      $footer = new C_Footer('footer');
      break;
    case $route == '/selectgame':
      require_once C_DIR . 'c_selectgame.php';
      $obj = new C_Selectgame('selectgame');
      break;
    case $route == '/startgame':
      require_once C_DIR . 'c_startgame.php';
      $obj = new C_Startgame('startgame');
      break;
    default:
      require_once C_DIR . 'c_404.php';
      $obj = new C_404NotFound('404');
      break;
  }