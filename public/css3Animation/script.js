//
// var chosen = document.querySelector('#wallid');
// var chosenblock = document.querySelectorAll('.wallblock');
// console.log(chosenblock);
// // let chosenchild = chosen.firstChild.getAttribute('wallblock');
// console.log(chosen);
//
//

let wall = document.querySelector('#wallid').lastChild.previousSibling;
// let chosen2 =
window.addEventListener('click',(event) => {
  target = event.target;
  console.log(wall);
})
// console.log(chosen);
// let counter = 0;
// let list = document.querySelector('#list');
// function addstory(){
//   list.addEventListener('click', addon = (event) => {
// counter++;
//     for(let a of friends){
//
//       let target = event.target;
//       let context = elt('div',{class:'box'},friends[counter].text);
//
//       target.addEventListener('click',()=>{
//         target.appendChild(context);
//         list.removeEventListener('click', addon);
//       })

      // if(target.hasChildNodes()){
      //   target.parentNode.removeEventListener('click', addon);
      //
      // }
//       return(target);
//     }
//   });
// }

let counter = 0;
console.log(counter);
function story(){
let list = document.querySelector('#list');
  list.addEventListener('click', listener_1 = (event) => {
    console.log(counter);
    list.removeEventListener('click', listener_1);
    for(let keys of friends){
    let returndom = elt( "div", {class: "box"}, friends[counter].text );
    let returned = event.target.appendChild(returndom);
      returned.addEventListener('click', () => {
        list.removeEventListener('click', listener_1);
        console.log('2nd addevent listener');
        counter++;
        console.log(counter);
        returned.appendChild(elt('div',{class:"box"}, friends[counter].text));
      });
      return(returned);
    }
  }); //end of eventlistener //end of listener_1 func
}












// window.addEventListener('click',()=>{
//   console.log('jaybay');
//   chosen.addEventListener('click',()=>{
//     console.log('kaybay');
//   })
//
// })
// chosen.addEventListener('click',()=>{
//   console.log('jaybay',false);
// });
