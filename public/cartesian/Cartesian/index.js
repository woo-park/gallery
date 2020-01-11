
let Cartesian = function (){


let coords_triangle = [];

function drawTriangle(x1,y1,x2,y2,x3,y3) {
    let newarray = [];
    for(let i = 0; i < 6; i ++) {
        newarray.push(arguments[i]);   
    }
    coords_triangle.push(newarray);
    beginShape(TRIANGLES);
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(x3, y3);
    endShape();
}

let coords_line = [];

function drawLine(x1,y1,x2,y2) {
    let newarray = [];
    for(let i = 0; i < 4; i ++) {
        newarray.push(arguments[i]);
    }
    coords_line.push(newarray);
    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    endShape(CLOSE);  
}

let coords_rect = [];

function drawRect(x1,y1,x2,y2,x3,y3,x4,y4) {
    let newarray = [];
    for(let i = 0; i < 8; i++){
        newarray.push(arguments[i])
    }
    coords_rect.push(newarray);
    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(x3, y3);
    vertex(x4, y4);
    endShape(CLOSE);    
}

let triangle = () => {
    for(let i = 0; i < mousePressedCounter + 1; i += 3) {
        if(cx.length % 3 == 0 && cx.length == i + 3) {
            fill(62, noise_color, 242, noise_color+50);
            drawTriangle(cx[0+i],cy[0+i],cx[1+i],cy[1+i],cx[2+i],cy[2+i]);
        }
    }
}

let line = () => {
    for(let i = 0; i < mousePressedCounter + 1; i += 2) {  
        if(cx.length % 2 == 0 && cx.length == i + 2) {      //no fill bc line
            drawLine(cx[0+i],cy[0+i],cx[1+i],cy[1+i]);
        }
    }
}

let rect = () => {
    for(let i = 0; i < mousePressedCounter+1; i += 4){
        if(cx.length % 4 == 0 && cx.length == i + 4){
            fill(62, noise_color, 242, noise_color+50);
            drawRect(cx[0+i],cy[0+i],cx[1+i],cy[1+i],cx[2+i],cy[2+i],cx[3+i],cy[3+i]);
        }
    }
}


/**********************       Mouse pressed triggers rect,tri,line func        **********************/


let mousePressedCounter = 0;
function mousePressed(event) {

    if(event.returnValue == true){
        mousePressedCounter += 1;
    }

    // strokeCap(ROUND);
    // rectMode(CORNERS);

    cx[counter] = event.pageX;
    cy[counter] = event.pageY;
    // console.log(cx[counter],cy[counter],`cx[${counter}],cy[${counter}]`)
    counter += 1;

    if(rect_toggle == true) {
        rect();
    }
    if(line_toggle == true) {
        line();
    }
    if(tri_toggle == true) {
        triangle();
    }
}


/**********************       For console && diff modes           **********************/

function keyPressed(){
    if (key == 'S' || key == 's') {
      save("masterpiece.png")
    }
    if (key == 'R' || key == 'r') {
        rect_toggle = !rect_toggle; 
        if(rect_toggle) {
            console.log('rect mode on!')
        } else if (!rect_toggle){
            console.log('rect mode off!')
        }
        
    }
    if (key == 'T' || key == 't') {
        tri_toggle = !tri_toggle; 
        if(tri_toggle) {
            console.log('tri mode on!')
        } else if (!tri_toggle){
            console.log('tri mode off!')
        }
        
    }
    if (key == 'L' || key == 'l') {
        line_toggle = !line_toggle; 
        if(line_toggle) {
            console.log('line mode on!')
        } else if (!line_toggle){
            console.log('line mode off!')
        }
    }
    if (key == 'C' || key == 'c') {
        console.log(counter,'counter number!')
        console.log(coords_rect,'looped thru array!');
    }
}

}

export default Cartesian;