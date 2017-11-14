<?php

  class DB {
    const DB_HOST = 'host';
    const DB_USER = 'user';
    const DB_PASS = 'pass';
    const DB_NAME = 'name';

    public $db;

    function __construct () {
      $this->db = mysqli_connect(self::DB_HOST,self::DB_USER,self::DB_PASS,self::DB_NAME);

      mysqli_query($this->db,"SET NAMES utf8");
    }
  }