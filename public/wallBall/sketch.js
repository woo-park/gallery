
//variables
let w = 800;                            
let h = 600;

let top_wall = 20;                      // wall thickness
let left_wall = 20;
let right_wall = 20;

let paddleWidth = 200;                  //size
let paddleHeight = 10;    

let paddleX =  w/2 - paddleWidth/2;     //set initial position
let paddleY = h - paddleHeight;        

let image_object;       // image var
let objectX;
let objectY;

let desiredX = 250;     // not used
let desiredY = 250;

let text_font_size = 120;
let counter = 0;
let textX = w/2;
let textY = h/2;

let miss_font_size = 30;
let miss_counter = 0;
let miss_textX = w - 120;
let miss_textY = 60;

//ball movement vars

let paddleX_speed = 0;
let accel = 2;
let speed = 8;

let bMultiplier = 1.2;
let vMultiplier = 0.007;     //doesn't do much

let random_speedX;
let random_speedY;

// let ball_speedX;
// let ball_speedY;

let posX;               //position of ball
let posY;

let dirX = 1;           //direction
let dirY = 1;



// let value;
function setup(){
    // value = alpha(102); // Sets 'value' to 102
    ref = createCanvas(w,h);
    centerItAll()
    image_object = loadImage("./coin.png")
    imageMode(CENTER);
    noStroke();
    ellipseMode(CENTER);

    random_speedX = 0;      //starts with zero move
    random_speedY = 0;
    
    posX = w/2;             //starts in the middle
    posY = h/2;


    // where is the coin?
    objectX = random(45, width-45);
    objectY = random(45, height-45);

    textSize(text_font_size);
    textAlign(CENTER, CENTER);

    // counter
} // end of setup

let movePaddle = () => {
    //moving left and right using a & d
    if( keyIsDown(65) ) {
        // paddleX_speed -= accel;     //not useful in this scenario
        paddleX -= speed;
    }

    if(keyIsDown(68)) {
        // paddleX_speed += accel;
        paddleX += speed;
    }
}

let direction = 1;

function draw(){
    background('azure');
    // tint(255, 127); // Display at half opacity
    fill('royalblue');
    rect(0,0,left_wall,h); //left
    rect(0,0,w,top_wall); //up
    rect(w-right_wall,0,right_wall,h);  //right

    //paddle
    rect(paddleX, paddleY, paddleWidth, paddleHeight); 

    movePaddle();

    // paddleX_speed = constrain(paddleX_speed, -10, 10);
    // paddleX += paddleX_speed            //update the paddleX positionX

    push()
    
    fill(0, 102, 153, 120);

    textSize(miss_font_size);
    text("Misses:" + miss_counter, miss_textX, miss_textY)
    pop()

    push()
    fill(0, 102, 153, 120);
    
    text("Points: "+ counter, textX, textY)
    
    pop()
    
    //restrict movement of paddle x
    random_speedX = constrain(random_speedX, -10, 10);
    random_speedY = constrain(random_speedY, -10, 10);

    // random_speedX = random_speedX;    //hm
    // random_speedY = random_speedY;

    ellipse(posX,posY,10,10)
    
    posX += random_speedX * dirX; 
    posY += random_speedY * dirY;

    paddleX = constrain(paddleX, 0 + right_wall, w - paddleWidth - left_wall)   

    if(posX > (width - right_wall)){        //right wall
        direction *= -1;
        posX = width - right_wall;
        dirX *= -1;
        random_speedX = random_speedX * bMultiplier;
        // ball_speedX -= accel;
        // ball_speedX *= 2;
        console.log(random_speedX)
        boing.play();
        console.log(direction, 'direction')
    }

    if(posX < 0 + left_wall){               //hit left wall
        direction *= -1;
        posX = 0 + left_wall;
        dirX *= -1;
        random_speedX = random_speedX * bMultiplier;
        // ball_speedX += accel;
        // ball_speedX *= 2;
        // console.log(ball_speedX)
        boing.play();
        console.log(direction, 'direction')
    }


    if( posY < 0 + top_wall) {          //   top wall      //make y sit right infront of the paddle
        posY = 0 + top_wall;
        dirY *= -1;

        random_speedY = 1 + random_speedY * bMultiplier;
        console.log(random_speedY)
        boing.play();
    }

   
    
    //ball pos x and y and paddle width and height
    if (posX > paddleX && posX < paddleX + paddleWidth && posY > paddleY) { // in between paddle width & below or equal to paddleY pos
        // ball_speedY *= 2;
        posY = paddleY;      // just ensures that the ball doesn't get stuck inside the paddle
        if(posX > paddleX && posX < paddleX + paddleWidth/2) {        //left side
            // if(dirX > 0){               //left side coming from left to right
            // // dirX = Math.abs(dirX) * -1        //how do i ensure the dirX is negative
            //     console.log(dirX,'whgat is happening')
            //     dirX = Math.abs(dirX)
            //     dirY *= -1;
               
            // } else {
            //     dirX = Math.abs(dirX)
            //     dirY *= -1;
            // }    
            // console.log(dirX,'dirx')
            // if(direction > 0){
            //     dirX *= -1
            // } else {
                dirX = Math.abs(dirX) * -1
            // }
            dirY *= -1;
            console.log('left side')
            random_speedY += Math.random(-6,6)
            random_speedX += Math.random(-6,6)
            // console.log(direction, 'direction')
        }
        if(posX > paddleX + paddleWidth/2 && posX < paddleX + paddleWidth) {       //rigth side
            // dirX = Math.abs(dirX)
            
            
            // if(dirX < 0) {      // right side coming from right to left
            //     dirX *= -1;             
            //     dirY *= -1;
            // } else {
                
            //     dirX *= 1;
            //     dirY *= -1;
            // }

            // if(direction < 0){
            //     dirX *= -1;
            // } else {
                dirX = Math.abs(dirX)           //over thought about it...
            // }
            dirY *= -1;
            console.log('right side')
            random_speedY += Math.random(-6,6)
            random_speedX += Math.random(-6,6)
            // console.log(dirX,'dirx')
        }
        boing.play();
    }
    
    // ball out of bound
    if( posY > h) {
        posX = w/2
        posY = h/2
        random_speedX = 0;
        random_speedY = 0;
        // random_speed = random(-4, 4)
        miss_counter += 1;
        sound1.play();
    }
    
    image(image_object, objectX,objectY)

    if(dist(posX, posY, objectX, objectY) < 27 ) {
        objectX = random(45, width-45);
        objectY = random(45, height-45);
        pokemon.play();
        setTimeout(() => {
            pokemon.stop()
        }, 6000);
        counter += 1;
    }

    // figure out the x distance between the chars  //for testing purposes //let it off
    // testing(posX, posY);

} //draw function

