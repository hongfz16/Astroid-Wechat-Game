//import bunch of things
import {Point, Circle, Vector2d} from "./base/geometry"
import Player from "./player/player"
import Astroid from "./astroid/astroid"
import Bullet from "./bullet/bullet"
import LinkedList from "./list/linkerlist"
import gameInfo from "./gameinfo/gameinfo"
import Enemy from "./enemy/enemy"
import Constant from "./constant/constant"

//get canvas context
let ctx = canvas.getContext('2d');
//create canvas buffer and get context
let firstCanvasBuffer = wx.createCanvas();
let firstBufferContext = firstCanvasBuffer.getContext('2d');
let secondCanvasBuffer = wx.createCanvas();
let secondBufferContext = secondCanvasBuffer.getContext('2d');
//frame per second
const fps = 60;

//main class
export default class Main {
  constructor() {
    this.aniId = 0;
    // wx.setPreferredFramesPerSecond(fps);
    this.gameStatus = undefined;
    this.constant = new Constant(canvas);
    // console.log(this.constant.gameCor);
    //some other init works
    // console.log(Player);
    firstCanvasBuffer.width = this.constant.gameCor.width;
    firstCanvasBuffer.height = this.constant.gameCor.height;
    secondCanvasBuffer.width = this.constant.gameCor.width * 3;
    secondCanvasBuffer.height = this.constant.gameCor.height * 3;
    firstBufferContext = firstCanvasBuffer.getContext('2d');
    secondBufferContext = secondCanvasBuffer.getContext('2d');
    this.start();
    //console.log(canvas.width, canvas.height);
    //console.log(firstCanvasBuffer.width, firstCanvasBuffer.height);
    //console.log(secondCanvasBuffer.width, secondCanvasBuffer.height);
  }

