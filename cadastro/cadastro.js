import { usuarios } from "../inicial/inicial.js";

const formulario = document.querySelector('form')
formulario.addEventListener('submit', (event) => {

    if (formulario.senha.value !== formulario.confirmarSenha.value) {
        alert('As senhas não coincidem!')
    }

    event.preventDefault()
    let usuario = {
        nome: formulario.nome.value,
        dataNascimento: formulario.dataNascimento.value,
        email: formulario.email.value,
        senha: formulario.senha.value,
        confirmarSenha: formulario.confirmar-senha.value,
    }

    usuarios.push(usuario)
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    console.log(localStorage.getItem("usuarios"))

    window.location.href = "../perfil2/perfil2.html"
})