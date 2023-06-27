const dbName = 'unsafePoints';

function leDados() {
    // le local storage
    let strDados = localStorage.getItem(dbName);
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

function salvaDados(dados) {
    // salva os dados
    localStorage.setItem(dbName, JSON.stringify(dados));

    // limpa o formulario
    document.getElementById('campoRua').value = "";
    document.getElementById('campoNumero').value = "";
    document.getElementById('campoBairro').value = "";
    document.getElementById('campoCidade').value = "";
    document.getElementById('campoUF').value = "";
    document.getElementById('campoMore').value = "";
    
    // mensagem de confirmacao
    document.getElementById('enviado').innerHTML = "Conteúdo salvo";
}

function incluirPonto() {
    // Ler os dados do LocalStorage
    let objDados = leDados();

    // Incluir novo ponto \/ \/ \/ \/
    
    //variaveis de input texto
    let strnumero = document.getElementById('campoNumero').value;
    let strbairro = document.getElementById('campoBairro').value;
    let strcidade = document.getElementById('campoCidade').value;
    let struf = document.getElementById('campoUF').value;
    let strmore = document.getElementById('campoMore').value;
    
    //caixas de seleção radius
    let strrua = '';
    let opponto = '';
    
    //calculo de novo id
    let idvalue = objDados.pontos[(objDados.pontos.length-1)].id + 1;

    //verifica qual opcao esta marcada (Rua | Avenida)
    if (document.getElementById('rua').checked) {
        strrua = 'Rua ';
    } else {
        strrua = 'Av. ';
    }
    // adiciona o que esta no campo ao prefixo
    strrua += document.getElementById('campoRua').value;

    //verifica qual opcao esta marcada (Ponto | Local)
    if (document.getElementById('ponto').checked) {
        opponto = 'ponto';
    } else {
        opponto = 'local';
    }

    // cria array a ser salvo no banco de dados
    let novoPonto = {
        id: idvalue,
        rua: strrua,
        numero: strnumero,
        bairro: strbairro,
        cidade: strcidade,
        uf: struf,
        more: strmore,
        tipo: opponto
    };
    //adiciona o ponto a lista dos ja existentes
    objDados.pontos.push(novoPonto);

    // Salvar os dados no LocalStorage atualizados
    salvaDados(objDados);
}

function imprimeDados() {
    let tela = document.getElementById('tela');
    let strHTML = '';
    let objDados = leDados();

    for (i = 0; i < objDados.pontos.length; i++) {
        strHTML += `<p><h1>${objDados.pontos[i].rua}, ${objDados.pontos[i].numero} - ${objDados.pontos[i].bairro}, ${objDados.pontos[i].cidade} - ${objDados.pontos[i].uf} (${objDados.pontos[i].tipo})</h1>${objDados.pontos[i].more}</p>`;
    }

    tela.innerHTML = strHTML;
}

//configura botões

document.getElementById('enviar').addEventListener('click', incluirPonto);

//document.getElementById('btnLocalAtual').addEventListener('click', usaLocal);
//Funcao para utilizar a localizacao atual do usuario /\ /\ /\