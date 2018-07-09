import Sprite from "../base/sprite";

export class Player extends Sprite{
  constructor(x = 0, y = 0, r = 5, angle = 0){
    super(x, y, r);
    this.angle = angle;
    this.acc = new Vector2d();
  }

  drawtoCanvas(ctx){
    const width = canvas.width;
    const height = canvas.height;
    
  }

  shoot(){
    let bullet_vel = new Velocity();
    bullet_vel.x = Math.cos(this.angle);
    bullet_vel.y = Math.sin(this.angle);
    bullet_vel.normalize(Bullet_speed*());
    const b = new Bullet(this.getX(), this.getY(), Bullet_radius, bullet_vel.x, bullet_vel.y);
    return b;
  }

  updatePosition(){
    this.setPosition(this.getX()+this.vel.x,
                     this.getY()+this.vel.y);
    this.setVelocity(this.vel.x*0.9, this.vel.y*0.9);
    this.setAcceleration(0, 0);
    
    this.angle = 0;
  }
  
  setAcceleration(x, y){
    this.acc.x = x;
    this.aaa.y = y;
  }
}