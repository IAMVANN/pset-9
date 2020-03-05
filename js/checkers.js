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
let finalchecker = false;
let current;
let gameOVer = false;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let board = document.getElementById("Checkboard");
let dArray = [];
let sArray = [];
let kingDinoArray = [];
let kingDCounter = 0;
let kingSharkArray = [];
let kingSCounter = 0;
let remove = [];
let needJump = false;
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
    alert("a bit glitchy, but mainly works ;D");
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
    kingDino();
    kingShark();
    if(dArray.length == 0 && kingDinoArray.length == 0){
        winner("shark")
    } else {
        dArray.forEach((item, i) => {
            spots[dArray[i].pos].append(dArray[i].img);

        });
        if(kingDinoArray.length != 0){
            kingDinoArray.forEach((item, i) => {
                spots[kingDinoArray[i].pos].append(kingDinoArray[i].img);

            });
        }
    }
    if(sArray.length == 0 && kingSharkArray.length == 0){
        winner("dino")
    } else {
        sArray.forEach((item, i) => {
            spots[sArray[i].pos].appendChild(sArray[i].img);
        });
        if(kingSharkArray.length != 0){
            kingSharkArray.forEach((item, i) => {
                spots[kingSharkArray[i].pos].append(kingSharkArray[i].img);

            });
        }
    }


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
                if(kingDinoArray.length > 0){
                    kingDinoArray.forEach((item, i) => {
                        if(item.pos == b){
                            previousclick = [item];
                            current = kingDinoArray[i];
                            highlighter("Kingdino");
                        }
                    });

                }

            } else if (turn == "shark"){

                for(let i = sArray.length - 1; i >= 0; i--){
                    if(sArray[i].pos == b){

                        previousclick = sArray[i];
                        current = sArray[i].pos;

                        highlighter("shark");
                    }
                }
                if(kingSharkArray.length > 0){
                    kingSharkArray.forEach((item, i) => {
                        if(item.pos == b){
                            previousclick = [item];
                            current = kingSharkArray[i];
                            highlighter("Kingshark");
                        }
                    });

                }


            }
        }
    }
}
function highlighter(who){


    if(who == "dino"){
        dinoChecker(who);

    } else if(who == "shark"){
        sharkChecker(who);
    } else if(who == "Kingdino"){
        dinoChecker(who);
        sharkChecker(who);
    } else if(who == "Kingshark"){
        dinoChecker(who);
        sharkChecker(who);
    }


}
function dinoChecker(who){
    if(current % 8 == 0){
        let value = [current];
        let noJump = false;
        let maxDoubleJumps;
        let doubleJump = false;
        let jumpstop = false;
        let ran = false;
        let z = Math.floor(value[0]/8);
        if(z == 0 || z == 1){
            maxDoubleJumps = 3;
        } else if(z == 2 || z == 3){
            maxDoubleJumps = 2;
        } else if(z == 4 || z == 5){
            maxDoubleJumps = 1;
        } else if(z == 6 || z == 7){
            maxDoubleJumps = 0;
        }
        if(maxDoubleJumps > 0){
            for(let b = 1; b <= maxDoubleJumps; b++){
                if(jumpstop == false){
                    sArray.forEach((item, i) => {
                        if(item.pos == value[0] + 9){
                            doubleJump = true;
                        }
                    });
                    if(doubleJump == true){

                            value[0] += 18;
                            if(value[0] > 63){
                                jumpstop = true;
                                ran = true
                            }
                            sArray.forEach((item, i) => {
                                if(item.pos == value[0]){
                                    jumpstop = true;
                                    ran = true
                                }
                            });
                            dArray.forEach((item, i) => {
                                if(item.pos == value[0]){
                                    jumpstop = true;
                                    ran = true
                                }
                            });

                            if(jumpstop != true){
                                ran = true;
                                highlight(value[0]);
                            }
                    } else {
                        jumpstop = true;

                    }
                }
            }
        }
        if(ran == false) {
            value[0] += 9;
            dArray.forEach((item, i) => {
                if(item.pos == value[0]){
                    noJump = true;
                }
            });
            sArray.forEach((item, i) => {
                if(item.pos == value[0]){
                    noJump = true;
                }
            });
            if(noJump == false){
                highlight(value[0]);
            }

        }


    } else if((current - 7) % 8 == 0){
        console.log(current)
        let value = [current];
        let noJump = false;
        let maxDoubleJumps;
        let doubleJump = false;
        let jumpstop = false;
        let ran = false;
        let z = Math.floor((value[0] - 7)/8);
        if(z == 0 || z == 1){
            maxDoubleJumps = 3;
        } else if(z == 2 || z == 3){
            maxDoubleJumps = 2;
        } else if(z == 4 || z == 5){
            maxDoubleJumps = 1;
        } else if(z == 6 || z == 7){
            maxDoubleJumps = 0;
        }
        if(maxDoubleJumps > 0){

            for(let b = 1; b <= maxDoubleJumps; b++){
                if(jumpstop == false){
                    sArray.forEach((item, i) => {
                        if(item.pos == value[0] + 7){
                            doubleJump = true;
                        }
                    });
                    if(doubleJump == true){

                            value[0] += 14;
                            if(value[0] > 63){
                                jumpstop = true;
                                ran = true
                            }
                            sArray.forEach((item, i) => {
                                if(item.pos == value[0]){
                                    jumpstop = true;
                                    ran = true
                                }
                            });
                            dArray.forEach((item, i) => {

                                if(item.pos == value[0]){

                                    jumpstop = true;
                                    ran = true
                                }
                            });

                            if(jumpstop == false){

                                ran = true;
                                highlight(value[0]);
                            }
                    } else {

                        jumpstop = true;

                    }
                }
            }
        }
        if(ran == false) {
            value[0] += 7;

            dArray.forEach((item, i) => {
                if(item.pos == value[0]){
                    noJump = true;
                }
            });
            sArray.forEach((item, i) => {
                if(item.pos == value[0]){
                    noJump = true;
                }
            });
            if(noJump == false){
                highlight(value[0]);
            }

        }


    } else {
        let value = [current, current];
        for(let jk = 0; jk <= 1; jk++){

            if(jk == 0){
                //+9
                let noJump = false;
                let maxDoubleJumps;
                let doubleJump = false;
                let jumpstop = false;
                let ran = false;
                let z = 7 - (current % 8);
                if(z == 0 || z == 1){
                    maxDoubleJumps = 0;
                } else if(z == 2 || z == 3){
                    maxDoubleJumps = 1;
                } else if(z == 4 || z == 5){
                    maxDoubleJumps = 2;
                } else if(z == 6 || z == 7){
                    maxDoubleJumps = 3;
                }
                if(maxDoubleJumps > 0){
                    for(let b = 1; b <= maxDoubleJumps; b++){
                        if(jumpstop == false){
                            sArray.forEach((item, i) => {
                                if(item.pos == value[0] + 9 && (value[0] + 2) % 8 !== 0 ){
                                    doubleJump = true;
                                }
                            });
                            if(doubleJump == true){

                                    value[0] += 18;
                                    if(value[0] > 63){
                                        jumpstop = true;
                                        ran = true
                                    }
                                    sArray.forEach((item, i) => {
                                        if(item.pos == value[0]){

                                            jumpstop = true;
                                            console.log(jumpstop);
                                            ran = true;
                                        }
                                    });
                                    dArray.forEach((item, i) => {
                                        if(item.pos == value[0]){
                                            console.log(item.pos)
                                            jumpstop = true;
                                            ran = true;
                                        }
                                    });

                                    if(jumpstop != true){
                                        ran = true;
                                        console.log(b)
                                        highlight(value[0]);
                                    }
                            } else {
                                jumpstop = true;

                            }
                        }
                    }
                }
                if(ran == false) {
                    value[0] += 9;
                    dArray.forEach((item, i) => {
                        if(item.pos == value[0]){
                            noJump = true;
                        }
                    });
                    sArray.forEach((item, i) => {
                        if(item.pos == value[0]){
                            noJump = true;
                        }
                    });
                    if(noJump == false){
                        highlight(value[0]);
                    }

                }

            } else if(jk == 1){
                //+7
                console.log("RAN")
                let noJump = false;
                let maxDoubleJumps;
                let doubleJump = false;
                let jumpstop = false;
                let ran = false;
                let z = current % 8;
                if(z == 0 || z == 1){
                    maxDoubleJumps = 0;
                } else if(z == 2 || z == 3){
                    maxDoubleJumps = 1;
                } else if(z == 4 || z == 5){
                    maxDoubleJumps = 2;
                } else if(z == 6 || z == 7){
                    maxDoubleJumps = 3;
                }
                if(maxDoubleJumps > 0){
                    for(let b = 1; b <= maxDoubleJumps; b++){
                        if(jumpstop == false){
                            sArray.forEach((item, i) => {

                                if(item.pos == value[1] + 7 && (value[1] - 1) % 8 !== 0){

                                    doubleJump = true;
                                }
                            });
                            if(doubleJump == true){

                                    value[1] += 14;
                                    if(value[1] > 63){
                                        jumpstop = true;
                                    }
                                    sArray.forEach((item, i) => {
                                        if(item.pos == value[1]){
                                            jumpstop = true;
                                            ran = true;
                                        }
                                    });
                                    dArray.forEach((item, i) => {
                                        if(item.pos == value[1]){
                                            jumpstop = true;
                                            ran = true;
                                        }
                                    });

                                    if(jumpstop != true){
                                        ran = true;
                                        highlight(value[1]);
                                    }
                            } else {

                                jumpstop = true;


                            }
                        }
                    }
                }
                if(ran == false) {
                    value[1] += 7;
                    dArray.forEach((item, i) => {
                        if(item.pos == value[1]){
                            noJump = true;
                        }
                    });
                    sArray.forEach((item, i) => {
                        if(item.pos == value[1]){
                            noJump = true;
                        }
                    });
                    if(noJump == false){
                        highlight(value[1]);
                    }

                }
            }
        }
    }
}
function sharkChecker(who){
      if(current % 8 == 0){
          let value = [current];
          let noJump = false;
          let maxDoubleJumps;
          let doubleJump = false;
          let jumpstop = false;
          let ran = false;
          let z = Math.floor(value[0]/8);
          if(z == 0 || z == 1){
              maxDoubleJumps = 0;
          } else if(z == 2 || z == 3){
              maxDoubleJumps = 1;
          } else if(z == 4 || z == 5){
              maxDoubleJumps = 2;
          } else if(z == 6 || z == 7){
              maxDoubleJumps = 3;
          }
          if(maxDoubleJumps > 0){
              for(let b = 1; b <= maxDoubleJumps; b++){
                  console.log(maxDoubleJumps)
                  if(jumpstop == false){
                      console.log("ASDasdfasdf")
                      dArray.forEach((item, i) => {
                          if(item.pos == value[0] - 7){
                              doubleJump = true;
                          }
                      });
                      if(doubleJump == true){

                              value[0] -= 14;
                              if(value[0] < 0){
                                  jumpstop = true;
                                  ran = true
                              }
                              dArray.forEach((item, i) => {
                                  if(item.pos == value[0]){
                                      jumpstop = true;
                                      ran = true
                                  }
                              });
                              sArray.forEach((item, i) => {
                                  if(item.pos == value[0]){
                                      jumpstop = true;
                                      ran = true
                                  }
                              });

                              if(jumpstop != true){
                                  ran = true;
                                  highlight(value[0]);
                              }
                      } else {

                          jumpstop = true;

                      }
                  }
              }
          }
          if(ran == false) {
              value[0] -= 7;
              sArray.forEach((item, i) => {
                  if(item.pos == value[0]){
                      noJump = true;
                  }
              });
              dArray.forEach((item, i) => {
                  if(item.pos == value[0]){
                      noJump = true;
                  }
              });
              if(noJump == false){
                  highlight(value[0]);
              }

          }

      } else if((current - 7) % 8 == 0){
          let value = [current];
          let noJump = false;
          let maxDoubleJumps;
          let doubleJump = false;
          let jumpstop = false;
          let ran = false;
          let z = Math.floor((value[0] - 7)/8);
          if(z == 0 || z == 1){
              maxDoubleJumps = 0;
          } else if(z == 2 || z == 3){
              maxDoubleJumps = 1;
          } else if(z == 4 || z == 5){
              maxDoubleJumps = 2;
          } else if(z == 6 || z == 7){
              maxDoubleJumps = 3;
          }
          if(maxDoubleJumps > 0){
              for(let b = 1; b <= maxDoubleJumps; b++){
                  if(jumpstop == false){
                      dArray.forEach((item, i) => {
                          if(item.pos == value[0] - 9){
                              doubleJump = true;
                          }
                      });
                      if(doubleJump == true){

                              value[0] -= 18;
                              if(value[0] < 0){
                                  jumpstop = true;
                                  ran = true
                              }
                              dArray.forEach((item, i) => {
                                  if(item.pos == value[0]){
                                      jumpstop = true;
                                      ran = true
                                  }
                              });
                              sArray.forEach((item, i) => {
                                  if(item.pos == value[0]){
                                      jumpstop = true;
                                      ran = true
                                  }
                              });

                              if(jumpstop != true){
                                  ran = true;
                                  highlight(value[0]);
                              }
                      } else {
                          jumpstop = true;

                      }
                  }
              }
          }
          if(ran == false) {
              value[0] -= 9;
              sArray.forEach((item, i) => {
                  if(item.pos == value[0]){
                      noJump = true;
                  }
              });
              dArray.forEach((item, i) => {
                  if(item.pos == value[0]){
                      noJump = true;
                  }
              });
              if(noJump == false){
                  highlight(value[0]);
              }
          }


      } else {
          let value = [current, current];
          for(let jk = 0; jk <= 1; jk++){

              if(jk == 0){
                  //+9
                  let noJump = false;
                  let maxDoubleJumps;
                  let doubleJump = false;
                  let jumpstop = false;
                  let ran = false;
                  let z = 7 - (current % 8);
                  if(z == 0 || z == 1){
                      maxDoubleJumps = 3;
                  } else if(z == 2 || z == 3){
                      maxDoubleJumps = 2;
                  } else if(z == 4 || z == 5){
                      maxDoubleJumps = 1;
                  } else if(z == 6 || z == 7){
                      maxDoubleJumps = 0;
                  }
                  if(maxDoubleJumps > 0){
                      for(let b = 1; b <= maxDoubleJumps; b++){
                          if(jumpstop == false){
                              dArray.forEach((item, i) => {
                                  if(item.pos == value[0] - 9 && (value[0] - 1) % 8 !== 0){
                                      doubleJump = true;
                                  }
                              });
                              if(doubleJump == true){

                                      value[0] -= 18;
                                      if(value[0] < 0){
                                          jumpstop = true;
                                      }
                                      dArray.forEach((item, i) => {
                                          if(item.pos == value[0]){
                                              jumpstop = true;
                                              ran = true
                                          }
                                      });
                                      sArray.forEach((item, i) => {
                                          if(item.pos == value[0]){
                                              jumpstop = true;
                                              ran = true
                                          }
                                      });

                                      if(jumpstop != true){
                                          ran = true;
                                          highlight(value[0]);
                                      }
                              } else {
                                  jumpstop = true;

                              }
                          }
                      }
                  }
                  if(ran == false) {
                      value[0] -= 9;
                      if(value[0] < 0){
                          jumpstop = true;
                          ran = true
                      }
                      sArray.forEach((item, i) => {
                          if(item.pos == value[0]){
                              noJump = true;
                          }
                      });
                      dArray.forEach((item, i) => {
                          if(item.pos == value[0]){
                              noJump = true;
                          }
                      });
                      if(noJump == false){
                          highlight(value[0]);
                      }

                  }

              } else if(jk == 1){
                  //+7
                  let noJump = false;
                  let maxDoubleJumps;
                  let doubleJump = false;
                  let jumpstop = false;
                  let ran = false;
                  let z = current % 8;
                  if(z == 0 || z == 1){
                      maxDoubleJumps = 3;
                  } else if(z == 2 || z == 3){
                      maxDoubleJumps = 2;
                  } else if(z == 4 || z == 5){
                      maxDoubleJumps = 1;
                  } else if(z == 6 || z == 7){
                      maxDoubleJumps = 0;
                  }
                  if(maxDoubleJumps > 0){
                      for(let b = 1; b <= maxDoubleJumps; b++){
                          if(jumpstop == false){
                              dArray.forEach((item, i) => {
                                  if(item.pos == value[1] - 7 && (value[1] - 6) % 8){
                                      doubleJump = true;
                                  }
                              });
                              if(doubleJump == true){

                                      value[1] -= 14;
                                      if(value[0] < 0){
                                          jumpstop = true;
                                          ran = true
                                      }
                                      dArray.forEach((item, i) => {
                                          if(item.pos == value[1]){
                                              jumpstop = true;
                                              ran = true
                                          }
                                      });
                                      sArray.forEach((item, i) => {
                                          if(item.pos == value[1]){
                                              jumpstop = true;
                                              ran = true
                                          }
                                      });

                                      if(jumpstop != true){
                                          ran = true;
                                          highlight(value[1]);
                                  }
                              } else {

                                  jumpstop = true;

                              }
                          }
                      }
                  }
                  if(ran == false) {
                      value[1] -= 7;
                      sArray.forEach((item, i) => {
                          if(item.pos == value[1]){
                              noJump = true;
                          }
                      });
                      dArray.forEach((item, i) => {
                          if(item.pos == value[1]){
                              noJump = true;
                          }
                      });
                      if(noJump == false){
                          highlight(value[1]);
                      }

                  }
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
function winner(who){
    if(who == "dino"){
        alert("Dinosaurs won");
        location.reload();
    } else {
        alert("Sharks won");
        location.reload();
    }
}
function kingDino(){
    dArray.forEach((item, i) => {
        let asd = item.pos / 8;
        if(asd >= 7){
            console.log("KING")
            let mk = item;
            dArray[i].img.remove();
            dArray.splice(i,1)

            kingDinoArray[kingDCounter] = item;
            let kdinosaur = document.createElement("img")

            kdinosaur.src = "img/KingD.jpg";
            kdinosaur.style.height = '80px';
            kdinosaur.style.width  = '80px';
            kingDinoArray[kingDCounter].img = kdinosaur;
            kingDCounter++;
        }
    });

}
function kingShark(){
    sArray.forEach((item, i) => {
        let asd = item.pos / 8;
        if(asd < 1){

            let mk = item;
            sArray[i].img.remove();
            sArray.splice(i,1)

            console.log(sArray.length)
            kingSharkArray[kingSCounter] = item;

            let kshark = document.createElement("img")

            kshark.src = "img/KingS.png";
            kshark.style.height = '80px';
            kshark.style.width  = '80px';
            kingSharkArray[kingSCounter].img = kshark;
            kingSCounter++;
        }
    });

}
