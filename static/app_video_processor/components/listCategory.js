// NOTE : PINTAMOS LAS CATEGORIAS EN LA LISTA DESPLEGABLE
export function select_guia(data) {
    let select = document.getElementById('seleccion_category');
    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', data[i]['acronimo']);
        option.textContent = data[i]['name'];
        select.appendChild(option);
    }
}