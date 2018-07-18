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
import Playing from "./playing/playing.js"
import survivalPlaying from "./playing/survivalplaying.js"

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

    // this.playerAngle = 0;
    // this.player = new Player(this.constant, this.constant.gameCor.width / 2, this.constant.gameCor.height / 2, this.constant.playerStyle.r0);
    // this.bullets = new LinkedList();
    // this.enemys = new LinkedList();
    // this.enemysBullet = new LinkedList();
    // this.astroids = new LinkedList();
    // for (let i = 0; i < 1; ++i){
    //   let enemy = this.initEnemy();
    //   this.enemys.push(enemy);
    // }
    // for (let i = 0; i < 5; ++i){
    //   let astroid = this.initAstroid();
    //   this.astroids.push(astroid);
    // }
    // {
    //   for (let i = 0; i < 3; ++i) {
    //     let astroid = this.initAstroid(true);
    //     this.astroids.push(astroid);
    //   }
    // }
    // this.enemyCount = 1000;
    // this.astroidCount = 1000;
    // //this.bulletCount = 0;
    // this.shootCount = 0;
    // this.clickLeft = false;
    // this.clickRight = false;
    // this.clickShoot = false;
    // this.clickAcc = false;
    // this.gameInfo = new gameInfo(this.constant, this);
    this.game = new survivalPlaying(this.constant, this);

    this.gameStatus = "playing";

    if (this.wel) {
      delete this.wel;
    }
    if (this.over) {
      delete this.over;
    }
    
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
      this.game.update();
      this.game.render();
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

  GameOver() {
    window.cancelAnimationFrame(this.aniId);

    let score = 0;
    let time = 0;
    let mode = 'adventure';
    if (this.game){
      if (this.game instanceof survivalPlaying) {
        mode = 'survival';
        time = this.game.gameInfo.Time;
      } 
      else
      {
        mode = 'adventure';
        score = this.game.gameInfo.score;
      }
      delete this.game;
    }

    this.over = new Over(this, score, time, mode);
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