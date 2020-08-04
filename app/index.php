<?php
  if ( $_SERVER['SERVR_NAME'] !== "localhost" ) { ?>
  <link rel="stylesheet" href="../vista/css/style.css">
  <link rel="shortcut icon" href="../multimedia/imagen/favicon.ico" type="image/x-icon">
  <link rel="icon" href="../multimedia/imagen/favicon.png" type="image/png">
  
  <main class="">
    <div class="portada flex--center" style="flex-wrap: wrap;">
      <div class="width flex default" style="padding: 10px;">
        <h2 class="width default">Estará disponible en el transcurso del día</h2>
        <a href="../">Volvar a la página principal</a>
      </div>

      <div  id="logo" class="logotipo" data-src="../multimedia/imagen/loyal-services-logo-azul.svg"</div>
    </div>
  </main>

  <script src="app/js/main.js"></script>
<?php
  exit;
  }
  include __DIR__ . "/php/index.php";

  $user = new DLUser();
  $hash = "";

  $autenticado = $user -> autenticado( $hash );
?>
<!DOCTYPE html>
<html lang="es-VE">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minipanel de administración</title>

  <link rel="stylesheet" href="../vista/css/style.css">
  <link rel="shortcut icon" href="../multimedia/imagen/favicon.ico" type="image/x-icon">
  <link rel="icon" href="../multimedia/imagen/favicon.png" type="image/png">

  <script src="app/js/main.js" defer></script>
</head>

<body>
  <main id="app">
    <?php if ( ! $autenticado ) { ?>
    <header class="header min-height" id="header">
      <nav class="navigation navigation--home" id="navigation">
        <div class="navigation flex flex--between">
          <!-- Isotipo -->
          <a href="#home" class="logo logo__enlace">
            <div class="logo logo--horizontal" data-src="multimedia/imagen/loyal-services-texto-grisaceo.svg"></div>
          </a>

          <div class="form-login">
            <form action="" method="post">
              <label>
                <span>User:</span>
                <input type="text" name="user" id="user" />
              </label>

              <label>
                <span>Password:</span>
                <input type="password" name="password" id="password" />
              </label>

              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </nav>
    </header>

    <?php } ?>

    <div class="portada portada__item--left" data-src="../multimedia/imagen/loyal-services-logo-azul.svg"></div>
  </main>
</body>

</html>