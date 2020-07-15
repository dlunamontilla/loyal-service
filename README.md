# Loyal Services

## Fuente tipográficas

Se utilizarán como fuentes predeterminada:

``` css
font-family: 'Roboto', sans-serif;
```

La fuente para el logotipo es `Garamond Bold`

En producción se implementará entre las etiquetas `<head></head>` lo siguiente:

``` html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"> 
```

Mientras tanto, se está utilizando la importación local durante la etapa de desarrollo:

``` scss
@import "../css/roboto.css";
```

## Secciones

El sitio Web está constituido por cinco secciones más un pie de página las cuales son:

+ Inicio.
+ Servicios.
+ Nosotros.
+ Contacto.

Adiciolamente a los incisos anteriores, el **pie de página**.

Cada sección tiene una imagen de fondo que identica las acciones que se pueden realizar en ellas.