<?php

    namespace app\controller;

    use app\model\Game;

    class MainController extends Controller
    {

        public function indexAction()
        {
            if (isset($_POST['restart']) && $_POST['restart'] == 1) {
                $this->layout = false;
            }
            $q = new Game();
            $field_sizes = $q->getFieldSizes();
            $this->data['field_size'] = $field_sizes;

            $this->render();
        }

        public function setBackgroundAction()
        {
            if(isset($_POST['background'])) {
                $_SESSION['background'] = $_POST['background'];
            }
        }

        public function setLanguageAction()
        {
            if(isset($_POST['lang'])) {
                $_SESSION['lang'] = $_POST['lang'];
            }

            echo json_encode(['POST' => $_POST]);
        }

    }