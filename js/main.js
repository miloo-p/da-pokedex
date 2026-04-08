//#region Global Variables
let loadedPokemon = [];
let currentDisplayedPokemon = [];
let nextUrl = "https://pokeapi.co/api/v2/pokemon?limit=20";
let currentPokemonIndex = 0;
//#endregion

//#region Initialization & API
async function init() {
  let success = await getPokemonFromAPI();

  if (success) {
    renderPokemons();
  }
}

async function getPokemonFromAPI() {
  try {
    let pokemonAsHTTPResponse = await fetch(nextUrl);
    let pokemon = await pokemonAsHTTPResponse.json();
    nextUrl = pokemon.next;

    await loopPokemonList(pokemon.results);

    currentDisplayedPokemon = loadedPokemon;
    return true;
  } catch (error) {
    console.log("Fehler in getPokemonFromAPI:", error);
    renderErrorMessage();
    return false;
  }
}

async function loopPokemonList(results) {
  for (let i = 0; i < results.length; i++) {
    let pokemonDetail = await getPokemonDetailFromAPI(results[i].url);

    if (pokemonDetail) {
      loadedPokemon.push(pokemonDetail);
    }
  }
}

async function getPokemonDetailFromAPI(url) {
  try {
    let pokemonDetailAsHTTPResponse = await fetch(url);
    let pokemonDetail = await pokemonDetailAsHTTPResponse.json();
    return pokemonDetail;
  } catch (error) {
    console.log("Fehler in getPokemonDetailFromAPI:", error);
    renderErrorMessage();
  }
}

function renderErrorMessage() {
  const ErrorMsg = document.getElementById("pokemon-list-container");
  ErrorMsg.innerHTML = templateErrorMessage();
}
//#endregion

//#region Main List Rendering & Search
function filterPokemon() {
  let searchInputRef = document.getElementById("searchInput");
  let search = searchInputRef.value.toLowerCase();

  toggleSearchErrorClass(search.length, searchInputRef);

  if (search.length >= 3) {
    currentDisplayedPokemon = loadedPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(search));
  } else {
    currentDisplayedPokemon = loadedPokemon;
  }

  renderPokemons();
}

function renderPokemons() {
  const showPokemonListRef = document.getElementById("pokemon-list-container");
  showPokemonListRef.innerHTML = "";

  for (let i = 0; i < currentDisplayedPokemon.length; i++) {
    const currentPokemon = currentDisplayedPokemon[i];

    let pokeName = capitalizeFirstLetter(currentPokemon.name);
    let pokeID = currentPokemon.id;
    let pokePic = currentPokemon.sprites.other["official-artwork"].front_default;
    let pokeTypes = getPokemonTypes(i);
    let bgTypes = getCardBackgroundTypes(i);

    showPokemonListRef.innerHTML += templatePokemonCard(i, pokeName, pokeID, pokePic, pokeTypes, bgTypes);
  }
}

function capitalizeFirstLetter(param) {
  return String(param).charAt(0).toUpperCase() + String(param).slice(1);
}

async function loadMorePokemon() {
  showLoadingAnimation();

  let searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";

  await getPokemonFromAPI();
  renderPokemons();
}
//#endregion

//#region Dialog Handling & Detail View
function renderDetailedDialoge(pokemonIndex) {
  const showDetailedDialogeRef = document.getElementById("pokeDialoge");
  const currentPokemon = currentDisplayedPokemon[pokemonIndex];

  let pokeName = capitalizeFirstLetter(currentPokemon.name);
  let pokeID = currentPokemon.id;
  let animPokePic = currentPokemon.sprites.other.showdown.front_shiny;
  let pokeTypes = getPokemonTypes(pokemonIndex);

  showDetailedDialogeRef.innerHTML = templateDetailedDialoge(
    pokemonIndex,
    pokeName,
    pokeID,
    animPokePic,
    pokeTypes,
  );

  renderDetaileMain(pokemonIndex);
}

