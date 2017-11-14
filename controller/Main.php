<?php
  session_start();

  class Main {
    protected $data = array();
    protected $template = 'v_';
    protected $lang;
    const DIR_VIEW  = 'view/';
    const DIR_MODEL = 'model/';
    const DIR_CSS   = self::DIR_CSS . 'css/';
    const DIR_JS    = self::DIR_JS . 'js/';

    function __construct ($name) {

      $this->template .= $name;
      if (!preg_match('.php',$name)) {
        $this->template .= '.php';
      }

      if (!isset($_SESSION['lang'])) {
        $this->lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2);
        $_SESSION['lang'] = $this->lang;
      }
      else {
        $this->lang = $_SESSION['lang'];
      }

    }

    protected function render() {
      if (file_exists(self::DIR_VIEW . $this->template)) {
        extract($this->data);
        return require_once self::DIR_VIEW . $this->template;
      }
      else {
        trigger_error('Error: Could not load view' . self::DIR_VIEW . $this->template . '!');
        exit;
      }
    }
  }