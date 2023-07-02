const upDB = 'unsafePoints';

function leDados() {
    let strDados = localStorage.getItem(upDB);
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

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");
const goSearchButton = document.getElementById("gosearch");
const cleanSearchButton = document.getElementById("cleansearch");

inputBox.onkeyup = function filtrar() {
    let result = [];
    let input = inputBox.value.trim().toLowerCase();

    if (input.length) {
        result = availableKeywords.filter((item) => {
            return item.id.toString().includes(input) ||
                   item.rua.toLowerCase().includes(input) ||
                   item.bairro.toLowerCase().includes(input) ||
                   item.cidade.toLowerCase().includes(input) ||
                   item.uf.toLowerCase().includes(input) ||
                   item.more.toLowerCase().includes(input) ||
                   item.tipo.toLowerCase().includes(input);
        });
    }

    display(result);

    if (!result.length) {
        resultsBox.innerHTML = '';
    }
    
    goSearchButton.style.display = input.length ? "none" : "block";
    cleanSearchButton.style.display = input.length ? "block" : "none";
};

function algoescrito(){
    let input = inputBox.value.trim().toLowerCase();
    goSearchButton.style.display = input.length ? "none" : "block";
    cleanSearchButton.style.display = input.length ? "block" : "none";
    resultsBox.innerHTML = '';
}


function display(result) {
    const content = result.map((item) => {
        return "<li onclick='selectInput(this)' data-id='" + item.id + "'>" + item.rua + " nº" + item.numero + ", " + item.bairro + ", " + item.cidade + ", " + item.uf + "</li>";
    });

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list) {
    inputBox.value = list.innerHTML;
    const id = list.getAttribute("data-id");
    window.location = "../Detalhes/moreinfo.html?id=" + id;
}

function cleansearchbar(){
    inputBox.value = '';
    algoescrito()
}

document.getElementById('btnclean').addEventListener('click', cleansearchbar);



const lastLogin = 'LastLogin';

/*
    LOGIN
*/
let logado = false;
let ultimoLogin;

function validate () {
    let strDados = localStorage.getItem(lastLogin);
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
        ultimoLogin = objDados.login[0].id;

        if ((Date.now() - objDados.login[0].horario) < 1800000) {
            return true;
        }else{
            return false;
        }
    }else{
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

function UserLogado ( userid ) {
    logado = validate();
    let users = leUsuarios();

    let imglogin = document.getElementById("loginNav");

    if (logado) {
        imglogin.innerHTML = `<div class="navitem navlogged">${users.usuarios[ultimoLogin-1].nome}</div>`;
    }

}
