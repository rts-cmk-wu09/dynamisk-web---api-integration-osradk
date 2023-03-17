const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokemonName = urlParams.get("name");

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  .then((response) => response.json())
  .then((data) => {
    document.body.innerHTML += ` 
  <section>
        <figure>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h2>${data.name}</h2>
            <p> <span>Height:</span> ${data.height}</p> 
            <h3>
            Abilities:
           </h3>
            `;

      data.abilities.forEach((ability) => {
      document.querySelector("figure").innerHTML += `<p> ${ability.ability.name} </p>`;
    });
    document.body.innerHTML += ` 
            
        </figure>
   
</section>`;
  })
  .catch((error) => console.error(error));
