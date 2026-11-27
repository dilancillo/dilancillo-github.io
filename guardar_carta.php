<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'mensaje' => 'Método no permitido.']);
    exit;
}

$entrada = json_decode(file_get_contents('php://input'), true);
if (!is_array($entrada)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'mensaje' => 'Los datos enviados no son válidos.']);
    exit;
}

$nombre = trim($entrada['nombre'] ?? '');
$edad = filter_var($entrada['edad'] ?? null, FILTER_VALIDATE_INT);
$mensaje = trim($entrada['mensaje'] ?? '');

if ($nombre === '' || mb_strlen($nombre) > 100 || !$edad || $edad < 1 || $edad > 120 || $mensaje === '' || mb_strlen($mensaje) > 5000) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'mensaje' => 'Revisa los datos: nombre, edad y carta son obligatorios.']);
    exit;
}

require_once __DIR__ . '/../config/database.php';

try {
    $sql = 'INSERT INTO cartas (nombre, edad, mensaje) VALUES (:nombre, :edad, :mensaje)';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['nombre' => $nombre, 'edad' => $edad, 'mensaje' => $mensaje]);
    echo json_encode(['ok' => true, 'mensaje' => '¡Tu carta se guardó correctamente en el buzón de Santa! 🎄', 'id' => (int)$pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'mensaje' => 'No se pudo guardar la carta. Revisa la configuración de la base de datos.']);
}
