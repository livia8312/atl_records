import { loadFromLocalStorage } from "../inicial/inicial.js";

const text = '#797979';
const lines = '#1e1e1e'

function graficoLine(_div, _label, _valores, _cor, _backgroundColor, _medida) {
    let myConfig = {
        type: "area",

        backgroundColor: "transparent",

        plotarea: {
            backgroundColor: "transparent"
        },

        plot: {
            aspect: "spline",
            lineWidth: 4,
            marker: {
                visible: false
            }
        },

        scaleX: {
            labels: _label,
            lineColor: "transparent",

            item: {
                fontColor: text,
                fontSize: 12
            },

            guide: {
                visible: true,
                lineColor: lines,
                lineStyle: 'dashed',
            },

            tick: {
                visible: false
            }
        },

        scaleY: {
            lineColor: "transparent",

            item: {
                fontColor: text,
                fontSize: 12
            },

            guide: {
                visible: true,
                lineColor: lines,
                lineStyle: 'dashed',

                hoverState: {
                    lineColor: '#ffffff',
                    backgroundColor: '#ffffff',
                },
            },

            tick: {
                visible: false
            },
        },

        tooltip: {
            visible: false
        },

        crosshairX: {
            lineColor: '#ffffff',
            lineWidth: 1,

            plotLabel: {
                text: `%v ${_medida}`
            },

            scaleLabel: {
                visible: false
            },

            marker: {
                backgroundColor: _cor,
                borderColor: '#ffffff',
                size: 6
            }
        },

        series: [{
            values: _valores,

            text: '',

            tooltip: {
                text: '%v kcal'
            },

            lineColor: _cor,
            lineWidth: 4,

            backgroundColor: _backgroundColor,
            alphaArea: 0.6
            ,

            marker: {
                visible: false
            },

            hoverMarker: {
                visible: true,
                size: 8,
                backgroundColor: '#ffffff',
                borderColor: '#ffffff',
            },
        }],
    };

    zingchart.render({
        id: _div,
        data: myConfig,
        height: '100%',
        width: '100%'
    });
}

function graficoBar(_div, _label, _valores, _cor, _medida) {

    let myConfig = {
        type: "bar",

        backgroundColor: "transparent",

        plotarea: {
            backgroundColor: "transparent"
        },

        scaleX: {
            labels: _label,

            item: {
                fontColor: text
            },

            guide: {
                visible: true,
                lineColor: lines,
                lineStyle: "dashed"
            },
        },

        plot: {
            overlap: true,
        },

        scaleY: {
            item: {
                fontColor: text
            },

            guide: {
                visible: true,
                lineColor: lines,
                lineStyle: "dashed"
            },
        },

        tooltip: {
            visible: false,
        },
        
        crosshairX: {
            lineWidth: "100%",
            alpha: 0.5,
            backgroundColor: "#ffffff",

            scaleLabel: {
                visible: false,
            },

            plotLabel: {
                text: `%v ${_medida}`
            }
        },

        series: [{
                values: _valores,
                backgroundColor: _cor,
            }],
    };

    zingchart.render({
        id: _div,
        data: myConfig,
        height: '100%',
        width: '100%'
    });
}

let records = loadFromLocalStorage('usuarioLogado').records;
//console.log(records)

const modalidades = {
    corrida: [],
    salto: [],
    arremesso: []
};

const modalidadesCorrida = ['100', '200', '400', '800', '1500'];
const modalidadesSalto = ['altura', 'distancia', 'triplo'];
const modalidadesArremesso = ['peso', 'disco', 'dardo'];
//ADICIONO O RECORDE DA PESSOA NO ARRAY DENTRO DE MODALIDADES DE ACORDO COM O INCLUDES '' = OS SELECTS DO FORM
records.forEach(r => {
    if (modalidadesCorrida.includes(r.modalidade)) {
        modalidades.corrida.push(r);
    } else if (modalidadesSalto.includes(r.modalidade)) {
        modalidades.salto.push(r);
    } else if (modalidadesArremesso.includes(r.modalidade)) {
        modalidades.arremesso.push(r);
    }
});

const cores = {
    corrida: {
        linha: '#0d2a52',
        fundo: '#0b2242',
    },
    salto: {
        linha: '#8d3dff',
        fundo: '#6a28cc',
    },
    arremesso: {
        linha: '#d69200',
        fundo: '#9b6d09',
    }
};
//SELECIO OS 3 SELECTS DA PAGINA
document.querySelectorAll('.card-topo select').forEach(select => {
    //PEGA A SEGUNDA CLASSE DO PAI DO PAI NO SELECT
    const type = select.parentElement.parentElement.classList[1];
    //console.log(type)

    desenharGrafico(type);

    select.addEventListener('change', () => {
        desenharGrafico(type);
    });
});

function desenharGrafico(type) {
    const card = document.querySelector(`.${type}`);
    const select = card.querySelector('select');

    const dados = modalidades[type]
    //QUAL CORRIDA E IGUAL AO SELECT.VALUE
    .filter(r => r.modalidade === select.value)
    //PARADEIXA EM ORDEM AS DATAS CRESCENTE
    .sort((a, b) => new Date(a.data) - new Date(b.data));

    card.querySelector('.grafico').innerHTML = '';

    let unidade;

    if(dados[0] !== undefined){
        unidade = dados[0].unidade
    }else{
        unidade = '';
    }

    graficoLine(
        type,
        dados.map(r => r.data),
        dados.map(r => Number(r.resultado)),
        cores[type].linha,
        cores[type].fundo,
        unidade
    );
}