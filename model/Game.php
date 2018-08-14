<?php

    namespace app\model;

    class Game extends Db
    {

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
            $query = $this->db->query("SELECT g.game_score, g.game_time, g.game_date
                FROM game g
                JOIN `field` AS f ON f.id = g.field_id
                WHERE g.field_id = '". $field_id ."'
                ORDER BY g.game_score DESC");
                //ORDER BY g.game_score DESC LIMIT 10");

            return $query->fetchAll(\PDO::FETCH_ASSOC);
        }

        function setScore($field_id, $score, $time)
        {
            return $this->insert('game', [
                'field_id'      => (int) $field_id,
                'game_score'    => (int) $score,
                'game_time'     => (int) $time
            ]);
        }

    }