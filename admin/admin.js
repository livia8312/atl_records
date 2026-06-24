const nomeEvento = document.querySelector("#nomeEvento");
const categoriaEvento = document.querySelector("#categoriaEvento");
const dataEvento = document.querySelector("#dataEvento");
const localEvento = document.querySelector("#localEvento");
const descricaoEvento = document.querySelector("#descricaoEvento");

const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
exibirEventos();
exibirContagem();

function criarEvento(evento){
    eventos.push(evento);

    localStorage.setItem("eventos", JSON.stringify(eventos));

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

        else if(eve.categoria==="Saltos"){
            document.querySelector("#saltos").appendChild(div);
        }

        else if(eve.categoria==="Arremessos"){
            document.querySelector("#arremessos").appendChild(div);
        }
    });

}

function exibirContagem() {
    const totalE = document.querySelector('#totalE');
    const totalC = document.querySelector('#totalC')
    const totalS = document.querySelector('#totalS');
    const totalA = document.querySelector('#totalA');

    totalE.textContent = eventos.length
    totalC.textContent = eventos.filter(e => e.categoria === 'Corridas').length
    totalS.textContent = eventos.filter(e => e.categoria === 'Saltos').length
    totalA.textContent = eventos.filter(e => e.categoria === 'Arremessos').length
}
function excluirEvento(index){

    const confirmar = confirm("Deseja excluir este evento?");

    if(confirmar){
        eventos.splice(index, 1);

        localStorage.setItem("eventos", JSON.stringify(eventos));

        exibirEventos();
        exibirContagem();
    }
}
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

document.getElementById("formEvento")
    .addEventListener("submit", (e) => {
        e.preventDefault();
        let evento = {
            nome:nomeEvento.value,
            categoria:categoriaEvento.value,
            data:dataEvento.value,
            local:localEvento.value,
            descricao:descricaoEvento.value,
            inscritos: 0
        };

        nomeEvento.value = '';
        categoriaEvento.value = '';
        dataEvento.value = '';
        localEvento.value = '';
        descricaoEvento.value = '';

        criarEvento(evento);
        modal.classList.remove("ativo");
    });

exibirEventos();

function abrirModal(){
    document.getElementById("modalEvento").style.display="flex";
}

function fecharModal(){
    document.getElementById("modalEvento").style.display="none";
};