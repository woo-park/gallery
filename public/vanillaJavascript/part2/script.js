
      const logo_area = document.querySelectorAll('.logo_area');    //have two var for logo_box
      let converted_browser_height;
      let converted_browser_width;

      function scaleBrowserRatio() {
        let browserWidth = window.innerWidth;
        let browserHeight = window.innerHeight;
        // console.log(browserWidth,'this is broswerwidth',browserHeight,'this is browser height');
        converted_browser_width = browserWidth / 100;    //just shrinking it?
        converted_browser_height = browserHeight / 100;
      }

      function mousePosition(event) {
        let xPos = event.clientX;
        let yPos = event.clientY;
        // console.log(xPos,'this is xPos',yPos,'this is yPos');
        updateRotation(xPos, yPos);
      }

      function updateRotation(xPos, yPos){
        let xRotation = 50 - Math.ceil(yPos / converted_browser_height);
        let yRotation = -50 + Math.ceil(xPos / converted_browser_width);
        // console.log(xRotation,'deg xRotation here',yRotation,'deg yRotation here');

        for(logos of logo_area){
          logos.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
        }
      }

      window.addEventListener('load', scaleBrowserRatio);
      window.addEventListener('mousemove', mousePosition);
      window.addEventListener('resize', scaleBrowserRatio);

      // scaleBrowserRatio();
      // mousePosition();
      // updateRotation();


      // let logo_box = document.getElementById('logo_box');

      // logo_box.appendChild(logo);

      // window.addEventListener('click',change);
      // logo_box.addEventListener('mousemove', change);   //its better with mouseover
      // logo_box.addEventListener('mouseout', changeBack);

      for (logos of logo_area){
        let logo = document.createElement('div');
        let logo_text = document.createTextNode('Live');
        logo.appendChild(logo_text);
        logos.appendChild(logo);
        logos.addEventListener('mousemove',change);
        logos.addEventListener('mouseout', changeBack);
        logos.addEventListener('click',changeToLove);
        // logos.addEventListener('click',stopFewSec);   //aintworking
      }


      let random_sec = Math.floor(Math.random() * 1000);

      function changeBack (){
        requestAnimationFrame(()=>{
          setTimeout(()=>{
            this.lastChild.textContent = 'LIVE'  // logo_box.style.border = '1px solid black';
            console.log('changebackfunction');
          }, random_sec);
        });
      }

      function changeToLove (){
        requestAnimationFrame(()=>{
          setTimeout(()=>{
            this.lastChild.textContent = 'Love';  // logo_box.style.border = '1px solid black';

            // for(logos of logo_area) {
            //   logos.removeEventListener('mouseout',changeToLove);
            // }    //doesn't work
          }, random_sec);
        });
        // for(logos of logo_area) {
        //   logos.removeEventListener('mouseout',changeBack);
        // }
        // cancelAnimationFrame(changeBack);
      }

      function stopFewSec() {
        requestAnimationFrame(()=>{
          setTimeout(()=>{
            for(logos of logo_area) {
              logos.removeEventListener('mouseout',changeBack);
            }
            changeBack();
          },3000);
          // changeBack();

        })
      } //aint working


      function change() {

        let random_ascii_1 = 32 + Math.ceil(Math.random() * 92);
        let random_ascii_2 = 32 + Math.ceil(Math.random() * 92);
        let random_ascii_3 = 32 + Math.ceil(Math.random() * 92);
        let random_ascii_4 = 32 + Math.ceil(Math.random() * 92);
        console.log('lastchild of logo_box', this.lastChild);
        console.log('random_sec', random_sec);

          let query = requestAnimationFrame(()=>{
            setTimeout(()=>{
              //this used to be - logo_box.lastChild.textContent = String.fromCharCode(random_ascii_1,random_ascii_2,random_ascii_3,random_ascii_4);
              this.lastChild.textContent = String.fromCharCode(random_ascii_1,random_ascii_2,random_ascii_3,random_ascii_4);


            }, random_sec);
          });
      }
      let hyperlink = document.querySelector('#hyperlink');
      let mainpage = document.querySelector('#mainpage');
      let counter = 0;
      let animation1 = requestAnimationFrame(colorChange);

      function colorChange(){
        animation1 = requestAnimationFrame(colorChange);
          counter++;
        if(counter < 100){

          hyperlink.style.opacity = counter/100;
          mainpage.style.opacity = counter/200
        } else{
          counter =0;
        }


      }
