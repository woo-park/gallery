// A revised version of the previous website with JavaScript interactivity, externally applied in a .js document (2 points)
// At least two DOM queries (1 point)
// At least two functions that are called with DOM events (2 points)
// One of the functions should update page content and one of the functions should change a CSS property (2 points)
// The JavaScript Date object, used to identify the day of the week (1 point)
// A JavaScript decision structure to modify a web page uniquely for each day of the week (2 points)

var date = new Date();
// var month = date.getMonth();
// var day = date.getDay();
var month = date.getMonth();
var day = date.getDay();
console.log(month);
console.log(day);

// function todaydate(){
var day_names, monthNames, day, date, month, year;

dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
monthNames = ['January','Februray','March','April','May','June','July','August','September','October','November','December'];

day = dayNames[date.getDay()];  //returns 0-6
datenumber = date.getDate();          //returns 0-29ish
month = monthNames[date.getMonth()]; //month
year = date.getFullYear();
    // today_date.textContent = day;
// }

var tday = document.getElementById('today_date');
tday.textContent = month +' '+datenumber;

// var ul_list = document.querySelector('nav_list')


var last_li = document.createElement('li');
// ul_list.appendChild(last_li);
var last_li_text = document.createTextNode('Today is  ' + day ); //putinside date here
last_li.appendChild(last_li_text);
tday.appendChild(last_li);

var fourth_item = document.getElementsByTagName('li')[4];
fourth_item.setAttribute('class','whitefont');

var nav_li = document.querySelectorAll('li');
// console.log(nav_li);


  nav_li[0].addEventListener('click',change());
  nav_li[1].addEventListener('click',change2());
  nav_li[2].addEventListener('click',change());
  nav_li[3].addEventListener('click',change());

function change(){
  var change = Math.round(Math.random());
  console.log(change);
  var image;

  if(change == 0){
    image = 'images/coffeebean11.png';
  } else {
    image = 'images/p.png';
  }

document.getElementById('logoimg').src = image;
} //ends function here

function change2(){
  var change = Math.round(Math.random());
  console.log(change);
  var image;

  if(change == 0){
    image = '../images/coffeebean11.png';
  } else {
    image = '../images/p.png';
  }

document.getElementById('logoimg').src = image;
}

nav_li[1].addEventListener('click',function(){
    window.alert("Try flipping logo by clicking!");
});
nav_li[2].addEventListener('click',function(){
    window.alert("Try flipping logo by clicking!");
});
nav_li[3].addEventListener('click',function(){
    window.alert("Try flipping logo by clicking!");
});


// if(day == 3){
//   document.getElementById('main').backgroundColor = red;
// }

var page_title = document.getElementById("topic");
page_title.innerHTML = "<h3>Brief Coffee History </h3>";

var hour = date.getHours();

if(hour >= 0){
var main_background = document.getElementById("main");
main_background.style.backgroundColor = "pink";
}
else if(hour >= 12){
  var main_background = document.getElementById("main");
  main_background.style.backgroundColor = "skyblue";
}
else{
  var main_background = document.getElementById("main");
  main_background.style.backgroundColor = "coral";
};

var image_borders = document.querySelectorAll('img.images');
for(var i =0; i < image_borders.length; i++){
  image_borders[i].className = 'borders';
};

// var capital = document.querySelectorAll('capital');
// captial.style.background = "blue";
// console.log(capital);
// var capital_letter = capital.querySelector('p');
// console.log(capital_letter);
// var btn = document.getElementById('heading');
//
// btn.addEventListener('click',function(){
//   change();
// });
