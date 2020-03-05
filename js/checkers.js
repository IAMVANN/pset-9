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
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let board = document.getElementById("Checkboard");
let dArray = [];
let sArray = [];
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
        dinoChecker(who);

    } else if(who == "shark"){
        sharkChecker(who);
    } else if(who == "Kingdino"){
        kingDinoChecker(who);
    } else if(who == "Kingshark"){
        kingSharkChecker(who);
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
                        if(item.pos == value[0] + 18){
                            doubleJump = true;
                        }
                    });
                    if(doubleJump == true){

                            value[0] += 18;
                            sArray.forEach((item, i) => {
                                if(item.pos == value[0]){
                                    jumpstop = true;
                                }
                            });
                            dArray.forEach((item, i) => {
                                if(item.pos == value[0]){
                                    jumpstop = true;
                                }
                            });

                            if(jumpstop != true){
                                ran = true;
                                highlight[value[0]];
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
                        if(item.pos == value[0] + 14){
                            doubleJump = true;
                        }
                    });
                    if(doubleJump == true){

                            value[0] += 14;
                            sArray.forEach((item, i) => {
                                if(item.pos == value[0]){
                                    jumpstop = true;
                                }
                            });
                            dArray.forEach((item, i) => {
                                if(item.pos == value[0]){
                                    jumpstop = true;
                                }
                            });

                            if(jumpstop != true){

                                ran = true;
                                highlight[value[0]];
                            }
                    } else {
                        console.log("ASD")
                        jumpstop = true;

                    }
                }
            }
        }
        if(ran == false) {
            value[0] += 7;
            console.log("ASDasdf")
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
                                if(item.pos == value[0] + 18){
                                    doubleJump = true;
                                }
                            });
                            if(doubleJump == true){

                                    value[0] += 18;
                                    sArray.forEach((item, i) => {
                                        if(item.pos == value[0]){
                                            jumpstop = true;
                                        }
                                    });
                                    dArray.forEach((item, i) => {
                                        if(item.pos == value[0]){
                                            jumpstop = true;
                                        }
                                    });

                                    if(jumpstop != true){
                                        ran = true;
                                        highlight[value[0]];
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
                            sArray.forEach((item, i) => {
                                if(item.pos == value[1] + 14){
                                    doubleJump = true;
                                }
                            });
                            if(doubleJump == true){

                                    value[1] += 14;
                                    sArray.forEach((item, i) => {
                                        if(item.pos == value[1]){
                                            jumpstop = true;
                                        }
                                    });
                                    dArray.forEach((item, i) => {
                                        if(item.pos == value[1]){
                                            jumpstop = true;
                                        }
                                    });

                                    if(jumpstop != true){
                                        ran = true;
                                        highlight[value[1]];
                                    }
                            } else {
                                console.log("ASD")
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
                      dArray.forEach((item, i) => {
                          if(item.pos == value[0] - 14){
                              doubleJump = true;
                          }
                      });
                      if(doubleJump == true){

                              value[0] -= 14;
                              dArray.forEach((item, i) => {
                                  if(item.pos == value[0]){
                                      jumpstop = true;
                                  }
                              });
                              sArray.forEach((item, i) => {
                                  if(item.pos == value[0]){
                                      jumpstop = true;
                                  }
                              });

                              if(jumpstop != true){
                                  ran = true;
                                  highlight[value[0]];
                              }
                      } else {
                          console.log("ASD")
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
                      dArray.forEach((item, i) => {
                          if(item.pos == value[0] - 18){
                              doubleJump = true;
                          }
                      });
                      if(doubleJump == true){

                              value[0] -= 18;
                              dArray.forEach((item, i) => {
                                  if(item.pos == value[0]){
                                      jumpstop = true;
                                  }
                              });
                              sArray.forEach((item, i) => {
                                  if(item.pos == value[0]){
                                      jumpstop = true;
                                  }
                              });

                              if(jumpstop != true){
                                  ran = true;
                                  highlight[value[0]];
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
                                  if(item.pos == value[0] + 18){
                                      doubleJump = true;
                                  }
                              });
                              if(doubleJump == true){

                                      value[0] -= 18;
                                      dArray.forEach((item, i) => {
                                          if(item.pos == value[0]){
                                              jumpstop = true;
                                          }
                                      });
                                      sArray.forEach((item, i) => {
                                          if(item.pos == value[0]){
                                              jumpstop = true;
                                          }
                                      });

                                      if(jumpstop != true){
                                          ran = true;
                                          highlight[value[0]];
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
                                  if(item.pos == value[1] - 14){
                                      doubleJump = true;
                                  }
                              });
                              if(doubleJump == true){

                                      value[1] -= 14;
                                      dArray.forEach((item, i) => {
                                          if(item.pos == value[1]){
                                              jumpstop = true;
                                          }
                                      });
                                      sArray.forEach((item, i) => {
                                          if(item.pos == value[1]){
                                              jumpstop = true;
                                          }
                                      });

                                      if(jumpstop != true){
                                          ran = true;
                                          highlight[value[1]];
                                  }
                              } else {
                                  console.log("ASD")
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
function kingDinoChecker(who){

}
function kingSharkChecker(who){

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
