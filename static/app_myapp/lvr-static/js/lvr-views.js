export function CodeEditor_html(codeMarkdown) {
    const html = `
    <div id="cont_edit_file" class="template_contModule">
        <div class="organism_navTools">
            <aside id="edit_md_name" class=""><p><span></span>EditFile</p></aside>
            <section id="my_btn_save">
                <svg height="100%">
                    <use xlink:href="#lvr-icon-save"></use>
                </svg>
            </section>
            <section class="list">
                <li class="dropdown2">
                    <div class="btn_option_edit">
                        <svg height="100%">
                            <use xlink:href="#lvr-icon-emoji"></use>
                        </svg>
                    </div>
                    <div class="dropdown-content" style="width: 80px;">
                        <ul>
                            <li>🍀 🔚</li>
                            <li>⚠️ 💡 ❗</li>
                            <li> ✏️ ➡️</li>
                            <li> 🧩 🏷️</li>
                            <li> 📌 🖼️ 🎬 📁 </li>
                            <li> ☀️ 🌑</li>
                        </ul>
                    </div>
                </li>
            </section>
            <section class="list">
                <li class="dropdown2">
                    <div class="btn_option_edit">
                        <svg height="100%">
                            <use xlink:href="#lvr-icon-inserts"></use>
                        </svg>
                    </div>
                    <div class="dropdown-content" style="width: 100px;">
                        <ul>
                            <li>Subtitulo de Seccion</li>
                            <li>Descripcion Imagen</li>
                            <li>Opción 3</li>
                        </ul>
                    </div>
                </li>
            </section>
            <section class="list">
                <li class="dropdown2">
                    <div class="btn_option_edit">
                        <svg height="100%">
                            <use xlink:href="#lvr-icon-distribution"></use>
                        </svg>
                    </div>
                    <div class="dropdown-content" style="width: 100px;">
                        <ul>
                            <li class="edit_distribution">Edit</li>
                            <li class="edit_distribution">Viwer</li>
                            <li class="edit_distribution">Edit_Viwer</li>
                        </ul>
                    </div>
                </li>
            </section>
            <section id="my_btn_out">
                <svg height="100%">
                    <use xlink:href="#lvr-icon-out_edit"></use>
                </svg>
            </section>
        </div>
        <div class="molecules_viewAndEdit">
            <div class="cont_Edit expand" id="lvr_code_editor"> 
                <!-- STUB : CODE EDIT MD -->
            </div>
            <div class="cont_View hidden" id="lvr_code_view">
                <!-- STUB : VIEW MD -->
            </div>
        </div>
    </div>`;
    return html;
}

export function messageDialog(message_body) {
    const dialogElement = document.createElement('dialog');
    dialogElement.classList.add('atom_shortcuts');

    const formElement = document.createElement('form');
    formElement.setAttribute('method', 'dialog');
    formElement.innerHTML = message_body;

    dialogElement.appendChild(formElement);
    document.body.appendChild(dialogElement);
    dialogElement.showModal();
}

export function messageDialog_sections() {
    const message_body = `
    <div class="lvr-organism_contSections">
        <h2>Pues damelo pa mi Que poco trabajas</h2>
        <hr>
        <select id="lvr-select_sections" name="seleccion">
            <option value="opcion1">Secciones</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
            <option value="opcion4">Opción 4</option>
        </select>
        <div class="contSections">
            <section>
                MySection
                <span>
                    <svg height="100%">
                        <use xlink:href="#lvr-icon-deleteSection"></use>
                    </svg>
                </span>
            </section>
        </div>
        <div class="buttons">
            <button>Descartar</button>
            <button class="btn_acept">Guardar</button>
        </div>
    </div>
    `;

    const dialogElement = document.createElement('dialog');
    dialogElement.id = "lvr_dialog_sections";

    const formElement = document.createElement('form');
    formElement.setAttribute('method', 'dialog');
    formElement.innerHTML = message_body;

    dialogElement.appendChild(formElement);
    document.body.appendChild(dialogElement);
    dialogElement.showModal();
}


// TODO: EL REPRODUCTOR DE VIDEO
export class openVideo {
    constructor() {
        this.$ = el => document.getElementById(el);
    }
  
