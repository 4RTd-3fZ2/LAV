import { notification } from './lvr-utils.js';
import { sprite } from './icons_svg.js';
import { descriptionManage } from './lvr-editor.js';
import { videoController } from './lvr-videoControllers.js';
import { messageDialog, openVideo, messageDialog_sections } from './lvr-views.js'
import { createDescription } from './loader/lvr-Service.js'

// como
export class lvr_loader {
    constructor(codeMarkdown, file_path, data, sections) {
        this.codeMarkdown = codeMarkdown;
        this.$ = el => document.getElementById(el);
        const InstanceOpenVideo = new openVideo();
        Window.global_path = file_path;
        InstanceOpenVideo.VideoReproductor(file_path, data, sections);
        this.events();
        this.init();
    }

    init() {
        // NOTE : ICONOS SVG
        sprite();
        // NOTE OPEN PRINCIPAL DIALOG

        // NOTE : EVENTOS DE LOS CONTROLES DEL VIDEO
        const instanceVideo = new videoController();
        instanceVideo.playVideo();

        // NOTE : VALIDATE THE DESCRIPTION
        if(this.codeMarkdown == null) {
            document.getElementById('lvr_cont_description').style.display = 'none';
        }else {
            descriptionManage(this.codeMarkdown, false);
        }

        // NOTE : PARA VALIDAR SI MOSTRAR EL SELECT SI ES QUE LA REPRODUCCION ESTA EN RANDOM
        this.validateRandom(false);
    }

    events() {
        let that = this;
        // NOTE : BTN CONTROL
        this.$('lvr_id_btn-settings').addEventListener('click', function(e){
            console.log("SETTINGS");
            this.querySelector('.lvr-dropdown-content').classList.toggle('show');
        });
        // NOTE : BTN CONTROL
        this.$('lvr_id_btn-new_description').addEventListener('click', function(){
            console.log("NEW DESCRIPTION");
            if (createDescription()) {
                notification("Se creó una descripción para este vídeo exitosamente!", 'sucessfull');
            }else {
                notification("Error! Probelemas con la creación de la descripción", 'error');
            }
        });
        // NOTE : BTN CONTROL
        this.$('lvr_id_btn-edit_description').addEventListener('click', function(){
            console.log("EDIT DESCRIPTION");
            descriptionManage(that.codeMarkdown, true);
        });
        // NOTE : BTN CONTROL
        this.$('lvr_id-btn_sections').addEventListener('click', function(){
            console.log("DIALOG SECTIONS");
            messageDialog_sections();
        });
        // NOTE : BTN CONTROL
        this.$('lvr_id_btn-cedema').addEventListener('click', function(){
            console.log("CEDEMA");
            let params = new URLSearchParams(window.location.search);
            const path = params.get('path');
            const name = that.$('lvr-tittle').innerHTML;
            const stack = that.$('stacks').value;
            const insertCedema = `![icon_lav] <a class="cedema_lav-text" href="/?path=${path}&code=${globalCodeVideo}&stack=${stack}">${name}</a>`;
            navigator.clipboard.writeText(insertCedema);
            notification(`se copio en el portapapeles la dirección: ${insertCedema}`);
        });
        // NOTE : BTN CONTROL
        this.$('lvr_id_btn-cedema_miniature').addEventListener('click', function(){
            console.log("CEDEMA MINIATURE");
            let params = new URLSearchParams(window.location.search);
            const path = params.get('path');
            const name = that.$('lvr-tittle').innerHTML;
            const stack = that.$('stacks').value;
            const href_img_miniature = document.getElementById('video_miniature').getAttribute('href');
            //const insertCdema = `![icon_lav] [${name}](${hostName}?path=${path}&code=${globalCodeVideo}&stack=${stack}):`;
            const insertCedema = `
<div class="cedema_lav-miniature">
  <h4>${name}</h4>
  <p>${href_img_miniature}</p>
  <span>/?path=${path}&code=${globalCodeVideo}&stack=${stack}</span>
</div>`;
            navigator.clipboard.writeText(insertCedema);
            notification(`se copio en el portapapeles la dirección: ${insertCedema}`);
        });

        // NOTE : BTN CONTROL
        this.$('lvr_id_btn-delete_video').addEventListener('click', function(){
            console.log("DELETE VIDEO");
        });
        this.$('lvr_id_btn-shortcuts').addEventListener('click', function(){
            console.log("SHORTCUTS");
            const message_body = `
            <p><span>Shift + E</span> => Edit Description</p>
            <p><span>Shift + W</span> => Play Video</p>
            <p><span>Shift + R</span> => Reload</p>
            <button>OK</button>`;
            messageDialog(message_body);
        });
        // NOTE : BTN PLAY RANDOM
        this.$('lvr_id_btn-autoplay').addEventListener('click', function() {
            console.log("RANDOM");
            that.validateRandom(true)
        });
        this.$('lvr-select-random').addEventListener('click', function() {
            window.global_random = this.value; 
        });

        //NOTE : PARA CERRAR LA LISTA SETTINGS SI SE DA CLICK FUERA
        const dropdown = this.$('lvr_id_btn-settings');
        window.addEventListener('click', (e) => {
            if(!dropdown.contains(e.target)) {
                dropdown.querySelector('.lvr-dropdown-content').classList.remove('show');
            }
        });

        // Capturar el evento cuando se desliza el control
        document.getElementById("lvr-range-op").addEventListener("input", function() {
            document.getElementById('lvr-id_view_info').style.opacity = `${this.value}%`
        });
    }

    validateRandom(chanel) {
        if(!window.autoPlay) {
            this.$('selectRandom').style.display = 'none';
            if(chanel) {
                this.$('selectRandom').style.display = 'flex';
                window.autoPlay = true;
                window.global_random = this.$('lvr-select-random').value;
            }
        }else {
            this.$('selectRandom').style.display = 'flex';
            this.$('lvr-select-random').value = window.global_random;
            if(chanel) {
                this.$('selectRandom').style.display = 'none';
                window.autoPlay = false;
            }
        }
    }
}
