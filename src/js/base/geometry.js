export default class Point{
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }
  distance(pos){
    return Math.sqrt((x-pos.x)*(x-pos.x) + (y-pos.y)*(y-pos.y));
  }
}

export class Circle{
  constructor(x = 0, y = 0, r = 1){
    this.center = new Point(x, y);
    this.radius = r;
  }
  checkCollision(cir){
    return (this.center.distance(cir.center) < this.radius + cir.radius);
  }
}

export class Vector2d{
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  length(){
    return Math.sqrt(this.x*this.x+this.y*this.y);
  }
  normalize(len = 1){
    const l = this.length();
    this.x = Math.floor(this.x/l*len);
    this.y = Math.floor(this.y/l*len);
  }
}