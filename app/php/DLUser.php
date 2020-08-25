<?php
/** 
 * @package DLUser
 * @author David E Luna M <davidlunamontilla@gmail.com>
 * @copyright (c) 2020 - DAVID E LUNA M
 * @version 1.0.0
 * @license MIT
 * 
 * IMPORTANTE:
 * Esta pequeña biblioteca no pretende ser el mejor método de autenticación fiable
 * para el inicio de sesión de usuarios. El objetivo es permitir que un usuario 
 * legítimo del sitio web donde se aplique pueda realizar cambios:
 */

class DLUser extends DLCookies {
  # PROTEGIDO:
  # Validar usuario y contraseña:
  protected function validarCuenta() : bool {
    $userPattern = '/^[a-z]{1}[a-z\-\_\.]{4,16}[a-zA-Z0-9]{1}$/i';
    $passwordPattern = '/^[a-z0-9\-\_\.\*\%\&\/\\\Ñ\ñ\$\#\@\|\!\[\]\+\¿\?\(\)\¬\{\}]{8,30}$/i';

    $usuario = preg_match( $userPattern, $this -> user );
    $contrasenna = preg_match( $passwordPattern, $this -> password );
    
    return ( $usuario && $contrasenna ) ? true : false; 
  }

  # PROPIEDADES Y MÉTODOS PÚBLICOS:
  # Propiedades públicas:
  public $user = "";
  public $password = "";
  public $hash = "";

  // La propiedad $comprobarHash se utilizará para almacenar en él 
  // el hash almacenado previamente en la base de datos:
  public $comprobarHash = "";

  public function __construct() {}

  # Permite crear un hash a partir de los datos del usuario e informar
  # de si se creó o no con true | false:
  public function crearHash() : bool {
    if ( $this -> validarCuenta() ) {
      $this -> hash = sha1($this -> user . $this -> password . date("d-m-Y-h:i:s"));
      return true;
    }

    return false;
  }

  // Validar si las cookies existen y comparar su valor con la
  // base de datos. En este caso, $this -> comprobarHash representará
  // el valor obtenido de la base de datos:
  public function autenticado( string $hash ) : bool {
    
    return (
      ! isset( $hash ) ||
      empty(trim($hash)) ||
      ! key_exists("tokenA", $_COOKIE) ||
      ! key_exists("tokenB", $_COOKIE) ||
      $_COOKIE["tokenA"] !== $hash ||
      $_COOKIE["tokenB"] !== sha1( $hash ) )
      ? false : true;
  }

  // Si el usuario no ha iniciado sesión deberá autenticarse
  public function autenticar( string $hash ) : bool {
    if ( ! isset( $hash ) || empty(trim($hash)) )
      return false;

    $this -> crear( "tokenA", [
      "content" => $this -> hash,
      "duracion" => (int) 3600 * 24,
      
    ]);

    $this -> crear( "tokenB", [
      "content" => sha1( $hash ),
      "duracion" => (int) 3600 * 24,
    ]);

    return (boolean) (
      array_key_exists( "tokenA", $_COOKIE ) ||
      array_key_exists( "tokenB", $_COOKIE))
      ? false : true;
  }

  // Elimina las cookies que contiene los datos
  // del usuario autenticado:
  public function salir() : bool {
    $this -> eliminar( "tokenA" );
    $this -> eliminar( "tokenB" );

    if (
      key_exists( "tokenA", $_COOKIE ) ||
      key_exists( "tokenB", $_COOKIE )
    ) {
      // Si no se eliminaron las cookies 
      // devolverá false:
      return false;
    }

    // Si las cookies se eliminaron lo que sigue
    // es lo que devolverá (true):
    return true;
  }

  // Obtener token de las cookies:
  public function obtenerToken() : string {
    if ( array_key_exists( "tokenA", $_COOKIE ) ) {
      return $_COOKIE['tokenA'];
    }
    
    return "";
  }
};
?>