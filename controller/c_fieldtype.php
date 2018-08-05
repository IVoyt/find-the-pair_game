<?php

  class C_Fieldtype extends Main {

    function __construct ()
    {
      parent::__construct();
      $this->index();
    }

    function index() {
      $text = $this->getMessages();

      require_once self::DIR_MODEL . 'Game.php';
      $q = new M_Game;
      $field_sizes = $q->getFieldSizes();

      foreach ($field_sizes as $field_id) {
        $field_type[$field_id['fieldsize']] = '';
      }

      echo json_encode([$field_type,[
        'player_name'  => $text['player_name'],
        'score'        => $text['score'],
        'time'         => $text['time'],
        'date'         => $text['date'],
        'no_results'   => $text['no_results']
        ]
      ]);
    }

  }