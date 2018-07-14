import Constant from "./constant.js"
import LeaderBoard from "./leaderboard.js"

let constant;
let highest;
let friends;
function drawRoundRect(x0, y0, x1, y1, r, ctx) {
  ctx.strokeStyle = constant.startButton.strokeColor;
  ctx.lineWidth = constant.startButton.strokeSize;
  ctx.beginPath();
  ctx.moveTo(x0 + r, y0);
  ctx.arcTo(x1, y0, x1, y1, r);
  ctx.arcTo(x1, y1, x0, y1, r);
  ctx.arcTo(x0, y1, x0, y0, r);
  ctx.arcTo(x0, y0, x0 + r, y0, r);
  ctx.stroke();
}

function drawText(data, x, y, textColor, textAlign, textBaseline, textFont, ctx) {
  ctx.fillStyle = textColor;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = textFont;
  ctx.fillText(data, x, y);
}

function render(canvas, highestScore, curscore){
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawText(`Score: ${curscore}`,
                canvas.width / 2,
                canvas.height / 4,
                constant.overTitle.textColor,
                constant.overTitle.textAlign,
                constant.overTitle.textBaseline,
                constant.overTitle.textFont,
                ctx);
  drawText(`Highest Score: ` + highestScore,
                canvas.width / 2,
                canvas.height * 2 / 5,
                constant.oversmallTitle.textColor,
                constant.oversmallTitle.textAlign,
                constant.oversmallTitle.textBaseline,
                constant.oversmallTitle.textFont,
                ctx);
  drawRoundRect(constant.restartButton.x0,
                     constant.restartButton.y0,
                     constant.restartButton.x1,
                     constant.restartButton.y1,
                     constant.restartButton.r,
                     ctx);
  drawRoundRect(constant.backButton.x0,
                     constant.backButton.y0,
                     constant.backButton.x1,
                     constant.backButton.y1,
                     constant.backButton.r,
                     ctx);
  drawText("Restart",
                (constant.restartButton.x0 + constant.restartButton.x1) / 2,
                (constant.restartButton.y0 + constant.restartButton.y1) / 2,
                constant.restartButton.textColor,
                constant.restartButton.textAlign,
                constant.restartButton.textBaseline,
                constant.restartButton.textFont,
                ctx);
  drawText("Back",
                (constant.backButton.x0 + constant.backButton.x1) / 2,
                (constant.backButton.y0 + constant.backButton.y1) / 2,
                constant.backButton.textColor,
                constant.backButton.textAlign,
                constant.backButton.textBaseline,
                constant.backButton.textFont,
                ctx);
}

wx.onMessage(data => {
  //console.log(data);
  if (data.type === "firstConnection"){
    let sharedCanvas = wx.getSharedCanvas();
    constant = new Constant(sharedCanvas);

    let keys = ['highestScore'];
    wx.getUserCloudStorage({
      keyList: keys,
      success: res => {
        if (res.KVDataList.length === 0) {
          highest = 0;
        }
        else
        {
          highest = parseInt(res.KVDataList[0].value);
        }
      },
      fail() {
        console.log('Fail to get user cloud storage');
      }
    });
  } else
  if (data.type === 'drawHighest') {
    //let keys = ['highestScore'];
    let sharedCanvas = wx.getSharedCanvas();
    render(sharedCanvas, highest, data.curscore);
  }
  else
  if (data.type === 'newScore') {
    //console.log(data);
    if (highest < data.score){
      highest = data.score;
      wx.setUserCloudStorage({
        KVDataList: [{ key: 'highestScore', value: `${data.score}` }],
        success: res => {
          console.log(res);
        },
        fail: res => {
          console.log(res);
        }
      });
    }
  } else
  if (data.type === 'updateFriends') {
    wx.getFriendCloudStorage({
      keyList: ['highestScore'],
      success: res => {
        console.log(res.data);
        friends = new LeaderBoard(res.data, constant);
      },
      fail: res => {
      },
      complete: res => {
      }
    });
  } else
  if (data.type === 'drawLeaderBoard') {
    if (friends !== undefined){
      let sharedCanvas = wx.getSharedCanvas();
      friends.drawtoCanvas(sharedCanvas);
    }
  } else
  if (data.type === 'nextPage') {
    console.log("nextPage");
    if (friends !== undefined){
      friends.pageplus();
      friends.drawtoCanvas(sharedCanvas);
    }
  } else
  if (data.type === 'prevPage') {
    console.log("prevPage");
    if (friends !== undefined){
      friends.pageminus();
      friends.drawtoCanvas(sharedCanvas);
    }
  }
});