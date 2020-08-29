# Uso de la clase **DLCookies()**

Para utilizar la clase `DLCookies` primero debe incluir el archivo:

``` php
<?php
include __DIR__ . "/path/dir/DLCookies.php";
```

Donde `/path/dir/` es la ruta donde se encuentra el archivo `DLCookies.php` .

Luego de haber realizado la acción anterior puede proceder a instanciarla:

``` php
$cookie = new DLCookies();
```

## Crear una cookie:

Puede crear una cookie escribiendo lo que sigue:

``` php
$cookie -> crear( "nombre_de_la_Cookie", [
  "content" => "Contenido de la cookie",
  "duracion" => 20 // Duración de la cookie.
]);
```

## Eliminar cookies:

Puede eliminar todas las cookies de la página:

``` php
$cookie -> eliminar();
```

O eliminar una cookie específica:

``` php
$cookie -> eliminar( "nombre_de_la_cookie" );
```
