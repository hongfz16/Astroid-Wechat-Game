import Constant from '../constant/constant.js'

class Point{
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }
  distance(pos){
    return Math.sqrt((this.x-pos.x)*(this.x-pos.x) + (this.y-pos.y)*(this.y-pos.y));
  }
  rotate(angle = 0) {
    [this.x, this.y] = [this.x * Math.cos(angle) - this.y * Math.sin(angle),
                        this.x * Math.sin(angle) + this.y * Math.cos(angle)];
  }
  add(xdelta, ydelta) {
    this.x += xdelta;
    this.y += ydelta;
  }
}

class Circle{
  constructor(x = 0, y = 0, r = 1){
    this.center = new Point(x, y);
    this.radius = r;
  }
  checkCollision(constant, cir) {
    let p0 = new Point(this.center.x, this.center.y);
    let p1 = new Point(cir.center.x, cir.center.y);
    if (p0.x - p1.x > constant.gameCor.width / 2)
      p1.x += constant.gameCor.width;
    else if (p1.x - p0.x > constant.gameCor.width / 2)
      p0.x += constant.gameCor.width;
    
    if (p0.y - p1.y > constant.gameCor.height / 2)
      p1.y += constant.gameCor.height;
    else if (p1.x - p0.x > constant.gameCor.height / 2)
      p0.y += constant.gameCor.height;
    return (p0.distance(p1) < this.radius + cir.radius);
  }
}

class Vector2d{
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  length(){
    return Math.sqrt(this.x*this.x+this.y*this.y);
  }
  normalize(len = 1){
    const l = this.length();
    this.x = (this.x/l*len);
    this.y = (this.y/l*len);
  }
  rotate(angle = 0){
    [this.x, this.y] = [this.x*Math.cos(angle)-this.y*Math.sin(angle),
                        this.x*Math.sin(angle)+this.y*Math.cos(angle)];
  }
}

export  {Point, Circle, Vector2d}