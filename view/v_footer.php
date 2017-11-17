    </div>
    <div id="footer">
      <div class="lang">
        <div id="lang-1"
             class="flag <?=($_SESSION['lang_id'] == '1') ? "flag-selected" : ''?>"
             onclick="selectLanguage(this.id)">
          <img src="<?=V_DIR?>img/en.png" />
        </div>
        <div id="lang-2"
             class="flag <?=($_SESSION['lang_id'] == '2') ? "flag-selected" : ''?>"
             onclick="selectLanguage(this.id)">
          <img src="<?=V_DIR?>img/ru.png" />
        </div>
      </div>
    </div>

    <form style="display: hidden" action="/" method="POST" id="form-lang">
      <input type="hidden" id="form-lang-input" name="lang_id" value="<?=(isset($_SESSION['lang_id'])) ? $_SESSION['lang_id'] : ''?>"/>
    </form>
    <script src="<?=$js_dir?>custom.js"></script>
    <script src="<?=$js_dir?>select_game.js"></script>
    <script src="<?=$js_dir?>select_field_size.js"></script>
    <script src="<?=$js_dir?>start_game.js"></script>
    <script src="<?=$js_dir?>calculate_field_size.js"></script>
    <script src="<?=$js_dir?>select_language.js"></script>
    <script src="<?=$js_dir?>tile_click.js"></script>
    <script src="<?=$js_dir?>tile_flip.js"></script>
  </body>
</html>