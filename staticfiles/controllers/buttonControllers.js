import { create_elemet_capture, create_element_video, create_image_view, captured_image_capturate} from './imagenControllers.js';
import { deleted_video, create_video } from '../services/apiService.js';
import {subir_imagen, subir_video, controller_title, controller_acronime, obtain_params_data, controller_position, reset_images, capture_video_screen, openDialog_MovToLAV} from './videoController.js';

import { establecerCookie, obtenerValorCookie } from '../utils/helperUtils.js'

import { validateKeep_save } from './keepConfigController.js'



// NOTE : FUNCIONES PARA EL REPRODUCTOR DE VIDEO
function play_video(velocidad=1) {
    var video = document.getElementById('video_reproductor');
    video.playbackRate = velocidad;
    if  (video.paused) {
        video.play();
    }else {
        video.pause();
    }
}
function advance_video(num) {
    var video = document.getElementById('video_reproductor');
    video.currentTime = video.currentTime + num;
}
function volume_video() {
    var video = document.getElementById('video_reproductor');
    if (video.volume == 0) {
        video.volume = 1;
    }else {
        video.volume = 0;
    }
}
function clear_controls_video() {
    var video = document.getElementById('video_reproductor');
    if (video.controls) {
        video.controls = false;
    }else {
        video.controls = true;
    }
}

// NOTE : CONSERVAR CAMBIOS
function keepChanges(event) {
    const { id, checked } = event.target;
    console.log(`${id} está ${checked ? 'marcado' : 'no marcado'}`);

    console.log("VAMO id", id);
    console.log("VAMO checked", checked);

    establecerCookie(id, checked);
}


// function capturaRadioValue(event) {
//     if (event.target.checked) {
//         window.radioPosition = event.target.value;
//         console.log("La opción que seleccionamos es: "+event.target.value);
//     }
// }

