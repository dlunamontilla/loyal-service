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
