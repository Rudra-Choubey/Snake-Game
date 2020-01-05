let c = document.getElementById('c');
let ctx = c.getContext('2d');
let snake = [
{
    x:9*32,
    y:9*32
}
]
let bg = new Image();
bg.src = "img/bg.png";
let food = new Image();
food.src = "img/apple.png";
let sud = new Audio();
sud.src = 'audio/right.mp3';
let apple = {
    x:Math.floor(Math.random()*17+1)*32,
    y:Math.floor(Math.random()*15+3)*32
}
let d;
let pts = 0; 
let gameover = new Audio();
gameover.src = "audio/dead.mp3";
'use strict';
let chew = new Audio();
chew.src = "audio/eat.mp3";
document.addEventListener('keydown',move)
function move(e){
//    alert(e.keyCode);
    if(e.keyCode == 37 && d != "right"){d = "left"; sud.play();};
    if(e.keyCode == 39 && d != "left"){d = "right"; sud.play();};
    if(e.keyCode == 40 && d != "up"){d = "down"; sud.play();};
    if(e.keyCode == 38 && d != "down"){d = "up"; sud.play();};
}

function draw(){
    
    ctx.drawImage(bg,0,0);
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0)?"green":"white";
        ctx.fillRect(snake[i].x,snake[i].y,32,32);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,32,32);
    }
    ctx.drawImage(food,apple.x,apple.y);
    ctx.fillStyle = "white";
    ctx.font = "46px verdana";
    ctx.fillText(pts,64,51.3);    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if(snakeX == apple.x && snakeY == apple.y){
        pts++;
        chew.play();
        apple = {
    x:Math.floor(Math.random()*17+1)*32,
    y:Math.floor(Math.random()*15+3)*32
    }
    }else{snake.pop()}
    if(d === "left")snakeX -= 32;
    if(d === "right")snakeX += 32;
    if(d === "up")snakeY -= 32;
    if(d === "down")snakeY += 32;
    let head = {
        x:snakeX,
        y:snakeY
    }
    snake.unshift(head);
    if(snakeX < 32 || snakeX > 17*32 || snakeY < 3*32 || snakeY > 17*32){
        clearInterval(game);
        gameover.play();
        
    }
}
let num = 0;
function easy()
{   
    localStorage.removeItem("speed","name");
    localStorage.setItem("speed",120);
    localStorage.setItem("name","Easy");
    num = 2;
    location.reload();
}
function normal()
{   
    localStorage.removeItem("speed","name");
    localStorage.setItem("speed",100);
    localStorage.setItem("name","Normal");
    num = 1;
    location.reload();
}
function hard()
{   
    localStorage.removeItem("speed","name");
    localStorage.setItem("name","Hard");
    localStorage.setItem("speed",90);
    num = 0;
    location.reload();
}
let p = document.getElementById('para');
p.innerHTML = 'Difficulty = '+localStorage.name;
let game = setInterval(draw,localStorage.speed);
    
