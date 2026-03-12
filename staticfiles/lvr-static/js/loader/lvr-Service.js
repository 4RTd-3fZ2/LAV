import { lvr_open_video } from './lvr-loader.js';
import { getRandomNumber, getOrdenNumber } from './lvr-utils.js'
import { cargarDatos } from '../../../js/scripts_home/dataStore.js';
import { openVideo } from '../lvr-views.js';

export async function lvr_init_video(codeVideo, path_files, random=false, numStack) {
    const all_data = await cargarDatos(numStack);
    // console.log(all_data);
    const data_videos = all_data['videos_json'];
    if(random) {
        const orden_o_random = window.global_random;
        let num = (function() {
            if(orden_o_random == 'orden') {
                return getOrdenNumber();
            }else {
                return getRandomNumber(0, data_videos.length);
            }
        })();
        const data = data_videos[num];
        // lvr_open_video(data, path_files, all_data['sections_json']);
        playerVideo(data, path_files, all_data['sections_json'])
    }else {
        for(let i = 0; i < data_videos.length; i++) {
            if(data_videos[i]['code'] == codeVideo){
                window.nums_random = [i];
                lvr_open_video(data_videos[i], path_files, all_data['sections_json']);
                break;
            }
        }
    }
}


function playerVideo(data, file_path) {
    console.log("REAL", data);
    // updateVideo(file_path, data['files_name'], data['images_num'])
    const instance = new openVideo();
    instance.randomUpdateVideo(data, file_path);

}

export function saveDescription(text_code) {
    console.log("SAVE FILES: ", text_code);
    console.log("SAVE");
}

export function createDescription() {
    let codeVideo = window.globalCodeVideo;
    console.log('CREAREMOS LA DESCRIPCIÓN', codeVideo);
    return false
}

export function deletedDescription() {

}

// NOTE : SECTIONS

export function selectSections() {

}

export function updateSections() {

}

// NOTE : VIDEO

export function deletedVideo() {

}