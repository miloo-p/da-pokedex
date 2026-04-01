let loadedPokemon = [];
let nextUrl = "https://pokeapi.co/api/v2/pokemon?limit=20";

async function init() {
  await getPokemonFromAPI();
  renderPokemons();
}

async function getPokemonFromAPI() {
  try {
    let pokemonAsHTTPResponse = await fetch(nextUrl);
    let pokemon = await pokemonAsHTTPResponse.json();

    nextUrl = pokemon.next;

    for (let i = 0; i < pokemon.results.length; i++) {
      let basicPokemon = pokemon.results[i];
      let pokemonDetail = await getPokemonDetailFromAPI(basicPokemon.url);

      if (pokemonDetail) {
        loadedPokemon.push(pokemonDetail);
      }
    }

    console.log("Aktueller Speicher:", loadedPokemon);
  } catch (error) {
    console.log("Fehler in getPokemonFromAPI:", error);
  }
}

async function getPokemonDetailFromAPI(url) {
  try {
    let pokemonDetailAsHTTPResponse = await fetch(url);
    let pokemonDetail = await pokemonDetailAsHTTPResponse.json();

    return pokemonDetail;
  } catch (error) {
    console.log("Fehler in getPokemonDetailFromAPI:", error);
  }
}

function renderPokemons() {
  const showPokemonListRef = document.getElementById("pokemon-list-container");
  showPokemonListRef.innerHTML = "";

  for (let i = 0; i < loadedPokemon.length; i++) {
    const currentPokemon = loadedPokemon[i];

    let pokeName = capitalizeFirstLetter(currentPokemon.name);
    let pokeID = currentPokemon.id;
    let pokePic = currentPokemon.sprites.other["official-artwork"].front_default;

    showPokemonListRef.innerHTML += templatePokemonCard(i, pokeName, pokeID, pokePic);
  }
}

function capitalizeFirstLetter(param) {
  return String(param).charAt(0).toUpperCase() + String(param).slice(1);
}

function loadMorePokemon() {
  getPokemonFromAPI();
  renderPokemons();
}
