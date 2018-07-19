import Constant from "../constant/constant"
import Main from "../main"

export default class Over {
  constructor(main, score, time, mode = 'adventure') {
    this.canvas = main.canvas;
    this.ctx = main.ctx;
    this.main = main;
    this.hasTouched = false;
    this.score = score;
    this.time = time;
    this.mode = mode;
    this.initEvent();
    this.openDataContext = wx.getOpenDataContext();
    this.openDataContext.postMessage({
      type: 'newScore',
      score: this.score,
      time: this.time
    });
    //console.log(this.score);
    this.openDataContext.postMessage({
      type: 'drawHighest',
      curscore: this.score,
      curtime: this.time,
      mode: this.mode,
    });
    this.openDataContext.postMessage({
      type: 'updateFriends',
    });
    this.currHighest = undefined;
  }

  initEvent(){
    this.main.canvas.addEventListener("touchstart", ((e) => {
      e.preventDefault();
      if (this.hasTouched === false) {
        let x = e.touches[0].clientX * this.main.constant.dpr;
        let y = e.touches[0].clientY * this.main.constant.dpr;
        if (this.checkinRestart(x, y)) {
          if (this.mode === 'adventure') {
            setTimeout(this.main.start.bind(this.main), 100);
          } else
          {
            setTimeout(this.main.survivalstart.bind(this.main), 100);
          }
          this.hasTouched = true;
        } else
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
    this.main.sharedCanvas = this.main.openDataContext.canvas;
    ctx.drawImage(this.main.sharedCanvas, 0, 0);
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