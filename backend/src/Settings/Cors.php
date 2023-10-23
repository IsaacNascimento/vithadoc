<?php

namespace Cors;

require dirname(__DIR__, 2) . '/vendor/autoload.php';

$allowedOrigins = [
    "http://localhost:3000",  // Adicione as origens que você deseja permitir
];

// Verifica se a origem da solicitação está na lista de origens permitidas
if (in_array($_SERVER["HTTP_ORIGIN"], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER["HTTP_ORIGIN"]);
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

// Se a solicitação for do tipo OPTIONS, responda e saia
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("HTTP/1.1 200 OK");
    exit;
}
