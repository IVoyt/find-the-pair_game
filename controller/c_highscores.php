<?php

  class C_Highscores extends Main {

    function __construct ($template_name)
    {
      parent::__construct($template_name);

      $this->index();
    }

    function index() {

      $text = $this->getMessages();

      require_once self::DIR_MODEL . 'Game.php';
      $q = new M_Game;
      $field_sizes = $q->getFieldSizes();

      foreach ($field_sizes as $field_id) {
        $field_type[$field_id['fieldsize']] = $q->getHighscoresByFieldType($field_id['id']);
      }
//      $query = $q->getHighscoresTotal();
      $this->data['field_sizes'] = $field_sizes;
      $this->data['field_type'] = $field_type;

      $this->data['text']['highscores'] = $text['highscores'];
      $this->data['text']['player_name'] = $text['player_name'];
      $this->data['text']['score'] = $text['score'];
      $this->data['text']['time'] = $text['time'];
      $this->data['text']['date'] = $text['date'];
      $this->data['text']['results_my'] = $text['results_my'];
      $this->data['text']['results_total'] = $text['results_total'];
      $this->data['text']['pairs'] = $text['pairs'];
      $this->data['text']['no_results'] = $text['no_results'];

//      foreach ($field_type as $k => $v) {
      $this->data['json_field_type'] = json_encode($field_type);

      $this->data['th_text'] = json_encode(
        ['player_name'  => $text['player_name'],
         'score'        => $text['score'],
         'time'         => $text['time'],
         'date'         => $text['date'],
         'no_results'   => $text['no_results']
        ]);

      $this->render();
    }

  }