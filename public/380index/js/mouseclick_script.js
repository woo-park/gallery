

window.addEventListener("click", press = (event) => {

  if(event.button == 0){

  let dot = document.createElement("div");
    dot.style.height = 8 + "px";
    dot.style.width = 8 + "px";
    dot.style.borderRadius = 4 + "px";
    dot.style.background = "coral";
    dot.style.position = "absolute";

  // dot.className = "dot"; // well you've defined the style properties here instead of making a class
    dot.style.left = (event.clientX - 4) + "px";
    dot.style.top = (event.clientY - 4) + "px";
    let lesson2 = document.getElementById("lesson2");
    lesson2.appendChild(dot);
    console.log(dot);
    if(event.buttons == 0){
      console.log("released");
      lesson2.removeChild(lesson2.lastChild.previousSibling);   //okay this finally works
          //bet there is even better way to do it but
    }

}
});
