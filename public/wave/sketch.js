// a lot of comments are deleted for cleaning purpose
// more commments can be found in sketch1 ~ sketch4
// thank you
// 1hr is 1 sec in this setting - change customTime

let pause = false;
let selected_1 = true;
let selected_2 = false;
let picked;



let temp_noise;
let easing;

let increase = 0

lines_y1 = [];                         // Mimicking float[] y = new float[1400];
lines_y2 = [];                         // Need to shift y1 & y2
angles = [];
color_array = [];
noise_array = [];

let currentWave;
let line_count = 4;

for(let j = 0; j < window.innerWidth - 300; j ++) {
    lines_y1.push(null)
    lines_y2.push(null)
    angles.push(null)
    color_array.push(null)
    noise_array.push(null)
}


let sampleData;


//day2
let tide = [];
let swell_size = [];
let swell_periods = [];

//day2
let tide2 = [];
let swell_size2 = [];
let swell_periods2 = [];

let hourly_counter = 0;
let mySec = 0;
let myMin = 0;

let raw_tide=[]
let raw_swell_size=[]
let raw_swell_periods =[]

let raw_tide2 = []
let raw_swell_size2 = []
let raw_swell_periods2 = []

let am_or_pm;

let angle = 0.0;
let angleIncre = 0;         //question: can't have this inside for some reason
var temp_tide = [1.4, 1.2, 1.0, 0.8, 0.6, 0.4, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.2, 1.0, 0.8, 0.6, 0.4, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2];

//!important => customize time for showcases
let customTime = 1;     //1sec and 10 and 20sec is ideal
let normalize_sec;   // if you want to see it dramatically, do 1, or 3 to 4 should be less dramatic

let first_col;
let second_col;
let third_col;

let mySound;
function preload() {
    soundFormats('mp3', 'ogg');
    mySound = loadSound('wave_sound.mp3');
    sampleData = loadTable('sample.csv');
}

function blendCanvas() {
    const myCanvas = document.getElementById('defaultCanvas0');
    const ctx = myCanvas.getContext('2d');
    // ctx.globalCompositeOperation = 'destination-in';
    ctx.globalCompositeOperation = 'xor';
}

function getSampleData() {
    for(let i = 1; i < sampleData.getRowCount(); i++) {      //starting at one bc of headers

        // 1
        tide2[i - 1] = sampleData.getNum(i, 0);               //fixing index for tide array
        swell_size2[i - 1] = sampleData.getNum(i, 1);
        swell_periods2[i - 1] = sampleData.getNum(i, 2);

        // 2
        raw_tide2[i - 1] = sampleData.getNum(i, 0);               //fixing index for tide array
        raw_swell_size2[i - 1] = sampleData.getNum(i, 1);
        raw_swell_periods2[i - 1] = sampleData.getNum(i, 2);
    }

    convert_stats(tide2, swell_size2, swell_periods2, sampleData);
}

let polled = false;

function setup() {

    mySound.setVolume(0.1);

    noiseDetail(24);

    let cnv = createCanvas(window.innerWidth, window.innerHeight, P2D);
    cnv.parent('container');

    temp_noise = 0.005;         //wave starting value
    easing = 1;

    blendCanvas();

    getSampleData();
    get_new_data();                     //need it asap
    setInterval(get_new_data, 20000);   //then loops every 20sec


}

function get_new_data() {
    loadTable( 'https://wooyongpark.com/data', parse_new_data );
    console.log('initial polling done')
}

// http://i6.cims.nyu.edu/~wp503/interactive/wave/wavedata/getdata.php
// okay trying make it searchable
function fetchNewData() {
  loadTable('https://wooyongpark.com/data', function(res){
    console.log('polling')
    console.log(res);
  })
}

document.addEventListener('click', function() {
  fetchNewData();
});

//

