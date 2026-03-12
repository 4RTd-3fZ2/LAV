import { lvr_loader } from '../lvr-main.js';

// NOTE : ESTA CLASE SERA LA PUERTA A LA LIBRERIA, ES DECIR SERA LA CLASE QUE USARE EN LOS PROYECTOS QUE HARÁN USO DE LA LIBRERIA.
export async function lvr_open_video(data, path_files, sections_json) {
    let description = validateDescription(data, path_files);
    let sections = validateSections(data, sections_json);
    window.globalCodeVideo = data['code'];
    new lvr_loader(await description, path_files, data, sections);
}

async function validateDescription(data_video, path_files) {
    if(data_video['description']) {
        try {
            const response = await fetch(`${path_files}/descriptions/${data_video['files_name']}.md`);
            const markdown = await response.text();
            return markdown;
        } catch (error) {
            console.error('Error al obtener la descripción:', error);
            throw error;
        }
    }else {
        return null
    }
}

function validateSections(data_video, sections_json) {
    if(data_video['sections']) {
        let sectionsVideo = [];
        for(let i=0; i<data_video['sections'].length; i++) {
            let num = data_video['sections'][i];
            sectionsVideo.push(sections_json[num]);
        }
        console.log(sectionsVideo);
        return sectionsVideo;
    }else {
        return null;
    }
}