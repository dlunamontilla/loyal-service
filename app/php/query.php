<?php
## INSERTAR DATOS:
$agregarEmail = $pdo -> prepare("INSERT INTO email VALUES(NULL, email = :email");
$agregarServicios = $pdo -> prepare("INSERT INTO services VALUES(NULL, :title, :description)");
$agregarCatalogos = $pdo -> prepare("INSERT INTO catalogs VALUES(NULL, :url, :thumbnail, :description)");

## ACTUALIZAR DATOS:
$actualizarHash = $pdo -> prepare("UPDATE `users` set `hashUser` = :hashUser WHERE `user` = :user AND `password` = :pass");
$actualizarContraseña = $pdo -> prepare("UPDATE `users` set password = :newPassword WHERE password = :oldPassword AND hashUser = :hashUser");

// Actualizar About:
$actualizarAbout = $pdo -> prepare("UPDATE about set mision = :mision, vision = :vision WHERE idabout = :id");

# CONSULTAR DATOS DE LA BASE DE DATOS:
// Consultar usuarios:
$obtenerHash = $pdo -> prepare("SELECT * FROM users WHERE hashUser = :hashUser");

// Obtener datos de la tabla servicios:
$obtenerServicios = $pdo -> prepare("SELECT * FROM services ORDER BY idservices DESC");

// Obtener Catálogos:
$obtenerCatalogos = $pdo -> prepare("SELECT * FROM catalogs ORDER BY idcatalogs DESC;");
$obtenerCatalogosPorId = $pdo -> prepare("SELECT * FROM catalogs WHERE idcatalogs = :id;");
$obtenerAbout = $pdo -> prepare("SELECT * FROM about limit 1;");

# ELIMINAR DATOS:
$eliminarServicios = $pdo -> prepare("DELETE FROM services WHERE idservices = :id");
$eliminarCatalogos = $pdo -> prepare("DELETE FROM catalogs WHERE idcatalogs = :id");

# CALENDARIO:
# Agregar calendario:
$calendar = $pdo -> prepare("INSERT INTO calendar VALUES(NULL, :reserve, NOW(), :email, '');");

# Actualizar calendario:
$updateCalendar = $pdo -> prepare("UPDATE calendar set archive = :archive WHERE idcalendar = :id;");

# Obtener datos del calendario:
$obtenerCalendario = $pdo -> prepare("SELECT * FROM calendar");

# EMAIL:
# Agregar correo electrónico:
$agregarCorreo = $pdo -> prepare("INSERT INTO emails VALUES(NULL, :email, NOW());");

# Obtener correo:
$obtenerCorreo = $pdo -> prepare("SELECT * FROM emails ORDER BY dateRegister DESC");
?>