function elt(name, attrs, ...children){
  let dom = document.createElement(name);
  for(let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of Array.from(children)) {
    if(typeof child != "string") {Array.from(child);child.toString();console.log(child)}
    // child.toString();console.log('its a object',child);dom.appendChild(document.createTextNode(child.toString()));
    else {console.log(child); dom.appendChild(document.createTextNode(child));}
  }
  return dom;
}

let simpleArray = ["x","y","z"];
let simpleArray2 = {a:1, b:2};

let elt_element = elt("div", {class: "box"}, "lorem",elt("em",{class:"box"},simpleArray2));
document.getElementById("lesson4").appendChild(elt_element);
console.log("elt");
// let reborn = elt("div", {class: "game"}, "aii",
//     elt("div", {class: "game"}, "aiii");
//   );
