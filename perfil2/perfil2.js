
async function carregarPerfil() {

    try {

        const resposta = await fetch("../php/perfil.php", {
            method: "GET",
            credentials: "same-origin"
        });

        //Lê o corpo da resposta enviada pelo PHP (echo json_encode(...)) e converte o texto JSON em um objeto JavaScript manipulável dentro da constante resultado.
        const resultado = await resposta.json();

        console.log("Resposta do perfil:", resultado);

        if (!resposta.ok || !resultado.sucesso) {
            console.error("Erro:", resultado.mensagem);
            return;
        }
        
        //Extrai o objeto usuario (que contém nome e email) de dentro de resultado para facilitar o acesso nas próximas linhas
        const usuarioLogado = resultado.usuario;

        const nomeUsuario = document.querySelector("#nome-usuario");
        const nomeCabecalho = document.querySelector(
            "#nome-usuario-cabecario"
        );

        if (nomeUsuario) {
            nomeUsuario.textContent = usuarioLogado.nome;
        }

        if (nomeCabecalho) {
            nomeCabecalho.textContent = usuarioLogado.nome;
        }

        const parametrosDaUrl = new URLSearchParams(
            window.location.search
        );

        if (parametrosDaUrl.has("primeiroAcesso")) {

            const textoBemVindo = document.querySelector(
                "#texto-bem-vindo"
            );

            if (textoBemVindo) {
                textoBemVindo.textContent = "Bem-vindo";
            }
        }

        console.log("Usuário carregado:", usuarioLogado.nome);

    } catch (erro) {

        console.error("Erro ao carregar perfil:", erro);

    }

}

carregarPerfil();
// Fazer logout
const btnLogout = document.querySelector("#btnLogout");

if (btnLogout) {
    btnLogout.addEventListener("click", async () => {

        try {
            const resposta = await fetch("../php/logout.php", {
                method: "POST",
                credentials: "same-origin"
            });

            const resultado = await resposta.json();

            if (resultado.sucesso) {
                window.location.href = "../inicial/inicial.html";
            } else {
                alert("Não foi possível sair da conta.");
            }

        } catch (erro) {
            console.error("Erro ao sair:", erro);
            alert("Erro ao encerrar a sessão!");
        }

    });
}