// JSON com os comentários
var comentarios = {
    "comentarios": []
};

// Função para enviar o comentário
function enviarComentario() {
    var nome = document.getElementById("nome").value;
    var comentario = document.getElementById("comentario").value;
    if (nome !== "" && comentario !== "") {
        var novoComentario = {
            "nome": nome,
            "comentario": comentario
        };
        comentarios.comentarios.push(novoComentario);
        document.getElementById("nome").value = "";
        document.getElementById("comentario").value = "";
        atualizarComentarios();
    }
}

// Função para atualizar a lista de comentários
function atualizarComentarios() {
    var listaComentarios = document.getElementById("listaComentarios");
    
    listaComentarios.innerHTML = "";
    
    for (var i = 0; i < comentarios.comentarios.length; i++) {
        var comentario = comentarios.comentarios[i];
        var divComentario = document.createElement("div");
        divComentario.innerHTML = "<strong>" + comentario.nome + "</strong>: " + comentario.comentario;
        listaComentarios.appendChild(divComentario);
    }
    
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
}

// Verifica se há comentários salvos no localStorage
var comentariosSalvos = localStorage.getItem("comentarios");
if (comentariosSalvos !== null) {
    comentarios = JSON.parse(comentariosSalvos);
    atualizarComentarios();
}

