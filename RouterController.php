<?php

    namespace app;

    use app\controller\Controller;

    /**
     * Class RouterController
     */
    class RouterController {

        public $controllerPath = '';
        public $controllerAction = 'indexAction';
        public $controllerName = '';

        public function __construct () {

            if ($_SERVER['REQUEST_URI'] == '/') $_SERVER['REQUEST_URI'] = 'main';
            $preroute   = preg_replace('/\//','', $_SERVER['REQUEST_URI'], 1);
            $route      = preg_replace('/\?+.*/si','', $preroute, 1);

            $_SERVER['REQUEST_URI'] = preg_replace('/\?+.*/si','', $_SERVER['REQUEST_URI'], 1);
            if ($route[mb_strlen($route) - 1] == '/') $route = substr($route,0,-1);

            $tmp_path = explode('/', $route);

            if (count($tmp_path) > 0 && $tmp_path[0] != '') {
                foreach ($tmp_path as $k => $elm) {
                    if (is_dir(__DIR__ . '/controller/' .$this->controllerPath.$elm)) {
                        if (file_exists(__DIR__ . '/' .ucwords($tmp_path[$k+1]) . 'Controller.php')) {
                            $this->controllerPath .= $elm . '/';
                            continue;
                        }
                    }
                    if (file_exists(__DIR__ . '/controller/' . $this->controllerPath . ucwords($elm) . 'Controller.php')) {
                        $this->controllerPath .=    ucwords($elm) . 'Controller';
                        $this->controllerName =     ucwords($elm) . 'Controller';
                    }
                    else {
                        if (preg_match('/-/', $elm)) {
                            $uc = explode('-', $elm);
                            $elm = '';
                            foreach ($uc as $key => $value) {
                                if ($key == 0) $elm = $value;
                                else $elm .= ucfirst($value);
                            }
                        }
                        $this->controllerAction = $elm . 'Action';
                    }
                }
            }

            $controllerName = $this->controllerName;
            $actionName = $this->controllerAction;

//            Controller::debug([
//                'tmp_path' => $tmp_path,
//                'route' => $route,
//                'controller path' => $this->controllerPath,
//                'controller name' => $controllerName,
//                'controller action' => $this->controllerAction,
//                $_SERVER['REQUEST_URI']
//            ], 'print_r');


            switch ($route) {
                case (file_exists(DIR_CONTROLLER . '/' . $this->controllerPath.'.php')):
                    $controllerName = '\app\controller\\' . $controllerName;

                    Controller::isMethodExists($controllerName, $this->controllerAction);
                    $controller = new $controllerName($_SERVER['REQUEST_URI']);
                    $controller->$actionName();
                    break;

                default:
                    Controller::ThrowNotFound();
            }
        }

    }