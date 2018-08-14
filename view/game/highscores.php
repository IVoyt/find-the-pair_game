<?php

    /**
     * @var $field_types
     * @var $msg
     */

?>

<div id="highscores-modal-bg"></div>
<div id="highscores-modal">

    <div id="highscores-modal-header"> <?=$msg['high_scores']?>
        <img src="<?=DIR_WEB?>/img/close1.png"
             id="close-modal"
             onclick="closeHighscoresModal(document.getElementById('highscores-modal'));" />
    </div>

    <div id="highscores-modal-content">
        <div class="results-wrapper">
            <h2 id="tab-results-my" class="tab-results" onclick=" selectResultsTab(this.id); showMyResults()">
                <?=$msg['results_my']?>
            </h2>
            <h2 id="tab-results-total" class="tab-results" onclick="selectResultsTab(this.id)">
                <?=$msg['results_total']?>
            </h2>
        </div>

        <div class="results-wrapper">
            <?php foreach ($field_types as $fieldtype => $fieldsize) : ?>
                <h3 class="tab-field"
                    onclick="showFieldTab('tab-field-' + tab_results + '-<?=$fieldtype?>', this)">
                    <?=$fieldtype . ' ' . $msg['pairs']?>
                </h3>
            <?php endforeach; ?>
        </div>

        <div id="results-my"></div>
        <div id="results-total">

            <?php foreach ($field_types as $fieldtype => $fieldsize) : ?>
                <div id="tab-field-total-<?=$fieldtype?>" class="tab-field-table tab-field-table-total">
                    <?php if (empty($fieldsize)) :
                        echo $msg['no_results'];
                    else : ?>

                        <table class="highscores-table">
                            <thead>
                                <tr>
                                    <th><?=$msg['score']?></th>
                                    <th><?=$msg['time']?></th>
                                    <th><?=$msg['date']?></th>
                                </tr>
                            </thead>
                            <tbody align="center">
                                <?php foreach ($fieldsize as $key => $item) : ?>
                                    <tr>
                                        <td><?=$item['game_score']?></td>
                                        <td><?=gmdate('i:s', $item['game_time'])?></td>
                                        <td><?=$item['game_date']?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>

                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

</div>