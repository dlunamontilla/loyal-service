<?php
header("Content-Type: application/json; charset=utf-8");
$DLTools = "../php/index.php";

include $DLTools;

$get = new DLPeticiones( "get" );
$calendario = new DLCalendario();

$diasPredeterminado = [
  "calendario" => true
];

$diasPorMes = [
  "calendario" => true,
  "mes" => false
];

if ( $get -> validar( $diasPredeterminado ) ) {
  echo json_encode( $calendario -> crear( (int) date("m"), (int) date("Y") ) );
}

if ( $get -> validar( $diasPorMes ) ) {
  echo json_encode( $calendario -> crear( (int) $_GET['mes'], (int) date("Y") ) );
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