import Vector2d from '../base/geometry'
import Sprite from '../base/sprite';
// import astroidSize from '../constant/constant';
// import astroidSpeed from '../constant/constant';
// import astroidStyle from '../constant/constant';
// import astroidSplitAngle from '../constant/constant';
// import gameCor from '../constant/constant';

export default class Astroid extends Sprite {
  constructor(constant, x = 0, y = 0, velx = 0, vely = 0, type = 'large') {
    let size = constant.astroidSize[type];
    if(size === undefined) {throw 'illegal parameter: type';}
    super(x, y, size);
    this.type = type;
    this.setVelocity(velx, vely);
    this.constant = constant;
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
    let childList = [];
    let childstyle = '';
    let ratio = 1;
    if(this.type === 'small') return childList;
    if(this.type === 'large') {childstyle = 'medium'; ratio = this.constant.astroidSpeedRatio.medium;}
    if(this.type === 'medium') {childstyle = 'small'; ratio = this.constant.astroidSpeedRatio.small;}
    this.vel.rotate(this.constant.astroidSplitAngle);
    let child1 = new Astroid(this.constant, this.getX(), this.getY(), this.vel.x * ratio, this.vel.y * ratio, childstyle);
    this.vel.rotate(-2 * this.constant.astroidSplitAngle);
    let child2 = new Astroid(this.constant, this.getX(), this.getY(), this.vel.x * ratio, this.vel.y * ratio, childstyle);
    childList.push(child1);
    childList.push(child2);
    return childList;
  }

  drawAstroid(ctx, x, y, r) {
    ctx.beginPath();
    // ctx.moveTo(x + r, y);
    // let theta = Math.PI / 3;
    // let delta = Math.PI / 3;
    // for (let i = 1; i < 6; i += 1) {
    //   ctx.lineTo(x + r * Math.cos(theta), y + r * Math.sin(theta));
    //   theta += delta;
    // }
    // ctx.closePath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = this.constant.astroidStyle.strokeColor;
    ctx.lineWidth = this.constant.astroidStyle.strokeSize;
    ctx.stroke();
  }

  drawtoCanvas(ctx, px, py) {
    let r = this.getRadius();
    let x = this.getX();
    let y = this.getY();
    // if (x >= r && x <= this.constant.gameCor.width - r && y >= r && y <= this.constant.gameCor.height - r) {
    //   let newCor = this.corTrans(x, y, px, py, this.constant.gameCor.width, this.constant.gameCor.height, this.constant.canvas.width, this.constant.canvas.height);
    //   this.drawAstroid(ctx, newCor.x, newCor.y, r);
    //   return;
    // }
    let x2 = x + this.constant.gameCor.width;
    let y2 = y + this.constant.gameCor.height;
    let x3 = x - this.constant.gameCor.width;
    let y3 = y - this.constant.gameCor.height;
    let arrx = [x, x2, x3];
    let arry = [y, y2, y3];
    for(let i = 0; i < 3; i += 1) {
      for(let j = 0; j < 3; j += 1) {
        let newCor = this.corTrans(arrx[i], arry[j], px, py, this.constant.gameCor.width, this.constant.gameCor.height, this.constant.canvas.width, this.constant.canvas.height);
        this.drawAstroid(ctx, newCor.x, newCor.y, r);
      }
    }
    // this.drawAstroid(ctx, x, y, r);
    // this.drawAstroid(ctx, x2, y2, r);
    // this.drawAstroid(ctx, x, y2, r);
    // this.drawAstroid(ctx, x2, y, r);
    // this.drawAstroid(ctx, x3, y3, r);
    // this.drawAstroid(ctx, x, y3, r);
    // this.drawAstroid(ctx, x3, y, r);
    // this.drawAstroid(ctx, x2, y3, r);
    // this.drawAstroid(ctx, x3, y2, r);
  }
}