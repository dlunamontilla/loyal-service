<?php
/**
 * Uso de la cookie:
 * Para crear una cookie se debe instanciar la clase
 * DLCookie:
 *  $cookie = new DLCookies();
 *
 * Posteriormente, antes de llamar al método crear se debe
 * definir el tipo de contenido que debe tener la cookie:
 * $content = [
 *  "content" => "Contenido de la cookie",
 *  "duracion" => 0
 * ];
 * 
 * Posteriormente, se crea la cookie:
 *  $cookie -> crear( "nombre_de_la_cookie", $content );
 * 
 * ELIMINAR COOKIE:
 * Si desea eliminar todas las cookies, sólo tiene que escribir:
 *  $cookie -> eliminar();
 * 
 * Si desea eliminar una cookie específica, sólo debe especificar el nombre
 * de la cookie:
 *  $cookie -> eliminar( "nombre_de_la_cookie" );
 */

/**
 * @author David E Luna M <davidlunamontilla@gmail.com>
 * @copyright (c) 2019 - DAVID E LUNA M
 * @version 1.0.0
 * 
 */

class DLCookies extends data {
  # Propiedades:
  protected $content = "";
  protected $duracion = 1800;
  protected $ruta = "/";
  protected $dominio = "";
  protected $seguro = FALSE;
  protected $soloHTTP = true;

  public function __construct() {
    # Instrucciones...
    $this -> dominio = (string) @$_SERVER['SERVER_NAME'];
  }

  /**
   * 
   * @param crear
   * 
   * @param $nombre
   * @param $parametro = []
   * 
   */
  public function crear( String $nombre, Array $parametro = [] ) {
    $this -> validar();
    
    if ( empty(trim($nombre)) )
      return;

    if ( !is_array($parametro) && count($parametro) < 1 ) 
      return;

    if ( key_exists("content", $parametro) )
      $this -> content = (string) $parametro["content"];
    
    if ( key_exists("duracion", $parametro) )
      $this -> duracion = (int) $parametro["duracion"];
    
    if ( key_exists("ruta", $parametro) )
      $this -> ruta = (string) $parametro["ruta"];

    if ( key_exists("dominio", $parametro) )
      $this -> dominio = (string) $parametro["dominio"];

    if ( key_exists("seguro", $parametro) )
      $this -> seguro = (bool) $parametro["seguro"];

    if ( key_exists("soloHTTP", $parametro) )
      $this -> soloHTTP = (int) $parametro["soloHTTP"];
    
    // Crear la cookie con los valores adecuados:
    setcookie(
      (string) $nombre,
      (string) $this -> content,
      (int) time() + (int) $this -> duracion,
      (string) $this -> ruta,
      (string) $this -> dominio,
      (boolean) $this -> seguro,
      (boolean) $this -> soloHTTP
    );
  }

  // Eliminar cookie:
  public function eliminar( String $name = "" ) {
    if ( empty(trim($name)) ) {
      foreach ($_COOKIE as $key => $value) {
        if ( key_exists($key, $_COOKIE) ) {
          setcookie(
            (string) $key,
            (string) "",
            (int) 0,
            (string) $this -> ruta,
            (string) $this -> dominio,
            (boolean) $this -> seguro,
            (boolean) $this -> soloHTTP
          );

          unset($_COOKIE[$key]);
        }
      }

      return;
    }

    if ( key_exists($name, $_COOKIE) ) {
      setcookie(
        (string) $name,
        (string) "",
        (int) 0,
        (string) $this -> ruta,
        (string) $this -> dominio,
        (boolean) $this -> seguro,
        (boolean) $this -> soloHTTP
      );

      unset($_COOKIE[$name]);
    }
  }
}

?>