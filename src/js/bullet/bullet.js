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
    ctx.strokeStyle = this.constant.bulletStyle.strokeColor;
    ctx.lineWidth = this.constant.bulletStyle.strokeSize;
    let x = this.getX();
    let y = this.getY();
    let arrx = [x, x - this.constant.gameCor.width, x + this.constant.gameCor.width];
    let arry = [y, y - this.constant.gameCor.height, y + this.constant.gameCor.height];
    let flag = false;
    for(let i = 0; i < 3; i += 1) {
      for(let j = 0; j < 3; j += 1) {
        ctx.beginPath();
        let newCor = this.corTrans(arrx[i], arry[j], px, py, this.constant.gameCor.width, this.constant.gameCor.height, this.constant.canvas.width, this.constant.canvas.height);
        ctx.arc(newCor.x, newCor.y, this.getRadius(), 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        if(!(newCor.x < 0 || newCor.x > canvas.width || newCor.y < 0 || newCor.y > canvas.height)) {
          flag = true;
        }
      }
    }
    if (flag === false) {
      this.life = 0;
    }
    // console.log(this.getX(), this.getY());
    // console.log(newCor);
    // console.log(px,py);
    // console.log(canvas.width, canvas.height);
  }
}