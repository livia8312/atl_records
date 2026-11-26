<<?php
header("Content-Type: application/json; charset=utf-8");
require_once __DIR__ . "/../conexao.php";
require __DIR__ . "/../sessao.php";

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // 1. Verifica se os dados foram enviados
        if (empty($_POST["id_evento"]) || empty($_POST["nome_evento"])) {
            http_response_code(400);
            echo json_encode([
                "sucesso" => false,
                "mensagem" => "Dados do evento incompletos."
            ]);
            exit;
        }

        // 2. Busca o evento
        $sql = "SELECT * FROM evento WHERE id_evento = ? AND nome = ?";
        $stmt = $conexao->prepare($sql);
        $stmt->execute([$_POST["id_evento"], $_POST["nome_evento"]]);
        $resultado = $stmt->fetch();

        if (!$resultado) {
            http_response_code(404);
            echo json_encode([
                "sucesso" => false, 
                "mensagem" => "Evento selecionado não existe."
            ]);
            exit;
        }

        $sql = "SELECT * FROM inscricao_evento_usuario WHERE id_evento = ? AND id_usuario = ?";
        $stmt = $conexao->prepare($sql);
        $stmt->execute([$_POST["id_evento"], $id_usuario]);
        $resultado = $stmt->fetch();

        if(!$resultado){
            http_response_code(409);
            echo json_encode([
                "sucesso" => false, 
                "mensagem" => "usuario nao esta inscrito neste evento"
            ]);
            exit;
        }


        // 3. Insere a inscrição (VALUES no plural)
        $sql = "DELETE FROM inscricao_evento_usuario WHERE id_evento = ? AND id_usuario = ?";
                
        $stmt = $conexao->prepare($sql);
        $stmt->execute([$_POST["id_evento"], $id_usuario]);

        http_response_code(201);
        echo json_encode([
            "sucesso" => true, 
            "mensagem" => "desinscricao realizada com sucesso"
        ]);
        exit;
    }
    
    http_response_code(405);
    echo json_encode(["sucesso" => false, "mensagem" => "Método não permitido."]);

} catch (PDOException $erro) {
}
