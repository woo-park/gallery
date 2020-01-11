
        function getTarget(e){
          if (!e) {
            e = window.event;

          }
          return e.target || e.srcElement;
        }

        var submitbtn = document.getElementById('submitbutton');
        submitbtn.addEventListener('click',showtext ,false);
        var textfield = document.getElementById('textform');

        function showtext(){
          // var targettedmenu = target.parentNode.parentNode;


        var newli, newlicontext;
        newli = document.createElement('li');
        newlicontext = document.createTextNode(textfield.value);
        newli.appendChild(newlicontext);
        this.parentNode.insertBefore(newli, textfield);
        // targettedmenu.appendChild(newli);

        // document.getElementById('displaytext').innerHTML = showtextpls;
        }
        // var linktag1 = document.getElementById('linktag1').attribute('anchor');
        // var linknode = document.createElement('a');
        // var linknodetext = document.createTextNode('<a href="' + htmlcss + '/index2.html\">');
        // var main = document.getElementById('main');
        // linknode.appendChild(linknodetext);
        // linknode.style.color = 'white';

        function dropMenu(e){
          // main.appendChild(linknode);
          // e.preventDefault();            //essential - blocking submit buttons
          var target, targetList, targetList_textContent;
          target = getTarget(e);
          console.log(target);

          if (target.className == 'menu1') {    //works// now doesn't show error saying childNodes[2] is undefined or soemthing
            console.log('ayyyy');



          targetList = target.parentNode;   //the first li
          targetList_textContent = targetList.nodeValue; //dont need this now
          // targetList.toggle();
          // targetList.childNodes[2].firstChild.nextSibling.removeEventListener('click');


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


// newItemLast.appendChild(newTextLast);
// list.appendChild(newItemLast);


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
