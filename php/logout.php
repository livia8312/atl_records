<?php

session_start();

header("Content-Type: application/json; charset=utf-8");

// Limpar os dados da sessão
$_SESSION = [];

// Destruir a sessão
session_destroy();

echo json_encode([
    "sucesso" => true,
    "mensagem" => "Logout realizado com sucesso!"
]);