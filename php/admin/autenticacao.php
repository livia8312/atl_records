<?php
    if(!$is_admin){
        http_response_code(401);
        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Usuário nao e um admin"
        ]);
        exit;
    }