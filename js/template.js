function templatePokemonCard(i, PokeName, PokeID, PokePic) {
  return `
          <article class="poke-list-item">

            <section class="header__poke-list-item-${i} utc_flex-dir-row utc_flex-ai-center utc_flex-jc-center utc_flex-gap-sm">
              <h3 id="pokeID-${i}" class="poke-ID">#${PokeID}</h3>
              <h3 id="pokeName-${i}">${PokeName}</h3>
            </section>

            <section class="main__poke-list-item-${i}">
              <img id="pokeBigPicture-${i}" class="poke-item-picture" src="${PokePic}" alt="Bild von ${PokeName}" />
              <div id="pokeCategorieContainer-${i}" class="poke-item-categories">
                <img class="categorie-badge" src="" alt="" />
                <img class="categorie-badge" src="" alt="" />
              </div>
            </section>

          </article>
  `;
}
