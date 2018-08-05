<?php
    namespace app\controller;

    class Controller404 extends Controller
    {

        function __construct ($name)
        {
            parent::__construct($name);
            $this->indexAction();
        }

        function indexAction()
        {
            $this->render();
        }
    }