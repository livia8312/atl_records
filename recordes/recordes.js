import { loadFromLocalStorage, saveToLocalStorage } from "../inicial/inicial.js";
import { verificarConquistas } from "../conquistas/sistemaConquistas.js";

const corridasList = document.getElementById("corridasList");
const saltosList = document.getElementById("saltosList");
const arremessosList = document.getElementById("arremessosList");

function exibirRecords() {
    const usuarioLogado = loadFromLocalStorage('usuarioLogado');

    if (!usuarioLogado || !usuarioLogado.records) return;

    // ===== STATS =====
    const totalEl = document.querySelector('.stats .total h2');
    const corridaEl = document.querySelector('.stats .corrida h2');
    const arremessoEl = document.querySelector('.stats .arremesso h2');
    const saltoEl = document.querySelector('.stats .salto h2');

    let corrida = usuarioLogado.records.filter(r => ['100', '200', '400', '800', '1500'].includes(r.modalidade));
    let arremesso = usuarioLogado.records.filter(r => ['disco', 'dardo', 'peso'].includes(r.modalidade));
    let salto = usuarioLogado.records.filter(r => ['distancia', 'triplo', 'altura'].includes(r.modalidade));

    if (totalEl) totalEl.textContent = usuarioLogado.records.length;
    if (corridaEl) corridaEl.textContent = corrida.length;
    if (arremessoEl) arremessoEl.textContent = arremesso.length;
    if (saltoEl) saltoEl.textContent = salto.length;

    // ===== LIMPAR LISTAS =====
    if (corridasList) corridasList.innerHTML = "";
    if (saltosList) saltosList.innerHTML = "";
    if (arremessosList) arremessosList.innerHTML = "";

    // ===== RENDER =====
    usuarioLogado.records.forEach((record) => {
        const div = document.createElement("div");
        div.classList.add("record-item");

        div.innerHTML = `
            <strong>${record.modalidade}</strong>
            <p>${record.resultado} ${record.unidade}</p>
            <small>${record.data}</small>
        `;

        if (['100', '200', '400', '800', '1500'].includes(record.modalidade)) {
            if (corridasList) {
                corridasList.appendChild(div);
                corridasList.style.display = 'grid';
            }
        } else if (['altura', 'distancia', 'triplo'].includes(record.modalidade)) {
            if (saltosList) {
                saltosList.appendChild(div);
                saltosList.style.display = 'grid';
            }
        } else if (['peso', 'disco', 'dardo'].includes(record.modalidade)) {
            if (arremessosList) {
                arremessosList.appendChild(div);
                arremessosList.style.display = 'grid';
            }
        }
    });
}

function adicionarRecord(OBJ) {
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

// ===== EVENTOS =====
const registro = document.querySelector('#modalEvento');

if (registro) {
    registro.addEventListener("submit", (ev) => {
        ev.preventDefault();

        const modalidade = document.querySelector('#idDoInputModalidade')?.value;
        const resultado = document.querySelector('#idDoInputResultado')?.value;
        const data = document.querySelector('#idDoInputData')?.value;

        if (!modalidade || !resultado || !data) return;

        adicionarRecord({
            modalidade,
            resultado,
            data,
            unidade: null
        });

        exibirRecords();
        fecharModal();
    });
}

// ===== MODAL =====
const modal = document.getElementById("modalEvento");

const btnAbrir = document.getElementById("abrirModal");
const btnFechar = document.getElementById("fecharModal");
const btnCancelar = document.getElementById("cancelar");

if (btnAbrir) {
    btnAbrir.addEventListener("click", abrirModal);
}

if (btnFechar) {
    btnFechar.addEventListener("click", fecharModal);
}

if (btnCancelar) {
    btnCancelar.addEventListener("click", fecharModal);
}

if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });
}

function abrirModal() {
    if (modal) modal.style.display = "flex";
}

function fecharModal() {
    if (modal) modal.style.display = "none";
}

// ===== EXECUÇÃO SEGURA =====
if (document.querySelector('.stats')) {
    exibirRecords();
}