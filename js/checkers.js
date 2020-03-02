///////////////////// CONSTANTS /////////////////////////////////////
///////////////////// APP STATE (VARIABLES) /////////////////////////
let array;
let win;
let lose;
let startTurn = "player1";
let turn;
let yarray;
let xarray;
let none = new Object();
let player1 = new Object();
let player2 = new Object();
let pArray;//piece array
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let board = document.getElementById("Checkboard");
let canvas = board.getContext("2d");
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;




///////////////////// FUNCTIONS /////////////////////////////////////
function init(){
    array = [
        [none, player1, none, player1, none, player1, none, player1],
        [player1, none, player1, none, player1, none, player1, none],
        [none, player1, none, player1, none, player1, none, player1],
        [none, none, none, none, none, none, none, none],
        [none, none, none, none, none, none, none, none],
        [player2, none, player2, none, player2, none, player2, none],
        [none, player2, none, player2, none, player2, none, player2],
        [player2, none, player2, none, player2, none, player2, none]
    ]
    array.forEach((item, i) => {
        let y = 80 * i;
        item.yval = y;
        item.forEach((object, o) => {
            let x = 80 * o;
            object.xval = x;
            object.yval = y;
        });
    });
    turn = startTurn;
    render();
}
function render(){
    array.forEach((item, i) => {
        item.forEach((object, o) => {
            let b;
            if(i == 0){
                 b = 0 + o;
            } else{
                 b = i * 8 + o;
            }
            if(b % 2 == 0){
                canvas.beginPath();
                console.log(object.xval + ', '+ object.yval)
                canvas.rect(object.xval , object.yval, 80, 80);
                canvas.fillStyle = "black";
                canvas.fillRect(object.xval , object.yval, 80, 80);
                canvas.stroke;
            } else {
                canvas.beginPath();
                console.log(object.xval + ', '+ object.yval);
                canvas.rect(object.xval , object.yval, 80, 80);
                canvas.fillStyle = "Red";
                canvas.fillRect(object.xval , object.yval, 80, 80);
                canvas.stroke;
            }
        });
    });

}
