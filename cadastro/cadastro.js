import { saveToLocalStorage } from "../inicial/inicial.js";

const formulario = document.querySelector("#formCadastro");

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const senha = formulario.elements.namedItem("senha").value;
    const confirmarSenha = formulario.elements.namedItem("confirmarSenha").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    const dados = new FormData(formulario);

    try {

        const resposta = await fetch("../php/cadastrar.php", {
            method: "POST",
            body: dados
        });

        const texto = await resposta.text();

        console.log("Status HTTP:", resposta.status);
        console.log("Resposta do PHP:", texto);

        let resultado;

        try {
            resultado = JSON.parse(texto);
        } catch {
            alert("O PHP não retornou uma resposta JSON válida. Confira o Console.");
            return;
        }

        if (!resposta.ok || !resultado.sucesso) {
            alert(resultado.mensagem);
            return;
        }

        const usuario = {
            nome: formulario.elements.namedItem("nome").value,
            dataNascimento: formulario.elements.namedItem("dataNascimento").value,
            email: formulario.elements.namedItem("email").value,
            records: [],
            conquistas: []
        };

        saveToLocalStorage("usuarioLogado", usuario);

        alert(resultado.mensagem);

        // Redirecionamento temporariamente desativado para o teste.
        // window.location.href = "../perfil2/perfil2.html?primeiroAcesso=true";

    } catch (erro) {

        console.error("Erro:", erro);
        alert("Não foi possível conectar ao servidor.");

    }

});
