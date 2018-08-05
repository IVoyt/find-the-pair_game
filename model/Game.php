<?php

    namespace app\model;

    class Game extends DB
    {

        function getPlayerById($player_id)
        {
            $query = $this->db->query("SELECT * FROM `players` WHERE `player_id` = '". $player_id ."'");
            return $query->fetch(\PDO::FETCH_ASSOC);
        }

        function getPlayerIdByName($player)
        {
            $query = $this->db->query(
                "SELECT player_id
                FROM `players`
                WHERE `player_name` = '". $player ."'
                ORDER BY `player_id`
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
            $this->insert('players', ['player_name' => $player_name]);
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
            return $this->insert('game', [
                'player_id'     => (int) $player_id,
                'field_id'      => (int) $field_id,
                'game_score'    => (int) $score,
                'game_time'     => (int) $time
            ]);
        }

    }