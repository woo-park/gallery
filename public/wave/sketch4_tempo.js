let temp_noise;
let easing;

let increase = 0

lines_y1 = [];                         // Mimicking float[] y = new float[1400];  
lines_y2 = [];                         // Need to shift y1 & y2
angles = [];
color_array = [];
noise_array = [];

let tempo = 0;

let wave1;
tracker = [];

for(let j = 0; j < window.innerWidth - 300; j ++) {
    lines_y1.push(null)
    lines_y2.push(null)
    angles.push(null)
    color_array.push(null)
    noise_array.push(null)
    tracker.push(null) //not being used
}                                   

let stats;
function preload() {
    stats = loadTable("sample.csv");
}

let tide = [];
let swell_size = [];
let swell_periods = [];
let temp_height;

function setup() {
    temp_height = height/2;
    for(let i = 1; i < stats.getRowCount(); i++) {      //starting at one bc of headers
        tide[i - 1] = stats.getNum(i, 0);               //fixing index for tide array
        swell_size[i - 1] = stats.getNum(i, 1);
        swell_periods[i - 1] = stats.getNum(i, 2);
        
    }
    // console.log(tide, swell_size, swell_periods,'from csv')
    convert_stats(tide, swell_size, swell_periods);
    // console.log(tide, swell_size, swell_periods,'from csv')
    createCanvas(window.innerWidth - 100, window.innerHeight - 100, P2D);
    noiseDetail(24);
    temp_noise = 0.007;         //wave starting value
    easing = 1;
    console.log(tide)
}

function convert_stats(tide, swell_size, swell_periods) {
    for(let i = 0; i < stats.getRowCount(); i++) {
        // tide[i] = map(tide[i], 0, 1.7, -150, 750)                // 0.0meters to 1.7 meters
        tide[i] = map(tide[i], 0, 1.7, 0, 1)                // 0.0meters to 1.7 meters
        swell_size[i] = map(swell_size[i], 0, 12, 10, 400)     // 0 to 12 feet
        swell_periods[i] = map(swell_periods[i], 3, 15, 1, 1000 ) // 3sec to 15sec
    }    
}

let hourly_counter = 0;
let sec;
//!question!important    // so every 1000 milisec, pull new data from the array, push it on to the wave?
function draw() {    
    background(135, 206, 235);

    sec = int(millis() / 1000); 
    // console.log(int(millis() / 1000),'missisipi');
    for (let j = 0; j < 24; j += 1) {
        if (sec == j * 6) {
            hourly_counter = j;
        }
    }
    // if (sec == 0) {
    //     start_counting = 0;
    // }
    // else if (sec == 6) {
    //     start_counting = 1;
    // }
    // else if (sec == 12) {
    //     start_counting = 2;
    // }  
    // else if (sec == 18) {
    //     start_counting = 3;
    // } 
    
    console.log(hourly_counter,' :hourly_counter')
    console.log(tide[hourly_counter],' :current tide offset we are on')
    
    wave1 = new WaveGen(tide[hourly_counter], swell_size[hourly_counter], swell_periods[hourly_counter], map(mouseY, 0, height, 1.3, 1.45), tide[hourly_counter]);
    wave1.amplitude_change();
    shiftRight();
    wave1.addNoise();
    wave1.displayLines();
    // console.log(frameRate())

}

function shiftRight() {
    for(let i = lines_y1.length - 1; i > 0; i -= 1) {        //lines - refer to how many lines will be drawn
        lines_y1[i] = lines_y1[i-1];  
        lines_y2[i] = lines_y2[i-1];                         // 1st becomes 2nd, 98 becomes 99, and so on                           
        color_array[i] = color_array[i-1]
        noise_array[i] = noise_array[i-1]
    }
}


let angle = 0.0;
let angleIncre = 0;         //question: can't have this inside for some reason

// test results 
// what works:

// 10 to 10 no swell
// 10 to 100 small swell long period
// 100 to 100 small medium swell
// 100 to 300 medium .. works the best
// 100 to 600 medium large swell        
// 100 to 1000 largest swell it can get

// smaller the angle faster the wave goes?
// 100 to 10 works sorta
// 100 to 1 works .. goes bit faster
// 300 to 1 works .. high peak, but fast moving

// summary
// height should vary from 10 to 100
// periods should vary from 1 to 1000

// doesn't work:
// 400 to 600 large swell // too spiky, doesn't look good


//offset will be low vs high tide                   : height/2
//line_length will vary based on low & high tide    : 400 
//exponential is the space - from line to line      : 1.2 to 1.9 
//wave height                                       : 10 to 100
//wave periods                                      : 1 to 1000 



