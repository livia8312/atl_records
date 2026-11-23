
import { showToast } from './toast.js';

const senhaLogin = document.querySelector("#senha");
const emailLogin = document.querySelector("#email");

const formulario = document.querySelector("form");

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const dados = new FormData(formulario);
    const resposta = await fetch("login.php", {
        method: "POST",
        body: dados
    });

    const resultado = await resposta.text();

    if (!resposta.ok || !resultado.sucesso) {
        showToast(
            resultado.mensagem || "Não foi possível realizar o login.",
            "error"
        );
        return;
    }

    showToast("Login realizado com sucesso!", "success");

    window.location.href = "../perfil2/perfil2.html";
});

// Mostrar ou esconder senha
const toggle = document.getElementById("toggle");

toggle.addEventListener("click", () => {

    if (senhaLogin.type === "password") {
        senhaLogin.type = "text";
        toggle.classList.replace("fa-eye", "fa-eye-slash");

    } else {
        senhaLogin.type = "password";
        toggle.classList.replace("fa-eye-slash", "fa-eye");
    }

});
