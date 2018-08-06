<?php

    namespace app\controller;

    session_start();

    /**
     * Class Controller
     */
    class Controller
    {

        public $layout = 'main';
        public $action;
        public $route;
        protected $lang;
        protected $msg;
        protected $data = array();
        protected $view;

        function __construct ($route = null)
        {
            $this->route = $route;
            if (!isset($_SESSION['lang'])) {
                $this->lang = $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
                $_SESSION['lang'] = $this->lang;
            } else {
                $this->lang = $_SESSION['lang'];
            }
            $this->msg = require_once DIR_LANG . '/' . $this->lang . '/app.php';

        }

        static function isMethodExists($controller, $actionName)
        {
            try {
                if (!method_exists($controller, $actionName) || $controller == '') {
                    throw new \Exception('Unknown method...', 403);
                }
            } catch (\Exception $e) {
                echo 'code: ' . $e->getCode() . "\nmessage: " . $e->getMessage();
                die;
            }

        }

        static function isViewExists($view)
        {
            try {
                if (!file_exists($view)) {
                    throw new \Exception('View not found...', 404);
                }
            } catch (\Exception $e) {
                echo 'code: ' . $e->getCode() . "\nmessage: " . $e->getMessage();
                die;
            }
        }

        static function isModelExists($model)
        {
            try {
                if (!file_exists($model)) {
                    throw new \Exception('Model not found...', 400);
                }
            } catch (\Exception $e) {
                echo 'code: ' . $e->getCode() . "\nmessage: " . $e->getMessage();
                die;
            }
        }

        /**
         * If Model/View/Controller not found
         * Show 404
         */
        static function ThrowNotFound()
        {
            require_once __DIR__ . '/Controller404.php';
            $controller = new Controller404('404');
            $controller->indexAction();

            die();
        }

        /**
         * @param null $route
         */
        private function beforeRender($route = null)
        {
            if ($route != null) {
                $this->route = $route;
            }
            if ($this->route[mb_strlen($this->route) -1] == '/') {
                $this->route = substr($this->route, 0, -1);
            }
            $path = explode('/', $this->route);
            $this->view = '';

            if (count($path) == 1) {
                $this->view = $this->route . '/index.php';
            }
            else {
                $len = count($path);
                for ($i = 0; $i < $len; $i++) {
                    if ($len - $i == 1) {
                        if (file_exists(DIR_VIEW . '/' . $this->view . $path[$i].'.php')) {
                            $this->view .= $path[$i].'.php';
                        }
                        else {
                            $this->view .= $path[$i].'/index.php';
                        }
                    }
                    else {
                        $this->view .= $path[$i] . '/';
                    }
                }
            }

//            Controller::debug([
//                'route expected' => $this->route,
//                'path expected' => $path,
//                'view expected' => $this->view
//            ], 'print_r');

        }

        /**
         * @param null $template
         * @return string
         */
        protected function render($template = null)
        {
            $this->beforeRender($template);
            $this->data['msg'] = $this->msg;
            $this->data['lang'] = $this->lang;

            try {
                $this->isViewExists(DIR_VIEW . '/' . $this->view);
                extract($this->data);
                ob_start();
                require(DIR_VIEW . '/' . $this->view);
                $body_content = ob_get_clean();

                if ($this->layout != false) {
                    require_once DIR_VIEW . '/layouts/' . $this->layout . '.php';
                } else {
                    require_once DIR_VIEW . '/layouts/empty.php';
                }
            }
            catch (\Exception $e) {
//                echo 'Поймано исключение: ',  $e->getMessage(), "\n";
                $this->ThrowNotFound();
            }
            return $body_content;
        }

        /**
         * @param $what_to_dbg
         * @param $dbg_type
         */
        public static function debug($what_to_dbg, $dbg_type)
        {
            if ($dbg_type != 'print_r' && $dbg_type != 'var_dump') {
                echo 'Illegal debug type!!!';
            }
            else {
                echo '<pre>';
                    $dbg_type($what_to_dbg);
                echo '</pre>';
            }
        }

    }