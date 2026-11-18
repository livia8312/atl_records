<?php

session_start();

header("Content-Type: application/json; charset=utf-8");

// Limpar os dados da sessão
$_SESSION = [];

// Apagar o cookie da sessão
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();

    setcookie(
        session_name(),
        "",
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// Destruir a sessão
session_destroy();

echo json_encode([
    "sucesso" => true,
    "mensagem" => "Logout realizado com sucesso!"
]);