import { loadFromLocalStorage } from "../inicial/inicial.js";
import { verificarConquistas } from "../conquistas/sistemaConquistas.js";

async function verificarSessao() {
    try {
        const resposta = await fetch("../php/perfil.php");

        const dados = await resposta.json();

        console.log("Verificação da sessão:", dados);

        if (!resposta.ok || !dados.sucesso) {
            window.location.href = "../login/login.html";
            return false;
        }

        return true;

    } catch (erro) {
        console.error("Erro na sessão:", erro);
        window.location.href = "../login/login.html";
        return false;
    }
}
const corridasList = document.getElementById("corridasList");
const saltosList = document.getElementById("saltosList");
const arremessosList = document.getElementById("arremessosList");

let recordes = [];

// Buscar recordes no banco
async function buscarRecordes() {
    try {
        const resposta = await fetch("../php/recordes/listar.php");
        const dados = await resposta.json();

        if (!dados.sucesso) {
            alert(dados.mensagem);
            return;
        }

        recordes = dados.recordes.map(r => ({
            ...r,
            data: r.data_recorde
        }));

        exibirRecords();

    } catch (erro) {
        console.error("Erro ao buscar recordes:", erro);
        alert("Erro ao carregar recordes!");
    }
}

// Exibir recordes e estatísticas
function exibirRecords() {
    const totalEl = document.querySelector(".stats .total h2");
    const corridaEl = document.querySelector(".stats .corrida h2");
    const arremessoEl = document.querySelector(".stats .arremesso h2");
    const saltoEl = document.querySelector(".stats .salto h2");

    const corrida = recordes.filter(r =>
        ["100", "200", "400", "800", "1500"].includes(r.modalidade)
    );

    const arremesso = recordes.filter(r =>
        ["disco", "dardo", "peso"].includes(r.modalidade)
    );

    const salto = recordes.filter(r =>
        ["distancia", "triplo", "altura"].includes(r.modalidade)
    );

    if (totalEl) totalEl.textContent = recordes.length;
    if (corridaEl) corridaEl.textContent = corrida.length;
    if (arremessoEl) arremessoEl.textContent = arremesso.length;
    if (saltoEl) saltoEl.textContent = salto.length;

    if (corridasList) corridasList.innerHTML = "";
    if (saltosList) saltosList.innerHTML = "";
    if (arremessosList) arremessosList.innerHTML = "";

    recordes.forEach(record => {
        const div = document.createElement("div");
        div.classList.add("record-item");

        const titulo = document.createElement("strong");
        titulo.textContent = record.modalidade;

        const resultado = document.createElement("p");
        resultado.textContent = `${record.resultado} ${record.unidade}`;

        const data = document.createElement("small");
        data.textContent = record.data;

        // Botão de excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.type = "button";
        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add("btn-excluir");

        btnExcluir.addEventListener("click", () => {
            excluirRecord(record.id_recorde);
        });

        div.append(titulo, resultado, data, btnExcluir);

        if (["100", "200", "400", "800", "1500"].includes(record.modalidade)) {
            corridasList?.appendChild(div);
            if (corridasList) corridasList.style.display = "grid";

        } else if (["altura", "distancia", "triplo"].includes(record.modalidade)) {
            saltosList?.appendChild(div);
            if (saltosList) saltosList.style.display = "grid";

        } else {
            arremessosList?.appendChild(div);
            if (arremessosList) arremessosList.style.display = "grid";
        }
    });

    const usuarioLogado = loadFromLocalStorage("usuarioLogado");

    if (usuarioLogado) {
        usuarioLogado.records = recordes;
        verificarConquistas(usuarioLogado);
    }
}

// Excluir recorde do banco
async function excluirRecord(id) {
    if (!confirm("Tem certeza que deseja excluir este recorde?")) {
        return;
    }

    const dados = new FormData();
    dados.append("id", id);

    try {
        const resposta = await fetch("../php/recordes/excluir.php", {
            method: "POST",
            body: dados
        });

        const resultado = await resposta.json();

        if (!resultado.sucesso) {
            alert(resultado.mensagem);
            return;
        }

        alert("Recorde excluído!");
        await buscarRecordes();

    } catch (erro) {
        console.error("Erro ao excluir recorde:", erro);
        alert("Erro ao excluir recorde!");
    }
}

// Salvar recorde no banco
async function adicionarRecord(record) {
    const dados = new FormData();

    dados.append("modalidade", record.modalidade);
    dados.append("resultado", record.resultado);
    dados.append("data", record.data);

    try {
        const resposta = await fetch("../php/recordes/salvar.php", {
            method: "POST",
            body: dados
        });

        const resultado = await resposta.json();

        if (!resultado.sucesso) {
            alert(resultado.mensagem);
            return false;
        }

        await buscarRecordes();
        return true;

    } catch (erro) {
        console.error("Erro ao salvar recorde:", erro);
        alert("Erro ao salvar recorde!");
        return false;
    }
}

// Formulário de cadastro
const registro = document.querySelector("#modalEvento");

if (registro) {
    registro.addEventListener("submit", async (ev) => {
        ev.preventDefault();

        const modalidade = document.querySelector("#idDoInputModalidade")?.value;
        const resultado = document.querySelector("#idDoInputResultado")?.value;
        const data = document.querySelector("#idDoInputData")?.value;

        if (!modalidade || !resultado || !data) {
            alert("Preencha todos os campos!");
            return;
        }

        const salvo = await adicionarRecord({
            modalidade,
            resultado,
            data
        });

        if (salvo) fecharModal();
    });
}

// Modal
const modal = document.getElementById("modalEvento");
const btnAbrir = document.getElementById("abrirModal");
const btnFechar = document.getElementById("fecharModal");
const btnCancelar = document.getElementById("cancelar");

if (btnAbrir) btnAbrir.addEventListener("click", abrirModal);
if (btnFechar) btnFechar.addEventListener("click", fecharModal);
if (btnCancelar) btnCancelar.addEventListener("click", fecharModal);

if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) fecharModal();
    });
}

function abrirModal() {
    if (modal) modal.style.display = "flex";
}

function fecharModal() {
    if (modal) modal.style.display = "none";
}

// Carregar recordes ao abrir a página
if (document.querySelector(".stats")) {
    verificarSessao().then((logado) => {
        if (logado) {
            buscarRecordes();
        }
    });
}