function parse_new_data(liveData) {
  // console.log(liveData,'live data');
    convert_stats(tide, swell_size, swell_periods, liveData);

    for(let i = 1; i < liveData.getRowCount(); i++) {      //starting at one bc of headers

        // 1
        // console.log( liveData.getNum(i,0), liveData.getNum(i,1) );
        tide[i - 1] = temp_tide[i - 1];
        swell_size[i - 1] = liveData.getNum(i, 0);
        swell_periods[i - 1] = liveData.getNum(i, 1);

        // 2
        raw_tide[i - 1] = temp_tide[i - 1];                 //need a seperate data that doesn't get converted
        raw_swell_size[i - 1] = liveData.getNum(i, 0);
        raw_swell_periods[i - 1] = liveData.getNum(i, 1);
    }

    polled = true;
    // console.table(swell_size.slice(0, 24))              //first 24 hours
    // console.table(raw_swell_periods.slice(0, 24))
    console.log('new data in')
}
// need to convert now and set the tide[i] with defaults



function convert_stats(arg1, arg2, arg3, dataTable) {
    // console.log(arguments,'args')

    //!important => need to match myMin with normalize_sec
    // console.log(myMin,'mymin')  //shows up as zero // thats the problem
    normalize_sec = map(customTime, 0, 60, 0.5, 0.0001);
    // console.log(normalize_sec,'norm')

    for(let i = 0; i < dataTable.getRowCount(); i++) {
        // tide[i] = map(tide[i], 0, 1.7, -150, 750)                               // 0.0, 1.7 meters => map => -150, 750
        arg1[i] = map(arg1[i], 0, 1.7, -normalize_sec, normalize_sec)  // 0.0meters to 1.7 meters // -0.4 to 0.4 works perfectly
        arg2[i] = map(arg2[i], 0, 12, 10, 400)     // 0 to 12 feet
        arg3[i] = map(arg3[i], 3, 15, 1, 1000 )    // 3sec to 15sec
    }

}

function showTime() {
    textFont('Playfair Display SC')
    textSize(23);
    fill(255)
    am_or_pm = hourly_counter == 23 || hourly_counter < 12? 'am' : 'pm';
    text(`Time: ${hourly_counter + 1}:00` + am_or_pm, width - 200, 60);
}

function myClock() {
    if (frameCount % 60 == 0) {             // sec = int(millis() / 1000); //old way - wasn't accurate
        mySec += 1;
    }

    myMin = Math.floor(mySec / customTime)      //!important => customize time

    hourly_counter = myMin % 24;                //repeats 24

    bgLight(hourly_counter);

    // console.log(tide[hourly_counter],' :current tide offset we are on')
}

let brightness;

