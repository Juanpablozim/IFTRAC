/*
    LOGIN
*/
const usersDB = 'WAusers';
const lastLogin = 'LastLogin';
let logado = false;
let ultimoLogin;
let users;

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

function loadUser() {
    let validacao = validate();

    if (!validacao) {
        window.location = "../users/central.html";
    }else{
        users = leUsuarios();
    }

    return validacao;
}

/*
    PONTOS PERIGOSOS
*/

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
    if(!validate()){
        document.getElementById("logincomentario").innerHTML = `<div class="logincomentario">Faça <a href="../users/central.html">login</a> para comentar nesta denúncia!</div>`;
    }
}

function display(result) {
    if (result.length > 0) {
        let strtipo = '';

        if (result[0].tipo == 'ponto') {
            strtipo = 'Ponto de ônibus';
        } else {
            strtipo = 'Local de espera de motorista de aplicativo';
        }
        const strendereco = result[0].rua + '<p></p>Número: ' + result[0].numero + '<p></p>' + result[0].bairro + ', ' + result[0].cidade + '<p></p>' + result[0].uf;
        const strmaisinfo = result[0].more;

        tipoDiv.innerHTML = strtipo;
        endereco.innerHTML = strendereco;
        maisinfo.innerHTML = strmaisinfo;
    }
}

// JSON com os comentários
var comentarios = {
    "comentarios": []
};

// Função para enviar o comentário
function enviarComentario() {
    if (loadUser()) {
        var id = 1;
        var ittenid = idrecebido;
        var nome = 'Username';
        var comentario = document.getElementById("comentario").value;
        if (nome !== "" && comentario !== "") {
            var novoComentario = {
                "id": id,
                "userid": ultimoLogin,
                "ittenid": ittenid,
                "nome": users.usuarios[ultimoLogin-1].nome,
                "comentario": comentario
            };
            comentarios.comentarios.push(novoComentario);
            document.getElementById("comentario").value = "";
            atualizarComentarios();
        }
    }
}

// Função para atualizar a lista de comentários
function atualizarComentarios() {
    var listaComentarios = document.getElementById("listaComentarios");

    let comenttxt = "";

    for (var i = 0; i < comentarios.comentarios.length; i++) {
        var comentario = comentarios.comentarios[i];
        if (comentario.ittenid == idrecebido) {
            comenttxt += `<div class="loadedcomment"><strong>${comentario.nome}: </strong>${comentario.comentario}</div>`;
        }
    }

    listaComentarios.innerHTML = comenttxt;

    localStorage.setItem("comentarios", JSON.stringify(comentarios));
}

// Verifica se há comentários salvos no localStorage
var comentariosSalvos = localStorage.getItem("comentarios");
if (comentariosSalvos !== null) {
    comentarios = JSON.parse(comentariosSalvos);
    atualizarComentarios();
}