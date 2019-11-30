/*

feedback1 from Craig

array for color - said each line contain color which then shifts - needs to be in shiftright() as well
array for noise - said each line should have each noise val - don't get that but
amplitude corresponds with the angle increment
    so if amplitude gets higher, angle incre needs to get lower
    use map() to do this

checkout noaa and openweather 

to make color shift from one wave's peak to another's peak,
you push color inside addnoise() if condition -- not entirely sure, but play around with it
but we saw each line can have their own random color


*/


//global
lines_y1 = [];                         // Mimicking float[] y = new float[1400];  
lines_y2 = [];                         // Need to shift y1 & y2
angles = [];
color_array = [];
let wave1;

for(let j = 0; j < 500; j ++) {
    lines_y1.push(null)
    lines_y2.push(null)
    angles.push(null)
    color_array.push(null)
}                                   

function setup() {
    createCanvas(800, 600);
    noiseDetail(24);
}


function draw() {    
    background(135, 206, 235);
    // frameRate(8)

    // if (frameCount % 2 == 0){
        
    //  if(mouseIsPressed){
    //     wave1.addNoise();
    // }
        wave1 = new WaveGen();

        shiftRight();
        wave1.addNoise();
        wave1.displayLines();
        
        
    // }
    console.log(frameRate())

   
}


function shiftRight() {
    for(let i = lines_y1.length - 1; i > 0; i -= 1) {        //lines - refer to how many lines will be drawn
        lines_y1[i] = lines_y1[i-1];  
        lines_y2[i] = lines_y2[i-1];                         // 1st becomes 2nd, 98 becomes 99, and so on                           
        color_array[i] = color_array[i-1]
    }
    // console.log(lines_y1[0])
}


let angle = 0.0;
// let amplitude = 20;         //
let angleIncre = 0;         //question: can't have this inside for some reason

class WaveGen{
    constructor(offset = 300, amplitude = 50, line_length = 200, exponential = 1.4, noise_default = 3.8) {
        this.noiseOffset = random(1000,2000);
        this.offset = offset;
        this.amplitude = amplitude;         //height of the wave && map noise returned value determines the height
        this.line_length = line_length;     //from y1 to y2
        this.exponential = exponential
        this.noise_default = noise_default;
        this.adding_noise = 0.3
        
        this.test_sine = sin(angleIncre % (2 * PI))

        this.random_jump = random(-20,20);
        
    }

    // controlNoise() {        //not working
    //     this.noise_default = map(mouseX, 0, width, 0, 14);
    // }
    //noaa //look it up// public
    addNoise() {
        
         // let xAngle = map(mouseX, 0, width, 0, 1, true);
        // let yAngle = map(mouseY, 0, height, -8 * PI, 8 * PI, true);

        //hm try finding sin func arg range and then place adding_noise inthe sin curve; //should work right?
        // this.adding_noise = map( noise(this.noiseOffset), 0, 1, this.noise_default, 0); 
       
        // console.log(this.noise_default)
        
        // console.log(this.test_sine);
        if (this.test_sine > -1 && this.test_sine < 0.5) {           //
            rect(340, 40, 20, 20);     
            //push to color_array
            stroke("rgba(0%,100%,100%,0.6)"); // not being applied bc i am explicitly saying 0 is blue and pushing back
            // this.adding_noise = map( noise(this.noiseOffset), 0, 1, 14, 0);
            this.adding_noise = map( noise(this.noiseOffset), 0, 1, this.noise_default, 0); 
        } else if (this.test_sine > 0.5 && this.test_sine < 1){
            rect(540, 40, 20, 20);
            stroke("rgba(100%,0%,100%,0.6)"); //
            this.adding_noise = map( noise(this.noiseOffset), 0, 1, this.noise_default, 0);         //try 14
            // this.adding_noise = map( noise(this.noiseOffset), 0, 1, 14, 0);
        } else {
            console.log('outta bound')
        }
        //ultimate !question - if i make height larger -- how do i make the length widen as well and slow down the moving


        // if (this.test_sine > -1 && this.test_sine < -0.999) {           //very bottom point
        //     // stroke("rgba(0,0,0,0.5)");
        //     this.adding_noise = map( noise(this.noiseOffset), 0, 1, -3, 6);
        // }
        // else if (this.test_sine > 0.999 && this.test_sine < 1) {           //very top point
        //     // stroke("rgba(0,0,0,0.5)");
        //     // stroke('black')
        //     this.adding_noise = map( noise(this.noiseOffset), 0, 1, -3, 6);
        // } else {                                             //everything that happens in between points
        //     // stroke("rgba(100%,0%,100%,0.2)");
        //     strokeWeight(4);
        //     rect(20, 20, 60, 60);                           //for testing purpose
        //     this.adding_noise = map( noise(this.noiseOffset), 0, 1, -3, 6)
        // }
    }
 
