document.body.addEventListener("click", event => {
  if(event.target.nodeName == "BUTTON"){
    let showclickedbtn = event.target.textContent;
    console.log("clicked", showclickedbtn);
    let newdiv = document.createElement("div");
    let newdivtextnode = document.createTextNode(showclickedbtn);
    // newdiv.style. = "white";
    newdiv.appendChild(newdivtextnode);
    console.log(newdivtextnode);

    let lesson3 = document.getElementById("lesson3");
    lesson3.appendChild(newdiv);
  }
});
