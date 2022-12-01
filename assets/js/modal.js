const modalOverlay = document.getElementById('modal-overlay')
const modal = document.getElementById('modal')

async function openModal(idPokemon){
  console.log(idPokemon)
  let [pokemon] = pokemonsStoreged.filter(obj => obj.id == idPokemon)
  console.log(pokemon)
  modal.innerHTML = convertPokemonModal(pokemon)
  modalOverlay.style.display = 'flex';
  modal.style.display = 'flex'
  setTimeout(() => { document.addEventListener('click', handleClickOutside, false) }, 200);
} 

function handleClickOutside (event) {
  if (!modal.contains(event.target)) {
    modalOverlay.style.display = 'none';
    document.removeEventListener('click', handleClickOutside, false);
  }
}