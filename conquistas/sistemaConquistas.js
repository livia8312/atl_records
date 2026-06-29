/*
criei esse arquivo separado pra deixar aqui toda a lógica das conquistas e quem sabe
ficar melhor de entender :).

Objetivos:

--evitar código muito grande cheio de ifs.
--da pra adicionar novas conquistas se quisermos.
--o código fica um pouco mais organizado.

Sempre que o usario fizer alguma coisa tipo
(registrar recorde, participar de evento etc),
é só chamar  função:

    verificarConquistas(usuarioLogado);

que tudo vai ser feito direitinho.
*/

import { loadFromLocalStorage, saveToLocalStorage } from "../inicial/inicial.js";
import { showToast } from "../login/toast.js";



/*
lista de conquistas do sistema.
Cada conquista possui:

id:
identificador único

titulo:
nome exibido ao usuário

descricao:
descrição da conquista

categoria:
utilizada para mostrar a categoria do card

icone:
emoji do card

tipo:
bronze
prata
ouro
diamante

verificar()
verifica se o usuário já atingiu a conquista.
*/

export const CONQUISTAS = [

    // conquistas gerais:

    {

        id: "primeiro-passo",

        titulo: "Primeiro Passo",

        descricao: "Registre seu primeiro recorde.",

        categoria: "⭐ Geral",

        icone: "⚡",

        tipo: "bronze",

        verificar(usuario){

            return usuario.records.length >= 1;

        }

    },

    {

        id: "atleta-dedicado",

        titulo: "Atleta Dedicado",

        descricao: "Registre 10 recordes.",

        categoria: "⭐ Geral",

        icone: "🏃",

        tipo: "prata",

        verificar(usuario){

            return usuario.records.length >= 10;

        }

    },

    {

        id: "colecionador",

        titulo: "Colecionador",

        descricao: "Registre 25 recordes.",

        categoria: "⭐ Geral",

        icone: "🏆",

        tipo: "ouro",

        verificar(usuario){

            return usuario.records.length >= 25;

        }

    },

    {

        id: "lenda",

        titulo: "Lenda do AtlRecords",

        descricao: "Registre 50 recordes.",

        categoria: "⭐ Geral",

        icone: "👑",

        tipo: "diamante",

        verificar(usuario){

            return usuario.records.length >= 50;

        }

    },

    // corridas:

    {

        id: "corredor",

        titulo: "Corredor",

        descricao: "Registre 5 corridas.",

        categoria: "🏃 Corridas",

        icone: "⚡",

        tipo: "bronze",

        verificar(usuario){

            return usuario.records.filter(record =>

                ['100','200','400','800','1500']
                .includes(record.modalidade)

            ).length >= 5;

        }

    },

    {

        id: "especialista-corrida",

        titulo: "Especialista",

        descricao: "Registre 15 corridas.",

        categoria: "🏃 Corridas",

        icone: "🔥",

        tipo: "ouro",

        verificar(usuario){

            return usuario.records.filter(record =>

                ['100','200','400','800','1500']
                .includes(record.modalidade)

            ).length >= 15;

        }

    },

    //saltos:

    {

        id: "saltador",

        titulo: "Saltador",

        descricao: "Registre 5 saltos.",

        categoria: "🤸 Saltos",

        icone: "🤸",

        tipo: "bronze",

        verificar(usuario){

            return usuario.records.filter(record =>

                ['altura','distancia','triplo']
                .includes(record.modalidade)

            ).length >= 5;

        }

    },

    {

        id: "mestre-dos-saltos",

        titulo: "Mestre dos Saltos",

        descricao: "Registre 15 saltos.",

        categoria: "🤸 Saltos",

        icone: "⭐",

        tipo: "ouro",

        verificar(usuario){
            return usuario.records.filter(record =>

                ['altura','distancia','triplo']
                .includes(record.modalidade)

            ).length >= 15;

        }

    },

    // arremessos:

    {

        id: "primeiro-arremesso",

        titulo: "Primeiro Arremesso",

        descricao: "Registre seu primeiro arremesso.",

        categoria: "🥏 Arremessos",

        icone: "🥏",

        tipo: "bronze",

        verificar(usuario){
            return usuario.records.filter(record =>

                ['peso','disco','dardo']
                .includes(record.modalidade)

            ).length >= 1;

        }

    },

    {

        id: "arremessador",

        titulo: "Arremessador",

        descricao: "Registre 10 arremessos.",

        categoria: "🥏 Arremessos",

        icone: "💪",

        tipo: "prata",

        verificar(usuario){
            return usuario.records.filter(record =>

                ['peso','disco','dardo']
                .includes(record.modalidade)

            ).length >= 10;

        }

    },

    // conquista especial:

    {

        id: "atleta-completo",

        titulo: "Atleta Completo",

        descricao:
        "Registre pelo menos uma corrida, um salto e um arremesso.",

        categoria: "⭐ Geral",

        icone: "🌎",

        tipo: "diamante",

        verificar(usuario){

            const possuiCorrida =
                usuario.records.some(record =>
                    ['100','200','400','800','1500']
                    .includes(record.modalidade)
                );

            const possuiSalto =
                usuario.records.some(record =>
                    ['altura','distancia','triplo']
                    .includes(record.modalidade)
                );

            const possuiArremesso =
                usuario.records.some(record =>
                    ['peso','disco','dardo']
                    .includes(record.modalidade)
                );

            return (
                possuiCorrida &&
                possuiSalto &&
                possuiArremesso
            );

        }

    }

];


