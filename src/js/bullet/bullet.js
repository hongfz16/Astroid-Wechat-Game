import Sprite from '../base/sprite';
// import bulletStyle from '../constant/constant'
// import bulletLife from '../constant/constant'
// import gameCor from '../constant/constant'

export default class Bullet extends Sprite {
  constructor(constant, x = 0, y = 0, r = 0, velx = 0, vely = 0) {
    super(x, y, r);
    this.setVelocity(velx, vely);
    this.constant = constant;
    this.life = this.constant.bulletLife;
  }

  update() {
    this.circle.center.x += this.vel.x;
    this.circle.center.y += this.vel.y;
    this.circle.center.x += this.constant.gameCor.width;
    this.circle.center.y += this.constant.gameCor.height;
    this.circle.center.x %= this.constant.gameCor.width;
    this.circle.center.y %= this.constant.gameCor.height;
    if(this.life > 0) {
      this.life -= 1;
    }
  }

  drawtoCanvas(ctx, px, py) {
    ctx.beginPath();
    ctx.strokeStyle = this.constant.bulletStyle.strokeColor;
    ctx.lineWidth = this.constant.bulletStyle.strokeSize;
    let newCor = this.corTrans(this.getX(), this.getY(), px, py, this.constant.gameCor.width, this.constant.gameCor.height, this.constant.canvas.width, this.constant.canvas.height);
    // console.log(this.getX(), this.getY());
    // console.log(newCor);
    // console.log(px,py);
    // console.log(canvas.width, canvas.height);
    ctx.arc(newCor.x, newCor.y, this.getRadius(), 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
}