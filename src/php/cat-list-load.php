<?php
  //Check how many ctalogues are on the server
  $cataloguesFolder = scandir('../images/catalogue/');
  array_shift($cataloguesFolder);
  array_shift($cataloguesFolder);
  echo  json_encode($cataloguesFolder) ;//Send back the list of cat folders
?>