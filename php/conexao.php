<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "atl_records";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // lança exceção quando o SQL falha
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // devolve array associativo
];

try {
    $conn = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $user,
        $password,
        $options
    );
}
catch (PDOException $error) {
    // Sem conexão não dá para continuar: devolve JSON em vez de uma página de erro.
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode([
        "error" => true,
        "message" => "Erro ao conectar no banco de dados",
    ]);
    exit;
}