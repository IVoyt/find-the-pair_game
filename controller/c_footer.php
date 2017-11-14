<?php

  class C_Footer extends Main {

    function __construct ($name) {
      parent::__construct($name);
      $this->index();
    }

    function index() {
      $this->data['js_dir'] = self::DIR_JS;
      $this->render();
    }
  }