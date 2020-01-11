let para_l4 = document.getElementById('para_l4');
let button_l4 = document.getElementById('button_l4');
para_l4.addEventListener("mousedown", event => {
  console.log("handler for paragraph");
});
button_l4.addEventListener("mousedown", event =>{
    console.log("handler for button.");             //left click = click on both para_l4 and button_l4 BUT
    if(event.button == 2) event.stopPropagation();  //right click = only button_l4
    //try changing event.button == 0 bc this will then stop propagting with left click
    // only accessing button_l4
});

//event.button == 0 is left button
//event.button == 1 is middle button
//event.button == 2 is right button

