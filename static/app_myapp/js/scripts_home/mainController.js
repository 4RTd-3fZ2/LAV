import { cargarDatos } from './dataStore.js';
import { select_category } from './apiService.js';
import { lvr_init_video } from '../../lvr-static/js/loader/lvr-Service.js'

// TODO: RENDERIZAMOS TODOS LOS VIDEOS
export class Write_Videos {
    constructor() {
        this.$ = el => document.querySelector(el)
        this.$$ = el => document.querySelectorAll(el);
        this.eventMethod();
        window.iter = 0;
        window.iter_max = 48;
    }

    async init() {
        const json_videos = await cargarDatos();
        this.prepare_videos(json_videos);
        this.paint_caterogys();
        this.refOpenVideo();
    }
    
    // NOTE : ABRE LOS VIDEOS REFERIDOS DESDE CEDEMA
    refOpenVideo() {
        const params = new URLSearchParams(window.location.search);
        let code = params.get('code');
        let stack = params.get('stack');
        this.open_video(code, stack);
    }

    async paint_caterogys() {
        // Crear el elemento select
        const data = await select_category()
        let select = document.getElementById('category');
        for (let i = 0; i < data.length; i++) {
            let option = document.createElement('option');
            option.setAttribute('value', data[i]['acronimo']);
            option.textContent = data[i]['name'];
            select.appendChild(option);
        }
    }

    async prepare_videos(json_videos) {
        const params = new URLSearchParams(window.location.search);
        let sector = params.get('path');
        document.getElementById('lav_logo').innerHTML = sector+'-LAV';
    
        // NOTE : ESTO DETERMINA EL MAXIMO DE VIDEOS QUE RENDERIZARA CADA VEZ QUE LLAMAMOS A ESTA FUNCÓN.
        let i = window.iter;
        let max = window.iter_max;

        // NOTE : PINTAMOS LOS VIDEOS
        for (i; i < json_videos['videos_json'].length; i++) {
            if(i == max) {
                window.numVideos = i;
                document.getElementById('btn_max').style.display = 'flex';
                break;
            }
            this.paint_video(json_videos['videos_json'][i], json_videos['sections_json'], sector, json_videos['StackSelected']);
        }
        this.newElementsDOM();
    }

    async prepare_video_filter(section=null, search=null) {
        const params = new URLSearchParams(window.location.search);
        let sector = params.get('path');
        const json_videos = await cargarDatos();
        this.$('#cont_videos').innerHTML = '';
        this.$('#btn_max').style.display = 'none';
        if(section) {
            for (let i = 0; i < json_videos['videos_json'].length; i++) {
                let objeto_video = json_videos['videos_json'][i];
                if(objeto_video.section == section) this.paint_video(objeto_video, json_videos['sections_json'], sector, json_videos['StackSelected']);
            }
            this.newElementsDOM();
        }
        if(search) {
            for (let i = 0; i < json_videos['videos_json'].length; i++) {
                let objeto_video = json_videos['videos_json'][i];
                let lookIn = objeto_video.name + objeto_video.code;
                lookIn = lookIn.toLowerCase(); // LO CONVERTIMOS A MINUSCULAS
                search = search.toLowerCase(); // LO CONVERTIMOS A MINUSCULAS
                if(lookIn.includes(search)) this.paint_video(objeto_video, json_videos['sections_json'], sector, json_videos['StackSelected']); // includes() BUSCA EN lookIn LA PALABRA search
            }
            this.newElementsDOM();
        }
    }

    async paint_video(objeto_video, objeto_sections, sector, numStack) {
        let section = objeto_video['section']!==undefined ? `<span class="secciones">${objeto_sections[objeto_video['section']]}</span>` : '';
        let inner_html = `
            <div class="molecule_contVideo">
                <aside>
                    <img class="img_back" src="/media/LAV_videos/${sector}videos/Stack_n${numStack}/images/${objeto_video['files_name']}-1.png" alt="">
                    <span>
                        <img src="/media/LAV_videos/${sector}videos/Stack_n${numStack}/images/${objeto_video['files_name']}-1.png" alt="">
                    </span>
                    <div class="classOpenVideo">
                        <span style="display:none">${objeto_video['code']}</span>
                        <img src="/static/img/icon_03.png" alt="">
                    </div>
                </aside>
                <section>
                    <p>${objeto_video['name']} - <span class="code">${objeto_video['code']}</span> - ${section}</p>
                </section>
            </div>
        `;
        this.$('#cont_videos').innerHTML += inner_html;
    }

