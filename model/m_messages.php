<?php

  class M_Messages extends DB {

    function getLanguageById($lang_id) {
      $query = mysqli_query(
        $this->db,
        "SELECT
                  id,
                  lang
                FROM languages
                WHERE id = '" . $lang_id . "'");

      while($row = mysqli_fetch_assoc($query)) {
        $lang['lang'] = $row['lang'];
      }

      return $lang;
    }

    function getLanguageByName($lang) {
      $query = mysqli_query(
        $this->db,
        "SELECT
                  id,
                  lang
                FROM languages
                WHERE lang = '" . $lang . "'");

      while($row = mysqli_fetch_assoc($query)) {
        $lang_id['id'] = $row['id'];
        $lang_id['lang'] = $row['lang'];
      }

      return $lang_id;
    }

    function getAllMessages($lang) {
      $query = mysqli_query(
        $this->db,
        "SELECT
                  id,
                  $lang,
                  text
                FROM messages");

      while($row = mysqli_fetch_assoc($query)) {
          $messages[$row['text']] = $row[$lang];
      }

      return $messages;
    }

  }
