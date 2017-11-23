<?php

  class M_Game extends DB {

    function getPlayerId($player) {
      $query = mysqli_query($this->db,
        "SELECT player_id
                FROM players
                WHERE player_name = '". $player ."'
                ORDER BY player_id
                DESC LIMIT 0,1");

      return mysqli_fetch_assoc($query);
    }

    function getLastPlayerId(){
      $query = mysqli_query($this->db,
        "SELECT player_id
                FROM players
                ORDER BY player_id
                DESC LIMIT 0,1");

      return $query;
    }

    function addPlayer($player_name) {

      if($stmt = $this->db->prepare("INSERT INTO players (player_name) VALUES (?)")) {
        $stmt->bind_param('s', $player_name);
        $stmt->execute();
        $stmt->close();
      } else {
        $error = $this->db->errno . ' ' . $this->db->error;
        echo $error;
      }

      return mysqli_fetch_assoc($this->getLastPlayerId());
    }

    function getFieldSizeById($field_id) {
      $query = mysqli_query($this->db, "SELECT id, fieldsize FROM field WHERE id = '". $field_id ."'");

      return mysqli_fetch_assoc($query);
    }

    function getFieldSizes() {
      $query = mysqli_query($this->db, "SELECT * FROM field ORDER BY id");

      while ($row = mysqli_fetch_assoc($query)) {
        $result[] = $row;
      }

      return $result;
    }

    function getHighscoresTotal() {
      $highscores = [];
      $query = mysqli_query($this->db,
        "SELECT p.player_name, g.fieldsize, g.score
                FROM game g
                JOIN field f ON f.id = g.field_id
                JOIN players p ON p.player_id = g.player_id
                ORDER BY g.score DESC LIMIT 10");

      while($row = mysqli_fetch_assoc($query)) {
        $highscores[] = $row;
      }

      return $highscores;
    }

    function getHighscoresByFieldType($field_id) {
      $highscores = [];
      $query = mysqli_query($this->db,
        "SELECT p.player_name, g.score
                FROM game g
                JOIN field f ON f.id = g.field_id
                JOIN players p ON p.player_id = g.player_id
                WHERE g.field_id = '". $field_id ."'
                ORDER BY g.score DESC LIMIT 10");

      while($row = mysqli_fetch_assoc($query)) {
        $highscores[] = $row;
      }

      return $highscores;
    }

    function setPlayerScore($player_id, $field_id, $score) {
      if($stmt = $this->db->prepare("INSERT INTO game (player_id, field_id, score) VALUES (?,?,?)")) {
        $stmt->bind_param('iii', $player_id, $field_id, $score);
        $stmt->execute();
        $stmt->close();
      } else {
        $error = $this->db->errno . ' ' . $this->db->error;
        echo $error;
      }
    }

  }