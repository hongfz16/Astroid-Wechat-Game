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
    this.gameStatus = undefined;
    //some other init works
  }

  //start game entry
  start() {
    //init some other data
    this.player = new Player();
    this.bullets = [];
    this.enemys = [];
    this.astroids = [];
    for (let i = 0; i < 2; ++i){
      let enemy = initEnemy();
      this.enemys.push(enemy);
    }
    for (let i = 0; i < 2; ++i){
      let astroid = initAstroid();
      this.astroids.push(astroid);
    }

    this.gameStatus = "playing";

    this.bindloop = this.loop.bind(this);

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
  
  initEnemy(){
    let ret = new enemy(Math.random());
    return ret;
  }

  initAstroid(){
    let ret = new Astroid();
    return ret;
  }

  loop(){
    if (this.gameStatus === 'playing'){
      update();
      drawCanvas();
    }
  }

  update(){
    checkTimer();
    checkCollision();
    
  }

  

}