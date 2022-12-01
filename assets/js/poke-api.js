class PokemonApi{
  getPokemons(offset ,limit, url ){
    return fetch(`${url}?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(data => data.results)
  }

  getPokemonsWithDetails(pokemon){
    return fetch(pokemon.url)
    .then(response => response.json())
    .then(data => data)
  }
}


