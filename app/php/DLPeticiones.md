# Uso de la clase **DLPeticiones**

Para empezar, debemos instanciar la clase:

Para utilizarlo con el método `POST` :

``` php
// Para el método POST:
$post = new DLPeticiones( "post" );
```

O para utilizarlo con el método `GET` :

``` php
// Para el método POST:
$post = new DLPeticiones( "get" );
```

Luego, crear un array:

``` php
$peticiones = [
  "correo" => false,
  "textoOpcional" => true,
  "nombres" => false
];
```

**Por lo tanto:**

* `false` : hace obligatorio una petición con contenido.

* `true` : permite que la petición se envíe con o sin contenido.

Finalmente, validamos las peticiones:

Mediante el método `POST` :

``` php
if ( $post -> validar( $peticiones ) ) {
  # Instrucciones que se ejecutan tras la 
  # validación de las peticiones.
}
```

Mediante el método `GET` :

``` php
if ( $get -> validar( $peticiones ) ) {
  # Instrucciones que se ejecutan tras la 
  # validación de las peticiones.
}
```
