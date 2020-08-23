<?php
$fc = date("Y");

## INSERTAR DATOS:
$agregarEmail = $pdo -> prepare("INSERT INTO email VALUES(NULL, email = :email");
$agregarServicios = $pdo -> prepare("INSERT INTO services VALUES(NULL, :title, :description)");
$agregarCatalogos = $pdo -> prepare("INSERT INTO catalogs VALUES(NULL, :url, :thumbnail, :description)");
$agregarReserva = $pdo -> prepare("INSERT INTO calendar VALUES(NULL, :dateReserve, NOW(), :email, 0)");

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
$eliminarCalendario = $pdo -> prepare("DELETE FROM calendar WHERE idcalendar = :id");

# CALENDARIO:
# Agregar calendario:
$calendar = $pdo -> prepare("INSERT INTO calendar VALUES(NULL, :reserve, NOW(), :email, '');");

# Actualizar calendario:
$actualizarCalendario = $pdo -> prepare("UPDATE calendar set archive = '1' WHERE idcalendar = :id;");

# Obtener datos del calendario:
$obtenerCalendario = $pdo -> prepare("SELECT * FROM calendar WHERE dateRegister LIKE '%$fc%' ORDER BY dateRegister DESC limit 500;");

# EMAIL:
# Agregar correo electrónico:
$agregarCorreo = $pdo -> prepare("INSERT INTO emails VALUES(NULL, :email, NOW());");

# Eliminar Correo:
$eliminarEmail = $pdo -> prepare("DELETE FROM emails WHERE idemails = :id");

# Obtener correo:
$obtenerCorreo = $pdo -> prepare("SELECT * FROM emails WHERE dateRegister LIKE '%$fc%' ORDER BY dateRegister DESC limit 1000");
?>