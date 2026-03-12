import { saveDescription } from './loader/lvr-Service.js';
import { CodeEditor_html } from './lvr-views.js';

function video_audio_plyr() {
    const $$ = el => document.querySelectorAll(el);
    $$('.videoPlayer').forEach(videoElement => {
        new Plyr(videoElement, {
            settings: ['speed'],
            speed: { selected: 1, options: [0.5, 1, 2] }
        });
    });
    $$('.audioPlayer').forEach(audioElement => {
        new Plyr(audioElement, {
            controls: [
                'play',
                'progress',
                'current-time',
                'settings',
            ],
            settings: ['speed'],
            speed: { selected: 1, options: [1, 2] }
        });
    });
}

export function descriptionManage(codeMarkdown, edit) {
    const html_btn_more = `...<div id="more_md" class="atom_maxMin"><svg height="100%"><use xlink:href="#lvr-icon-max"></use></svg></div>`;
    const html_btn_min = `<div id="min_md" class="atom_maxMin"><svg height="100%"><use xlink:href="#lvr-icon-min"></use></svg></div>`;
    const mi_md =  codeMarkdown;
    const $ = el => document.getElementById(el)

    if(!edit) {
        // NOTE : VIEW MD
        handleViewMode();
    }else{
        // NOTE : EDIT MD
        $('desc-body').innerHTML = CodeEditor_html(mi_md);
        let codeEditorInstance = new Markdown_Manage();
        codeEditorInstance.editMarkdown(mi_md);
    }

    function handleViewMode() {
        if (mi_md.length > 460) {
            showShortDescription();
        } else {
            PaintView(mi_md);
        }
    }

    function showShortDescription() {
        const cut_text = mi_md.slice(0, 460);
        PaintView(cut_text+html_btn_more);
        EventButtonMoreShort('more_md')
    }
    
    function showAllDescription() {
        PaintView(mi_md+html_btn_min);
        EventButtonMoreShort('min_md')
    }

    function EventButtonMoreShort(id){
        $(id).addEventListener('click', function() {
            if(id == 'more_md'){
                showAllDescription();
            }else {
                showShortDescription();
            }
        });
    }

    function PaintView(md_text) {
        $('desc-body').innerHTML =  marked.marked(md_text);
        Prism.highlightAll();
        setTimeout(eventosGenerales, 1000);
    }
}


function SetMinVideo(min) {
    const video = document.getElementById('lvr_video');
    video.currentTime = convertToSeconds(min);
    video.play();
}

function convertToSeconds(timeString) {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return (minutes * 60) + seconds;
}

function eventosGenerales() {
    // NOTE : link de minuto de video
    const atom_min = document.querySelectorAll('.atom_min');
    atom_min.forEach(function(button) {
        button.addEventListener('click', function(e) {
        const spanValue = button.querySelector('span');
        if(spanValue.contains(e.target)) {
            console.log(spanValue.textContent);
            SetMinVideo(spanValue.textContent);
        }
        });
    });
}



















// TODO: VISUALIZADOR Y EDITOR DE MARKDOWN
export class Markdown_Manage {
    constructor() {
        this.$$ = el => document.querySelectorAll(el);
        this.$ = el => document.getElementById(el);
        this.Eventos_edicion();
    }

