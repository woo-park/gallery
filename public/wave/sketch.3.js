/*
instruction - 
close or open - 
    *show current hours
        *sunrise & sunset hrs
    *background light change
    *perspective - left to right & front to back?
    *

!question:
    *real live data -- poll promise? ajax?
    *better performance - need to draw less?

done:
    *noise periods
    *noise amplitude
    *high tide & low tide
*/

let temp_noise;
let easing;

let increase = 0

lines_y1 = [];                         // Mimicking float[] y = new float[1400];  
lines_y2 = [];                         // Need to shift y1 & y2
angles = [];
color_array = [];
noise_array = [];

/*
    based on hours, 
    prolly good to grab sun rise and sun set as well - from the data
    for now i can test with 0 black to 255 white
    
    the light changes from orange yellow to bright color to dark.

*/

let wave1;
tracker = [];
let line_count = 4;

for(let j = 0; j < window.innerWidth - 300; j ++) {
    lines_y1.push(null)
    lines_y2.push(null)
    angles.push(null)
    color_array.push(null)
    noise_array.push(null)
    tracker.push(null) //not being used
}                                   

let stats;
let stats2;


function preload() {
    stats = loadTable('sample3.csv');
    stats2 = loadTable('sample.csv');
}


//day2
let tide = [];
let swell_size = [];
let swell_periods = [];

//day2
let tide2 = [];
let swell_size2 = [];
let swell_periods2 = [];

let hourly_counter = 0;
let sec;
let normalize_sec = 1;      // if you want to see it dramatically, do 1, or 3 to 4 should be less dramatic


let raw_tide=[]
let raw_swell_size=[]
let raw_swell_periods =[]

let raw_tide2 = []
let raw_swell_size2 = []
let raw_swell_periods2 = []

function setup() {    
    strokeCap(SQUARE);
    //day1 
    for(let i = 1; i < stats.getRowCount(); i++) {      //starting at one bc of headers
        tide[i - 1] = stats.getNum(i, 0);               //fixing index for tide array
        swell_size[i - 1] = stats.getNum(i, 1);
        swell_periods[i - 1] = stats.getNum(i, 2);

        tide2[i - 1] = stats2.getNum(i, 0);               //fixing index for tide array
        swell_size2[i - 1] = stats2.getNum(i, 1);
        swell_periods2[i - 1] = stats2.getNum(i, 2);

        raw_tide[i - 1] = stats.getNum(i, 0);               //fixing index for tide array
        raw_swell_size[i - 1] = stats.getNum(i, 1);
        raw_swell_periods[i - 1] = stats.getNum(i, 2);

        raw_tide2[i - 1] = stats2.getNum(i, 0);               //fixing index for tide array
        raw_swell_size2[i - 1] = stats2.getNum(i, 1);
        raw_swell_periods2[i - 1] = stats2.getNum(i, 2);
    }

  

    
    let cnv = createCanvas(window.innerWidth - 100, window.innerHeight - 100, P2D);
    cnv.parent('container');
    noiseDetail(24);
    temp_noise = 0.007;         //wave starting value
    easing = 1;
    // console.log(tide)
    // console.table(swell_size)
    // console.table(swell_size2)

      // console.log(tide, swell_size, swell_periods,'from csv')
      convert_stats(tide, swell_size, swell_periods, stats);
      convert_stats(tide2, swell_size2, swell_periods2, stats2);
      // console.log(tide, swell_size, swell_periods,'from csv')
    
    const canvas = document.getElementById('defaultCanvas0');
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'xor';
// ctx.globalCompositeOperation = 'destination-in';


    setInterval(get_new_data, 5000);
}

function get_new_data() {
    let temp = loadTable( 'http://i6.cims.nyu.edu/~wp503/interactive/wave/wavedata/getdata.php', parse_new_data );
}

function parse_new_data(temp) {
    for(let i = 1; i < temp.getRowCount(); i++) {      //starting at one bc of headers
        console.log( temp.getNum(i,0), temp.getNum(i,1) );
    }
}
// need to convert now and set the tide[i] with defaults


function convert_stats(arg, arg2, arg3, stats_name) {
    // console.log(arguments,'args')
    for(let i = 0; i < stats_name.getRowCount(); i++) {
        // tide[i] = map(tide[i], 0, 1.7, -150, 750)                // 0.0meters to 1.7 meters
        arg[i] = map(arg[i], 0, 1.7, -0.5 / normalize_sec, 0.5 / normalize_sec)                // 0.0meters to 1.7 meters // -0.4 to 0.4 works perfectly
        arg2[i] = map(arg2[i], 0, 12, 10, 400)     // 0 to 12 feet
        arg3[i] = map(arg3[i], 3, 15, 1, 1000 ) // 3sec to 15sec
    }    

}
let brightness = 0.1;
//!question!important    // so every 1000 milisec, pull new data from the array, push it on to the wave?



