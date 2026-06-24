import { loadFromLocalStorage, saveToLocalStorage } from "../inicial/inicial.js";
console.log('perfil2.js carregado');
const stringDeBuscaDaUrl = window.location.search; // procura o parametro de busca da url e guarda isso como string;
 
const parametrosDaUrl = new URLSearchParams(stringDeBuscaDaUrl); // objeto do tipo URLSearchParams (.get, .set, .delete, ...);

if(parametrosDaUrl.has('primeiroAcesso')) { //verifica se é a primeira vez que algum parametro de url aparece;

    const textoBemVindo = document.querySelector('#texto-bem-vindo'); //seleciona o id do texto `bem vindo de volta`;
    
    textoBemVindo.textContent = 'Bem vindo'; //altera o texto para bem vindo, caso seja a primeira vez que aquele parametro da url é acessado;
} 

const usuarioLogado = loadFromLocalStorage('usuarioLogado');
document.querySelector('#nome-usuario').textContent = usuarioLogado.nome;

    document.querySelector('#nome-usuario-cabecario').textContent = usuarioLogado.nome;



const modal = document.getElementById("modalEvento");

document.getElementById("abrirModal")
    .addEventListener("click", () => {
        abrirModal();
    });

document.getElementById("fecharModal")
    .addEventListener("click", () => {
        fecharModal();
    });

document.getElementById("cancelar")
    .addEventListener("click", () => {
        fecharModal();
    });

modal.addEventListener("click", (e) => {
    if(e.target === modal){
        fecharModal();
    }
});
function abrirModal() {
    document.getElementById("modalEvento").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalEvento").style.display = "none";
}
