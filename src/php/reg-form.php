<?php
  //---- Recieving POST data ----
    $full_name = $_POST['surname'] . ' ' . $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $birth_date = $_POST['birth_year'] . '-' . $_POST['birth_month'] . '-' . $_POST['birth_day'];
    $address = $_POST['country'] . ', ' . $_POST['region'] . ', ' . $_POST['city'] . ', ' . $_POST['street'];
    $reg_purpose = $_POST['reg_purpose'];
    $reg_date = date("Y-m-d");

    echo "Спасибо за регистрацию! Мы с вами обязательно свяжемся!";

    
  //---- Sending data to the database ----

    $servername = 'localhost';
    $username = 'zicco';
    $password = 858689;
    $dbname = 'avon_cat';

    $connection = new mysqli($servername, $username, $password, $dbname);

    if ($connection->connect_error) {
      die("Connection failed" . $connection->connect_error);
    }

    $addRowQuery = 
    "INSERT INTO avon_zayavki(`full_name`, `email`, `phone`, `birth_date`, `address`, `reg_purpose`, `reg_date`)
    VALUES('$full_name', '$email', '$phone', '$birth_date', '$address', '$reg_purpose', '$reg_date')";
    
    $connection->query($addRowQuery);
    
    
    $connection->close();



  //Sending an email to lient and to manager
  require_once('phpmailer/PHPMailerAutoload.php');
  $mail = new PHPMailer;
  $mail->CharSet = 'utf-8';

  //$mail->SMTPDebug = 3;                               // Enable verbose debug output
  
  $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->Host = 'smtp.mail.ru';  												// Specify main and backup SMTP servers
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->Username = 'avon-cat@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
  $mail->Password = ''; // Ваш пароль от почты с которой будут отправляться письма
  $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
  $mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров
  
  $mail->setFrom('avon-cat@mail.ru'); // от кого будет уходить письмо?
  $mail->addAddress('masasikisimoto@gmail.com');     // Кому будет уходить письмо 
  $mail->addAddress('ledi.ket.ok@yandex.ru');     // Кому будет уходить письмо 
  //$mail->addAddress('ellen@example.com');               // Name is optional
  //$mail->addReplyTo('info@example.com', 'Information');
  //$mail->addCC('cc@example.com');
  //$mail->addBCC('bcc@example.com');
  //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
  //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
  $mail->isHTML(true);                                  // Set email format to HTML
  
  $mail->Subject = 'Заявка на регистрацию!';
  $mail->Body    = 'Поздравляем, в нашей команде пополнение!' . '<br>' .
                   '  ФИО: ' . $full_name . '<br>' .
                   '  Телефон: ' . $phone . '<br>' . 
                   '  Почта: ' . $email . '<br>' . 
                   '  Дата рождения: ' . date('d.m.Y', strtotime($birth_date)) . '<br>' . 
                   '  Адрес: ' . $address . '<br>' . 
                   '  Цель регистрации: ' . $reg_purpose . '<br>' . 
                   '  Дата регистрации: ' . date('d.m.Y', strtotime($reg_date)) . '<br>' . 
  $mail->AltBody = '';
  
  //Sending the email
  if(!$mail->send()) {
      echo 'Error';
  } else {
    echo 'Спасибо за регистрацию';
  }
?>