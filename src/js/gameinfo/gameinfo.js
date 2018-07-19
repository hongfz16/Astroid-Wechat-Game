import Main from '../main'

export default class gameInfo{
  constructor(constant, mainclass, mode='adventure'){
    this.main = mainclass;
    this.mode = mode;
    if (this.mode === 'adventure') {
      this.score = 0;
    } else
    if (this.mode === 'survival') {
      this.startTime = new Date();
    }
    this.constant = constant;
    this.handlex = this.constant.handle2dStyle.x;
    this.handley = this.constant.handle2dStyle.y;
    this.initEvent();
    this.accFlag = {isTouched: false, id: -1};
    this.shootFlag = {isTouched: false, id: -1};
    this.slideFlag = {isTouched: false, id: -1};
  }

  scorepp(){
    if (this.mode === 'adventure'){
      this.score += 1;
    }
    else
      console.log("wrong score++");
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

  drawTime(ctx, x, y) {
    ctx.fillStyle = this.constant.scoreStyle.color;
    ctx.font = this.constant.scoreStyle.font;
    ctx.textAlign = this.constant.scoreStyle.textAlign;
    ctx.textBaseline = this.constant.scoreStyle.textBaseline;
    let now = new Date();
    ctx.fillText(`Survive: ${((now-this.startTime)/1000).toFixed(1)}s`, x, y);
  }

  drawLife(ctx, x, y){
    ctx.fillStyle = this.constant.lifeStyle.color;
    ctx.font = this.constant.lifeStyle.font;
    ctx.textAlign = this.constant.lifeStyle.textAlign;
    ctx.textBaseline = this.constant.lifeStyle.textBaseline;
    ctx.fillText(`Life: ${this.main.player.life}`, x, y);
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

  drawHandle2d(ctx, circlex, circley, handlex, handley, circleR, handleR) {
    ctx.beginPath();
    ctx.fillStyle = this.constant.handle2dStyle.backcolor;
    ctx.arc(circlex, circley, circleR, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = this.constant.handle2dStyle.frontcolor;
    ctx.arc(handlex, handley, handleR, 0, Math.PI * 2);
    ctx.fill();
  }

  drawAcc(ctx, x, y, r) {
    this.drawCircle(ctx, x, y, r);
    ctx.beginPath();
    ctx.moveTo(x + this.constant.accButtonDesign[0][0], y + this.constant.accButtonDesign[0][1]);
    for (let i = 1; i < this.constant.accButtonDesign.length; i += 1) {
      ctx.lineTo(x + this.constant.accButtonDesign[i][0], y + this.constant.accButtonDesign[i][1]);
    }
    ctx.closePath();
    ctx.strokeStyle = this.constant.buttonStyle.strokeColor;
    ctx.lineWidth = this.constant.buttonStyle.strokeSize;
    ctx.stroke();
  }

  drawShoot(ctx, x, y, r) {
    this.drawCircle(ctx, x, y, r);
    if (this.mode === 'adventure' && this.main.shootCount !== 0) {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 100)';
      ctx.moveTo(x, y);
      ctx.arc(x, y, r, Math.PI * 2 * (30 - this.main.shootCount) / 30 - Math.PI / 2, Math.PI * 3 / 2);
      ctx.closePath();
      ctx.fill();
    } else
    if (this.mode === 'survival') {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 100)';
      ctx.moveTo(x, y);
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    ctx.beginPath();
    let rr = this.constant.shootButtonDesign.r;
    let R = this.constant.shootButtonDesign.R;
    ctx.moveTo(x - R, y);
    ctx.lineTo(x + R, y);
    ctx.moveTo(x, y - R);
    ctx.lineTo(x, y + R);
    ctx.moveTo(x + rr, y);
    ctx.arc(x, y, rr, 0, Math.PI * 2);
    ctx.strokeStyle = this.constant.buttonStyle.strokeColor;
    ctx.lineWidth = this.constant.buttonStyle.strokeSize;
    ctx.stroke();
  }

  drawtoCanvas(ctx){
    // this.drawTri(ctx, this.constant.leftButtonPos.x, this.constant.leftButtonPos.y, this.constant.leftButtonPos.r, Math.PI / 3);
    // this.drawTri(ctx, this.constant.rightButtonPos.x, this.constant.rightButtonPos.y, this.constant.rightButtonPos.r, 0);
    // this.drawSlideHandle(ctx, this.slideHandleCenterX, this.slideHandleCenterY, this.constant.slideHandlePos.centerx, this.constant.slideHandlePos.centery, this.constant.slideHandlePos.r, this.constant.slideHandlePos.width);
    this.drawHandle2d(ctx, this.constant.handle2dStyle.x, this.constant.handle2dStyle.y, this.handlex, this.handley, this.constant.handle2dStyle.circleR, this.constant.handle2dStyle.handleR);
    this.drawAcc(ctx, this.constant.accButtonPos.x, this.constant.accButtonPos.y, this.constant.accButtonPos.r);
    this.drawShoot(ctx, this.constant.shootButtonPos.x, this.constant.shootButtonPos.y, this.constant.shootButtonPos.r);
    if (this.mode === 'adventure') {
      this.drawScore(ctx, this.constant.scorePos.x, this.constant.scorePos.y);
    } else
    if (this.mode === 'survival') {
      this.drawTime(ctx, this.constant.scorePos.x, this.constant.scorePos.y);
    }
    this.drawLife(ctx, this.constant.lifePos.x, this.constant.lifePos.y);
  }

  initEvent(){
    this.constant.canvas.addEventListener("touchstart",((e)=>{
      e.preventDefault();

      this.main.clickShoot = false;
      this.main.clickAcc = false;
      for (let i = 0; i < e.touches.length; ++i){
        let x = e.touches[i].clientX * this.constant.dpr;
        let y = e.touches[i].clientY * this.constant.dpr;
        if (this.checkinShoot(x, y)) {
          if (this.mode === 'adventure') {
            this.main.clickShoot = true;
            this.shootFlag.isTouched = true;
            this.shootFlag.id = e.touches[i].identifier;
          }
        }
        else if (this.checkinAcc(x, y)){
          this.main.clickAcc = true;
          this.accFlag.isTouched = true;
          this.accFlag.id = e.touches[i].identifier;
        }
        else {
          // let handleRes = this.checkinHandle(x, y);
          // if(handleRes !== -2) {
          //   this.main.slideRatio = handleRes;
          //   this.slideFlag.isTouched = true;
          //   this.slideFlag.id = e.touches[i].identifier;
          //   this.slideHandleCenterX = this.constant.slideHandlePos.centerx + handleRes * (this.constant.slideHandlePos.width / 2);
          // }
          let handle2dInfo = this.checkinHandle2d(x, y);
          if(handle2dInfo.dist !== -1) {
            this.main.playerAngle = handle2dInfo.theta;
            this.slideFlag.isTouched = true;
            this.slideFlag.id = e.touches[i].identifier;
            this.handlex = handle2dInfo.x;
            this.handley = handle2dInfo.y;
          }
        }
      }
    }).bind(this));

    this.constant.canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault();
      for(let i = 0; i < e.changedTouches.length; i += 1) {
        let x = e.changedTouches[i].clientX * this.constant.dpr;
        let y = e.changedTouches[i].clientY * this.constant.dpr;
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
          // let handleRes = this.checkinHandle(x, y);
          // if(handleRes === -2) {
          //   let dist = Math.min(this.constant.slideHandlePos.width / 2, Math.abs(this.constant.slideHandlePos.centerx - x));
          //   this.main.slideRatio = dist / ((this.constant.slideHandlePos.width / 2) * ((x < this.constant.slideHandlePos.centerx) ? -1 : 1));
          //   this.slideHandleCenterX = this.constant.slideHandlePos.centerx + this.main.slideRatio * (this.constant.slideHandlePos.width / 2);
          // }
          // else {
          //   this.main.slideRatio = handleRes;
          //   this.slideHandleCenterX = this.constant.slideHandlePos.centerx + handleRes * (this.constant.slideHandlePos.width / 2);
          // }
          let handle2dInfo = this.checkinHandle2d(x, y);
          this.main.playerAngle = handle2dInfo.theta;
          this.handlex = handle2dInfo.x;
          this.handley = handle2dInfo.y;
          //console.log(handle2dInfo.theta);
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
        let x = e.changedTouches[i].clientX * this.constant.dpr;
        let y = e.changedTouches[i].clientY * this.constant.dpr;

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
          // this.main.slideRatio = 0;
          // this.slideFlag.isTouched = false;
          // this.slideFlag.id = -1;
          // this.slideHandleCenterX = this.constant.slideHandlePos.centerx;
          this.slideFlag.isTouched = false;
          this.slideFlag.id = -1;
          this.handlex = this.constant.handle2dStyle.x;
          this.handley = this.constant.handle2dStyle.y;
        }
      }
    }).bind(this));
  }
  
  checkinHandle2d(x, y) {
    let cx = this.constant.handle2dStyle.x;
    let cy = this.constant.handle2dStyle.y;
    let circleR = this.constant.handle2dStyle.circleR;
    let handleR = this.constant.handle2dStyle.handleR;
    let dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
    let deltax = x - cx;
    let deltay = y - cy;
    let theta = Math.atan2(deltay, deltax);
    let margin = this.constant.handle2dStyle.margin;
    if(dist <= circleR - margin) {
      return {dist: dist, theta: theta, x: x, y: y};
    }
    else if (dist >= circleR - margin && dist <= circleR) {
      let tx = cx + deltax * (circleR - margin) / dist;
      let ty = cy + deltay * (circleR - margin) / dist;
      return {dist: circleR - margin, theta: theta, x: tx, y: ty};
    }
    else {
      let tx = cx + deltax * (circleR - margin) / dist;
      let ty = cy + deltay * (circleR - margin) / dist;
      return {dist: -1, theta: theta, x: tx, y: ty};
    }
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