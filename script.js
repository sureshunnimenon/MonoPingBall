var canvas = document.getElementById("pingBall")
var ctx = canvas.getContext("2d")

var x=canvas.width/2;
var y=canvas.height-30;
var ballRadius=10;


var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleDx = 3;

var dx= 2; dy= -2;

var rightPressed;
var leftPressed;

function keyDownHandler(e){
    if(e.keyCode === 39){
        rightPressed = true;
    }

    else if (e.keyCode === 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode === 39){
        rightPressed = false;
    }

    else if(e.keyCode === 37){
        leftPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle="green";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle="red";
    ctx.fill();
    ctx.closePath();

}

function draw(){
    // do stuff here
    
    // clear the canvas before the ball is re rendered
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // draw the ball
    drawBall();

    // draw the paddle

    drawPaddle();
    // change the direction if the ball is colliding with right wall of canvas
    if(x+dx > canvas.width-ballRadius || x+dx < ballRadius){
        dx = -dx;
    }

    // change the direction if the ball is colliding with top of canvas (or) hits the paddle down 
    if(y+dy < ballRadius || (
            y + dy > canvas.height- paddleHeight - ballRadius &&
            x + dx > paddleX &&
            x + dx < paddleX + paddleWidth
        )){
        dy = -dy;
    }

    else if (y + dy > canvas.height) {
        location.reload();
    }

    // test if paddle is being moved
    if(rightPressed  && (paddleX + paddleWidth < canvas.width)){
        paddleX += paddleDx;
    }

    else if (leftPressed  && paddleX > 0 ){
        paddleX -= paddleDx;
    }
    x += dx;
    y += dy;
    // loop calling itself till browser closed
    requestAnimationFrame(draw)
}

requestAnimationFrame(draw);