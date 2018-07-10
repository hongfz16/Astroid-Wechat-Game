//game world constants
export const gameCor = {
  width: canvas.width + astroidSize * 4,
  height: canvas.height + astroidSize * 4
};
export const gameStyle = {
  background: '#000000'
}

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

//gameinfo constants
export const scorePos = {
  x: canvas.width * 0.02,
  y: canvas.height * 0.02
};
export const leftButtonPos = {
  x: canvas.width * 0.2,
  y: canvas.height * 0.8,
  r: canvas.width * 0.08
};
export const rightButtonPos = {
  x: canvas.width * 0.3,
  y: canvas.height * 0.8,
  r: canvas.width * 0.08
};
export const accButtonPos = {
  x: canvas.width * 0.6,
  y: canvas.height * 0.8,
  r: canvas.width * 0.15
};
export const shootButtonPos = {
  x: canvas.width * 0.8,
  y: canvas.height * 0.8,
  r: canvas.width * 0.15
};
export const buttonStyle = {
  strokeSize: 3,
  strokeColor: '#ffffff'
};