  //start game entry
  start() {
    //init some other data
    this.player = new Player(this.constant, this.constant.gameCor.width / 2, this.constant.gameCor.height / 2, this.constant.playerStyle.r0);
    this.bullets = new LinkedList();
    this.enemys = new LinkedList();
    this.enemysBullet = new LinkedList();
    this.astroids = new LinkedList();
    for (let i = 0; i < 2; ++i){
      let enemy = this.initEnemy();
      this.enemys.push(enemy);
    }
    for (let i = 0; i < 2; ++i){
      let astroid = this.initAstroid();
      this.astroids.push(astroid);
    }
    this.enemyCount = 1000;
    this.astroidCount = 1000;
    //this.bulletCount = 0;
    this.shootCount = 0;
    this.gameInfo = new gameInfo(this.constant, this);

    this.gameStatus = "playing";

    this.bindLoop = this.loop.bind(this);

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
    if (this.gameStatus === 'playing') {
      this.update();
      this.render();
    }

    //set the callback of next frame
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    );
  }
  
  initEnemy(){
    const posx = Math.random() * canvas.width;
    const posy = Math.random() * canvas.height;
    let ret;
    if (Math.random() < 0.5) {
      ret = new Enemy(this.constant, posx, posy, "large");
    }
    else {
      ret = new Enemy(this.constant, posx, posy, "small");
    }
    return ret;
  }

  initAstroid(){
    const posx = Math.random()*canvas.width;
    const posy = Math.random()*canvas.height;
    let vel = new Vector2d(Math.random() * 2 - 1, Math.random() * 2 - 1);
    let ret = new Astroid(this.constant, posx, posy, vel.x, vel.y, "large");
    return ret;
  }

  update(){
    this.checkTimer();
    this.checkCollision();
    this.player.update();
    this.updateList(this.bullets);
    this.updateList(this.enemysBullet);
    this.updateList(this.enemys);
    this.updateList(this.astroids);
  }

  updateList(list){
    let itr = list.head;
    while (itr !== null) {
      itr.data.update();
      itr = itr.next;
    }
  }

  checkTimer(){
    if (this.shootCount > 0)
      this.shootCount -= 1;
    /* check bullet's life span */
    let itr = this.enemys.head;
    while (itr !== null) {
      if (itr.data.life === 0) {
        let tmp = itr;
        itr = itr.next;
        this.enemys.delete(tmp);
      } else
      {
        itr = itr.next;
      }
    }
    /*-------------------------*/
    /*    random add enemy    */
    this.enemyCount -= 1;
    if (this.enemyCount === 0){
      let enemy = this.initEnemy();
      this.enemys.push(enemy);
      this.enemyCount = 1000;
    }
    /*-------------------------*/
    /*       enemy shoot       */
    itr = this.enemys.head;
    while (itr !== null) {
      if (itr.data.shootTimer === 0) {
        let bul = itr.data.shoot(this.player.getX(), this.player.getY());
        this.enemysBullet.push(bul);
      }
      itr = itr.next;
    }
    /*-------------------------*/
    /*    random add astroid   */
    this.astroidCount -= 1;
    if (this.astroidCount === 0){
      let astroid = this.initAstroid();
      this.astroids.push(astroid);
      this.astroidCount = 1000;
    }
    /*-------------------------*/
  }

  checkCollisioninLists(list1, list2, flag = false){
    let itr1 = list1.head;
    while (itr1 !== null) {
      let itr2 = list2.head;
      let hasCollision = false;
      while (itr2 !== null) {
        if (itr1.data.circle.checkCollision(itr2.data.circle)) {
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
      } else
      {
        this.gameInfo.scorepp();
      }
    }
  }

  checkCollisionwithPlayer(list, player){
    if (player.immortalCount > 0)
      return;
    let itr = list.head;
    while (itr !== null) {
      if (itr.data.circle.checkCollision(player.circle)){
        this.player.loseonelife();
        if (this.player.life === 0){
          list.delete(itr);
          this.GameOver();
          break;
        }
      }
      itr = itr.next;
    }
  }

  checkCollision(){
    //bullet and astroid
    this.checkCollisioninLists(this.bullets, this.astroids, true);
    this.checkCollisioninLists(this.enemysBullet, this.astroids);
    //bullet and enemy
    this.checkCollisioninLists(this.bullets, this.enemys, true);
    this.checkCollisioninLists(this.enemysBullet, this.enemys);
    //bullet and player
    //checkCollisionwithPlayer(this.bullet, this.player);
    this.checkCollisionwithPlayer(this.enemysBullet, this.player);
    //enemy and player
    this.checkCollisionwithPlayer(this.enemys, this.player);
    //astroid and player
    this.checkCollisionwithPlayer(this.astroids, this.player);
  }

  render(){
    //clear all contexts
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    firstBufferContext.clearRect(0, 0, firstCanvasBuffer.width, firstCanvasBuffer.height);
    secondBufferContext.clearRect(0, 0, secondCanvasBuffer.width, secondCanvasBuffer.height);

    //draw first buffer context
    firstBufferContext.fillStyle = '#ffffff';
    firstBufferContext.fillRect(0, 0, this.constant.gameCor.x, this.constant.gameCor.y);
    firstBufferContext.fillStyle = this.constant.gameStyle.background;
    firstBufferContext.fillRect(10, 10, this.constant.gameCor.x - 10, this.constant.gameCor.y - 10);
    this.drawList(this.enemys, firstBufferContext);
    this.drawList(this.bullets, firstBufferContext);
    this.drawList(this.enemysBullet, firstBufferContext);
    this.drawList(this.astroids, firstBufferContext);
    this.player.drawtoCanvas(firstBufferContext);

    //copy to second buffer context
    secondBufferContext.drawImage(firstCanvasBuffer, this.constant.gameCor.width, this.constant.gameCor.height)
    for(let i = 0; i < 2; i += 1) {
      for(let j = 0; j < 2; j += 1) {
        secondBufferContext.drawImage(firstCanvasBuffer, 0, 0, this.constant.gameCor.width, this.constant.gameCor.height, this.constant.gameCor.width * i, this.constant.gameCor.height * j, this.constant.gameCor.width, this.constant.gameCor.height);
      }
    }

    //clip to screen context
    // console.log(this.player.getX(), this.player.getY());
    let gameCorx = this.player.getX() + this.constant.gameCor.width - canvas.width;
    let gameCory = this.player.getY() + this.constant.gameCor.height - canvas.height;
    ctx.drawImage(secondCanvasBuffer, gameCorx, gameCory, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    this.gameInfo.drawtoCanvas(ctx);
  }

  drawList(list, ctx){
    let itr = list.head;
    while (itr !== null){
      itr.data.drawtoCanvas(ctx);
      itr = itr.next;
    }
  }

  GameOver(){
    this.gameStatus = "over";
    window.cancelAnimationFrame(this.aniId);
  }

}