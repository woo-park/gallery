/*

feedback1 from Craig

array for color - said each line contain color which then shifts - needs to be in shiftright() as well
array for noise - said each line should have each noise val - don't get that but
amplitude corresponds with the angle increment
    so if amplitude gets higher, angle incre needs to get lower         //lets use mouseX val for input for now
    use map() to do this

checkout noaa and openweather 

to make color shift from one wave's peak to another's peak,
you push color inside addnoise() if condition -- not entirely sure, but play around with it
but we saw each line can have their own random color


*/

let temp_noise;
let temp_noise2;
let increase = 0
//global
lines_y1 = [];                         // Mimicking float[] y = new float[1400];  
lines_y2 = [];                         // Need to shift y1 & y2
angles = [];
color_array = [];
noise_array = [];
let wave1;
tracker = [];

for(let j = 0; j < 500; j ++) {
    lines_y1.push(null)
    lines_y2.push(null)
    angles.push(null)
    color_array.push(null)
    noise_array.push(null)
    tracker.push(null) //not being used
}                                   

function setup() {
    createCanvas(800, 600);
    noiseDetail(24);
    temp_noise = 0;
    temp_noise2 = 0;
}


function draw() {    
    background(135, 206, 235);
    // frameRate(8)

    // if (frameCount % 2 == 0){
        
    //  if(mouseIsPressed){
    //     wave1.addNoise();
    // }
        
        wave1 = new WaveGen();
        wave1.amplitude_change();
        shiftRight();
        wave1.addNoise();
        wave1.displayLines();
        
        
    // }
    // console.log(frameRate())

   
}


