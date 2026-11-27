<?php
// Configuración local para XAMPP. Ajusta estos valores si cambiaste la contraseña de MySQL.
$host = 'localhost';
$db   = 'navidad_santa';
$user = 'root';
$pass = ''; // En XAMPP normalmente está vacío por defecto.
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => false, 'mensaje' => 'No se pudo conectar con MySQL. Verifica que MySQL esté iniciado y que hayas importado la base de datos.']);
    exit;
}
