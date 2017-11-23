<?php
  session_start();

  class Main {
    protected $data = array();
    protected $template = 'v_';
    protected $messages;
    const DIR_VIEW  = 'view/';
    const DIR_MODEL = 'model/';
    const DIR_LANG = 'lang/';
    const DIR_CSS   = self::DIR_VIEW . 'css/';
    const DIR_JS    = self::DIR_VIEW . 'js/';

    function __construct ($template_name) {

      $this->template .= $template_name;
      if (!preg_match('[.php]',$template_name)) {
        $this->template .= '.php';
      }

      require_once 'messages.php';
    }

    protected function getMessages() {
      return $this->messages = Messages::getInstance()->getMessages();
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