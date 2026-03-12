export function notification(message, state) {
    const div = document.createElement('div');
    div.style.display = 'block';
    div.classList = "atom_mensajeFlotante";
    div.classList.add(state);
    div.innerHTML = message;
    document.getElementById('lvr-cont').appendChild(div);
    setTimeout(() => {
      div.style.display = 'none';
    }, 2000);
  }