<div id="field">

  <?php $j = 1; ?>
<!--  <div id="row--><?//=$j?><!--">-->
  <div id="fieldContainer">
    <?php
      for ($i = 0; $i < $field_size * 2; $i++) :
  //      if ($i > 0 && $i % 4 == 0) : ?>
  <!--        </div>-->
  <!--        <div id="row--><?//=++$j?><!--">-->
  <!--      --><?php //endif; ?>
        <div class="cards">
          <div id='card-<?=$i+1?>' class="front card"></div>
          <div class="back card card<?=$numbers[$i]?>" data-tile="<?=$numbers[$i]?>"></div>
        </div>
      <?php
      endfor;
    ?>
  <!--  </div>-->

    <input id="player_id" type="hidden" value="<?=$player_id?>">
    <input id="field_size" type="hidden" value="<?=$field_size?>">
  </div>

</div>