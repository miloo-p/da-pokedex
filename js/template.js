//#region Main Components
function templatePokemonCard(i, PokeName, PokeID, PokePic, pokeTypes, bgClasses) {
  return `
    <article class="poke-list-item" onclick="openDialog(${i})">
      <section class="header__poke-list-item-${i} utc_flex-dir-row utc_flex-ai-center utc_flex-jc-center utc_flex-gap-sm">
        <h3 class="poke-ID">#${PokeID}</h3>
        <h3>${PokeName}</h3>
      </section>
      <section class="main__poke-list-item-${i}">
        <div class="poke-image-container ${bgClasses} utc_flex-dir-row utc_flex-jc-center utc_flex-ai-center">
          <img class="poke-item-picture" loading="lazy" src="${PokePic}" alt="${PokeName}" />
        </div>
        <div class="poke-item-categories utc_flex-dir-row utc_flex-ai-center utc_flex-jc-center utc_flex-gap-sm">
          ${pokeTypes}
        </div>
      </section>
    </article>
  `;
}

function templateDetailedDialoge(i, pokeName, pokeID, animPokePic, pokeTypes) {
  return `
    <article class="poke-dialog-${i}" onclick="closeDialogBubbleProtection(event)">
      <div class="utc_flex-dir-row respnsive-dialog">
        <div class="pokedex-left">
          <button class="pokedex-exit-btn" onclick="closeDialog()"></button>
          <div class="pokedex-display-outer utc_flex-dir-col utc_flex-jc-center utc_flex-ai-center">
            <div id="dialogPic" class="pokedex-display-inner utc_flex-dir-row utc_flex-jc-center utc_flex-ai-center">
              <img src="${animPokePic}" loading="lazy" class="dialogPicture" alt="" onclick="getPokemonCrie(${i})" />
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
            <h3 id="pokeID-${i}" class="poke-ID">#${pokeID}</h3>
            <h3 id="pokeName-${i}" class="poke-ID">${pokeName}</h3>
            <div class="poke-dialog-categories utc_flex-dir-row utc_flex-ai-center utc_flex-jc-center utc_flex-gap-sm">
              ${pokeTypes}
            </div>
          </div>
          <div id="display-toggle-${i}" class="pokedex-display utc_flex-dir-row"></div>
          <div class="pokedex-button-nav utc_flex-dir-row utc_flex-jc-evenly utc_flex-ai-center utc_flex-gap-sm">
            <button class="pokedex-nav-btn" onclick="renderDetaileMain(${i})">Main</button>
            <button class="pokedex-nav-btn" onclick="renderDetaileStats(${i})">Stats</button>
          </div>
        </div>
      </div>
    </article>
  `;
}
//#endregion

//#region Details
function templatePokedexDisplayMain(i, pokeHeight, pokeWeight, pokeExp, pokeAbilities) {
  return `
    <ul class="poke-main-list">
      <li class="main-list-item">
        <span class="main-list-label">Height:</span>
        <span class="main-list-value">${pokeHeight} m</span>
      </li>
      <li class="main-list-item">
        <span class="main-list-label">Weight:</span>
        <span class="main-list-value">${pokeWeight} kg</span>
      </li>
      <li class="main-list-item">
        <span class="main-list-label">Base experience:</span>
        <span class="main-list-value">${pokeExp}</span>
      </li>
      <li class="main-list-item">
        <span class="main-list-label">Abilities:</span>
        <span class="main-list-value">${pokeAbilities}</span>
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
//#endregion
