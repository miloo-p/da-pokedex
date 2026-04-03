function templatePokemonCard(i, PokeName, PokeID, PokePic) {
  return `
          <article class="poke-list-item" onclick="openDialog(${i})">

            <section class="header__poke-list-item-${i} utc_flex-dir-row utc_flex-ai-center utc_flex-jc-center utc_flex-gap-sm">
              <h3 id="pokeID-${i}" class="poke-ID">#${PokeID}</h3>
              <h3 id="pokeName-${i}">${PokeName}</h3>
            </section>

            <section class="main__poke-list-item-${i}">
              <img id="pokeBigPicture-${i}" class="poke-item-picture" src="${PokePic}" alt="Bild von ${PokeName}" />
              <div id="pokeCategorieContainer-${i}" class="poke-item-categories utc_flex-dir-row utc_flex-ai-center utc_flex-jc-center utc_flex-gap-sm">
              </div>
            </section>

          </article>
  `;
}

function templateDetailedDialoge(i, pokeName, pokeID, animPokePic, PokeMain, PokeStats) {
  return `
        <article class="poke-dialog-${i}" onclick="closeDialogBubbleProtection(event)">
          <div class="utc_flex-dir-row">
            <div class="pokedex-left">
              <div class="pokedex-display-outer utc_flex-dir-col utc_flex-jc-center utc_flex-ai-center">
                <div
                  id="dialogPic"
                  class="pokedex-display-inner utc_flex-dir-row utc_flex-jc-center utc_flex-ai-center">
                  <img src="${animPokePic}" class="dialogPicture" alt=""></img>
                </div>
              </div>
              <div class="pokedex-controls"></div>
            </div>
            <div class="pokedex-mid utc_flex-dir-col">
            </div>
            <div class="pokedex-right">
              <div id="display-toggle-${i}" class="pokedex-display utc_flex-dir-row utc_flex-jc-center utc_flex-ai-center">
              </div>

              <div
                class="pokedex-button-nav utc_flex-dir-row utc_flex-jc-evenly utc_flex-ai-center utc_flex-gap-sm"
              >
                <button class="pokedex-nav-btn" onclick="renderDetaileMain(${i})">Main</button>
                <button class="pokedex-nav-btn" onclick="renderDetaileStats(${i})">Stats</button>
                <button class="pokedex-nav-btn">Evo Chain</button>
              </div>
            </div>
          </div>
        </article>
  `;
}

function templatePokedexDisplayMain(i, pokeHeight, pokeWeight, pokeExp, pokeAbilities) {
  return `
                <table class="poke-main-table">
                  <tbody>
                    <tr>
                      <th scope="row">Height:</th>
                      <td>${pokeHeight} m</td>
                    </tr>
                    <tr>
                      <th scope="row">Weight:</th>
                      <td>${pokeWeight} kg</td>
                    </tr>
                    <tr>
                      <th scope="row">Base experience:</th>
                      <td>${pokeExp}</td>
                    </tr>
                    <tr>
                      <th scope="row">Abilities:</th>
                      <td>${pokeAbilities}</td>
                    </tr>
                  </tbody>
                </table>
   `;
}

function templatePokedexDisplayStats(i) {
  return `
      <div class="poke-stat-table">
        
        <div class="display-stat stat-row">
          <p class="stat-label">HP</p>
          <div class="stat-bar-bg"><div id="bar-hp-${i}" class="stat-bar-fill"></div></div>
        </div>
        
        <div class="display-stat stat-row">
          <p class="stat-label">ATK</p>
          <div class="stat-bar-bg"><div id="bar-atk-${i}" class="stat-bar-fill"></div></div>
        </div>
        
        <div class="display-stat stat-row">
          <p class="stat-label">DEF</p>
          <div class="stat-bar-bg"><div id="bar-def-${i}" class="stat-bar-fill"></div></div>
        </div>
        
        <div class="display-stat stat-row">
          <p class="stat-label">SP-ATK</p>
          <div class="stat-bar-bg"><div id="bar-spatk-${i}" class="stat-bar-fill"></div></div>
        </div>
        
        <div class="display-stat stat-row">
          <p class="stat-label">SP-DEF</p>
          <div class="stat-bar-bg"><div id="bar-spdef-${i}" class="stat-bar-fill"></div></div>
        </div>
        
        <div class="display-stat stat-row">
          <p class="stat-label">SPEED</p>
          <div class="stat-bar-bg"><div id="bar-speed-${i}" class="stat-bar-fill"></div></div>
        </div>

      </div>
  `;
}

function templatePokedexDisplaTypes(typeName) {
  return `
            <img class="categorie-badge" src="./assets/icons/types/${typeName}.svg">
   `;
}
