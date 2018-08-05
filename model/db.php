<?php

    namespace app\model;

    class DB
    {

        const DB_HOST = 'localhost';
        const DB_USER = 'root';
        const DB_PASS = '123';
        const DB_NAME = 'find_the_pair';

        protected $db;

        function __construct ()
        {
            try {
                $pdo = new \PDO('mysql:dbname='.self::DB_NAME.';host='.self::DB_HOST, self::DB_USER, self::DB_PASS);
                $this->db = $pdo;
            } catch (\PDOException $e) {
                echo 'Подключение не удалось: ' . $e->getMessage();
            }
        }

        public function getDB()
        {
            return $this->db;
        }


        /**
         * @param $table string
         * @param $insert array
         *
         * @return bool|\PDOStatement
         */
        public function insert($table, $insert)
        {
            $i = 0;
            $insertArgs = '';
            $prepareValues = '';
            foreach ($insert as $name => $value) {
                if ($i > 0) {
                    $insertArgs .= ',';
                    $prepareValues .= ',';
                }
                $insertArgs .= $name;
                $prepareValues .= '?';
                $i++;
                if (gettype($value) == 'integer') {
                    $type = \PDO::PARAM_INT;
                } else if (gettype($value) == 'string') {
                    $type = \PDO::PARAM_STR;
                }
                $insertValues[] = ['val' => trim(strip_tags($value)), 'type' => $type];
            }
            $prepare = $this->db->prepare("INSERT INTO `". $table ."` (". $insertArgs .") VALUES (". $prepareValues . ")");

            return $prepare->execute();
        }


        /**
         * @param $table string
         * @param $set array
         * @param $where array
         *
         * @return bool
         */
        public function update($table, $set, $where)
        {
            $i = 0;
            $setArgs = '';
            foreach ($set as $name => $value) {
                if ($i > 0) {
                    $setArgs .= ', ';
                }
                $setArgs .= $name . ' = ?';
                $i++;
                if (gettype($value) == 'integer') {
                    $type = \PDO::PARAM_INT;
                } else if (gettype($value) == 'string') {
                    $type = \PDO::PARAM_STR;
                }
                $setValues[] = ['val' => $value, 'type' => $type];
            }

            $prepareValues = $this->prepareValues($where);
            $prepare = $this->db->prepare("UPDATE `". $table ."` SET ". $setArgs ." WHERE ". $prepareValues['fields']);

            return $this->execPrepared($prepare, $setValues);
        }


        public function delete($table, $delete)
        {
            $prepareValues = $this->prepareValues($delete);
            $prepare = $this->db->prepare("DELETE FROM `". $table ."` WHERE ". $prepareValues['fields']);

            return $this->execPrepared($prepare, $prepareValues['values']);
        }

        /**
         * @param $values array
         *
         * @return array
         */
        private function prepareValues($values)
        {
            $i = 0;
            $fields = '';
            foreach ($values as $name => $value) {
                if ($i > 0) {
                    $fields .= ' AND ';
                }
                $fields .= $name . ' = ' . $value;
                $i++;
                if (gettype($value) == 'integer') {
                    $type = \PDO::PARAM_INT;
                } else if (gettype($value) == 'string') {
                    $type = \PDO::PARAM_STR;
                }
                $return[] = ['val' => trim(strip_tags($value)), 'type' => $type];
            }

            return ['fields' => $fields, 'values' => $return];
        }

        /**
         * @param $pdo \PDOStatement
         * @param $prepared array
         *
         * @return mixed
         */
        private function execPrepared($pdo, $prepared)
        {
            $count = count($prepared);
            for ($i = 0; $i < $count; $i++) {
                $pdo->bindValue($i+1, $prepared[$i]['val'], $prepared[$i]['type']);
            }
            return $pdo->execute();
        }

    }