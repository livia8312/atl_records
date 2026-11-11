<?php

header("Content-Type: application/json; charset=utf-8");

try {

    require_once __DIR__ . "/conexao.php";

    $nome = $_POST["nome"] ?? "";
    $dataNascimento = $_POST["dataNascimento"] ?? "";
    $email = $_POST["email"] ?? "";
    $senha = $_POST["senha"] ?? "";

    if (
        empty($nome) ||
        empty($dataNascimento) ||
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

    $sql = "INSERT INTO usuarios
            (nome, data_nascimento, email, senha)
            VALUES (:nome, :data, :email, :senha)";

    $comando = $conexao->prepare($sql);

    $comando->execute([
        ":nome" => $nome,
        ":data" => $dataNascimento,
        ":email" => $email,
        ":senha" => $senhaHash
    ]);

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
