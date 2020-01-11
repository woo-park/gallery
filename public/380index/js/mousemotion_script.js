let lastX;
let bar = document.getElementById('dragbar');
bar.addEventListener("mousedown", event => {
  if (event.button == 0){
    lastX = event.clientX;
    console.log(lastX);
    //awesome it works
    window.addEventListener("mousemove",moved);
    // event.preventDefault();   // this works without this
  }
});

function moved(event) {
  if(event.buttons == 0){   //so its saying, when mouse left btn is released, remove
    window.removeEventListener("mousemove",moved);
  } else {                    // else if its not released, continue change the bar width
    let dist = event.clientX - lastX;
    let newWidth = Math.max(10, bar.offsetWidth + dist);  //minimum 10
    // console.log(Math.max(1, 3, 2));
// expected output: 3
    console.log(newWidth);
    bar.style.width = newWidth + "px";
    lastX = event.clientX;    //if not, then it adds ontop continuosly
    //does this make it increase by 1px??
  }
}
