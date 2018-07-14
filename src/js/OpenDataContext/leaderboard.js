import Constant from "./constant.js"

export default class LeaderBoard{
  constructor(usergameData, constant){
    //console.log(usergameData);
    this.usergameDataArray = usergameData;
    this.curpage = 0;
    this.constant = constant;

    this.userData = [];
    for (let i = 0; i < this.usergameDataArray.length; i+=1){
      let tmp = {};
      this.downloadImage(this.usergameDataArray[i], tmp);
      tmp.nickname = this.usergameDataArray[i].nickname;
      tmp.score = parseInt(this.usergameDataArray[i].KVDataList[0].value);
      this.userData.push(tmp);
    }

    this.userData.sort(function (a, b) {
      return b.score - a.score;
    });
  }

  downloadImage(data, obj){
    obj.image = wx.createImage();
    obj.image.src = data.avatarUrl;
  }

  pageplus(){
    //console.log((this.curpage + 1) * this.constant.leaderboard.perpage);
    //console.log(this.userData.length);
    if (this.userData.length > (this.curpage+1)*this.constant.leaderboard.perpage){
      this.curpage += 1;
    }
  }

  pageminus(){
    if (this.curpage > 0)
      this.curpage -= 1;
  }

  drawtoCanvas(canvas){
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, this.constant.canvas.width, this.constant.canvas.height);
    this.drawTable(ctx);
    this.drawInfo(ctx);
  }

  drawTable(ctx){
    let left = (this.constant.canvas.width - this.constant.leaderboard.width) / 2;
    let right = (this.constant.canvas.width + this.constant.leaderboard.width) / 2;
    let s = this.constant.leaderboard.blankheight;
    let t = this.constant.canvas.height - this.constant.leaderboard.blankheight;
    this.drawRect(left, s, right, t, ctx);

    s += this.constant.leaderboard.perheight;
    while (s < t) {
      this.drawLine(left, s, right, s, ctx);
      s += this.constant.leaderboard.perheight;
    }
    s = this.constant.leaderboard.blankheight;
    let x = left + this.constant.leaderboard.idWidth;
    this.drawLine(x, s, x, t - this.constant.leaderboard.perheight, ctx);
    x += this.constant.leaderboard.nickWidth;
    this.drawLine(x, s, x, t - this.constant.leaderboard.perheight, ctx);
    this.drawLine(this.constant.canvas.width / 2,
                  t - this.constant.leaderboard.perheight,
                  this.constant.canvas.width / 2,
                  t,
                  ctx);
  }

  drawInfo(ctx){
    //console.log("in drawInfo");
    //console.log(this.curpage);
    let x = (this.constant.canvas.width - this.constant.leaderboard.width) / 2;
    let y = this.constant.leaderboard.blankheight;
    //console.log(x, y);
    this.drawText("RANK",
                  x + this.constant.leaderboard.idWidth / 2,
                  y + this.constant.leaderboard.perheight / 2,
                  ctx);
    x += this.constant.leaderboard.idWidth;
    this.drawText("NAME",
                  x + this.constant.leaderboard.nickWidth / 2,
                  y + this.constant.leaderboard.perheight / 2,
                  ctx);
    x += this.constant.leaderboard.nickWidth;
    this.drawText("SCORE",
                  x + this.constant.leaderboard.scoreWidth / 2,
                  y + this.constant.leaderboard.perheight / 2,
                  ctx);

    for (let i = 1; i <= this.constant.leaderboard.perpage; i++) {
      x = (this.constant.canvas.width - this.constant.leaderboard.width) / 2;
      y = this.constant.leaderboard.blankheight + i*this.constant.leaderboard.perheight;

      let index = this.curpage * this.constant.leaderboard.perpage + i-1;
      if (index >= this.userData.length) { break; }
      this.drawText(index+1,
                    x + this.constant.leaderboard.idWidth / 2,
                    y + this.constant.leaderboard.perheight / 2,
                    ctx);
      x += this.constant.leaderboard.idWidth;
      this.drawText(this.userData[index].nickname,
                    x + this.constant.leaderboard.nickWidth / 2,
                    y + this.constant.leaderboard.perheight / 2,
                    ctx);
      x += this.constant.leaderboard.nickWidth;
      this.drawText(this.userData[index].score,
                    x + this.constant.leaderboard.scoreWidth / 2,
                    y + this.constant.leaderboard.perheight / 2,
                    ctx);
    }

    x = (this.constant.canvas.width - this.constant.leaderboard.width) / 2;
    y = this.constant.canvas.height - this.constant.leaderboard.blankheight - this.constant.leaderboard.perheight;
    this.drawText("Prev",
                  x + this.constant.leaderboard.width / 4,
                  y + this.constant.leaderboard.perheight / 2,
                  ctx);
    x += this.constant.leaderboard.width / 2;
    this.drawText("Next",
                  x + this.constant.leaderboard.width / 4,
                  y + this.constant.leaderboard.perheight / 2,
                  ctx);
  }

  drawRect(x0, y0, x1, y1, ctx){
    ctx.strokeStyle = this.constant.leaderboard.lineColor;
    ctx.lineWidth = this.constant.leaderboard.lineSize;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0, y1);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x1, y0);
    ctx.closePath();
    ctx.stroke();
  }

  drawLine(x0, y0, x1, y1, ctx){
    ctx.strokeStyle = this.constant.leaderboard.lineColor;
    ctx.lineWidth = this.constant.leaderboard.lineSize;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }

  drawText(data, x, y, ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = this.constant.leaderboard.textFont;
    ctx.fillText(data, x, y);
  }
}