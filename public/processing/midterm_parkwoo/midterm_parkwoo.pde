//okay to make it size 1400, change angle y array number, change draw i += 4 and wave color i to 4 and size to 1400;

float[] y = new float[1400];  // array y holds 1400 units. empty 1400 units
float[] angle = new float[1400];  // same for array angle

float offset = 250.0;  //where wave is initially positioned //originally it was 150, but added 100 to offset bc max of sealevel is another 100.
// line(x,y,x2,y2);  // inside y&y2, i will place sin(angle)*height+offset type of equation
// For some unknown reason, whenever i changed wave_height it changed the speed of wavelength. 
// so what i did was, instead of actually changing the speed of wavecurve(wavelength), i changed the frame rate
// i was able to make framerate in between 10-16seconds, by using this, "frameSec = int(changed_waveheight*speed)"
//although this is not what I intended, i converted wave_height of 2 into 0.054242425 using the equation below.
//map(wave_height,1,100,0.05,0.47);  
// thus whenever I multiplied 0.054242425 by 200~300, it is going to give out number between 10.84848~16.27272. 
// and also new fact - changed_waveheight is 0.054242425, thus angle is rising with 0.054242425 at all time. 

float wave_angle;       //defines the steepness of sine wave, so if I added 0.47 you will see more ups and downs(disarray)
                        //it will be added with increments of 0.054242425(closer angle increments between each lines)
                        //changed_waveheight is the increments 

float wave_height = 2;  //bigger the wave, faster the wave goes   //this is default but changes thru scale bar
                        //this is also how much sin(angle) is * by


float changed_waveheight = map(wave_height,1,100,0.05,0.47);    //this is an angle_increment
// waveheight 2 is converted into a value from 0.05 to 0.47 out of scale of 1-100; they are (pi/50~pi/7)
//and then the converted value is the increment for wave_angle.  wave_angle = wave_angle + changed_waveheight
//as the wave_angle adds up, and increases, the sine curve is drawn

//when increment is close to 0.47, the wavelength moves faster. 

int frameSec;    // because whenever I change the wave_height, the frequency or speed of the curve is also changed. 
              
float sea_level;          // global variables because I am using it for few different functions
float wave_height_meter;  // wave_height is converted from 1-100 scale into 1 -10meter scale
float speed = 200.0;      //       the default speed for the wave
float speedPercentage;    // speed is converted into percentage 1- 100%
float choppy = 0.0;       //       the default is a clean-glassy wave
float choppiness;         // choppy is converted into percentage
float fill_wave;          //       determines the color of the wave
float saturation;         // another variable that changes color of the wave
PFont yDemibold;          // font
//PImage sketch1;

void setup(){
  size(1400,400);   
  yDemibold = createFont("YuMin-Demibold",12);
  textFont(yDemibold);
  rectMode(RADIUS);    // the starting point of the rec is in the middle now(center)
  String[] fontList = PFont.list();    //to see what fonts i can use
  //printArray(fontList);
  //sketch1 = loadImage("wave0.png");

} //end of setup

void draw(){
  background(240);         //light-gray background
  int timer;
  timer = millis();        //timer starts as it's run
  //println(timer);
    if(timer < 5000){      //shows the text for 5 secs after it starts
      textSize(32);
      background(40);
      fill(240);

  
      //image(sketch1,0,100);
      //sketch1.resize(1400,400);
      text("Breaking Down Waves",width/2-200,height/2);
      textSize(8);
    }
    else if(timer >= 5000){      //after 5secs, show display()
      textSize(12);
      display();
    }
 //println(speed);
 println(changed_waveheight);
 println(wave_height);
}  //end of draw

void display(){
  frameSpeed();    //functions that I set up below
  recordData();
  waveColor();
  drawWave();
  scaleBar();
  scaleBar_mouse();
  scaleBar1();
  scaleBar1_mouse();
  scaleBar2();
  scaleBar2_mouse();
  scaleBar3();
  scaleBar3_mouse();
  scaleBar4();
  scaleBar4_mouse();
  //check_box1();
  upperKey();
  sideKey();
}    //end of void display


//global variables for scale box
int[] box_xpos = {220,460,700,940,1180};    //now I can simply change this box location - its an array of box x-locations
int[] box_ypos = {33,14};    //never used that 14 thou
int box_width = 50;    //radius
int box_height = 10;    
//int[] check_box_xpos = {box_xpos[0]-(box_width*2),box_xpos[1]-(box_width*2),box_xpos[2]-(box_width*2),box_xpos[3]-(box_width*2),box_xpos[4]-(box_width*2)};

