import Main from '../main.js'
import LinkedList from '../list/linkerlist.js'
import Player from '../player/player.js'
import Bullet from '../bullet/bullet.js'
import Astroid from '../astroid/astroid.js'
import Constant from '../constant/constant.js'
import Enemy from '../enemy/enemy.js'
import { Point, Circle, Vector2d } from "../base/geometry"
import Music from "../music/music"
import gameInfo from "../gameinfo/gameinfo"
import Life from "../life/Life"

export default class Playing {
  constructor(constant, main){
    this.main = main;
    this.constant = constant;
    this.canvas = main.canvas;
    this.ctx = main.ctx;

    this.main.openDataContext.postMessage({
      type: 'updateFriends',
    });

    this.player = new Player(this.constant, this.constant.gameCor.width / 2, this.constant.gameCor.height / 2, this.constant.playerStyle.r0);
    this.bullets = new LinkedList();
    this.enemys = new LinkedList();
    this.enemysBullet = new LinkedList();
    this.astroids = new LinkedList();
    this.lifes = new LinkedList();
    for (let i = 0; i < 1; ++i) {
      let enemy = this.initEnemy();
      this.enemys.push(enemy);
    }
    for (let i = 0; i < 6; ++i) {
      let astroid = this.initAstroid();
      this.astroids.push(astroid);
    }
    {
      for (let i = 0; i < 3; ++i) {
        let astroid = this.initAstroid(true);
        this.astroids.push(astroid);
      }
    }
    // {
    //   let life = this.initLife(this.constant.gameCor.width/2, this.constant.gameCor.height/2);
    //   this.lifes.push(life);
    // }
    this.enemyCount = 1000;
    this.astroidCount = 1000;
    this.shootCount = 0;
    this.playerAngle = 0;
    this.clickShoot = false;
    this.clickAcc = false;
    this.gameInfo = new gameInfo(this.constant, this);
  }

  getRandompos() {
    let ret = new Point();
    ret.x = Math.random() * this.constant.gameCor.width;
    let t = Math.abs(ret.x - this.player.getX());
    while (Math.min(t, this.constant.gameCor.width - t) < this.constant.canvas.width / 2) {
      ret.x = Math.random() * this.constant.gameCor.width;
      t = Math.abs(ret.x - this.player.getX());
    }
    ret.y = Math.random() * this.constant.gameCor.height;
    t = Math.abs(ret.y - this.player.getY());
    while (Math.min(t, this.constant.gameCor.height - t) < this.constant.canvas.height / 2) {
      ret.y = Math.random() * this.constant.gameCor.height;
      t = Math.abs(ret.y - this.player.getY());
    }
    return ret;
  }

  initEnemy() {
    const pos = this.getRandompos();
    let ret;
    if (Math.random() < 0.33) {
      ret = new Enemy(this.constant, pos.x, pos.y, "large");
    }
    else
      if (Math.random() < 0.5) {
        ret = new Enemy(this.constant, pos.x, pos.y, "medium");
      } else {
        ret = new Enemy(this.constant, pos.x, pos.y, "small");
      }
    return ret;
  }

  initAstroid(aimtoPlayer = false) {
    const pos = this.getRandompos();
    let vel;
    if (aimtoPlayer) {
      vel = new Vector2d(this.player.getX() - pos.x, this.player.getY() - pos.y);
    } else {
      vel = new Vector2d(Math.random() * 2 - 1, Math.random() * 2 - 1);
    }
    vel.normalize((Math.random() + 0.5) * this.constant.canvas.height / 300);
    let ret = new Astroid(this.constant, pos.x, pos.y, vel.x, vel.y, "large");
    return ret;
  }

  initLife(x, y) {
    let ret = new Life(this.constant, this, x, y, this.constant.heartStyle.radius);
    return ret;
  }