    eventMethod() {
        this.$("#id_search").addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                this.$("#id_search").click();
            }
        });
        this.$('#btn_search').addEventListener('click', (event) => {
            let search = this.$('#id_search').value;
            // console.log(search);
            if(search == '') {
                this.$('#cont_videos').innerHTML = '';
                this.prepare_videos(true);
            }else{
                this.prepare_video_filter(null, search);
            }
        });

        document.getElementById('btn_max').addEventListener('click', async (event)  => {
            document.getElementById('btn_max').style.display = 'none';
            const json_videos = await cargarDatos();
            window.iter = window.iter_max;
            window.iter_max = window.iter_max + 48;
            this.prepare_videos(json_videos);
        });
        this.$('#category').addEventListener("change", (event) => {
            let param = event.target.value;
            // Construye la nueva URL con el parámetro GET deseado
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?path=${param}`;
            // Redirige a la nueva URL
            window.location.href = newUrl;
        });

        // NOTE : EVENTO DE SELECCIÓN
        this.$('#stacks').addEventListener("change", async (event) => {
            let num_stack = event.target.value;
            const json_videos = await cargarDatos(num_stack);
            window.iter = 0;
            window.iter_max = 48;
            
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });

            this.$('#cont_videos').innerHTML = '';
            this.prepare_videos(json_videos);
        });
    }

    newElementsDOM() { 
        let items = this.$$('.classOpenVideo');
        items.forEach(button => {
            button.addEventListener('click', event => {
                let code_video = button.querySelector('span').innerHTML;
                this.open_video(code_video);
            })
        })
    }
    
    async open_video(code_video, stack_ref) {
        let params = new URLSearchParams(window.location.search);
        let sector = params.get('path');
        let numStack = (stack_ref) ? stack_ref : document.getElementById('stacks').value;
        lvr_init_video(code_video, `/media/LAV_videos/${sector}videos/Stack_n${numStack}`, false, numStack);
    }
}

// TODO: TODO LO QUE TENGA QUE VER CON LOS "STACKS" 
export class VideosStacks {
    constructor() {
        this.$ = el => document.querySelector(el)
        this.stacks = this.$('#stacks');
        this.initStack();
    }

    async initStack() {
        const json_videos = await cargarDatos();
        const num_stack = json_videos['total_stacks'];

        let option = document.createElement("option");
        for (let i = 1; i <= num_stack; i++) {
            option = document.createElement("option");
            option.value = i;
            option.text = 'Stack '+i;
            this.stacks.appendChild(option);
            this.stacks.value = i;
        }
    }
}

// TODO: TODO LO RELACIONADO CON "SECCIONES"
export class VideoSections {
    constructor() {
        this.$ = el => document.querySelector(el)
        
        this.SelectSection = this.$('#SelectSection');
        this.SelectSection2 = this.$('#SelectSection2');

        this.initSeleccion();
        this.addEventListeners();
    }

    async initSeleccion() {
        const json_videos = await cargarDatos();
        const json_sections = await json_videos['sections_json'];
        let option = document.createElement("option");
        for (let i = 0; i < json_sections.length; i++) {
            let section = json_sections[i];
            // NOTE : SECCIÓN 1
            option = document.createElement("option");
            option.value = i;
            option.text = section;
            this.SelectSection.appendChild(option);
            // NOTE : SECCIÓN 2
            // option = document.createElement("option");
            // option.value = i;
            // option.text = section;
            // this.SelectSection2.appendChild(option);
        }
    }
    addEventListeners() {
        // NOTE : SECCIÓN 1
        this.SelectSection.addEventListener("change", (event) => {
            let selectedOption = event.target.value;
            const write = new Write_Videos();
            if(selectedOption == 'all') {
                write.init();
            } else {
                write.prepare_video_filter(selectedOption, null);
            }
        });
        // this.SelectSection2.addEventListener("change", (event) => {
        //     let selectedOption = event.target.value;
        //     let code = document.getElementById('code_label').innerHTML;
        //     document.getElementById('selection_label').innerHTML = `add_video_to_section_lav "${LAV.acronimo1}" "${code}" "${selectedOption}" "${window.valor_stack}"`;
        //     console.log(selectedOption);
        // });
    }
}
