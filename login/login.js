
import { showToast } from './toast.js';

const senhaLogin = document.querySelector("#senha");
const emailLogin = document.querySelector("#email");

const formulario = document.querySelector("form");

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    // Acesso administrativo
    if (
        senhaLogin.value === "pablomedadez" &&
        emailLogin.value === "admin@gmail.com"
    ) {
        window.location.href = "../admin/admin.html";
        return;
    }

    const dados = new FormData(formulario);

    try {

        const resposta = await fetch("login.php", {
            method: "POST",
            body: dados
        });

        const texto = await resposta.text();

console.log("Status HTTP:", resposta.status);
console.log("Resposta do PHP:", texto);

let resultado;

try {
    resultado = JSON.parse(texto);
} catch (erro) {
    console.error("Erro ao converter JSON:", erro);
    alert("O PHP não retornou JSON válido. Confira o Console.");
    return;
}

        showToast("Login realizado com sucesso!", "success");

        window.location.href = "../perfil2/perfil2.html";

    } catch (erro) {

        console.error("ERRO COMPLETO:", erro);

    alert("Erro na comunicação: " + erro.message);

    }

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
