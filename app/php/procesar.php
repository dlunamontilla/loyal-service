<?php
include __DIR__ . "/index.php";

$user = new DLUser();
$post = new DLPeticiones( "post" );
$cookie = new DLCookies();

// Subir archivos de tipo imagen:
$subir = new DLSubir([
  "ruta" => "../../uploads",
  "tipo" => "imagen"
]);

// Validador de textos:
$validar = new DLValidar();

header("Content-Type: application/json; charset=utf-8");

// Validar peticiones:
  // Validar peticiones:
  $login = [
    "user" => false,
    "password" => false
  ];

  // Obtener datos de las cookies para comprobar las sesiones:
  $obtenerHash -> execute([
    ":hashUser" => $user -> obtenerToken()
  ]);

  // Se verifica que se haya iniciado previamente la sesión de usuario:
  $hashUser = $obtenerHash -> fetch( PDO::FETCH_OBJ );
  $hash = ( ! empty(@$hashUser -> hashUser) ) ? $hashUser -> hashUser : "";
  $autenticado = $user -> autenticado( $hash );

// Procesar inicio de sesión de usuario:
  # Iniciar Sesión:
  // Permite al usuario iniciar Sesión:
  if ( $post -> validar( $login ) && ! $autenticado ) {
    $user -> user = $_POST['user'];
    $user -> password = $_POST['password'];

    # Se crea un hash si los datos enviados por el usuario es correcto:
    if ( $user -> crearHash() ) {
      
      $actualizarHash -> execute([
        ':hashUser' => $user -> hash,
        ':user' => $user -> user,
        ':pass' => sha1($user -> password)
      ]);
      
      $user -> autenticar( $user -> hash );
      $autenticado = $user -> autenticado( $user -> hash );
      
      header("Location: ../");
    }
  }

  // Actualizar contraseña de usuarios:
  $updateLogin = [
    "oldPassword" => false,
    "newPassword" => false,
    "hashUser" => false
  ];

  if ( $post -> validar( $updateLogin ) && $autenticado ) {
    $oldPassword = (string) $_POST['oldPassword'];
    $newPassword = (string) $_POST['newPassword'];
    $hash = (string) $_POST['hashUser'];

    if ( $validar -> password($newPassword) ) {
      $actualizarContraseña -> execute([
        ":newPassword" => sha1($newPassword),
        ":oldPassword" => sha1($oldPassword),
        ":hashUser" => $hash
      ]);
      
      $content = [
        "content" => "Contenido de la cookie"
      ];

      $cookie -> crear("msg-password", [
        "content" => "The password has been updated.",
        "ruta" => "/",
        "duracion" => 5
      ]); 


      header("Location: ../?user#form-update-password");
    }
  }

  // Cerrar Sesión:
  $logout = [
    "salir" => true
  ];

  if ( $post -> validar( $logout) ) {
    $user -> salir();
    header("Location: ../");
  }

  // Agregar y eliminar servicios:
  if ( $autenticado ) {
    // Agregar Servicios:
    $servicios = [
      "title" => false,
      "description" => false
    ];

    if ( $post -> validar( $servicios ) ) {
      $title = (string) htmlentities( $_POST['title']);
      $description = (string) htmlentities( $_POST['description']);

      $agregarServicios -> execute([
        ":title" => $title,
        ":description" => $description
      ]);
      
      // Volver al formulario:
      header("Location: ../?services#services");
    }

    // Eliminar servicios:
    $eliminar = [
      "services" => false
    ];

    if ( $post -> validar( $eliminar ) ) {
      $idservices = (int) $_POST['services'];

      $eliminarServicios -> execute([
        ":id" => $idservices
      ]);

      header("Location: ../?services#delete-services");
    }
  }

  // Agregar y eliminar catálogos:
  if ( $autenticado ) {
    $catalogsDescription = [
      "catalogs-description" => true
    ];

    
    $datosFichero = $subir -> archivo( "fichero" );
    
    $datosFichero[0]['fichero'] = preg_replace("/(\.\.\/)/", "", @$datosFichero[0]['fichero']);
    $datosFichero[0]['thumbnail'] = preg_replace("/(\.\.\/)/", "", @$datosFichero[0]['thumbnail']);
    
    $description = "";

    if ( $post -> validar( $catalogsDescription ) ) {
      $description = htmlentities( $_POST['catalogs-description']);
      // Volver al formulario:
      
      // Implementar resultados en la base de datos:
      $agregarCatalogos -> execute([
        ":url" => (string) $datosFichero[0]['fichero'],
        ":thumbnail" => (string) $datosFichero[0]['thumbnail'],
        ":description" => (string) $description
      ]);

      header("Location: ../?catalogs#form-ficheros");
    }

    // Eliminar catálogos:
    $catalogos = [
      "eliminar-catalogos" => true
    ];

    if ( $post -> validar( $catalogos ) ) {
      $id = $_POST['eliminar-catalogos'];

      $obtenerCatalogosPorId -> execute([
        ":id" => (int) $id
      ]);
        
      $eliminarArchivo = $obtenerCatalogosPorId -> fetch( PDO::FETCH_OBJ );
      $eliminarThumbnail = "../../" . $eliminarArchivo -> thumbnail;
      $eliminarImagen = "../../" . $eliminarArchivo -> url;
      
      if ( file_exists( $eliminarThumbnail) )
        unlink( $eliminarThumbnail);
      
      if ( file_exists( $eliminarImagen ) )
        unlink( $eliminarImagen );
      
      $eliminarCatalogos -> execute([
        ":id" => (int) $id
      ]);

      header("Location: ../?catalogs#eliminar-catalogos");
    }
  }

  // Actualizar el módulo about:
  if ( $autenticado ) {
    $validarAbout = [
      "identificador" => false,
      "mission" => true,
      "vision" => true
    ];

    $datos = [];

    if ( $post -> validar( $validarAbout ) ) {
      array_push( $datos, (int) $_POST['identificador']);
      array_push( $datos, (string) $_POST['mission']);
      array_push( $datos, (string) $_POST['vision']);
      $id = (int) $_POST['identificador'];
      $mission = (string) $_POST['mission'];
      $vision = (string) $_POST['vision'];

      $actualizarAbout -> execute([
        ":mision" => $mission,
        ":vision" => $vision,
        ":id" => $id
      ]);
      
      $cookie -> crear( "misionvision", [
        "duracion" => 5,
        "ruta" => "/",
        "content" => "Mission and vision has been updated"
      ]);

      header("Location: ../?about#actualizar-about");
    }
  }

  $recibirCorreo = [
    "email" => false,
    "g-recaptcha-response" => true
  ];

  if ( $post -> validar( $recibirCorreo ) ) {
    // Procesando datos del formulario de correo:
    $response = $_POST['g-recaptcha-response'];
    $email = $_POST['email'];

    if ( reCAPTCHA( $response ) ) {
      // Enviar correo a la base de datos si su formato es correcto:
      if ( $validar -> email( $email ) ) {
        $agregarCorreo -> execute([
          ":email" => (string) $email
        ]);

        $cookie -> crear("email-enviado", [
          "content" => "Thanks for subscribing",
          "duracion" => (int) 5,
          "ruta" => "/"
        ]);
      }
    }else {
      $cookie -> crear("email-no-enviado", [
        "content" => "Solve the reCAPTCHA",
        "duracion" => (int) 5,
        "ruta" => "/"
      ]);
    }

    header("Location: ../../#form-email");
  }


  // Procesar calendario:
  $archivarCalendario = [
    "archivarFecha" => false
  ];

  if ( $post -> validar( $archivarCalendario) ) {
    $actualizarCalendario -> execute([
      ":id" => (int) $_POST['archivarFecha']
    ]);

    header("Location: ../?calendar#modCalendario");
  }

  // Procesar calendario:
  $eliminarReserva = [
    "eliminarFecha" => false
  ];

  if ( $post -> validar( $eliminarReserva) ) {
    $eliminarCalendario -> execute([
      ":id" => (int) $_POST['eliminarFecha']
    ]);

    header("Location: ../?calendar#modCalendario");
  }

  // $eliminarCorreo
  $eliminarCorreo = [
    "eliminarCorreo" => false
  ];

  if ( $post -> validar( $eliminarCorreo ) ) {
    $eliminarEmail -> execute([
      ":id" => (int) $_POST['eliminarCorreo']
    ]);

    header("Location: ../?email#modEmail");
  }