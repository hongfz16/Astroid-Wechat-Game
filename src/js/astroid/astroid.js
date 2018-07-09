import Vector from '../base/geometry'
import Sprite from '../base/sprite';
import astroidSize from '../constant/constant';
import astroidSpeed from '../constant/constant';
import astroidStyle from '../constant/constant';

export class Astroid extends Sprite {
  constructor(x = 0, y = 0, velx = 0, vely = 0, type = 'large') {
    let size = astroidSize[type];
    if(size === undefined) {throw 'illegal parameter: type';}
    super(x, y, size);
    this.type = type;
    this.setVelocity(velx, vely);
  }

  update() {
    this.circle.center.x += this.vel.x;
    this.circle.center.y += this.vel.y;
  }

  splite() {
    let childList = [];
    let childstyle = '';
    if(this.type === 'small') return childlist;
    if(this.type === 'large') childstyle = 'medium';
    if(this.type === 'medium') childstyle = 'small';
    let child1 = new Astroid(this.getX(), this.getY());
    let child2 = new Astroid(this.getX(), this.getY());
  }

  drawtoCanvas(ctx) {
    let r = this.getRadius();
    let x = this.getX();
    let y = this.getY();
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    let theta = Math.PI / 6;
    let delta = Math.PI / 6;
    for(let i = 1; i < 12; i += 1) {
      ctx.lineTo(x + r * Math.cos(theta), y + r * Math.sin(theta));
      theta += delta;
    }
    ctx.closePath();
    ctx.strokeStyle = astroidStyle.strokeColor;
    ctx.lineWidth = astroidStyle.strokeSize;
    ctx.stroke();
  }
}