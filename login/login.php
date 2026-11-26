<?php

session_start();
header("Content-Type: application/json; charset=utf-8");

// Garante que a requisição seja apenas POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Método não permitido."
    ]);
    exit;
}

try {
    require_once __DIR__ . "/../php/conexao.php";

    // Suporta tanto envio via FormData ($_POST) quanto via JSON (fetch com body JSON)
    $dados = $_POST;
    if (empty($dados)) {
        $json = json_decode(file_get_contents("php://input"), true);
        if (is_array($json)) {
            $dados = $json;
        }
    }

    $email = trim($dados["email"] ?? "");
    $senha = $dados["senha"] ?? "";

    if (empty($email) || empty($senha)) {
        http_response_code(400); // Bad Request
        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Preencha todos os campos!"
        ]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Formato de e-mail inválido!"
        ]);
        exit;
    }

    // Busca apenas as colunas necessárias
    $sql = "SELECT id_usuario, senha, is_admin 
            FROM usuario 
            WHERE email = :email 
            LIMIT 1";

    $comando = $conexao->prepare($sql);
    $comando->execute([":email" => $email]);
    $usuario = $comando->fetch(PDO::FETCH_ASSOC);

    if (!$usuario || !password_verify($senha, $usuario["senha"])) {
        http_response_code(401); // Unauthorized
        echo json_encode([
            "sucesso" => false,
            "mensagem" => "E-mail ou senha incorretos!"
        ]);
        exit;
    }

    // Regenera o ID da sessão para evitar Session Fixation
    session_regenerate_id(true);

    $_SESSION["usuario_id"] = $usuario["id_usuario"];
    $_SESSION["is_admin"] = (bool) $usuario["is_admin"];

    http_response_code(200);
    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Login realizado com sucesso!",
        "is_admin" => $_SESSION["is_admin"] // Útil caso o JS precise redirecionar para painéis diferentes
    ]);

} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro interno no servidor."
    ]);
}
