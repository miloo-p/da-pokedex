//#region Main Components
function templatePokemonCard({ index, name, id, pic, types, bgClasses }) {
  return `
    <article class="poke-list-item" onclick="openDialog(${index})">
      <section class="header__poke-list-item-${index} utc_flex-dir-row utc_flex-ai-center utc_flex-jc-center utc_flex-gap-sm">
        <h3 class="poke-ID">#${id}</h3>
        <h3>${name}</h3>
      </section>
      <section class="main__poke-list-item-${index}">
        <div class="poke-image-container ${bgClasses} utc_flex-dir-row utc_flex-jc-center utc_flex-ai-center">
          <img class="poke-item-picture" loading="lazy" src="${pic}" alt="${name}" />
        </div>
        <div class="poke-item-categories utc_flex-dir-row utc_flex-ai-center utc_flex-jc-center utc_flex-gap-sm">
          ${types}
        </div>
      </section>
    </article>
  `;
}

function templateDetailedDialoge({ index, name, id, pic, types }) {
  return `
    <article class="poke-dialog-${index}" onclick="closeDialogBubbleProtection(event)">
      <div class="utc_flex-dir-row respnsive-dialog">
        <div class="pokedex-left">
          <button class="pokedex-exit-btn" onclick="closeDialog()"></button>
          <div class="pokedex-display-outer utc_flex-dir-col utc_flex-jc-center utc_flex-ai-center">
            <div id="dialogPic" class="pokedex-display-inner utc_flex-dir-row utc_flex-jc-center utc_flex-ai-center">
              <img src="${pic}" loading="lazy" class="dialogPicture" alt="" onclick="getPokemonCrie(${index})" />
            </div>
          </div>
          <div class="pokedex-controls utc_flex-dir-row utc_flex-jc-sbetween">
            <button class="pokedex-picture-btn" onclick="changeDialogPokemon(-1)"><</button>
            <button class="pokedex-picture-btn" onclick="changeDialogPokemon(+1)">></button>
          </div>
        </div>
        <div class="pokedex-mid"></div>
        <div class="pokedex-right utc_flex-dir-col utc_flex-jc-sbetween utc_flex-ai-center">
          <div class="display-pokemon-ident utc_flex-dir-row utc_flex-jc-start utc_flex-ai-center utc_flex-gap-sm">
            <h3 id="pokeID-${index}" class="poke-ID">#${id}</h3>
            <h3 id="pokeName-${index}" class="poke-ID">${name}</h3>
            <div class="poke-dialog-categories utc_flex-dir-row utc_flex-ai-center utc_flex-jc-center utc_flex-gap-sm">
              ${types}
            </div>
          </div>
          <div id="display-toggle-${index}" class="pokedex-display utc_flex-dir-row"></div>
          <div class="pokedex-button-nav utc_flex-dir-row utc_flex-jc-evenly utc_flex-ai-center utc_flex-gap-sm">
            <button class="pokedex-nav-btn" onclick="renderDetaileMain(${index})">Main</button>
            <button class="pokedex-nav-btn" onclick="renderDetaileStats(${index})">Stats</button>
          </div>
        </div>
      </div>
    </article>
  `;
}
//#endregion

//#region Details
function templatePokedexDisplayMain({ height, weight, exp, abilities }) {
  return `
    <ul class="poke-main-list">
      <li class="main-list-item">
        <span class="main-list-label">Height:</span>
        <span class="main-list-value">${height} m</span>
      </li>
      <li class="main-list-item">
        <span class="main-list-label">Weight:</span>
        <span class="main-list-value">${weight} kg</span>
      </li>
      <li class="main-list-item">
        <span class="main-list-label">Base experience:</span>
        <span class="main-list-value">${exp}</span>
      </li>
      <li class="main-list-item">
        <span class="main-list-label">Abilities:</span>
        <span class="main-list-value">${abilities}</span>
      </li>
    </ul>
  `;
}

function templatePokedexStatTable(allStatsHTML) {
  return `
    <div class="poke-stat-table">
      ${allStatsHTML}
    </div>
  `;
}

function templateStatRow(label, percent) {
  return `
    <div class="display-stat stat-row">
      <p class="stat-label">${label}</p>
      <div class="stat-bar-bg">
        <div class="stat-bar-fill" style="width: ${percent}%"></div>
      </div>
    </div>
  `;
}
//#endregion

//#region Helpers
function templatePokedexDisplaTypes(typeName) {
  return `<img class="categorie-badge" src="./assets/icons/types/${typeName}.svg">`;
}

function templateErrorMessage() {
  return `
    <h3 class="error-message-text">
      https://pokeapi.co/ unreachable - please try again later.
    </h3>
  `;
}

function templateNotFoundMessage() {
  return `
    <h3 class="error-message-text">
      No Pokémon found. Please check your spelling! Also: The search only works for already loaded pokemon!
    </h3>
  `;
}
//#endregion
