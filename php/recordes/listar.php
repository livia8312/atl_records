<?php

session_start();
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/../conexao.php";

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["sucesso" => false, "mensagem" => "Não autenticado!"]);
    exit;
}

try {
    $stmt = $conexao->prepare(
        "SELECT id_recorde, modalidade, resultado, data_recorde, unidade
         FROM recorde
         WHERE id_usuario = ?
         ORDER BY data_recorde DESC"
    );

    $stmt->execute([$_SESSION["usuario_id"]]);

    $recordes = $stmt->fetchAll();

    echo json_encode([
        "sucesso" => true,
        "recordes" => $recordes
    ]);

} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao buscar recordes!"]);
}
