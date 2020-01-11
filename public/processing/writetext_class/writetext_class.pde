//fixed awai bug
Letter letters = new Letter(0,400,"2018-11-04","dog","cat1","mew","ha");


void setup(){
  size(800,800);
  fill(0);
}


void draw(){
  background(12,207,250);
  
  letters.writeText();
  letters.drawLine();
  letters.matchText();
  
}

void keyPressed(){
  
  letters.typeText();
  
}


class Letter{
  //var
  String blankText = "";
  //char data[] = {'a','w','a','y'};        */I can either do it this way or like below /*
  //String data = "away";
  //String sampleText = new String(data);    //original approach
  String[] sampleText = {"","","","",""};
  boolean match;
  int xposition;
  int yposition;
  
  
  //constructor
  Letter(int xpos, int ypos,String t1, String t2, String t3, String t4, String t5){
     xposition = xpos;
     yposition = ypos;
     sampleText[0] = t1;
     sampleText[1] = t2;
     sampleText[2] = t3;
     sampleText[3] = t4;
     sampleText[4] = t5;
  }
  
  
  //typing text
  void typeText(){
    if(key == BACKSPACE){
      if(blankText.length() > 0){
        blankText = blankText.substring(0,blankText.length()-1);
      } 
    } else if (textWidth(blankText + key) < width){
      blankText = blankText + key;
      //println(key);     spits key
      //println(int(key));  spits number
      //println(int(blankText)); spits 0 -- always
    }
  }
  
  void writeText(){
  text(blankText,xposition,yposition);
  }
  
  //draw line
  void drawLine(){
    float textEndPosition = textWidth(blankText);
    line(textEndPosition,0,textEndPosition,height);
    
  }  //end of void line
  
  //match text
  void matchText(){
    for(int j = 0; j < sampleText.length; j ++){    //idk how but it worked
    //  println(sampleText.length);
    if(blankText.length() == sampleText[j].length()){
      for(int i = 0; i < blankText.length(); i ++){      // or i = j also works
        if(blankText.charAt(i) == sampleText[j].charAt(i)){
          match = true;
        } else {
          match = false;
          break;
        }
      }  //end for loop
              if(match == true){     
                 background(0);
                }                    
                                    //this fixed awai bug - now characters have to match 100% -
                                    //but ask why it was creating error 
                                    //when i put inside for loop. 
                                    //For example, awai, awoo, awao, etc. worked
               
    } // end if condition
    }//j
      
    //println(match);
  } //end void matchText
}  //end of class Letter



//just realized that there is error -- try typing away or awai and several others
// they all work
