
//global
lines_y1 = [];                         // Mimicking float[] y = new float[1400];  
lines_y2 = [];
angles = [];
let angleIncrement;
// let magicNumber;
for(let j = 0; j < 500; j ++) {
    lines_y1.push(null)
    lines_y2.push(null)
    angles.push(null)
}                                   


function setup() {
    createCanvas(800, 600);
    noiseDetail(24);
}

let wave1;
function draw() {    
    background(135, 206, 235);
    // frameRate(8)

    // if (frameCount % 2 == 0){
        
        wave1 = new WaveGen();

        shiftRight();
        wave1.displayLines();
        
    // }
   
    
}


function shiftRight() {
    for(let i = lines_y1.length - 1; i > 0; i -= 1) {        //lines - refer to how many lines will be drawn
        // if (lines_y1[i] != null && lines_y1[i-1] != null ) {
            
            // magicNumber = magicNumber++ % 800;
            // console.log(magicNumber);
        lines_y1[i] = lines_y1[i-1];  
        lines_y2[i] = lines_y2[i-1];  
            // console.log(lines_y1[i]);
        
                                 // 1st becomes 2nd, 98 becomes 99, and so on
            // lines_y2[i] = lines_y2[i-1];
            // console.log(lines_y2[i]);   
        // }
        
        
    }
    // console.log(lines_y1[0])
}


let line_padding = 1.5;
let angle = 0.0;
let incre = 0.1;
let length = 400;
let amplitude = 20;         //amplitude and map noise returned value determines the height
let angleIncre = 0;

class WaveGen{
    constructor() {
        this.noiseOffset = random(1000,2000);
        this.offset = 300;
    }

 
    displayLines() {
        

        beginShape(LINES);
        // while (angleIncre < 100) {
        //     lines_y1[0] = 300 + angleIncre;// + sin(angleIncre) * 5;
        //     lines_y2[0] = 320 + angleIncre;// + (length + sin(angleIncre) * 5);
        //     angleIncre-= 30;
        // }
       
        lines_y1[0] = this.offset + sin(angleIncre) * amplitude
        lines_y2[0] = this.offset + sin(angleIncre) * amplitude + 200

        
        console.log(this.offset + sin(angleIncre) * amplitude,'sin curve');

        angleIncre += 0.09;
        // lines_y1[0] = 300 + sin(2) * 5;
        // lines_y2[0] = 400 + (length + sin(2) * 5);
        // angleIncre += 1;
        // for(let i = 1; i < lines_y1.length; i += 1) {
            // lines_y1[0] = this.offset + sin(angleIncre) * amplitude //lines[i]
            // lines_y2[0] = this.offset + (length + sin(angleIncre) * amplitude) //lines[i] 
            // angleIncre += 1;
        // }

        for(let i = 1; i < lines_y1.length; i += 1) {
            // angle += random(incre);
            // angles[i] = map( noise(this.noiseOffset), 0, 1, -10, 10 );
            // angles[i] += incre;
            

            angleIncrement = map( noise(this.noiseOffset), 0, 1, 0.0, 0.1); //both works    //figure out why shiftright is not working // also why the speed is so fast
            angleIncrement += incre;
          

            let x1 = i;
            let x2 = pow(i, line_padding);

            
            // lines_y1[0] = 400;
            // lines_y2[0] = 500;

            vertex( x1, lines_y1[i]);
            vertex( x2, lines_y2[i]);
            // line(i, lines[i] + sin(angle) * amplitude, pow(i, line_padding), lines[i] + (length + sin(angle) * amplitude) )
            
            this.noiseOffset += 0.01; 
            
        }
        endShape();
    
        
        // console.log(lines_y1[5])

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