<?php
  $imgFolder = scandir('../images/catalogue/01_2021');
  echo count($imgFolder) - 2; //2 of them are just '..' '.'
?>