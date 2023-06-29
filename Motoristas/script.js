const dbM = 'denunciasMotoristas';
var denuncias;

function leMotoristas() {
  let strDados = localStorage.getItem(dbM);
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
          horario: '12:10',
          ocorrencia: 'Direção perigosa'
        }
      ]
    };
    salvarDenuncias();
  }

  return objDados;
}

function adicionarDenuncia(event) {
  event.preventDefault();

  denuncias = leMotoristas();

  var nome = document.getElementById('nome').value;
  var ocorrencia = document.getElementById('ocorrencia').value;

  if (document.getElementById('ponto').checked) {
    var placa = document.getElementById('placa').value;
    var novaDenuncia = {
      nome: nome,
      userid: ultimoLogin,
      tipo: 1,
      placa: placa,
      ocorrencia: ocorrencia
    };
  } else {
    var linha = document.getElementById('Linha').value;
    var horario = document.getElementById('Horario').value;
    var novaDenuncia = {
      nome: nome,
      userid: ultimoLogin,
      tipo: 2,
      linha: linha,
      horario: horario,
      ocorrencia: ocorrencia
    };
  }

  denuncias.denuncia.push(novaDenuncia);
  salvarDenuncias();
  limparFormulario();
}

function limparFormulario() {
  if (document.getElementById('ponto').checked) {
    document.getElementById('nome').value = '';
    document.getElementById('placa').value = '';
    document.getElementById('ocorrencia').value = '';
  } else {
    document.getElementById('nome').value = '';
    document.getElementById('Linha').value = '';
    document.getElementById('Horario').value = '';
    document.getElementById('ocorrencia').value = '';
  }
}

function limparDenuncias() {
  denuncias = { denuncia: [] };
  salvarDenuncias();
}

function salvarDenuncias() {
  localStorage.setItem(dbM, JSON.stringify(denuncias));
  window.location = "../users/usuario/usuario.html";
}

document.getElementById('denunciaForm').addEventListener('submit', adicionarDenuncia);


// Carregar denúncias ao carregar a página
if (localStorage.getItem('denuncias')) {
  denuncias = JSON.parse(localStorage.getItem('denuncias'));
}

// Alterar formulario de acordo com a escolha do usuario
function colocaPlaca() {
  let divPlaca = document.getElementById("divPlaca");
  let divLinha = document.getElementById("divLinha");

  divLinha.innerHTML = "";
  divPlaca.innerHTML = `<label for="placa">Placa:</label><input type="text" id="placa" required><label for="placa">`;
}

function colocaLinha() {
  let divPlaca = document.getElementById("divPlaca");
  let divLinha = document.getElementById("divLinha");

  divLinha.innerHTML = `
  <label for="Linha">Linha:</label>
  <input type="text" id="Linha" required>
  <label for="Linha">Data e horário (Clique no calendário):</label>
  <input type="datetime-local" id="Horario" name="data-hora" class="DateTime" required>`;
  divPlaca.innerHTML = "";
}

/*
    LOGIN
*/
const lastLogin = 'LastLogin';
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

function loadUser() {
  if (validate()) {
    colocaPlaca();
  } else {
    window.location = "../users/central.html";
  }
}