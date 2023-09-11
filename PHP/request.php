<?php
header("content-Type:text/html;charset=utf-8");

$arr = array(
  "name" => "囡囡",
  "age" => 20,
  "sex" => "女"
);

foreach ($_GET as $key => $value) {
  $arr[$key] = $value;
}

// $num为生成汉字的数量
function getChar($num)
{
  $b = '';
  for ($i = 0; $i < $num; $i++) {
    // 使用chr()函数拼接双字节汉字，前一个chr()为高位字节，后一个为低位字节
    $a = chr(mt_rand(0xB0, 0xD0)) . chr(mt_rand(0xA1, 0xF0));
    // 转码
    $b .= iconv('GB2312', 'UTF-8', $a);
  }
  return $b;
}

?>

<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="shortcut icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAkklEQVQ4EWNsaDjwn4ECwESBXrBWig1gweaC8HBxuPDKlS/hbGwMnC7Q1NTEph5DDOwCfDaC5GCuwKaO8fr16/+Rbbt+/TrYFmLF4F4AaQRhdI2ExOAGYHiOSAGKDYBHI8zpsDDA5QB0dXADYBphIQ7iI7NhBqKrQ/ECTANIMS42uhzYAJipMFtw0djUMQ54bgQAjvJT7U4Gzs0AAAAASUVORK5CYII=" type="image/x-icon">
  <title>PHP</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  </style>
  <base href="">
</head>

<body>

  <p>姓名：<?php echo $arr["name"]; ?></p>
  <p>年龄：<?php echo $arr["age"]; ?></p>
  <p>性别：<?php echo $arr["sex"]; ?></p>
  <p>财富：$<?php echo number_format(mt_rand() * mt_rand() * mt_rand()); ?>.00</p>
  <p>评价：<?php echo getChar(mt_rand(10, 1000)) ?></p>

  <a href="/index.php" target="_blank">测试链接</a>

  <script>
    var baseNode = document.querySelector('head base');

    var linkNode = document.querySelectorAll('a');

    linkNode.forEach((element, index) => {
      element.addEventListener('click',() => {

        setTimeout(() => {
          baseNode.href = '';
        }, 0);
      });
    });
  </script>
</body>

</html>
