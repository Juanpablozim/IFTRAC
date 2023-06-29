/*
    BANCOS DE DADOS
*/
const dbM = 'denunciasMotoristas';
const upDB = 'unsafePoints';
const usersDB = 'WAusers';
const lastLogin = 'LastLogin';

/*
    LOGIN
*/
let logado = false;
let ultimoLogin;

function validate() {
    let strDados = localStorage.getItem(lastLogin);
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
        ultimoLogin = objDados.login[0].id;

        if ((Date.now() - objDados.login[0].horario) < 1800000) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function leUsuarios() {
    let strDados = localStorage.getItem(usersDB);
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    }
    else {
        objDados = {
            usuarios: [
                { email: "gabriel@gmail.com", nome: "Gabriel", sobrenome: "Quaresma", senha: "Gabriel10" }
            ]
        }
    }

    return objDados;
}

function UserLogado(userid) {
    logado = validate();
    let users = leUsuarios();

    let imglogin = document.getElementById("loginNav");

    if (logado) {
        imglogin.innerHTML = `<div class="navitem navlogged">${users.usuarios[ultimoLogin - 1].nome}</div>`;
    }

}

/*
    EM ALTA
*/

const idrecebido = 0;

function leDados() {
    // le local storage
    let strDados = localStorage.getItem(upDB);
    let objDados = {};

    if (strDados) {
        // se ja existirem dados

        // passa os dados para uma variavel
        objDados = JSON.parse(strDados);
    } else {
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

function imprimeDados() {
    let tela = document.getElementById('destacados');
    let strHTML = '';
    let objDados = leDados();

    let contador = 0;

    for (i = (objDados.pontos.length - 1); (i >= 0) && (contador < 10); i = i - 1) {
        strHTML += `<a href="Detalhes/moreinfo.html?id=${objDados.pontos[i].id}" onclick='selectInput(this)'><div class="destacado"><h4>${objDados.pontos[i].tipo}</h4><h2>${objDados.pontos[i].rua}, ${objDados.pontos[i].numero} - ${objDados.pontos[i].bairro}, ${objDados.pontos[i].cidade} - ${objDados.pontos[i].uf}</h2><h3>${objDados.pontos[i].more}</h3></div></a>`;
        contador = contador + 1;
    }

    tela.innerHTML = strHTML;
    UserLogado();
}

function selectInput(list) {
    inputBox.value = list.innerHTML;
    const id = list.getAttribute("data-id");
    window.location = "mais-informacoes/moreinfo.html?id=" + id;
}

/*
    MOTORISTAS
*/

var denunciasContainer = document.getElementById('denuncias');
  var denuncias = leMotoristas();
  exibirDenuncias();

  function exibirDenuncias() {
    denunciasContainer.innerHTML = '';

    for (var i = 0; i < denuncias.denuncia.length; i++) {
      var denuncia = denuncias.denuncia[i];

      var denunciaElement = document.createElement('div');
      denunciaElement.classList.add('denuncia');

      if (denuncia.tipo == 1) {
        denunciaElement.innerHTML = '<div class="info">Nome do Motorista: ' + denuncia.nome + '</div>' +
          '<div class="info">Placa: ' + denuncia.placa + '</div>' +
          '<div class="descricao">' + denuncia.ocorrencia + '</div>';
      } else {
        var horario = new Date(denuncia.horario);
        var dataFormatada = horario.toLocaleDateString();
        var horarioFormatado = horario.toLocaleTimeString();

        denunciaElement.innerHTML = '<div class="info">Nome do Motorista: ' + denuncia.nome + '</div>' +
          '<div class="info">Linha: ' + denuncia.linha + '</div>' +
          '<div class="info">Data: ' + dataFormatada + '</div>' +
          '<div class="info">Horario: ' + horarioFormatado + '</div>' +
          '<div class="descricao">' + denuncia.ocorrencia + '</div>';
      }

      denunciasContainer.appendChild(denunciaElement);
    }
  }

  function leMotoristas() {
    let strDados = localStorage.getItem('denunciasMotoristas');
    let objDados = {};

    if (strDados) {
      objDados = JSON.parse(strDados);
    } else {
      objDados = {
        denuncia: [
          {
            nome: 'Walter Rodrigues',
            userid: 1,
            tipo: 1,
            placa: 'DH3J392',
            ocorrencia: 'Motorista muito mal educado'
          },
          {
            nome: 'Oscar Franklyn',
            userid: 2,
            tipo: 2,
            linha: '95A',
            horario: new Date().toISOString(),
            ocorrencia: 'Direção perigosa'
          }
        ]
      };
      localStorage.setItem('denunciasMotoristas', JSON.stringify(objDados));
    }

    return objDados;
  }