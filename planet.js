class Planet{
  constructor(x,y,m,rad,vx,vy,skip,r,g,b){
    this.pos=createVector(x,y);
    this.mass=m;
    this.radius=rad;
    this.velocity=createVector(vx,vy);
    this.skip=skip
    this.colour=color(r,g,b)
  }
  show(){
    //stroke("ff0000")
    noStroke()
    //fill("ff0000")
    fill(this.colour)
    circle(this.pos.x,this.pos.y,this.radius*2)
  }
  
  isColliding(other){
    let d = dist(this.pos.x,this.pos.y,other.pos.x,other.pos.y)
    if(d<=this.radius+other.radius)return true
    return false
  }

}
