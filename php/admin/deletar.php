<?php
require __DIR__ . "/../conexao.php";
require __DIR__ . "/../sessao.php";
require __DIR__ . "/autenticacao.php";

header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $idEvento = filter_input(INPUT_GET, "id_evento", FILTER_VALIDATE_INT);
    
    // Valida se é um inteiro positivo válido
    if (!$idEvento || $idEvento <= 0) {
        http_response_code(400);
        echo json_encode(["sucesso" => false, "mensagem" => "ID de evento inválido."]);
        exit;
    }

    try {
        $stmt = $conexao->prepare("DELETE FROM evento WHERE id_evento = :id_evento");
        $stmt->execute([":id_evento" => $idEvento]);

        // Verifica se alguma linha foi realmente apagada
        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["sucesso" => false, "mensagem" => "Evento não encontrado."]);
            exit;
        }

        http_response_code(200);
        echo json_encode(["sucesso" => true, "mensagem" => "Evento excluído com sucesso."]);
        exit;

    } catch (PDOException $e) {
        // Código 23000 geralmente indica violação de chave estrangeira (ex: evento possui ingressos/participantes)
        if ($e->getCode() == "23000") {
            http_response_code(409); // Conflict
            echo json_encode(["sucesso" => false, "mensagem" => "Não é possível excluir este evento pois existem registros vinculados a ele."]);
            exit;
        }

        http_response_code(500);
        echo json_encode(["sucesso" => false, "mensagem" => "Erro interno ao excluir o evento."]);
        exit;
    }
}
