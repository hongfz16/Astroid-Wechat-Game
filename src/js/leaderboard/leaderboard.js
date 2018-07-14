export default class LeaderBoard{
  constructor(main){
    this.main = main;
    //this.curpage = 0;
    this.hasTouched = false;
    this.main.openDataContext.postMessage({
      type: "drawLeaderBoard",
      //page: this.curpage
    });
    this.initEvent();
  }

  drawtoCanvas(){
    //console.log("main leaderboard drawtoCanvas");
    let ctx = this.main.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.main.canvas.width, this.main.canvas.height);
    this.main.sharedCanvas = this.main.openDataContext.canvas;
    ctx.drawImage(this.main.sharedCanvas, 0, 0);
  }

  initEvent(){
    this.main.canvas.addEventListener("touchstart", ((e)=>{
      e.preventDefault();
      if (this.hasTouched === false){
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        //console.log("checkBack");
        if (this.checkBack(x, y)){
          setTimeout(this.main.welcome.bind(this.main), 100);
          this.hasTouched = true;
        } else
        if (this.checkinNext(x, y)){
          //console.log("inNext");
          this.main.openDataContext.postMessage({
            type: "nextPage",
          });
          //this.hasTouched = true;
        } else
        if (this.checkinPrevious(x, y)) {
          //console.log("inPrev");
          this.main.openDataContext.postMessage({
            type: "prevPage",
          });
          //this.hasTouched = true;
        }
      }
    }).bind(this));
  }

  checkinPrevious(x, y){
    let x0 = (this.main.canvas.width - this.main.constant.leaderboard.width) / 2;
    let y0 = this.main.canvas.height - this.main.constant.leaderboard.blankheight - this.main.constant.leaderboard.perheight;
    let x1 = this.main.canvas.width / 2;
    let y1 = y0 + this.main.constant.leaderboard.perheight;
    return (x > x0 && x < x1 && y > y0 && y < y1);
  }

  checkinNext(x, y){
    let x0 = this.main.canvas.width / 2;
    let y0 = this.main.canvas.height - this.main.constant.leaderboard.blankheight - this.main.constant.leaderboard.perheight;
    let x1 = (this.main.canvas.width + this.main.constant.leaderboard.width) / 2;
    let y1 = y0 + this.main.constant.leaderboard.perheight;
    return (x > x0 && x < x1 && y > y0 && y < y1);
  }

  checkBack(x, y){
    //console.log(x+' '+y);
    //console.log((this.main.constant.canvas.width - this.main.constant.leaderboard.width) / 2);
    //console.log((this.main.constant.canvas.width + this.main.constant.leaderboard.width) / 2);
    return (x < (this.main.constant.canvas.width - this.main.constant.leaderboard.width) / 2 ||
      x > (this.main.constant.canvas.width + this.main.constant.leaderboard.width) / 2);
  }
}