function shiftRight() {
    for(let i = lines_y1.length - 1; i > 0; i -= 1) {        //lines - refer to how many lines will be drawn
        lines_y1[i] = lines_y1[i-1];  
        lines_y2[i] = lines_y2[i-1];                         // 1st becomes 2nd, 98 becomes 99, and so on                           
        color_array[i] = color_array[i-1]
        noise_array[i] = noise_array[i-1]
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
        
        //changing amp
        this.mapping_amplitude;
        this.mapping_angle = 0.009;

        this.x1;
        this.x2;
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
        // if(this.test_sine > 0.5 && this.test_sine < 0.52) {     //ping once on the top, once on the bototm
        //     temp_noise = map( noise(this.noiseOffset), 0, 1, 0, 0.1);
        //     console.log('ping')
        // }
        
        if (this.test_sine > -1 && this.test_sine < -0.9999) {           //very bottom point
            // stroke("rgba(0,0,0,0.5)");
            // temp_noise = map( noise(this.noiseOffset), 0, 1, 0, 0.1);
        }
        else if (this.test_sine > 0.9999 && this.test_sine < 1) {           //very top point
            // stroke("rgba(0,0,0,0.5)");
            // stroke('black')
            temp_noise2 = map( noise(this.noiseOffset), 0, 1, 0, 2);
        } 
        // if (this.test_sine > -0.5 && this.test_sine < -0.555) {           //very bottom point
        //     // stroke("rgba(0,0,0,0.5)");
        //     temp_noise = map( noise(this.noiseOffset), 0, 1, 30, 0);
        // }
        // else if (this.test_sine > 0.555 && this.test_sine < 0.5) {           //very top point
        //     // stroke("rgba(0,0,0,0.5)");
        //     // stroke('black')
        //     temp_noise2 = map( noise(this.noiseOffset), 0, 1, 30, 0);
        // } 

        // // its returning back to zero after
        // console.log(temp_noise,'tempnoise1')
        // console.log(temp_noise2,'tempnoise2')       

        // console.log(this.test_sine);
        // let temp_noise = map( noise(this.noiseOffset), 0, 1, this.noise_default, 0); 
        // let temp_noise2 = map( noise(this.noiseOffset), 0, 1, this.noise_default, 0); 

        // if (this.test_sine > -1 && this.test_sine < 0.5) {           //
        //     rect(340, 40, 20, 20);
        //     text('top',340, 100)     
        //     //push to color_array
        //     // stroke("rgba(0%,100%,100%,0.6)"); // not being applied bc i am explicitly saying 0 is blue and pushing back
        //     // this.adding_noise = map( noise(this.noiseOffset), 0, 1, 14, 0);
        //     this.adding_noise = temp_noise
        // } else if (this.test_sine > 0.5 && this.test_sine < 1) {
        //     rect(540, 40, 20, 20);
        //     text('bottom',540, 100)     
        //     // stroke("rgba(100%,0%,100%,0.6)"); //
        //     this.adding_noise = temp_noise       //try 14
        //     // this.adding_noise = map( noise(this.noiseOffset), 0, 1, 14, 0);
        // } else {
        //     console.log('outta bound')
        // }

        if (this.test_sine > -1 && this.test_sine < 1) {           //
            rect(340, 40, 20, 20);
            text('in between',340, 100)     
            //push to color_array
            // stroke("rgba(0%,100%,100%,0.6)"); // not being applied bc i am explicitly saying 0 is blue and pushing back
            // this.adding_noise = map( noise(this.noiseOffset), 0, 1, 14, 0);
            this.adding_noise = temp_noise
        } 

        //##################################################################################
        // console.log(this.x,'xx')
        // if(this.x > 400){               //this works, but use it lator
        //     console.log(this.x,'this x')
        //     if (this.test_sine > -1 && this.test_sine < 0.5) {
        //         rect(540, 40, 200, 200);
        //         this.offset = 200
        //     }     // I need another array variable that tracks where the line is drawn
        // }
        //##################################################################################
        



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
    
    amplitude_change(){
        
        //yes swell  // if amplitude is 50 -- angle incre is around 0.008 or 0.009 looks good
        //no swell // amplitude is 20 -- angle incre is around 0.03     looks good
        // so the time period is product of these two - amp and angle
        //but 0.02 looks the best for now with 20 amp default           looks good
        // amp goes up, angle goes down
        // angle goes up, amp goes down

        //for interaction
        // this.mapping_amplitude = map(mouseX, 0, width, 5, 90)
        // this.mapping_angle = map(mouseX, 0, width, 0.05, 0.005 )
        this.mapping_amplitude = map(200, 0, width, 5, 90)     //hardcoding to see it doesn't fluctuates too much  
        this.mapping_angle = map(200, 0, width, 0.05, 0.005 )
        increase += 0.4;        // or you can increment like this   //pass in the increase as arg
        console.log(frameRate())
    }   
 
    displayLines() {
        
        // console.log(this.mapping_amplitude, this.mapping_angle,'amp and angle') //checking it change as mouseX moves
        beginShape(LINES);

        //need to give noise_array[0] an initial val
            
        noise_array[0] = this.adding_noise;
        
        
        //test noise
        this.amplitude = this.mapping_amplitude;        //assigning newly changed amp to this.amplitude
        //another array -- 
        if(lines_y1[1]){ this.offset = lines_y1[1]}
        lines_y1[0] = this.offset + this.test_sine * (this.amplitude * this.adding_noise)                          //top x,y
        lines_y2[0] = this.offset + this.test_sine * (this.amplitude) + this.line_length           //bot x,y
        // color_array[0] = stroke("rgba(0%,100%,100%,0.6)"); 
        // console.log(this.offset + sin(angleIncre) * amplitude,'sin curve');

        // angleIncre += 0.009;              // 0.03 to 0.09 to 0.1  //spikes// the higher it gets, shorter period
        angleIncre += this.mapping_angle
        //!important## i don't get the noise -- i just need one noise val returned from noise curve per each wave, but its pulling loads of them and causing too much disarray

        for(let i = 1; i < lines_y1.length; i += 1) {
            
            let add_color = () => {        
                let r_normalize = map(i, 1, lines_y1.length, 37, 11)                                                    //https://www.rapidtables.com/web/color/blue-color.html color reference -- pick your blue // 	dodgerblue	#1E90FF	rgb(30,144,255)// cadetblue	#5F9EA0	rgb(95,158,160)// steelblue	#4682B4	rgb(70,130,180)                                                                                                                    
                let g_normalize = map(i, 1, lines_y1.length, 61, 50)
                let b_normalize = map(i, 1, lines_y1.length, 62,100)
                let opacity_percentile = map(i, 1, lines_y1.length, 1, 0); //normalizing based on how many lines
                color_array[0] = stroke(`rgba(${r_normalize}%,${g_normalize}%,${b_normalize}%,${opacity_percentile})`); 
                // color_array[0] = stroke(`rgba(30,144,255,${opacity_percentile})`);   // or hard code it
            }   //another array - keep track of colors of each wave form -- parellel -- shift color array as well
            add_color();
            
            this.x1 = i;
            this.x2 = pow(i, this.exponential);

            // if (tracker[i-1] > 400 ){       // once line is moved passed 400 line points
            //     rect(20,20,200,200)
            //     lines_y1[200] += 200;
            //     lines_y2[200] += 200;       //works! great// but not optimized 
            //     // this.x1 += 100;          // i need another reverse for loop that will create wave crest, then falling    //maybe draw another connecting lines here?
            // }
            // tracker[i-1] += 1
            

            vertex( this.x1, lines_y1[i]);
            vertex( this.x2, lines_y2[i]);
            // vertex( this.x1, lines_y1[i] + noise_array[i]);
            // vertex( this.x2, lines_y2[i] + noise_array[i]);
            // line(i, lines[i] + sin(angle) * amplitude, pow(i, line_padding), lines[i] + (length + sin(angle) * amplitude) )
            
        }
        
        
        endShape();
        this.noiseOffset += 0.0001;                       //question: where would be the best to put this?
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