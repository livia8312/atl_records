import { loadFromLocalStorage, saveToLocalStorage } from "../inicial/inicial.js";

const corridasList = document.getElementById("corridasList");
const saltosList = document.getElementById("saltosList");
const arremessosList = document.getElementById("arremessosList");


function exibirRecords() {
    const records = loadFromLocalStorage('records')

    // exibe a contagem
    document.querySelector('.stats .total h2').textContent = records.length

    let corrida = records.filter(r => ['100', '200', '400', '800', '1500'].includes(r.modalidade))
    document.querySelector('.stats .corrida h2').textContent = corrida.length

    let arremesso = records.filter(r => ['disco', 'dardo', 'peso'].includes(r.modalidade))
    document.querySelector('.stats .arremesso h2').textContent = arremesso.length

    let salto = records.filter(r => ['distancia', 'triplo', 'altura'].includes(r.modalidade))
    document.querySelector('.stats .salto h2').textContent = salto.length


    // limpa tudo antes (igual você fez nos eventos)
    
    corridasList.innerHTML = "";
    saltosList.innerHTML = "";
    arremessosList.innerHTML = "";

    records.forEach((record, index) => {

        const div = document.createElement("div");
        div.classList.add("record-item");

        div.innerHTML = `
            <strong>${record.modalidade}</strong>
            <p>${record.resultado}</p>
            <small>${record.data}</small>
        `;

        if(record.modalidade === '100' || record.modalidade === '200' || record.modalidade === '400' || record.modalidade === '800' || record.modalidade === '1500'){
            corridasList.appendChild(div)
            corridasList.style.display = 'grid';
        }else if(record.modalidade === 'altura' || record.modalidade === 'distancia' || record.modalidade === 'triplo'){
            saltosList.appendChild(div)
            saltosList.style.display = 'grid';
        }else if(record.modalidade === 'peso' || record.modalidade === 'disco' || record.modalidade === 'dardo'){
            arremessosList.appendChild(div)
            arremessosList.style.display = 'grid';

        }

    });

    return fecharModal();
}

function adicionarRecord(OBJ){
    // Agora o OBJ receberá os dados reais dos inputs

    if (['100', '200', '400'].includes(OBJ.modalidade)) {
        OBJ.unidade = 'Seg'
    }else if(['800', '1500'].includes(OBJ.modalidade)) {
        OBJ.unidade = 'Min'
    }else {
        OBJ.unidade = 'M'
    }

    const records = loadFromLocalStorage('records') || []
    records.push(OBJ)
    saveToLocalStorage('records', records)
}

const registro = document.querySelector('#modalEvento');

registro.addEventListener("submit", (ev) => {
    ev.preventDefault(); // Impede a página de recarregar
    
    // Captura os valores corretos usando o .value de cada input/select
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
    if(e.target === modal){
        fecharModal();
    }
});
function abrirModal(){
    document.getElementById("modalEvento").style.display="flex";
}

function fecharModal(){
    document.getElementById("modalEvento").style.display="none";
};

exibirRecords()