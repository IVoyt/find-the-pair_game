<div id="highscores-modal-bg"></div>
<div id="highscores-modal">

  <div id="highscores-modal-header"> <?=$text['highscores']?>
    <img src="<?=V_DIR?>/img/close1.png"
         id="close-modal"
         onclick="closeHighscoresModal(document.getElementById('highscores-modal'));" />
  </div>

  <div id="highscores-modal-content">
    <div class="results-wrapper">
      <h2 id="tab-results-my"
          class="tab-results"
          onclick=" selectResultsTab(this.id);
                    showMyResults()">
        <?=$text['results_my']?>
      </h2>
      <h2 id="tab-results-total"
          class="tab-results"
          onclick="selectResultsTab(this.id)">
        <?=$text['results_total']?>
      </h2>
    </div>

    <div class="results-wrapper">
      <?php
        foreach ($field_type as $fieldtype => $fieldsize) : ?>
          <h3 class="tab-field"
              onclick="showFieldTab('tab-field-' + tab_results + '-<?=$fieldtype?>', this)">
            <?=$fieldtype . ' ' . $text['pairs']?>
          </h3>
          <?php
        endforeach;
      ?>
    </div>

    <div id="results-my"></div>
    <div id="results-total">

      <?php
        foreach ($field_type as $fieldtype => $fieldsize) { ?>

          <div id="tab-field-total-<?=$fieldtype?>" class="tab-field-table tab-field-table-total">

            <?php
              if (empty($fieldsize)) :
                echo $text['no_results'];
              else : ?>

                <table class="highscores-table">
                  <thead>
                  <tr>
                    <th><?=$text['player_name']?></th>
                    <th><?=$text['score']?></th>
                    <th><?=$text['time']?></th>
                    <th><?=$text['date']?></th>
                  </tr>
                  </thead>
                  <tbody align="center">
                  <?php
                    foreach ($fieldsize as $key => $item) : ?>
                      <tr>
                        <td><?=$item['player_name']?></td>
                        <td><?=$item['game_score']?></td>
                        <td><?=gmdate('i:s', $item['game_time'])?></td>
                        <td><?=$item['game_date']?></td>
                      </tr>
                    <?php endforeach; ?>
                  </tbody>
                </table>

            <?php
              endif;
            ?>
        </div>
      <?php
        }
      ?>
    </div>
  </div>

</div>