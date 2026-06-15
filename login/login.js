import { usuarios } from "../inicial/inicial.js";

const formulario = document.getElementById(".form-group");
formulario.addEventListener("submit", (event) => {
    if (formulario.senha.value !== formulario.confirmarSenha.value) {
        alert('As senhas não coincidem!')
    }
})