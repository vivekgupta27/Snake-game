const board=document .querySelector(".board");
const Score=document.querySelector("#scoreBox");
const HighScore=document.querySelector("#hiscoreBox")
let SnakeArr=[{x:13,y:15}];
let food={x:15,y:13};
let direction={x:0,y:0};
let lastPaintTime = 0;
let speed=6;
let score=0;
let hiscore = localStorage.getItem("hiScore");

function GameLoop(ctime){

requestAnimationFrame(GameLoop);

if((ctime - lastPaintTime)/1000 < 1/speed){
    return;
}
lastPaintTime = ctime;


    draw()
    move()
    
}

function draw()
{   
  
// If food is eaten by snake
if(SnakeArr[0].x===food.x&&SnakeArr[0].y===food.y)
{
    SnakeArr.unshift({ x:SnakeArr[0].x+direction.x,y:SnakeArr[0].y+direction.y });
    score++;
    if(score>hiscore){
    localStorage.setItem("hiScore",JSON.stringify(score));
    }
    Score.innerHTML="Score:"+score;
    food={
        x:Math.floor(2+Math.random()*16),
        y:Math.floor(2+Math.random()*16)
    }
    
}
// To check whether there was a high score before

if(hiscore === null){
    localStorage.setItem("hiscore", JSON.stringify(score))
}
else{
    let hivalue = localStorage.getItem("hiScore");
    HighScore .innerHTML = "HiScore: " + hivalue;
}

// To draw the food and snake
    board.innerHTML="";
   SnakeArr.forEach((e,index)=>{ 
    const SnakeElement=document.createElement("div")
    SnakeElement.style.gridColumnStart=e.x;
      SnakeElement.style.gridRowStart=e.y;
      if(index===0)
       SnakeElement.classList.add("head");
      else
      SnakeElement.classList.add("snake");

      board.appendChild(SnakeElement)

   })
   const FoodElement=document.createElement("div");
   FoodElement.style.gridColumnStart=food.x;
   FoodElement.style.gridRowStart=food.y;
   FoodElement.classList.add("food");
   board.appendChild(FoodElement);

}
// function to for collision
function iscollide(Snake)
{
    for(let i=2;i < Snake.length;i++)
    {
        if(Snake[i].x === Snake[0].x && Snake[i].y === Snake[0].y)
        return true;
    }
    if(Snake[0].x>18||Snake[0].x<=0 || Snake[0].y>18||Snake[0].y<=0){
        return true;
    }
    return false;
}


// Function for moving the snake
function move(){
    if(iscollide(SnakeArr)===true)
    {
      SnakeArr=[{x:13,y:15}];
         food={x:15,y:13};
         direction={x:0,y:0};
         score=0;
         Score.innerHTML="Score"+score;
         alert("game over");
    }
    for(let i=SnakeArr.length-2;i>=0;i--)
    {
        SnakeArr[i+1]={...SnakeArr[i]};
    }
    SnakeArr[0].x+=direction.x;
    SnakeArr[0].y+=direction.y;

}



// Moving Snake in Particular direction
window.addEventListener('keyup',(e)=>{
    switch(e.key){
        case "ArrowUp":
            if(direction.y!=0)
            {
                break;
            }
            direction.x=0;
            direction.y=-1;
            break;
        case "ArrowDown":
            if(direction.y!=0)
            {
                break;;
            }
            direction.x=0;
            direction.y=1;
            break;
        case "ArrowLeft":
            if(direction.x!=0)
            {
                break;;
            }
            direction.x=-1;
            direction.y=0;
            break;
        case "ArrowRight":
            if(direction.x!=0)
            {
                break;
            }
            direction.x=1;
            direction.y=0;
            break;

    }
})
window.requestAnimationFrame(GameLoop);