window.addEventListener("load", function(){
  // e = window.event;
  // e.preventDefault();
  var moveVideo1, moveVideo2, moveVideo3;
  moveVideo1 = document.getElementById('video1');
  var v1_position = 0;    // var counter = 0;

  var id = setInterval(frame, 5);
  function frame(){
      if(v1_position == 300) {
        clearInterval(id);
      } else {
        v1_position++;
        moveVideo1.style.top = v1_position + 'px';
      }
  }
} ,false);    //end of window.addEventListener


// let lastTime, time, newTime;
let video3 = document.getElementById('video3');
let video2 = document.getElementById('video2');
let angle = Math.PI / 2;
let leftpos = '-100';


function movevid2(time, lastTime){
  setTimeout(function(){
    if(leftpos < 0){
      leftpos++;
    }
    // else if(leftpos > 100){      //doesn't work
    //   leftpos--;
    // }
      video2.style.left = leftpos + 'px';
      requestAnimationFrame(movevid2);
  });
}
requestAnimationFrame(movevid2);

let photo1, photo2, photo3;                 //
photo1 = document.getElementById('photo1');   //
photo2 = document.getElementById('photo2');
photo3 = document.getElementById('photo3');

function movevid1(time, lastTime){
  if(lastTime != null){
    angle += (time - lastTime) * 0.001;
  }

  // photo1.style.top = 700 + (Math.sin(angle) * 20) + "px";   //
  photo1.style.top = 90 + (Math.sin(angle) *50) + "px";    //top movement doesn't work for some reason. weird with percent- is is bc of the layout?
  photo1.style.left = 70 + (Math.cos(angle) *3) + "%";     //orange bucket
  // photo2.style.top = 400 + (Math.sin(angle) * 20) + "px";   //
  // photo2.style.left = 1100 + (Math.sin(angle) * 200) + "px";   //new method is applied bc this goes outside boundary


  photo2.style.top = 430 + (Math.sin(angle) * 30) + "px";   //
  photo2.style.left = 20+ (Math.cos(angle) * 2) + "%";   // green bucket


  photo3.style.top = 50 + (Math.sin(angle) * 70) + "px";   //top is not working with %
  photo3.style.left = 10 + (Math.cos(angle) * 4) + "%";   //blue bucket

  video3.style.top = 20 +(Math.sin(angle) * 20) + "px";
  video3.style.left = 20 + (Math.cos(angle) * 10) + "%";
  requestAnimationFrame(newTime => movevid1(newTime, time));
  // console.log(newTime,time,lastTime);    //so i don't have to declare these timestamps?
}
requestAnimationFrame(movevid1);



console.log('jaayyyy');
