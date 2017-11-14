<?php

  class M_Errors extends DB {

    function get404NotFound($lang) {
      $query = mysqli_query(
        $this->db,
        "SELECT
                  id,
                  $lang,
                  error_code 'code'
                FROM errors
                WHERE error_code = 404");

      return $query;
    }

  }
