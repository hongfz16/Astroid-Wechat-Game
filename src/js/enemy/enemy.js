import Sprite from '../base/sprite';
// import gameCor from '../constant/constant';
// import enemySize from '../constant/constant';
import Bullet from '../bullet/bullet';
import {Point, Vector2d} from '../base/geometry';
// import enemyShootFrame from '../constant/constant';
// import enemyStyle from '../constant/constant';
// import bulletSpeed from '../constant/constant';
// import bulletRadius from '../constant/constant';

export default class Enemy extends Sprite {
  constructor(constant, x = 0, y = 0, type = 'large') {
    let size = constant.enemySize[type];
    super(x, y, size);
    this.shootTimer = constant.enemyShootFrame;
    this.constant = constant;
    this.setVel();
    this.velTimer = Math.random() * this.constant.enemyVelTimer;
  }

  setVel() {
    this.targetPoint = new Point(Math.random() * this.constant.gameCor.width, Math.random() * this.constant.gameCor.height);
    let deltax = this.targetPoint.x - this.getX();
    let deltay = this.targetPoint.y - this.getY();
    let dist = Math.sqrt(Math.pow(deltax, 2) + Math.pow(deltay, 2));
    this.vel.x = this.constant.enemySpeed * deltax / dist;
    this.vel.y = this.constant.enemySpeed * deltay / dist;
    this.velTimer = Math.random() * this.constant.enemyVelTimer;
  }

  update() {
    this.circle.center.x += this.vel.x;
    this.circle.center.y += this.vel.y;
    this.circle.center.x += this.constant.gameCor.width;
    this.circle.center.y += this.constant.gameCor.height;
    this.circle.center.x %= this.constant.gameCor.width;
    this.circle.center.y %= this.constant.gameCor.height;
    if(this.shootTimer > 0) {
      this.shootTimer -= 1;
    }
    if(this.velTimer > 0) {
      this.velTimer -= 1;
    }
    else {
      this.setVel();
    }
  }

  resetShootTimer() {
    this.shootTimer = this.constant.enemyShootFrame;
  }

  drawEnemy(ctx, x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x - 2 * r, y + r);
    ctx.arc(x, y + r, 2 * r, Math.PI, Math.PI * 2);
    ctx.closePath();
    ctx.strokeStyle = this.constant.enemyStyle.strokeColor;
    ctx.lineWidth = this.constant.enemyStyle.strokeSize;
    ctx.stroke();
  }

  drawtoCanvas(ctx) {
    let x = this.getX();
    let y = this.getY();
    let r = this.getRadius();
    if (x >= r && x <= this.constant.gameCor.width - r && y >= r && y <= this.constant.gameCor.height - r) {
      this.drawEnemy(ctx, x, y, r);
      return;
    }
    let x2 = x + this.constant.gameCor.width;
    let y2 = y + this.constant.gameCor.height;
    let x3 = x - this.constant.gameCor.width;
    let y3 = y - this.constant.gameCor.height;
    this.drawEnemy(ctx, x, y, r);
    this.drawEnemy(ctx, x, y2, r);
    this.drawEnemy(ctx, x, y3, r);
    this.drawEnemy(ctx, x2, y, r);
    this.drawEnemy(ctx, x2, y2, r);
    this.drawEnemy(ctx, x2, y3, r);
    this.drawEnemy(ctx, x3, y, r);
    this.drawEnemy(ctx, x3, y2, r);
    this.drawEnemy(ctx, x3, y3, r);
  }

  shoot(x, y) {
    x = Math.random() * this.constant.gameCor.width;
    y = Math.random() * this.constant.gameCor.height;
    this.resetShootTimer();
    let cx = this.getX();
    let cy = this.getY();
    let deltax = x - cx;
    let deltay = y - cy;
    let dist = Math.sqrt(Math.pow(deltax, 2) + Math.pow(deltay, 2));
    let velx = deltax * this.constant.bulletSpeed / dist;
    let vely = deltay * this.constant.bulletSpeed / dist;
    let bullet = new Bullet(this.constant, cx, cy, this.constant.bulletRadius, velx, vely);
    return bullet;
  }
}