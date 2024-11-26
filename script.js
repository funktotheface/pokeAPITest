const randomId = Math.floor(Math.random() * 150) + 1

// Example of fetching Pokémon data
fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`) // Fetch data for Pokémon ID 1
  .then(response => response.json()) // Parse JSON
  .then(data => {
    const randomImage = data.sprites.front_default;
    const randomName = data.name;

    const pokemonImageElement = document.querySelector("#pokemonImage")
    if (pokemonImageElement) {
        pokemonImageElement.src = randomImage;
}
    const pokemonNameElement = document.querySelector("#pokemonName")
    if (pokemonNameElement) {
        pokemonNameElement.innerText = randomName;

    }
    
  })
  .catch(error => console.error('Error:', error));

