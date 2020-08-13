<?php
  if ( $_SERVER['SERVER_NAME'] !== "localhost" ) { ?>
  <link rel="stylesheet" href="../vista/css/style.css">
  <link rel="shortcut icon" href="../multimedia/imagen/favicon.ico" type="image/x-icon">
  <link rel="icon" href="../multimedia/imagen/favicon.png" type="image/png">
  
  <main class="">
    <div class="portada flex--center" style="flex-wrap: wrap;">
      <div class="width flex default" style="padding: 10px;">
        <h2 class="width default">Estará disponible en el transcurso del día o en la tarde</h2>
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
  $post = new DLPeticiones( "post" );
  $get = new DLPeticiones( "get" );

  // Validar peticiones:
  $login = [
    "user" => false,
    "password" => false
  ];

  // SOLICITAR DATOS PARA EVALUAR QUE HAYA UNA SESIÓN ABIERTA 
  // PREVIAMENTE:
  $obtenerHash -> execute([
    ":hashUser" => $user -> obtenerToken()
  ]);
  
  // Verificando que la sesión se haya iniciado:
  $hashUser = $obtenerHash -> fetch( PDO::FETCH_OBJ );
  $hash = ( ! empty(@$hashUser -> hashUser) ) ? $hashUser -> hashUser : "";
  $autenticado = $user -> autenticado( $hash );

  // Listar servicios
  $obtenerServicios -> execute();
  $listarServicios = $obtenerServicios -> fetchAll( PDO::FETCH_OBJ );

  // Listar catálogos:
  $obtenerCatalogos -> execute();
  $listarCatalogos = $obtenerCatalogos -> fetchAll( PDO::FETCH_OBJ );

  // Obtener misión y visión:
  $obtenerAbout -> execute();
  $about = $obtenerAbout -> fetch( PDO::FETCH_OBJ );

  // Validación de los módulos:
  $modServices = ["services" => true];
  $modCatalogs = ["catalogs" => true];
  $modAbout = ["about" => true];
  $modUser = ["user" => true];
  $home = count($_GET) === 0;

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

  <script src="./js/main.js" defer></script>
  <script src="./js/login.js" defer></script>
  <script src="./js/procesar.js" defer></script>
</head>

<body>
  <main id="app">
    <header class="header min-height header--panel" id="header">
      <nav class="navigation navigation--home" id="navigation">
        <div class="navigation flex flex--between">
          <!-- Isotipo -->
          <a href="./" class="logo logo__enlace">
            <div class="logo logo--horizontal" data-src="../multimedia/imagen/logotipo-texto-blanco.svg"></div>
          </a>

          <?php if ( ! $autenticado ) { ?>
          <div class="form-content">
            <form action="php/procesar.php" method="post" class="form-login" id="form-login">
              <label class="label label--login">
                <input type="text" name="user" id="user" autocomplete="off" class="input input--login" placeholder="User" required="" />
              </label>

              <label class="label label--login">
                <input type="password" name="password" id="password" autocomplete="off" class="input input--login input--password" placeholder="Password" required="" />
              </label>

              <button type="submit" class="button button--login">Login</button>
            </form>
          </div>
          <?php } ?>

          <?php if ( $autenticado ) { ?>
          <div class="login flex">
            <span>Welcome, <?= @$hashUser -> name . " " . @$hasUser -> lastName; ?></span>
            <form action="php/procesar.php" method="post" id="salir">
              <input type="hidden" name="salir">
              <button type="submit" class="button button--login button--logout">Logout</button>
            </form>
          </div>
          <?php } ?>
        </div>
      </nav>
    </header>    
    
    <?php if ( $home && $autenticado ) { ?>
    <!-- Acceso directo -->
    <div class="grid grid--default">
      <a href="./?services" class="grid__item grid__item--cards grid__item--enlace">
        <h2 class="title--base">Services</h2>
        <p>Add & Delete Services</p>
      </a>

      <a href="./?catalogs" class="grid__item grid__item--cards grid__item--enlace">
        <h2 class="title--base">Catalogs</h2>
        <p>Add & Delete Catalogs </p>
      </a>

      <a href="./?about" class="grid__item grid__item--cards grid__item--enlace">
        <h2 class="title--base">About</h2>
        <p>Update Mission & Vision</p>
      </a>

      <a href="./?user" class="grid__item grid__item--cards grid__item--enlace">
        <h2 class="title--base">Update Password</h2>
        <p>Change Your Password</p>
      </a>

      <a href="./?calendar" class="grid__item grid__item--cards grid__item--enlace">
        <h2 class="title--base">Calendar</h2>
        <p>View service requests</p>
      </a>

      <a href="./?email" class="grid__item grid__item--cards grid__item--enlace">
        <h2 class="title--base">Email</h2>
        <p>View emails</p>
      </a>
    </div>
    <?php } ?>

    <!-- Todos los módulos -->
    <div class="content">
      <?php if ( ! $autenticado ) { ?>
        <div class="presentation">
          <div class="presentation__item" data-src="../multimedia/imagen/loyal-services-logo-azul.svg"></div>
        </div>
      <?php } ?>

      
      <?php if ( $autenticado ) { ?>
      
        <?php if ( $get -> validar( $modServices ) ) { ?>

        <!-- Módulo de servicios -->
        <section class="update" id="services">
          <a href="./">&lt;&lt; Go Back</a>
          <hr>

          <h2 class="title title--center title--uppercase title--base">Add & remove services</h2>

          <div class="form form--content form--medium">
            <h3 class="title--base">Add Services</h3>
            <hr>

            <form action="php/procesar.php" method="post" id="form-service" class="form">
              <label class="form__label">
                <input type="text" name="title" id="title" class="form__text" placeholder="Title" required="">
              </label>

              <label class="form__label" id="label-services-description">
                <textarea name="description" id="description" class="form__text" placeholder="Description" required="" maxlength="190"></textarea>
                <div class="length"></div>
              </label>

              <hr>
              <div class="group-button group-button--right">
                <button type="submit" class="button button--primary button--right">Add Services</button>
              </div>
            </form>
          </div>

          <div class="form form--content form--listar">
            <form action="php/procesar.php" method="post" id="eliminar-servicios">
              <h3 class="title--base">Delete Services:</h3>
              <hr>

              <input type="hidden" name="services" id="hidden-services" value="" />

              <div class="grid">
              <?php
              foreach( $listarServicios as $key => $services ) {
                echo "  <div class=\"grid__item grid__item--cards grid__item--eliminar grid__item--services\" data-id=\"" . @$services -> idservices . "\">";
                echo "    <div class=\"grid__title\"><h3>" . @$services -> title . "</h3></div>";
                echo "    <div class=\"grid__description\">" . @$services -> description . "</div>";
                echo "  </div>";
              }
              ?>
              </div>
            </form>
          </div>
        </section>

        <?php } ?>
        
        <?php if ( $get -> validar( $modCatalogs ) ) { ?>
        
        <!-- Módulo Catálogos -->
        <section class="update" id="catalogs">
          <a href="./">&lt;&lt; Go Back</a>
          <hr>

          <h2 class="title title--center title--uppercase title--base">Add & remove catalogs</h2>

          <div class="form form--content form--medium">
            <form action="php/procesar.php" method="post" enctype="multipart/form-data" id="form-ficheros">
              <h3 class="title--base">Add Catalogs</h3>
              <hr>
              
              <input type="file" name="fichero" id="fichero">

              <label class="form__label" id="label-catalogs-description">
                <p>Add a description to the image(optional):</p>
                <textarea name="catalogs-description" id="catalogs-description" class="form__text" maxlength="190"></textarea>
                <div class="length"></div>
              </label>

              <div class="group-button group-button--right">
                <button type="submit" class="button button--primary">Add Catalogs</button>
              </div>
            </form>
          </div>
          
          <h3 class="title--base">Delete Catalogs:</h3>
          <hr>

          <!-- Listar catálogos -->
          <div class="form form--content form--listar">
            <form action="php/procesar.php" method="post" id="eliminar-catalogos">
              <input type="hidden" name="eliminar-catalogos">

              <div class="grid">
              <?php
              foreach( $listarCatalogos as $key => $catalogos ) {
                echo '<div class="grid__item grid__item--cards grid__item--eliminar grid__item--catalogs" data-id="' . @$catalogos -> idcatalogs . '" tabindex=\'0\'>';
                echo '  <div class="grid__images"><img src="../' . $catalogos -> thumbnail . '"></div>';
                echo '  <div class="grid__description">' . $catalogos -> description . '</div>';
                echo '</div>';
              }
              ?>
              </div>
            </form>
          </div>
        </section>
        
        <?php } ?>
        

        <?php if ( $get -> validar( $modAbout ) ) { ?>

        <!-- Módulo About -->
        <section class="update" id="about">
          <a href="./">&lt;&lt; Go Back</a>
          <hr>
          <h2 class="title title--center title--uppercase title--base">Update About</h2>

          <div class="form form--content">
            <form action="php/procesar.php" method="post" id="actualizar-about">
              <input type="hidden" name="identificador" value="<?= @$about -> idabout; ?>">
              
              

              <div class="grid">
                <div class="grid__item">
                  <label class="form__label">
                    <p>Mission</p>
                    <textarea name="mission" id="mission" required="" class="form__text form__text--ampliar"><?= @$about -> mision; ?></textarea>
                  </label>

                </div>
                
                <div class="grid__item">
                  <label class="form__label">
                    <p>Vision</p>
                    <textarea name="vision" id="vision" required="" class="form__text form__text--ampliar"><?= @$about -> vision; ?></textarea>
                  </label>
                </div>
              </div>

              <div class="group-button group-button--right">
                <div class="pass pass--inline-block"><?= @$_COOKIE['misionvision']; ?></div>
                <button type="reset" class="button button--primary">Reset</button>
                <button type="submit" class="button button--primary">Update</button>
              </div>
            </form>
          </div>
        </section>

        <?php } ?>
        
        <?php if ( $get -> validar( $modUser ) ) { ?>
          
        <!-- Módulo de usuario -->
        <section class="update" id="users">
          <a href="./">&lt;&lt; Go Back</a>
          <hr>

          <h2 class="title title--center title--uppercase title--base">Update Password</h2>

          <div class="form form--content form--medium">
            <form action="php/procesar.php" method="post" id="form-update-password">
              <label class="form__label">
                <p>Old Password:</p>
                <input type="password" name="oldPassword" id="oldPassword" class="form__text" required="">
              </label>

              <label class="form__label">
                <p>New Password:</p>
                <input type="password" name="newPassword" id="newPassword" class="form__text" required="">
              </label>

              <label class="form__label">
                <p>Repeat Password:</p>
                <input type="password" id="repeat-password" class="form__text">
                <div class="passwords"></div>
              </label>

              <!-- Obtener el token generado durante el inicio de sesión -->
              <input type="hidden" name="hashUser" value="<?= $user -> obtenerToken(); ?>">

              <div class="group-button group-button--right">
                <button type="submit" class="button button--primary">Update Password</button>
              </div>
            </form>
            
            <hr>

            <div class="pass"><?= @$_COOKIE['msg-password']; ?></div>
          </div>
        </section>
        
        <?php } ?>

      <?php } ?>
    </div>
  </main>
</body>

</html>