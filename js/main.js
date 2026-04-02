let loadedPokemon = [];
let nextUrl = "https://pokeapi.co/api/v2/pokemon?limit=20";
let renderedPokemonCounter = 0;

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

  for (let i = renderedPokemonCounter; i < loadedPokemon.length; i++) {
    const currentPokemon = loadedPokemon[i];

    let pokeName = capitalizeFirstLetter(currentPokemon.name);
    let pokeID = currentPokemon.id;
    let pokePic = currentPokemon.sprites.other["official-artwork"].front_default;

    showPokemonListRef.innerHTML += templatePokemonCard(i, pokeName, pokeID, pokePic);
    getPokemonTypes(i);
  }

  renderedPokemonCounter = loadedPokemon.length;
}

function capitalizeFirstLetter(param) {
  return String(param).charAt(0).toUpperCase() + String(param).slice(1);
}

async function loadMorePokemon() {
  await getPokemonFromAPI();
  renderPokemons();
}

function renderDetailedDialoge(pokemonIndex) {
  const showDetailedDialogeRef = document.getElementById("pokeDialoge");
  const currentPokemon = loadedPokemon[pokemonIndex];

  let pokeName = capitalizeFirstLetter(currentPokemon.name);
  let pokeID = currentPokemon.id;
  let animPokePic = currentPokemon.sprites.other.showdown.front_shiny;
  let PokeMain = currentPokemon.main;
  let PokeStats = currentPokemon.stats;

  showDetailedDialogeRef.innerHTML = templateDetailedDialoge(
    pokemonIndex,
    pokeName,
    pokeID,
    animPokePic,
    PokeMain,
    PokeStats,
  );
  getPokemonCrie(pokemonIndex);
}

function openDialog(index) {
  let pokeDialogRef = document.getElementById("pokeDialoge");

  document.body.classList.add("no-scroll");

  pokeDialogRef.showModal();
  renderDetailedDialoge(index);
}

function closeDialog() {
  let pokeDialogRef = document.getElementById("pokeDialoge");

  document.body.classList.remove("no-scroll");
  pokeDialogRef.close();
}

function closeDialogBubbleProtection(event) {
  event.stopPropagation();
}

function getPokemonCrie(pokemonIndex) {
  const currentPokemon = loadedPokemon[pokemonIndex];
  var audio = new Audio(currentPokemon.cries.latest);
  audio.volume = 0.05;
  audio.play();
}

function renderDetaileMain(pokemonIndex) {
  const showDetaileMainRef = document.getElementById(`display-toggle-${pokemonIndex}`);
  const currentPokemon = loadedPokemon[pokemonIndex];

  let pokeHeight = currentPokemon.height;
  let pokeWeight = currentPokemon.weight;
  let pokeExp = currentPokemon.base_experience;
  let pokeAbilities = getPokemonAbilities(pokemonIndex);

  showDetaileMainRef.innerHTML = templatePokedexDisplayMain(
    pokemonIndex,
    pokeHeight,
    pokeWeight,
    pokeExp,
    pokeAbilities,
  );
}

function getPokemonAbilities(pokemonIndex) {
  const currentPokemon = loadedPokemon[pokemonIndex];
  const abilitiesArray = currentPokemon.abilities;
  let extractedAbilities = [];

  abilitiesArray.forEach(function (abilityObject) {
    extractedAbilities.push(abilityObject.ability.name);
  });
  return extractedAbilities.join(", ");
}

function getPokemonTypes(pokemonIndex) {
  const showPokemonTypesRef = document.getElementById(`pokeCategorieContainer-${pokemonIndex}`);
  const currentPokemon = loadedPokemon[pokemonIndex];
  const typesArray = currentPokemon.types;

  typesArray.forEach(function (typeObect) {
    let typeName = typeObect.type.name;

    showPokemonTypesRef.innerHTML += templatePokedexDisplaTypes(typeName);
  });
}
