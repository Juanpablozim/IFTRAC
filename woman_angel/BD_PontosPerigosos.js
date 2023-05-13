function leDados () {
    let strDados = localStorage.getItem('db');
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

function salvaDados (dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}

function incluirPonto () {
    // Ler os dados do LocalStorage
    let objDados = leDados();

    // Incluir novo ponto
    let strrua = document.getElementById('campoRua').value;
    let strnumero = document.getElementById('campoNumero').value;
    let strbairro = document.getElementById('campoBairro').value;
    let strcidade = document.getElementById('campoCidade').value;
    let struf = document.getElementById('campoUF').value;
    let strmore = document.getElementById('campoMore').value;
    let opponto = '';

    if (document.getElementById('ponto').checked) {
        opponto = 'ponto';
    }else{
        opponto = 'local';
    }
    
        let novoPonto = {
            rua: strrua,
            numero: strnumero,
            bairro: strbairro,
            cidade: strcidade,
            uf: struf,
            more: strmore,
            tipo: opponto
        };
    objDados.pontos.push (novoPonto);

    // Salvar os dados no LocalStorage novamente
    salvaDados(objDados);
}

function imprimeDados () {
    let tela = document.getElementById('tela');
    let strHTML = '';
    let objDados = leDados();
    
    for ( i=0; i<objDados.pontos.length; i++ ) {
        strHTML += `<p><h1>${objDados.pontos[i].rua}, ${objDados.pontos[i].numero} - ${objDados.pontos[i].bairro}, ${objDados.pontos[i].cidade} - ${objDados.pontos[i].uf} (${objDados.pontos[i].tipo})</h1>${objDados.pontos[i].more}</p>`;
    }

    tela.innerHTML = strHTML;
}

//configura botões

document.getElementById('enviar').addEventListener('click', incluirPonto);

//document.getElementById('btnLocalAtual').addEventListener('click', usaLocal);
//Funcao para utilizar a localizacao atual do usuario /\ /\ /\