let bgLight = function(hourly_counter) {
    // console.log(hourly_counter,'hr')

    brightness = map(hourly_counter, 0, 12, 100, 10)


    if (hourly_counter >= 0 && hourly_counter < 6) {        // till sunrise


        bgLight.bg_r += bgLight.inc_night;
        bgLight.bg_g += bgLight.inc_night;
        bgLight.bg_b += bgLight.inc_night;
        bgLight.bg_a;

    } else if (hourly_counter >= 6 && hourly_counter < 12) {
        bgLight.bg_r += bgLight.inc_day;
        bgLight.bg_g += bgLight.inc_day;
        bgLight.bg_b += bgLight.inc_day;
        bgLight.bg_a;

        bgLight.temp_a += 1;

        // 253, 254, 107    yellow
        // 253, 84, 23 orange
        // 253, 22, 49 red
        bgLight.sun_r += 1;
        bgLight.sun_g += 1;
        bgLight.sun_b += 1;

        bgLight.sun_a;
        bgLight.sun_g = constrain(bgLight.sun_g, 22, 254);
        bgLight.sun_b = constrain(bgLight.sun_b, 23, 107);

        bgLight.temp_a = constrain(bgLight.temp_a, 0, 80);
        if(bgLight.temp_a < 79) {
            bgLight.bg_a = 90;           //turns the opacity to .9 so that another light source comes thru
        }

        fill(bgLight.sun_r, bgLight.sun_g, bgLight.sun_b, bgLight.temp_a);
        rect(0,0, width, height);

    } else if (hourly_counter >= 12 && hourly_counter < 18) {
        bgLight.bg_r -= 0.3;
        bgLight.bg_g -= 0.3;
        bgLight.bg_b -= 0.3;
        bgLight.bg_a;

        if (hourly_counter >= 13) {
                // 253, 254, 107
            bgLight.temp_a -= 0.5;
            bgLight.sun_r -= 0.1;
            bgLight.sun_g -= 0.1;
            bgLight.sun_b -= 0.1;

            bgLight.sun_a;
            bgLight.sun_g = constrain(bgLight.sun_g, 22, 254)
            bgLight.sun_b = constrain(bgLight.sun_b, 23, 107)
            bgLight.temp_a = constrain(bgLight.temp_a, 0, 80)
        }
        if(bgLight.temp_a < 79) {
            bgLight.bg_a = 100;
        }

        fill(bgLight.sun_r, bgLight.sun_g, bgLight.sun_b, bgLight.temp_a)
        rect(0,0, width, height);

    } else if (hourly_counter >= 18 && hourly_counter < 24) {
        bgLight.bg_r -= bgLight.inc_day;
        bgLight.bg_g -= bgLight.inc_day;
        bgLight.bg_b -= bgLight.inc_day;
        bgLight.bg_a;
    } else if (hourly_counter >= 24) {
        // hourly_counter = 0;
    }

    bgLight.bg_r = constrain(bgLight.bg_r, 0, 255);
    bgLight.bg_g = constrain(bgLight.bg_g, 0, 255);
    bgLight.bg_b = constrain(bgLight.bg_b, 0, 255);

    fill(bgLight.bg_r, bgLight.bg_g, bgLight.bg_b, bgLight.bg_a);
    rect(0,0, width, height);

    // console.log(hourly_counter + ': hour' , bgLight.bg_r, bgLight.bg_g, bgLight.bg_b, bgLight.bg_a, bgLight.temp_a + 'bg temp a' )
}

bgLight.bg_r = 0;
bgLight.bg_g = 0;
bgLight.bg_b = 0;
bgLight.bg_a = 100;

bgLight.inc_night = 0.05;        //inc smaller bc its during night
bgLight.inc_day = 0.5;

bgLight.temp_a = 0;

bgLight.sun_r = 254;
bgLight.sun_g = 84;
bgLight.sun_b = 23;


function draw() {
    // strokeCap(SQUARE);
    // strokeCap(PROJECT);
    strokeCap(ROUND);
    strokeWeight(2);
    // console.log(hourly_counter);
    if(!pause) {
        // let tablebody = document.querySelector('#table_body').getElementsByTagName("tr")
        // // console.log(hourly_counter)
        // first_col = tablebody[hourly_counter].getElementsByTagName("td")[0];
        // second_col = tablebody[hourly_counter].getElementsByTagName("td")[1];
        // third_col = tablebody[hourly_counter].getElementsByTagName("td")[2];
        // // for(i = 0; i < 24; i ++){
        //     if( hourly_counter && first_col)  {
        //         first_col.style.backgroundColor = 'slategray'
        //         second_col.style.backgroundColor = 'slategray'
        //         third_col.style.backgroundColor = 'slategray'
        // // change.style.backgroundColor = 'blue';
        // // console.log(change)
        //     }
        // // }

        showTime();
        myClock();


        // make two instances, then have a fade out function built in static
        if (selected_1) {
            currentWave = new WaveGen(height/2, swell_size[hourly_counter], swell_periods[hourly_counter], map(mouseY, 0, height, 1.3, 1.45), tide2[hourly_counter]);
            // selected_2 = false;
        }
        else if (selected_2) {
            currentWave = new WaveGen(height/2, swell_size2[hourly_counter], swell_periods2[hourly_counter], map(mouseY, 0, height, 1.3, 1.45), tide2[hourly_counter]);
            // selected_1 = false;
        }

        shiftRight();

        currentWave.amplitude_change();
        currentWave.addNoise();
        currentWave.displayLines();                // if(typeof waveArray[i] !== "undefined"){ //neat

        currentTime();
    }

}

