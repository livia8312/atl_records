import { loadFromLocalStorage, saveToLocalStorage } from "../inicial/inicial.js";

const usuarios = loadFromLocalStorage("cadastro");

const senhaLogin = document.querySelector("#senha");
const emailLogin = document.querySelector("#email");

// percorre cadastro

// compara email e senha com o que foi digitado


const formulario = document.querySelector('form');
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // carrega usuarios do ls
    const logado = usuarios.find(usuario => usuario.email === emailLogin.value && usuario.senha === senhaLogin.value);
    if(logado !== undefined) { 
        saveToLocalStorage("usuarioLogado", logado);
        //toast de sucesso
        location.href = "../perfil2/perfil2.html";
    } else {
        formulario.reset();
        //toast de erro
    }
});