function openDialog(index) {
  let pokeDialogRef = document.getElementById("pokeDialoge");

  document.body.classList.add("no-scroll");
  currentPokemonIndex = index;

  pokeDialogRef.showModal();
  renderDetailedDialoge(currentPokemonIndex);
  getPokemonCrie(currentPokemonIndex);
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
  const currentPokemon = currentDisplayedPokemon[pokemonIndex];
  let audio = new Audio(currentPokemon.cries.latest);
  audio.volume = 0.05;
  audio.play();
}

function renderDetaileMain(pokemonIndex) {
  const showDetaileMainRef = document.getElementById(`display-toggle-${pokemonIndex}`);
  const currentPokemon = currentDisplayedPokemon[pokemonIndex];

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

function renderDetaileStats(pokemonIndex) {
  const pokemon = currentDisplayedPokemon[pokemonIndex];
  const statLabels = ["HP", "ATK", "DEF", "SP-ATK", "SP-DEF", "SPEED"];
  let allStatsHTML = "";

  statLabels.forEach((label, i) => {
    const percent = (pokemon.stats[i].base_stat / 255) * 100;
    allStatsHTML += templateStatRow(label, percent);
  });

  const container = document.getElementById(`display-toggle-${pokemonIndex}`);
  container.innerHTML = templatePokedexStatTable(allStatsHTML);
}

function getPokemonAbilities(pokemonIndex) {
  const currentPokemon = currentDisplayedPokemon[pokemonIndex];
  const abilitiesArray = currentPokemon.abilities;
  let extractedAbilities = [];

  abilitiesArray.forEach(function (abilityObject) {
    extractedAbilities.push(abilityObject.ability.name);
  });
  return extractedAbilities.join(", ");
}

function getPokemonTypes(pokemonIndex) {
  const currentPokemon = currentDisplayedPokemon[pokemonIndex];
  const typesArray = currentPokemon.types;

  let typesHTML = "";

  typesArray.forEach(function (typeObect) {
    let typeName = typeObect.type.name;
    typesHTML += templatePokedexDisplaTypes(typeName);
  });

  return typesHTML;
}

function changeDialogPokemon(position) {
  currentPokemonIndex += position;

  if (currentPokemonIndex < 0) {
    currentPokemonIndex = 0;
  } else if (currentPokemonIndex >= currentDisplayedPokemon.length) {
    currentPokemonIndex = currentDisplayedPokemon.length - 1;
  }

  renderDetailedDialoge(currentPokemonIndex);
}
//#endregion

//#region Animations & Utility
function fillBar() {
  let progressBar = document.getElementById("progressBar");
  if (progressBar) progressBar.style.width = "100%";
}

function showLoadingAnimation() {
  const loadingScreenRef = document.getElementById("loading-spinner");
  const loadMoreButtonRef = document.getElementById("btnLoadMore");

  loadingScreenRef.classList.remove("d_none");
  loadMoreButtonRef.classList.add("d_none");
  document.body.classList.add("no-scroll");

  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    progressBar.style.width = "0%";
    setTimeout(fillBar, 10);
  }

  setTimeout(hideLoadingAnimation, 3500);
}

function hideLoadingAnimation() {
  document.getElementById("loading-spinner").classList.add("d_none");
  document.getElementById("btnLoadMore").classList.remove("d_none");
  document.body.classList.remove("no-scroll");
}

function getCardBackgroundTypes(pokemonIndex) {
  const types = currentDisplayedPokemon[pokemonIndex].types;
  let type1 = types[0].type.name;

  if (types.length === 1) {
    return `bg-single t1-${type1}`;
  } else {
    let type2 = types[1].type.name;
    return `bg-dual t1-${type1} t2-${type2}`;
  }
}

function toggleSearchErrorClass(searchLength, inputElement) {
  if (searchLength > 0 && searchLength < 3) {
    inputElement.classList.add("input-error");
  } else {
    inputElement.classList.remove("input-error");
  }
}
//#endregion
