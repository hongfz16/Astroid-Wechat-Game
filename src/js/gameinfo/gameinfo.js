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
    this.slideHandleCenterX = this.constant.slideHandlePos.centerx;
    this.slideHandleCenterY = this.constant.slideHandlePos.centery;
    this.initEvent();
    this.accFlag = {isTouched: false, id: -1};
    this.shootFlag = {isTouched: false, id: -1};
    this.slideFlag = {isTouched: false, id: -1};
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

  drawSlideHandle(ctx, circlex, circley, handlex, handley, r, handlewidth) {
    ctx.beginPath();
    ctx.moveTo(handlex - 0.5 * handlewidth, handley - r);
    ctx.lineTo(handlex + 0.5 * handlewidth, handley - r);
    ctx.arc(handlex + 0.5 * handlewidth, handley, r, - Math.PI / 2, Math.PI / 2);
    ctx.lineTo(handlex + 0.5 * handlewidth, handley + r);
    ctx.arc(handlex - 0.5 * handlewidth, handley, r, Math.PI / 2, Math.PI * 3 / 2);
    ctx.fillStyle = this.constant.slideHandleStyle.backcolor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(circlex, circley, r * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = this.constant.slideHandleStyle.frontcolor;
    ctx.fill();
  }

  drawtoCanvas(ctx){
    // this.drawTri(ctx, this.constant.leftButtonPos.x, this.constant.leftButtonPos.y, this.constant.leftButtonPos.r, Math.PI / 3);
    // this.drawTri(ctx, this.constant.rightButtonPos.x, this.constant.rightButtonPos.y, this.constant.rightButtonPos.r, 0);
    this.drawSlideHandle(ctx, this.slideHandleCenterX, this.slideHandleCenterY, this.constant.slideHandlePos.centerx, this.constant.slideHandlePos.centery, this.constant.slideHandlePos.r, this.constant.slideHandlePos.width);
    this.drawCircle(ctx, this.constant.accButtonPos.x, this.constant.accButtonPos.y, this.constant.accButtonPos.r);
    this.drawCircle(ctx, this.constant.shootButtonPos.x, this.constant.shootButtonPos.y, this.constant.shootButtonPos.r);
    this.drawScore(ctx, this.constant.scorePos.x, this.constant.scorePos.y);
  }

  initEvent(){
    this.constant.canvas.addEventListener("touchstart",((e)=>{
      e.preventDefault();
      // this.main.clickLeft = false;
      // this.main.clickRight = false;
      this.main.clickShoot = false;
      this.main.clickAcc = false;
      for (let i = 0; i < e.touches.length; ++i){
        let x = e.touches[i].clientX;
        let y = e.touches[i].clientY;
      // if (this.checkinLeft(x, y)){
      //   //this.main.player.turnleft();
      //   this.main.clickLeft = true;
      //   //console.log('Click Left button');
      // } else
      // if (this.checkinRight(x, y)){
      //   // this.main.player.turnright();
      //   this.main.clickRight = true;
      //   //console.log('Click Right button');
      // } else
        if (this.checkinShoot(x, y)){
          this.main.clickShoot = true;
          this.shootFlag.isTouched = true;
          this.shootFlag.id = e.touches[i].identifier;
        }
        else if (this.checkinAcc(x, y)){
          this.main.clickAcc = true;
          this.accFlag.isTouched = true;
          this.accFlag.id = e.touches[i].identifier;
        }
        else {
          let handleRes = this.checkinHandle(x, y);
          if(handleRes !== -2) {
            this.main.slideRatio = handleRes;
            this.slideFlag.isTouched = true;
            this.slideFlag.id = e.touches[i].identifier;
            this.slideHandleCenterX = this.constant.slideHandlePos.centerx + handleRes * (this.constant.slideHandlePos.width / 2);
          }
        }
      }
    }).bind(this));

    this.constant.canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault();
      for(let i = 0; i < e.changedTouches.length; i += 1) {
        let x = e.changedTouches[i].clientX;
        let y = e.changedTouches[i].clientY;
        let id = e.changedTouches[i].identifier;
        if(id === this.shootFlag.id) {
          if(!(this.checkinShoot(x, y))) {
            this.main.clickShoot = false;
            this.shootFlag.isTouched = false;
            this.shootFlag.id = -1;
          }
        }
        else if(id === this.accFlag.id) {
          if(!(this.checkinAcc(x, y))) {
            this.main.clickAcc = false;
            this.accFlag.isTouched = false;
            this.accFlag.id = -1;
          }
        }
        else if(id === this.slideFlag.id) {
          let handleRes = this.checkinHandle(x, y);
          if(handleRes === -2) {
            let dist = Math.min(this.constant.slideHandlePos.width / 2, Math.abs(this.constant.slideHandlePos.centerx - x));
            this.main.slideRatio = dist / ((this.constant.slideHandlePos.width / 2) * ((x < this.constant.slideHandlePos.centerx) ? -1 : 1));
            this.slideHandleCenterX = this.constant.slideHandlePos.centerx + this.main.slideRatio * (this.constant.slideHandlePos.width / 2);
            // this.main.slideRatio = 0;
            // this.slideFlag.isTouched = false;
            // this.slideFlag.id = -1;
            // this.slideHandleCenterX = this.constant.slideHandlePos.centerx;
          }
          else {
            this.main.slideRatio = handleRes;
            this.slideHandleCenterX = this.constant.slideHandlePos.centerx + handleRes * (this.constant.slideHandlePos.width / 2);
          }
        }
      }
    }).bind(this));

    this.constant.canvas.addEventListener("touchend", ((e)=>{
      e.preventDefault();
      //this.main.clickLeft = false;
      //this.main.clickRight = false;
      //this.main.clickShoot = false;
      //this.main.clickAcc = false;
      for (let i = 0; i < e.changedTouches.length; ++i) {
        let x = e.changedTouches[i].clientX;
        let y = e.changedTouches[i].clientY;
        let id = e.changedTouches[i].identifier;
        // if (this.checkinLeft(x, y)) {
        //   this.main.clickLeft = false;
        //   //console.log('Click Left button');
        // } else
        //   if (this.checkinRight(x, y)) {
        //     this.main.clickRight = false;
        //     //console.log('Click Right button');
        //   } else
        if (id === this.shootFlag.id) {
          this.main.clickShoot = false;
          this.shootFlag.isTouched = false;
          this.shootFlag.id = -1;
          //console.log('Click Shoot button');
        }
        else if (id === this.accFlag.id) {
            this.main.clickAcc = false;
            this.accFlag.isTouched = false;
            this.accFlag.id = -1;
            //console.log('Click Acc button');
        }
        else if (id === this.slideFlag.id) {
          this.main.slideRatio = 0;
          this.slideFlag.isTouched = false;
          this.slideFlag.id = -1;
          this.slideHandleCenterX = this.constant.slideHandlePos.centerx;
        }
      }
    }).bind(this));
  }
  
  checkinHandle(x, y) {
    let cx = this.constant.slideHandlePos.centerx;
    let cy = this.constant.slideHandlePos.centery;
    let width = this.constant.slideHandlePos.width;
    let r = this.constant.slideHandlePos.r;
    if(x <= cx + width / 2 && x >= cx - width / 2 && y <= cy + r && y >= cy - r) {
      return (x - cx) / (width / 2);
    }
    if(this.checkinCircle(x, y, cx - width / 2, cy, r) || this.checkinCircle(x, y, cx + width / 2, cy, r)) {
      return (x < cx) ? -1 : 1;
    }
    return -2;
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