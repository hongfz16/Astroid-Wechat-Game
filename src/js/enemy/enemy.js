/**
 * Intro: Enemy class derived from Sprite class
 * Author: Hong Fangzhou
 * Email: hongfz16@163.com
 * Date: 2018.7.11
 */

import Sprite from '../base/sprite';
import Bullet from '../bullet/bullet';
import { Point, Vector2d } from '../base/geometry';

export default class Enemy extends Sprite {
  constructor(constant, x = 0, y = 0, type = 'large') {
    const size = constant.enemySize[type];
    super(x, y, size);
    const sr = size / 2;
    const sy = y + size / 2;
    this.type = type;
    const deltasx = size * Math.sqrt(2);
    this.circle.addSubCircle(x + deltasx, sy, sr);
    this.circle.addSubCircle(x - deltasx, sy, sr);
    this.shootTimer = constant.enemyShootFrame;
    this.constant = constant;
    this.setVel();
    this.velTimer = Math.random() * this.constant.enemyVelTimer;
    this.image = new Image();
    this.image.src = 'pics/enemy.png';
    this.score = this.constant.enemyScore[this.type];
    this.shootAcc = this.constant.gameCor.width;
  }

  setVel() {
    this.targetPoint = new Point(Math.random() * this.constant.gameCor.width, Math.random() * this.constant.gameCor.height);
    const deltax = this.targetPoint.x - this.getX();
    const deltay = this.targetPoint.y - this.getY();
    const dist = Math.sqrt(Math.pow(deltax, 2) + Math.pow(deltay, 2));
    this.vel.x = this.constant.enemySpeed * deltax / dist;
    this.vel.y = this.constant.enemySpeed * deltay / dist;
    this.velTimer = Math.random() * this.constant.enemyVelTimer;
  }

  mupdate(cir) {
    cir.center.x += this.vel.x;
    cir.center.y += this.vel.y;
    cir.center.x += this.constant.gameCor.width;
    cir.center.y += this.constant.gameCor.height;
    cir.center.x %= this.constant.gameCor.width;
    cir.center.y %= this.constant.gameCor.height;
  }

  update() {
    for (let i = 0; i < this.circle.subcircle.length; i += 1) {
      this.mupdate(this.circle.subcircle[i]);
    }
    if (this.shootTimer > 0) {
      this.shootTimer -= 1;
    }
    if (this.velTimer > 0) {
      this.velTimer -= 1;
    } else {
      this.setVel();
    }
  }

  resetShootTimer() {
    this.shootTimer = this.constant.enemyShootFrame;
  }

  drawEnemy(ctx, x, y, r) {
    ctx.drawImage(this.image, x - (3 * r / 2), y - r, 3 * r, 2 * r);
  }

  drawtoCanvas(ctx, px, py) {
    const x = this.getX();
    const y = this.getY();
    const r = this.getRadius();
    const x2 = x + this.constant.gameCor.width;
    const y2 = y + this.constant.gameCor.height;
    const x3 = x - this.constant.gameCor.width;
    const y3 = y - this.constant.gameCor.height;
    const arrx = [x, x2, x3];
    const arry = [y, y2, y3];
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        const newCor = this.corTrans(arrx[i], arry[j], px, py, this.constant.gameCor.width, this.constant.gameCor.height, this.constant.canvas.width, this.constant.canvas.height);
        this.drawEnemy(ctx, newCor.x, newCor.y, r);
      }
    }
  }

  shoot(x, y) {
    x += (Math.random() - 0.5) * this.shootAcc;
    y += (Math.random() - 0.5) * this.shootAcc;
    this.shootAcc *= 0.9;
    this.resetShootTimer();
    const cx = this.getX();
    const cy = this.getY();
    const deltax = x - cx;
    const deltay = y - cy;
    const dist = Math.sqrt(Math.pow(deltax, 2) + Math.pow(deltay, 2));
    const velx = deltax * this.constant.bulletSpeed / dist;
    const vely = deltay * this.constant.bulletSpeed / dist;
    const bullet = new Bullet(this.constant, cx, cy, this.constant.bulletRadius, velx / 2, vely / 2);
    return bullet;
  }
}