export function ButtonEvents() {
    const $ = el => document.getElementById(el)

    // NOTE : EVENTOS DE LISTAS DESPLEGABLES
    $('seleccion_category').addEventListener('change', function() {
        let seleccion = this.value;
        $('id_acronime').value = seleccion;
        controller_acronime(seleccion);
    });

    $('select_stack').addEventListener('change', function() {
        let seleccion = this.value;
        init(seleccion);
    });
    
    // NOTE : RADIO BUTTONS DE LA POSICIÓN DEL VIDEO
    for (const n of document.getElementsByName('optionPosition')) {
        n.addEventListener('change', (event) => {
            controller_position(event.target.value);
        });
    }

    // NOTE : BOTÓN DE SUBIR ARCHIVOS
    $('id_submit').addEventListener('click', function() {
        let data = obtain_params_data()[0];
        const catergory = document.getElementById('seleccion_category').value;
        const file = $('video_file');
        var regex = /^[a-zA-Z0-9 ]*$/;

        if (file.files.length == 0) {
            alert("Seleccione un archivo.");
        } else if (data['title'] === '') {
            alert("ingrese la descripcion del documento.");
        } else if (catergory == '') {
            alert("Seleccione una categoria.");
        }else if (data['num_img'] == 0) {
            alert("Capture una imagen.");
        // }else if (!regex.test(data['title_original'])){
        //     alert("La descripcion del documento no puede contener caracteres especiales.");
        } else {
            // NOTE : VALIDAR Y GUSRDAR LA CONFIGURACIÓN
            validateKeep_save();

            create_video(data, file);
        }
    });

    // NOTE : BOTÓN DE LIMPIAR (BORRAR TODO)
    $('id_clear').addEventListener('click', function() {
        deleted_video();
    });
    
    // NOTE : BOTÓN DE CAPTURAR FRAME DE VIDEO
    $('btn_capture').addEventListener('click', function() {
        capture_video_screen();
    });

    // NOTE : CARGAR LA IMAGEN QUE ESTA CAPTURADA
    $('charger_capture').addEventListener('click', function() {
        var screen_video = $('screen_video');
        const base64Image = captured_image_capturate(screen_video);
        let num_img = subir_imagen();
        create_image_view(base64Image, num_img);
    });

    $('move_after').addEventListener('click', function() {
        advance_video(0.02);
    });

    $('move_before').addEventListener('click', function() {
        advance_video(-0.02);
    });
    $('btn_next1').addEventListener('click', function() {
        advance_video(1);
    });

    $('btn_next2').addEventListener('click', function() {
        advance_video(-1);
    });
    $('btn_volume').addEventListener('click', function() {
        volume_video();
    });
    $('btn_slow').addEventListener('click', function() {
        play_video(0.25)
    });
    $('btn_fast').addEventListener('click', function() {
        play_video(2);
    });
    $('btn_pause_play').addEventListener('click', function() {
        play_video();
    });
    $('btn_clear').addEventListener('click', function() {
        clear_controls_video();
    });
    $('deleted_images').addEventListener('click', function() {
        $('id_only_imgs').innerHTML = '';
        reset_images();
    });
    
    // NOTE : CARGAR VÍDEO (EL ARRASTRA AQUÍ)
    var fileInput = $('video_file');
    fileInput.addEventListener('change', function() {
        var file = fileInput.files[0];
        var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo
        var name = file.name;
        name = name.slice(0, name.lastIndexOf('.'));
        if(obtenerValorCookie('descript_keep') != 'true'){
            $('id_title').value = name;
            controller_title(name);
        }
        create_elemet_capture(url, 0)
        create_element_video(url)

        $('video_output').style.display = 'flex';
        $('open_video_cont').style.display = 'none';
    
        subir_video();
        $('label_file').innerHTML = file.name;
    });
    
    // NOTE : CARGAR IMAGEN DE MINIATURA
    $('image_file').addEventListener('change', function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            var base64Image = reader.result;
            let num_img = subir_imagen();
            create_image_view(base64Image, num_img);
        };
        // var url = URL.createObjectURL(file); // crea una URL de objeto para el archivo
        reader.readAsDataURL(file);
    });
    
    // NOTE : MOSTRAMOS NUMERO Y TAMBIEN CAPTURAMOS LO QUE ESCRIBIMOS EN EL TITULO
    $('id_title').addEventListener('input', function(e) {
        var value = e.target.value;
        controller_title(value);
    });

    // NOTE Copiamos el script generado
    $('copy_code').addEventListener('click', function() {
        var code = $("insert_code");
        navigator.clipboard.writeText(code.innerText);
        code.classList.add('atom_finished');
    });
    $('btn_expand').addEventListener('click', function() {
        console.log('expandir');
        $('cont_video').classList.toggle('expand');
    });

    // NOTE : PARA LOS EVENTOS DE LOS RADIO BUTTTONS DE SELECCIONAR LA POSICIÓN
    // let optionPosition = document.getElementsByName('optionPosition');
    // for (const n of optionPosition) {
    //     n.addEventListener('change', capturaRadioValue);
    // }

    // NOTE : EVENTO PARA MOVER LOS VIDEO A LAV
    $('move_lav').addEventListener('click', function() {
        openDialog_MovToLAV();
    });

    // NOTE : CONSERVAR CAMBIOS
    $('confi_keep').addEventListener('change', keepChanges);
    $('descript_keep').addEventListener('change', keepChanges);

    // NOTE : ATAJOSDE TECLADO
    document.addEventListener('keydown', function(e) {
        const elementoClic = e.target;
        let textbox = $('id_title');

        // Verificar si el clic ocurrió dentro del div excluido
        if (elementoClic !== textbox && !textbox.contains(elementoClic)) {
            if (e.key === 'c' && e.ctrlKey) {
                var code = $("insert_code");
                navigator.clipboard.writeText(code.innerText);
                code.classList.add('atom_finished');
            }else if (e.key === 'w') {
                play_video(2);
            }else if (e.key === 's') {
                play_video(0.25);
            }else if (e.key === ' ') {
                e.preventDefault(); // NOTE : Evitar que se mueva la página
                play_video();
            }else if (e.key === 'ArrowRight' && e.ctrlKey) {
                advance_video(0.02);
            }else if (e.key === 'ArrowLeft' && e.ctrlKey) {
                advance_video(-0.02);
            }else if (e.key === 'ArrowRight') {
                advance_video(1);
            }else if (e.key === 'ArrowLeft') {
                advance_video(-1);
            }else if (e.key === 'f') {
                let video = $('video_reproductor');
                video.requestFullscreen();
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
            }else if (e.key === 'm') {
                volume_video();
            }
            else if (e.key === 'c') {
                clear_controls_video();
            }
            else if (e.key === 'Enter' && e.ctrlKey) {
                capture_video_screen();
            }
        }
    });
}