import { showToast } from './toast.js';

const senhaLogin = document.querySelector("#senha");
const emailLogin = document.querySelector("#email");
const formulario = document.querySelector("form");
const botaoSubmit = formulario.querySelector("button[type='submit']");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Evita múltiplos cliques enquanto carrega
    if (botaoSubmit) botaoSubmit.disabled = true;

    try {
        const dados = new FormData(formulario);

        const resposta = await fetch('login.php', {
            method: 'POST',
            body: dados
        });

        let resultado;
        try {
            resultado = await resposta.json();
        } catch {
            throw new Error("O servidor retornou uma resposta inválida.");
        }

        if (!resposta.ok || !resultado.sucesso) {
            showToast(
                resultado.mensagem || "Não foi possível realizar o login.",
                "error"
            );
            return;
        }

        showToast(resultado.mensagem || "Login realizado com sucesso!", "success");

        // Aguarda 1 segundo para o usuário ver o toast antes de redirecionar
        setTimeout(() => {
            if (Boolean(Number(resultado.is_admin)) || resultado.is_admin === true) {
                window.location.href = '../admin/admin.html';
            } else {
                window.location.href = '../perfil2/perfil2.html';
            }
        }, 1000);

    } catch (erro) {
        console.error("Erro no login:", erro);
        showToast("Erro de conexão com o servidor.", "error");
    } finally {
        // Reabilita o botão caso ocorra algum erro
        if (botaoSubmit) botaoSubmit.disabled = false;
    }
});

// Mostrar ou esconder senha
const toggle = document.getElementById("toggle");

if (toggle && senhaLogin) {
    toggle.addEventListener("click", () => {
        const isPassword = senhaLogin.type === "password";
        senhaLogin.type = isPassword ? "text" : "password";
        toggle.classList.toggle("fa-eye", !isPassword);
        toggle.classList.toggle("fa-eye-slash", isPassword);
    });
}
