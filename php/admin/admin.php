<?php
require __DIR__ . "/../conexao.php";

if($_SERVER["REQUEST_METHOD"] == "GET"){
    switch ($_GET["busca"]) {
        case 'all':
            $sql = 
            "SELECT * FROM evento";
            break;
        case 'corridas':
            $sql = 
            "SELECT * FROM eventos where categoria = 'corridas'";
            break;
            
        case 'saltos':
            $sql = 
            "SELECT * FROM eventos where categoria = 'saltos'";
            break;
            
            case 'arremessos':
        $sql = 
        "SELECT * FROM eventos where categoria = 'arremessos'";
        break;
        
        default:
        # code...
        break;
    }
        
    $stmt = $conexao->prepare($sql);
    $stmt->execute();
    $resposta = $stmt->fetchAll();
}