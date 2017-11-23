<?php

  class C_Header extends Main {


    function __construct ($template_name, $restart) {
      if ($restart == 0) {
        parent::__construct($template_name);
        $this->index();
      }
    }

    function index() {

      $text = $this->getMessages();

      $this->data['css_dir'] = self::DIR_CSS;
      $this->data['js_dir'] = self::DIR_JS;

      $this->data['text']['player_name']        = $text['player_name'];
      $this->data['text']['score']              = $text['score'];
      $this->data['text']['find_the_pair']      = $text['find_the_pair'];
      $this->data['text']['choose_background']  = $text['choose_background'];
      $this->data['text']['game_time']          = $text['game_time'];
      $this->data['text']['found']              = $text['found'];
      $this->data['text']['moves']              = $text['moves'];

      $this->render();
    }
  }