document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    var searchValue = document.querySelector('#search-input').value.toLowerCase();

    fetch('pontos.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var pontos = data.pontos;

            pontos.forEach(function(ponto) {
                var nome = ponto.nome.toLowerCase();
                var card = document.querySelector('#' + nome.replace(/\s/g, ''));

                if (nome.indexOf(searchValue) !== -1) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
});