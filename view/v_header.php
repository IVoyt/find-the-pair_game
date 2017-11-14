<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" http-equiv="content-type" content="text/html">
  <link rel="stylesheet" type="text/css" href="<?=$css_dir?>style.css">

</head>
<body>
<header>
  <div id="navbarHeader">
    <nav>
      <div id="navbarPages">
        <?php
          foreach ($pages as $k=>$v) {
            echo "<a href='" . $pages[$k]['page_route'] . "'>" . $pages[$k]['page_name'] . "</a>";
          }
        ?>
      </div>
    </nav>
  </div>
</header>