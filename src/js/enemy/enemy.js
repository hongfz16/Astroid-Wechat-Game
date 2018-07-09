import Sprite from '../base/sprite'
import gameCor from '../constant/constant'
import enemySize from '../constant/constant'
import Bullet from '../bullet/bullet.js'

export class Enemy extends Sprite {
  constructor(x = 0, y = 0, type = 'large') {
    let size = enemySize[type];
    super(x, y, size);
  }

  update() {

  }

  drawtoCanvas(ctx) {

  }

  shoot() {

  }
}