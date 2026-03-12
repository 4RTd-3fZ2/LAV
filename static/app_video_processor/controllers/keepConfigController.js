import { obtenerValorCookie, establecerCookie } from '../utils/helperUtils.js'
import { controller_position, controller_title } from './videoController.js'

var $ = el => document.getElementById(el);


// NOTE : VALIDA Y GUARDA LAS CONFIGURTACIONES CONSERVADAS AL SUBIR EL VIDEO
export function validateKeep_save() {

    if(obtenerValorCookie('confi_keep') == 'true'){
        saveConfig()
    }
    if(obtenerValorCookie('descript_keep') == 'true'){
        daveDescription();
    }
}

function saveConfig() {
    const category = $('seleccion_category').value;
    const position  = (window.radioPosition) ?  window.radioPosition : obtenerValorCookie('positionSave');

    establecerCookie('categorySave', category);
    establecerCookie('positionSave', position);
    console.log('Config save sucessfull!');
}

function daveDescription() {
    const descripcion = $('id_title').value.trim();
    establecerCookie('descriptSave', descripcion);
    console.log("Descripcion save sucessfull!")
}






// NOTE : VALIDA Y CARGA LAS CONFIGURACIONES CONSERVADAS AL "INICIAR" EL PROGRAMA 
export function keepValid_charger() {
    if(obtenerValorCookie('confi_keep') == 'true'){
        $('confi_keep').checked = true;

        const category = obtenerValorCookie('categorySave');
        const position = obtenerValorCookie('positionSave');

        controller_position(position);

        setTimeout(function() {
            document.getElementById('seleccion_category').value = category;
            $('id_acronime').value = category;
        }, 200);

        $(`option_${position}`).checked = true;
    }

    if(obtenerValorCookie('descript_keep') == 'true'){
        $('descript_keep').checked = true;
        
        const descrip = obtenerValorCookie('descriptSave');

        $('id_title').innerHTML = descrip;
        controller_title(descrip);
    }
}