void scaleBar(){
  fill(#ffffff);    
  stroke(#000000);
  rect(box_xpos[0],box_ypos[0],box_width,box_height);    //scale bar
  fill(0);
  textAlign(CENTER);  //align in the middle
  text("Waveheight from 0 to 10meters || press UP & DOWN", box_xpos[0], box_ypos[0]-15);  
}   //end of scale bar

void scaleBar_mouse(){
  wave_height_meter = map(wave_height,0,100,0,10);
    if(mousePressed == true &&
        mouseX <= box_xpos[0]+box_width &&
        mouseX >= box_xpos[0]-box_width && 
        mouseY <= box_ypos[0]+box_height && 
        mouseY >= box_ypos[0]-box_height){
        wave_height = mouseX-box_xpos[0]+box_width;      //wave_height will be determined by the mouseX position ranging from 0-100
        println(wave_height);
        println(frameSec);
        text(int(wave_height_meter)+"m",box_xpos[0]-5,box_ypos[0]+5);    //waveheight is set as float
        stroke(40,70);
        line(mouseX,box_ypos[0]-10,mouseX,box_ypos[0]+10);
        stroke(0);
      }
    else if(keyPressed == false){text(int(wave_height_meter)+"m",box_xpos[0]-5,box_ypos[0]+5);
      }
}    //end of void scaleBar_mouse

void scaleBar1(){
  fill(#ffffff);    
  rect(box_xpos[1],box_ypos[0],box_width,box_height);    //scale 
  fill(0);
  textAlign(CENTER);
  text("Sea Level from 0 to 100%", box_xpos[1], box_ypos[0]-15);
}   //end of scale bar1

void scaleBar1_mouse(){
  if(mousePressed == true && mouseX <= box_xpos[1]+box_width && mouseX >= box_xpos[1]-box_width && mouseY <= box_ypos[0]+box_height && mouseY >= box_ypos[0]-box_height){
    sea_level = mouseX-box_xpos[1]+box_width;      
    println(sea_level);
    text(int(sea_level)+"%",box_xpos[1]-5,box_ypos[0]+5);  
    stroke(40,70);
        line(mouseX,box_ypos[0]-10,mouseX,box_ypos[0]+10);
        stroke(0);
  }
  else{
    text(int(sea_level)+"%",box_xpos[1]-5,box_ypos[0]+5);
  }
}    //end of void scaleBar1_mouse

void scaleBar2(){    //same as scaleBar1; drawing scale box
  fill(#ffffff);    
  rect(box_xpos[2],box_ypos[0],box_width,box_height);
  fill(0);
  textAlign(CENTER);
  text("Wave Speed from 0 to 100% || press LEFT & RIGHT", box_xpos[2], box_ypos[0]-15);  
}   //end of scale bar2

void scaleBar2_mouse(){  
 speedPercentage = map(speed,200,300,0,100);
  if(mousePressed == true && 
    mouseX <= box_xpos[2]+box_width && 
    mouseX >= box_xpos[2]-box_width &&
    mouseY <= box_ypos[0]+box_height &&
    mouseY >= box_ypos[0]-box_height){
    speed = map(mouseX-box_xpos[2]+box_width,0,100,200,300);    //converter:0-100 to 200-300
  //  println(speed);  //just testing
    text(int(speedPercentage)+"%",box_xpos[2]-5,box_ypos[0]+5);  //where I want the text to show up
    stroke(40,70);
        line(mouseX,box_ypos[0]-10,mouseX,box_ypos[0]+10);
        stroke(0);
  }
  else if(keyPressed == false){                                  // under this condition
  text(int(speedPercentage)+"%",box_xpos[2]-5,box_ypos[0]+5);    //I want the text show up at all time
  }
}    //end of void scaleBar2_mouse

void scaleBar3(){    //same as scaleBar1; drawing scale box
  fill(#ffffff);    
  rect(box_xpos[3],box_ypos[0],box_width,box_height);    //scale 
  fill(0);
  textAlign(CENTER);
  text("Choppy from 0 to 100%", box_xpos[3], box_ypos[0]-15);  
}   //end of scale bar2

void scaleBar3_mouse(){
 choppiness = map(choppy,0.0,0.2,0,100);    //converts back to percentile // read it backward
  if(mousePressed == true &&
  mouseX <= box_xpos[3]+box_width && 
  mouseX >= box_xpos[3]-box_width && 
  mouseY <= box_ypos[0]+box_height && 
  mouseY >= box_ypos[0]-box_height){
    choppy = map(mouseX-box_xpos[3]+box_width,0,100,0.01,0.2);
    text(int(choppiness)+"%",box_xpos[3]-5,box_ypos[0]+5);  
    stroke(40,70);
        line(mouseX,box_ypos[0]-10,mouseX,box_ypos[0]+10);
        stroke(0);
  }
  else {
  text(int(choppiness)+"%",box_xpos[3]-5,box_ypos[0]+5);
  }
}    //end of void scaleBar3_mouse

void scaleBar4(){
  fill(#ffffff);    
  rect(box_xpos[4],box_ypos[0],box_width,box_height);    //scale 
  fill(0);
  textAlign(CENTER);
  text("Color Range Blue to Emerald", box_xpos[4], box_ypos[0]-15);
}   //end of scale bar2

void scaleBar4_mouse(){
 
  if(mousePressed == true && mouseX <= box_xpos[4]+box_width && 
    mouseX >= box_xpos[4]-box_width && 
    mouseY <= box_ypos[0]+box_height && 
    mouseY >= box_ypos[0]-box_height){
    fill_wave = map(mouseX-box_xpos[4]+box_width,0,100,0,140);
    saturation = map(mouseX-box_xpos[4]+box_width,0,100,10,1);
    text(int(fill_wave)+"%",box_xpos[4]-5,box_ypos[0]+5);  
    stroke(40,70);
        line(mouseX,box_ypos[0]-10,mouseX,box_ypos[0]+10);
        stroke(0);
  }
  else{
  text(int(fill_wave)+"%",box_xpos[4]-5,box_ypos[0]+5);
  }
}    //end of void scaleBar3_mouse

void upperKey(){
  int storyCounter = 0;
  if(keyPressed == true && key == CODED){
    println(wave_height);
    println(frameSec);
    text(int(wave_height_meter)+"m"+"  "+int(wave_height)+"%",box_xpos[0]-2,box_ypos[0]+5);
    if(keyCode == UP){
      storyCounter++;
    }
    if(keyCode == DOWN){   
      storyCounter--;
      wave_height--;
    }
  }
  if(keyCode == UP && storyCounter ==1){
    wave_height++;
  }
}    //end of void upperKey

void sideKey(){
if(keyPressed == true && key == CODED){    //changing speed and eventually changing frameSec as well. The speed begins at 200.0
    text(int(speedPercentage)+"%",box_xpos[2]-5,box_ypos[0]+5);
    if(keyCode == RIGHT){
      speed++; 
   //   println(speed);
    }
    if(keyCode == LEFT){
      speed--;
  //    println(speed);
    }  
  }
}  //end of void sideKey

void frameSpeed(){
  frameSec = int(changed_waveheight*speed);  //changed_wh is 0.05 to 0.47. *300 by 0.47 is 94    //The speed begins at 200.0, which is ideal speed to look at
  frameRate(frameSec);
 // println(frameRate);
}  //end of frameSpeed


void recordData(){
  for(int i = y.length-1; i > 0; i --){  
  y[i] = y[i-1];   //y[last#] = y[1199] eats the number before y[1198]
    // this for loop begins from right side to left.
    // i = 1199 when it begins and decreases by 1 until i>0;
    // thus, if I make a change to y[0] -the first of y array- the rest of array will trace/follow y[0] value
  }
}  //end of recordData

void drawWave(){
  float inc = choppy;     
  for(int i = 1; i < y.length; i += 4){ //later line will be drawn 5,10,15...
      wave_angle += changed_waveheight; // so angle will be constantly added between 0.05 to 0.47                                                                             
      angle[i] = random(wave_angle,wave_angle+inc); 
      //strokeWeight(random(0.8,1.2));   
      line(i,y[i]+sin(angle[i])*wave_height+offset,pow(i,2.1),y[i]+(sin(angle[i])*wave_height+offset)*(i)); //y2*i make lines long enough to fill bottom of the sketch. 
                                                //That is because i is getting larger and larger up to 1200.
                                                //Making X2 pow make lines go diagonal
                                                //can't really explain why i put +y[i] to y1 and y2
                                                // but it allows me to give y[0] a new data              
    y[0] = - sea_level;                         // this changes the sea_level
    }
   // println(changed_waveheight);
                                                                                //float sineCurve = (sin(wave_angle)*wave_height)+ offset; 
                                                                                //float line_Y;    //I pulled it out and made it variable
                                                                                //line_Y = y[i]+sineCurve;
                                                                                //float n2 = 0.0;
                                                                                //float y2 =noise(0.0005,200);
                                                                                // noise
                                                                                 //j[i] = noise(wave_angle);
                                                                                 //n2 = n2 + 0.3;
                                                                                // println(wave_angle);
}  //end of drawWave

void mousePressed(){
  println(mouseX,mouseY); 
}

void waveColor(){
    for(int i = 1; i < y.length; i += 1){
      //fill_wave = map(i,1,y.length,80,1);  //since lines are drawn on position x(i), I converted the distance into 1~80.
      stroke(20-saturation,105+fill_wave,232-saturation);  //then i applied the converted value onto rgb color scheme.
                                  // this enabled darker color towards the end of sketch. And the opacity reaches 100% towards the end.
    }                                          
}  //end of WaveColor


//question = i tried making whole thing under a class- and didn't work. why is that?
