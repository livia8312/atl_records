
import { showToast } from "../login/toast.js";

const listaConquistas = document.querySelector("#listaConquistas");
const barra = document.querySelector("#barraConquistas");
const porcentagem = document.querySelector("#porcentagemConquistas");
const subtitulo = document.querySelector(".title-box p");

// Busca as conquistas diretamente do PHP
async function buscarConquistas() {

    try {

        const resposta = await fetch("../php/conquistas/listar_conquistas.php");


        const dados = await resposta.json();
        console.log("Conquistas recebidas pelo JavaScript:", dados.conquistas);

        if (!resposta.ok || !dados.conquistas) {
            throw new Error(dados.mensagem || "Erro ao buscar conquistas.");
        }

        atualizarProgresso(dados);
        renderizarConquistas(dados.conquistas);

    } catch (erro) {

        console.error("Erro ao carregar conquistas:", erro);

        if (listaConquistas) {
            listaConquistas.innerHTML =
                "<p>Não foi possível carregar as conquistas.</p>";
        }

    }
}

// Atualiza barra, porcentagem e contador
function atualizarProgresso(dados) {

    if (subtitulo) {
        subtitulo.textContent =
            `${dados.quantidade} / ${dados.total} desbloqueadas`;
    }

    if (porcentagem) {
        porcentagem.textContent = `${dados.porcentagem}%`;
    }

    if (barra) {
        barra.style.width = `${dados.porcentagem}%`;
    }

}

// Cria um card
function criarCard(conquista) {

    const card = document.createElement("div");

    card.classList.add("conquista");

    if (conquista.desbloqueada) {
        card.classList.add(conquista.tipo);
    } else {
        card.classList.add("bloqueada");
    }

    card.innerHTML = `

        <div class="icone">
            ${conquista.desbloqueada ? conquista.icone : "🔒"}
        </div>

        <h3>${conquista.titulo}</h3>

        <p>${conquista.descricao}</p>

        <div class="footer">

            <span>${conquista.categoria}</span>

            <span>
                ${
                    conquista.desbloqueada
                    ? "✅ Desbloqueada"
                    : "🔒 Bloqueada"
                }
            </span>

        </div>

    `;

    return card;

}

// Desenha todos os cards
function renderizarConquistas(conquistas) {

    if (!listaConquistas) return;

    listaConquistas.innerHTML = "";

    conquistas.forEach(conquista => {

        const card = criarCard(conquista);

        listaConquistas.appendChild(card);

    });

}

// Inicia a página
buscarConquistas();