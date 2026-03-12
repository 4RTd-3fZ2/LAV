import { notification } from './lvr-utils.js';
import { lvr_init_video } from './loader/lvr-Service.js'

export class videoController {
  constructor() {
    this.$ = el => document.getElementById(el);
    this.video = this.$('lvr_video');
    this.VideoEvents();
  }

  playVideo() {
    if(this.video.paused) {
      this.video.play();
    }else {
      this.video.pause();
    }
  }

  muteVideo() {
    if (this.video.volume == 0) {
      this.video.volume = 1;
    }else {
      this.video.volume = 0;
    }
  }

  timeVideo(num) {
    this.video.currentTime = this.video.currentTime + num;
  }

  speedVideo(num) {
    console.log(this.video.playbackRate);
    this.video.playbackRate = num;
  }

  expand_video() {
    this.$('lvr-id_view_video').classList.toggle('expandVideo');
    this.$('lvr-id_view_info').classList.toggle('superimpose');
    const btn_expand = this.$('lvr_id_btn-fullscreen');
    if(btn_expand.style.opacity == 1){
      // document.exitFullscreen();
      btn_expand.style.opacity = "50%"
      this.$('lvr-id_view_info').style.opacity = 1;
      this.$('lvr-range-op-cont').style.display = 'none';
    }else {
      // document.documentElement.requestFullscreen();
      btn_expand.style.opacity = "1";
      this.$('lvr-id_view_info').style.opacity = `${this.$('lvr-range-op').value}%`;
      this.$('lvr-range-op-cont').style.display = 'flex';
    }
  }

  clearVideo() {
    if (this.video.controls) {
      this.video.controls = false;
    }else {
      this.video.controls = true;
    }
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  copyMin() {
    const min = this.formatTime(this.video.currentTime);
    const insert_min = `<div class="atom_min"><span>${min}</span> Ponit_description</div>`;
    navigator.clipboard.writeText(insert_min);
    notification(`el minuto ${min} fue copiado exitosamente!`);
  }

  closeVideo() {
    this.$('lav-video-reproductor').innerHTML = '';
  }

  VideoEvents() {
    const that = this;
    // ANCHOR : BUTTONS OF THE SETTINGS
    // NOTE : BTN CONTROL
    this.$('lvr_id_btn-volume').addEventListener('click', function(){
        console.log('VOLUME');
        that.muteVideo();
    });
    // NOTE : BTN CONTROL
    this.$('lvr_id_btn-delay-1').addEventListener('click', function(){
        console.log("DELAY 1");
        that.timeVideo(-1);
    });
    // NOTE : BTN CONTROL
    this.$('lvr_id_btn-delay-2').addEventListener('click', function(){
        console.log("DELAY 2");
        that.timeVideo(-0.05);
    });
    // NOTE : BTN CONTROL
    this.$('lvr_id_btn-pauseplay').addEventListener('click', function(){
        console.log("PAUSE PLAY");
        that.playVideo();
    });
    // NOTE : BTN CONTROL
    this.$('lvr_id_btn-advance-1').addEventListener('click', function(){
        console.log("ADVANCE 1");
        that.timeVideo(0.05);
    });
    // NOTE : BTN CONTROL
    this.$('lvr_id_btn-advance-2').addEventListener('click', function(){
        console.log("ADVANCE 2")
        that.timeVideo(1);
    });
    // NOTE : BTN CONTROL
    this.$('lvr_id_btn-speed').addEventListener('click', function(){
      console.log("SPEED");
      let text = that.$('text_speed').innerHTML;
      if(text == 1) {
        that.$('text_speed').innerHTML = 2;
        that.speedVideo(2);
      }else if(text == 2) {
        that.$('text_speed').innerHTML = 3;
        that.speedVideo(3);
      }else if(text == 3) {
        that.$('text_speed').innerHTML = '.2';
        that.$('text_speed').setAttribute('transform', 'translate(100.26 670.84)');
        that.$('text_speed').style.fill = 'red';
        that.speedVideo(0.2);
      }else if(text == '.2') {
        that.$('text_speed').innerHTML = '.3';
        that.speedVideo(0.3);
      }else if(text == '.3') {
        that.$('text_speed').innerHTML = 1;
        that.$('text_speed').setAttribute('transform', 'translate(240.26 670.84)');
        that.$('text_speed').style.fill = 'white';
        that.speedVideo(1);
      }

    });
    // NOTE : BTN CONTROL
    this.$('lvr_id_btn-fullscreen').addEventListener('click', function(){
        console.log("EXPAND VIDEO");
        that.expand_video();
    });
    // NOTE : BTN CONTROL
    this.$('lvr_id_btn-clear').addEventListener('click', function(){
        console.log("CLEAR");
        that.clearVideo();
    });
    // NOTE : BTN CONTROL
    this.$('lvr_id_btn-copymin').addEventListener('click', function(){
        console.log("COPY MIN");
        that.copyMin();
    });

    this.$('lvr-colse-button').addEventListener('click', function() {
      that.closeVideo();
    });

    this.video.addEventListener('ended', () => {
      // console.log('El video ha terminado de reproducirse', Window.global_path);
      let path = Window.global_path;
      if(window.autoPlay){
        // that.closeVideo();
        setTimeout(function() {
          lvr_init_video(null, path, true);
        }, 200);
      }
    });

    // ANCHOR : ATAJOS DE TECLADO
    document.addEventListener('keydown', function(e) {

      if (e.shiftKey && e.key === 'E') {
        console.log("Entender una cosa");
      }
      else if(e.key === 'Escape') {
        that.closeVideo();
      }
    });
  }
}