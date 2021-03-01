<?php
  $imgFolder = scandir("../images/catalogue/$_POST[folder]");
  echo count($imgFolder) - 2; //2 of them are just '..' '.'
?>