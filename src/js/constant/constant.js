/**
 * Intro: Game constants
 * Author: Hong Fangzhou
 * Email: hongfz16@163.com
 * Date: 2018.7.11
 */

export default class Constant {
  constructor(canvas) {
    this.canvas = canvas;
    this.dpr = wx.getSystemInfoSync().pixelRatio;

    //astroid constants
    this.astroidSize = {
      small: 0.04 * canvas.height,
      medium: 0.07 * canvas.height,
      large: 0.1 * canvas.height
    };
    this.astroidSpeed = {
      small: 0.009 * canvas.height,
      medium: 0.007 * canvas.height,
      large: 0.005 * canvas.height
    };
    this.astroidScore = {
      small: 3,
      medium: 2,
      large: 1
    };
    this.astroidSpeedRatio = {
      small: 1.25,
      medium: 1.2
    };
    this.astroidStyle = {
      strokeSize: 1,
      strokeColor: '#ffffff'
    };
    this.astroidLimit = 20;
    this.astroidSplitAngle = Math.PI * 3 / 36;

    //life constants
    this.heartStyle = {
      radius: 0.03 * canvas.height,
      lineWidth: 1,
      fillStyle: '#ffffff',
      strokeStyle: '#ffffff',
    }

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
      small: 0.018 * canvas.height,
      medium: 0.025 * canvas.height,
      large: 0.030 * canvas.height
    };
    this.enemyScore = {
      small: 4,
      medium: 3,
      large: 2
    };
    this.enemyShootFrame = 300;
    this.enemyStyle = {
      strokeSize: 1,
      strokeColor: '#ffffff'
    };
    this.enemySpeed = 0.005 * canvas.height;
    this.enemyVelTimer = 300;

    //turning angle per frame
    this.turnAngle = Math.PI * 6 / 180;

    //player constants
    this.playerStyle = {
      r0: 0.02 * canvas.height,
      theta: Math.PI * 20 / 180,
      strokeSize: 1,
      strokeColor: '#ffffff',
      maxSpeed: 0.024 * canvas.height
    };

