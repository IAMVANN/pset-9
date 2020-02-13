///////////////////// CONSTANTS /////////////////////////////////////
const box = 8;



///////////////////// APP STATE (VARIABLES) /////////////////////////

let start;
let started = undefined;

let game = setInterval(draw, 100);


///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let breakboard = document.getElementById('bREAKBOARD');
let canvas = breakboard.getContext("2d");
let breaker = document.getElementById("bREAK");
let paddle = {
    x1 : box * 61.5,
    y1 : box * 60,
}
let turn = "Nothing";
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = function(){
    start = document.createElement("h2");
    start.id = "start";
    start.innerHTML = "New text!";
    breaker.append(start);
}
breaker.onclick = init;
document.addEventListener("keydown", direction);

///////////////////// FUNCTIONS /////////////////////////////////////
function init(object){
    if(object.target == start){
        started = true;
        console.log("RA")
        start.remove();

        canvas.clearRect(0, 0, 1024, 500);
    }
}
function draw(){
    canvas.clearRect(0, 0, 1024, 500);
    if(started == true){
        if (turn == "left"){
            turn = "nothing";
            paddle.x1 -= box;
            paddle.x2 -= box;
        } else if ( turn == "right"){
            turn = "nothing";
            paddle.x1 += box;
            paddle.x2 += box;
        }
        canvas.beginPath();
        canvas.rect(paddle.x1 , paddle.y1, 40, 10);
        canvas.stroke();


    }


}
function direction(event){
    console.log("ASD")
    if(event.keyCode == 37){
        turn = "left";
    } else if (event.keyCode == 39){
        turn = "right";
    }
}
