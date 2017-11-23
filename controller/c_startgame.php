<?php

  class C_Startgame extends Main {

    function __construct ($template_name)
    {
      parent::__construct($template_name);
      $this->index();
    }

    function index() {

      $text = $this->getMessages();

      if ($_POST['player_name'] == '') {
        echo "<div id='playername_error'>$text[empty_playername]</div>";
      }
      if ($_POST['field_size'] == '') {
        echo "<div id='fieldsize_error'>$text[empty_fieldsize]</div>";
      }


      if (!empty($_POST['player_name']) && !empty($_POST['field_size'])) {

        require_once self::DIR_MODEL . 'm_game.php';

        $playerName = strip_tags($_POST['player_name']);
        $fieldID = strip_tags($_POST['field_size']);
        $_SESSION['player_name'] = $_POST['player_name'];
        $_SESSION['field_size']  = $_POST['field_size'];

        $game = new M_Game;
        $playerID = $game->getPlayerId($playerName);

        if ($playerID['player_id'] == '') {
          $playerID = $game->addPlayer($playerName);
        }

        $_SESSION['player_id'] = $playerID;

        $fieldsize = $game->getFieldSizeById($fieldID);

        $shuffle1 = range(1, $fieldsize['fieldsize']);
        $shuffle2 = range(1, $fieldsize['fieldsize']);
        shuffle($shuffle1);
        shuffle($shuffle2);
        $count = count($shuffle1);
        for ($i = 0; $i < $count; $i++) {
          $numbers[] = $shuffle1[$i];
          $numbers[] = $shuffle2[$i];
        }

        $this->data['field_size'] = $fieldsize['fieldsize'];
        $this->data['field_id']   = $fieldsize['id'];
        $this->data['player_id']  = $playerID['player_id'];
        $this->data['numbers']    = $numbers;

        $this->render();
      }
    }

  }