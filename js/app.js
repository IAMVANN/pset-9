///////////////////// CONSTANTS /////////////////////////////////////
const box = 8;



///////////////////// APP STATE (VARIABLES) /////////////////////////

let start;
let started = undefined;

let game = setInterval(draw, 100);
let motion = "init"

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let breakboard = document.getElementById('bREAKBOARD');
let canvas = breakboard.getContext("2d");
let breaker = document.getElementById("bREAK");
let paddle = {
    x1 : box * 61.5,
    y1 : box * 60,
    xrange : undefined,
    yrange : undefined
}
let xinit = box * 64;
let yinit =  box * 50;
let xvelo = xinit;
let yvelo = yinit;
let x;
let y;
paddle.xrange = 40 + paddle.x1;
paddle.yrange = 10 + paddle.y1;
let ball = {
    x : xvelo,
    y : yvelo,
    r : box,
    xrange : undefined,
    yrange : undefined
}
ball.xrange =  ball.x + ball.r;
ball.yrange = ball.y + ball.r;
let turn = "Nothing";
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = function(){
    start = document.createElement("h2");
    start.id = "start";
    start.innerHTML = "New text!";
    breaker.append(start);
}
breaker.onclick = init;
document.addEventListener("keydown", direction);

///////////////////// FUNCTIONS /////////////////////////////////////
function init(object){
    if(object.target == start){
        started = true;
        console.log("RA")
        start.remove();

        canvas.clearRect(0, 0, 1024, 500);
    }
}
function draw(){
    if(started == true){
        canvas.clearRect(0, 0, 1024, 500);
        if (turn == "left"){
            turn = "nothing";
            paddle.x1 -= box;
            paddle.x2 -= box;
        } else if ( turn == "right"){
            turn = "nothing";
            paddle.x1 += box;
            paddle.x2 += box;
        }
        ballmecanics();
        canvas.beginPath();
        canvas.rect(paddle.x1 , paddle.y1, 40, 10);
        canvas.stroke();
        canvas.beginPath();
        canvas.arc(ball.x, ball.y , ball.r, 0, 2 * Math.PI);
        canvas.stroke();


    }


}
function direction(event){
    console.log("ASD")
    if(event.keyCode == 37){
        turn = "left";
    } else if (event.keyCode == 39){
        turn = "right";
    }
}
function ballmecanics(){
    if(ball.xrange < paddle.xrange && ball.x > paddle.x1 && ball.yrange < paddle.yrange && ball.yrange >= paddle.y1){
        motion = "bounceinit"
    }
    if(motion == "init"){
    //    FALL DOWN 9 boxes
    y = -9;
    motion = "fall";
    alert("RAN INIT");
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
    if(motion = "bounceinit")
    ball.x = xvelo;
    ball.y = yvelo;
    ball.xrange =  ball.x + ball.r;
    ball.yrange = ball.y + ball.r;
    console.log(motion)

}
