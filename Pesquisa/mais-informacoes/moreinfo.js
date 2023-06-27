const dbUP = 'unsafePoints';

function leDados() {
    let strDados = localStorage.getItem(dbUP);
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    } else {
        objDados = {
            pontos: [
                {
                    id: 1,
                    rua: "Av. Dom José Gaspar",
                    numero: "500",
                    bairro: "Coração Eucarístico",
                    cidade: "Belo Horizonte",
                    uf: "MG",
                    more: "Assalto",
                    tipo: "Ponto"
                },
                {
                    id: 2,
                    rua: "Av. Princesa Isabel",
                    numero: "1290",
                    bairro: "Copacabana",
                    cidade: "Contagem",
                    uf: "MG",
                    more: "Poste estragado",
                    tipo: "Ponto"
                },
                {
                    id: 3,
                    rua: "R. Bandeiras",
                    numero: "53",
                    bairro: "Sao Joaquim",
                    cidade: "Sao Paulo",
                    uf: "SP",
                    more: "Ermo",
                    tipo: "Local"
                }
            ]
        };
    }

    return objDados.pontos;
}

let availableKeywords = leDados();
let urlParams = new URLSearchParams(window.location.search);
const idrecebido = parseInt(urlParams.get('id'));
const tipoDiv = document.getElementById('tipo');
const endereco = document.getElementById('endereco');
const maisinfo = document.getElementById('moreinfo');

function carregaDados() {
    let result = [];

    if (!isNaN(idrecebido)) {
        result = availableKeywords.filter((item) => {
            return item.id === idrecebido;
        });
    }

    display(result);
}

function display(result) {
    if (result.length > 0) {
        let strtipo = '';

        if ( result[0].tipo == 'ponto' ){
            strtipo = 'Ponto de ônibus';
        }else{
            strtipo = 'Local de espera de motorista de aplicativo';
        }
        const strendereco = result[0].rua + '<p></p>Número: ' + result[0].numero + '<p></p>' + result[0].bairro + ', ' + result[0].cidade + '<p></p>' + result[0].uf;
        const strmaisinfo = result[0].more;

        tipoDiv.innerHTML  = strtipo;
        endereco.innerHTML = strendereco;
        maisinfo.innerHTML = strmaisinfo;
    }
}

carregaDados();