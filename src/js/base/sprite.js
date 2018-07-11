// import Circle from "./geometry";
// import Point from "./geometry";
// import Vector2d from "./geometry";
import {Circle, Point, Vector2d} from './geometry'
import Constant from '../constant/constant.js'

export default class Sprite{
  constructor(x = 0, y = 0, r = 1){
    this.circle = new Circle(x, y, r);
    this.vel = new Vector2d(0, 0);
  }

  checkCollision(constant, sprite){
    return this.circle.checkCollision(constant, sprite.circle);
  }

  setPosition(x, y){
    this.circle.center.x = x;
    this.circle.center.y = y;
  }

  setVelocity(x, y){
    this.vel.x = x;
    this.vel.y = y;
  }

  getX() {
    return this.circle.center.x;
  }

  getY() {
    return this.circle.center.y;
  }

  getRadius() {
    return this.circle.radius;
  }

  setX(x) {
    this.circle.center.x = x;
  }

  setY(y) {
    this.circle.center.y = y;
  }
}