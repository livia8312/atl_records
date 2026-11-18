<?php

session_start();

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/conexao.php";

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Nenhum usuário está logado."
    ]);
    exit;
}

$sql = "SELECT nome, email FROM usuario WHERE id_usuario = :id";

$comando = $conexao->prepare($sql);

$comando->execute([
    ":id" => $_SESSION["usuario_id"]
]);

$usuario = $comando->fetch();

if (!$usuario) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Usuário não encontrado."
    ]);
    exit;
}

echo json_encode([
    "sucesso" => true,
    "usuario" => $usuario
]);
