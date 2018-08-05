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
<html>

    <head>
        <meta charset="utf-8" http-equiv="content-type" content="text/html">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="<?= DIR_CSS . '/' ?>style.css">
        <title><?=$msg['find_the_pair']?></title>
        <!-- flag icons used from https://www.iconfinder.com/iconsets/finalflags -->
    </head>

    <body>

    <div id="main" class="content">

        <div id="bg" <?=(isset($_SESSION['background'])) ? 'style="background: ' . $_SESSION['background'] . '"' : ''?>></div>

        <div id="header">
            <div id="game-bg" onclick="showBackgrounds()">
                <input id="game-bg-visible" data-bg="0" style="display: none">
                <div id="game-bg-text"> <?=$msg['choose_background']?> </div>
            </div>

            <div id="player-text"> <?=$msg['player_name']?>: </div>
            <div id="player-name"></div>

            <div class="game-info">
                <div id="game-time">
                    <div id="game-time-text"> <?=$msg['time']?>: </div>
                    <div id="game-time-num">
                        <div id="game-time-min">00</div>
                        <div id="game-time-separator">:</div>
                        <div id="game-time-sec">00</div>
                    </div>
                </div>

                <div id="game-moves">
                    <div id="game-moves-text"> <?=$msg['moves']?>: </div>
                    <div id="game-moves-num">0</div>
                </div>

                <div id="game-found">
                    <div id="game-found-text"> <?=$msg['found']?>: </div>
                    <div id="game-found-num">0 / 0</div>
                </div>

                <div id="game-score">
                    <div id="game-score-text"> <?=$msg['score']?>: </div>
                    <div id="game-score-num">0</div>
                </div>
            </div>

            <div id="backgrounds">
                <div id="arrow"></div>
                <div id="bg1" class="bg" onclick="setBackground(this)"></div>
                <div id="bg2" class="bg" onclick="setBackground(this)"></div>
                <div id="bg3" class="bg" onclick="setBackground(this)"></div>
                <div id="bg4" class="bg" onclick="setBackground(this)"></div>
                <div id="bg5" class="bg" onclick="setBackground(this)"></div>
                <div id="bg6" class="bg" onclick="setBackground(this)"></div>
                <input id="bg-data" data-bg="" style="display: none;" />
            </div>

        </div>

        <div id="content"> <?= $body_content; ?> </div>

        <div id="footer">
            <div id="highscores-trigger">
                <div id="highscores-trigger-text"><?= $msg['high_scores'] ?></div>
            </div>
            <div id="game-pause" data-pause="" data-btntext='<?= $json ?>' data-status="">
                <div id="game-pause-text"> <?= $msg['game_pause'] ?> </div>
            </div>

            <div class="lang">
                <?php foreach ($lang as $item) : ?>
                    <div id="lang-<?=$item['lang_code']?>"
                         class="flag<?=($_SESSION['lang'] == $item['lang_code']) ? " flag-selected" : ''?>"
                         onclick="selectLanguage(this.id)">
                        <img src="<?= DIR_WEB . '/' ?>img/<?=$item['lang_code']?>.png"
                             alt="<?= $item['lang_name']?>"
                             title="<?= $item['lang_name'] ?>"/>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <form style="visibility: hidden" action="/" method="POST" id="form-lang">
        <input type="hidden" id="form-lang-input" name="lang_id" value="<?=(isset($_SESSION['lang'])) ? $_SESSION['lang'] : ''?>"/>
    </form>
    <script src="<?= DIR_JS . '/' ?>local_storage.js"></script>
    <script src="<?= DIR_JS . '/' ?>config.js"></script>
    <script src="<?= DIR_JS . '/' ?>background.js"></script>
    <script src="<?= DIR_JS . '/' ?>game_info.js"></script>
    <script src="<?= DIR_JS . '/' ?>game_field.js"></script>
    <script src="<?= DIR_JS . '/' ?>game_select.js"></script>
    <script src="<?= DIR_JS . '/' ?>game.js"></script>
    <script src="<?= DIR_JS . '/' ?>tiles.js"></script>
    <script src="<?= DIR_JS . '/' ?>timer.js"></script>
    <script src="<?= DIR_JS . '/' ?>show_highscores.js"></script>
    </body>
</html>