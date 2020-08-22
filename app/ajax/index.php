<?php
header("Content-Type: application/json; charset=utf-8");
$DLTools = "../php/index.php";

include $DLTools;

$get = new DLPeticiones( "get" );
$post = new DLPeticiones( "post" );

$validar = new DLValidar();

$calendario = new DLCalendario();

$comprobar = [];

// Obtener las fechas reservadas del calendario:
$obtenerCalendario -> execute();
$fechas = $obtenerCalendario -> fetchAll( PDO::FETCH_OBJ );

foreach( $fechas as $value ) {
  $f = explode("-", $value -> dateReserve );

  array_push( $comprobar, [
    "dia" => (int) $f[2],
    "mes" => (int) $f[1],
    "anno" => (int) $f[0]
  ]);
}

$diasPredeterminado = [
  "calendario" => true
];

$diasPorMes = [
  "calendario" => true,
  "mes" => false
];

if ( $get -> validar( $diasPredeterminado ) ) {
  echo json_encode( $calendario -> crear( (int) date("m"), (int) date("Y"), $comprobar ) );
}

if ( $get -> validar( $diasPorMes ) ) {
  echo json_encode( $calendario -> crear( (int) $_GET['mes'], (int) date("Y"), $comprobar ) );
}

// Obtener Fecha:
$obtenerFecha = [
  "obtenerFecha" => true
];

if ( $get -> validar( $obtenerFecha ) ) {
  $fecha = [
    "fecha" => (int) date("Ymd")
  ];

  echo json_encode( $fecha );
}

$getAbout = [
  "about" => true
];

if ( $get -> validar( $getAbout ) ) {
  $obtenerAbout -> execute();
  $about = $obtenerAbout -> fetch(PDO::FETCH_OBJ);

  echo json_encode( @$about );
}

// Obtener catálogos:
$catalogs = [
  "catalogs" => true
];

if ( $get -> validar( $catalogs ) ) {
  $obtenerCatalogos -> execute();
  $catalogos = $obtenerCatalogos -> fetchAll( PDO::FETCH_OBJ );
  echo json_encode( @$catalogos );
}

// Obtener servicios:
$services = [
  "services" => true
];

if ( $get -> validar( $services ) ) {
  $obtenerServicios -> execute();
  $servicios = $obtenerServicios -> fetchAll( PDO::FETCH_OBJ );
  echo json_encode( @$servicios );
}

// Obtener mensaje:
$correoEnviado = [
  "correoEnviado" => true
];

if ( $get -> validar( $correoEnviado ) ) {
  echo json_encode([
    "info" => (string) @$_COOKIE['email-enviado']
  ]);
}

// Obtener mensaje:
$correoNoEnviado = [
  "correoNoEnviado" => true
];

if ( $get -> validar( $correoNoEnviado ) ) {
  echo json_encode([
    "info" => (string) @$_COOKIE['email-no-enviado']
  ]);
}

$calendarioPOST = [
  "fechaSeleccionada" => true,
  "email" => true,
  "g-recaptcha-response" => true
];

if ( $post -> validar( $calendarioPOST) ) {
  $fechaSeleccionada = (string) $_POST['fechaSeleccionada'];
  $email = (string) $_POST['email'];
  $response = $_POST['g-recaptcha-response'];

  if ( ! $validar -> email( $email ) ) {
    echo json_encode([
      "info" => "Enter a valid email",
      "status" => false
    ]);

    exit;
  }

  if ( ! reCAPTCHA( $response ) ) {
    echo json_encode([
      "info" => "Solve the CAPTCHA to continue",
      "status" => false
    ]);

    exit;
  }

  // Si todo resultó exitoso se prodrá reservar 
  // la fecha del servicio:
  $agregarReserva -> execute([
    ":dateReserve" => (string) $fechaSeleccionada,
    ":email" => (string) $email
  ]);

  echo json_encode([
    "info" => "Thanks for choosing us",
    "status" => true
  ]);
}

$validar = count($_GET) == 0 && count($_POST) == 0;
if ($validar) {
  echo json_encode([]);
}