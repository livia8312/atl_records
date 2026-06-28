import { loadFromLocalStorage } from "../inicial/inicial.js";

import {
    obterConquistasDoUsuario,
    obterQuantidadeConquistas,
    obterPorcentagem
} from "./sistemaConquistas.js";

const usuario = loadFromLocalStorage("usuarioLogado");



const listaConquistas = document.querySelector("#listaConquistas");

const barra = document.querySelector("#barraConquistas");

const porcentagem = document.querySelector("#porcentagemConquistas");

const subtitulo = document.querySelector(".title-box p");

//atualiza o progresso do usuario.

function atualizarProgresso(){

    const desbloqueadas = obterQuantidadeConquistas(usuario);

    const total = obterConquistasDoUsuario(usuario).length;

    subtitulo.textContent =
        `${desbloqueadas} / ${total} desbloqueadas`;

    const progresso = obterPorcentagem(usuario);

    porcentagem.textContent = `${progresso}%`;

    barra.style.width = `${progresso}%`;

}

// cria um card

function criarCard(conquista){

    const card = document.createElement("div");

    card.classList.add("conquista");

    if(conquista.desbloqueada){
        card.classList.add(conquista.tipo);
    }else{
        card.classList.add("bloqueada");
    }

    card.innerHTML = `

        <div class="icone">

            ${
                conquista.desbloqueada ? conquista.icone: "🔒"
            }

        </div>

        <h3>
            ${conquista.titulo}
        </h3>

        <p>
            ${conquista.descricao}
        </p>

        <div class="footer">

            <span>
                ${conquista.categoria}
            </span>

            <span>

                ${
                    conquista.desbloqueada ? "✅ Desbloqueada": "🔒 Bloqueada"

                }

            </span>

        </div>

    `;

    return card;

}

// rendereiza as conquistas


function renderizarConquistas(){

    listaConquistas.innerHTML = "";

    // procura todas as conquistas:
    const conquistas = obterConquistasDoUsuario(usuario);

    // cria um card pra cada conquista:
    conquistas.forEach(conquista => {

        const card = criarCard(conquista);

        listaConquistas.appendChild(card);

    });

}

/*
sempre que a pagina abrir
atualiza a barra
atualiza a %
atualiza o contador
e desenha todos os cards
*/

function iniciarPagina(){
    atualizarProgresso();

    renderizarConquistas();
}

// inicia a tela
iniciarPagina();