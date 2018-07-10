import Sprite from '../base/sprite';
import gameCor from '../constant/constant';
import enemySize from '../constant/constant';
import Bullet from '../bullet/bullet.js';
import enemyShootFrame from '../constant/constant';
import enemyStyle from '../constant/constant';
import bulletSpeed from '../constant/constant';
import bulletRadius from '../constant/constant';

export class Enemy extends Sprite {
  constructor(x = 0, y = 0, type = 'large') {
    let size = enemySize[type];
    super(x, y, size);
    this.shootTimer = enemyShootFrame;
  }

  update() {
    this.circle.center.x += this.vel.x;
    this.circle.center.y += this.vel.y;
    this.circle.center.x %= gameCor.width;
    this.circle.center.y %= gameCor.height;
    if(this.shootTimer > 0) {
      this.shootTimer -= 1;
    }
  }

  resetShootTimer() {
    this.shootTimer = enemyShootFrame;
  }

  drawEnemy(ctx, x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x - 2 * r, y + r);
    ctx.arc(x, y + r, 2 * r, Math.PI, Math.PI * 2);
    ctx.closePath();
    ctx.strokeStyle = enemyStyle.strokeColor;
    ctx.lineWidth = enemyStyle.strokeSize;
    ctx.stroke();
  }

  drawtoCanvas(ctx) {
    let x = this.getX();
    let y = this.getY();
    let r = this.getRadius();
    if (x >= r && x <= canvas.width - r && y >= r && y <= canvas.height - r) {
      this.drawEnemy(ctx, x, y, r);
      return;
    }
    let x2 = x;
    let y2 = y;
    if (x < r) { x2 = x + canvas.width; }
    if (x > canvas.width - r) { x2 = x - canvas.width; }
    if (y < r) { y2 = y + canvas.height; }
    if (y > canvas.height - r) { y2 = y - canvas.height; }
    this.drawEnemy(ctx, x, y, r);
    this.drawEnemy(ctx, x2, y2, r);
  }

  shoot(x, y) {
    let cx = this.getX();
    let cy = this.getY();
    let deltax = x - cx;
    let deltay = y - cy;
    let dist = Math.sqrt(Math.pow(deltax, 2) + Math.sqrt(Math.pow(deltay, 2)));
    let velx = deltax * bulletSpeed / dist;
    let vely = deltay * bulletSpeed / dist;
    let bullet = new Bullet(cx, cy, bulletRadius, velx, vely);
    return bullet;
  }
}