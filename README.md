# Loyal Services

## Fuentes tipográficas

El sitio Web se encuentra utilizando la siguiente fuente tipográfica:

``` css
font-family: 'Roboto',
sans-serif;
```

La página comprueba primero si en el computador del usuario se encuentra instalado, de lo contrario utilizará las fuentes ofrecida por Google a través de una API de forma automática.

La fuente para su logotipo es **Garamond Bold.**

Se tiene acceso a la tipografía utilizada por la página mediante la siguiente línea:

``` scss
@import "../css/roboto.css";
```

Se ubica en la línea 3.

## Estructura

El sitio Web está constituido por cinco secciones, una agenda y panel de administración, además, de contar con el **reCAPTCHA** de Google.

Estas son las secciones:

* HOME.
* Services.
* Catalogs.
* About.
* Contact.

**Correo:**

``` none
 loyalservices.ca@gmail.com
```

Puede clonar el proyecto entero escribiendo la siguiente línea:

``` bash
git clone https://github.com/dlunamontilla/loyal-service.git
```

Una vez hayas clonado el proyecto puede proceder a obtener la rama `development` de la siguiente forma:

``` bash
git fetch && git checkout development
```
## Instalación del proyecto

Para instalar su proyecto ubique el archivo `config.php.sample` en el directorio `app/php/` y renómbrelo como `config.php`. Luego ubique en las líneas `3`, `4` y `5` lo siguiente:

``` php
...
$dsn = "mysql:dbname=nombre_de_la_base_de_datos;host=127.0.0.1";
$usuario = "usuario_base_de_datos";
$contraseña = "Contraseña_de_la_base_de_datos";
```

Y actualice el **nombre de la base de datos** y las credenciales asociadas a ella.

## Biblioteca que utiliza el proyecto

Tenga en cuenta que la biblioteca que utiliza este proyecto pertenece a **David E Luna M** y está publicado bajo la licencia MIT.

Puede acceder a los archivos de la [biblioteca junto a su documentación][biblioteca]

[biblioteca]:https://github.com/dlunamontilla/loyal-service/tree/master/app/php "Ir a la bibliote y su documentación"