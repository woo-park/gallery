// // setup function - used for commands that need to run only once

let seeds = [];

let global_toggle;
function setup() {
    createCanvas(800, 600);
    global_toggle = true;
}

// draw function - used for commands that need to be repeated
function draw() {
    
    background(135, 206, 235);
 
    for (let i = 0; i < seeds.length; i ++) {           //################################################################
        // global_toggle = true;
        seeds[i].moveAndDisplay();
        seeds[i].bloat();
        seeds[i].stem();
        seeds[i].center();
        seeds[i].faster();    
        
    }
    

    ground();
    
    

}

function mousePressed() {                                   //################################################################
    if (global_toggle == true) {
        seeds.push( new Seed(mouseX, mouseY) );
    }
    
    // mouseIsPressed = false;
}

function ground() {
    noStroke();
    fill(color(186, 184, 108));
    rect(0, 500, 800, 100);
}

class Seed {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;                //initial seed width
        this.increment = 0.05;          //speed of bloating
        this.color = color(0,0,0);
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
        this.a = 50;
        this.ran_color = color(this.r, this.g, this.b); 
        this.ran_color2 = color(this.r, this.g, this.b, this.a); 
        this.ran_radius = Math.floor(Math.random() * 20);
        this.ySpeed = 1;                //same speed falling
        this.bloated = false;           //triggers stem after it grows
        
        this.stem_ySpeed = 1;
        // this.stem_max_height = this.y - Math.floor(Math.random() * 50) - 100;    // !question: do i have set a minimum // i did - 100 and random val -
        this.ground_point = 500;
        this.stem_max_height = this.ground_point - Math.floor(Math.random() * 200) - 100;    // !question: do i have set a minimum // i did - 100 and random val - //hm this works better
        this.stem_height = this.ground_point;      //they start at the same pos then it grows out with yspeed
        // console.log(this.stem_max_height);

        this.stem_finished = false;
        this.radius_increment = 0.1;
        this.center_radius = 0;

        this.angle = 0;

        this.top = 0;
        this.bottom = 0;
        this.left = 0;
        this.right = 0;
        this.petal_increment = 0.5;
       
    }
    
    moveAndDisplay() {                              //################################################################
        
        push();
        noStroke();
        fill(this.color)
        ellipse(this.x, this.y, this.radius, this.radius);
        pop();
        
        if(this.y <= this.ground_point) {
            this.y += this.ySpeed;
            if(this.y == this.ground_point){
                this.ySpeed = 0;
            }
            
        } else if(this.y > this.ground_point) {
            this.ySpeed = 0;
            this.y = this.ground_point;
            
        }
        
    }

    bloat() {
        if(this.y == this.ground_point) {
            this.radius += this.increment;
            this.radius = constrain(this.radius, 0, 20)
            if (this.radius == 20) {
                this.bloated = true;
                this.increment = 0;
            }
        }
    }

    stem() {
        if(this.bloated == true) {
            
            stroke(0);
            line(this.x, this.ground_point, this.x, this.stem_height); 
            this.stem_height -= this.stem_ySpeed;   
            this.stem_height = constrain(this.stem_height, this.stem_max_height, this.ground_point)
            if (this.stem_height == this.stem_max_height) {
                this.stem_finished = true;
            }
        }
    }

    center() {
        let sequence = new Promise( (resolve, reject) => {      //center
            if(this.stem_finished) {
                push();
                noStroke();
                fill(this.ran_color);
                ellipseMode(CENTER);
                ellipse(this.x, this.stem_height, this.center_radius, this.center_radius)
                this.center_radius += this.radius_increment;
                this.center_radius = constrain(this.center_radius, 10, 10 + this.ran_radius)
                pop();
                if(this.center_radius == (10 + this.ran_radius)) resolve('Success!');
            }
        });
          
        sequence.then((value) => {
            
            push();

            
            translate(this.x, this.stem_height);
            rotate(radians(this.angle));
            rectMode(CENTER)
            
            fill(this.ran_color2);
            rect(0,0, this.center_radius, this.top)
            rect(0,0, this.center_radius, this.bottom)
            rect(0,0, this.left, this.center_radius)
            rect(0,0, this.right, this.center_radius)
            
            pop();
            
        
        }).then(()=>{
            this.angle+=1;
            this.top += this.petal_increment;
            this.bottom += this.petal_increment;
            this.left += this.petal_increment;
            this.right += this.petal_increment;

            this.top = constrain(this.top, 0, this.center_radius * 2)
            this.bottom = constrain(this.bottom, 0, this.center_radius * 2)
            this.left = constrain(this.left, 0, this.center_radius * 2)
            this.right = constrain(this.right, 0, this.center_radius * 2)

            
        }).then(() => {                                             //################################################################
            if (dist(mouseX, mouseY, this.x, this.stem_height) < this.center_radius) {      //new color but coultn' make the seed dropping stop
                global_toggle = false;
                if(mouseIsPressed){
                    this.r = random(255);
                    this.g = random(255);
                    this.b = random(255);
                    this.ran_color = color(this.r, this.g, this.b); 
                    this.ran_color2 = color(this.r, this.g, this.b, this.a); 
                 
                    
                }
                
            }
            global_toggle = true;
                    
        })
        

    }

    faster() {
        if( dist(this.x, this.stem_height, mouseX, mouseY) < this.center_radius + 20) {
            this.angle += 5;
            // console.log('near!')
        }

    }

}

// •	A background (sky) and foreground (ground)
// •	The user should be able to click anywhere above the ground to drop a "seed" - seeds will begin slowly falling until they reach the grassy area.
// •	Once a seed reaches the ground it should stop falling and begin to expand into a dirt mound.
// •	When the dirt mound gets sufficiently large the seed should sprout a stalk that grows to a random height.
// •	Once the stalk finishes growing a randomly colored center to a flower should grow at the top of the stalk.
// •	Once the flower center has grown a series of petal should grow. The petals should slowly rotate in the breeze.
// Here are some hints to get you started:
// •	Start by creating a class for your seed. What will it need to know when it is constructed? Will it have multiple states (big hint!)
// •	Begin without any user interaction - simply create a single Seed object in the middle of the screen. Next, extend this object so that it falls. When it reaches the bottom it will need to begin to expand into a dirt mound. You can probably do this with a "state" - when the seed gets to a certain position it should switch into its "dirt mound" state.
// •	Prototype the life cycle of your seed all the way up to its "petal" stage. Once you're happy with a single seed you can begin to add in the logic to support multiple seeds. You will need an array to do this.
// If you want to go above and beyond here are some other suggestions (but they aren’t required) - you can earn a small amount of extra credit for implementing one or more of these features. Extra credit will be applied to your midterm exam score.

// •	Make the flowers respond to the mouse once they are fully grown. When the mouse is close to them they should spin faster.
// •	If the user clicks on a flower it should pick a new color. When this happens a new seed should not be dropped.
// •	Flowers should degrade after a period of time once they are fully grown. Degraded flowers should shrink back down and eventually disappear from the world.
// •	Add in a computer-controlled character (a bee?) that visits the flowers and/or interacts with them in some way.
