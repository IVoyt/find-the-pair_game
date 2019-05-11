<?php

    /**
     * @var $msg
     * @var $field_size
     */

?>
<div id="start-block-container">
    <div id="start-block">

        <div id="select-game" style="opacity: 1; transition: opacity 0.7s ease-out 0s;">
            <div id="select-field">
                <?= $msg['choose_field_size']?>
            </div>
            <input id="start-msg" />

            <br/>

            <?php foreach ($field_size as $key => $size) : ?>
                <div id="field<?php echo $key?>"
                     class="field-size-item <?php echo (isset($_SESSION['field_size']) && $_SESSION['field_size'] == $size["id"])
                         ? "field-size-selected"
                         : "" ?>"
                     data-fieldsize="<?php echo $size['id']?>"
                     data-tilesCount="<?php echo $size['fieldsize']?>">
                    <?php echo $size['fieldsize'] . ' ' . $msg['pairs'] ?>
                </div>
            <?php endforeach; ?>
            <br/>
            <div id="start-game">
                <?php echo $msg['start_game'] ?>
            </div>
            <div id="error-msg"></div>
        </div>

    </div>
</div>