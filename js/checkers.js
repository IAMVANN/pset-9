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
let remove = [];
let return2 = false;
let return22 = false;
let return3 = false;
let previousclick;
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
    let needsTobetrue = false;
    target = e.target.parentElement;
    for(let b = 0; b < 64 ; b++){
        if(spots[b].style.backgroundColor == "gray"){
            if(spots[b] == e.target){

                move(b);
                needsTobetrue = true;
            }
        }
    }
    for(let b = 0; b < 64 ; b++){
        if(spots[b].className == "red spot"){
            spots[b].style.backgroundColor = "red";
        } else if(spots[b].className == "black spot"){
            spots[b].style.backgroundColor = "black";
        }
    }


    if(needsTobetrue == true){

        return;
    }
    for(let b = 0; b < 64; b++){
        if(spots[b] == target){

            if (turn == "dino") {
                for(let i = dArray.length - 1; i >= 0; i--){
                    if(dArray[i].pos == b){
                        previousclick = dArray[i];
                        current = dArray[i].pos;
                        highlighter("dino");
                    }
                }

            } else if (turn == "shark"){

                for(let i = sArray.length - 1; i >= 0; i--){
                    if(sArray[i].pos == b){

                        previousclick = sArray[i];
                        current = sArray[i].pos;

                        highlighter("shark");
                    }
                }

            }
        }
    }
}
function highlighter(who){


    if(who == "dino"){
        if(current % 8 == 0){
            //highlight

            let value = [current];
            for(let ab = 0; ab <= 3; ab++){
                if(ab == 0 || (((value[0] + 9 - (ab * 2)) % 8) && value[0] + 18 <= 63)){
                    value[0] += 9;
                    dArray.forEach((item, i) => {
                        if(item.pos == value[0]){
                            console.log("RAn")
                            if(ab == 0){
                                return2 = true;
                                return ;
                            } else {
                                return2 = true;
                            }
                        }
                    });
                    if(return2 == true && ab == 0){
                        return2 = false;
                        return;
                    }

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
                                    console.log("ASD")
                                    return2 = true;
                                    return;
                                }
                            });

                            value[0] = value[0] + 9;

                        }

                    });
                    if(return2 == true || ab == 3){

                        if(ab == 0){
                            return2 = false;
                            return;
                        }
                        return2 = false;

                        highlight(value[0] - 9);
                        ab = 4;
                    }

                }


            }
            highlight(value[0]);


        } else if((current - 7) % 8 == 0){
            let value = [current];
            //DO THIS NEXt, far right for DINO
            for(let ab = 0; ab <= 3; ab++){
                if(ab == 0 || (((value[0] + 7 + (ab * 2)) % 8 == 0) && value[0] + 14 <= 63)){

                    value[0] += 7;
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

                        }

                    });
                    if(return2 == true || ab == 3){

                        if(ab == 0){
                            return2 = false;
                            return;
                        }
                        return2 = false;

                        highlight(value[0]-9);
                    }
            }

        }

        highlight(value[0]);
        } else {
            let value = [current + 7, current + 9];
            //for(ab == 0; ab <=3; ab--)
            let thing = undefined;
            let thing2 = undefined;
            let run = false;
            for(i = dArray.length -1; i >= 0; i--){
                if(dArray[i].pos == value[0]){
                thing = false;
                }
                if(dArray[i].pos == value[1]){
                thing2 = false
                }
            }

            for(i = sArray.length - 1; i >= 0; i--){
                if(thing !== false){
                    if(sArray[i].pos == value[0] && (sArray[i].pos % 8 !== 0)){
                    thing = true;
                    }
                }
                if(thing2 !== false){
                    if(sArray[i].pos == value[1] && (sArray[i].pos -7) % 8 !== 0){
                    thing2 = true;
                    }
                }
            }
            if(thing == true){
                for(i = sArray.length -1; i>=0; i--){
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
            for(i = sArray.length -1; i>=0; i--){
                if(sArray[i].pos == value[1] + 9){
                    run = true;
                }
            }
                if(run == true){
                    run = false;
                } else {
                highlight(value[1] + 9);
                }
            }
            if(thing == undefined){
                highlight(value[0]);
            }
            if(thing2 == undefined){
                highlight(value[1]);
            }
        }
    } else if(who == "shark"){

        if(current % 8 == 0){
            //highlight
            let value = [current];
            for(let ab = 0; ab <= 3; ab++){
                console.log(ab)
                console.log(value[0])
                console.log((value[0] - 7 - (ab * 3)) % 8);
                if(ab == 0 || (((value[0] - 7 - (ab * 3)) % 8 == 0) && value[0] - 14 >= 0)){
                    value[0] -= 7;
                    console.log("in");
                    sArray.forEach((item, i) => {

                            if(item.pos == value[0]){
                                return2 = true;
                                return ;
                            }

                    });
                    if(return2 == true){
                        return2 = false;
                        return;
                    }

                    dArray.forEach((item, i) => {

                        if(item.pos == value[0]){
                            dArray.forEach((object, o) => {
                                if(object.pos == value[0] - 7){
                                    return3 = true;
                                    return;
                                }
                            });
                            if(return3 == true){
                                return2 = true;
                                return3 == false;
                                return;
                            }


                            sArray.forEach((object, o) => {
                                if(object.pos == value[0] - 7){
                                    return2 = true;
                                    return;
                                }
                            });
                            value[0] = value[0] - 7;

                        }

                    });
                    if(return2 == true || ab == 3){
                        if(ab == 0){
                              return2 = false;
                              return;
                          }
                          return2 = false;

                          highlight(value[0] + 7);
                    }

                }


        }

        highlight(value[0]);




    } else if((current + 9) % 8 == 0){
        let value = [current - 9];
        //DO THIS NEXt, far right for DINO
          sArray.forEach((item, i) => {

            if(item.pos == value[0]){
                return2 = true;
                return ;
            }
        });
        if(return2 == true){
            return2 = false;
            return;
        }

        dArray.forEach((item, i) => {

            if(item.pos == value[0]){
                dArray.forEach((object, o) => {
                    if(object.pos == value[0] - 9){
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
                    if(object.pos == value[0] -9){
                        return2 = true;
                        return;
                    }
                });
                value[0] = value[0] - 9;
            }


        });
        if(return2 == true || ab == 3){

                        if(ab == 0){
                            return2 = false;
                            return;
                        }
                        return2 = false;

                        highlight(value[0] + 9);
                    }
                highlight(value[0]);


    } else {
        let value = [current - 7, current - 9];
        let thing = undefined;
        let thing2 = undefined;
        let run = false;
        for(i = sArray.length -1; i >= 0; i--){
            if(sArray[i].pos == value[0]){
            thing = false;
            }
            if(sArray[i].pos == value[1]){
            thing2 = false
            }
        }

        for(i = dArray.length - 1; i >= 0; i--){
            if(thing !== false){
                if(dArray[i].pos == value[0] && current % 8 !== 0){
                thing = true;
                }
            }
            if(thing2 !== false){
                if(dArray[i].pos == value[1] && (current + 9) % 8 !== 0){
                thing2 = true;
                }
            }
        }
        if(thing == true){
            for(i = dArray.length -1; i>=0; i--){
            if(dArray[i].pos == value[0] - 7){
                run = true;
            }

        }
            if(run == true){
                run = false;
            } else {
            highlight(value[0] - 7);
                      }

        }
        if(thing2 == true){
        for(i = dArray.length -1; i>=0; i--){
            if(dArray[i].pos == value[1] - 9){
                run = true;
            }
        }
            if(run == true){
                run = false;
            } else {
            highlight(value[1] - 9);
            }
        }
        if(thing == undefined){
            highlight(value[0]);
        }
        if(thing2 == undefined){
            highlight(value[1]);
        }
    }

    }
}
function highlight(value){
    spots[value].style.backgroundColor = "gray";
}
function move(where){
    let quantity = 0;

    //checking for shark removal
    if(where - previousclick.pos > 10){
        if((where - previousclick.pos) % 9 == 0){
            let bb = (where - previousclick.pos)/18;
            for(let ab = 0; ab<bb; ab++){
                remove[ab] = previousclick.pos + 9 * (1+ 2*ab);

            }

        } if((where - previousclick.pos) % 7 == 0){
            let bb = (where - previousclick.pos)/14;
            for(let ab = 0; ab<bb; ab++){
                remove[ab] = previousclick.pos + 7 * (1+ 2*ab);

            }
        }
    } else if(previousclick.pos - where > 10){
        //this checks for dino removal

        if((previousclick.pos - where) % 9 == 0){
            let bb = (previousclick.pos - where)/18;
            for(let ab = 0; ab<bb; ab++){
                remove[ab] = previousclick.pos - 9 * (1+2*ab);
            }


        } if((previousclick.pos - where) % 7 == 0){
            let bb = (previousclick.pos - where)/14;
            for(let ab = 0; ab<bb; ab++){
                remove[ab] = previousclick.pos - 7 * (1+2*ab);
            }
        }
    }
    previousclick.pos = where;
    if(remove == []){


    } else {

        remover();
    }

    remove = [];
    render();
    if(turn == "dino"){

        turn = "shark";
    } else if(turn == "shark"){
        turn = "dino";
    }

}
function remover(){
    for(let m = 0; m < remove.length; m++){

        for(let b = 0; b < dArray.length; b++){
            if(dArray[b].pos == remove[m]){

                dArray[b].img.remove();
                dArray.splice(b,1);
            }
        }
        for(let b = 0; b < sArray.length; b++){

            if(sArray[b].pos == remove[m]){
                sArray[b].img.remove();
                sArray.splice(b,1);

            }
        }

    }

}
