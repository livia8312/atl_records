<?php

session_start();
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/../conexao.php";

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Não autenticado!"
    ]);
    exit;
}

$id = $_POST["id"] ?? "";

if (!is_numeric($id) || $id <= 0) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "ID inválido!"
    ]);
    exit;
}

try {
    $stmt = $conexao->prepare(
        "DELETE FROM recorde
         WHERE id_recorde = ? AND id_usuario = ?"
    );

    $stmt->execute([
        $id,
        $_SESSION["usuario_id"]
    ]);

    echo json_encode([
        "sucesso" => $stmt->rowCount() > 0,
        "mensagem" => "Recorde excluído!"
    ]);

} catch (PDOException $erro) {
    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao excluir recorde!"
    ]);
}
