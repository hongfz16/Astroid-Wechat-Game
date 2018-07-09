import Circle from "./geometry";
import Point from "./geometry";
import Vector2d from "./geometry";

export default class Sprite{
  constructor(x = 0, y = 0, r = 1){
    this.circle = new Circle(x, y, r);
    this.vel = new Vector2d(0, 0);
  }

  checkCollision(sprite){
    return this.circle.checkCollision(sprite.circle);
  }

  setPosition(x, y){
    this.circle.center.x = x;
    this.circle.center.y = y;
  }

  setVelocity(x, y){
    this.vel.x = x;
    this.vel.y = y;
  }
}