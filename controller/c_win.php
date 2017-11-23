<?php

  class C_Win extends Main {

    private $player_id;
    private $field_id;
    private $score;

    function __construct ($player_id, $field_id, $score)
    {
      $this->player_id = $player_id;
      $this->field_id = $field_id;
      $this->score = $score;

      $this->index();
    }

    function index() {
      require_once self::DIR_MODEL . 'm_game.php';
      $q = new M_Game;
      $q->setPlayerScore($this->player_id, $this->field_id, $this->score);
    }

  }