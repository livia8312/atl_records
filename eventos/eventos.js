const listaEventos = document.querySelector("#listaEventos");
const totalEventos = document.querySelector(".card h2");
const minhasInscricoes = document.querySelector(".inscricoes h2");

let eventos = [];
let inscricoes = [];

async function carregarEventos() {
    try {
        const resposta = await fetch(`../php/eventos/busca.php?busca=${encodeURIComponent("eventos")}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });



        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();
        // Garante que eventos seja um array, mesmo se o PHP retornar { sucesso: true, dados: [...] }
        eventos = Array.isArray(dados) ? dados : (dados.eventos || dados.dados || []);

        carregarInscricoes();
        atualizarCards();
        exibirEventos();

    } catch (erro) {
        console.error("Erro ao carregar eventos:", erro);
        listaEventos.innerHTML = "<p>Não foi possível carregar os eventos no momento.</p>";
    }
}

async function carregarInscricoes(){
    try {
        const resposta = await fetch(`../php/eventos/busca.php?busca=${encodeURIComponent("inscricoes")}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });


        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();
        // Garante que eventos seja um array, mesmo se o PHP retornar { sucesso: true, dados: [...] }
        inscricoes = Array.isArray(dados) ? dados : (dados.eventos || dados.dados || []);

        atualizarCards();
        exibirEventos();

    } catch (erro) {
        console.error("Erro ao carregar eventos:", erro);
        listaEventos.innerHTML = "<p>Não foi possível carregar as incricoes no momento.</p>";
    }
}

async function increver(id_evento, nome_evento){
    const dados = new FormData();

    // 2. Adiciona cada campo (o primeiro argumento é o nome que o PHP vai ler em $_POST)
    dados.append("id_evento", id_evento);
    dados.append("nome_evento", nome_evento);
    const resposta = fetch(`../php/eventos/inscrever.php`, {
        method: "POST",
        body: dados
    });

    carregarEventos()
}

async function desinscrever(id_evento, nome_evento){
    const dados = new FormData();

    // 2. Adiciona cada campo (o primeiro argumento é o nome que o PHP vai ler em $_POST)
    dados.append("id_evento", id_evento);
    dados.append("nome_evento", nome_evento);
    const resposta = fetch(`../php/eventos/desinscrever.php`, {
        method: "POST",
        body: dados
    });

    carregarEventos()
}

function exibirEventos() {
    listaEventos.innerHTML = "";

    if (eventos.length === 0) {
        listaEventos.innerHTML = "<p>Nenhum evento encontrado.</p>";
        return;
    }

    eventos.forEach((evento) => {
        // Usa o ID único do banco de dados em vez da posição (index)
        const idEvento = evento.id_evento ?? evento.id;
        const inscrito = inscricoes.includes(idEvento);

        const div = document.createElement("div");
        div.classList.add("evento");
        
        div.innerHTML = `
            <h3>${evento.nome}</h3>
            <p>Categoria: ${evento.categoria}</p>
            <p>Data: ${evento.data}</p>
            <p>Local: ${evento.local}</p>
            <p>Descrição: ${evento.descricao}</p>
            <p>Inscritos: ${evento.total_inscritos || 0}</p>
            <button class="btn-inscricao">
                ${evento.inscrito ? "Cancelar Inscrição" : "Inscrever-se"}
            </button>
        `;
        
        const botao = div.querySelector(".btn-inscricao");
        botao.addEventListener("click", () => {
            if(evento.inscrito){
                desinscrever(evento.id_evento, evento.nome)
            }else{
                increver(evento.id_evento, evento.nome)
            }
        });

        listaEventos.appendChild(div);
    });
}

function atualizarCards() {
    totalEventos.textContent = eventos.length;
    minhasInscricoes.textContent = inscricoes.length;
}

// Inicia o carregamento ao abrir a página
carregarEventos();