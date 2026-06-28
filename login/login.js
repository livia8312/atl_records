import { showToast } from './toast.js';
import { loadFromLocalStorage, saveToLocalStorage } from "../inicial/inicial.js";

const usuarios = loadFromLocalStorage("cadastro");

const senhaLogin = document.querySelector("#senha");
const emailLogin = document.querySelector("#email");

// percorre cadastro

// compara email e senha com o que foi digitado´

const formulario = document.querySelector('form');
formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    if(senhaLogin.value === 'pablomedadez' && emailLogin.value === "admin@gmail.com") {
        window.location.href = '../admin/admin.html';
        return;
    }
    
    // carrega usuarios do ls
    const logado = usuarios.find(usuario => usuario.email === emailLogin.value && usuario.senha === senhaLogin.value);
    if(logado !== undefined) { 
        saveToLocalStorage("usuarioLogado", logado);
        showToast("Login realizado com sucesso!", "success");
        location.href = "../perfil2/perfil2.html";
    } else {
        formulario.reset();
        showToast("Email ou senha incorretos!", "error");
    }
});