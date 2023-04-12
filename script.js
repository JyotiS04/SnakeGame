//game constants
let inputDir={x:0,y:0};
const foodsound= new Audio('food.mp3');
const gameOverSound=new Audio('gameover.mp3');
const movesound=new Audio('move.mp3');
const musicsound=new Audio('music.mp3');
let speed=8;
let score=0;
let highscore=0;
let lastPaintTime=0;
let snakearr=[
    
    {x:13,y:15}
]
food={x:6,y:7};


//game function
function main(ctime)
{
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000< 1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
    
}
function isCollide(sarr)
{   
    //if snake bit itself
    for (let index = 1; index < snakearr.length; index++) {
        if(snakearr[index].x===snakearr[0].x && snakearr[index].y===snakearr[0].y  ){
            return true;
        }
    }
        if(snakearr[0].x>=30 || snakearr[0].x<=0 || snakearr[0].y>=20 || snakearr[0].y<=0){
            return true;
        }
        
    
    return false;
}
function gameEngine()
{
    //part 1 updating the snake aray
     if(isCollide(snakearr))
     {  if(highscore<score)
        {
            highbox.innerHTML="High score:"+score;
            highscore=score;
        }
        gameOverSound.play();
        musicsound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again!");
        snakearr=[{x:13,y:15}];
        musicsound.play();
        score=0;

     }
     //if you have eaten the food , increment the score and regenerate the food 
     if(snakearr[0].y === food.y && snakearr[0].x===food.x){
        foodsound.play();
        score+=1;
        scorebox.innerHTML="Score: "+score;
        snakearr.unshift({x:snakearr[0].x +inputDir.x,y:snakearr[0].y +inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a +(b-a)*Math.random()),y :Math.round(a +(b-a)*Math.random())}
     }
     //moving the snake
     for (let i = snakearr.length-2; i >=0; i--) {
        
      snakearr[i+1]={...snakearr[i]};    //updating the snake     
     }
     snakearr[0].x+=inputDir.x;
     snakearr[0].y+=inputDir.y;


    // part2 display the snake and food 

    //display of snake
    board.innerHTML="";
    snakearr.forEach((e, index)=>{
      snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart =e.y;
      snakeElement.style.gridColumnStart =e.x;
   
      if(index===0)
      {snakeElement.classList.add('head');
      }
      else{
        snakeElement.classList.add('snake');
      }
      
      board.appendChild(snakeElement);
    });

    //display food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart =food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}










//main logic starts here

window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir={
        x:0,y:1  //start game
    }
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;  
            break;
        case "ArrowDown":
                console.log("ArrowDown");
                inputDir.x=0;
                inputDir.y=1;  
                break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;  
            break;
        case "ArrowRight":
            console.log("ArrowRight");  
            inputDir.x=1;
            inputDir.y=0;  
            break;
    
        default:
            break;
    }
})