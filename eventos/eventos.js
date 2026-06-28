const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
const listaEventos = document.querySelector("#listaEventos");
const totalEventos = document.querySelector(".card h2");
const minhasInscricoes = document.querySelector(".inscricoes h2");
let inscricoes = JSON.parse(localStorage.getItem("minhasInscricoes")) || [];

function exibirEventos() {
    listaEventos.innerHTML = "";
    eventos.forEach((evento, index) => {
        const div = document.createElement("div");
        div.classList.add("evento");
        const inscrito = inscricoes.includes(index);
        div.innerHTML = `
            <h3>${evento.nome}</h3>
            <p>Categoria: ${evento.categoria}</p>
            <p>Data: ${evento.data}</p>
            <p>Local: ${evento.local}</p>
            <p>Descrição: ${evento.descricao}</p>
            <p>Inscritos: ${evento.inscritos || 0}</p>
            <button class="btn-inscricao">
                ${inscrito ? "Cancelar Inscrição" : "Inscrever-se"}
            </button>
        `;
        
        const botao = div.querySelector(".btn-inscricao");
        botao.addEventListener("click", () => {
            if(inscrito){
                inscricoes = inscricoes.filter(i => i !== index);
                if(evento.inscritos > 0){
                    evento.inscritos--;
                }
            }else{
                inscricoes.push(index);
                evento.inscritos++;
            }

            localStorage.setItem("eventos", JSON.stringify(eventos));
            localStorage.setItem("minhasInscricoes", JSON.stringify(inscricoes));
            atualizarCards();
            exibirEventos();
        });

        listaEventos.appendChild(div);
    });
}

function atualizarCards(){
    totalEventos.textContent = eventos.length;
    minhasInscricoes.textContent = inscricoes.length;
}

atualizarCards();
exibirEventos();