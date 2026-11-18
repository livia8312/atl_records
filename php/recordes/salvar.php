<?php

session_start();
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/../conexao.php";

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["sucesso" => false, "mensagem" => "Não autenticado!"]);
    exit;
}

$modalidade = $_POST["modalidade"] ?? "";
$resultado = $_POST["resultado"] ?? "";
$data = $_POST["data"] ?? "";

$modalidades = ["100", "200", "400", "800", "1500", "altura", "distancia", "triplo", "peso", "disco", "dardo"];

if (!in_array($modalidade, $modalidades, true) || !is_numeric($resultado) || $resultado <= 0 || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $data)) {
    echo json_encode(["sucesso" => false, "mensagem" => "Dados inválidos!"]);
    exit;
}

if (in_array($modalidade, ["100", "200", "400"])) {
    $unidade = "Seg";
} elseif (in_array($modalidade, ["800", "1500"])) {
    $unidade = "Min";
} else {
    $unidade = "M";
}

try {
    $stmt = $conexao->prepare(
        "INSERT INTO recorde (id_usuario, modalidade, resultado, data_recorde, unidade)
         VALUES (?, ?, ?, ?, ?)"
    );

    $stmt->execute([
        $_SESSION["usuario_id"],
        $modalidade,
        $resultado,
        $data,
        $unidade
    ]);

    echo json_encode(["sucesso" => true, "mensagem" => "Recorde cadastrado!"]);

} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao salvar!"]);
}
