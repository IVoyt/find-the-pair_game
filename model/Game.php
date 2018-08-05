<?php

    namespace app\model;

    class Game extends DB
    {

        function getPlayerId($player)
        {
            $query = $this->db->query(
                "SELECT player_id
                FROM players
                WHERE player_name = '". $player ."'
                ORDER BY player_id
                DESC LIMIT 0,1");

            return $query->fetch(\PDO::FETCH_ASSOC);
        }

        function getLastPlayerId()
        {
            $query = $this->db->query("SELECT player_id FROM players ORDER BY player_id DESC LIMIT 0,1");
            return $query->fetch(\PDO::FETCH_ASSOC);
        }

        function addPlayer($player_name)
        {
            $this->insert('players', $player_name);
            return $this->getLastPlayerId();
        }

        function getFieldSizeById($field_id)
        {
            $query = $this->db->query("SELECT id, fieldsize FROM field WHERE id = '". $field_id ."'");
            return $query->fetch(\PDO::FETCH_ASSOC);
        }

        function getFieldSizes()
        {
            $query = $this->db->query("SELECT * FROM `field` ORDER BY 'id'");
            return $query->fetchAll(\PDO::FETCH_ASSOC);
        }

        function getHighscoresByFieldType($field_id)
        {
            $highscores = [];
            $query = mysqli_query($this->db,
                "SELECT p.player_name, g.game_score, g.game_time, g.game_date
                FROM game g
                JOIN field f ON f.id = g.field_id
                JOIN players p ON p.player_id = g.player_id
                WHERE g.field_id = '". $field_id ."'
                ORDER BY g.game_score DESC");
                //ORDER BY g.game_score DESC LIMIT 10");

            while($row = mysqli_fetch_assoc($query)) {
                $highscores[] = $row;
            }

            return $highscores;
        }

        function setPlayerScore($player_id, $field_id, $score, $time)
        {
            if($stmt = $this->db->prepare("INSERT INTO game (`player_id`, `field_id`, `game_score`, `game_time`, `game_date`) 
                  VALUES (?,?,?,?,CURRENT_DATE())")
            ) {
                $stmt->bind_param('iiii', $player_id, $field_id, $score, $time);
                $stmt->execute();
                $stmt->close();
            } else {
                $error = $this->db->errno . ' ' . $this->db->error;
                echo $error;
            }
        }

    }