import Constant from "../constant/constant"
import Main from "../main"

export default class Welcome{
  constructor(main){
    this.canvas = main.canvas;
    this.ctx = main.ctx;
    this.main = main;
    this.hasTouched = false;
    this.initEvent();
  }

  initEvent(){
    this.main.canvas.addEventListener("touchstart", ((e) => {
      e.preventDefault();
      if (this.hasTouched === false){
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        if (this.checkinStart(x, y)){
          setTimeout(this.main.start.bind(this.main), 100);
          this.hasTouched = true;
        }
        if (this.checkinScore(x, y)){
          //this.hasTouched = true;
        }
      }
    }).bind(this));
  }

  drawtoCanvas(){
    let ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //this.drawBackground(ctx);
    this.drawText("Astroid",
                  this.canvas.width/2,
                  this.canvas.height/4,
                  this.main.constant.welcomeTitle.textColor,
                  this.main.constant.welcomeTitle.textAlign,
                  this.main.constant.welcomeTitle.textBaseline,
                  this.main.constant.welcomeTitle.textFont,
                  ctx);
    this.drawRoundRect(this.main.constant.startButton.x0,
                       this.main.constant.startButton.y0,
                       this.main.constant.startButton.x1,
                       this.main.constant.startButton.y1,
                       this.main.constant.startButton.r,
                       ctx);
    this.drawRoundRect(this.main.constant.stageButton.x0,
                       this.main.constant.stageButton.y0,
                       this.main.constant.stageButton.x1,
                       this.main.constant.stageButton.y1,
                       this.main.constant.stageButton.r,
                       ctx);
    this.drawText("Start",
                  (this.main.constant.startButton.x0 + this.main.constant.startButton.x1) / 2,
                  (this.main.constant.startButton.y0 + this.main.constant.startButton.y1) / 2,
                  this.main.constant.startButton.textColor,
                  this.main.constant.startButton.textAlign,
                  this.main.constant.startButton.textBaseline,
                  this.main.constant.startButton.textFont,
                  ctx);
    this.drawText("Score Board",
                  (this.main.constant.stageButton.x0 + this.main.constant.stageButton.x1) / 2,
                  (this.main.constant.stageButton.y0 + this.main.constant.stageButton.y1) / 2,
                  this.main.constant.stageButton.textColor,
                  this.main.constant.stageButton.textAlign,
                  this.main.constant.stageButton.textBaseline,
                  this.main.constant.stageButton.textFont,
                  ctx);
  }

  drawBackground(ctx){
    ctx.fillstyle = this.main.constant.gameStyle.background;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawRoundRect(x0, y0, x1, y1, r, ctx){
    ctx.strokeStyle = this.main.constant.startButton.strokeColor;
    ctx.lineWidth = this.main.constant.startButton.strokeSize;
    ctx.beginPath();
    ctx.moveTo(x0+r, y0);
    ctx.arcTo(x1, y0, x1, y1, r);
    ctx.arcTo(x1, y1, x0, y1, r);
    ctx.arcTo(x0, y1, x0, y0, r);
    ctx.arcTo(x0, y0, x0+r, y0, r);
    ctx.stroke();
  }

  drawText(data, x, y, textColor, textAlign, textBaseline, textFont, ctx){
    ctx.fillStyle = textColor;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = textFont;
    ctx.fillText(data, x, y);
  }

  checkinStart(x, y){
    return x >= this.main.constant.startButton.x0 &&
      x <= this.main.constant.startButton.x1 &&
      y >= this.main.constant.startButton.y0 &&
      y <= this.main.constant.startButton.y1;
  }

  checkinScore(x, y) {
    return x >= this.main.constant.stageButton.x0 &&
      x <= this.main.constant.stageButton.x1 &&
      y >= this.main.constant.stageButton.y0 &&
      y <= this.main.constant.stageButton.y1;
  }
}