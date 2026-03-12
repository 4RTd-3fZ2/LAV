
import {consult_guias, init_program} from './services/apiService.js';
import {controller_code } from './controllers/videoController.js';

import { ButtonEvents } from './controllers/buttonControllers.js'

import { paint_infoVideo } from './components/infoVideos.js';
import { select_guia } from './components/listCategory.js'


import { keepValid_charger } from './controllers/keepConfigController.js'


init();
async function init() {
    // NOTE: SELECT CATEGORIES OF DATABASE
    let data = await consult_guias();
    select_guia(data)

    // NOTE : PINTAR EN PANTALLA LA TABLA DE VIDEO Y LAS INSERSIONES JSON
    let data_videos = await init_program();
    paint_infoVideo(data_videos);
    
    // NOTE : CREA EL CODIGO DEL VIDEO
    controller_code();

    // NOTE : EVENTOS DEL TODOS LOS BOTONES DEL SISTEMA
    ButtonEvents();

    // NOTE : VALIDAR Y CARGAR LA CONFIGURACIÓN CONSERVADA
    keepValid_charger();
}