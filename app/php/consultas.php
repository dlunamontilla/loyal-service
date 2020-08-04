<?php
## INSERTAR DATOS:
$agregarEmail = $pdo -> prepare("INSERT INTO email VALUES(NULL, email = :email");
$agregarServicios = $pdo -> prepare("INSERT INTO services VALUES(NULL, title = :title, description = :description");
$agregarCatalogos = $pdo -> prepare("INSERT INTO catalogs VALUES(NULL, url = :url, thumbnail = :thumbnail, description = :description");
$agregarAbout = $pdo -> prepare("INSERT INTO catalogs VALUES(NULL, mision = :mision, vision = :thumbnail, description = :description");

## ACTUALIZAR DATOS:
$actualizarHash = $pdo -> prepare("UPDATE users set hashUser = :hashUser WHERE user = :user AND password = :password");
$actualizarNombres = $pdo -> prepare("UPDATE users set name = :name, lastName = :lastName WHERE hashUser = :hashUser");
$actualizarContraseña = $pdo -> prepare("UPDATE users set password = :newPassword WHERE password = :password AND hashUser = :hashUser");

// Actualizar catálogos:
$actualizarCatalogos = $pdo -> prepare("UPDATE catalogs set description = :description WHERE idcatalogos = :idcatalogos");

// Actualizar Servicios
$actualizarServicios = $pdo -> prepare("UPDATE services set title = :title, description = :description WHERE idservices = :idservices");

// Actualizar About:

?>