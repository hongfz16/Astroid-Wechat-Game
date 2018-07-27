import Sprite from '../base/sprite.js';

export default class Life extends Sprite {
  constructor(constant, main, x = 0, y = 0, r = 1) {
    super(x, y, r);
    this.constant = constant;
    this.main = main;
  }

  drawtoCanvas(ctx, px, py) {
    // console.log(x+' '+y);
    // console.log(this.constant.heartStyle.radius / 16);
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
        const newCor = this.corTrans(arrx[i], arry[j], px, py,
          this.constant.gameCor.width, this.constant.gameCor.height,
          this.constant.canvas.width, this.constant.canvas.height);
        this.drawHeart(ctx, newCor.x, newCor.y, this.constant.heartStyle.radius / 16);
      }
    }
    // let newCor = this.corTrans(this.getX(), this.getY(), x, y, this.constant.gameCor.width, this.constant.gameCor.height, this.constant.canvas.width, this.constant.canvas.height);
    // this.drawHeart(ctx, newCor.x, newCor.y, this.constant.heartStyle.radius/16*0.8);
  }

  drawHeart(ctx, x, y, k) {
    const x_ = [];
    const y_ = [];
    for (let i = 0; i < 15; i += 1) {
      const t = i * 2 * Math.PI / 15;
      x_.push(k * 16 * Math.pow(Math.sin(t), 3) + x);
      y_.push(-k * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) + y);
      // console.log((x_[i] - x)+' '+(y_[i] - y));
    }

    // console.log(this.constant.heartStyle.lineWidth);
    // console.log(this.constant.heartStyle.fillStyle);
    // console.log(this.constant.heartStyle.strokeStyle);
    ctx.beginPath();
    ctx.moveTo(x_[0], y_[0]);
    for (let i = 1; i < 15; i += 1) {
      ctx.lineTo(x_[i], y_[i]);
    }
    ctx.closePath();
    ctx.strokeStyle = this.constant.heartStyle.strokeStyle;
    ctx.lineWidth = this.constant.heartStyle.lineWidth;
    ctx.fillStyle = this.constant.heartStyle.fillStyle;
    ctx.fill();
    // ctx.stroke();
  }
}
