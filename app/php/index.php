<?php
$config = __DIR__ . "/config.php";

if ( ! file_exists( $config ) ) {
  echo "<h1>Archivo config.php</h1>";
  echo "<p>Por favor, renombre el archivo <strong>config.php.sample</strong> a <strong>config.php</strong> y actualice los parámetros de conexión.</p>";
  exit;
}

include $config;
include __DIR__ . "/DLValidar.php";
include __DIR__ . "/DLCookies.php";
include __DIR__ . "/DLSubir.php";
include __DIR__ . "/DLUser.php";
include __DIR__ . "/DLPeticiones.php";
include __DIR__ . "/DLCalendario.php";
include __DIR__ . "/DLProtocolo.php";
include __DIR__ . "/query.php";
include __DIR__ . "/reCAPTCHA.php";
?>