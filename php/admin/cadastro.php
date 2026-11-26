<?php
header("Content-Type: application/json; charset=utf-8");
require_once __DIR__ . "/../conexao.php";
require __DIR__ . "/../sessao.php";
require __DIR__ . "/autenticacao.php";

$categoriasPermitidas = ["corridas", "saltos", "arremessos"];

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $nome = trim($_POST["nome"] ?? "");
        $categoria = $_POST["categoria"] ?? "";
        $data = $_POST["data"] ?? "";
        $descricao = trim($_POST["descricao"] ?? "");

        if ($nome === "" || strlen($nome) > 100 || !in_array($categoria, $categoriasPermitidas, true) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $data)) {
            http_response_code(400);
            echo json_encode(["sucesso" => false, "mensagem" => "Preencha nome, categoria e data corretamente."]);
            exit;
        }

        $stmt = $conexao->prepare("INSERT INTO evento (nome, categoria, data, descricao) VALUES (:nome, :categoria, :data, :descricao)");
        $stmt->execute([
            ":nome" => $nome,
            ":categoria" => $categoria,
            ":data" => $data,
            ":descricao" => $descricao
        ]);

        echo json_encode(["sucesso" => true, "mensagem" => "Evento criado."]);
        exit;
    }
    //caso tente outro que nao seja post
    http_response_code(405);
    echo json_encode(["sucesso" => false, "mensagem" => "Método não permitido."]);

} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao acessar os eventos."]);
}
