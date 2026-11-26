const formEvento = document.getElementById("formEvento");
const modalEvento = document.getElementById("modalEvento");
endpointAdminRoot = "../php/admin/"
const endpointEventos = {
    busca: endpointAdminRoot + "busca.php",
    cadastro: endpointAdminRoot + "cadastro.php",
    deletar: endpointAdminRoot + "deletar.php"
};

let eventos = [];

async function buscarEventos(busca = "all") {
    try {
        // Garante que espaços e caracteres especiais não quebrem a URL
        const url = `${endpointEventos.busca}?busca=${encodeURIComponent(busca)}`;
        
        const resposta = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

exibirEventos();
exibirContagem();

async function getEventos(busca = "all") { 
    await fetch(`../php/admin/admin.php?busca=${busca}`, {
        method: "GET"
    });
    return await response.json() || [];
}

async function criarEvento(){
    const dados = new FormData(form);
    
    await fetch("../php/admin.php", {
        method: "POST",
        body: dados
    });

    exibirEventos();
    fecharModal();
    exibirContagem();
}

function exibirEventos(){
    document.querySelector("#corridas").innerHTML = '';
    document.querySelector("#saltos").innerHTML = '';
    document.querySelector("#arremessos").innerHTML = '';

    eventos.forEach((eve, index)=>{
        const div = document.createElement("div");

        div.classList.add("evento");

        div.innerHTML=`
            <h3>${eve.nome}</h3>
            <p>Categoria: ${eve.categoria}</p>
            <p>Data: ${eve.data}</p>
            <p>Local: ${eve.local}</p>
            
            <p>Descrição: ${eve.descricao}</p>
            <p>Inscritos: ${eve.inscritos || 0}</p>
            <div class="acoes">
        <button class="btn-excluir" onclick="excluirEvento(${index})">
            Excluir
        </button>
    </div>  
        `;


        if(eve.categoria==="Corridas"){
            document.querySelector("#corridas").appendChild(div);
        }

        // Verifica se a requisição falhou (status diferente de 200-299)
        if (!resposta.ok) {
            throw new Error(resultado.mensagem || resultado.erro || `Erro na requisição: ${resposta.status}`);
        }

        return resultado.dados;

    } catch (erro) {
        // Captura tanto os erros lançados acima quanto falhas de conexão/rede
        console.error("Falha ao buscar eventos:", erro);
        throw erro; // Repassa o erro para quem chamou a função tratar (ex: mostrar na tela)
    }
}


async function carregarEventos() {
    const resultado =  await buscarEventos();
    eventos = resultado ?? [];
    renderizarEventos();
    renderizarContagens();
}

function renderizarEventos() {
    const listas = {
        corridas: document.getElementById("corridas"),
        saltos: document.getElementById("saltos"),
        arremessos: document.getElementById("arremessos")
    };

    Object.values(listas).forEach(lista => lista.replaceChildren());

    eventos.forEach(evento => {
        const lista = listas[evento.categoria];
        if (!lista) return;

        const artigo = document.createElement("article");
        artigo.className = "evento";

        const titulo = document.createElement("h3");
        titulo.textContent = evento.nome;

        const categoria = document.createElement("p");
        categoria.textContent = `Categoria: ${evento.categoria}`;

        const data = document.createElement("p");
        data.textContent = `Data: ${evento.data}`;

        artigo.append(titulo, categoria, data);

        if (evento.descricao) {
            const descricao = document.createElement("p");
            descricao.textContent = `Descrição: ${evento.descricao}`;
            artigo.appendChild(descricao);
        }

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.className = "btn-excluir";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", () => excluirEvento(evento.id_evento));

        acoes.appendChild(botaoExcluir);
        artigo.appendChild(acoes);
        lista.appendChild(artigo);
    });
}

function renderizarContagens() {
    document.getElementById("totalE").textContent = eventos.length;
    document.getElementById("totalC").textContent = contarCategoria("corridas");
    document.getElementById("totalS").textContent = contarCategoria("saltos");
    document.getElementById("totalA").textContent = contarCategoria("arremessos");
}

function contarCategoria(categoria) {
    return eventos.filter(evento => evento.categoria === categoria).length;
}

async function criarEvento(evento) {
    evento.preventDefault();

    const botaoPublicar = document.getElementById("publicar");
    botaoPublicar.disabled = true;

    try {
        await fetch(endpointEventos.cadastro, {
            method: "POST",
            body: new FormData(formEvento)
        });
        await carregarEventos();
        formEvento.reset();
        fecharModal();
    } catch (erro) {
        alert(erro.message);
    } finally {
        botaoPublicar.disabled = false;
    }
}

async function excluirEvento(idEvento) {
    if (!confirm("Deseja excluir este evento?")) return;

    try {
        const resposta = await fetch(`${endpointEventos.deletar}?id_evento=${encodeURIComponent(idEvento)}`, {
            method: "DELETE",
            credentials: "include" // Mantém a sessão do admin ativa
        });

        const dados = await resposta.json();

        if (!resposta.ok || !dados.sucesso) {
            throw new Error(dados.mensagem || "Erro ao excluir o evento.");
        }

        await carregarEventos(); // Atualiza a tela
    } catch (erro) {
        alert(erro.message);
    }
}

function abrirModal() {
    modalEvento.classList.add("ativo");
}

function fecharModal() {
    modalEvento.classList.remove("ativo");
}

document.getElementById("abrirModal").addEventListener("click", abrirModal);
document.getElementById("fecharModal").addEventListener("click", fecharModal);
document.getElementById("cancelar").addEventListener("click", fecharModal);
modalEvento.addEventListener("click", evento => {
    if (evento.target === modalEvento) fecharModal();
});
formEvento.addEventListener("submit", criarEvento);

carregarEventos().catch(erro => alert(erro.message));