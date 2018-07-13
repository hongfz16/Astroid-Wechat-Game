import Constant from "../constant/constant"
import Main from "../main"

export default class Over {
  constructor(main) {
    this.canvas = main.canvas;
    this.ctx = main.ctx;
    this.main = main;
    this.hasTouched = false;
    this.score = main.gameInfo.score;
    this.initEvent();
  }

  initEvent(){
    this.main.canvas.addEventListener("touchstart", ((e) => {
      e.preventDefault();
      if (this.hasTouched === false) {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        if (this.checkinRestart(x, y)) {
          setTimeout(this.main.start.bind(this.main), 100);
          this.hasTouched = true;
        }
        if (this.checkinBack(x, y)) {
          setTimeout(this.main.welcome.bind(this.main), 100);
          this.hasTouched = true;
        }
      }
    }).bind(this));
  }

  drawtoCanvas(){
    let ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawText(`Score: ${this.score}`,
                  this.canvas.width / 2,
                  this.canvas.height / 4,
                  this.main.constant.overTitle.textColor,
                  this.main.constant.overTitle.textAlign,
                  this.main.constant.overTitle.textBaseline,
                  this.main.constant.overTitle.textFont,
                  ctx);
    this.drawText("Highest Score: ",
                  this.canvas.width / 2,
                  this.canvas.height * 2 / 5,
                  this.main.constant.oversmallTitle.textColor,
                  this.main.constant.oversmallTitle.textAlign,
                  this.main.constant.oversmallTitle.textBaseline,
                  this.main.constant.oversmallTitle.textFont,
                  ctx);
    this.drawRoundRect(this.main.constant.restartButton.x0,
                       this.main.constant.restartButton.y0,
                       this.main.constant.restartButton.x1,
                       this.main.constant.restartButton.y1,
                       this.main.constant.restartButton.r,
                       ctx);
    this.drawRoundRect(this.main.constant.backButton.x0,
                       this.main.constant.backButton.y0,
                       this.main.constant.backButton.x1,
                       this.main.constant.backButton.y1,
                       this.main.constant.backButton.r,
                       ctx);
    this.drawText("Restart",
                  (this.main.constant.restartButton.x0 + this.main.constant.restartButton.x1) / 2,
                  (this.main.constant.restartButton.y0 + this.main.constant.restartButton.y1) / 2,
                  this.main.constant.restartButton.textColor,
                  this.main.constant.restartButton.textAlign,
                  this.main.constant.restartButton.textBaseline,
                  this.main.constant.restartButton.textFont,
                  ctx);
    this.drawText("Back",
                  (this.main.constant.backButton.x0 + this.main.constant.backButton.x1) / 2,
                  (this.main.constant.backButton.y0 + this.main.constant.backButton.y1) / 2,
                  this.main.constant.backButton.textColor,
                  this.main.constant.backButton.textAlign,
                  this.main.constant.backButton.textBaseline,
                  this.main.constant.backButton.textFont,
                  ctx);
  }

  drawRoundRect(x0, y0, x1, y1, r, ctx) {
    ctx.strokeStyle = this.main.constant.startButton.strokeColor;
    ctx.lineWidth = this.main.constant.startButton.strokeSize;
    ctx.beginPath();
    ctx.moveTo(x0 + r, y0);
    ctx.arcTo(x1, y0, x1, y1, r);
    ctx.arcTo(x1, y1, x0, y1, r);
    ctx.arcTo(x0, y1, x0, y0, r);
    ctx.arcTo(x0, y0, x0 + r, y0, r);
    ctx.stroke();
  }

  drawText(data, x, y, textColor, textAlign, textBaseline, textFont, ctx) {
    ctx.fillStyle = textColor;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = textFont;
    ctx.fillText(data, x, y);
  }

  checkinRestart(x, y) {
    return x >= this.main.constant.restartButton.x0 &&
      x <= this.main.constant.restartButton.x1 &&
      y >= this.main.constant.restartButton.y0 &&
      y <= this.main.constant.restartButton.y1;
  }

  checkinBack(x, y) {
    return x >= this.main.constant.backButton.x0 &&
      x <= this.main.constant.backButton.x1 &&
      y >= this.main.constant.backButton.y0 &&
      y <= this.main.constant.backButton.y1;
  }
}