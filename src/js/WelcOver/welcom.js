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
        let x = e.touches[0].clientX * this.main.constant.dpr;
        let y = e.touches[0].clientY * this.main.constant.dpr;
        if (this.checkinStart(x, y)) {
          setTimeout(this.main.start.bind(this.main), 100);
          this.hasTouched = true;
        } else
        if (this.checkinLeader(x, y)) {
          //showLeaderBoard
          setTimeout(this.main.showLeaderBoard.bind(this.main), 100);
          this.hasTouched = true;
        } else
        if (this.checkinSurvivalStart(x, y)) {
          setTimeout(this.main.survivalstart.bind(this.main), 100);
          this.hasTouched = true;
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
                  this.canvas.height/6,
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
    this.drawRoundRect(this.main.constant.survivalButton.x0,
                       this.main.constant.survivalButton.y0,
                       this.main.constant.survivalButton.x1,
                       this.main.constant.survivalButton.y1,
                       this.main.constant.survivalButton.r,
                       ctx);
    this.drawRoundRect(this.main.constant.stageButton.x0,
                       this.main.constant.stageButton.y0,
                       this.main.constant.stageButton.x1,
                       this.main.constant.stageButton.y1,
                       this.main.constant.stageButton.r,
                       ctx);
    this.drawText("Adventure",
                  (this.main.constant.startButton.x0 + this.main.constant.startButton.x1) / 2,
                  (this.main.constant.startButton.y0 + this.main.constant.startButton.y1) / 2,
                  this.main.constant.startButton.textColor,
                  this.main.constant.startButton.textAlign,
                  this.main.constant.startButton.textBaseline,
                  this.main.constant.startButton.textFont,
                  ctx);
    this.drawText("Survival",
                  (this.main.constant.survivalButton.x0 + this.main.constant.survivalButton.x1) / 2,
                  (this.main.constant.survivalButton.y0 + this.main.constant.survivalButton.y1) / 2,
                  this.main.constant.survivalButton.textColor,
                  this.main.constant.survivalButton.textAlign,
                  this.main.constant.survivalButton.textBaseline,
                  this.main.constant.survivalButton.textFont,
                  ctx);
    this.drawText("Leader Board",
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
    //ctx['font-family'] = 'A.C.M.E.Secret Agent';
    ctx.fillText(data, x, y);
  }

  checkinStart(x, y) {
    return x >= this.main.constant.startButton.x0 &&
      x <= this.main.constant.startButton.x1 &&
      y >= this.main.constant.startButton.y0 &&
      y <= this.main.constant.startButton.y1;
  }

  checkinSurvivalStart(x, y) {
    return x >= this.main.constant.survivalButton.x0 &&
      x <= this.main.constant.survivalButton.x1 &&
      y >= this.main.constant.survivalButton.y0 &&
      y <= this.main.constant.survivalButton.y1;
  }

  checkinLeader(x, y) {
    return x >= this.main.constant.stageButton.x0 &&
      x <= this.main.constant.stageButton.x1 &&
      y >= this.main.constant.stageButton.y0 &&
      y <= this.main.constant.stageButton.y1;
  }
}