/**
 * Intro: LeaderBoard class in OpenDataContext for drawing leaderboard page
 * Author: Wang Zeyu
 * Email: ycdfwzy@outlook.com
 * Date: 2018.7.11
 */

import Constant from './constant.js';

export default class LeaderBoard {
  constructor(usergameData, constant) {
    this.usergameDataArray = usergameData;
    this.curpage = 0;
    this.constant = constant;
    this.mode = 'adventure';

    this.userData = [];
    for (let i = 0; i < this.usergameDataArray.length; i += 1) {
      const tmp = {};
      this.downloadImage(this.usergameDataArray[i], tmp);
      tmp.nickname = this.usergameDataArray[i].nickname;
      tmp.score = 0;
      tmp.time = 0;
      const arr = this.usergameDataArray[i].KVDataList;
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].key === 'highestScore') {
          tmp.score = Number(arr[i].value);
        } else
        if (arr[i].key === 'longestTime') {
          tmp.time = Number(arr[i].value);
        }
      }
      this.userData.push(tmp);
    }

    this.userData.sort((a, b) => b.score - a.score);
  }

  downloadImage(data, obj) {
    obj.image = wx.createImage();
    obj.image.src = data.avatarUrl;
  }

  pageplus() {
    if (this.userData.length > (this.curpage + 1) * this.constant.leaderboard.perpage) {
      this.curpage += 1;
    }
  }

  pageminus() {
    if (this.curpage > 0) this.curpage -= 1;
  }

  changeMode() {
    this.curpage = 0;
    if (this.mode === 'adventure') {
      this.mode = 'survival';
      this.userData.sort((a, b) => b.time - a.time);
    } else
    if (this.mode === 'survival') {
      this.mode = 'adventure';
      this.userData.sort((a, b) => b.score - a.score);
    }
  }

  drawtoCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, this.constant.canvas.width, this.constant.canvas.height);
    this.drawTable(ctx);
    this.drawInfo(ctx);
  }

  drawTable(ctx) {
    const left = (this.constant.canvas.width - this.constant.leaderboard.width) / 2;
    const right = (this.constant.canvas.width + this.constant.leaderboard.width) / 2;
    let s = this.constant.leaderboard.blankheight;
    const t = this.constant.canvas.height - this.constant.leaderboard.blankheight;
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
    this.drawLine(this.constant.canvas.width / 2 - this.constant.leaderboard.width / 6,
      t - this.constant.leaderboard.perheight,
      this.constant.canvas.width / 2 - this.constant.leaderboard.width / 6,
      t,
      ctx);
    this.drawLine(this.constant.canvas.width / 2 + this.constant.leaderboard.width / 6,
      t - this.constant.leaderboard.perheight,
      this.constant.canvas.width / 2 + this.constant.leaderboard.width / 6,
      t,
      ctx);
  }

  drawInfo(ctx) {
    let x = (this.constant.canvas.width - this.constant.leaderboard.width) / 2;
    let y = this.constant.leaderboard.blankheight;
    this.drawText('排名',
      x + this.constant.leaderboard.idWidth / 2,
      y + this.constant.leaderboard.perheight / 2,
      ctx);
    x += this.constant.leaderboard.idWidth;
    this.drawText('好友',
      x + this.constant.leaderboard.nickWidth / 2,
      y + this.constant.leaderboard.perheight / 2,
      ctx);
    x += this.constant.leaderboard.nickWidth;
    this.drawText(this.mode === 'adventure' ? '分数' : '时间',
      x + this.constant.leaderboard.scoreWidth / 2,
      y + this.constant.leaderboard.perheight / 2,
      ctx);

    for (let i = 1; i <= this.constant.leaderboard.perpage; i++) {
      x = (this.constant.canvas.width - this.constant.leaderboard.width) / 2;
      y = this.constant.leaderboard.blankheight + i * this.constant.leaderboard.perheight;

      const index = this.curpage * this.constant.leaderboard.perpage + i - 1;
      if (index >= this.userData.length) { break; }
      this.drawText(index + 1,
        x + this.constant.leaderboard.idWidth / 2,
        y + this.constant.leaderboard.perheight / 2,
        ctx);
      x += this.constant.leaderboard.idWidth;
      this.drawImage(this.userData[index].image,
        x + (this.constant.leaderboard.perheight - this.constant.leaderboard.imageWidth) / 2,
        y + (this.constant.leaderboard.perheight - this.constant.leaderboard.imageHeight) / 2,
        this.constant.leaderboard.imageWidth,
        this.constant.leaderboard.imageHeight,
        ctx);
      this.drawText(this.userData[index].nickname,
        x + (this.constant.leaderboard.perheight + this.constant.leaderboard.nickWidth) / 2,
        y + this.constant.leaderboard.perheight / 2,
        ctx);
      x += this.constant.leaderboard.nickWidth;
      this.drawText(this.mode === 'adventure' ? this.userData[index].score : this.userData[index].time,
        x + this.constant.leaderboard.scoreWidth / 2,
        y + this.constant.leaderboard.perheight / 2,
        ctx);
    }

    x = (this.constant.canvas.width - this.constant.leaderboard.width) / 2;
    y = this.constant.canvas.height - this.constant.leaderboard.blankheight - this.constant.leaderboard.perheight;
    this.drawText('上一页',
      x + this.constant.leaderboard.width / 6,
      y + this.constant.leaderboard.perheight / 2,
      ctx);
    x += this.constant.leaderboard.width / 3;
    this.drawText(this.mode === 'adventure' ? '生存模式' : '冒险模式',
      x + this.constant.leaderboard.width / 6,
      y + this.constant.leaderboard.perheight / 2,
      ctx);
    x += this.constant.leaderboard.width / 3;
    this.drawText('下一页',
      x + this.constant.leaderboard.width / 6,
      y + this.constant.leaderboard.perheight / 2,
      ctx);
  }

  drawRect(x0, y0, x1, y1, ctx) {
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

  drawLine(x0, y0, x1, y1, ctx) {
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

  drawImage(img, x, y, width, height, ctx) {
    ctx.drawImage(img, x, y, width, height);
  }
}
