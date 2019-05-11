<?php

    /**
     * @var $msg
     * @var $body_content
     * @var $lang
     */

    $lang = [
        ['lang_code' => 'en', 'lang_name' => 'English'],
        ['lang_code' => 'ru', 'lang_name' => 'Русский'],
        ['lang_code' => 'uk', 'lang_name' => 'Україньска'],
    ];

    $json = json_encode([
        'pause'     => $msg['game_pause'],
        'continue'  => $msg['game_continue'],
        'restart'   => $msg['game_restart']
    ]);

?>

<!DOCTYPE html>
<html lang="<?php echo (isset($_SESSION['lang'])) ? $_SESSION['lang'] : 'en' ?>">

    <head>
        <meta charset="utf-8" http-equiv="content-type" content="text/html">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="<?php echo DIR_CSS . '/' ?>style.css">
        <title><?php echo$msg['find_the_pair']?></title>
        <!-- flag icons used from https://www.iconfinder.com/iconsets/finalflags -->
    </head>

    <body>

    <div id="main" class="content">

        <div id="background" <?php echo (isset($_SESSION['background']))
            ? 'style="background: ' . $_SESSION['background'] . '"'
            : ''?>>
        </div>

        <div id="header">
            <div id="background-trigger">
                <div id="background-trigger-text"> <?php echo $msg['choose_background']?> </div>
            </div>

            <div id="game-summary">

                <div class="game-info">
                    <div id="game-time">
                        <div id="game-time-text"> <?php echo $msg['time']?>: </div>
                        <div id="game-time-num">
                            <div id="game-time-min">00</div>
                            <div id="game-time-separator">:</div>
                            <div id="game-time-sec">00</div>
                        </div>
                    </div>

                    <div id="game-moves">
                        <div id="game-moves-text"> <?php echo $msg['moves']?>: </div>
                        <div id="game-moves-num">0</div>
                    </div>

                    <div id="game-found">
                        <div id="game-found-text"> <?php echo $msg['found']?>: </div>
                        <div id="game-found-num">0 / 0</div>
                    </div>

                    <div id="game-score">
                        <div id="game-score-text"> <?php echo $msg['score']?>: </div>
                        <div id="game-score-num">0</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="backgrounds-list">
            <div id="arrow"></div>
            <div id="bg1" class="bg-list"></div>
            <div id="bg2" class="bg-list"></div>
            <div id="bg3" class="bg-list"></div>
            <div id="bg4" class="bg-list"></div>
            <div id="bg5" class="bg-list"></div>
            <div id="bg6" class="bg-list"></div>
            <div id="backgrounds-list-data" data-bg="" style="display: none;"></div>
        </div>

        <div id="content"> <?php echo $body_content; ?> </div>

        <div id="footer">
            <div id="highscores-trigger">
                <div id="highscores-trigger-text"><?php echo $msg['high_scores'] ?></div>
            </div>
            <div id="game-pause" data-pause="" data-btntext='<?php echo $json ?>' data-status="">
                <div id="game-pause-text"> <?php echo $msg['game_pause'] ?> </div>
            </div>

            <div class="lang">
                <?php foreach ($lang as $item) : ?>
                    <div id="lang-<?php echo $item['lang_code']?>"
                         class="flag<?php echo ($_SESSION['lang'] == $item['lang_code']) ? " flag-selected" : ''?>">
                        <img src="<?php echo DIR_WEB ?>/img/<?php echo $item['lang_code']?>.png"
                             alt="<?php echo $item['lang_name']?>"
                             title="<?php echo $item['lang_name'] ?>"/>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <div id="wip">
            <span>Work In Progress</span>
        </div>
    </div>

    <form style="visibility: hidden" action="/" method="POST" id="form-lang">
        <input type="hidden" id="form-lang-input" name="lang_id" value="<?php echo(isset($_SESSION['lang'])) ? $_SESSION['lang'] : ''?>"/>
    </form>
    <script src="<?php echo DIR_JS . '/' ?>nodes.js"></script>
    <script src="<?php echo DIR_JS . '/' ?>stats.js"></script>
    <script src="<?php echo DIR_JS . '/' ?>timer.js"></script>
    <script src="<?php echo DIR_JS . '/' ?>local_storage.js"></script>
    <script src="<?php echo DIR_JS . '/' ?>highscores.js"></script>
    <script src="<?php echo DIR_JS . '/' ?>tiles.js"></script>
    <script src="<?php echo DIR_JS . '/' ?>background.js"></script>
    <script src="<?php echo DIR_JS . '/' ?>game.js"></script>
    <script src="<?php echo DIR_JS . '/' ?>field.js"></script>
    <script src="<?php echo DIR_JS . '/' ?>app.js"></script>
    </body>
</html>