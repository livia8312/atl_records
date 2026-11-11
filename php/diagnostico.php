<?php

require_once "conexao.php";

echo "Banco: " . $conexao->query("SELECT DATABASE()")->fetchColumn();

echo "<br>Porta: " . $conexao->query("SELECT @@port")->fetchColumn();

echo "<br>Servidor: " . $conexao->query("SELECT @@hostname")->fetchColumn();