    editMarkdown(text_md) {
        let etiqueta = this;
        window.marked = marked;
        require.config({ paths: { 'vs': './lvr-static/js/libraries/monaco-editor_v0.33.0/vs' }});
        require(['vs/editor/editor.main'], function() {
            // Definir el tema Dracula
            monaco.editor.defineTheme('dracula', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                    { token: '', foreground: 'cbcbcbe3', background: '282a36' },
                    { token: 'comment', foreground: '6272a4' },
                    { token: 'keyword', foreground: 'ff79c6' },
                    { token: 'operator', foreground: 'ff79c6' },
                    { token: 'identifier', foreground: 'FF4458' },
                    { token: 'string', foreground: 'A6E463' },
                    { token: 'number', foreground: 'bd93f9' },
                ],
                colors: {
                    'editor.foreground': '#212930',
                    'editor.background': '#212930',
                    'editorCursor.foreground': '#fff',
                    'editor.lineHighlightBackground': '#2b406a7f',
                    'editorLineNumber.foreground': '#029688',
                    'editor.selectionBackground': '#44475a',
                    'editor.inactiveSelectionBackground': '#fff'
                }
            });

            // Inicializar Monaco Editor
            const mi_code_editor = monaco.editor.create(document.getElementById('lvr_code_editor'), {
                value: [text_md].join('\n'),
                language: 'markdown',
                theme: 'dracula',
                automaticLayout: true,
                minimap: {
                    enabled: false
                },
                lineNumbers: 'off',
                fontSize: 12,
                wordWrap: 'on',
            });

            const mi_preview = document.getElementById('lvr_code_view');

            // Función para actualizar la vista previa
            function updatePreview() {
                etiqueta.mi_un_save()
                const markdownText = mi_code_editor.getValue();
                mi_preview.innerHTML = window.marked.parse(markdownText);
                // video_audio_plyr();
                // NOTE : PARA EL COLOR DE LOS CODIGOS
                Prism.highlightAll();
            }

            // Actualizar la vista previa en cada cambio
            mi_code_editor.onDidChangeModelContent(updatePreview);

            // Inicializar la vista previa
            updatePreview();
            etiqueta.mi_save()


            // NOTE : PARA PODER HACER SCROLL DENTRO DEL MARCO DE EDICION DE MONACO
            window.scrollCode_editor = function(valueScroll) {
                mi_code_editor.setScrollTop(valueScroll);
            };

            // NOTE : GUARDAR EL CODIGO EN LE ARCHIVO MD
            window.save_CodeEdit = function() {
                saveDescription(mi_code_editor.getValue());
            };
        });
    }  

    Eventos_edicion() {
        let etiqueta = this;

        // NOTE : BOTÓN DE GUARDAR CAMBIOS
        document.getElementById('my_btn_save').addEventListener('click', function(){
            save_CodeEdit();
            etiqueta.mi_save();
        });

        // NOTE : BOTÓN DE SALIR DE LA EDICIÓN
        document.getElementById('my_btn_out').addEventListener('click', function() {
            window.location.reload(true);
        });

        // NOTE : CAPTURA EL SCROLL DEL VIEW Y AFECTA AL EDIT
        this.$('lvr_code_view').addEventListener('scroll', etiqueta.manejarScroll);
        
        // NOTE CAPTURAMOS EL EVENTO CLICK DE TODAS LAS ETIQUETAS CON LA CLASE 'edit_distribution'
        const edit_distribution = this.$$('.edit_distribution');
        edit_distribution.forEach(item => {
            item.addEventListener('click', event => {
                this.distribution_edit(item.innerHTML);
            });
        });

        // NOTE : EVENTOS DE LOS DESPLEGABLES DEL EDITOR
        const dropdown2 = this.$$('.dropdown2');
        // Cambiar el color de fondo de todos los elementos seleccionados
        dropdown2.forEach(item => {
            // Agregar un evento de clic al botón
            item.addEventListener('click', event => {
                item.querySelector('.dropdown-content').classList.toggle('show');
            });
        });

        // NOTE : CERRAR LOS DESPLEGABLES SI HACEMOS CLICK FUERA
        window.addEventListener('click', (e) => {
            dropdown2.forEach(button => {
                if (!button.contains(e.target)) {
                    button.querySelector('.dropdown-content').classList.remove('show');
                }
            });
        }); 
    }

    mi_un_save() {
        document.getElementById('edit_md_name').classList.add('unsave');
        document.getElementById('edit_md_name').innerHTML = `<p><mark>*</mark>EditFile</p>`;
    }
    
    mi_save() {
        document.getElementById('edit_md_name').classList.remove('unsave');
        document.getElementById('edit_md_name').innerHTML = `<p><span></span>EditFile</p>`;
    }

    // NOTE : CONS ESTO ACTUALIZAMOS EL SCROLL DEL EDITOR
    manejarScroll() {
        let mi_preview = document.getElementById('lvr_code_view');
        let scrollVertical = mi_preview.scrollTop;
        scrollCode_editor(scrollVertical);
    }

    distribution_edit(distribution) {
        let edit_cont = document.getElementById('lvr_code_editor');
        let mi_preview = document.getElementById('lvr_code_view');

        edit_cont.classList.remove('hidden');
        edit_cont.classList.remove('expand');
        mi_preview.classList.remove('hidden');
        mi_preview.classList.remove('expand');
        if(distribution == 'Viwer') {
            edit_cont.classList.add('hidden');
            mi_preview.classList.add('expand');
        }else if(distribution == 'Edit') {
            edit_cont.classList.add('expand');
            mi_preview.classList.add('hidden');
        }else {

        }
    }
}