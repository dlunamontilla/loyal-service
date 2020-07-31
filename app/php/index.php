<?php
include __DIR__ . "/DLCookies.php";
include __DIR__ . "/DLOpenGraph.php";
include __DIR__ . "/DLSubir.php";

?>

<!-- Probar el código -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Probar el código</title>
</head>
<body>
  <main id="app">
    <form action="" method="POST" enctype="multipart/form-data" id="form">
      <input type="file" name="fichero" id="fichero" />
    </form>
  </main>

  <script>

    const init = () => {
      if ( 
        typeof form === "undefined" ||
        form === null ||
        typeof fichero === "undefined" ||
        fichero === null
      ) {
        return;
      }
  
      fichero.onchange = () => {
        form.submit();
      }
    };

    init();
    
  </script>
</body>
</html>