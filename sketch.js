let mouseDown=false;
let planets=[]
let setMass= 100
let setRadius=5
let startPos
let setVelocity
let G = 6.67408
let scrw 
let scrh 
let maxVel = 2
let paused = false
let maxPlanets = 100

function keyPressed() {
  if (keyCode==32) {
    paused=!paused;
  }
}


function mousePressed(){
  startPos=createVector(mouseX,mouseY)
  setVelocity = createVector(0,0)
  mouseDown=true;
}

function mouseClicked(){
  if (planets.length>maxPlanets) planets.shift();
  planets.push(new Planet(startPos.x,startPos.y,setMass,setRadius,setVelocity.x/10,setVelocity.y/10,false,random(255),random(255),random(255)))
  mouseDown=false;
}

function createPlanet(){
  if (planets.length>maxPlanets) planets.shift();
  planets.push(new Planet(mouseX,mouseY,setMass,setRadius,0,0,false,random(255),random(255),random(255)))
  mouseDown=false;
}

function gravity(g,m1,m2,r){
	return (g*m1*m2)/(r==0?0.0001:r)**2
}

function f2a(f,m){
	return f/m
}

function planet(){
  for(let p of planets){
    let f = createVector(0,0)
    if(planets.length>1){
      
      for(let px of planets){
        if (p!=px&&!p.skip&&!px.skip){
          let d = dist(p.pos.x,p.pos.y,px.pos.x,px.pos.y)
          if (false){
            p.velocity=createVector(-p.velocity.x,-p.velocity.y)
            let a = p.velocity.angleBetween(px.velocity)
            p.velocity=p.velocity.rotate(random)
            break;
          }
          if(abs(d)<5) continue
          let a = atan2(px.pos.y-p.pos.y,px.pos.x-p.pos.x)
          let gx = gravity(G,p.mass,px.mass,d)
          let fx = createVector(f2a(gx,p.mass),0).rotate(a)
          fx.mult(0.1)
          if(d*2>p.radius+px.radius&&d>50)f=p5.Vector.add(f,fx)
          else f=p5.Vector.add(f,-fx)
          
        }
      }
    }
    p.velocity=p5.Vector.add(p.velocity,f)
    
        
  }
}

function mouseReleased(){
  mouseDown=false;
}

function setup() {
  scrw = windowWidth
  scrh = windowHeight
  createCanvas(scrw, scrh);
  startPos=createVector(0,0)
  setVelocity=createVector(0,0)
}

function draw() {
  if(keyIsDown(38)) {setMass+=10;setRadius+=0.2}
  if(keyIsDown(40)) {setMass-=10;setRadius-=0.2}
  if(keyIsDown(90)) {planets.pop()}
  
  background('rgba(0,0,0, 0.2)');
  text(setMass,5,10)
  if(!paused){
  planet()  
  }
  if(mouseDown){
    setVelocity = createVector(mouseX,mouseY).sub(startPos)
    let endPos = startPos.copy().add(setVelocity)
    stroke("ff0000")
    line(startPos.x,startPos.y,endPos.x,endPos.y)
  }
  if(keyIsDown(16)){
    createPlanet()
  }
  
  
  for(p of planets){
    if (!paused){
    p.pos=p5.Vector.add(p.pos,p.velocity)
    p.pos=createVector((p.pos.x+scrw)%scrw,(p.pos.y+scrh)%scrh)
    p.skip=false
    }
    p.show()
    
  }
    
  
}


