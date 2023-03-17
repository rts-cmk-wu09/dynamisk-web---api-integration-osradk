
const limit = 20;
let offset = 0;
let pages = 0;
let currentPage = 1;
let pokemons = [];
let currentPokemons = [];

function fetchPokemons(offset) {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    .then((data) => {
      
        currentPokemons = data.results;
        pages = data.count / limit;
        pages = Math.ceil(pages);

      // Clear previous content
      document.querySelector("#pokemons").innerHTML = "";

    
      data.results.forEach((result) => {
        fetch(result.url)
          .then((response) => response.json())
          .then((pokemon) => {
          
            const pokemonCard = `
              <div class="pokemon-card">
                <h2><a href="detail.html?name=${pokemon.name}">${pokemon.name}</a> </h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
              </div>
            `;
            document.querySelector("#pokemons").innerHTML += pokemonCard;
          });
      });

      

      // Add navigation buttons
      document.querySelector("#navigation").innerHTML = "";

      if (offset > 0) {
        const prevButton = document.createElement("button");
        prevButton.textContent = "Prev";
        prevButton.addEventListener("click", () => {
          fetchPokemons(offset - limit);
          currentPage -= 1;
        });
        document.querySelector("#navigation").appendChild(prevButton);
      }

      const page =  document.createElement("p");
      page.innerHTML =  currentPage + "/" + pages;
      document.querySelector("#navigation").appendChild(page);      

      if (offset + limit < data.count) {
        console.log(data.count);
        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.addEventListener("click", () => {
          fetchPokemons(offset + limit);
          currentPage += 1;
        });
        document.querySelector("#navigation").appendChild(nextButton);
      }
    })
    .catch((error) => console.error(error));
}

fetchPokemons(offset);


fetchPokemonsSearch();

function fetchPokemonsSearch() {
    fetch(`https://pokeapi.co/api/v2/pokemon`)
      .then((response) => response.json())
      .then((data) => {
        pokemons = data.results;
        // resten af koden
      })
      .catch((error) => console.error(error));
  }

const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('keyup', () => {
console.log(searchInput.value);
  if (searchInput.value == ""){
    fetchPokemons(offset);
  }  else {
    console.log("test")
    timeoutId = setTimeout(filterPokemons, 300);
  }
});


function filterPokemons() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemons = pokemons.filter(element => element.name.includes(searchTerm));
   
    filteredPokemons.forEach((result) => {
      fetch(result.url)
        .then((response) => response.json())
        .then((pokemon) => {
            document.querySelector("#pokemons").innerHTML = "";
          document.querySelector("#pokemons").innerHTML += `
          <div class="pokemon-card">
              <h2><a href="detail.html?name=${pokemon.name}">${pokemon.name}</a></h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          </div>
        `;
        });
    });
  }
  