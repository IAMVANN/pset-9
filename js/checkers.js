///////////////////// CONSTANTS /////////////////////////////////////
const dinoposition = [1,3,5,7,8,10,12,14,17,19,21,23];
const sharkposition = [62, 60, 58, 56, 55, 53, 51, 49, 46, 44, 42, 40]
///////////////////// APP STATE (VARIABLES) /////////////////////////
let array;
let win;
let lose;
let shark = document.createElement("img");
shark.src = "img/SHARK.png";
shark.style.height = '60px';
shark.style.width  = '60px';
let dinosaur = document.createElement("img");
dinosaur.src = "img/DINOSAUR.jpg";
dinosaur.style.height = '60px';
dinosaur.style.width  = '60px';
let startTurn = "dino";
let turn;
let pArray;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let board = document.getElementById("Checkboard");
let dArray = [];
let sArray = [];

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
board.onclick = takeTurn();
let spots = document.getElementsByClassName("spot");





///////////////////// FUNCTIONS /////////////////////////////////////
function init(){
    turn = startTurn;
    for(let i = 0; i < 12; i++ ){

        var object = {
                value : "dino",
                img : dinosaur,
                id : 1,
                pos : dinoposition[i]
            };
        dArray.push(object);
    }
    for(let i = 0; i < 12; i++ ){
        var object = {
                value : "sharko",
                img : shark,
                id : 1,
                pos : sharkposition[i]
            };
        sArray.push(object);
    }

    for(let i = 0; i < 63; i++){
        spots[i].id = "id" + i;
    }
    render();
}
function render(){
    dArray.forEach((item, i) => {
        spots[dArray[i].pos].append(dArray[i].img);
        console.log(spots[dArray[i].pos]);
    });
    sArray.forEach((item, i) => {
        spots[sArray[i].pos].append(sArray[i].img);
    });

}
function takeTurn(e){
    //console.log(e.target);
    /*for(let b = 0; b < 63; b++){
        if(spots[b] ==
            console e.target){

        }
    }*/
}
