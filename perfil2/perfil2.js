
import { loadFromLocalStorage } from "../inicial/inicial.js";

// Carregar usuário logado
const usuarioLogado = loadFromLocalStorage("usuarioLogado");

if (!usuarioLogado) {
    console.error("Nenhum usuário está logado.");
} else {

    // Exibir nome do usuário
    const nomeUsuario = document.querySelector("#nome-usuario");
    const nomeCabecalho = document.querySelector("#nome-usuario-cabecario");

    if (nomeUsuario) {
        nomeUsuario.textContent = usuarioLogado.nome;
    }

    if (nomeCabecalho) {
        nomeCabecalho.textContent = usuarioLogado.nome;
    }

    // Verificar primeiro acesso
    const parametrosDaUrl = new URLSearchParams(window.location.search);

    if (parametrosDaUrl.has("primeiroAcesso")) {
        const textoBemVindo = document.querySelector("#texto-bem-vindo");

        if (textoBemVindo) {
            textoBemVindo.textContent = "Bem-vindo";
        }
    }

    // Contar registros e conquistas
    const totalRecords = usuarioLogado.records?.length ?? 0;
    const totalConquistas = usuarioLogado.conquistas?.length ?? 0;

    console.log("Usuário carregado:", usuarioLogado.nome);
    console.log("Total de registros:", totalRecords);
    console.log("Total de conquistas:", totalConquistas);
}
