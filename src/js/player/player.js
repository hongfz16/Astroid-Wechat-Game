import Sprite from "../base/sprite";
import Constant from "../constant/constant.js"
// import this.constant.bulletRadius from "../constant/constant.js";
// import bulletSpeed from "../constant/constant.js"
// import this.constant.turnAngle from "../constant/constant.js"
// import this.constant.gameCor from "../constant/constant.js"
// import this.constant.playerStyle from "../constant/constant.js"
import { Point, Circle, Vector2d } from "../base/geometry.js"

export default class Player extends Sprite{
  constructor(constant, x = 0, y = 0, r = 5, angle = 0, life = 1){
    super(x, y, r);
    this.acc = new Vector2d();
    this.angle = angle;
    this.angleDelta = 0;
    this.immortalCount = 120;
    this.life = life;
    this.isboosting = false;
    this.constant = constant;
  }

  drawtoCanvas(ctx){
    if (this.immortalCount === 0 || (this.immortalCount%30)<20){
      let cor = getCor();
      ctx.strokeStyle = this.constant.playerStyle.strokeColor;
      ctx.lineWidth = this.constant.playerStyle.strokeSize;
      ctx.beingPath();
      ctx.moveTo(cor.p[5].x, cor.p[5].y);
      ctx.lineTo(cor.p[2].x, cor.p[2].y);
      ctx.lineTo(cor.p[6].x, cor.p[6].y);
      ctx.moveTo(cor.p[3].x, cor.p[3].y);
      ctx.lineTo(cor.p[4].x, cor.p[4].y);
      if (this.isboosting){
        ctx.moveTo(cor.p[8].x, cor.p[8].y);
        ctx.lineTo(cor.p[7].x, cor.p[7].y);
        ctx.lineTo(cor.p[9].x, cor.p[9].y);
      }
      ctx.stroke();
    }

  }

  getCor(){
    let ret = new Object();
    ret.r0 = this.circle.radius;
    ret.r1 = ret.r0 * (1 - Math.sin(this.constant.playerStyle.theta)) / (1 + Math.sin(this.constant.playerStyle.theta));
    ret.x0 = 0;
    ret.y0 = 0;
    ret.x1 = ret.r0+ret.r1;
    ret.y1 = 0;
    ret.x2 = r0/(Math.sin(this.constant.playerStyle.theta));
    ret.y2 = 0;
    ret.x3 = -ret.r0;
    ret.y3 = (ret.x2+ret.r0)*Math.tan(this.constant.playerStyle.theta);
    ret.x4 = ret.x3;
    ret.y4 = -ret.y3;
    ret.x5 = ret.x3-ret.r1*Math.cos(this.constant.playerStyle.theta);
    ret.y5 = ret.y3-ret.r1*Math.sin(this.constant.playerStyle.theta);
    ret.x6 = ret.x5;
    ret.y6 = -ret.y5;
    ret.x7 = ret.x5;
    ret.y7 = 0;
    ret.x8 = ret.x3;
    ret.y8 = (ret.x3-ret.x7)*Math.tan(palyerStyle.theta);
    ret.x9 = ret.x3;
    ret.x9 = -ret.y8;
    ret.p = [];
    ret.p.push(new Point(ret.x0, ret.y0));
    ret.p.push(new Point(ret.x1, ret.y1));
    ret.p.push(new Point(ret.x2, ret.y2));
    ret.p.push(new Point(ret.x3, ret.y3));
    ret.p.push(new Point(ret.x4, ret.y4));
    ret.p.push(new Point(ret.x5, ret.y5));
    ret.p.push(new Point(ret.x6, ret.y6));
    ret.p.push(new Point(ret.x7, ret.y7));
    ret.p.push(new Point(ret.x8, ret.y8));
    ret.p.push(new Point(ret.x9, ret.y9));
    for (let i = 0; i < ret.p.length; ++i){
      ret.p[i].rotate(this.angle);
      ret.p[i].add(this.getX(), this.getY());
    }
  }


  shoot(){
    let bullet_vel = new Velocity();
    bullet_vel.x = Math.cos(this.angle);
    bullet_vel.y = Math.sin(this.angle);
    bullet_vel.normalize(this.constant.bulletSpeed);
    const b = new Bullet(this.getX(), this.getY(), this.constant.bulletRadius, bullet_vel.x, bullet_vel.y);
    return b;
  }

  update(){
    if (this.immortalCount > 0)
      this.immortalCount -= 1;
    this.setPosition(this.getX()+this.vel.x,
                     this.getY()+this.vel.y);
    this.setVelocity((this.vel.x+this.acc.x)*0.9, (this.vel.y+this.acc.y)*0.9);
    this.isboosting  = (this.acc.x !== 0 || this.acc.y !== 0);
    this.setAcceleration(0, 0);
    
    //this.vel.rotate(this.angle);
    this.angle += this.angleDelta;
    this.angleDelta = 0;
  }
  
  setAcceleration(x, y){
    this.acc.x = x;
    this.acc.y = y;
  }

  turnleft(){
    this.angleDelta = this.constant.turnAngle; 
  }

  turnright(){
    this.angleDelta = this.constant.turnAngle;
  }

  accelerate(){
    setAcceleration(Math.cos(this.angle), Math.sin(this.angle));
    //this.acc.x = Math.cos(this.angle);
    //this.acc.y = Math.sin(this.angle);
    //this.acc.normalize();
  }

  loseonelife(){
    this.life -= 1;
    this.circle = new Circle(this.constant.gameCor.width / 2, this.constant.gameCor.height / 2, this.constant.playerStyle.r0);
  }
}