/*
funções para ajudar a manipular as conquistas do usuário:

Em vez de acessar diretamente:
usuario.conquistas

o resto do projeto pode só chamar elas

usuarioPossuiConquista()

obterQuantidadeConquistas()

etc.
*/


/*
Caso o usuário seja antigo e ainda não possua
o array de conquistas,

criamos automaticamente.

Assim evitamos erros.
*/
//SO CHECA
function garantirArrayDeConquistas(usuario){
    if(!usuario.conquistas){

        usuario.conquistas = [];
    }
}


/*
Retorna TRUE ou FALSE.

Exemplo:

usuarioPossuiConquista(usuario, "primeiro-passo")
*/

export function usuarioPossuiConquista(usuario,id){
    garantirArrayDeConquistas(usuario);

    return usuario.conquistas.includes(id);
}


/*
Retorna o objeto inteiro da conquista e
verifica se o usuário já possui a conquista.

muito útil para montar os cards.
*/

export function obterConquista(id){
    return CONQUISTAS.find(conquista => conquista.id === id);
}


/*
Retorna todas as conquistas.

A página conquistas.html utilizará
esta função.
*/

export function obterTodasConquistas(){
    return CONQUISTAS;
}


/*
Quantidade desbloqueada.

Exemplo:
4
*/

export function obterQuantidadeConquistas(usuario){
    garantirArrayDeConquistas(usuario);

    return usuario.conquistas.length;

}

/*
Retorna o progresso em porcentagem.

Exemplo:
33%
67%
100%
*/

export function obterPorcentagem(usuario){
    garantirArrayDeConquistas(usuario);

    return Math.round(
        usuario.conquistas.length/CONQUISTAS.length*100
    );
}
/*
desbloquearConquista()

é pra chamar essa função só quando
a conquista ainda nao foi desbloqueada.

ela faz:
adiciona a conquista ao array de conquistas do usuário.
salva no usuário.
atualiza isso tudo no cadastro pra nao ficar coisa velha.
mostra o toast de conquista desbloqueada.
*/

function desbloquearConquista(usuario, conquista){
    garantirArrayDeConquistas(usuario);

    usuario.conquistas.push(conquista.id);
    // da aquela salvadinha no localStorage do usuário logado.
    saveToLocalStorage("usuarioLogado", usuario);

    /*
    da aquela atualizada no cadastro pra nao ficar coisa velha,
    e o usario manter suas conquistas.
    */
    const cadastro = loadFromLocalStorage("cadastro");
    //ATUALIZA NO LOCALSTORAGE AS INFORMACOES DO USUARIO EM CADASTRADOS
    const indice = cadastro.findIndex(user => user.email === usuario.email);

    if(indice !== -1){
        cadastro[indice] = usuario;

        saveToLocalStorage("cadastro", cadastro);
    }
    // chama o toast de conquista desbloqueada.
    showToast(

        `🏆 Nova conquista desbloqueada: ${conquista.titulo}!`,

        "success"

    );

}


/*
essa é a única função que o resto dos arquivos
precisa conhecer.

sempre que acontecer algo:

novo recorde

novo evento etc.

chama:

verificarConquistas(usuarioLogado);
*/

export function verificarConquistas(usuario){

    garantirArrayDeConquistas(usuario);

    /*
    percorre todas as conquistas do sistema e verifica
     se o usuário já atingiu alguma delas.
    */

    CONQUISTAS.forEach(conquista =>{

        /*
        Se o usuário já possui essa conquista,
        passamos para a próxima.

        Assim evitamos desbloqueá-la novamente.
        */

        if(usuarioPossuiConquista(usuario, conquista.id)){
            return;
        }

        /*
        Cada conquista possui sua própria função
        verificar().

        assim nao precisa ter varios ifs.
        */

        if(conquista.verificar(usuario)){
            desbloquearConquista(usuario,conquista);
        }
    });
}


/*
função que monta os cards.

vai ser usada na pagina conquistas.html.

ela devolve um array com tudo que precisa pra montar os cards.
*/

export function obterConquistasDoUsuario(usuario){
    garantirArrayDeConquistas(usuario);
    //RETORNAR O ARRAY CONQUISTAS E VE SE O ATRIBUTO DESBLOQUEADA É TRUE OU FALSE, SE FOR TRUE ELE VAI MOSTRAR O CARD DESBLOQUEADO, SE FOR FALSE ELE VAI MOSTRAR O CARD TRANCADO POR MEIO DA FUNCAO USUARIOPOSSUICONQUISTA
    return CONQUISTAS.map(conquista =>{
        return{
            ...conquista,

            desbloqueada:

            usuarioPossuiConquista(usuario, conquista.id)
        };

    });

};