<div id="highscores-modal-bg"></div>

<div id="highscores-modal">

  <div id="highscores-modal-header"> <?=$text['highscores']?>
    <img src="<?=V_DIR?>/img/close.png"
         id="close-modal"
         onclick="closeModal(document.getElementById('highscores-modal'));" />
  </div>

  <div id="highscores-modal-content">
<!--    <pre>-->
      <?php var_dump($field_type); ?>
    <table>
      <thead>
      <tr>
        <th><?=$text['player_name']?></th>
        <th><?=$text['score']?></th>
      </tr>
      </thead>
      <tbody>
        <?php
          foreach ($field_type[0] as $key => $item) : ?>
          <tr>
            <td><?=$item['player_name']?></td>
            <td><?=$item['score']?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
<!--    </pre>-->
  </div>

</div>