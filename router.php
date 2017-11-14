<?php
  $route = $_SERVER['REQUEST_URI'];

  require_once 'config.php';
  require_once C_DIR.'controller.php';
  require_once C_DIR.'c_header.php';
  require_once C_DIR.'c_footer.php';
  require_once M_DIR.'db.php';

  $header = new C_Header('header');

  switch ($route) {
    case ($route == '/' || $route == '/index.php'):
      require_once C_DIR.'c_startpage.php';
      $obj = new C_Startpage('startpage');
      break;
    default:
      require_once C_DIR.'c_404.php';
      $obj = new C_404NotFound('404');
      break;
  }

  $footer = new C_Footer('footer');