<?php

  class C_Header extends Main {

    function __construct ($name) {
      parent::__construct($name);
      $this->index();
    }

    function index() {
      foreach ($this->query as $key=>$value) {
        $this->pages[] = $value;
      }

      $this->data['css_dir'] = self::DIR_CSS;
      $this->data['js_dir'] = self::DIR_JS;
      $this->render();
    }
  }