class WaveGen{
    constructor(offset = height/2, wave_height = 100, wave_periods = 300, exponential = 1.4, offset2 = 1) {      //exponential should range from 1.2ish to 1.9
        this.noiseOffset = random(1000,2000);

        this.offset = offset;
        this.line_length = 400;     //from y1 to y2
        this.exponential = exponential      
        this.wave_height = wave_height;
        this.wave_periods = wave_periods;

        

        this.test_sine = sin(angleIncre % (2 * PI)) // ranging from -1 to 1, exclusive
        this.adding_noise; 
        this.amplitude;

        //amp and angle are correlated
        this.mapping_amplitude;
        this.mapping_angle = 0.009;

        this.x1;
        this.x2;

        this.opacity_percentile = 1;
        this.offset2 = offset2;
        
    }
    
    addNoise() {
       
        // console.log(this.noise_default)
        // if(this.test_sine > 0.5 && this.test_sine < 0.52) {     //ping once on the top, once on the bototm
        //     temp_noise = map( noise(this.noiseOffset), 0, 1, 0, 0.1);
        //     console.log('ping')
        // }
        
        if (this.test_sine > -1 && this.test_sine < -0.9999) {           //very bottom point
            temp_noise = map( noise(this.noiseOffset), 0, 1, 0, 0.1);
            easing = map(random(0,100), 0, 100, 0.5, 1.5);
        }
        else if (this.test_sine > 0.9999 && this.test_sine < 1) {           //very top point
            
        } 

        
        if ( -1 < this.test_sine && this.test_sine < 1) {            //in between
            this.adding_noise = temp_noise
            
        } 
        if (this.test_sine < 0.5) {                                         //down slope
            // console.log('rightnow!')
                
            
        }


        //##################################################################################

        // if (this.test_sine > -1 && this.test_sine < 0.5) {           //top half
        //     text('top',340, 100)     
        // } else if (this.test_sine > 0.5 && this.test_sine < 1) {     //bottom half
        //     text('bottom',540, 100)    
        // } 

        //##################################################################################
        // console.log(this.x,'xx')
        // if(this.x > 400){               //this works, but use it lator
        //     console.log(this.x,'this x')
        //     if (this.test_sine > -1 && this.test_sine < 0.5) {
        //         rect(540, 40, 200, 200);
        //         this.offset = 200
        //     } 
        // }
        //##################################################################################
        // if (this.test_sine > -1 && this.test_sine < -0.999) {           //very bottom point
    
        // else if (this.test_sine > 0.999 && this.test_sine < 1) {           //very top point
    
        // } else {                                             //everything that happens in between points
    
        // }
        //##################################################################################
    }
    
    amplitude_change(){
        //for interaction
        // this.mapping_amplitude = map(mouseX, 0, width, 5, 90)
        // this.mapping_angle = map(mouseX, 0, width, 0.05, 0.005 )
        this.mapping_amplitude = map(this.wave_height, 0, width, 5, 90)     //hardcoding to see it doesn't fluctuates too much  
        this.mapping_angle = map(this.wave_periods, 0, width, 0.05, 0.005 )
        increase += 0.4;        // or you can increment like this   //pass in the increase as arg
        
    }   
    
    displayLines() {
        beginShape(LINES);
            
        noise_array[0] = this.adding_noise;
        
        //test noise
        this.amplitude = this.mapping_amplitude;        //assigning newly changed amp to this.amplitude
        
        if(lines_y1[1]){ temp_height = lines_y1[1]}
        lines_y1[0] = tempo + temp_height + this.test_sine * (this.amplitude * this.adding_noise)      //top x,y
        lines_y2[0] = temp_height + this.test_sine * (this.amplitude) + this.line_length           //bot x,y
        
        if (tempo < 1) tempo++;
        // angleIncre += 0.009;              // 0.03 to 0.09 to 0.1 //the higher amp, shorter period
        // console.log(easing)
        angleIncre += (this.mapping_angle * easing)
        
        for(let i = 1; i < lines_y1.length; i += 1) {
            let add_color = () => {        
                let r_normalize = map(i, 1, lines_y1.length, 37, 11)                                                
                let g_normalize = map(i, 1, lines_y1.length, 61, 50)
                let b_normalize = map(i, 1, lines_y1.length, 62,100)
                this.opacity_percentile = map(i, 1, lines_y1.length, 1, 0); //normalizing based on how many lines
                color_array[0] = stroke(`rgba(${r_normalize}%,${g_normalize}%,${b_normalize}%,${this.opacity_percentile})`); 
            }   
            add_color();
            
            this.x1 = i
            this.x2 = pow(i, this.exponential)

            // if (tracker[i-1] > 400 ){       // once line is moved passed 400 line points
            //     rect(20,20,200,200)
            //     lines_y1[200] += 200;
            //     lines_y2[200] += 200;       //works! great// but not optimized 
            //     // this.x1 += 100;          // i need another reverse for loop that will create wave crest, then falling    //maybe draw another connecting lines here?
            // }
            // tracker[i-1] += 1

            vertex( this.x1, lines_y1[i]);
            vertex( this.x2, lines_y2[i]);   

            
        }
        
        endShape();
        this.noiseOffset += 0.0001;                       //question: where would be the best to put this?
    }
}
