import Sprite from "../base/sprite.js"

export default class Life extends Sprite{
  constructor(constant, main, x = 0, y = 0, r = 1){
    super(x, y, r);
    this.constant = constant;
    this.main = main;
  }

  drawtoCanvas(ctx, x, y){
    //console.log(x+' '+y);
    this.drawHeart(ctx, this.getX()-x, this.getY()-y, this.constant.lifeStyle.radius/16);
  }

  drawHeart(ctx, x, y, k){
    let x_ = [];
    let y_ = [];
    for (let i = 0; i < 60; i += 1){
      let t = i * Math.PI / 60;
      x_.push(k * 16 * Math.pow(Math.sin(t), 3) + x);
      y_.push(k * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) + y);
    }

    ctx.lineWidth = this.constant.lifeStyle.lineWidth;
    ctx.fillStyle = this.constant.lifeStyle.fillStyle;
    ctx.strokeStyle = this.constant.lifeStyle.strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x_[0], y_[0]);
    for (let i = 1; i < 60; i += 1){
      ctx.lineTo(x_[i], y_[i]);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}