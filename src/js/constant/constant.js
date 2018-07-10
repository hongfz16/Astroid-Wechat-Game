//game world constants
export const gameCor ={
  width: canvas.width + astroidSize * 4,
  height: canvas.height + astroidSize * 4
};

//astroid constants
export const astroidSize = {
  small: 0.1 * canvas.height,
  medium: 0.2 * canvas.height,
  large: 0.3 * canvas.height
};
export const astroidSpeed = {
  small: 0.03 * canvas.height,
  medium: 0.02 * canvas.height,
  large: 0.01 * canvas.height
};
export const astroidStyle = {
  strokeSize: 3,
  strokeColor: '#ffffff'
};
export const astroidSplitAngle = Math.PI / 36;

//bullet constants
export const bulletStyle = {
  strokeSize: 1,
  strokeColor: '#ffffff'
};
export const bulletLife = 500;
export const bulletSpeed = 0.05 * canvas.height;
export const bulletRadius = 0.03 * canvas.height;

//enemy constants
export const enemySize = {
  small: 0.05 * canvas.height,
  medium: 0.15 * canvas.height,
  large: 0.25 * canvas.height
};
export const enemyShootFrames = 100;
export const enemyStyle = {
  strokeSize: 2,
  strokeColor: '#ffffff'
};

//turning angle per frame
export const turnAngle = Math.PI/180;

//player constants
//export const playerRadius = 0.15 * canvas.height;
export const playerStyle = {
  r0: 0.15 * canvas.height,
  theta: Math.PI*15/180,
  strokeSize: 2,
  strokeColor: '#ffffff'
};