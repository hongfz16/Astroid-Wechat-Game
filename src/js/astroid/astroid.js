import Sprite from '../base/sprite';
import astroidSize from '../constant/constant';
import astroidSpeed from '../constant/constant';

export class Astroid extends Sprite {
  constructor(x = 0, y = 0, velx = 0, vely = 0, type = 'large') {
    let size = astroidSize[type];
    if(size === undefined) {throw 'illegal parameter: type';}
    super(x, y, size);
    this.setVelocity(velx, vely);
  }

  update() {
    this.circle.center.x += this.vel.x;
    this.circle.center.y += this.vel.y;
  }

  drawtoCanvas(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.circle)
  }
}