    displayLines() {
        
       
        beginShape(LINES);
        //test noise

        //another array -- 
        lines_y1[0] = this.offset + this.test_sine * (this.amplitude * this.adding_noise)                         //top x,y
        lines_y2[0] = this.offset + this.test_sine * (this.amplitude * this.adding_noise) + this.line_length           //bot x,y
        color_array[0] = stroke("rgba(0%,100%,100%,0.6)"); 
        // console.log(this.offset + sin(angleIncre) * amplitude,'sin curve');

        angleIncre += 0.008;              // 0.03 to 0.09 to 0.1  //spikes// the higher it gets, shorter period
        this.noiseOffset += 0.001;                       //question: where would be the best to put this?

        for(let i = 1; i < lines_y1.length; i += 1) {

            let x1 = i;
            let x2 = pow(i, this.exponential);
            // stroke(color_array[i])
            //another array - keep track of colors of each wave form -- parellel -- shift color array as well
            vertex( x1, lines_y1[i]);
            vertex( x2, lines_y2[i]);
            // line(i, lines[i] + sin(angle) * amplitude, pow(i, line_padding), lines[i] + (length + sin(angle) * amplitude) )
        }
        endShape();
    }
}


// #################################################################################### //

// center() {
//     let sequence = new Promise( (resolve, reject) => {      //center
//         if(this.stem_finished) {
//             push();
//             noStroke();
//             fill(this.ran_color);
//             ellipseMode(CENTER);
//             ellipse(this.x, this.stem_height, this.center_radius, this.center_radius)
//             this.center_radius += this.radius_increment;
//             this.center_radius = constrain(this.center_radius, 10, 10 + this.ran_radius)
//             pop();
//             if(this.center_radius == (10 + this.ran_radius)) resolve('Success!');
//         }
//     });
      
//     sequence.then((value) => {
        
//         push();

        
//         translate(this.x, this.stem_height);
//         rotate(radians(this.angle));
//         rectMode(CENTER)
        
//         fill(this.ran_color2);
//         rect(0,0, this.center_radius, this.top)
//         rect(0,0, this.center_radius, this.bottom)
//         rect(0,0, this.left, this.center_radius)
//         rect(0,0, this.right, this.center_radius)
        
//         pop();
        
    
//     }).then(()=>{
//         this.angle+=1;
//         this.top += this.petal_increment;
//         this.bottom += this.petal_increment;
//         this.left += this.petal_increment;
//         this.right += this.petal_increment;

//         this.top = constrain(this.top, 0, this.center_radius * 2)
//         this.bottom = constrain(this.bottom, 0, this.center_radius * 2)
//         this.left = constrain(this.left, 0, this.center_radius * 2)
//         this.right = constrain(this.right, 0, this.center_radius * 2)

        
//     }).then(() => {                                             //################################################################
//         if (dist(mouseX, mouseY, this.x, this.stem_height) < this.center_radius) {      //new color but coultn' make the seed dropping stop
//             global_toggle = false;
//             if(mouseIsPressed){
//                 this.r = random(255);
//                 this.g = random(255);
//                 this.b = random(255);
//                 this.ran_color = color(this.r, this.g, this.b); 
//                 this.ran_color2 = color(this.r, this.g, this.b, this.a); 
             
                
//             }
            
//         }
//         global_toggle = true;
                
//     })
    

// }