  update() {
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

  react() {
    this.player.turn(this.playerAngle);
    if (this.clickShoot && this.shootCount === 0) {
      let bul = this.player.shoot();
      this.bullets.push(bul);
      this.shootCount = 30;
      this.main.music.playShoot();
    }
    if (this.clickAcc) { this.player.accelerate(); }
  }

  updateList(list) {
    let itr = list.head;
    while (itr !== null) {
      itr.data.update();
      itr = itr.next;
    }
  }

  checkBulletLife(list) {
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

  checkTimer() {
    if (this.shootCount > 0)
      this.shootCount -= 1;
    /* check bullet's life span */
    this.checkBulletLife(this.bullets);
    this.checkBulletLife(this.enemysBullet);
    /*-------------------------*/
    /*    random add enemy    */
    this.enemyCount -= 1;
    if (this.enemyCount === 0) {
      if (this.enemys.size < 3) {
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
    if (this.astroidCount > 0) {
      this.astroidCount -= 1;
    }
    // console.log(this.astroidCount);
    if (this.astroidCount === 0 && this.astroids.size < this.constant.astroidLimit) {
      let astroid = this.initAstroid(true);
      this.astroids.push(astroid);
      this.astroidCount = Math.max(100, Math.floor(1000 - this.main.aniId / 10));
      // console.log(`astroidCount ${this.astroidCount}`);
    }
    /*-------------------------*/
  }

  canShoot(enemy) {
    let dx = Math.abs(enemy.getX() - this.player.getX());
    let dy = Math.abs(enemy.getY() - this.player.getY());
    if (dx > this.constant.gameCor.width / 2)
      dx = this.constant.gameCor.width - dx;
    if (dy > this.constant.gameCor.height / 2)
      dy = this.constant.gameCor.height - dy;
    return dx < this.constant.canvas.width / 2 &&
      dy < this.constant.canvas.height / 2;
  }

  inScreen(obj) {
    let dx = Math.abs(obj.getX() - this.player.getX());
    let dy = Math.abs(obj.getY() - this.player.getY());
    if (dx > this.constant.gameCor.width / 2)
      dx = this.constant.gameCor.width - dx;
    if (dy > this.constant.gameCor.height / 2)
      dy = this.constant.gameCor.height - dy;
    return dx < this.constant.canvas.width / 2 + obj.getRadius() &&
      dy < this.constant.canvas.height / 2 + obj.getRadius();
  }


  checkCollisioninLists(list1, list2, flag = false) {
    let itr1 = list1.head;
    let newlist = [];
    while (itr1 !== null) {
      let itr2 = list2.head;
      let hasCollision = false;
      while (itr2 !== null) {
        if (this.inScreen(itr2.data) === false) {
          itr2 = itr2.next;
          continue;
        }

        if (itr1.data.checkCollision(this.constant, itr2.data)) {
          let tmpitr = itr1.next;
          list1.delete(itr1);
          itr1 = tmpitr;

          if (itr2.data instanceof Astroid) {
            let childlist = itr2.data.split();
            while (childlist.length > 0) {
              let back = childlist.pop();
              newlist.push(back);
            }
          }

          if (flag === true) { // is player's bullet
            this.gameInfo.scorepp(itr2.data.score);
            if (itr2.data instanceof Enemy) {
              // this.gameInfo.scorepp();
              if (Math.random() < 0.5 && this.lifes.size < 1){
                let life = this.initLife(itr2.data.getX(), itr2.data.getY());
                this.lifes.push(life);
              }
            }
            this.main.music.playExplosion();
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

    while (newlist.length > 0) {
      let back = newlist.pop();
      list2.push(back);
    }

  }

  checkCollisionwithPlayer(list, player) {
    let itr = list.head;
    if (player.immortalCount > 0 && (itr === null || !(itr.data instanceof Life)))
      return;
    while (itr !== null) {
      if (this.inScreen(itr.data) === false) {
        itr = itr.next;
        continue;
      }
      if (player.checkCollision(this.constant, itr.data)) {
        if (itr.data instanceof Life) {
          player.addonelife();
        }
        else
        {
          player.loseonelife();
          if (player.life === 0) {
            setTimeout(this.main.GameOver.bind(this.main), 100);
          }
        }
        list.delete(itr);
        break;
      }
      itr = itr.next;
    }
  }

  checkCollision() {
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
    //life and player
    this.checkCollisionwithPlayer(this.lifes, this.player);
  }

  render() {
    //clear all contexts
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.constant.gameStyle.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground(this.ctx);
    this.player.drawtoCanvas(this.ctx, this.player.getX(), this.player.getY());
    this.drawList(this.enemys, this.ctx);
    this.drawList(this.bullets, this.ctx);
    this.drawList(this.enemysBullet, this.ctx);
    this.drawList(this.astroids, this.ctx);
    this.drawList(this.lifes, this.ctx);
    this.gameInfo.drawtoCanvas(this.ctx);
  }

  drawBackground(ctx) {
    let x = [];
    let y = [];
    for (let i = 1; i < this.constant.gameCor.width; i += this.constant.gameStyle.lineWidth) {
      x.push(i);
    }
    for (let i = 1; i < this.constant.gameCor.height; i += this.constant.gameStyle.lineWidth) {
      y.push(i);
    }
    ctx.beginPath();
    for (let i = 0; i < x.length; i += 1) {
      let arrx = [x[i], x[i] + this.constant.gameCor.width, x[i] - this.constant.gameCor.width];
      for (let j = 0; j < arrx.length; j += 1) {
        let newCorStart = this.player.corTrans(arrx[j], 1 - this.constant.gameCor.height,
          this.player.getX(), this.player.getY(),
          this.constant.gameCor.width, this.constant.gameCor.height,
          this.constant.canvas.width, this.constant.canvas.height);
        let newCorEnd = this.player.corTrans(arrx[j], 2 * this.constant.gameCor.height - 1,
          this.player.getX(), this.player.getY(),
          this.constant.gameCor.width, this.constant.gameCor.height,
          this.constant.canvas.width, this.constant.canvas.height);
        if (newCorStart.x > 0 && newCorStart.x < canvas.width) {
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
        if (newCorStart.y > 0 && newCorStart.y < canvas.height) {
          ctx.strokeStyle = this.constant.gameStyle.backline;
          ctx.lineWidth = this.constant.gameStyle.lineSize;
          ctx.moveTo(newCorStart.x, newCorStart.y);
          ctx.lineTo(newCorEnd.x, newCorEnd.y);
        }
      }
    }
    ctx.stroke();
  }

  drawList(list, ctx) {
    let itr = list.head;
    //let cnt = 0;
    while (itr !== null) {
      itr.data.drawtoCanvas(ctx, this.player.getX(), this.player.getY());
      //cnt += 1;
      itr = itr.next;
    }
  }
}