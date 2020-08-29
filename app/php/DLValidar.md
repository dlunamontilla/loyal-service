# Uso de la clase DLValidar

Para validar una contraseña se debe escribir:

``` php
$validar = new DLValidar();

if ( $validar -> password( "contraseña" ) ) {
  # Ejecutar las instrucciones acá si el formato 
  # de contraseña es válido
}
```