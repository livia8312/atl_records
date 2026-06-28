import { loadFromLocalStorage, saveToLocalStorage } from "../inicial/inicial.js";
import { verificarConquistas } from "../conquistas/sistemaConquistas.js";

const corridasList = document.getElementById("corridasList");
const saltosList = document.getElementById("saltosList");
const arremessosList = document.getElementById("arremessosList");


function exibirRecords() {
    const usuarioLogado = loadFromLocalStorage('usuarioLogado')

    // exibe a contagem
    document.querySelector('.stats .total h2').textContent = usuarioLogado.records.length

    let corrida = usuarioLogado.records.filter(r => ['100', '200', '400', '800', '1500'].includes(r.modalidade))
    document.querySelector('.stats .corrida h2').textContent = corrida.length

    let arremesso = usuarioLogado.records.filter(r => ['disco', 'dardo', 'peso'].includes(r.modalidade))
    document.querySelector('.stats .arremesso h2').textContent = arremesso.length

    let salto = usuarioLogado.records.filter(r => ['distancia', 'triplo', 'altura'].includes(r.modalidade))
    document.querySelector('.stats .salto h2').textContent = salto.length

    // limpa tudo antes
    corridasList.innerHTML = "";
    saltosList.innerHTML = "";
    arremessosList.innerHTML = "";

    usuarioLogado.records.forEach((record) => {

        const div = document.createElement("div");
        div.classList.add("record-item");

        div.innerHTML = `
            <strong>${record.modalidade}</strong>
            <p>${record.resultado} ${record.unidade}</p>
            <small>${record.data}</small>
        `;

        if (['100', '200', '400', '800', '1500'].includes(record.modalidade)) {
            corridasList.appendChild(div)
            corridasList.style.display = 'grid';
        } else if (['altura', 'distancia', 'triplo'].includes(record.modalidade)) {
            saltosList.appendChild(div)
            saltosList.style.display = 'grid';
        } else if (['peso', 'disco', 'dardo'].includes(record.modalidade)) {
            arremessosList.appendChild(div)
            arremessosList.style.display = 'grid';
        }

    });

    return fecharModal();
}

function adicionarRecord(OBJ) {

    if (['100', '200', '400'].includes(OBJ.modalidade)) {
        OBJ.unidade = 'Seg'
    } else if (['800', '1500'].includes(OBJ.modalidade)) {
        OBJ.unidade = 'Min'
    } else {
        OBJ.unidade = 'M'
    }

    const usuarioLogado = loadFromLocalStorage('usuarioLogado');

    // adiciona novo registro
    usuarioLogado.records.push(OBJ);

    // atualiza o usuario logado
    saveToLocalStorage('usuarioLogado', usuarioLogado);

    // atualiza o usario no cadastro
    const cadastro = loadFromLocalStorage('cadastro');

    const indice = cadastro.findIndex(usuario =>
        usuario.email === usuarioLogado.email
    );

    if (indice !== -1) {
        cadastro[indice] = usuarioLogado;
        saveToLocalStorage('cadastro', cadastro);
    }
    // verifica se o usuario desbloqueou alguma conquista
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

    exibirRecords()
});

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
    if (e.target === modal) {
        fecharModal();
    }
});

function abrirModal() {
    document.getElementById("modalEvento").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalEvento").style.display = "none";
}

exibirRecords();