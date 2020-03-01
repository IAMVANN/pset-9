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
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let board = document.getElementById("board");
let boardArray = board.childNodes;
console.log(board);
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
function init(){
    array = initArray;
    turn = startTurn;

}


///////////////////// FUNCTIONS /////////////////////////////////////
