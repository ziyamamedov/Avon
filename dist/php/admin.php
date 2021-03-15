<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    td {
      max-width: 250px;
    }
  </style>
</head>
<body>
  
  <h1>Заявки на представительство</h1>

  <table border='1'>
    <tr>
      <th>id</th>
      <th>ФИО</th>
      <th>Почта</th>
      <th>Телефон</th>
      <th>Дата рождения</th>
      <th> Адрес</th>
      <th>Цель регистрации</th>
      <th>Дата регистрации</th>
    </tr>

    
    <?php

      if(($_POST['admin_login'] == 'zicco') && ($_POST['admin_password'] == '858689')) {
        
        $servername = 'localhost';
        $username = $_POST['admin_login'];
        $password = $_POST['admin_password'];
        $dbname = 'avon_cat';

        $connection = new mysqli($servername, $username, $password, $dbname);
        
        $sql = 'SELECT * FROM avon_zayavki';
        $result = $connection->query($sql);
        
        if($result->num_rows > 0) {
          //output data of each row
          while($row = $result->fetch_assoc()) {
            
            echo "<tr>
                    <td>{$row['id']}</td>
                    <td>{$row['full_name']}</td>
                    <td>{$row['email']}</td>
                    <td>{$row['phone']}</td>
                    <td>" . date('d.m.Y', strtotime($row['birth_date'])) . "</td>
                    <td>{$row['address']}</td>
                    <td>{$row['reg_purpose']}</td>
                    <td>" . date('d.m.Y', strtotime($row['reg_date'])) . "</td>
                  </tr>";
          }
        } else {
          echo "База данных заявок пуста!";
        }

        $connection->close();
      } else {
        echo 'Неправильный Логин или пароль';
      }
    ?>
  </table>
  
</body>
</html>