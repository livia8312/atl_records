
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

    //Se o e-mail existir no banco: $usuario vira um array associativo onde cada chave é o nome da coluna da sua tabela
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

    //cria variavel dentro da sessao
    $_SESSION["usuario_id"] = $usuario["id_usuario"];
    $_SESSION["is_admin"] = $usuario["is_admin"];

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Login realizado com sucesso!"
    ]);
} catch (PDOException $erro) {
    
//envia esse numero pro console caso de algum erro ao executar/conectar com o banco de dados
    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro no banco de dados."
    ]);

}
