let loadedPokemon = [];
let nextUrl = "https://pokeapi.co/api/v2/pokemon?limit=20";
let renderedPokemonCounter = 0;
let currentPokemonIndex = 0;

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

function renderPokemons() {
  const showPokemonListRef = document.getElementById("pokemon-list-container");

  for (let i = renderedPokemonCounter; i < loadedPokemon.length; i++) {
    const currentPokemon = loadedPokemon[i];

    let pokeName = capitalizeFirstLetter(currentPokemon.name);
    let pokeID = currentPokemon.id;
    let pokePic = currentPokemon.sprites.other["official-artwork"].front_default;
    let pokeTypes = getPokemonTypes(i);

    showPokemonListRef.innerHTML += templatePokemonCard(i, pokeName, pokeID, pokePic, pokeTypes);
  }

  renderedPokemonCounter = loadedPokemon.length;
}

function capitalizeFirstLetter(param) {
  return String(param).charAt(0).toUpperCase() + String(param).slice(1);
}

async function loadMorePokemon() {
  showLoadingAnimation();
  await getPokemonFromAPI();
  renderPokemons();
}

function renderDetailedDialoge(pokemonIndex) {
  const showDetailedDialogeRef = document.getElementById("pokeDialoge");
  const currentPokemon = loadedPokemon[pokemonIndex];

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
  const currentPokemon = loadedPokemon[pokemonIndex];
  let audio = new Audio(currentPokemon.cries.latest);
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

function renderDetaileStats(pokemonIndex) {
  const showDetaileMainRef = document.getElementById(`display-toggle-${pokemonIndex}`);
  const currentPokemon = loadedPokemon[pokemonIndex];

  showDetaileMainRef.innerHTML = templatePokedexDisplayStats(pokemonIndex);

  let hpPercent = (currentPokemon.stats[0].base_stat / 255) * 100;
  let atkPercent = (currentPokemon.stats[1].base_stat / 255) * 100;
  let defPercent = (currentPokemon.stats[2].base_stat / 255) * 100;
  let spAtkPercent = (currentPokemon.stats[3].base_stat / 255) * 100;
  let spDefPercent = (currentPokemon.stats[4].base_stat / 255) * 100;
  let speedPercent = (currentPokemon.stats[5].base_stat / 255) * 100;

  document.getElementById(`bar-hp-${pokemonIndex}`).style.width = `${hpPercent}%`;
  document.getElementById(`bar-atk-${pokemonIndex}`).style.width = `${atkPercent}%`;
  document.getElementById(`bar-def-${pokemonIndex}`).style.width = `${defPercent}%`;
  document.getElementById(`bar-spatk-${pokemonIndex}`).style.width = `${spAtkPercent}%`;
  document.getElementById(`bar-spdef-${pokemonIndex}`).style.width = `${spDefPercent}%`;
  document.getElementById(`bar-speed-${pokemonIndex}`).style.width = `${speedPercent}%`;
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
  const currentPokemon = loadedPokemon[pokemonIndex];
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
  } else if (currentPokemonIndex == loadedPokemon.length) {
    currentPokemonIndex = loadedPokemon.length - 1;
  }

  renderDetailedDialoge(currentPokemonIndex);
}

function fillBar() {
  progressBar.style.width = "100%";
}

function showLoadingAnimation() {
  let loadMoreButtonRef = document.getElementById("btnLoadMore");
  let loadingScreenRef = document.getElementById("loading-spinner");
  let progressBar = document.getElementById("progressBar");

  setTimeout(() => {
    loadingScreenRef.classList.add("d_none");
    loadMoreButtonRef.classList.remove("d_none");
    document.body.classList.remove("no-scroll");
  }, 3500);
  loadingScreenRef.classList.remove("d_none");
  loadMoreButtonRef.classList.add("d_none");
  document.body.classList.add("no-scroll");
  progressBar.style.width = "0%";
  setTimeout(fillBar, 10);
}
