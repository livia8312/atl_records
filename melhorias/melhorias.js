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

//corridas
graficoLine('corrida', ['23/4', '38/4', '10/5', '15/5', '20/5', '25/5', '30/5'], [200, 100, 400, 310, 250, 102, 150], '#0d2a52', '#0b2242', 's')

//arremesso
graficoLine('arremesso', ['23/4', '38/4', '10/5', '15/5', '20/5', '25/5', '30/5'], [10, 8, 3, 8, 5, 10, 12], '#d69200', '#9b6d09', 'm')

//salto
graficoLine('salto', ['23/4', '38/4', '10/5', '15/5', '20/5', '25/5', '30/5'], [1.2, 1.3, 1.1, 1.4, 1.2, 1.3, 1.5], '#8d3dff', '#6a28cc', 'm')

document.querySelectorAll('.card-topo select').forEach((select) => {
    select.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        
    })
});