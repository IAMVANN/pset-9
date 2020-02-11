///////////////////// CONSTANTS /////////////////////////////////////
const brick = {
    hp : 1,
    value : undefined;
}
const paddle = {
    center : undefined,
    value : undefined

}
const quantity;
///////////////////// APP STATE (VARIABLES) /////////////////////////

let start;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let breakboard = document.getElementById('bREAKBOARD');
let breaker = document.getElementById("bREAK");
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = function(){
    start = document.createElement("h2");
    start.id = "start";
    start.innerHTML = "New text!";
    breaker.append(start);
}
breaker.onclick = init;
///////////////////// FUNCTIONS /////////////////////////////////////
function init(object){
    let thingy = object.target;
    if(thingy == start){
    } else {
        return;
    }
    start.remove();
    breaker.add(paddle)

}
