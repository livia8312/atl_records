
<?php

session_start();

header("Content-Type: application/json; charset=utf-8");

try {

    require_once __DIR__ . "/../php/conexao.php";

    $email = $_POST["email"] ?? "";
    $senha = $_POST["senha"] ?? "";

    if (empty($email) || empty($senha)) {
        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Preencha todos os campos!"
        ]);
        exit;
    }

    // Buscar usuário pelo e-mail
    $sql = "SELECT *
            FROM usuario
            WHERE email = :email";

    $comando = $conexao->prepare($sql);

    $comando->execute([
        ":email" => $email
    ]);

    $usuario = $comando->fetch();

    if (!$usuario || !password_verify($senha, $usuario["senha"])) {
        echo json_encode([
            "sucesso" => false,
            "mensagem" => "E-mail ou senha incorretos!"
        ]);
        exit;
    }

    // Criar sessão do usuário
    session_regenerate_id(true);

    $_SESSION["usuario_id"] = $usuario["id_usuario"];
    $_SESSION["is_admin"] = $usuario["is_admin"];

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Login realizado com sucesso!"
    ]);
} catch (PDOException $erro) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro no banco de dados."
    ]);

}
