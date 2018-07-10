import Main from '../main'
import leftButtonPos from '../constant/constant'
import rightButtonPos from '../constant/constant'
import accButtonPos from '../constant/constant'
import shootButtonPos from '../constant/constant'
import buttonStyle from '../constant/constant'


export class gameInfo{
  constructor(mainclass){
    this.main = mainclass;
    this.score = 0;
  }

  scorepp(){
    this.score += 1;
  }

  drawTri(ctx, x, y, r, theta) {
    let delta = Math.PI * 2 / 3;
    ctx.beginPath();
    ctx.moveTo(x + r * Math.cos(theta), y + r * Math.sin(theta));
    for(let i = 1; i < 3; i += 1) {
      ctx.lineTo(x + r * Math.cos(theta + i * delta), y + r * Math.sin(theta + i * delta));
    }
    ctx.closePath();
    ctx.strokeStyle = buttonStyle.strokeColor;
    ctx.lineWidth = buttonStyle.strokeSize;
    ctx.stroke();
  }

  drawCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = buttonStyle.strokeColor;
    ctx.lineWidth = buttonStyle.strokeSize;
    ctx.stroke();
  }

  drawtoCanvas(ctx){
    this.drawTri(ctx, leftButtonPos.x, leftButtonPos.y, leftButtonPos.r, Math.PI / 3);
    this.drawTri(ctx, rightButtonPos.x, rightButtonPos.y, rightButtonPos.r, 0);
    this.drawCircle(ctx, accButtonPos.x, accButtonPos.y, accButtonPos.r);
    this.drawCircle(ctx, shootButtonPos.x, shootButtonPos.y, shootButtonPos.r);
  }

  initEvent(){
    canvas.addEventListener("touchstart",((e)=>{
      e.preventDefault();
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;

      if (checkinLeft(x, y)){
        this.main.player.turnleft();
      } else
      if (checkinRight(x, y)){
        this.main.player.turnright();
      } else
      if (checkinShoot(x, y)){
        this.main.player.shoot();
      } else
      if (checkinAcc(x, y)){
        this.main.player.accelerate();
      }
    }).bind(this));
  }
  
  checkinCircle(x, y, cx, cy, r) {
    let dist = Math.pow(cx - x, 2) + Math.pow(cy - y, 2);
    return dist <= Math.pow(r, 2);
  }

  checkinLeft(x, y){
    return this.checkinCircle(x, y, leftButtonPos.x, leftButtonPos.y, leftButtonPos.r);
  }

  checkinRight(x, y){
    return this.checkinCircle(x, y, rightButtonPos.x, rightButtonPos.y, rightButtonPos.r);
  }

  checkinShoot(x, y){
    return this.checkinCircle(x, y, shootButtonPos.x, shootButtonPos.y, shootButtonPos.r);
  }

  checkinAcc(x, y){
    return this.checkinCircle(x, y, accButtonPos.x, accButtonPos.y, accButtonPos.r);
  }
}