<?php

  class C_Startpage extends Main {

    function __construct ($template_name) {
      parent::__construct($template_name);
      $this->index();
    }

    function index() {

      $text = $this->getMessages();

      require_once self::DIR_MODEL . 'm_game.php';
      $q = new M_Game;
      $field_sizes = $q->getFieldSizes();

      $this->data['text']['enter_player_name']  = $text['enter_player_name'];
      $this->data['text']['choose_field_size']  = $text['choose_field_size'];
      $this->data['text']['start_game']         = $text['start_game'];
      $this->data['text']['pairs']              = $text['pairs'];

      $this->data['field_size'] = $field_sizes;

      $this->data['error_msg'] = json_encode(['enter_player_name' => $text['enter_player_name'],
                                         'choose_field_size' => $text['choose_field_size']]);

      $this->render();
    }

  }