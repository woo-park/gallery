
        function getTarget(e){
          if (!e) {
            e = window.event;
          }
          return e.target || e.srcElement;
        }


        var submitbtn = document.getElementsByClassName('submitbutton');
        for(var k = 0; k < submitbtn.length; k++){
        submitbtn[k].addEventListener('click', showtext ,false);
      }

        function showtext(){
          // target = getTarget(e);
          // var targettedmenu = target.parentNode.parentNode;

        var textfield = document.getElementsByClassName('textform');
        for(var i = 0; i < textfield.length; i++){
        var newli, newlicontext;
        newli = document.createElement('li');
        newlicontext = document.createTextNode(textfield[i].value);
        newli.appendChild(newlicontext);
        // this.parentNode.insertBefore(newli, textfield[i]);
        this.parentNode.appendChild(newli);
        // targettedmenu.appendChild(newli);
        }
        // document.getElementById('displaytext').innerHTML = showtextpls;
        }


        function dropMenu(e){
          e.preventDefault();
          var target, targetList, targetList_textContent;
          target = getTarget(e);
          console.log(target);

          if (target.className == 'menu1') {    //shit works// now doesn't show error saying childNodes[2] is undefined or soemthing
            console.log('ayyyy');



          targetList = target.parentNode;   //the first li
          targetList_textContent = targetList.nodeValue; //dont need this now
          // targetList.toggle();


          if(targetList.childNodes[2].style.display == "none") {
            targetList.childNodes[2].style.display = "block";
          }
          else {
            targetList.childNodes[2].style.display = "none";
          }


          console.log(targetList.childNodes[2].style);

          var secondMenu = targetList.childNodes[2];  //that is bc firefox whitespace
          // }
            // console.log(targetList.childNodes[2]);

          // //well this works but i figured a betrer way
          // if(targetList.childNodes.length > 1 && targetList.childNodes[2].style ){
          //   // targetList.childNodes[2].removeAttribute('class','show');
          //   targetList.childNodes[2].style.display = "block";
          // }
          // else if(targetList.childNodes[2].style.display == "block"){
          //   targetList.childNodes[2].style.display = "none";
          // }
          }
        }       //end of dropMenu


        var allMenu = document.getElementById('overall_menu');
        if (allMenu.addEventListener){
          allMenu.addEventListener('click', function(e){dropMenu(e);},false);
        };

        var firstMenu = document.getElementsByClassName('show');

        for(var j = 0; j < firstMenu.length; j++){
          firstMenu[j].style.display = "none";
        }
