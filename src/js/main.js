//import bunch of things
import Vector2D from "./base/geometry.js"
import Player from "./player/player.js"
import Astroid from "./astroid/astroid.js"
import Bullet from "./bullet/bullet.js"

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
    this.bullets = new LinkedList;
    this.enemys = new LinkedList;
    this.astroids = new LinkedList;
    for (let i = 0; i < 2; ++i){
      let enemy = initEnemy();
      this.enemys.push(enemy);
    }
    for (let i = 0; i < 2; ++i){
      let astroid = initAstroid();
      this.astroids.push(astroid);
    }
    this.enemyCount = 1000;
    this.astroidCount = 1000;
    this.bulletCount = 0;

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
    const posx = Math.random() * canvas.width;
    const posy = Math.random() * canvas.height;
    if (Math.random() < 0.5) {
      let ret = new enemy(posx, posy, "large");
    }
    else {
      let ret = new enemy(posx, posy, "small");
    }
    return ret;
  }

  initAstroid(){
    const posx = Math.random()*canvas.width;
    const posy = Math.random()*canvas.height;
    let vel = new Vector2D(Math.random() * 2 - 1, Math.random() * 2 - 1);
    let ret = new Astroid(posx, posy, vel.x, vel.y, "large");
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

  checkTimer(){
    if (this.bulletCount > 0)
      this.bulletCount -= 1;
    
    let itr = this.enemys;
    while (itr !== null){
      if (itr.data.life === 0){
        this.enemys.delete(itr);
      }
    }

    this.enemyCount -= 1;
    if (this.enemyCount === 0){
      let enemy = initEnemy();
      this.enemys.push(enemy);
    }
    this.astroidCount -= 1;
    if (this.astroidCount === 0){
      let astroid = initAstroid();
      this.astroids.push(astroid);
    }
  }

  checkCollisioninLists(list1, list2){
    let itr1 = list1.head;
    while (itr1 !== null) {
      let itr2 = list2.head;
      let hasCollision = false;
      while (itr2 !== null) {
        if (itr1.circle.checkCollision(itr2.circle)) {
          let tmpitr = itr1.next;
          list1.delete(itr1);
          itr1 = tmpitr;
          list2.delete(itr2);
          hasCollision = true;
          break;
        }
        itr2 = itr2.next;
      }
      if (hasCollision === false) {
        itr1 = itr1.next;
      }
    }
  }

  checkCollisionwithPlayer(list, player){
    let itr = list.head;
    while (itr !== null) {
      if (itr.circle.checkCollision(player.circle)){
        list.delete(itr);
        GameOver();
        break;
      }
      itr = itr.next;
    }
  }

  checkCollision(){
    //bullet and astroid
    checkCollisioninLists(this.bullet, this.astroid);
    //bullet and enemy
    checkCollisioninLists(this.bullet, this.enemy);
    //bullet and player
    checkCollisionwithPlayer(this.bullet, this.player);
    //enemy and player
    checkCollisionwithPlayer(this.enemy, this.player);
    //astroid and player
    checkCollisionwithPlayer(this., this.player);
  }

  drawCanvas(){

  }

  GameOver(){
    
  }

}