//import bunch of things
import {Point, Circle, Vector2d} from "./base/geometry"
import Player from "./player/player"
import Astroid from "./astroid/astroid"
import Bullet from "./bullet/bullet"
import LinkedList from "./list/linkerlist"
import gameInfo from "./gameinfo/gameinfo"
import Enemy from "./enemy/enemy"
import Constant from "./constant/constant"
import Welcome from "./WelcOver/welcom"
import Over from "./WelcOver/over"
import Music from "./music/music"
import LeaderBoard from "./leaderboard/leaderboard"

//frame per second
const fps = 60;

//main class
export default class Main {
  constructor() {
    this.aniId = 0;
    // wx.setPreferredFramesPerSecond(fps);
    this.gameStatus = undefined;
    let width = canvas.width;
    let height = canvas.height;
    let dpr = wx.getSystemInfoSync().pixelRatio;
    canvas.width = dpr * ((width > height) ? width : height);
    canvas.height = dpr * ((width < height) ? width : height);
    this.canvas = canvas;
    this.openDataContext = wx.getOpenDataContext();
    this.sharedCanvas = this.openDataContext.canvas;
    this.sharedCanvas.width = canvas.width;
    this.sharedCanvas.height = canvas.height;
    //get canvas contextthis.constant.gameCor
    this.ctx = this.canvas.getContext('2d');
    // this.ctx.scale(pixelRatio, pixelRatio);
    this.constant = new Constant(this.canvas);
    this.openDataContext.postMessage({
      type: 'firstConnection',
    });
    this.openDataContext.postMessage({
      type: 'updateFriends',
    });
    this.music = new Music();
    this.welcome();
    wx.getSystemInfo({success(res) { console.log(res.system); }});
  }

