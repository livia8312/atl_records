<?php

header("Content-Type: application/json; charset=utf-8");

try {

    require_once __DIR__ . "/conexao.php";

    $email = $_POST["email"] ?? "";
    $senha = $_POST["senha"] ?? "";

    if (
        empty($email) ||
        empty($senha)
    ) {
        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Preencha todos os campos!"
        ]);
        exit;
    }

    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    $sql = "select senha from usuario where email = :email";

    $comando = $conn->prepare($sql);

    $comando->execute([
        ":email" => $email
    ]);

    $senhaBanco = $comando->fetchAll(PDO::FETCH_ASSOC);



    if($senhaHash !== $senhaBanco){
       echo json_encode([
        "sucesso" => false,
        "mensagem" => "Senha incorreta!"
    ]); 
    exit;
    }

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Cadastro realizado com sucesso!"
    ]);

} catch (PDOException $erro) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro no banco: " . $erro->getMessage()
    ]);
}