    video_controls() {
        const videoControls = `
        <aside>
            <!-- NOTE : BUTTON -->
            <div id="lvr_id_btn-volume" class="lvr-btn_control">
                <svg height="100%">
                    <use xlink:href="#lvr-icon-volume"></use>
                </svg>
            </div>
            <!-- NOTE : BUTTON -->
            <div id="lvr_id_btn-delay-1" class="lvr-btn_control">
                <svg height="100%">
                    <use xlink:href="#lvr-icon-delay_1"></use>
                </svg>
            </div>
            <!-- NOTE : BUTTON -->
            <div id="lvr_id_btn-delay-2" class="lvr-btn_control">
                <svg height="100%">
                    <use xlink:href="#lvr-icon-delay_2"></use>
                </svg>
            </div>
            <!-- NOTE : BUTTON -->
            <div id="lvr_id_btn-pauseplay" class="lvr-btn_control btn_play">
                <svg height="100%">
                    <use xlink:href="#lvr-icon-pauseplay"></use>
                </svg>
            </div>
            <!-- NOTE : BUTTON -->
            <div id="lvr_id_btn-advance-1" class="lvr-btn_control">
                <svg height="100%">
                    <use xlink:href="#lvr-icon-advance_1"></use>
                </svg>
            </div>
            <!-- NOTE : BUTTON -->
            <div id="lvr_id_btn-advance-2" class="lvr-btn_control">
                <svg height="100%">
                    <use xlink:href="#lvr-icon-advance_2"></use>
                </svg>
            </div>
            <!-- NOTE : BUTTON -->
            <div id="lvr_id_btn-speed" class="lvr-btn_control">
                <svg height="100%">
                    <use xlink:href="#lvr-icon-speed"></use>
                </svg>
            </div>
            <!-- NOTE : BUTTON -->
            <div id="lvr_id_btn-fullscreen" class="lvr-btn_control" style="opacity: 50%;">
                <svg height="100%">
                    <use xlink:href="#lvr-icon-fullscreen"></use>
                </svg>
            </div>
            <!-- NOTE : BUTTON -->
            <div id="lvr_id_btn-clear" class="lvr-btn_control">
                <svg height="100%">
                    <use xlink:href="#lvr-icon-clear"></use>
                </svg>
            </div>
            <!-- NOTE : BUTTON -->
            <div id="lvr_id_btn-copymin" class="lvr-btn_control">
                <svg height="100%">
                    <use xlink:href="#lvr-icon-copymin"></use>
                </svg>
            </div>
            <!-- NOTE : BUTTON -->
            <div id="lvr_id_btn-settings" class="lvr-btn_control dropdown">
                <svg height="100%">
                    <use xlink:href="#lvr-icon-settings"></use>
                </svg>
                <div class="lvr-dropdown-content">
                    <ul>
                        <li id="lvr_id_btn-new_description">
                            <div class="lvr-btn_control">
                                <svg height="100%">
                                    <use xlink:href="#lvr-icon-description"></use>
                                </svg>
                            </div>
                            Implementar Descripción
                        </li>
                        <li id="lvr_id_btn-edit_description">
                            <div class="lvr-btn_control">
                                <svg height="100%">
                                    <use xlink:href="#lvr-icon-description"></use>
                                </svg>
                            </div>
                            Editar Descripción
                        </li>
                        <hr>
                        <li id="lvr_id-btn_sections">
                            <div class="lvr-btn_control">
                                <svg height="100%">
                                    <use xlink:href="#lvr-icon-sections"></use>
                                </svg>
                            </div>
                            Administrar Secciones
                        </li>
                        <li id="lvr_id_btn-cedema">
                            <div class="lvr-btn_control">
                                <svg height="100%">
                                    <use xlink:href="#lvr-icon-cedema"></use>
                                </svg>
                            </div>
                            Add Cedema text
                        </li>
                        <li id="lvr_id_btn-cedema_miniature">
                            <div class="lvr-btn_control">
                                <svg height="100%">
                                    <use xlink:href="#lvr-icon-cedema"></use>
                                </svg>
                            </div>
                            Add Cedema with miniature
                        </li>
                        <li id="lvr_id_btn-delete_video">
                            <div class="lvr-btn_control">
                                <svg height="100%">
                                    <use xlink:href="#lvr-icon-delete"></use>
                                </svg>
                            </div>
                            Eliminar Vídeo
                        </li>
                        <hr>
                        <li id="lvr_id_btn-shortcuts">
                            <div class="lvr-btn_control">
                                <svg height="100%">
                                    <use xlink:href="#lvr-icon-shortcuts"></use>
                                </svg>
                            </div>
                            Atajos de teclado
                        </li>
                        <hr>
                        <li id="lvr_id_btn-autoplay">
                            <div class="lvr-btn_control">
                                <svg height="100%">
                                    <use xlink:href="#lvr-icon-autoplay"></use>
                                </svg>
                            </div>
                            Autoplay
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
        `;

        return videoControls;
    }

