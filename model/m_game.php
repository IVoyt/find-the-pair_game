<?php

  class M_Game extends DB {

    function newGame($playerID, $field) {
      if($stmt = $this->db->prepare("INSERT INTO game (player_id, field_id) VALUES (?,?)")) {
        $stmt->bind_param("ii", $playerID, $field);
        $stmt->execute();
        $stmt->close();
      } else {
        $error = $this->db->errno . ' ' . $this->db->error;
        echo $error;
      }
    }

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
      $query = mysqli_query($this->db, "SELECT fieldsize FROM field WHERE id = '". $field_id ."'");

      return mysqli_fetch_assoc($query);
    }

    function getFieldSizes() {
      $query = mysqli_query($this->db, "SELECT * FROM field ORDER BY id");

      return $query;
    }

  }