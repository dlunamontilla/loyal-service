<?php
/**
 * @author David E Luna M <davidlunamontilla@gmail.com>
 * @package DLValidar
 * @version 1.0.0
 * @copyright David E Luna M <dlunamontilla@gmail.com>
 * 
 * Fecha: 12 de agosto de 2020
 * 
 */

 class DLValidar {
  public function __construct() {}

  public function password( string $password ) : bool {
    $pattern = '/^[a-z0-9\-\_\.\*\%\&\/\\\Ñ\ñ\$\#\@\|\!\[\]\+\¿\?\(\)\¬\{\}]{8,30}$/i';
    $validar = preg_match( $pattern, $password );
    return ( $validar ) ? true : false;
  }

  public function email( string $email ) : bool {
    $pattern = "/^[a-zA-Z0-9.!#$%&\'*+\/\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";
    $validar = preg_match( $pattern, $email );
    return ( $validar ) ? TRUE : FALSE;
  }
 }