//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
// Adapted from https://github.com/nature-of-code/
// released under MIT license

//global balls variable
var balls;
balls = [];
value = 0;
var rectangle;

var cols; 


////////////////////////////////////////////////////
function setup() {
  createCanvas(900, 600);
  //ball = new Ball();


  for (var i = 0; i < balls.length; i++) {
    balls.push(new Ball());
  }
  console.log(balls)

  

}
////////////////////////////////////////////////////
function draw() {
  rectMode(CENTER);
  //changeable background color
  background(value);

  //draws red rectagnle beneath the balls
  fill(150, 0, 0)
  rectangle = rect(width/2, height/2, 150, 150);

  var cols = color(0, 153, 255); 
  cols.setAlpha(90 + 90 * sin(1000));

  // for loop that draws each ball in the 'balls' array
  for (var i = 0; i < balls.length; i++) {
    var gravity = createVector(0, 0.1);
    var friction = balls[i].velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.01);
    balls[i].applyForce(friction);
    balls[i].applyForce(gravity);
    balls[i].run()
    //console.log(balls[i])
  }

  //add button options title
  addTitle();


  //rectangle
  
  //ball.run();
}
//////////////////////////////////////////////////////
class Ball {

  constructor(x, y){
    this.velocity = new createVector(random(-3,3), random(-3,3));
    this.location = new createVector(x, y);
    this.acceleration = new createVector(0, 0);
    this.size = random(10, 40);

    //rectangle vector
    this.rect = new createVector(width/2, height/2);
    this.rectSize = (150, 100);

    // initial ball color (changes on impact in  checkColission)
    this.color = color(0, 153, 255); 
    this.color.setAlpha(90 + 90 * sin(1000));
  }

  run(){
    this.draw();
    this.move();
    this.bounce();
    this.checkCollision(); //checks colission and updates the color
  }

  draw(){
    fill(this.color);
    noStroke();
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  checkCollision() {
    if (dist(this.rect.x, this.rect.y,this.location.x, this.location.y)<this.rectSize) {
      print("colission");
      //change color after colission
      this.color = color(128, 255, 191); 
      this.color.setAlpha(90 + 90 * sin(1000));
    }
  }

  move(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  bounce(){
    if (this.location.x > width-this.size/2) {
          this.location.x = width-this.size/2;
          this.velocity.x *= -1;
    } else if (this.location.x < this.size/2) {
          this.velocity.x *= -1;
          this.location.x = this.size/2;
    }
    if (this.location.y > height-this.size/2) {
          this.velocity.y *= -1;
          this.location.y = height-this.size/2;
    }
  }

  applyForce(force){
    this.acceleration.add(force);
  }
}

function mouseDragged() {
  balls.push(new Ball(mouseX, mouseY));
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    balls = [];
  } else if (keyCode === RIGHT_ARROW) {
    if(value === 0){
      value = 255;
    } else if (value = 255){
      value = 0;
    }
  }
}

// Function that draws the title and subtitle
function addTitle() {
  this.title = 'Hackit: Particles'
  this.subTitle = 'Press mouse to add perticles'
  this.subTitle2 = 'Press "<-" to clear particles or "->" to change background color'
  fill(0, 172, 230);
  noStroke();
  textAlign('center', 'center');
  textSize(16);
  text(this.title,width/2,height/20);
  textSize(12);
  text(this.subTitle,width/2,height/13);
  text(this.subTitle2,width/2,height/9);
};