function shiftRight() {
    for(let i = lines_y1.length - 1; i > 0; i -= 1) {        //lines - refer to how many lines will be drawn
        lines_y1[i] = lines_y1[i-1];
        lines_y2[i] = lines_y2[i-1];                         // 1st becomes 2nd, 98 becomes 99, and so on
        color_array[i] = color_array[i-1]
        noise_array[i] = noise_array[i-1]
    }
}

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

// summary:
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
        this.line_length = windowHeight/2 + 200;     //from y1 to y2
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

        if (this.test_sine > -1 && this.test_sine < -0.9999) {           //very bottom point
            temp_noise = map( noise(this.noiseOffset), 0, 1, 0, 0.1);
            easing = map(random(0,100), 0, 100, 0.5, 1.5);
        }
        else if (this.test_sine > 0.9999 && this.test_sine < 1) {           //very top point

        }

        if ( -1 < this.test_sine && this.test_sine < 1) {            //in between
            this.adding_noise = temp_noise
        }

    }

    amplitude_change(){
        this.mapping_amplitude = map(this.wave_height, 0, width, 5, 90)     //hardcoding to see it doesn't fluctuates too much
        this.mapping_angle = map(this.wave_periods, 0, width, 0.05, 0.005 )
        increase += 0.4;        // or you can increment like this   //pass in the increase as arg
    }

    displayLines() {

        beginShape(LINES);

        noise_array[0] = this.adding_noise;

        this.amplitude = this.mapping_amplitude;        //assigning newly changed amp to this.amplitude

        if(lines_y1[1]){ this.offset = lines_y1[1]}
        lines_y1[0] = this.tide_increment + this.offset + this.test_sine * (this.amplitude * this.adding_noise)     //top x,y
        lines_y2[0] = this.offset + this.test_sine * (this.amplitude) + this.line_length                            //bot x,y
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

            let xPerspective = 500;

            this.x1 = i + map(mouseX, 0, width, xPerspective, 0) - xPerspective -30    // - 100 to 0 // no positives     or  + 500
            this.x2 = pow(i, this.exponential)  + map(mouseX, 0, width, 0, xPerspective)  - xPerspective// 200 to 700

            vertex( this.x1, lines_y1[i]);
            vertex( this.x2, lines_y2[i]);
        }

        endShape();

        this.noiseOffset += 0.0001;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
    console.log(frameRate(),': framerate')
    mySound.play();
}

function mousePressed(){
    if(mySound.isLoaded()) {
        mySound.play();
    }
}



// Dom elements
let close_btn = document.getElementById("close_sign");
let instruction = document.getElementById("instruction")
let form_sheet = document.getElementById("formsheet")
let toggle_on = false;
let x_sign = document.getElementById("x")

close_btn.addEventListener('click', (event) => {
  toggle_on ? x_sign.style.transform = 'rotate(-45deg)': x_sign.style.transform = 'rotate(90deg)'
  // instruction.style.left = '-999px';  //it works bc i have position absolute
  // console.log(instruction.style);
  // instruction.style.transform = 'translateY('+100+'px)';
  // instruction.style.transform += 'translateX(-200px)';
  toggle_on ? instruction.style.transform += 'translateX(300px) translateY(640px)' : instruction.style.transform += 'translateX(-300px) translateY(-640px)'
  toggle_on ? form_sheet.style.transform += 'translateX(300px) translateY(640px)' : form_sheet.style.transform += 'translateX(-300px) translateY(-640px)'
//   toggle_on ? close_btn.style.border = 'none' : close_btn.style.border = '1px solid #222222';
  // toggle_on ? instruction.style.border =  '2px solid #222222' : instruction.style.border = 'none';
  // toggle_on ? instruction.style.background = 'url("back9.jpg") center':instruction.style.background =  'none'
  // toggle_on ? close_btn.style.opacity = '1' : close_btn.style.opacity = '1';
  toggle_on ? toggle_on = false: toggle_on = true;


});

