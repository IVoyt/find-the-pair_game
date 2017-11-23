<div id="start-block">

  <div id="select-game" style="opacity: 1; transition: opacity 0.7s ease-out 0s;">
    <input id="enter-player-name"
           name="player_name"
           type="text"
           placeholder="<?=$text['enter_player_name']?>"
           value="<?=(isset($_SESSION['player_name'])) ? $_SESSION['player_name'] : ''?>" required />
    <div id="select-field">
      <?=$text['choose_field_size']?>
    </div>
    <input id="start-msg" data-msg='<?=$error_msg?>' />

    <br/>

    <?php
      foreach ($field_size as $key=>$size) {  ?>
        <div id="field<?=$key?>"
             class="select-field-size <?=(isset($_SESSION['field_size']) && $_SESSION['field_size'] == $size["id"]) ? "select-field-size-selected" : ""?>"
             data-fieldsize="<?=$size['id']?>"
             onclick="selectFieldSize(this.getAttribute('id'))">
          <?=$size['fieldsize'] . ' ' . $text['pairs']?>
        </div>
        <?php
      }
    ?>
    <br/>
    <div id="start-game" onclick="startGame()">
      <?=$text['start_game']?>
    </div>
  </div>

</div>