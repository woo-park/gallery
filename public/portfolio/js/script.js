window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    let sideBlock = document.querySelectorAll('.sideBlock');
    let videos = document.querySelectorAll('.videos');
    let scene = document.querySelectorAll('.scene');

    videos.forEach((each) => {
      each.addEventListener("mouseenter", function( event ) {

        each.play();

        console.log(event.target.parentElement.nextElementSibling)//but need to check if it exists
        console.log(event.target.parentElement.previousElementSibling)

        let rightSideBlock = event.target.parentElement.nextElementSibling
        let leftSideBlock =  event.target.parentElement.previousElementSibling
        let rotateAmount = 50;
        leftSideBlock.style.transform = `rotateY(${rotateAmount}deg)`



        console.log(leftSideBlock.style,'style')
        rightSideBlock.style.transform = `rotateY(-${rotateAmount}deg)`


        let length = 200;
        let pushback = length *
            (Math.sin(rotateAmount * Math.PI / 180) / Math.sin(90 * Math.PI / 180))
        console.log(pushback)

        let push = false;
        event.target.parentElement.style.transform = `translateZ(-${pushback}px)`;
        push = true;

        if (push == true){
          setTimeout(()=>{
            event.target.parentElement.style.marginLeft = '-72px'
            event.target.parentElement.style.marginRight = '-72px'
            push = false;
          },1000)
        }



      })

      each.addEventListener("mouseout", function( event ) {
        each.pause();
        event.target.parentElement.style.marginLeft = '0px';
        event.target.parentElement.style.marginRight = '0px';

        // setTimeout(()=>{
          event.target.parentElement.style.transform = "translateZ(0px)";
        // },1000)


        let leftSideBlock = event.target.parentElement.nextElementSibling
        let rightSideBlock =  event.target.parentElement.previousElementSibling

        leftSideBlock.style.transform = "rotateY(0deg)  translateZ(0px)"
        rightSideBlock.style.transform = "rotateY(0deg)  translateZ(0px)"

      })
    })


});
