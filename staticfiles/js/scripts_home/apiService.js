export async function selectAllRegisters(numStack) {
    const params = new URLSearchParams(window.location.search);
    let sector = params.get('path');
    const formData = new FormData();
    formData.append('sector', sector);
    formData.append('numStack', numStack);

    try {
        const response = await fetch('/consult_crud/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propaga el error para manejarlo en la función que llama
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export async function select_category() {
    try {
        const response = await fetch('/slecet_guias/', {
            method: 'GET',
        });
        const data = await response.json();
        return data['data']; // Devuelve los datos que necesitas
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propaga el error para manejarlo en la función que llama
    }
}