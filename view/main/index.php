<?php

    /**
     * @var $msg
     * @var $field_size
     */

?>

<div id="start-block">

    <div id="select-game" style="opacity: 1; transition: opacity 0.7s ease-out 0s;">
        <div id="error-msg"></div>
        <input id="enter-player-name"
               name="player_name"
               type="text"
               placeholder="<?= $msg['enter_player_name'] ?>"
               value="<?=(isset($_SESSION['player_name'])) ? $_SESSION['player_name'] : ''?>" required />
        <div id="select-field">
            <?= $msg['choose_field_size']?>
        </div>
        <input id="start-msg" />

        <br/>

        <?php foreach ($field_size as $key => $size) : ?>
            <div id="field<?=$key?>"
                 class="select-field-size <?= (isset($_SESSION['field_size']) && $_SESSION['field_size'] == $size["id"])
                     ? "select-field-size-selected"
                     : "" ?>"
                 data-fieldsize="<?=$size['id']?>"
                 onclick="selectFieldSize(this.getAttribute('id'))">
                <?= $size['fieldsize'] . ' ' . $msg['pairs'] ?>
            </div>
        <?php endforeach; ?>
        <br/>
        <div id="start-game" onclick="startGame()">
            <?= $msg['start_game'] ?>
        </div>
    </div>

</div>