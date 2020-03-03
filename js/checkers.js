///////////////////// CONSTANTS /////////////////////////////////////
const dinoposition = [1,3,5,7,8,10,12,14,17,19,21,23];
const sharkposition = [62, 60, 58, 56, 55, 53, 51, 49, 46, 44, 42, 40]
///////////////////// APP STATE (VARIABLES) /////////////////////////
let array;
let win;
let lose;


let startTurn = "dino";
let turn;
let pArray;
let current;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let board = document.getElementById("Checkboard");
let dArray = [];
let sArray = [];
let return2 = false;
let return3 = false;
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
board.onclick = takeTurn;
let spots = document.getElementsByClassName("spot");





///////////////////// FUNCTIONS /////////////////////////////////////
function init(){
    turn = startTurn;
    for(let i = 0; i < 12; i++ ){

        let dinosaur = document.createElement("img");
        dinosaur.src = "img/DINOSAUR.jpg";
        dinosaur.style.height = '80px';
        dinosaur.style.width  = '80px';

        var object = {
                value : "dino",
                img : dinosaur,
                id : 1,
                pos : dinoposition[i]
            };
        dArray.push(object);
    }
    for(let i = 0; i < 12; i++ ){

        let shark = document.createElement("img");
        shark.src = "img/SHARK.png";
        shark.style.height = '80px';
        shark.style.width  = '80px';

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

    });
    sArray.forEach((item, i) => {
        spots[sArray[i].pos].appendChild(sArray[i].img);
    });

}
function takeTurn(e){

    target = e.target.parentElement;


    for(let b = 0; b < 64; b++){
        if(spots[b] == target){

            if (turn == "dino") {
                for(let i = dArray.length - 1; i >= 0; i--){
                    if(dArray[i].pos == b){
                        console.log("asdf")
                        current = dArray[i].pos;
                        highlighter("dino");
                    }
                }

            } else if (turn == "shark"){

            }
        }
    }
}
function highlighter(who){
    if(who == "dino"){
        if(current % 8 == 0){
            //highlight
            let value = [current + 9];

            dArray.forEach((item, i) => {

                if(item.pos == value[0]){
                    return2 = true;
                    return ;
                }
            });
            if(return2 == true){
                return2 = false;
                return;
            }
            console.log("asf")
            sArray.forEach((item, i) => {

                if(item.pos == value[0]){
                    sArray.forEach((object, o) => {
                        if(object.pos == value[0] + 9){
                            return3 = true;
                            return;
                        }
                    });
                    if(return3 == true){
                        return2 = true;
                        return3 == false;
                        return;
                    }


                    dArray.forEach((object, o) => {
                        if(object.pos == value[0] + 9){
                            return2 = true;
                            return;
                        }
                    });
                    value[0] = value[0] + 9;
                    highlight(value[0]);


                }

            });
            if(return2 == true){
                return2 = false;
                return;
            }
            highlight(value[0])
        } else if(current % 7 == 0){
            let value = [current + 7];
            //DO THIS NEXt, far right for DINO
              dArray.forEach((item, i) => {

                if(item.pos == value[0]){
                    return2 = true;
                    return ;
                }
            });
            if(return2 == true){
                return2 = false;
                return;
            }
            console.log("asf")
            sArray.forEach((item, i) => {

                if(item.pos == value[0]){
                    sArray.forEach((object, o) => {
                        if(object.pos == value[0] + 7){
                            return3 = true;
                            return;
                        }
                    });
                    if(return3 == true){
                        return2 = true;
                        return3 == false;
                        return;
                    }


                    dArray.forEach((object, o) => {
                        if(object.pos == value[0] + 7){
                            return2 = true;
                            return;
                        }
                    });
                    value[0] = value[0] + 7;
                    highlight(value[0]);


                }

            });
            if(return2 == true){
                return2 = false;
                return;
            }
             value[0] = value[0] + 9;
                    highlight(value[0]);
        } else {
            let value = [current + 7, current + 9];
            let thing = undefined;
            let thing2 = undefined;
            let run = false;
            for(i = dArray.length -1; i >= 0; i++){
                if(dArray[i].pos == value[0]){
                thing = false;
                }
                if(dArray[i].pos == value[1]){
                thing2 = false
                }
            }
            for(i = sArray.length -1; i>=0; i++){
                if(sArray[i].pos == value[0]){
                thing = true;
                }
                if(sArray[i].pos == value[1]){
                thing2 = true
                }
            }
            if(thing == true){
                for(i = sArray.length -1; i>=0; i++){
                if(sArray[i].pos == value[0] + 7){
                    run = true;
                } 
            }
                if(run == true){
                    run = false;
                } else {
                highlight(value[0] + 7);                          
                          }
                 
            } 
            if(thing2 == true){
            for(i = sArray.length -1; i>=0; i++){
                if(sArray[i].pos == value[0] + 9){
                    run = true;
                } 
            }
                if(run == true){
                    run = false;
                } else {
                highlight(value[0] + 9);                          
                          }
                 
            }
        }
    }

}
function highlight(value){
    spots[value].style.backgroundColor = "gray";
}
