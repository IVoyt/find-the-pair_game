<?php
    use app\RouterController;

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL & ~E_NOTICE);
    error_reporting(E_ALL);

    require_once 'config.php';
    require_once 'autoload.php';

    new RouterController();