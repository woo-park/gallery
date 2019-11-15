let world
let particles = []


function setup() {
  noCanvas();

  world = new World('VRScene');

}


function draw() {
  for( let i = 0; i < particles.length; i ++) {
    let allGone = particles[i].move()
    if (allGone) {
      particles.splice(i, 1)
      i--
    }
  }
}

class Mover {
  constructor(){
    this.size = 1;
    this.ball = new Sphere({
      x:x, y:y, z:z,
      red: random(255), green: random(255), blue: random(255),
      // radius: 0.2
      radius: 1
    })
    world.add(this.ball)
    this.xSpeed = random(-0.2, 0.2)
    this.ySpeed = random(-0.2, 0.2)
    this.zSpeed = random(-0.2, 0.2)
  }

  move () {
    this.ball.nudge( this.xSpeed, this.ySpeed, this.zSpeed )
    this.size -= 0.01
    this.ball.setRadius(this.size)

    if(this.size <= 0) {
      world.remove( this.ball )
      return true
    }
    return false
  }


}

/*
no keyboard controls allowed
primitive 5 shapes
texture
composite obj with multi childs  -- container rotating
sound
3d model
object oriented programming
user's touch
sky - extra credit

*/
