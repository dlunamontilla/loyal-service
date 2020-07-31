<?php
/**
 * @package DLOpenGraph
 * @author David E Luna M <davidlunamontilla@gmail.com>
 * @version 1.0.0
 */

 class DLOpenGraph {
  # PROPIEDADES PRIVADAS:

  # CONSTRUCTOR:
  public function __construct() {}

  # MÉTODOS PRIVADOS:
  protected function ruta( string $urlImage = "" ) : string {
    $ruta = "";
    $protocolo = "http://";

    $port = (int) @$_SERVER['SERVER_PORT'];
    
    # Determinar el protocolo a partir del puerto:
    if ( (int) $port === 443 )
      $protocolo = "https://";

    # Puerto no estándar visible:
    $port = ( $port === 443 || $port === 80 ) ? "" : ":" . $port;
    $port = (string) $port;

    # Establecer la URI:
    $uri = (string) @$_SERVER['REQUEST_URI'];

    # Obtener el nombre del servidor:
    $server = (string) @$_SERVER['SERVER_NAME'];

    # Formación completa de la ruta:
    $ruta = (string) ( $protocolo . $server . $port . $uri );
    
    if ( !file_exists($urlImage) )
      return (string) $ruta;
    
    $ruta = (string) ( $protocolo . $server . $port . "/$urlImage" );
    return (string) $ruta;
  }

  # MÉTODOS PÚBLICOS:
  public function cabecera( array $array = [] ) : string {
    if ( !is_array($array) )
      return "";

    # Obtener y depurar las URL's:
    $array['url'] = $this -> ruta();
    $array['image'] = $this -> ruta( $array['image'] );

    # Protocolo Open Graph
    $content = "<!-- Protocolo OpenGraph -->\n";
    foreach ( $array as $key => $registro ) {
      $content .= "<meta property=\"og:$key\" content=\"$registro\">\n";
    }

    $content .= "<meta name=\"twitter:card\" content=\"summary_large_image\">\n";

    # Tarjetas para Twitter:

    return $content;
  } 
 }
?>