function preload() {
    boing = loadSound("./boing.mp3");
    sound1 = loadSound("./falling.mp3")
    pokemon = loadSound("./kaching.mp3")
}

function mousePressed(){
    pokemon.stop()
    sound1.stop()
    posX = w/2;                 //restart from the center
    posY = h/2; 
    random_speedX = random(4);
    random_speedY = random(8);
    // let follow = dist(posX, posY, mouseX, mouseY) * 0.2 
    // posX += follow;
    // posY += follow;
}


function windowResized() {    //execute whenever window is resized
    centerItAll()
}

function centerItAll() {
    ref.position(windowWidth/2 - (width/2), windowHeight/2 - (height/2))
}


let testing = () => {
    let xDist = desiredX - posX
    let yDist = desiredY - posY

    //move the caracter %5 of the way towards its destination

    posX += xDist * 0.05
    posY += yDist * 0.05
    
    if(mouseIsPressed == true) {
        desiredX = mouseX;
        desiredY = mouseY;
    }
}




// (0.5 points) A background image or solid color

// (0.6 points) Add three visual borders to your game screen (up, left, and right)

// Create a user controlled paddle which will include the following functionality:

// (0.5 points) A visual paddle (rectangle or image)

// (1.0 points) The ability to move left and right using the A and D keys

// (1.0 points) The paddle must not move beyond the edge of the board - it should stop as soon as it reaches the left or the right border

// Create a bouncing ball which includes the following functionality:

// (0.5 points) A visual ball (ellipse or image)

// (0.4 points) The ball should initially be positioned in the middle of the screen

//qu --// (1.0 points) The ball should be assigned a random X and Y speed when the game starts

// (1.0 points) The ball should move using its assigned X and Y speed

// (1.0 points) If the ball hits the left or right border it should "bounce" and reverse its X speed.

// (0.5 points) If the ball hits the top border it should "bounce" and reverse its Y speed

//qu -- how accurate does it has to be // (0.5 points) If the ball hits the paddle it should "bounce" and reverse its Y speed

// (0.5 points) If the ball moves off the bottom of the screen (i.e. the paddle misses the ball) the ball should reposition itself in the middle of the screen and pick a new random X and Y speed (essentially the game resets itself)

// (1.5 points) Start off the ball with an initial speed of 0. When the mouse is pressed the ball selects a random speed and begins moving. Every time the ball is "lost" it should reposition itself back in the middle of the screen with a speed of zero - only after clicking the mouse does the ball begin moving.

// Create an objective that the user will try to aim the ball toward. This item should include the following:

// (0.5 points) The objective should have a visual appearance (image)

// (1.0 points) The objective should pick a random position to start at. The position should not overlap any border nor should it be within 200 or so pixels of the bottom of the screen.

// (1.0 points) The objective should check to see if the ball has gotten close to it - if so, the objective should pick a new position on the screen.

// phase 2
// (1.0 points) Add in a "points" counter - every time the ball hits the objective the user should gain 1 point. Display points somewhere on the screen.

// (1.0 points) Add in a "misses" counter - every time the ball springs past the paddle and leaves the bottom of the screen you should increase the # of misses. Display misses somewhere on the screen.

// (0.5 points) Cause a sound to play every time the ball bounces

// (0.5 points) Cause a sound to play every time the ball intersects the objective

// (0.5 points) Cause a sound to play every time the ball misses (i.e. falls off the bottom of the screen)

// (1.75 points) Cause the ball to bounce slightly differently when it hits the left or right side of the paddle. If the ball hits the left side of the paddle it should bounce such that it moves to the left (X direction negative). If it hits the right side of the paddle it should bounce such that it moves to the right (X direction positive).

// (1.75 points) Add in a bit of variation whenever the ball bounces. For example, the ball could speed up a small amount every time it bounces, or it could change X or Y direction slightly.

