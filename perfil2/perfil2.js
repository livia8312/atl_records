import { loadFromLocalStorage, saveToLocalStorage } from "../inicial/inicial.js";

const stringDeBuscaDaUrl = window.location.search; // procura o parametro de busca da url e guarda isso como string;
 
const parametrosDaUrl = new URLSearchParams(stringDeBuscaDaUrl); // objeto do tipo URLSearchParams (.get, .set, .delete, ...);

if(parametrosDaUrl.has('primeiroAcesso')) { //verifica se é a primeira vez que algum parametro de url aparece;

    const textoBemVindo = document.querySelector('#texto-bem-vindo'); //seleciona o id do texto `bem vindo de volta`;
    
    textoBemVindo.textContent = 'Bem vindo'; //altera o texto para bem vindo, caso seja a primeira vez que aquele parametro da url é acessado;
} 

const usuarioLogado = loadFromLocalStorage('usuarioLogado');
document.querySelector('#nome-usuario').textContent = usuarioLogado.nome;

    document.querySelector('#nome-usuario-cabecario').textContent = usuarioLogado.nome;

function abrirModal() {
    document.getElementById("modal").style.display = "block";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}