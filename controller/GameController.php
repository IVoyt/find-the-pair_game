<?php

    namespace app\controller;

    use app\model\Game;

    class GameController extends Controller
    {

        public $layout = false;

        public function startAction()
        {
            if (empty($_POST['field_size'])) {
                $response =  "<div id='fieldsize_error'>". $this->msg['empty_field_size'] ."</div>";
                echo json_encode(['err' => 1, 'response' => $response, '_POST' => $_POST]);
                exit;
            } else {
                $fieldID = trim(strip_tags($_POST['field_size']));

                if ($_POST['field_size'] == 'undefined') {
                    echo json_encode(['err' => 2, 'response' => '"field_size" is undefined', '_POST' => $_POST]);
                    exit;
                }

                $_SESSION['field_size'] = $_POST['field_size'];

                $game       = new Game();
                $fieldsize  = $game->getFieldSizeById($fieldID);

                $shuffle1 = $this->randomGen(1, 12, $fieldsize['fieldsize']);
                $shuffle2 = $shuffle1;
                shuffle($shuffle2);
                $count = count($shuffle1);
                for ($i = 0; $i < $count; $i++) {
                    $numbers[] = $shuffle1[$i];
                    $numbers[] = $shuffle2[$i];
                }

                $this->data['field_size']   = $fieldsize['fieldsize'];
                $this->data['field_id']     = $fieldsize['id'];
                $this->data['numbers']      = $numbers;

                $this->render();
            }
        }

        private function randomGen($min, $max, $quantity) {
            $numbers = range($min, $max);
            shuffle($numbers);
            return array_slice($numbers, 0, $quantity);
        }

        public function winAction()
        {
            if (!empty($_POST['field_id']) && !empty($_POST['score']) && !empty($_POST['time'])) {
                $field_id   = $_POST['field_id'];
                $score      = $_POST['score'];
                $time       = $_POST['time'];

                $q = new Game;
                $q->setScore($field_id, $score, $time);
            } else {
                echo 'No data!';
            }
        }

        public function highscoresAction()
        {
            $q = new Game;
            $field_sizes = $q->getFieldSizes();

            foreach ($field_sizes as $field_id) {
                $field_types[$field_id['fieldsize']] = $q->getHighscoresByFieldType($field_id['id']);
            }

            $this->data['field_sizes'] = $field_sizes;
            $this->data['field_types'] = $field_types;
            $this->data['json_field_type'] = json_encode($field_types);

            $this->render();
        }

        public function myResultsAction()
        {
            $q = new Game;
            $field_sizes = $q->getFieldSizes();

            foreach ($field_sizes as $field_id) {
                $field_types[$field_id['fieldsize']] = '';
            }

            echo json_encode([$field_types]);
        }

    }