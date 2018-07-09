import Sprite from "../base/sprite";

export class Player extends Sprite{
  constructor(x = 0, y = 0, r = 5, angle = 0){
    super(x, y, r);
    this.angle = angle;
    this.acc = 0;
  }

  drawtoCanvas(ctx){
    const width = canvas.width;
    const height = canvas.height;
    
  }

  shoot(){
    let bullet_vel = new Velocity(0, 0);
    new Bullet(this.circle.center.x, this.circle.center.y, Bullet_radius, );

  }

  updatePosition(){
    this.setPosition(this.circle.center.x+this.vel.x,
                     this.circle.center.y+this.vel.y);
    this.setVelocity(0, 0);
  }
}