  welcome(){
    if (this.over) {
      delete this.over;
    }
    if (this.leaderboard){
      delete this.leaderboard;
    }
    window.cancelAnimationFrame(this.aniId);
    //console.log("welcome");
    this.wel = new Welcome(this);
    this.gameStatus = "Welcome";
    this.bindLoop = this.loop.bind(this);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      this.canvas
    );
  }

  //start game entry
  start() {
    //init some other data
    this.openDataContext.postMessage({
      type: 'updateFriends',
    });

    if (this.wel) {
      delete this.wel;
    }
    if (this.over) {
      delete this.over;
    }
    this.playerAngle = 0;
    this.player = new Player(this.constant, this.constant.gameCor.width / 2, this.constant.gameCor.height / 2, this.constant.playerStyle.r0);
    this.bullets = new LinkedList();
    this.enemys = new LinkedList();
    this.enemysBullet = new LinkedList();
    this.astroids = new LinkedList();
    for (let i = 0; i < 1; ++i){
      let enemy = this.initEnemy();
      this.enemys.push(enemy);
    }
    for (let i = 0; i < 5; ++i){
      let astroid = this.initAstroid();
      this.astroids.push(astroid);
    }
    {
      for (let i = 0; i < 3; ++i) {
        let astroid = this.initAstroid(true);
        this.astroids.push(astroid);
      }
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
    if (this.gameStatus === "Welcome") {
      this.wel.drawtoCanvas();
    } else
    if (this.gameStatus === 'playing') {
      this.update();
      this.render();
    } else
    if (this.gameStatus === 'over') {
      this.over.drawtoCanvas();
    } else
    if (this.gameStatus === 'leaderboard'){
      this.leaderboard.drawtoCanvas();
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

  getRandompos(){
    let ret = new Point();
    ret.x = Math.random() * this.constant.gameCor.width;
    let t = Math.abs(ret.x - this.player.getX());
    while (Math.min(t, this.constant.gameCor.width-t) < this.canvas.width / 2){
      ret.x = Math.random() * this.constant.gameCor.width;
      t = Math.abs(ret.x - this.player.getX());
    }
    ret.y = Math.random() * this.constant.gameCor.height;
    t = Math.abs(ret.y - this.player.getY());
    while (Math.min(t, this.constant.gameCor.height-t) < this.canvas.height / 2) {
      ret.y = Math.random() * this.constant.gameCor.height;
      t = Math.abs(ret.y - this.player.getY());
    }
    return ret;
  }

  initEnemy(){
    const pos = this.getRandompos();
    //const posx = Math.random() * this.constant.gameCor.width;
    //const posy = Math.random() * this.constant.gameCor.height;
    let ret;
    if (Math.random() < 0.33) {
      ret = new Enemy(this.constant, pos.x, pos.y, "large");
    }
    else
    if (Math.random() < 0.5) {
      ret = new Enemy(this.constant, pos.x, pos.y, "medium");
    } else
    {
      ret = new Enemy(this.constant, pos.x, pos.y, "small");
    }
    return ret;
  }

  initAstroid(aimtoPlayer = false){
    const pos = this.getRandompos();
    let vel;
    if (aimtoPlayer){
      vel = new Vector2d(this.player.getX() - pos.x, this.player.getY() - pos.y);
    } else
    {
      vel = new Vector2d(Math.random() * 2 - 1, Math.random() * 2 - 1);
    }
    vel.normalize((Math.random()+0.5) * this.canvas.height / 300);
    let ret = new Astroid(this.constant, pos.x, pos.y, vel.x, vel.y, "large");
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
    this.player.turn(this.playerAngle);
    if (this.clickShoot && this.shootCount === 0) {
      let bul = this.player.shoot();
      this.bullets.push(bul);
      this.shootCount = 30;
      this.music.playShoot();
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

  checkBulletLife(list){
    let itr = list.head;
    while (itr !== null) {
      if (itr.data.life === 0) {
        let tmp = itr;
        itr = itr.next;
        list.delete(tmp);
      } else {
        itr = itr.next;
      }
    }
  }

  checkTimer(){
    if (this.shootCount > 0)
      this.shootCount -= 1;
    /* check bullet's life span */
    this.checkBulletLife(this.bullets);
    this.checkBulletLife(this.enemysBullet);
    /*-------------------------*/
    /*    random add enemy    */
    this.enemyCount -= 1;
    if (this.enemyCount === 0){
      if (this.enemys.head === null){
        let enemy = this.initEnemy();
        this.enemys.push(enemy);
      }
      this.enemyCount = 1000;
    }
    /*-------------------------*/
    /*       enemy shoot       */
    let itr = this.enemys.head;
    while (itr !== null) {
      // console.log(itr.data.shootTimer);
      if (itr.data.shootTimer === 0 && this.canShoot(itr.data)) {
        let bul = itr.data.shoot(this.player.getX(), this.player.getY());
        this.enemysBullet.push(bul);
      }
      itr = itr.next;
    }
    /*-------------------------*/
    /*    random add astroid   */
    //console.log("random add astroid");
    if (this.astroidCount > 0){
      this.astroidCount -= 1;
    }
    console.log(this.constant.astroidLimit);
    //console.log(this.astroids.size);
    if (this.astroidCount === 0 && this.astroids.size < this.constant.astroidLimit){
      //console.log("astroidCount = 0");
      let astroid = this.initAstroid(true);
      this.astroids.push(astroid);
      this.astroidCount = Math.max(100, Math.floor(1000-this.aniId/10));
      // console.log(`astroidCount ${this.astroidCount}`);
    }
    /*-------------------------*/
  }

  canShoot(enemy){
    let dx = Math.abs(enemy.getX() - this.player.getX());
    let dy = Math.abs(enemy.getY() - this.player.getY());
    if (dx > this.constant.gameCor.width / 2)
      dx = this.constant.gameCor.width - dx;
    if (dy > this.constant.gameCor.height / 2)
      dy = this.constant.gameCor.height - dy;
    return dx < this.canvas.width / 2 &&
           dy < this.canvas.height / 2;
  }

  inScreen(obj){
    let dx = Math.abs(obj.getX() - this.player.getX());
    let dy = Math.abs(obj.getY() - this.player.getY());
    if (dx > this.constant.gameCor.width / 2)
      dx = this.constant.gameCor.width - dx;
    if (dy > this.constant.gameCor.height / 2)
      dy = this.constant.gameCor.height - dy;
    return dx < this.canvas.width / 2 + obj.getRadius() &&
           dy < this.canvas.height / 2 + obj.getRadius();
  }
  

  checkCollisioninLists(list1, list2, flag = false){
    let itr1 = list1.head;
    let newlist = [];
    while (itr1 !== null) {
      let itr2 = list2.head;
      let hasCollision = false;
      while (itr2 !== null) {
        // if (Math.abs(itr2.data.getX() - this.player.getX()) > this.canvas.width / 2 + itr2.data.getRadius() ||
        //   Math.abs(itr2.data.getY() - this.player.getY()) > this.canvas.height / 2 + itr2.data.getRadius()) {
        //   itr2 = itr2.next;
        //   continue;
        //   }
        if (this.inScreen(itr2.data) === false){
          itr2 = itr2.next;
          continue;
        }

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

          if (flag === true) { // is player's bullet
            this.gameInfo.scorepp();
            if (itr2.data instanceof Enemy) { //score += 2 if hit enemy
              this.gameInfo.scorepp();
            }
            this.music.playExplosion();
          }

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
      if (this.inScreen(itr.data) === false){
        itr = itr.next;
        continue;
      }
      if (player.checkCollision(this.constant, itr.data)){
        player.loseonelife();
        list.delete(itr);
        if (player.life === 0){
          setTimeout(this.GameOver.bind(this), 100);
          //this.GameOver();
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
    // console.log(this.player.getX(),this.player.getY());
    // console.log(this.constant.gameCor.width,this.constant.gameCor.height);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.constant.gameStyle.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground(this.ctx);
    this.player.drawtoCanvas(this.ctx, this.player.getX(), this.player.getY());
    this.drawList(this.enemys, this.ctx);
    this.drawList(this.bullets, this.ctx);
    this.drawList(this.enemysBullet, this.ctx);
    this.drawList(this.astroids, this.ctx);
    this.gameInfo.drawtoCanvas(this.ctx);
  }

  drawBackground(ctx) {
    let x = [];
    let y = [];
    for(let i = 1; i < this.constant.gameCor.width; i += 100) {
      x.push(i);
    }
    for (let i = 1; i < this.constant.gameCor.height; i += 100) {
      y.push(i);
    }
    ctx.beginPath();
    for(let i = 0 ; i < x.length; i += 1) {
      let arrx = [x[i], x[i] + this.constant.gameCor.width, x[i] - this.constant.gameCor.width];
      for(let j = 0; j < arrx.length; j += 1) {
        let newCorStart = this.player.corTrans(arrx[j], 1 - this.constant.gameCor.height, 
                                               this.player.getX(), this.player.getY(), 
                                               this.constant.gameCor.width, this.constant.gameCor.height,
                                               this.constant.canvas.width, this.constant.canvas.height);
        let newCorEnd = this.player.corTrans(arrx[j], 2 * this.constant.gameCor.height - 1,
                                             this.player.getX(), this.player.getY(),
                                             this.constant.gameCor.width, this.constant.gameCor.height,
                                             this.constant.canvas.width, this.constant.canvas.height);
        if(newCorStart.x > 0 && newCorStart.x < canvas.width) {
          ctx.strokeStyle = this.constant.gameStyle.backline;
          ctx.lineWidth = this.constant.gameStyle.lineSize;
          ctx.moveTo(newCorStart.x, newCorStart.y);
          ctx.lineTo(newCorEnd.x, newCorEnd.y);
        }
      }
    }
    ctx.stroke();
    ctx.beginPath();
    for (let i = 0; i < y.length; i += 1) {
      let arry = [y[i], y[i] + this.constant.gameCor.height, y[i] - this.constant.gameCor.height];
      for (let j = 0; j < arry.length; j += 1) {
        let newCorStart = this.player.corTrans(1 - this.constant.gameCor.width, arry[j],
                                               this.player.getX(), this.player.getY(),
                                               this.constant.gameCor.width, this.constant.gameCor.height,
                                               this.constant.canvas.width, this.constant.canvas.height);
        let newCorEnd = this.player.corTrans(this.constant.gameCor.width * 2 - 1, arry[j],
                                             this.player.getX(), this.player.getY(),
                                             this.constant.gameCor.width, this.constant.gameCor.height,
                                             this.constant.canvas.width, this.constant.canvas.height);
        if(newCorStart.y > 0 && newCorStart.y < canvas.height){
          ctx.strokeStyle = this.constant.gameStyle.backline;
          ctx.lineWidth = this.constant.gameStyle.lineSize;
          ctx.moveTo(newCorStart.x, newCorStart.y);
          ctx.lineTo(newCorEnd.x, newCorEnd.y);
        }
      }
    }
    ctx.stroke();
  }

  drawList(list, ctx){
    let itr = list.head;
    //let cnt = 0;
    while (itr !== null){
      itr.data.drawtoCanvas(ctx, this.player.getX(), this.player.getY());
      //cnt += 1;
      itr = itr.next;
    }
  }

  GameOver() {
    window.cancelAnimationFrame(this.aniId);
    
    this.over = new Over(this);
    this.gameStatus = "over";
    
    this.bindLoop = this.loop.bind(this);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      this.canvas
    );
  }

  showLeaderBoard() {
    window.cancelAnimationFrame(this.aniId);

    this.leaderboard = new LeaderBoard(this);
    this.gameStatus = "leaderboard";

    this.bindLoop = this.loop.bind(this);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      this.canvas
    );
  }

}