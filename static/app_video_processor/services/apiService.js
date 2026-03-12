import {obtain_date, getCookie, getCookie2} from '../utils/helperUtils.js';


export function consult_guias() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/slecet_guias/',
            type: 'GET',
            success: (data) => {
                resolve(data['data']);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error('Error al obtener datos de la API:', errorThrown);
                reject(errorThrown);
            }
        });
    });
}


// #region # TODO: SELECT VIDEOS
export function init_program() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/select_videos/',
            type: 'GET',
            success: function(data) {
                resolve(data['data']);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error('Error al obtener datos de la API:', errorThrown);
                reject(errorThrown);
            }
        });
    });
}

// #region TODO: CREATE VIDEOS
export function create_video(data, file) {
    $(document).ready(function() {
        const $ = el => document.getElementById(el);
        var formData = new FormData();
        formData.append('video_name', data['title_original']);
        formData.append('code', data['code']);
        formData.append('acronym', $('id_acronime').value);
        formData.append('old_name', file.files[0].name);
        formData.append('attach_file', file.files[0]);
        formData.append('images_num', data['num_img']);
        formData.append('fecha', data['fecha']);
        formData.append('position', data['position']);

        if (data['num_img'] > 0) {
            for (let i = 1; i <= data['num_img']; i++) {
                let image = document.getElementById(`generated_img_${i}`);
                formData.append(`generated_img_${i}`, image.src);
            }
        }

        fetch('/create_video/', {
            method: 'POST',
            body: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('VIDEO GUIA CREATE!', data);
            location.reload();
        })
        .catch(error => console.error('Error:', error));

    });
}

// #region TODO: DELETED VIDEOS
export function deleted_video(item) {
    var csrftoken = getCookie('csrftoken');
    $(document).ready(function() {
            $.ajax({
            url: '/deleted_video/',
            type: 'POST',
            data: {
                'num_item': 'item'
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            success: function(data) {
                console.log('VIDEO DELETD SUCESSFULL!', data);
                location.reload();
            },
            error: function(xhr, textStatus, errorThrown) {
                // Manejar errores si la solicitud falla
                console.error('Error al obtener datos de la API:', errorThrown);
            }
        });
    });
}

export async function datosNumericos(categoria, stack) {
    const formData = new FormData();
    formData.append('categoria', categoria);
    formData.append('stack', stack);

    try {
        const response = await fetch('/datosNumeriosLAV/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie2('csrftoken')
            }
        });
        const data = await response.json();
        return data['data']; // Devuelve los datos que necesitas
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propaga el error para manejarlo en la función que llama
    }
}

export async function movedatatolav(categoria, stack, jsonVideos) {
    const formData = new FormData();
    formData.append('categoria', categoria);
    formData.append('stack', stack);
    formData.append('jsonVideos', jsonVideos);

    try {
        const response = await fetch('/movedatatolav/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie2('csrftoken')
            }
        });
        const data = await response.json();
        deleted_video();
        return data['data']; // Devuelve los datos que necesitas
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propaga el error para manejarlo en la función que llama
    }
}