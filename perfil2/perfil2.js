import { loadFromLocalStorage, saveToLocalStorage } from "../inicial/inicial.js";
import { verificarConquistas } from "../conquistas/sistemaConquistas.js";


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

document.querySelector(".stats .orange h2").textContent = usuarioLogado.records ? usuarioLogado.records.length : 0;


// atualiza o card de conquistas
const totalConquistas = usuarioLogado.conquistas ? usuarioLogado.conquistas.length: 0;
document.querySelector(".stats .navy h2").textContent = totalConquistas;

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

function adicionarRecord(OBJ) {
    console.log('ssada')
    if (['100', '200', '400'].includes(OBJ.modalidade)) {
        OBJ.unidade = 'Seg';
    } else if (['800', '1500'].includes(OBJ.modalidade)) {
        OBJ.unidade = 'Min';
    } else {
        OBJ.unidade = 'M';
    }

    const usuarioLogado = loadFromLocalStorage('usuarioLogado');
    if (!usuarioLogado) return;

    if (!usuarioLogado.records) {
        usuarioLogado.records = [];
    }

    usuarioLogado.records.push(OBJ);
    saveToLocalStorage('usuarioLogado', usuarioLogado);

    const cadastro = loadFromLocalStorage('cadastro') || [];

    const indice = cadastro.findIndex(usuario =>
        usuario.email === usuarioLogado.email
    );

    if (indice !== -1) {
        cadastro[indice] = usuarioLogado;
        saveToLocalStorage('cadastro', cadastro);
    }

    verificarConquistas(usuarioLogado);
}

const registro = document.querySelector('#modalEvento');

registro.addEventListener("submit", (ev) => {
    ev.preventDefault();

    adicionarRecord({
        modalidade: document.querySelector('#idDoInputModalidade').value,
        resultado: document.querySelector('#idDoInputResultado').value,
        data: document.querySelector('#idDoInputData').value,
        unidade: null
    });

    fecharModal();
});
