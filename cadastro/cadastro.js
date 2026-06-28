import { loadFromLocalStorage, saveToLocalStorage } from "../inicial/inicial.js";


const usuarios = loadFromLocalStorage("cadastro");

const formulario = document.querySelector('form')
formulario.addEventListener('submit', (event) => {
    const usuarios = loadFromLocalStorage('cadastro');

    if (formulario.senha.value !== formulario.confirmarSenha.value) {
        alert('As senhas não coincidem!');
        return;
    }

    if(usuarios.find(user => user.email === formulario.email.value)) {
        alert('Usuário já cadastrado');
        return;
    }

    event.preventDefault()
    let usuario = {
        nome: formulario.nome.value,
        dataNascimento: formulario.dataNascimento.value,
        email: formulario.email.value,
        senha: formulario.senha.value,
        confirmarSenha: formulario.confirmar-senha.value,
        records: [],
    }

    usuarios.push(usuario)
    // localStorage.setItem("usuarios", JSON.stringify(usuarios));
    saveToLocalStorage("usuarioLogado", usuario);
    saveToLocalStorage("cadastro", usuarios);

    console.log(localStorage.getItem("usuarios"))

    /* queryParam 'primeiroAcesso' pra fazer a validação de exibição da mensagem de boas vindas.
        * ex: primeiroAcesso == true \ Bem vindo, fulano!
        * ex: primeiroAcesso == undefined | Bem vindo de volta, fulano!
    */
    window.location.href = "../perfil2/perfil2.html?primeiroAcesso=true"
})