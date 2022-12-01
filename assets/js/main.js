const pokemonOl = document.querySelector('.pokemons')
const LoadButton = document.getElementById('loadMore')

const URL = 'https://pokeapi.co/api/v2/pokemon'
let limit = 5
let offset  = 0

let pokemonsStoreged = []

function convertPokemonToLi (pokemon) {

  pokemonsStoreged.push(pokemon)

  return `
  <li class="pokemon ${pokemon.types[0].type.name}" id="pokemon-${pokemon.id}" onclick="openModal(${pokemon.id})" >
    <span class="number">${pokemon.id}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
      <ol class="types">
        ${pokemon.types.map(types => `<li class="type ${types.type.name}">${types.type.name}</li>` ).join('')}
        
      </ol>

      <img src="${pokemon.sprites.other.dream_world.front_default}"
        alt="${pokemon.name}">
    </div>
  </li>
  `
}

function convertPokemonModal(pokemon){
  return`
    <div class="pokemon ${pokemon.types[0].type.name}">
      <p class="name">${pokemon.name}</p>
      <div class="detail">
        <ol class="types">
          ${pokemon.abilities.map(abilities => `<li class="type ${abilities.ability.name}">${abilities.ability.name}</li>` ).join('')}
        </ol>
        <div class="skills">
          <div class="skill">
              <p>Experience</p>
              <p>${pokemon.base_experience}</p>
          </div>
          <hr>
          <div class="skill">
              <p>Weight</p>
              <p>${pokemon.weight}</p>
          </div>
          <hr>
          <div class="skill">
              <p>Height</p>
              <p>${pokemon.height}</p>
          </div>
          <hr>
        </div>
        <img src="${pokemon.sprites.other.dream_world.front_default}"
            alt="${pokemon.name}">
      </div>
    </div>
  `

}

async function takePokemons(offset, limit, url){
  const pokeAPi = new PokemonApi()
  const pokemonsWithDetails = await pokeAPi.getPokemons(offset,limit,url)
  .then(pokemonsList => pokemonsList.map(pokeAPi.getPokemonsWithDetails))
  .then(pokemonsDetails => Promise.all(pokemonsDetails))
  .then(pokemonsDetalhados => pokemonsDetalhados)
  return pokemonsWithDetails
}

async function program(){
  await takePokemons(offset,limit,URL).then(pokemonsDetalhados => pokemonsDetalhados.map(convertPokemonToLi).join('')).then(convertido => pokemonOl.innerHTML += convertido)
}

LoadButton.addEventListener('click', async ()=> {
  offset += limit
  await takePokemons(offset , limit , URL).then(pokemonsDetalhados => pokemonsDetalhados.map(convertPokemonToLi).join('')).then(convertido => pokemonOl.innerHTML += convertido)
})

document.onload = program()