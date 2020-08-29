# Uso de la clase DLProtocolo

Tienes que instanciar la clase con los nombres de dominio sobre los que se van a aplicar:

``` php
$protocolo = new DLProtocolor([
  "dominio.com",
  "dominio2.com",
  "dominio3.com",
  ...
  "dominioN.com"
]);
```

Y llamar el método `https()` :

``` php
$protocolo -> https();
```

De esa forma obligarás al sitio Web a utilizar el protocolo **HTTPS** en los dominios establecidos en el instanciamiento de la clase anterior.
