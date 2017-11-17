<?php

  class DB {
    const DB_HOST = 'dualvfil.mysql.tools';
    const DB_USER = 'dualvfil_pair2';
    const DB_PASS = '67r3yy7z';
    const DB_NAME = 'dualvfil_pair';

    protected $db;

    function __construct () {
      $this->db = mysqli_connect(
        self::DB_HOST,
        self::DB_USER,
        self::DB_PASS,
        self::DB_NAME
      );

      mysqli_query($this->db,"SET NAMES utf8");
    }
  }