<?php

    namespace app\controller;

    use app\model\Game;

    class GameController extends Controller
    {

        public function startAction()
        {
            if (empty($_POST['player_name']) || empty($_POST['field_size'])) {
                if (empty($_POST['player_name'])) {
                    $response = "<div id='playername_error'>". $this->msg['empty_player_name'] ."</div>";
                } else {
                    $response =  "<div id='fieldsize_error'>". $this->msg['empty_field_size'] ."</div>";
                }
                echo json_encode(['err' => 1, 'response' => $response, '_POST' => $_POST]);
                exit;
            }


            if (!empty($_POST['player_name']) && !empty($_POST['field_size'])) {

                $playerName = trim(strip_tags($_POST['player_name']));
                $fieldID = trim(strip_tags($_POST['field_size']));
                $_SESSION['player_name'] = $_POST['player_name'];
                $_SESSION['field_size'] = $_POST['field_size'];

                $game = new Game();
                $playerID = $game->getPlayerId($playerName);

                if ($playerID['player_id'] == '') {
                    $playerID = $game->addPlayer($playerName);
                }

                $_SESSION['player_id'] = $playerID;

                $fieldsize = $game->getFieldSizeById($fieldID);

                $shuffle1 = range(1, $fieldsize['fieldsize']);
                $shuffle2 = range(1, $fieldsize['fieldsize']);
                shuffle($shuffle1);
                shuffle($shuffle2);
                $count = count($shuffle1);
                for ($i = 0; $i < $count; $i++) {
                    $numbers[] = $shuffle1[$i];
                    $numbers[] = $shuffle2[$i];
                }

                $this->data['field_size']   = $fieldsize['fieldsize'];
                $this->data['field_id']     = $fieldsize['id'];
                $this->data['player_id']    = $playerID['player_id'];
                $this->data['numbers']      = $numbers;

                $this->render();
            }
        }

        function winAction()
        {
            if (!empty($_POST['player_id']) && !empty($_POST['field_id']) && !empty($_POST['score']) && !empty($_POST['time'])) {
                $player_id  = $_POST['player_id'];
                $field_id   = $_POST['field_id'];
                $score      = $_POST['score'];
                $time       = $_POST['time'];

                $q = new Game;
                $q->setPlayerScore($player_id, $field_id, $score, $time);
            } else {
                echo 'No data!';
            }

        }

    }