import { Write_Videos, VideosStacks, VideoSections } from './mainController.js';

const write = new Write_Videos();
write.init();

new VideosStacks();

new VideoSections();