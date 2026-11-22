
<?php

session_start();

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/../conexao.php";

// Verifica se o usuário está logado
if (!isset($_SESSION["usuario_id"])) {
    http_response_code(401);

    echo json_encode([
        "erro" => true,
        "mensagem" => "Usuário não está logado."
    ]);

    exit;
}

$idUsuario = $_SESSION["usuario_id"];

// Modalidades de cada categoria
$modalidadesCorrida = ["100", "200", "400", "800", "1500"];

$modalidadesSaltos = ["altura", "distancia", "triplo"];

$modalidadesArremessos = ["peso", "disco", "dardo"];

// Conta os recordes do usuário
function contarRecordes($conexao, $idUsuario, $modalidades = null) {

    if ($modalidades === null) {

        $sql = "SELECT COUNT(*) FROM recorde
                WHERE id_usuario = ?";

        $consulta = $conexao->prepare($sql);
        $consulta->execute([$idUsuario]);

    } else {

        $marcadores = implode(",", array_fill(0, count($modalidades), "?"));

        $sql = "SELECT COUNT(*) FROM recorde
                WHERE id_usuario = ?
                AND modalidade IN ($marcadores)";

        $consulta = $conexao->prepare($sql);

        $consulta->execute(array_merge([$idUsuario], $modalidades));
    }

    return (int) $consulta->fetchColumn();
}

// Busca as quantidades
$totalRecordes = contarRecordes($conexao, $idUsuario);

$totalCorridas = contarRecordes($conexao, $idUsuario, $modalidadesCorrida);

$totalSaltos = contarRecordes($conexao, $idUsuario, $modalidadesSaltos);

$totalArremessos = contarRecordes($conexao, $idUsuario, $modalidadesArremessos);



// Lista de conquistas e suas condições
$definicoesConquistas = [

    [
        "id" => "primeiro-passo",
        "titulo" => "Primeiro Passo",
        "descricao" => "Registre seu primeiro recorde!",
        "categoria" => "⭐ Geral",
        "icone" => "⚡",
        "tipo" => "bronze",
        "desbloqueada" => $totalRecordes >= 1
    ],

    [
        "id" => "atleta-dedicado",
        "titulo" => "Atleta Dedicado",
        "descricao" => "Registre 10 recordes!",
        "categoria" => "⭐ Geral",
        "icone" => "🏃",
        "tipo" => "prata",
        "desbloqueada" => $totalRecordes >= 10
    ],

    [
        "id" => "colecionador",
        "titulo" => "Colecionador",
        "descricao" => "Registre 25 recordes!",
        "categoria" => "⭐ Geral",
        "icone" => "🏆",
        "tipo" => "ouro",
        "desbloqueada" => $totalRecordes >= 25
    ],

    [
        "id" => "lenda",
        "titulo" => "Lenda do AtlRecords",
        "descricao" => "Registre 50 recordes!",
        "categoria" => "⭐ Geral",
        "icone" => "👑",
        "tipo" => "diamante",
        "desbloqueada" => $totalRecordes >= 50
    ],

    [
        "id" => "corredor",
        "titulo" => "Corredor",
        "descricao" => "Registre 5 recordes de corrida!",
        "categoria" => "🏃 Corridas",
        "icone" => "⚡",
        "tipo" => "bronze",
        "desbloqueada" => $totalCorridas >= 5
    ],

    [
        "id" => "especialista-corrida",
        "titulo" => "Especialista",
        "descricao" => "Registre 15 recordes de corrida!",
        "categoria" => "🏃 Corridas",
        "icone" => "🔥",
        "tipo" => "ouro",
        "desbloqueada" => $totalCorridas >= 15
    ],

    [
        "id" => "saltador",
        "titulo" => "Saltador",
        "descricao" => "Registre 5 recordes de salto!",
        "categoria" => "🤸 Saltos",
        "icone" => "🤸",
        "tipo" => "bronze",
        "desbloqueada" => $totalSaltos >= 5
    ],

    [
        "id" => "mestre-dos-saltos",
        "titulo" => "Mestre dos Saltos",
        "descricao" => "Registre 15 recordes de salto!",
        "categoria" => "🤸 Saltos",
        "icone" => "⭐",
        "tipo" => "ouro",
        "desbloqueada" => $totalSaltos >= 15
    ],

    [
        "id" => "primeiro-arremesso",
        "titulo" => "Primeiro Arremesso",
        "descricao" => "Registre seu primeiro recorde de arremesso!",
        "categoria" => "🥏 Arremessos",
        "icone" => "🥏",
        "tipo" => "bronze",
        "desbloqueada" => $totalArremessos >= 1
    ],

    [
        "id" => "arremessador",
        "titulo" => "Arremessador",
        "descricao" => "Registre 10 recordes de arremesso!",
        "categoria" => "🥏 Arremessos",
        "icone" => "💪",
        "tipo" => "prata",
        "desbloqueada" => $totalArremessos >= 10
    ],

    [
        "id" => "atleta-completo",
        "titulo" => "Atleta Completo",
        "descricao" => "Tenha recordes em todas as categorias!",
        "categoria" => "⭐ Geral",
        "icone" => "🌎",
        "tipo" => "diamante",
        "desbloqueada" =>
            $totalCorridas >= 1 &&
            $totalSaltos >= 1 &&
            $totalArremessos >= 1
    ]

];



// Contar conquistas desbloqueadas
$quantidadeDesbloqueadas = 0;

foreach ($definicoesConquistas as $conquista) {

    if ($conquista["desbloqueada"]) {
        $quantidadeDesbloqueadas++;
    }

}

// Calcular porcentagem de conclusão
$totalConquistas = count($definicoesConquistas);

$porcentagem = round(
    ($quantidadeDesbloqueadas / $totalConquistas) * 100
);

// Enviar resultado para o JavaScript
echo json_encode([
    "conquistas" => $definicoesConquistas,
    "quantidade" => $quantidadeDesbloqueadas,
    "total" => $totalConquistas,
    "porcentagem" => $porcentagem
], JSON_UNESCAPED_UNICODE);
