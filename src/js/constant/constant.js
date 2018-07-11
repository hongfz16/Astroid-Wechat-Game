export default class Constant {
  constructor(canvas) {
    //astroid constants
    this.canvas = canvas;
    // console.log(canvas);

    this.astroidSize = {
      small: 0.05 * canvas.height,
      medium: 0.1 * canvas.height,
      large: 0.15 * canvas.height
    };
    this.astroidSpeed = {
      small: 0.03 * canvas.height,
      medium: 0.02 * canvas.height,
      large: 0.01 * canvas.height
    };
    this.astroidStyle = {
      strokeSize: 1,
      strokeColor: '#ffffff'
    };
    this.astroidSplitAngle = Math.PI * 3 / 36;

    //bullet constants
    this.bulletStyle = {
      strokeSize: 1,
      strokeColor: '#ffffff'
    };
    this.bulletLife = 55;
    this.bulletSpeed = 0.03 * canvas.height;
    this.bulletRadius = 0.01 * canvas.height;

    //enemy constants
    this.enemySize = {
      small: 0.025 * canvas.height,
      medium: 0.075 * canvas.height,
      large: 0.1 * canvas.height
    };
    this.enemyShootFrame = 100;
    this.enemyStyle = {
      strokeSize: 1,
      strokeColor: '#ffffff'
    };

    //turning angle per frame
    this.turnAngle = Math.PI * 3 / 180;

    //player constants
    //const playerRadius = 0.15 * canvas.height;
    this.playerStyle = {
      r0: 0.03 * canvas.height,
      theta: Math.PI * 20 / 180,
      strokeSize: 1,
      strokeColor: '#ffffff'
    };

    //gameinfo constants
    this.scorePos = {
      x: canvas.width * 0.02,
      y: canvas.height * 0.05
    };
    this.scoreStyle = {
      textAlign: 'left',
      textBaseline: 'middle',
      font: `${this.canvas.height * 0.05}px sans-serif`,
      color: '#ffffff'
    };
    this.leftButtonPos = {
      x: canvas.width * 0.2,
      y: canvas.height * 0.8,
      r: canvas.width * 0.03
    };
    this.rightButtonPos = {
      x: canvas.width * 0.3,
      y: canvas.height * 0.8,
      r: canvas.width * 0.03
    };
    this.accButtonPos = {
      x: canvas.width * 0.6,
      y: canvas.height * 0.8,
      r: canvas.width * 0.03
    };
    this.shootButtonPos = {
      x: canvas.width * 0.8,
      y: canvas.height * 0.8,
      r: canvas.width * 0.03
    };
    this.buttonStyle = {
      strokeSize: 3,
      strokeColor: '#ffffff'
    };

    //game world constants
    this.gameCor = {
      width: canvas.width + this.astroidSize.large * 2,
      height: canvas.height + this.astroidSize.large * 2
    };
    this.gameStyle = {
      background: '#000000',
      backline: 'rgba(190, 190, 190, 190)',
      lineSize: 1
    };
  }
}

// export {gameCor, gameStyle, astroidStyle, astroidSpeed, astroidSplitAngle, astroidSize, 
//         bulletStyle, bulletLife, bulletSpeed, bulletRadius, enemySize, enemyShootFrames,
//         enemyStyle, turnAngle, playerStyle, scorePos, leftButtonPos, rightButtonPos,
//         accButtonPos, shootButtonPos, buttonStyle}