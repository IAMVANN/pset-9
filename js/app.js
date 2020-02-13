///////////////////// CONSTANTS /////////////////////////////////////
const box = 4;



///////////////////// APP STATE (VARIABLES) /////////////////////////

let start;
let canvas = undefined;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let breakboard = document.getElementById('bREAKBOARD');
let breaker = document.getElementById("bREAK");
let paddle = {
    x1 : box * 123,
    x2 : box * 133,
    y1 : box * 10,
    y2 : box * 8
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
    canvas = bREAKBOARD.getContext("2d");
    canvas.clearRect(0, 0, 1024, 500);
}
function draw(){
    if()

}
function direction(event){
    if(event.keycode == 37){
        turn = "left";
    } else if (event.keycode == 39){
        turn = "right";
    }
}
