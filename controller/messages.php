<?php
  class Messages {

    private static $instance = null;
    private static $dbObj;
    private static $messages = array();

    /**
    * @return Singleton
    */
    public static function getInstance() {
      if (null === self::$instance) {
        self::$instance = new self();
      }
//      echo 'Singleton instance called<br/>';
      return self::$instance;
    }

    private function __clone() {}
    private function __construct() {

      require_once M_DIR.'m_messages.php';
      self::$dbObj = new M_Messages();

      if (!isset($_SESSION['lang_id'])) {
        $browser_lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2);
        $lang_id = self::$dbObj->getLanguages($browser_lang);
        if($lang_id < 1) {
          $lang_id['id'] = 1;
          $lang_id['lang'] = 'en';
        }
        $_SESSION['lang_id'] = $lang_id['id'];
        $_SESSION['lang'] = $lang_id['lang'];
      }
      else {
        $lang_id = self::$dbObj->getLanguageById($_SESSION['lang_id']);
        $_SESSION['lang'] = $lang_id['lang'];
      }

      self::$messages = self::$dbObj->getAllMessages($_SESSION['lang']);
//      echo 'Constructor of singleton called<br/>';
    }

    public function getMessages() {
//      print_r(self::$messages);
      return self::$messages;
    }
  }