document.addEventListener("DOMContentLoaded", () => {

  document.querySelector("#number").addEventListener("change", displayPokemon);
  document.querySelector("#rdm").addEventListener("click", randomPokemon);
});

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function formatUnit(measurement) {
  return measurement/10;
}

async function displayPokemon() {
  try {
    let pokemonnum = document.querySelector("#number").value;
    let sprite = document.querySelector("#sprite");
    let card = document.querySelector("#card");
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonnum}`;
    let response = await fetch(url);
    let data = await response.json();

    // Only return with valid pokedex num
    if (pokemonnum < 1 || pokemonnum > 1026) {
      document.querySelector("#name").textContent = "Enter a valid pokedex number";
      document.querySelector("#num").textContent = "";
      document.querySelector("#type").textContent = "";
      document.querySelector("#height").textContent = "";
      document.querySelector("#weight").textContent = "";      
      sprite.hidden = true;
      card.hidden = false;
      return;
    }

    //the API returns false when the pokemon api returns no data
    if (data === false) {
      document.querySelector("#name").textContent = "Pokemon code not found";
      document.querySelector("#num").textContent = "";
      document.querySelector("#type").textContent = "";
      document.querySelector("#height").textContent = "";
      document.querySelector("#weight").textContent = "";      
      document.querySelector("#sprite").src = "";  
      sprite.hidden = true;
      card.hidden = false;
      return;
    }


    document.querySelector("#name").textContent = capitalize(data.name);
    document.querySelector("#num").textContent = "#"+data.id;
    document.querySelector("#type").textContent = data.types.map(item => capitalize(item.type.name)).join(", ");
    document.querySelector("#height").textContent = formatUnit(data.height) + " m";
    document.querySelector("#weight").textContent = formatUnit(data.weight) + " kg";  
    document.querySelector("#sprite").src = data.sprites.front_default;  

    sprite.hidden = false;
    card.hidden = false;

  } catch (error) {
    document.querySelector("#name").textContent = "Unable to retrieve pokemon data";
    console.error(error);
  }
}

async function randomPokemon() {
  let randomNumber = Math.floor(Math.random() * 1026) + 1;

  document.querySelector("#number").value = randomNumber;

  displayPokemon();
}