<?php
header("Content-Type: application/json; charset=utf-8");
require_once __DIR__ . "/../conexao.php";
require __DIR__ . "/../sessao.php";

try {
    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        $busca = $_GET["busca"] ?? "eventos";

        if ($busca === "eventos") {
            $stmt = $conexao->prepare(
                    "SELECT 
                        e.*, 
                        (i_user.id_inscricao IS NOT NULL) AS inscrito,
                        COUNT(i_total.id_inscricao) AS total_inscritos
                    FROM evento e
                    LEFT JOIN inscricao_evento_usuario i_user 
                        ON e.id_evento = i_user.id_evento 
                        AND i_user.id_usuario = ?
                    LEFT JOIN inscricao_evento_usuario i_total 
                        ON e.id_evento = i_total.id_evento
                    GROUP BY 
                        e.id_evento, 
                        i_user.id_inscricao");

        $stmt->execute([$id_usuario]);

        } elseif ($busca == "inscricoes") {
            $sql = "SELECT * FROM inscricao_evento_usuario where id_usuario = ?";
            $stmt = $conexao->prepare($sql);
            $stmt->execute([$id_usuario]);
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
