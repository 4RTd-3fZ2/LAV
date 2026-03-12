import { selectAllRegisters } from './apiService.js';

let json_videos = null;

export async function cargarDatos(numStack) {
    if(numStack){json_videos=null};
    if (!json_videos) {
        json_videos = await selectAllRegisters(numStack);
        console.log("Cargando datos del backend...");
    } else {
        console.log("Usando datos en memoria...");
    }
    return json_videos;
}