const idrecebido = 0;
const upDB = 'unsafePoints';

function leDados () {
    let strDados = localStorage.getItem(upDB);
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { pontos: [ 
            { rua: "Av. Dom José gaspar", numero: "500", bairro: "Coração Eucarístico", cidade: "Belo Horizonte", uf: "MG", more: "Assalto", tipo: "Ponto" },
            { rua: "Av. Princesa Isabel", numero: "1290", bairro: "Copacabana", cidade: "Contagem", uf: "MG", more: "Poste estragado", tipo: "Ponto" },
            { rua: "R. Bandeiras", numero: "53", bairro: "Sao Joaquim", cidade: "Sao Paulo", uf: "SP", more: "Ermo", tipo: "Local" } ] }
    }

    return objDados;
}

function imprimeDados () {
    let tela = document.getElementById('destacados');
    let strHTML = '';
    let objDados = leDados();

    let contador = 0;

    for ( i=(objDados.pontos.length-1); (i>0) && (contador<10); i=i-1 ) {
        strHTML += `<div class="destacado"><h4>${objDados.pontos[i].tipo}</h4><h3>${objDados.pontos[i].more}</h3><h2>${objDados.pontos[i].rua}, ${objDados.pontos[i].numero} - ${objDados.pontos[i].bairro}, ${objDados.pontos[i].cidade} - ${objDados.pontos[i].uf}</h2></div>`;
        contador = contador + 1;
    }

    tela.innerHTML = strHTML;
}