
<?php

session_start();

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/conexao.php";

if (!isset($_SESSION["usuario_email"])) {

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Nenhum usuário está logado."
    ]);

    exit;
}

$email = $_SESSION["usuario_email"];

$sql = "SELECT nome, email FROM usuario WHERE email = :email";

$comando = $conexao->prepare($sql);

$comando->execute([
    ":email" => $email
]);

$usuario = $comando->fetch(PDO::FETCH_ASSOC);

if (!$usuario) {

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Usuário não encontrado no banco."
    ]);

    exit;
}

echo json_encode([
    "sucesso" => true,
    "usuario" => $usuario
]);
