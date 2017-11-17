<?php

  class C_Selectgame extends Main {

    function __construct ($name) {
      parent::__construct($name);
      $this->index();
    }

    function index() {

      $text = $this->getMessages();

      require_once self::DIR_MODEL . 'm_game.php';
      $q = new M_Game;
      $query = $q->getFieldSizes();

      while ($row = mysqli_fetch_assoc($query)) {
        $result[] = $row;
      }

      $this->data['text']['enter_player_name']  = $text['enter_player_name'];
      $this->data['text']['choose_field_size']  = $text['choose_field_size'];
      $this->data['text']['start_game']         = $text['start_game'];
      $this->data['text']['pairs']              = $text['pairs'];

      $this->data['field_size'] = $result;

      $this->render();
    }

  }