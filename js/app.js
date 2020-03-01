///////////////////// CONSTANTS /////////////////////////////////////
const box = 8;
const initArray = [
    [ "1", "1", "1", "1", "1", "1", "1", "1"],
    [ "1", "1", "1", "1", "1", "1", "1", "1"],
    [ "1", "1", "1", "1", "1", "1", "1", "1"],
    [ "1", "1", "1", "1", "1", "1", "1", "1"]
]


///////////////////// APP STATE (VARIABLES) /////////////////////////

let start;
let started = undefined;
let array;
let game = setInterval(draw, 25);
let motion;
let reason;
let rise;
let run;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let breakboard = document.getElementById('bREAKBOARD');
let canvas = breakboard.getContext("2d");
let breaker = document.getElementById("bREAK");
let paddle;
let xinit;
let yinit;
let xvelo;
let yvelo;
let x;
let y;
let yVal = [];
let xVal = [];

let ball;
let turn = "Nothing";
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = function(){
    start = document.createElement("h2");
    start.id = "start";
    start.innerHTML = "Start";
    breaker.append(start);
}
breaker.onclick = init;
document.addEventListener("keydown", direction);

///////////////////// FUNCTIONS /////////////////////////////////////
function init(object){
    if(object.target == start){
        started = true;
        start.remove();

        canvas.clearRect(0, 0, 1024, 500);
        paddle = {
            x1 : box * 61.5,
            y1 : box * 60,
            xrange : undefined,
            yrange : undefined
        }
        xinit = box * 64;
        yinit =  box * 50;
        xvelo = xinit;
        yvelo = yinit;
        yVal = [];
        xVal = [];
        paddle.xrange = 80 + paddle.x1;
        paddle.yrange = 10 + paddle.y1;
        ball = {
            x : xvelo,
            y : yvelo,
            r : box,
            xrange2 : undefined,
            xrange : undefined,
            yrange : undefined
        }
        ball.xrange =  ball.x + ball.r;
        ball.xrange2 = ball.x - ball.r;
        ball.yrange = ball.y + ball.r;
        array = initArray;
        motion = "init";
        array.forEach((item, i) => {
            item.forEach((object, a) => {
                item[a] = "1";
            });

        });


    }
}
function draw(){
    if(started == true){
        canvas.clearRect(0, 0, 1024, 500);
        if (turn == "left"){
            turn = "nothing";
            paddle.x1 -= 2 * box;
            paddle.xrange -= 2 *box;
        } else if ( turn == "right"){
            turn = "nothing";
            paddle.x1 += 2 * box;
            paddle.xrange += 2 * box;
        }
        ballmecanics();
        boxers();
        winner();
        canvas.beginPath();
        canvas.rect(paddle.x1 , paddle.y1, 80, 10);
        canvas.stroke();
        canvas.beginPath();
        canvas.arc(ball.x, ball.y , ball.r, 0, 2 * Math.PI);
        canvas.stroke();


    }


}
function direction(event){
    if(event.keyCode == 37){
        turn = "left";
    } else if (event.keyCode == 39){
        turn = "right";
    }
}
function ballmecanics(){
    let yindex;
    let xindex;
    if(ball.xrange <= paddle.xrange && ball.xrange >= paddle.x1 && ball.yrange < paddle.yrange && ball.yrange >= paddle.y1){
        motion = "bounceinit";
        reason = "paddle";
    } else if(ball.xrange2 >= paddle.x1 && ball.xrange2 <= paddle.xrange && ball.yrange < paddle.yrange && ball.yrange >= paddle.y1){
        //(ball.xrange2 >= paddle.x1 && ball.xrange2 <= paddle.x1 && ball.yrange < paddle.yrange && ball.yrange >= paddle.y1)
        motion = "bounceinit";
        reason = "paddle";
    } else if(ball.xrange >= 1024 ){
        motion = "bounceinit";
        reason = "right";
    } else if(ball.xrange <= 2 * box){
        motion = "bounceinit";
        reason = "left";
    } else if(ball.yrange <= 2* box){
        motion = "bounceinit";
        reason = "top";
    }
    //box top
    array.forEach((item, i) => {
        item.forEach((object, a) => {
          if(object == "1"){
              //top
            if(ball.xrange <= xVal[a] + 80 && ball.xrange >= xVal[a] && ball.yrange <= yVal[i] + 8 && ball.yrange >= yVal[i]){
              motion = "bounceinit";
              reason = "paddle";
              item[a] = "0";
              console.log("top")
          } else if(ball.xrange2 >= xVal[a] && ball.xrange2 <= xVal[a] + 80 && ball.yrange < yVal[i] + 8 && ball.yrange >=  yVal[i]){
              motion = "bounceinit";
              reason = "paddle";
              item[a] = "0";
               console.log("top")
            //bottom
            } else if (ball.xrange <= xVal[a] + 80 && ball.xrange >= xVal[a] && ball.yrange - 20 <= yVal[i] + 64  && ball.yrange - 20 >= yVal[i]  + 56){
              motion = "bounceinit";
              reason = "top";
              item[a] = "0";
               console.log("bottom")
          } else if (ball.xrange <= xVal[a] + 8 && ball.xrange >= xVal[a] && ball.yrange - 20 <= yVal[i] + 56  && ball.yrange - 20 >= yVal[i]) {
              motion = "bounceinit";
              //left
              reason = "right";
              item[a] = "0";
              console.log("left")
          } else if (ball.xrange <= xVal[a] + 88 && ball.xrange >= xVal[a] + 80 && ball.yrange - 20 <= yVal[i] + 56  && ball.yrange - 20 >= yVal[i]){
              motion = "bounceinit";
              reason = "left";
              //right
              console.log("right")
              item[a] = "0";
          }


          }
        });

    });


    if(ball.yrange >= 500){
        loser();
        return;
    }

    if(motion == "init"){
    //    FALL DOWN 9 boxes
    y = -9;
    x = 0;
    motion = "fall";
    }
    if(motion == "fall"){
        if(y < -1){
            yvelo = yvelo + box;
            y = y + 1;
        } else if(y == - 1){
            yvelo = yvelo + box;
            y = 0;
        }
    }
    if(motion == "bounceinit"){
        if(reason == "paddle"){
            let rando = 5 * Math.random();
            if(rando < 1){
                run = -5;
                rise = -3;
            } else if (rando < 2){
                run = -3;
                rise = -5;
            } else if (rando < 3){
                run = 4;
                rise = -4;
            } else if (rando < 4){
                run = 3;
                rise = -5;
            } else {
                run = 5;
                rise = -3;
            }
            motion = "bounce";
        }
        if(reason == "right"){
            let rando = 5 * Math.random();
            if(rando < 1){
                run = -3;
                rise = -5;
            } else if (rando < 2){
                run = -5;
                rise = -3;
            } else if (rando < 3){
                run = 4;
                rise = -4;
            } else if (rando < 4){
                run = -5;
                rise = 3;
            } else {
                run = -3;
                rise = 5;
            }
            motion = "bounce";
        }
        if(reason == "left"){
            let rando = 5 * Math.random();
            if(rando < 1){
                run = 3;
                rise = -5;
            } else if (rando < 2){
                run = 5;
                rise = -3;
            } else if (rando < 3){
                run = 4;
                rise = 4;
            } else if (rando < 4){
                run = 5;
                rise = 3;
            } else {
                run = 3;
                rise = 5;
            }
            motion = "bounce";
        }
        if(reason == "top"){
            let rando = 5 * Math.random();
            if(rando < 1){
                run = -5;
                rise = 3;
            } else if (rando < 2){
                run = -3;
                rise = 5;
            } else if (rando < 3){
                run = 4;
                rise = 4;
            } else if (rando < 4){
                run = 3;
                rise = 5;
            } else {
                run = 5;
                rise = 3;
            }
            motion = "bounce";

        }

    }
    if(motion == "bounce"){
        xvelo += run;
        yvelo += rise;
    }
    ball.x = xvelo;
    ball.y = yvelo;
    ball.xrange =  ball.x + ball.r;
    ball.xrange2 = ball.x-ball.r
    ball.yrange = ball.y + ball.r;
  //  console.log(reason)

}
function loser(){
    started = false;
    motion = undefined;
    reason = undefined;
    canvas.clearRect(0, 0, 1024, 524);
    loseScreen = document.createElement("div");
    loseScreen.class = "container";
    start = document.createElement("h2");
    start.id = "start";
    start.innerHTML = "Restart";
    text = document.createElement("h2");
    text.id = "text";
    text.innerHTML = "YOU LOSE !!!!";
    loseScreen.append(start);
    loseScreen.prepend(text)
    breaker.append(loseScreen);
}
function boxers(){
    yVal = [];
    xVal = [];
    let yCount = 0;
    let xCount = 0;
    for(yCount; yCount <= 3; yCount++){
        yVal[yCount] = 24 + 80 * yCount;
        //console.log(yCount)
        for(xCount; xCount <= 9; xCount++){

            if(array[yCount][xCount] == "1"){
                xVal[xCount] = 80 + 96 * xCount;
                canvas.beginPath();
                canvas.rect(xVal[xCount], yVal[yCount], 80, 56);
                canvas.stroke();
            }
        }
        xCount = 0;
    }

}
function winner(){
    let counter = 0;
    array.forEach((item, i) => {
        item.forEach((object, d) => {
            if(object == "0"){

            } else {
                counter++;
                console.log(counter);
            }
        });

    });
    console.log("winner ran")
    if(counter == "0"){
        started = false;
        motion = undefined;
        reason = undefined;
        canvas.clearRect(0, 0, 1024, 524);
        winScreen = document.createElement("div");
        winScreen.class = "container";
        start = document.createElement("h2");
        start.id = "start";
        start.innerHTML = "Restart";
        text = document.createElement("h2");
        text.id = "text";
        text.innerHTML = "YOU WIN!!!";
        loseScreen.append(start);
        loseScreen.prepend(text)
        breaker.append(winScreen);

    } else {
        return;
    }
}
