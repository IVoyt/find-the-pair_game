<?php

  class C_Startpage extends Main {

    function __construct ($name) {
      parent::__construct($name);
      $this->index();
    }

    function index() {

      $text = $this->getMessages();

      $this->data['text']['find_the_pair']  = $text['find_the_pair'];
      $this->data['text']['start']          = $text['start'];

      $this->render();
    }

  }