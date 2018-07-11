//import bunch of things
import {Point, Circle, Vector2d} from "./base/geometry"
import Player from "./player/player"
import Astroid from "./astroid/astroid"
import Bullet from "./bullet/bullet"
import LinkedList from "./list/linkerlist"
import gameInfo from "./gameinfo/gameinfo"
import Enemy from "./enemy/enemy"
import Constant from "./constant/constant"

//frame per second
const fps = 60;

//main class
export default class Main {
  constructor() {
    this.aniId = 0;
    // console.log(canvas.width);
    // console.log(canvas.height);
    // wx.setPreferredFramesPerSecond(fps);
    this.gameStatus = undefined;
    let width = canvas.width;
    let height = canvas.height;
    canvas.width = (width > height) ? width : height;
    canvas.height = (width < height) ? width : height;
    this.canvas = canvas;//wx.createCanvas();
    //get canvas contextthis.constant.gameCor
    this.ctx = this.canvas.getContext('2d');
    //create canvas buffer and get context
    this.firstCanvasBuffer = wx.createCanvas();
    this.firstBufferContext = this.firstCanvasBuffer.getContext('2d');
    this.secondCanvasBuffer = wx.createCanvas();
    this.secondBufferContext = this.secondCanvasBuffer.getContext('2d');
    this.constant = new Constant(this.canvas);
    // console.log(this.constant.gameCor);
    //some other init works
    // console.log(Player);
    this.firstCanvasBuffer.width = this.constant.gameCor.width;
    this.firstCanvasBuffer.height = this.constant.gameCor.height;
    this.secondCanvasBuffer.width = this.constant.gameCor.width * 3;
    this.secondCanvasBuffer.height = this.constant.gameCor.height * 3;
    this.firstBufferContext = this.firstCanvasBuffer.getContext('2d');
    this.secondBufferContext = this.secondCanvasBuffer.getContext('2d');
    this.start();
    //console.log(canvas.width, canvas.height);
    //console.log(firstCanvasBuffer.width, firstCanvasBuffer.height);
    //console.log(secondCanvasBuffer.width, secondCanvasBuffer.height);
    this.printed = false;
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
    this.clickLeft = false;
    this.clickRight = false;
    this.clickShoot = false;
    this.clickAcc = false;
    this.gameInfo = new gameInfo(this.constant, this);

    this.gameStatus = "playing";

    this.bindLoop = this.loop.bind(this);

    //cancel last animation frame
    window.cancelAnimationFrame(this.aniId);

    //set the callback of next frame
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      this.canvas
    );
  }

  //game main loop
  loop() {
    //other things to do in a loop, e.g. update and render
    //console.log(this.calcLength(this.enemys));
    if (this.gameStatus === 'playing') {
      this.update();
      this.render();
    }

    //set the callback of next frame
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      this.canvas
    );
  }
  
  calcLength(list){
    let itr = list.head;
    let cnt = 0;
    while (itr !== null){
      cnt += 1;
      itr = itr.next;
    }
    return cnt;
  }

  initEnemy(){
    const posx = Math.random() * this.constant.gameCor.width;
    const posy = Math.random() * this.constant.gameCor.height;
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
    const posx = Math.random() * this.constant.gameCor.width;
    const posy = Math.random() * this.constant.gameCor.height;
    let vel = new Vector2d(Math.random() * 2 - 1, Math.random() * 2 - 1);
    let ret = new Astroid(this.constant, posx, posy, vel.x, vel.y, "large");
    return ret;
  }

  update(){
    //console.log(this.gameInfo.score);
    this.react();
    this.checkTimer();
    this.checkCollision();
    this.player.update();
    this.updateList(this.bullets);
    this.updateList(this.enemysBullet);
    this.updateList(this.enemys);
    this.updateList(this.astroids);
  }

  react(){
    if (this.clickLeft) { this.player.turnleft(); }
    if (this.clickRight) { this.player.turnright(); }
    if (this.clickShoot && this.shootCount === 0) {
      let bul = this.player.shoot();
      this.bullets.push(bul);
      this.shootCount = 30;
    }
    if (this.clickAcc) { this.player.accelerate(); }

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
    let itr = this.bullets.head;
    while (itr !== null) {
      if (itr.data.life === 0) {
        let tmp = itr;
        itr = itr.next;
        this.bullets.delete(tmp);
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
      // console.log(itr.data.shootTimer);
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
    let newlist = [];
    while (itr1 !== null) {
      let itr2 = list2.head;
      let hasCollision = false;
      while (itr2 !== null) {
        if (itr1.data.checkCollision(this.constant, itr2.data)) {
          let tmpitr = itr1.next;
          list1.delete(itr1);
          itr1 = tmpitr;

          if (itr2.data instanceof Astroid){
            let childlist = itr2.data.split();
            while (childlist.length > 0){
              let back = childlist.pop();
              newlist.push(back);
            }
          }

          list2.delete(itr2);
          hasCollision = true;
          break;
        }
        itr2 = itr2.next;
      }
      if (hasCollision === false) {
        itr1 = itr1.next;
      } else
      if (flag === true){
        this.gameInfo.scorepp();
      }
    }

    while (newlist.length > 0){
      let back = newlist.pop();
      list2.push(back);
    }

  }

  checkCollisionwithPlayer(list, player){
    if (player.immortalCount > 0)
      return;
    let itr = list.head;
    while (itr !== null) {
      if (player.checkCollision(this.constant, itr.data)){
        player.loseonelife();
        list.delete(itr);
        if (player.life === 0){
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
    //this.checkCollisioninLists(this.enemysBullet, this.enemys);
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.firstBufferContext.clearRect(0, 0, this.firstCanvasBuffer.width, this.firstCanvasBuffer.height);
    this.secondBufferContext.clearRect(0, 0, this.secondCanvasBuffer.width, this.secondCanvasBuffer.height);

    //draw first buffer context
    // this.firstBufferContext.fillStyle = '#ffffff';
    // this.firstBufferContext.fillRect(0, 0, this.constant.gameCor.x, this.constant.gameCor.y);
    this.firstBufferContext.fillStyle = this.constant.gameStyle.background;
    this.firstBufferContext.fillRect(0, 0, this.constant.gameCor.width, this.constant.gameCor.height);
    this.firstBufferContext.beginPath();
    for(let i = 1; i < this.constant.gameCor.width; i += 100) {
      this.firstBufferContext.moveTo(i, 0);
      this.firstBufferContext.lineTo(i, this.constant.gameCor.height);
    }
    for(let i = 1; i < this.constant.gameCor.height; i += 100) {
      this.firstBufferContext.moveTo(0, i);
      this.firstBufferContext.lineTo(this.constant.gameCor.width, i);
    }
    this.firstBufferContext.fillStyle = this.constant.gameStyle.backline;
    this.firstBufferContext.lineSize = this.constant.gameStyle.lineSize;
    this.firstBufferContext.stroke();

    this.drawList(this.enemys, this.firstBufferContext);
    this.drawList(this.bullets, this.firstBufferContext);
    this.drawList(this.enemysBullet, this.firstBufferContext);
    this.drawList(this.astroids, this.firstBufferContext);
    this.player.drawtoCanvas(this.firstBufferContext);

    //copy to second buffer context
    // this.secondBufferContext.drawImage(this.firstCanvasBuffer, this.constant.gameCor.width, this.constant.gameCor.height)
    for(let i = 0; i < 3; i += 1) {
      for(let j = 0; j < 3; j += 1) {
        this.secondBufferContext.drawImage(this.firstCanvasBuffer, 0, 0, this.constant.gameCor.width, this.constant.gameCor.height, this.constant.gameCor.width * i, this.constant.gameCor.height * j, this.constant.gameCor.width, this.constant.gameCor.height);
      }
    }

    //clip to screen context
    // console.log(this.player.getX(), this.player.getY());

    let gameCorx = this.player.getX() + this.constant.gameCor.width - this.canvas.width / 2;
    let gameCory = this.player.getY() + this.constant.gameCor.height - this.canvas.height / 2;
    this.ctx.drawImage(this.secondCanvasBuffer, gameCorx, gameCory, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);
    this.gameInfo.drawtoCanvas(this.ctx);

    // let gx = this.constant.gameCor.width;
    // let gy = this.constant.gameCor.height;
    // this.ctx.drawImage(this.secondCanvasBuffer, 0, 0, gx * 3, gy * 3, 0, 0, this.canvas.width, this.canvas.height);
    // this.gameInfo.drawtoCanvas(this.ctx);

    // if(!this.printed) {
    //   console.log(secondCanvasBuffer.toTempFilePath({
    //     x: 0,
    //     y: 0,
    //     width: this.constant.gameCor.width * 3,
    //     height: this.constant.gameCor.height * 3,
    //     destWidth: this.constant.gameCor.width * 3,
    //     destHeight: this.constant.gameCor.height * 3,
    //     success: (res) => {
    //       wx.shareAppMessage({
    //         imageUrl: res.tempFilePath
    //       })
    //     }
    //   }));
    //   this.printed = true;
    // }

  }

  drawList(list, ctx){
    let itr = list.head;
    //let cnt = 0;
    while (itr !== null){
      itr.data.drawtoCanvas(ctx);
      //cnt += 1;
      itr = itr.next;
    }
    // if (list === this.bullets)
    //   console.log(cnt);
  }

  GameOver(){
    this.gameStatus = "over";
    window.cancelAnimationFrame(this.aniId);
    setTimeout(this.start.bind(this), 100);
  }

}