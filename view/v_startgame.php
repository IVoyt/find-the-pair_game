<div id="field">

  <div id="fieldContainer">
    <?php
      for ($i = 0; $i < $field_size * 2; $i++) : ?>
        <div class="cards">
          <div id='card-<?=$i+1?>' class="front card"><?=$numbers[$i]?></div>
          <div id='back-<?=$i+1?>' class="back card card<?=$numbers[$i]?>" data-tile="<?=$numbers[$i]?>"></div>
        </div>
      <?php
      endfor;
    ?>

    <input id="player-id" type="hidden" value="<?=$player_id?>">
    <input id="field-size" type="hidden" value="<?=$field_size?>">
    <input id="field-size-id" type="hidden" value="<?=$field_id?>">
  </div>

</div>