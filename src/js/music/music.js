/**
 * Intro: Music class for playing music in games
 * Author: Wang Zeyu
 * Email: ycdfwzy@outlook.com
 * Date: 2018.7.11
 * References: wechat-games demo
 */

let instance;

export default class Music {
  constructor() {
    if (instance) return instance;

    instance = this;

    this.bgmAudio = new Audio();
    this.bgmAudio.autoplay = true;
    this.bgmAudio.loop = true;
    this.bgmAudio.src = 'audio/bgm.mp3';

    this.shootAudio = new Audio();
    this.shootAudio.src = 'audio/bullet.mp3';

    this.boomAudio = new Audio();
    this.boomAudio.src = 'audio/boom.mp3';

    this.playBgm();
    wx.onShow((() => {
      this.playBgm();
    }));
  }

  playBgm() {
    this.bgmAudio.play();
  }

  playShoot() {
    this.shootAudio.currentTime = 0;
    this.shootAudio.play();
  }

  playExplosion() {
    this.boomAudio.currentTime = 0;
    this.boomAudio.play();
  }
}
