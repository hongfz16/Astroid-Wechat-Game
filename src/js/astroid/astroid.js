/**
 * Intro: Asteroid class derived from Sprite base class
 * Author: Hong Fangzhou
 * Email: hongfz16@163.com
 * Date: 2018.7.11
 */

import Vector2d from '../base/geometry';
import Sprite from '../base/sprite';

export default class Astroid extends Sprite {
  constructor(constant, x = 0, y = 0, velx = 0, vely = 0, type = 'large') {
    const size = constant.astroidSize[type];
    if (size === undefined) { throw 'illegal parameter: type'; }
    super(x, y, size);
    this.type = type;
    this.setVelocity(velx, vely);
    this.constant = constant;
    this.image = new Image();
    this.image.src = 'pics/astroid.png';
    this.rotateCounter = 0;
    this.rotateCounterLife = 1600 + Math.random() * 400;
    this.score = this.constant.astroidScore[this.type];
  }

  update() {
    this.circle.center.x += this.vel.x;
    this.circle.center.y += this.vel.y;
    this.circle.center.x += this.constant.gameCor.width;
    this.circle.center.y += this.constant.gameCor.height;
    this.circle.center.x %= this.constant.gameCor.width;
    this.circle.center.y %= this.constant.gameCor.height;
  }

  split() {
    const childList = [];
    let childstyle = '';
    let ratio = 1;
    if (this.type === 'small') return childList;
    if (this.type === 'large') { childstyle = 'medium'; ratio = this.constant.astroidSpeedRatio.medium; }
    if (this.type === 'medium') { childstyle = 'small'; ratio = this.constant.astroidSpeedRatio.small; }
    this.vel.rotate(this.constant.astroidSplitAngle);
    const child1 = new Astroid(this.constant, this.getX(), this.getY(), this.vel.x * ratio, this.vel.y * ratio, childstyle);
    this.vel.rotate(-2 * this.constant.astroidSplitAngle);
    const child2 = new Astroid(this.constant, this.getX(), this.getY(), this.vel.x * ratio, this.vel.y * ratio, childstyle);
    childList.push(child1);
    childList.push(child2);
    return childList;
  }

  drawAstroid(ctx, x, y, r) {
    this.rotateCounter += 1;
    this.rotateCounter %= this.rotateCounterLife;
    const theta = (this.rotateCounter / this.rotateCounterLife) * Math.PI * 2;
    ctx.translate(x, y);
    ctx.rotate(theta);
    ctx.drawImage(this.image, -r, -r, 2 * r, 2 * r);
    ctx.rotate(-theta);
    ctx.translate(-x, -y);
  }

  drawtoCanvas(ctx, px, py) {
    const r = this.getRadius();
    const x = this.getX();
    const y = this.getY();
    const x2 = x + this.constant.gameCor.width;
    const y2 = y + this.constant.gameCor.height;
    const x3 = x - this.constant.gameCor.width;
    const y3 = y - this.constant.gameCor.height;
    const arrx = [x, x2, x3];
    const arry = [y, y2, y3];
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        const newCor = this.corTrans(arrx[i], arry[j], px, py, this.constant.gameCor.width, this.constant.gameCor.height, this.constant.canvas.width, this.constant.canvas.height);
        this.drawAstroid(ctx, newCor.x, newCor.y, r);
      }
    }
  }
}
