      let letter = document.getElementById('letter');
      let letter2 = document.getElementById('letter2');
      window.addEventListener('load', windowScale);
      window.addEventListener('load', changeLocation);

      let ran_browserWidth;
      let ran_browserHeight;
      let ran_browserWidth2;
      let ran_browserHeight2;

      function windowScale(){
        let browserWidth = window.innerWidth;
        let browserHeight = window.innerHeight;

        ran_browserWidth = Math.ceil(Math.random()*browserHeight);
        ran_browserHeight = Math.ceil(Math.random()*browserHeight);
        ran_browserWidth2 = Math.ceil(Math.random()*browserHeight);
        ran_browserHeight2 = Math.ceil(Math.random()*browserHeight);
        console.log(ran_browserWidth,ran_browserHeight);
      }

      function changeLocation(){
        letter.style.top = `${ran_browserHeight}px`;
        letter.style.left = `${ran_browserWidth}px`;
        letter2.style.top = `${ran_browserHeight2}px`;
        letter2.style.left = `${ran_browserWidth2}px`;
      }

      let logo_box = document.querySelectorAll('.logo_area');

      for(logos of logo_box){
        logos.addEventListener('mouseover',findDiv);
        // logos.style.transform = `translateZ(0px)`;
      }

      let animation = requestAnimationFrame(opaque);
      let opac = 0;

      function opaque() {
        animation = requestAnimationFrame(opaque);

        if (opac < 100) {
          opac += 1;
            letter.style.opacity = opac/100;
            // letter.style.transform = `translateZ(-30px)`;
            letter2.style.opacity = opac/100;
            // letter2.style.transform = `translateZ(-30px)`;
        } else {
          opac = 0;
        }
      }

      let animation2;

      function findDiv(event){


        let targeted_nodeName = event.target.nodeName;
        let targeted = event.target;

        if(targeted_nodeName == "DIV" && targeted.className == "logo_area"){

            let animation2 = requestAnimationFrame(shiftZ);
        }

        function shiftZ(){
          if(targeted.className == "exclude"){
            targeted.style.transform = `translateZ(0px)`;
          } else{
            targeted.style.transform = `translateZ(180px)`;
          }
        }

      }

      // function zshift


      //restore
      let re = document.querySelector('#restore');

      // re.addEventListener('click', ()=>{
      //   let p1 = new Promise((resolve) =>{
      //       let animation3 = requestAnimationFrame(restore)
      //     resolve('resolved ani2');
      //   });
      //   p1.then(()=>{
      //           letter.style.backgroundColor = 'green';
      //           cancelAnimationFrame(animation3);
      //     });
      // });
      // re.addEventListener('click',restore);


// transparency mode
      let op = document.querySelector('#transparent');

      let counter = 1;
      op.addEventListener('click', ()=>{

        counter++;
        for(logos of logo_box){
          logos.style.transition = `all 1000ms ease`;
          console.log(counter,'counter is');
          if(counter%2){
              logos.style.opacity = 1;
            } else {
              logos.style.opacity = 0.2;
            }
        }

      });

      window.addEventListener('load',prompt('find two hidden links! `re` is to restore & `op` is for transparency mode'))
//can't fix this part - zindex
      //
      // window.addEventListener('load',()=>{
      //   for(logos of logo_box){
      //         // logos.addEventListener('mouseover',findDiv);
      //         // logos.style.transform = `translateZ(0px)`;
      //       }
      // });


//function restore - have a bug also - not the same after using it
//DONT NEED THIS --FIXED
      // function restore(event){
      //   for(logos of logo_box) {
      //
      //     logos.style.transition = `all 100ms linear`;
      //     // logos.style.transform = `translateZ(0px)`;
      //     logos.style.transform = 'Null';
      //
      //
      //     let targeted_nodeName2 = event.target.nodeName;
      //     let targeted2 = event.target;
      //
      //     if(targeted_nodeName2 == "DIV" && targeted.className == "logo_area"){
      //
      //         let animation6 = requestAnimationFrame(shiftZ);
      //     }
      //
      //     function shiftZ(){
      //       if(targeted.className == "exclude"){
      //         targeted.style.transform = `translateZ(0px)`;
      //       } else{
      //         targeted.style.transform = `translateZ(180px)`;
      //       }
      //     }
      //
      //     // animation2 = requestAnimationFrame(shiftZ);  //doesn't work
      //   }
      // }


      // letter.style.transform = `translateZ(-20px)`;
