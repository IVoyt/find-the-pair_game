<?php

  class C_Highscores extends Main {

    function __construct ($template_name)
    {
      parent::__construct($template_name);

      $this->index();
    }

    function index() {

      $text = $this->getMessages();

      require_once self::DIR_MODEL . 'm_game.php';
      $q = new M_Game;
      $field_sizes = $q->getFieldSizes();

      foreach ($field_sizes as $field_id) {
        $field_type[] = $q->getHighscoresByFieldType($field_id['id']);
      }
//      $query = $q->getHighscoresTotal();
      $this->data['field_sizes'] = $field_sizes;
      $this->data['field_type'] = $field_type;

      $this->data['text']['highscores'] = $text['highscores'];
      $this->data['text']['player_name'] = $text['player_name'];
      $this->data['text']['score'] = $text['score'];

      $this->render();
    }

  }