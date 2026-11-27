<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'mensaje' => 'Método no permitido.']);
    exit;
}

require_once __DIR__ . '/../config/database.php';

try {
    // Muestra la carta más reciente. Así se conserva el comportamiento de consulta sencilla del proyecto.
    $stmt = $pdo->query('SELECT id, nombre, edad, mensaje, fecha_envio FROM cartas ORDER BY id DESC LIMIT 1');
    $carta = $stmt->fetch();

    if (!$carta) {
        echo json_encode(['ok' => true, 'hayCarta' => false]);
        exit;
    }

    echo json_encode(['ok' => true, 'hayCarta' => true, 'carta' => $carta]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'mensaje' => 'No se pudieron consultar las cartas. Revisa la base de datos.']);
}
