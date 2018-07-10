import Sprite from '../base/sprite';
import bulletStyle from '../constant/constant'
import bulletLife from '../constant/constant'
import gameCor from '../constant/constant'

export class Bullet extends Sprite {
  constructor(x = 0, y = 0, r = 0, velx = 0, vely = 0) {
    super(x, y, r);
    this.setVelocity(velx, vely);
    this.life = bulletLife;
  }

  update() {
    this.circle.center.x += this.vel.x;
    this.circle.center.y += this.vel.y;
    this.circle.center.x %= gameCor.width;
    this.circle.center.y %= gameCor.height;
    if(this.life > 0) {
      this.life -= 1;
    }
  }

  drawtoCanvas(ctx) {
    ctx.beginPath();
    ctx.arc(this.getX(), this.getY(), this.getRadius(), 0, 2 * Math.PI);
    ctx.strokeStyle = bulletStyle.strokeColor;
    ctx.lineWidth = bulletStyle.strokeSize;
    ctx.stroke();
  }
}