<?php

  class C_Header extends Controller {
    public $pages;

    function __construct ($name) {
      parent::__construct($name);
      require_once 'model/m_header.php';
      $q = new M_Pages;
      $this->query = $q->getPagesList($this->lang);

      $this->index();
    }

    function index() {
      foreach ($this->query as $key=>$value) {
        $this->pages[] = $value;
      }

      $this->data['css_dir'] = self::DIR_CSS;
      $this->data['js_dir'] = self::DIR_JS;
      $this->data['pages'] = $this->pages;
      $this->render();
    }
  }