bglight = function(hourly_counter) {
    brightness = map(hourly_counter, 0, 12, 100, 10)
    // brightness3 = map(hourly_counter, 12, 18, 100, 10)
    // brightness2 = map(hourly_counter, 12, 18, 100, 10)
    // background(0, 0, 0, brightness);
    // fill(253, 184, 19, brightness)
    
    // let start_timer = 0;
    
    
    if (hourly_counter >= 0 && hourly_counter < 6) {        // till sunrise
        // bglight["counter"] += 1;
        // inc_bg = map(bglight.counter, 0, 255, 0, 6 * 24)
        
        bglight.bg_r += bglight.inc_night;
        bglight.bg_g += bglight.inc_night;
        bglight.bg_b += bglight.inc_night;
        bglight.bg_a;

    } else if (hourly_counter >= 6 && hourly_counter < 12) {    
        bglight.bg_r += bglight.inc_day;
        bglight.bg_g += bglight.inc_day;
        bglight.bg_b += bglight.inc_day;
        bglight.bg_a;   
        
        bglight.temp_a += 1;

        // 253, 254, 107    yellow
        // 253, 84, 23 orange
        // 253, 22, 49 red
        bglight.sun_r += 1;
        bglight.sun_g += 1;
        bglight.sun_b += 1;
        
        bglight.sun_a;  //stay the same
        bglight.sun_g = constrain(bglight.sun_g, 22, 254)
        bglight.sun_b = constrain(bglight.sun_b, 23, 107)

        bglight.temp_a = constrain(bglight.temp_a, 0, 80)
        if(bglight.temp_a < 79) {
            bglight.bg_a = 90           //turns the opacity to .9 so that another light source comes thru
        }

        fill(bglight.sun_r, bglight.sun_g, bglight.sun_b, bglight.temp_a)
        
        rect(0,0, width, height);

    } else if (hourly_counter >= 12 && hourly_counter < 18) {    
        bglight.bg_r -= bglight.inc_day;
        bglight.bg_g -= bglight.inc_day;
        bglight.bg_b -= bglight.inc_day;
        bglight.bg_a;

        bglight.temp_a -= 1;

        // 253, 254, 107
        bglight.sun_r -= 1;
        bglight.sun_g -= 1;
        bglight.sun_b -= 1;
        
        bglight.sun_a;
        bglight.sun_g = constrain(bglight.sun_g, 22, 254)
        bglight.sun_b = constrain(bglight.sun_b, 23, 107)

        bglight.temp_a = constrain(bglight.temp_a, 0, 80)

        fill(bglight.sun_r, bglight.sun_g, bglight.sun_b, bglight.temp_a)
        
        rect(0,0, width, height);
        
    } else if (hourly_counter >= 18 && hourly_counter <= 24) { 
        bglight.bg_r -= bglight.inc_day;
        bglight.bg_g -= bglight.inc_day;
        bglight.bg_b -= bglight.inc_day;
        bglight.bg_a;
    }

    bglight.bg_r = constrain(bglight.bg_r, 0, 255);
    bglight.bg_g = constrain(bglight.bg_g, 0, 255);
    bglight.bg_b = constrain(bglight.bg_b, 0, 255);

    fill(bglight.bg_r, bglight.bg_g, bglight.bg_b, bglight.bg_a);
    rect(0,0, width, height);
    // console.log(hourly_counter + ': hour' , bglight.bg_r, bglight.bg_g, bglight.bg_b, bglight.bg_a, bglight.temp_a + 'bg temp a' )
    //!important
    
}

bglight.bg_r = 0;
bglight.bg_g = 0;
bglight.bg_b = 0;
bglight.bg_a = 100;
bglight.inc_night = 0.05;        //inc smaller bc its during night
bglight.inc_day = 0.5;         
bglight["counter"] = 0;
bglight.temp_a = 0;

bglight.sun_r = 254;
bglight.sun_g = 84; 
bglight.sun_b = 23; 

let first_col;
let second_col;
let third_col;




