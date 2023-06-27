// Selecionar o elemento do botão "Criar nova comunidade"
var criarComunidadeBtn = document.querySelector('.category');

// Adicionar um evento de clique ao botão
criarComunidadeBtn.addEventListener('click', function () {
  // Criar um novo elemento de card
  var novoCard = document.createElement('div');
  novoCard.classList.add('card');
  novoCard.innerHTML = '<img src="comunidade.png" style="width: 10rem;" alt="Nova imagem" class="images"><p class="category">Nova comunidade</p>';

  // Selecionar o contêiner de cards
  var cardsContainer = document.getElementById('cards');

  // Adicionar o novo card ao contêiner
  cardsContainer.appendChild(novoCard);
});
function adicionarcard() {
  jsoncomunidades = JSON.parse(localStorage.getItem("comunidades"))
  var cardsContainer = document.getElementById('cards');
  cardsContainer.innerHTML = '';
  for (i = 0; i < jsoncomunidades.comunidades.length; i++) {
    var novoCard = document.createElement('div');
    novoCard.classList.add('card');
    novoCard.classList.add('me-2');
    novoCard.innerHTML = `<img src="comunidade.png" style="width: 8rem;" alt="Nova imagem" class="images"><p class="category">${jsoncomunidades.comunidades[i].nome}</p>`


    // Adicionar o novo card ao contêiner
    cardsContainer.appendChild(novoCard);
  }
}
$(document).ready(() => {
  cardjson = JSON.parse(localStorage.getItem("comunidades"))
  if(cardjson == null){
    cardjson = { comunidades: [] }
    localStorage.setItem("comunidades", JSON.stringify(cardjson))
  }
  adicionarcard()
})
$("#buato").click(() => {
  var texto = {
    "nome": $("#texto").val()
  }
  jsoncomunidades = JSON.parse(localStorage.getItem("comunidades"))
  jsoncomunidades.comunidades.push(texto)
  localStorage.setItem("comunidades", JSON.stringify(jsoncomunidades))
  adicionarcard()
})
function testanome(nome, pesquisa){
  var iguais = 0;
    var x = 0;
    if(pesquisa == ""){
       return true; 
    }
    for(x = 0; x< nome.length; x++){
        if (nome[x] == pesquisa [0]){
            break;
        }
    }
    for(z = 0; z<pesquisa.length; z++){
        if(pesquisa[z] == nome[x + z] ){
            iguais++;
        }
    }
    if((iguais/pesquisa.length)*100>=60){
        return true;
    }
    return false;
}
function filtrarcards(pesquisa) {
  jsoncomunidades = JSON.parse(localStorage.getItem("comunidades"))
  var cardsContainer = document.getElementById('cards');
  cardsContainer.innerHTML = '';
  for (i = 0; i < jsoncomunidades.comunidades.length; i++) {
    if(testanome(jsoncomunidades.comunidades[i].nome, pesquisa)){
      var novoCard = document.createElement('div');
    novoCard.classList.add('card');
    novoCard.classList.add('me-2');
    novoCard.innerHTML = `<img src="comunidade.png" style="width: 8rem;" alt="Nova imagem" class="images"><p class="category">${jsoncomunidades.comunidades[i].nome}</p>`
    cardsContainer.appendChild(novoCard);
    }
  }
}
$("#vaca").click (()=> {
  console.log("xerecande")
  pesquisa = $("#coelho").val()
  filtrarcards(pesquisa)
})
