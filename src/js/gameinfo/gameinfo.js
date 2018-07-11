import Main from '../main'
// import leftButtonPos from '../constant/constant'
// import rightButtonPos from '../constant/constant'
// import accButtonPos from '../constant/constant'
// import shootButtonPos from '../constant/constant'
// import buttonStyle from '../constant/constant'

export default class gameInfo{
  constructor(constant, mainclass){
    this.main = mainclass;
    this.score = 0;
    this.constant = constant;
    this.initEvent();
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
    ctx.strokeStyle = this.constant.buttonStyle.strokeColor;
    ctx.lineWidth = this.constant.buttonStyle.strokeSize;
    ctx.stroke();
  }

  drawCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = this.constant.buttonStyle.strokeColor;
    ctx.lineWidth = this.constant.buttonStyle.strokeSize;
    ctx.stroke();
  }

  drawScore(ctx, x, y) {
    ctx.fillStyle = this.constant.scoreStyle.color;
    ctx.font = this.constant.scoreStyle.font;
    ctx.textAlign = this.constant.scoreStyle.textAlign;
    ctx.textBaseline = this.constant.scoreStyle.textBaseline;
    ctx.fillText(`Score: ${this.score}`, x, y);
  }

  drawtoCanvas(ctx){
    this.drawTri(ctx, this.constant.leftButtonPos.x, this.constant.leftButtonPos.y, this.constant.leftButtonPos.r, Math.PI / 3);
    this.drawTri(ctx, this.constant.rightButtonPos.x, this.constant.rightButtonPos.y, this.constant.rightButtonPos.r, 0);
    this.drawCircle(ctx, this.constant.accButtonPos.x, this.constant.accButtonPos.y, this.constant.accButtonPos.r);
    this.drawCircle(ctx, this.constant.shootButtonPos.x, this.constant.shootButtonPos.y, this.constant.shootButtonPos.r);
    this.drawScore(ctx, this.constant.scorePos.x, this.constant.scorePos.y);
  }

  initEvent(){
    this.constant.canvas.addEventListener("touchstart",((e)=>{
      e.preventDefault();
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;

      if (this.checkinLeft(x, y)){
        //this.main.player.turnleft();
        this.main.clickLeft = true;
        console.log('Click Left button');
      } else
      if (this.checkinRight(x, y)){
        // this.main.player.turnright();
        this.main.clickRight = true;
        console.log('Click Right button');
      } else
      if (this.checkinShoot(x, y)){
        // this.main.player.shoot();
        this.main.clickShoot = true;
        console.log('Click Shoot button');
      } else
      if (this.checkinAcc(x, y)){
        // this.main.player.accelerate();
        this.main.clickAcc = true;
        console.log('Click Acc button');
      }
    }).bind(this));

    this.constant.canvas.addEventListener("touchend", ((e)=>{
      e.preventDefault();
      this.main.clickLeft = false;
      this.main.clickRight = false;
      this.main.clickShoot = false;
      this.main.clickAcc = false;
    }).bind(this));
  }
  
  checkinCircle(x, y, cx, cy, r) {
    let dist = Math.pow(cx - x, 2) + Math.pow(cy - y, 2);
    return dist <= Math.pow(r, 2);
  }

  checkinLeft(x, y){
    return this.checkinCircle(x, y, this.constant.leftButtonPos.x, this.constant.leftButtonPos.y, this.constant.leftButtonPos.r);
  }

  checkinRight(x, y){
    return this.checkinCircle(x, y, this.constant.rightButtonPos.x, this.constant.rightButtonPos.y, this.constant.rightButtonPos.r);
  }

  checkinShoot(x, y){
    return this.checkinCircle(x, y, this.constant.shootButtonPos.x, this.constant.shootButtonPos.y, this.constant.shootButtonPos.r);
  }

  checkinAcc(x, y){
    return this.checkinCircle(x, y, this.constant.accButtonPos.x, this.constant.accButtonPos.y, this.constant.accButtonPos.r);
  }
}