    //gameinfo constants
    this.lifePos = {
      x: canvas.width * 0.02,
      y: canvas.height * 0.11
    };
    this.lifeStyle = {
      textAlign: 'left',
      textBaseline: 'middle',
      font: `${this.canvas.height * 0.05}px sans-serif`,
      color: '#ffffff'
    }
    this.lifeLimit = 2;
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
      x: canvas.width * 0.15,
      y: canvas.height * 0.8,
      r: canvas.width * 0.05
    };
    this.rightButtonPos = {
      x: canvas.width * 0.25,
      y: canvas.height * 0.8,
      r: canvas.width * 0.05
    };
    this.slideHandlePos = {
      centerx: canvas.width * 0.2,
      centery: canvas.height * 0.8,
      width: canvas.width * 0.25,
      r: canvas.width * 0.04
    };
    this.slideHandleStyle = {
      backcolor: 'rgba(255, 255, 255, 200)',
      frontcolor: 'rgba(255, 255, 255, 10)'
    };
    this.accButtonPos = {
      x: canvas.width * 0.75,
      y: canvas.height * 0.8,
      r: canvas.width * 0.05
    };
    let ar = this.accButtonPos.r;
    this.accButtonDesign = [
      [0, ar * -0.7],
      [ar * 0.5, ar * -0.7],
      [0, -0.1 * ar],
      [0.5 * ar, -0.1 * ar],
      [-0.5 * ar, 0.7 * ar],
      [0, 0.1 * ar],
      [-0.5 * ar, 0.1 * ar]
    ];
    this.shootButtonDesign = {
      r: ar * 0.6,
      R: ar * 0.8
    };
    this.shootButtonPos = {
      x: canvas.width * 0.9,
      y: canvas.height * 0.8,
      r: canvas.width * 0.05
    };
    this.buttonStyle = {
      strokeSize: 3,
      strokeColor: '#ffffff'
    };
    this.handle2dStyle = {
      margin: canvas.width * 0.02,
      x: canvas.width * 0.2,
      y: canvas.height * 0.8,
      circleR: canvas.width * 0.1,
      handleR: canvas.width * 0.04,
      backcolor: 'rgba(255, 255, 255, 200)',
      frontcolor: 'rgba(255, 255, 255, 10)'
    }


    //game world constants
    let gameCorWidth = 0;
    let gameCorHeight = 0;
    while(gameCorWidth < this.canvas.width * 2) {
      gameCorWidth += canvas.height / 4;
    }
    while(gameCorHeight < this.canvas.height * 2) {
      gameCorHeight += canvas.height / 4;
    }
    this.gameCor = {
      width: gameCorWidth,
      height: gameCorHeight
    };
    this.gameStyle = {
      background: '#000000',
      backline: 'rgb(50, 50, 50)',
      lineSize: 2,
      lineWidth: canvas.height / 4 
    };

    //welcome constants
    this.welcomeTitle = {
      textColor: '#ffffff',
      textAlign: 'center',
      textBaseline: 'middle',
      textFont: `bold ${this.canvas.height * 1 / 5}px sans-serif`
    };
    this.startButton = {
      x0: canvas.width * 3 / 10.0,
      y0: canvas.height * 1 / 3.0,
      x1: canvas.width * 7 / 10.0,
      y1: canvas.height * 1 / 2.0,
      r: canvas.width / 30.0,
      strokeSize: 2,
      strokeColor: '#ffffff',
      textColor: '#ffffff',
      textAlign: 'center',
      textBaseline: 'middle',
      textFont: `${this.canvas.height * 1 / 10}px sans-serif`,
    };
    this.survivalButton = {
      x0: canvas.width * 3 / 10.0,
      y0: canvas.height * 13 / 24.0,
      x1: canvas.width * 7 / 10.0,
      y1: canvas.height * 17 / 24.0,
      r: canvas.width / 30.0,
      strokeSize: 2,
      strokeColor: '#ffffff',
      textColor: '#ffffff',
      textAlign: 'center',
      textBaseline: 'middle',
      textFont: `${this.canvas.height * 1 / 10}px sans-serif`,
    };
    this.stageButton = {
      x0: canvas.width * 3 / 10.0,
      y0: canvas.height * 3 / 4.0,
      x1: canvas.width * 7 / 10.0,
      y1: canvas.height * 11 / 12.0,
      r: canvas.width / 30.0,
      strokeSize: 2,
      strokeColor: '#ffffff',
      textColor: '#ffffff',
      textAlign: 'center',
      textBaseline: 'middle',
      textFont: `${this.canvas.height * 1 / 10}px sans-serif`,
    };

    //Over constants
    this.overTitle = {
      textColor: '#ffffff',
      textAlign: 'center',
      textBaseline: 'middle',
      textFont: `bold ${this.canvas.height * 1 / 5}px sans-serif`
    };
    this.oversmallTitle = {
      textColor: '#ffffff',
      textAlign: 'center',
      textBaseline: 'middle',
      textFont: `${this.canvas.height * 1 / 30}px sans-serif`
    };
    this.restartButton = {
      x0: canvas.width * 3 / 10.0,
      y0: canvas.height / 2.0,
      x1: canvas.width * 7 / 10.0,
      y1: canvas.height * 2 / 3.0,
      r: canvas.width / 30.0,
      strokeSize: 2,
      strokeColor: '#ffffff',
      textColor: '#ffffff',
      textAlign: 'center',
      textBaseline: 'middle',
      textFont: `${this.canvas.height * 1 / 10}px sans-serif`,
    };
    this.backButton = {
      x0: canvas.width * 3 / 10.0,
      y0: canvas.height * 3 / 4.0,
      x1: canvas.width * 7 / 10.0,
      y1: canvas.height * 11 / 12.0,
      r: canvas.width / 30.0,
      strokeSize: 2,
      strokeColor: '#ffffff',
      textColor: '#ffffff',
      textAlign: 'center',
      textBaseline: 'middle',
      textFont: `${this.canvas.height * 1 / 10}px sans-serif`,
    };

    let pp = Math.floor(this.canvas.height / (60 * this.dpr)) - 2;
    let wi = this.canvas.width * 2 / 3;
    //leaderboard constants
    this.leaderboard = {
      perheight: 60 * this.dpr,
      perpage: pp,
      width: wi,
      blankheight: (this.canvas.height - (pp + 2) * (60 * this.dpr)) / 2,

      idWidth: wi / 6,
      nickWidth: wi * 4 / 6,
      scoreWidth: wi / 6,

      lineSize: 2,
      lineColor: '#ffffff',

      textFont: `${this.canvas.height / 18}px sans-serif`,

      imageWidth: 50 * this.dpr,
      imageHeight: 50 * this.dpr,
    }
  }
}
