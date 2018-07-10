import Main from "../main.js"

export class gameInfo{
  constructor(mainclass){
    this.main = mainclass;
    this.score = 0;
  }

  scorepp(){
    this.score += 1;
  }

  drawtoCanvas(){

  }

  initEvent(){
    canvas.addEventListener("touchstart",((e)=>{
      e.preventDefault();
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;

      if (checkinLeft(x, y)){
        this.main.player.turnleft();
      } else
      if (checkinRight(x, y)){
        this.main.player.turnright();
      } else
      if (checkinShoot(x, y)){
        this.main.player.shoot();
      } else
      if (checkinAcc(x, y)){
        this.main.player.accelerate();
      }
    }).bind(this));
  }
  
  checkinLeft(x, y){

  }

  checkinRight(x, y){

  }

  checkinShoot(x, y){

  }

  checkinAcc(x, y){
    
  }
}