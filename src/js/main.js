//import bunch of things

//get canvas context
let ctx = canvas.getContext('2d');
//frame per second
const fps = 60;

//main class
export default class Main {
  constructor() {
    this.aniId = 0;
    wx.setPreferredFramesPerSecond(fps);
    //some other init works
  }

  //start game entry
  start() {
    //init some other data

    this.bindloop = this.loop.find(this);

    //cancel last animation frame
    window.cancelAnimationFrame(this.aniId);

    //set the callback of next frame
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    );
  }

  //game main loop
  loop() {
    //other things to do in a loop, e.g. update and render

    //set the callback of next frame
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    );
  }

}