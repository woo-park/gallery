$(document).ready(function() {

  // var $menubar;
  //
  // menuBar = document.getElementById('nav_list');
  // console.log(menuBar);
  //
  // menuBar.addEventListener('click',toggler,false);
  //
  // function toggler() {
  //   var newItemFirst = document.createElement('li');
  //   var newItemFirst_text = document.createTextNode('menu');
  //   newItemFirst.appendChild(newItemFirst_text);
  //   newItemFirst.setAttribute('class','nav_item');
  //   menuBar.appendChild(newItemFirst);
  // }

  function drawLineOver() {
    var nav_click = document.querySelectorAll('li.nav_item');
    // var line_thru = document.querySelectorAll('li.lineThru');
    for(let i = 0; i < nav_click.length; i++){
      if( true){
        nav_click[i].addEventListener('click',function(){
          nav_click[i].style.cssText = "border:1px solid black;text-decoration:line-through";
          // nav_click[i].style,{color:"white",textDecoration:"line-through"};
          // nav_click[i].style.textDecoration = 'line-through';
          nav_click[i].setAttribute('class','lineThru');
          console.log(nav_click[i]);
        },false);
      };
        // addEventListener('click',function(){
        //   nav_click[i].setAttribute('class','dog');
        // },false);
        // addEventListener('click',function(){
        //   nav_click[i].style.textDecoration = '';
        // },false);
    };//end of for
  };

  drawLineOver();
  var mainItems;
  var mainSpace = document.getElementById('main');

  mainItems = document.querySelectorAll('div.mouseover');
  console.log(mainItems);
  for(let i = 0; i < mainItems.length; i++){
    mainItems[i].style.margin = "auto";
  }



  var $menuBar;
  menuBar = document.getElementById('menu');

var removeLi = document.querySelectorAll('li.nav_item');

function menuslide(){
    for(var i = 0; i < removeLi.length; i ++){

    menuBar.parentNode.removeChild(removeLi[i]);
    };

  menuBar.addEventListener('click',function(){
    for(var i = 0; i < removeLi.length; i ++){

    menuBar.parentNode.appendChild(removeLi[i]);
    // removeLi[4].setAttribute('class','logo');
    // console.log(removeLi[1]);

    // removeLi[i].childNodes[1].nodeValue.setAttribute('style','line-through');
    };
  },false);
};
  menuslide();




//figuring out the window size so i can adjust to size of videos
  var windowsize;
  windowsize = window.innerWidth;
  console.log(windowsize);





});
