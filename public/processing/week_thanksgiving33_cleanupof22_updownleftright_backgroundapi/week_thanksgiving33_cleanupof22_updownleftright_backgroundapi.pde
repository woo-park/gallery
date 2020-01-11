int num = 30;
Skull[] skulls = new Skull[num];
int current_skull = 0;
Skull[] backup = new Skull[skulls.length];

float increment;       //upper key  //float
float incre_right;    //moves to right    //float
boolean trigger;
boolean button;

PImage todayPicture;

PImage getData(){    //&date=2017-07-12
  String api_key = "AmFMSEuMA9yaOvaEwfouyzQwPZTxKJcLpAjqqcBr&date=2018-12-02";    
  String base = "https://api.nasa.gov/planetary/apod?api_key=";    //I am guessing that it changes everyday
  String url = base + api_key;
  String todayImage;

  JSONObject json = loadJSONObject(url);
  //println(json);
  //println("-------");
  todayImage = json.getString("url");    //now tdimage has url
  todayPicture = loadImage(todayImage);
  todayPicture.resize(800,800);
  println(todayImage);
  println(json.getString("date"));
  return todayPicture;                      //this is the background api 
  
}//end of getdata - but this makes the processing so much slower

class Skull {
  float imgwidth; // = 180; changed to float
  float imgheight; // = 262; changed to float
  float front = 0.1;
  float z_depth;// = 190;  //changed to float
  float x_length;// = 180;  //float 
  float y_length;// = 262;  //float
  float increment;       //upper key  //float
  float incre_right;    //moves to right    //float
  PImage texture1, texture2, texture3, texture4;
  boolean on = true;
  float incre_up;
  float incre_down;
  

  Skull(float _imgwidth, float _imgheight, float _z_depth, float _x_length, float _y_length,
  float _increment, float _incre_right, String img1, String img2, String img3, String img4) {
    imgwidth = _imgwidth;
    imgheight = _imgheight;
    z_depth = _z_depth;
    x_length = _x_length;
    y_length = _y_length;
    increment = _increment;
    incre_right = _incre_right;
    texture1 = loadImage(img1);    //cool. image is now in constructor so you can change image as you create new object
    texture2 = loadImage(img2);
    texture3 = loadImage(img3);
    texture4 = loadImage(img4);
  }     //ends constructor

  void drawskullbox() {
    if(on == true){
    beginShape();
    texture(texture1);
    vertex(-x_length/2+incre_right, -y_length/2+incre_up, +z_depth/2-increment, 0, 0);
    vertex(x_length/2+incre_right, -y_length/2+incre_up, +z_depth/2-increment, 180, 0);
    vertex(x_length/2+incre_right, y_length/2+incre_up, +z_depth/2-increment, 180, 262);
    //vertex(160,232,0,180,262);    // hm
    vertex(-x_length/2+incre_right, y_length/2+incre_up, +z_depth/2-increment, 0, 262);
    endShape();

    beginShape();
    texture(texture2);
    vertex(-x_length/2+incre_right, -y_length/2+incre_up, -z_depth/2-increment, 0, 0);
    vertex(x_length/2+incre_right, -y_length/2+incre_up, -z_depth/2-increment, 180, 0);
    vertex(x_length/2+incre_right, y_length/2+incre_up, -z_depth/2-increment, 180, 262);
    //vertex(160,232,0,180,262);    // hm
    vertex(-x_length/2+incre_right, y_length/2+incre_up, -z_depth/2-increment, 0, 262);
    endShape();
    //

    beginShape();              //CHECK THIS SHAPE OUT I LOVE IT      -- the left side WOOOORKS
    texture(texture3);
    vertex(-x_length/2+incre_right, -y_length/2+incre_up, -z_depth/2-increment, 0, 0);
    vertex(-x_length/2+incre_right, -y_length/2+incre_up, +z_depth/2-increment, 180, 0);
    vertex(-x_length/2+incre_right, +y_length/2+incre_up, +z_depth/2-increment, 180, 262);
    vertex(-x_length/2+incre_right, +y_length/2+incre_up, -z_depth/2-increment, 0, 262);
    endShape();

    beginShape();              //CHECK THIS SHAPE OUT I LOVE IT      -- the right works as well
    texture(texture4);
    vertex(+x_length/2+incre_right, -y_length/2+incre_up, -z_depth/2-increment, 0, 0);
    vertex(+x_length/2+incre_right, -y_length/2+incre_up, +z_depth/2-increment, 180, 0);
    vertex(+x_length/2+incre_right, +y_length/2+incre_up, +z_depth/2-increment, 180, 262);
    vertex(+x_length/2+incre_right, +y_length/2+incre_up, -z_depth/2-increment, 0, 262);
    endShape();

    beginShape();    //bottom
    texture(texture1);
    vertex(-x_length/2+incre_right, +y_length/2+incre_up, +z_depth/2-increment, 0, 0);
    vertex(+x_length/2+incre_right, +y_length/2+incre_up, +z_depth/2-increment, 180, 0);
    vertex(+x_length/2+incre_right, +y_length/2+incre_up, -z_depth/2-increment, 180, 262);
    vertex(-x_length/2+incre_right, +y_length/2+incre_up, -z_depth/2-increment, 0, 262);
    endShape();

    beginShape();    //top
    texture(texture2);                                        //this one is special bc i switched the pixel order to have skull face towards me. the top one.
    vertex(-x_length/2+incre_right, -y_length/2+incre_up, +z_depth/2-increment, 0, 262);
    vertex(+x_length/2+incre_right, -y_length/2+incre_up, +z_depth/2-increment, 180, 262);
    vertex(+x_length/2+incre_right, -y_length/2+incre_up, -z_depth/2-increment, 180, 0);
    vertex(-x_length/2+incre_right, -y_length/2+incre_up, -z_depth/2-increment, 0, 0);
    endShape();
    }
  }//end of draw skull box
  
