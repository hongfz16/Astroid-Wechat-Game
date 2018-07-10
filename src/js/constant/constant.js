export default class Constant {
  constructor(){
    //game world constants
    this.gameCor = {
      width: canvas.width + astroidSize * 4,
      height: canvas.height + astroidSize * 4
    };
    this.gameStyle = {
      background: '#000000'
    };

    //astroid constants
    this.astroidSize = {
      small: 0.1 * canvas.height,
      medium: 0.2 * canvas.height,
      large: 0.3 * canvas.height
    };
    this.astroidSpeed = {
      small: 0.03 * canvas.height,
      medium: 0.02 * canvas.height,
      large: 0.01 * canvas.height
    };
    this.astroidStyle = {
      strokeSize: 3,
      strokeColor: '#ffffff'
    };
    this.astroidSplitAngle = Math.PI / 36;

    //bullet constants
    this.bulletStyle = {
      strokeSize: 1,
      strokeColor: '#ffffff'
    };
    this.bulletLife = 500;
    this.bulletSpeed = 0.05 * canvas.height;
    this.bulletRadius = 0.03 * canvas.height;

    //enemy constants
    this.enemySize = {
      small: 0.05 * canvas.height,
      medium: 0.15 * canvas.height,
      large: 0.25 * canvas.height
    };
    this.enemyShootFrames = 100;
    this.enemyStyle = {
      strokeSize: 2,
      strokeColor: '#ffffff'
    };

    //turning angle per frame
    this.turnAngle = Math.PI/180;

    //player constants
    //const playerRadius = 0.15 * canvas.height;
    this.playerStyle = {
      r0: 0.15 * canvas.height,
      theta: Math.PI*15/180,
      strokeSize: 2,
      strokeColor: '#ffffff'
    };

    //gameinfo constants
    this.scorePos = {
      x: canvas.width * 0.02,
      y: canvas.height * 0.02
    };
    this.leftButtonPos = {
      x: canvas.width * 0.2,
      y: canvas.height * 0.8,
      r: canvas.width * 0.08
    };
    this.rightButtonPos = {
      x: canvas.width * 0.3,
      y: canvas.height * 0.8,
      r: canvas.width * 0.08
    };
    this.accButtonPos = {
      x: canvas.width * 0.6,
      y: canvas.height * 0.8,
      r: canvas.width * 0.15
    };
    this.shootButtonPos = {
      x: canvas.width * 0.8,
      y: canvas.height * 0.8,
      r: canvas.width * 0.15
    };
    this.buttonStyle = {
      strokeSize: 3,
      strokeColor: '#ffffff'
    };
  }
}

// export {gameCor, gameStyle, astroidStyle, astroidSpeed, astroidSplitAngle, astroidSize, 
//         bulletStyle, bulletLife, bulletSpeed, bulletRadius, enemySize, enemyShootFrames,
//         enemyStyle, turnAngle, playerStyle, scorePos, leftButtonPos, rightButtonPos,
//         accButtonPos, shootButtonPos, buttonStyle}