let am_or_pm;
function draw() {   
    

    if(!pause) {   
        let tablebody = document.querySelector('#table_body').getElementsByTagName("tr")
        // console.log(hourly_counter)
        first_col = tablebody[hourly_counter].getElementsByTagName("td")[0];
        second_col = tablebody[hourly_counter].getElementsByTagName("td")[1];
        third_col = tablebody[hourly_counter].getElementsByTagName("td")[2];
        // for(i = 0; i < 24; i ++){
            if( hourly_counter && first_col)  {
                first_col.style.backgroundColor = 'slategray'
                second_col.style.backgroundColor = 'slategray'
                third_col.style.backgroundColor = 'slategray'
        // change.style.backgroundColor = 'blue';
        // console.log(change)
            }
        // }
        fill(255)
        // rect(width - 210, 0, 30, 30);
        am_or_pm = hourly_counter < 12 ? 'am' : 'pm';
        text(`Current Time: ${hourly_counter + 1}:00` + am_or_pm, width - 150, 30);
        sec = int(millis() / 1000); 
        
        // console.log(int(millis() / 1000),'missisipi');
        for (let j = 0; j < 24; j += 1) {
            if (sec == j * 6 * normalize_sec) {
                hourly_counter = j;
            }
        }
        // console.log(sec, hourly_counter, swell_size[hourly_counter])
        bglight(hourly_counter);
        
        // if (sec == 0) {              0 - 0, 6 - 1, 12 - 2, 18 - 3
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
        
        // console.log(hourly_counter,' :hourly_counter')
        // console.log(tide[hourly_counter],' :current tide offset we are on')
        if (selected_1) {
            wave1 = new WaveGen(height/2, swell_size[hourly_counter], swell_periods[hourly_counter], map(mouseY, 0, height, 1.3, 1.45), tide[hourly_counter]);
        }
        else if (selected_2) {
            wave1 = new WaveGen(height/2, swell_size2[hourly_counter], swell_periods2[hourly_counter], map(mouseY, 0, height, 1.3, 1.45), tide2[hourly_counter]);
            // console.log('2 is true')
        }
        wave1.amplitude_change();
        shiftRight();
        wave1.addNoise();
        wave1.displayLines();
        // console.log(frameRate())
    }

    //pause, but resume and stop should be differenet
    // if (pause) {
    //     for(let i = 0; i < window.innerWidth - 300; i ++) {
    //         lines_y1[i] = null;
    //         lines_y2[i] = null;
    //         angles[i] = null;
    //         color_array[i] = null;
    //         noise_array[i] = null;
    //         // hourly_counter = 0;  //need to restart counting
    //     }                     
    // }

    
    

}


function shiftRight() {                             // last, 
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
    constructor(offset, wave_height = 100, wave_periods = 300, exponential = 1.4, tide_increment = 1) {      //exponential should range from 1.2ish to 1.9
        this.noiseOffset = random(1000,2000);

        this.offset = offset;       //prolly don't need this
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
        this.tide_increment = tide_increment;
        
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
        // else{
        //     temp_noise = map( noise(this.noiseOffset), 0, 1, 0, 0.1);
        //     easing = map(random(0,100), 0, 100, 0.5, 1.5);

        // } 

        
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
        
        if(lines_y1[1]){ this.offset = lines_y1[1]}
        lines_y1[0] = this.tide_increment + this.offset + this.test_sine * (this.amplitude * this.adding_noise)      //top x,y
        lines_y2[0] = this.offset + this.test_sine * (this.amplitude) + this.line_length           //bot x,y
        // I had to give this.tide_increment and this.offset
       
        // angleIncre += 0.009;              // 0.03 to 0.09 to 0.1 //the higher amp, shorter period
        // console.log(easing)
        angleIncre += (this.mapping_angle * easing)
        
        for(let i = 1; i < lines_y1.length; i += line_count) {       // 1, 2, 3, 4, 5, till window.innerWidth - 500
            let add_color = () => {        
                let r_normalize = map(i, 1, lines_y1.length, 37, 11);                                               
                let g_normalize = map(i, 1, lines_y1.length, 61, 50);
                let b_normalize = map(i, 1, lines_y1.length, 62,100);
                this.opacity_percentile = map(i, 1, lines_y1.length, 1, 0); //normalizing based on how many lines
                color_array[0] = stroke(`rgba(${r_normalize}%,${g_normalize}%,${b_normalize}%,${this.opacity_percentile})`); 
            }   
            add_color();
            
            // this.x1 = i + 30
            let xPerspective = 500;
            // this.x2 = pow(i + 200, this.exponential)
            this.x1 = i    + map(mouseX, 0, width, xPerspective, 0) - xPerspective -30    // - 100 to 0 // no positives     or  + 500
            this.x2 = pow(i, this.exponential)  + map(mouseX, 0, width, 0, xPerspective)  - xPerspective// 200 to 700 

            // if (tracker[i-1] > 400 ){       // once line is moved passed 400 line points
            //     rect(20,20,200,200)
            //     lines_y1[200] += 200;
            //     lines_y2[200] += 200;       //works! great// but not optimized 
            //     // this.x1 += 100;          // i need another reverse for loop that will create wave crest, then falling    //maybe draw another connecting lines here?
            // }
            // tracker[i-1] += 1

            vertex( this.x1, lines_y1[i]);
            // bezierVertex( this.x1 + 400, lines_y1[i] - 100, this.x2 + 400, lines_y2[i] + 100  ,this.x2, lines_y2[i])
            // curveVertex( this.x2 + 200, lines_y2[i] - 400);   
            vertex( this.x2, lines_y2[i]);   
            // vertex(this.x2 - 20, lines_y2[i]);      //when i is 4,

            
        }
        
        endShape();
    
        this.noiseOffset += 0.0001;                       //question: where would be the best to put this?
    }
}

function keyPressed(){

    console.log(frameRate(),': framerate')
}