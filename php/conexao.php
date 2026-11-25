<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "atl_records";
$port = "3306";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // lança exceção quando o SQL falha
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // devolve array associativo
];

try {
    $conexao = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
        // "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $user,
        $password,
        $options
    );
} catch (PDOException $error) {
    http_response_code(500);

    header("Content-Type: application/json");

    echo json_encode([
        "error" => true,
        "message" => "Erro ao conectar no banco de dados",
        "detalhe" => $error->getMessage()
    ]);

    exit;
}