///////////////////// CONSTANTS /////////////////////////////////////
const initArray = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0]
]
///////////////////// APP STATE (VARIABLES) /////////////////////////
let array;
let win;
let lose;
let startTurn = "player1";
let turn;
let pArray;//piece array
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let board = document.getElementById("Checkboard");
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
board.onclick = move();



///////////////////// FUNCTIONS /////////////////////////////////////
function init(){
    array = initArray;
    array.forEach((item, i) => {
        let y = 64 * i;
        pArray[y].yval = y;
        item.forEach((object, o) => {
            let x = 64 * o;
            pArray[y][x].xval = x;
            pArray[y][x].yval = y;
            if(object == 0){
                pArray[y][x].value = "none";
            } else if(object == 1){
                pArray[y][x].value = "player1";
            } else if(object == 2){
                pArray[y][x].value = "player2";
            }
        });



    });

    turn = startTurn;
}
function move(e){
    let target = e.target;
}
