<?php
/**
 * @package DLProtocolo
 * @version 1.0.0
 * @author David E Luna <davidlunamontilla@gmail.com>
 * @copyright (c) 2020 - David E Luna M
 * @license MIT
 */

class DLProtocolo {
  protected $hostName = [];

  public function __construct($hostName = []) {

    if ( count( $hostName ) > 0 ) {
      foreach( $hostName as $host ) {
        $this -> hostName[] = $host;
      }
    }
  }

  public function https() {
    $serverName = (string) strtolower($_SERVER['SERVER_NAME']);
    $https = array_key_exists('HTTPS', $_SERVER);
    $url = (string) $_SERVER['REQUEST_URI'];

    $datos = explode(".", $serverName);

    if ( ! count( $this -> hostName ) > 0 )
      exit;

    foreach( $this -> hostName as $host ) {

      if ($serverName === $host && !$https) {
        $url = "https://$serverName$url";
        
        header("Location: $url");
      }
    }
  }
}
