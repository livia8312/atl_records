<?php
session_start();

if(!isset($_SESSION["usuario_id"])){
    http_response_code(401);
    echo json_encode([
        "sucess" => false,
        "mensagem" => "usuario nao logado"
    ]);
    exit;
}

$id_usuario = $_SESSION["usuario_id"];
$is_admin = $_SESSION["is_admin"];

if($is_admin){
    
}