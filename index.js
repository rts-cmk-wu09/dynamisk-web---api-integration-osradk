const pokemonList = document.getElementById('pokemon-list');

fetch('https://pokeapi.co/api/v2/pokemon')
  .then(response => response.json())
  .then(data => {
    data.results.forEach(result => {
        fetch(result.url)
        .then((response) => response.json())
        .then((pokemon) => {
         console.log(pokemon);
            const listItem = document.createElement('li');
            const link = document.createElement('a');
             link.textContent = pokemon.name;
             link.href = `detail.html?name=${pokemon.name}`;
             const img = document.createElement('img');
             img.src = pokemon.sprites.front_shiny;
             listItem.appendChild(link);
             listItem.appendChild(img)
            pokemonList.appendChild(listItem);
    
        });    
     });
  })
  .catch(error => console.error(error));

  