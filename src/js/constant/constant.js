//game world constants
const gameCor = {
  width: canvas.width + astroidSize * 4,
  height: canvas.height + astroidSize * 4
};
const gameStyle = {
  background: '#000000'
};

//astroid constants
const astroidSize = {
  small: 0.1 * canvas.height,
  medium: 0.2 * canvas.height,
  large: 0.3 * canvas.height
};
const astroidSpeed = {
  small: 0.03 * canvas.height,
  medium: 0.02 * canvas.height,
  large: 0.01 * canvas.height
};
const astroidStyle = {
  strokeSize: 3,
  strokeColor: '#ffffff'
};
const astroidSplitAngle = Math.PI / 36;

//bullet constants
const bulletStyle = {
  strokeSize: 1,
  strokeColor: '#ffffff'
};
const bulletLife = 500;
const bulletSpeed = 0.05 * canvas.height;
const bulletRadius = 0.03 * canvas.height;

//enemy constants
const enemySize = {
  small: 0.05 * canvas.height,
  medium: 0.15 * canvas.height,
  large: 0.25 * canvas.height
};
const enemyShootFrames = 100;
const enemyStyle = {
  strokeSize: 2,
  strokeColor: '#ffffff'
};

//turning angle per frame
const turnAngle = Math.PI/180;

//player constants
//const playerRadius = 0.15 * canvas.height;
const playerStyle = {
  r0: 0.15 * canvas.height,
  theta: Math.PI*15/180,
  strokeSize: 2,
  strokeColor: '#ffffff'
};

//gameinfo constants
const scorePos = {
  x: canvas.width * 0.02,
  y: canvas.height * 0.02
};
const leftButtonPos = {
  x: canvas.width * 0.2,
  y: canvas.height * 0.8,
  r: canvas.width * 0.08
};
const rightButtonPos = {
  x: canvas.width * 0.3,
  y: canvas.height * 0.8,
  r: canvas.width * 0.08
};
const accButtonPos = {
  x: canvas.width * 0.6,
  y: canvas.height * 0.8,
  r: canvas.width * 0.15
};
const shootButtonPos = {
  x: canvas.width * 0.8,
  y: canvas.height * 0.8,
  r: canvas.width * 0.15
};
const buttonStyle = {
  strokeSize: 3,
  strokeColor: '#ffffff'
};

export {gameCor, gameStyle, astroidStyle, astroidSpeed, astroidSplitAngle, astroidSize, 
        bulletStyle, bulletLife, bulletSpeed, bulletRadius, enemySize, enemyShootFrames,
        enemyStyle, turnAngle, playerStyle, scorePos, leftButtonPos, rightButtonPos,
        accButtonPos, shootButtonPos, buttonStyle}