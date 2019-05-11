<?php

    /**
     * @var $field_size
     * @var $numbers
     * @var $field_id
     */

?>

<div id="field">

    <div id="fieldContainer">
        <div id="gameField">
            <?php for ($i = 0; $i < $field_size * 2; $i++) : ?>
                <div class="cards">
                    <div id='card-<?php echo $i+1 ?>' class="front card"><?php //echo $numbers[$i]?></div>
                    <div id='back-<?php echo $i+1 ?>'
                         class="back card card<?php echo $numbers[$i]?>"
                         style="background: url('<?php echo DIR_WEB ?>/img/tiles/<?php echo $numbers[$i] ?>.jpg') 50% 50% no-repeat"
                         data-tile="<?php echo $numbers[$i]?>"></div>
                </div>
            <?php endfor; ?>
        </div>

        <input id="field-size" type="hidden" value="<?php echo $field_size?>">
        <input id="field-size-id" type="hidden" value="<?php echo $field_id?>">
    </div>

</div>