  void changetrigger(){
    if(keyPressed == true && key == ENTER){      //HELL YEEEEEEEEEESSSS
      button = true;
    }
    else if(keyPressed == false){
      button = false;
    }
   println(button); 
  }
  
  void condition2(){
    if(button == true){                        //
      if(keyPressed == true && key == CODED){
        if(keyCode == UP) {
          incre_up -=10;
        }
        if(keyCode == DOWN){
          incre_up +=10;
        }
      }
    }
  }
  
  void condition() {
    if(button == false){      //left right
      if (keyPressed == true && key == CODED) {
        if (keyCode == UP) {
          increment+=10;
        }
        if (keyCode == DOWN) {
          increment-=10;
        }
        if (keyCode == RIGHT) {
          incre_right+=10;
        }
        if (keyCode == LEFT) {
          incre_right-=10;
        }
      }
    }
  }
  
  

  void rotation() {
    //this is also the key - it stops from multiplying translate when called in draw function
    float rx = map(mouseY, 0, height, 0, TWO_PI*2);      //this is full circle rotate - pi is half, half pi is half of that
    float ry = map(mouseX, 0, width, 0, TWO_PI*2); //WHY TIMES2? bc it was showing back surface when i got to middle  // WHY ISN'T HALF PI WORKING??    YOU PUT IT INSIDE THE translate, so the center is center when you rotate
    
    translate(width/2, height/2, -height/4);
    //if(mousePressed == true){              //this is holding me back again
    rotateX(-rx);
    rotateY(ry);        // i tried with minus 
    fill(124, 12);
  }

 
  
  //void start(float _imgwidth, float _imgheight, float _z_depth, float _x_length, float _y_length, float _increment, float _incre_right, String img1, String img2, String img3, String img4){
  //   imgwidth = _imgwidth;
  //  imgheight = _imgheight;
  //  z_depth = _z_depth;
  //  x_length = _x_length;
  //  y_length = _y_length;
  //  increment = _increment;
  //  incre_right = _incre_right;
  //  texture1 = loadImage(img1);    //cool. image is now in constructor so you can change image as you create new object
  //  texture2 = loadImage(img2);
  //  texture3 = loadImage(img3);
  //  texture4 = loadImage(img4);
  //  on = true;
  //} //end of void start - maybe need lator on

  //void move() {                                                  //FAILURE- no need
    //if (mousePressed == true) {
      //mousePressed = false;
      //if (current_skull < 9) {
      //  current_skull++;
      //  skulls[current_skull - 1].drawskullbox();
        
        
      //  // HELP - This is an attempt to have the prvious block still hold 
      //  // even when a new block is created.
      //  //
      //} else if( current_skull == 2){
      //  skulls[current_skull - 2].drawskullbox();
      //} else if( current_skull == 3){
      //  skulls[current_skull - 3].drawskullbox();
      //}
      ////
      //else {
      //  for (int i = 0; i < 10; i++) {
      //    skulls[i] = new Skull(180.0, 262.0, 190.0, 180.0, 262.0, 0, 0,"img1.png","img2.png","img3.png","img4.png");
      //  }
      //}
      ////pushMatrix();
      ////skulls[current_skull].rotation();
      //skulls[current_skull].drawskullbox();
      //skulls[current_skull].move();
      ////popMatrix();
      //println(current_skull);
      //println(backup.length);
    //}
    //else{
    //skulls[current_skull].condition();
    //}
  //}// end of void move
  
  
}  //end class Skull


void setup() {
  size(800, 800, P3D);
  ellipseMode(RADIUS);
  stroke(0.2);
  fill(153, 1);
  getData(); //trying rn
  
  for (int i = 0; i < skulls.length; i++) {
    skulls[i] = new Skull(180.0, 262.0, 190.0, 180.0, 262.0, 0, 0,"img1.png","img2.png","img3.png","img4.png"); 
    //sets up how many skulls i can draw
  }
  //skulls[0] = new Skull(180.0, 262.0, 190.0, 180.0, 262.0, 0, 0);    //no need
   arrayCopy(skulls,backup);
 
  // for (int i = 0; i < backup.length; i++) {                         // thought i need two arrays
  //backup[i] = new Skull(180.0, 262.0, 190.0, 180.0, 262.0, 0, 0,"img1.png","img2.png","img3.png","img4.png");
  // }
}

void draw() {
  background(todayPicture);
  lights();
  skulls[current_skull].rotation();
  
  if(current_skull > current_skull-1){            // this made it work; ultimate
    skulls[current_skull].changetrigger();
    if(button == false){
      skulls[current_skull].condition();
     };
    if(button == true){
    skulls[current_skull].condition2();  //moves xaxis yaxis
    };
  }
   
   for(Skull s : skulls){                 // known as enhanced for loop - easier
     s.drawskullbox();
   }
   
   println(current_skull);
}//end of draw

void mousePressed(){
  current_skull++;
  skulls[current_skull] = new Skull(180.0, 262.0, 190.0, 180.0, 262.0, 0, 0,"img1.png","img2.png","img3.png","img4.png");
}//end of mousePress



//1:15am
