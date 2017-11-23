<?php

  class C_Footer extends Main {

    function __construct ($template_name, $restart) {
      if ($restart == 0) {
        parent::__construct($template_name);
        $this->index();
      }
    }

    function index() {

      $text = $this->getMessages();

      $this->data['text']['game_pause'] = $text['game_pause'];
      $this->data['text']['highscores'] = $text['highscores'];
      $this->data['json'] = json_encode(['pause' => $text['game_pause'],
                                         'continue' => $text['game_continue'],
                                         'restart' => $text['game_restart']]);

      $this->data['js_dir'] = self::DIR_JS;
      $this->render();
    }
  }