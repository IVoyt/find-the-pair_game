<?php

  class C_404NotFound extends Controller {

    function __construct ($name) {
      parent::__construct($name);
      require_once 'model/m_errors.php';
      $q = new M_Errors;
      $this->query = $q->get404NotFound($this->lang);
//      echo $this->lang;

      $this->index();
    }

    function index() {
      while ($row = mysqli_fetch_assoc($this->query)) {
        $result = $row;
      }

      $this->data['not_found'] = $result[$this->lang];
      $this->render();
    }
  }