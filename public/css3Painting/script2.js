window.addEventListener("load", function(e){
  // e = window.event;
  // e.preventDefault();
  var moveVideo1, moveVideo2, moveVideo3;
  moveVideo1 = document.getElementById('video1');
  moveVideo2 = document.getElementById('video2');
  moveVideo3 = document.getElementById('video3');
  var v1_position = 0;
  var v2_position = 0;
  var v3_position = 0;
  var v3_width = moveVideo3.style.width;
  // var counter = 0;

  var id = setInterval(frame, 5);
  function frame(){
    // counter++;
    // if(counter === 10) {}
    //counter
      //
      // if(v3_position < 800){       //v3 width   //lets have this width grow
      //   v3_position++;
      //   v3_width++;                   //trial
      //   moveVideo3.style.left = v3_width + 'px';  //trial
      // } else if (v3_position >= 800) {
      //   v3_position--;
      //   moveVideo3.style.left = v3_position + 'px';
      // }

      if(v1_position == 300) {
        clearInterval(id);
      } else {
        v1_position++;
        moveVideo1.style.top = v1_position + 'px';
      }
  }
  var check = false;
  // var id2 = setInterval(frame2, 100);
  function frame2() {
    // if(v2_position == 200) {
    //   // clearInterval(id2);
    // } else {
    //   v2_position++;
    //
    // }
   if(v2_position <= 100 && check == false){
     v2_position++;
     if(v2_position >= 100){
       check = true;
     }
      // console.log(check);
   }
    if(check == true){
      // console.log('dog');
    }
      moveVideo2.style.top = v2_position + 'px';
      // console.log(moveVideo2.style.top);

    // if(v2_position >= 400) {   //window
      // setInterval(frame, 5);
      // moveVideo2.style.top = v2_position + 'px';
    }

} ,false);


// let lastTime, time, newTime;
let video3 = document.getElementById('video3');
let video2 = document.getElementById('video2');
let angle = Math.PI / 2;
let leftpos = 0;

function movediv(time, lastTime){
  setTimeout(function(){
    if(leftpos < 100){
      leftpos++;
    }
    // else if(leftpos > 100){      //doesn't work
    //   leftpos--;
    // }
      video2.style.left = leftpos + 'px';
      requestAnimationFrame(movediv);
  });
}
requestAnimationFrame(movediv);

function moveit(time, lastTime){
  if(lastTime != null){
    angle += (time - lastTime) * 0.001;
  }
  video3.style.top = (Math.sin(angle) * 20) + "px";
  video3.style.left = (Math.cos(angle) * 200) + "px";
  requestAnimationFrame(newTime => moveit(newTime, time));
  // console.log(newTime,time,lastTime);    //so i don't have to declare these timestamps?
}
requestAnimationFrame(moveit);



console.log('jaayyyy');






// lets try to figure out the window size of the user
// and then move accordingly
// well i can do like
// when it shows a height of 1000 then
 // unless windowheight - videoheight = 400 for instance
 // then i can have the video to move 400 up and down

 // same for horizontal moving
 // i need to find the difference between windowwidth and video itself,
 // and then move the video's position accordingly, so it doesn't go beyond the window size
