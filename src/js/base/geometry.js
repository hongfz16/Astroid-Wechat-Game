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
  checkCollision(cir){
    return (this.center.distance(cir.center) < this.radius + cir.radius);
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