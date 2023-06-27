const idrecebido = 0;
const upDB = 'unsafePoints';

function leDados() {
    // le local storage
    let strDados = localStorage.getItem(upDB);
    let objDados = {};
  
    if (strDados) {
    // se ja existirem dados
        
        // passa os dados para uma variavel
        objDados = JSON.parse(strDados);
    }else{
    // se nao existirem dados
        
        // cria dados ficticios
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
  
    // retorna as informacoes
    return objDados;
}

function imprimeDados () {
    let tela = document.getElementById('destacados');
    let strHTML = '';
    let objDados = leDados();

    let contador = 0;

    for ( i=(objDados.pontos.length-1); (i>=0) && (contador<10); i=i-1 ) {
        strHTML += `<a href="Pesquisa/mais-informacoes/moreinfo.html?id=${objDados.pontos[i].id}" onclick='selectInput(this)'><div class="destacado"><h4>${objDados.pontos[i].tipo}</h4><h3>${objDados.pontos[i].more}</h3><h2>${objDados.pontos[i].rua}, ${objDados.pontos[i].numero} - ${objDados.pontos[i].bairro}, ${objDados.pontos[i].cidade} - ${objDados.pontos[i].uf}</h2></div></a>`;
        contador = contador + 1;
    }

    tela.innerHTML = strHTML;
}

function selectInput(list) {
    inputBox.value = list.innerHTML;
    const id = list.getAttribute("data-id");
    window.location = "mais-informacoes/moreinfo.html?id=" + id;
}