    paintImages(num_images, file_path, file_name) {
        let images = '';
        console.log("NUM DE LA IMAGEN:", num_images);
        for(let i = 0; i < num_images; i++) {
            const id_miniature = i == 0 ? 'id="video_miniature"' : "";
            images += `
            <aside>
                <span>
                    <svg height="100%">
                        <use xlink:href="#lvr-icon-img"></use>
                    </svg>
                </span>
                <a ${id_miniature} target="_blank" href="${file_path}/images/${file_name}-${i+1}.png">
                    <img src="${file_path}/images/${file_name}-${i+1}.png" alt="">
                </a>
            </aside>
            `;
        }
        return images;
    }
  
    VideoReproductor(file_path, data, videoSections) {
        const sections = (function() {
            if(!videoSections) {
                return '';
            }else {
                let section_html = '';
                for(let i=0; i<videoSections.length; i++) {
                    console.log(videoSections[i]);
                    section_html = section_html + `<span>${videoSections[i]}</span> `;
                }
                return section_html
            }
        })();

        const video_html = `
        <div id="lvr-id_view_video" class="lvr-organism_vide_cont">
            <video id="lvr_video" controls>
                <source src="${file_path}/videos/${data['files_name']}-i${data['images_num']}${data['extension']}" type="video/mp4">
            </video>
        </div>
        <div id="lvr-id_view_info" class="lvr-organism_info_cont">
            <header>
                <section>
                    <span class="lvr-point_1"></span>
                    <span class="lvr-point_2"></span>
                    <span class="lvr-point_3"></span>
                </section>
                <section class="version">
                    lvr v1.4
                </section>
                <div id="lvr-colse-button" class="lvr-colse-button">
                    <svg height="100%">
                        <use xlink:href="#lvr-icon-close"></use>
                    </svg>
                </div>
            </header>
            <section class="lvr-molecule_titte">
                <h1 id="lvr-tittle">${data['name']} ${sections}</h1>
            </section>
            <section class="lvr-molecule_code">
                <p>Subido hace - 3 meses <span>${data['code']}</span></p>
            </section>
            <section class="lvr-molecule_controls">
                ${this.video_controls()}
            </section>
            <section id="lvr-range-op-cont" class="lvr-atom-range_opacity">
                <input type="range" id="lvr-range-op" name="vol" min="0" max="100" value="100">
            </section>
            <section class="atom_selectRandom" id="selectRandom">
                <select id="lvr-select-random" name="seleccion">
                    <option value="random">Random</option>
                    <option value="orden">En Orden</option>
                </select>
            </section>
            <section>
                <hr>
            </section>
            <section class="lvr-molecule_description">
                <div id="lvr_cont_description">
                    <div class="tittle">
                        <h1>Descripción</h1>
                        <span>
                            <svg height="100%">
                                <use xlink:href="#lvr-icon-description"></use>
                            </svg>
                        </span>
                    </div>
                    <div class="desc-body" id="desc-body">
                        <!-- STUB : CONTENT MARKDOWN -->
                    </div>
                    <hr>
                </div>
                <!-- NOTE : IMAGES -->
                <div id="lvr-cont_images">
                    ${this.paintImages(data['images_num'], file_path, data['files_name'])}
                </div>
            </section>
        </div>
        `;

        const dialogElement = document.createElement('dialog');
        dialogElement.id = "lvr-cont";
        
        const formElement = document.createElement('form');
        formElement.setAttribute('method', 'dialog');
        formElement.classList.add('from_relative');
        formElement.innerHTML = video_html;

        dialogElement.appendChild(formElement);
        document.getElementById('lav-video-reproductor').appendChild(dialogElement);
        dialogElement.showModal();
    }

    // NOTE : THIS OPEN OR RELOADER VIDEOS WHEN I SELECTED RENADOM REPRODUCTOR
    randomUpdateVideo(data, file_path) {

        // NOTE : APPLY VIDEO
        const videoElement = document.getElementById('lvr_video');
        const sourceElement = videoElement.querySelector('source');
    
        sourceElement.src = `${file_path}/videos/${data['files_name']}-i${data['images_num']}.mp4`;
    
        videoElement.load();
        videoElement.play();

        // NOTE : TITTLE
        this.$('lvr-tittle').innerHTML = data['name'];

        // NOTE : APPLY IMAGES
        this.$('lvr-cont_images').innerHTML = this.paintImages(data['images_num'], file_path, data['files_name']);
    }
}