function more_lines() {
  line_count += 1;
}

function less_lines() {
  if (line_count > 1) {
    line_count -= 1;
  }
}

function disable() {  //disable pause
  pause = false;
}

function enable() { //enable pause
  pause = true;
}

function choosing() {
  pause = true;
}

function getSubmit() {
  let selectForm = document.getElementById("mySelect");
  picked = selectForm.options[selectForm.selectedIndex].text; //built in selectedIndex

  if (picked == 'Live Data') {
    pause = true;
    selected_1 = true;
    selected_2 = false;

    pause = false;
  } else if (picked == 'Sample') {
    pause = true;
    selected_1 = false;
    selected_2 = true;

    pause = false;
  }

    if (polled) {
        addTable();
    }
}


let chartShown = false;     //to begin with
let mytablebody;
let myrow;
function addTable() {
    mytablebody = document.querySelector('#table_body');
    myrow = mytablebody.getElementsByTagName("tr");

    for(k = 0; k < 24; k ++){
        if (chartShown) {                   //once chart is plotted once

            let erase1 = myrow[k].getElementsByTagName("td")[0];
            let erase2 = myrow[k].getElementsByTagName("td")[1];
            let erase3 = myrow[k].getElementsByTagName("td")[2];
            // console.log(erase1,erase2,erase3);
            erase1.remove();
            erase2.remove();
            erase3.remove();

        }
    }


    for(i = 0; i < 24; i ++){

        if (selected_1 == true) {

            pollingData1 = raw_tide
            pollingData2 = raw_swell_size
            pollingData3 = raw_swell_periods

        } else if (selected_2 == true) {

            pollingData1 = raw_tide2
            pollingData2 = raw_swell_size2
            pollingData3 = raw_swell_periods2
        }

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        td1.appendChild(document.createTextNode(pollingData1[i]))
        td2.appendChild(document.createTextNode(pollingData2[i]))
        td3.appendChild(document.createTextNode(pollingData3[i]))

        myrow[i].appendChild(td1)
        myrow[i].appendChild(td2)
        myrow[i].appendChild(td3)
    }
    chartShown = true;
}

let currentColumn_1;
let currentColumn_2;
let currentColumn_3;
let original;

let last1;
let last2;
let last3;


let lastcol1;
let lastcol2;
let lastcol3;


function currentTime() {
    if(chartShown) {
        //change here
        if(hourly_counter){
            last1 = myrow[hourly_counter - 1].getElementsByTagName("td")[0];
            last2 = myrow[hourly_counter - 1].getElementsByTagName("td")[1];
            last3 = myrow[hourly_counter - 1].getElementsByTagName("td")[2];

            last1.style.backgroundColor = 'transparent'
            last2.style.backgroundColor = 'transparent'
            last3.style.backgroundColor = 'transparent'

        }


        if(hourly_counter == 0) {
            lastcol1 = myrow[23].getElementsByTagName("td")[0];
            lastcol2 = myrow[23].getElementsByTagName("td")[1];
            lastcol3 = myrow[23].getElementsByTagName("td")[2];

            if(lastcol1) {
                // console.log('exists');
            }
            lastcol1.style.backgroundColor = 'transparent';
            lastcol2.style.backgroundColor = 'transparent';
            lastcol3.style.backgroundColor = 'transparent';
        }

        //change here
        currentColumn_1 = myrow[hourly_counter].getElementsByTagName("td")[0];
        currentColumn_2 = myrow[hourly_counter].getElementsByTagName("td")[1];
        currentColumn_3 = myrow[hourly_counter].getElementsByTagName("td")[2];



        currentColumn_1.style.backgroundColor = 'slategray'
        currentColumn_2.style.backgroundColor = 'slategray'
        currentColumn_3.style.backgroundColor = 'slategray'




    }
}




setTimeout(() => {
    if(polled) {        addTable()}
}, 3000);
