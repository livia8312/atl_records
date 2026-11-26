<?php
header("Content-Type: application/json; charset=utf-8");
require_once __DIR__ . "/../conexao.php";

$categoriasPermitidas = ["corridas", "saltos", "arremessos"];

try {
    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        $busca = $_GET["busca"] ?? "all";

        if ($busca === "all") {
            $stmt = $conexao->query("SELECT * FROM evento ORDER BY data, id_evento");
        } elseif (in_array($busca, $categoriasPermitidas, true)) {
            $stmt = $conexao->prepare("SELECT * FROM evento WHERE categoria = :categoria ORDER BY data, id_evento");
            $stmt->execute([":categoria" => $busca]);
        } else {
            http_response_code(400);
            echo json_encode(["sucesso" => false, "mensagem" => "Categoria de busca inválida."]);
            exit;
        }

        echo json_encode(["sucesso" => true, "dados" => $stmt->fetchAll()]);
        exit;
    }
    
    http_response_code(405);
    echo json_encode(["sucesso" => false, "mensagem" => "Método não permitido."]);
} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao acessar os eventos."]);
}
