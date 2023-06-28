var denuncias = [];

function adicionarDenuncia(event) {
  event.preventDefault();

  var nome = document.getElementById('nome').value;
  var ocorrencia = document.getElementById('ocorrencia').value;

  if (document.getElementById('ponto').checked) {
    var placa = document.getElementById('placa').value;
    var denuncia = {
      nome: nome,
      tipo: 1,
      placa: placa,
      ocorrencia: ocorrencia
    };
  } else {
    var linha = document.getElementById('Linha').value;
    var horario = document.getElementById('Horario').value;
    var denuncia = {
      nome: nome,
      tipo: 2,
      linha: linha,
      horario: horario,
      ocorrencia: ocorrencia
    };
  }

  denuncias.push(denuncia);
  salvarDenuncias();
  limparFormulario();
}

function limparFormulario() {
  if (document.getElementById('ponto').checked) {
    document.getElementById('nome').value = '';
    document.getElementById('placa').value = '';
    document.getElementById('ocorrencia').value = '';
  }else{
    document.getElementById('nome').value = '';
    document.getElementById('Linha').value = '';
    document.getElementById('Horario').value = '';
    document.getElementById('ocorrencia').value = '';
  }
}

function limparDenuncias() {
  denuncias = [];
  localStorage.removeItem('denuncias');
}

function salvarDenuncias() {
  localStorage.setItem('denuncias', JSON.stringify(denuncias));
}

var form = document.getElementById('denunciaForm');
form.addEventListener('submit', adicionarDenuncia);

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