//jab game start ho tab snake static rahe chale hei nahi
//const lo bcz variable ki value change nahi karne
let inputDir={x:0,y:0};
const foodSound=new Audio('food.mp3');
const gameOver=new Audio('gameover.mp3')
const move=new Audio('move.mp3');
const music=new Audio('music.mp3')
let lastPaintTime=0;
let speed=5;
let score=0;
let snakeArr=[
    {x:13,y:15}
];//snake head location

let food={x:6,y:7}//food array nahi hai
//game function
//main baar baar call hoga  requestAnimationFrame better then settimeout
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }//each 0.5 mai render karna hai
    lastPaintTime=ctime;
    gameEngine()
}
function isCollide(sarr){
  //if bump into yourself
  
  for(i=1;i<sarr.length;i++){
    if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y){
        return true;
    }
  }
 // if into wall
  if(sarr[0].x<=0 || sarr[0].x>=18 || sarr[0].y<=0 || sarr[0].y>=18 ){
    return true;
  }
  return false;
}
function gameEngine(){
//////1:updating the snake array and food
    //collide
  if(isCollide(snakeArr)){
    gameOver.play();
    music.pause();
    inputDir={x:0,y:0};
    alert("Game Over . please press any key to start the game again!")
    snakeArr=[{x:13,y:15}]
    music.play();
    score=0;
   scoreBox.innerHTML="Score: "+"0";
  }
  //if snake have eaten the food then increase score and regenerate food,increase size of snake
  if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
    foodSound.play()
    score+=1;
    if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
//The JSON string represents the same data as the JavaScript object, but in a text-based format that can be easily transmitted or stored.
       hiscoreBox.innerHTML = "HiScore: " + hiscoreval;//score ke sath hiscore bhi update hoga
    }
    scoreBox.innerHTML="Score: "+score;
    
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
//jab uske food kaha liya tho ussi direction mai ek or body part laga diya
let a=2;
let b=16;
food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}//food generator
  }
  //moving the snake(snake ke each segment ko ek kadam agge la aao)

   for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]}  //ek naya object create karna hai refreence problem nahi rakne
   }

snakeArr[0].x+=inputDir.x;
snakeArr[0].y+=inputDir.y;

////////2:display the snake and food
//displaying the snake
board.innerHTML='';//jo phale se hai usse hatta do
snakeArr.forEach((e,index)=>{
    snakeElement=document.createElement('div');
    snakeElement.style.gridRowStart=e.y;//row y hoga
    snakeElement.style.gridColumnStart=e.x;
    if(index==0){
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake');
    }
    //class add bcz css dalne hai
    board.appendChild(snakeElement);
});
//display food
foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;//row y hoga
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}





////////main logic start here ya hei baar baar call hoga
music.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
   // hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
//line of code requests the next animation frame from the browser, and passes the main function as a callback. The main function will be called by the browser when it is ready to render the next frame of the animation.
//event + arrow function
window.addEventListener('keydown',e=>{
   inputDir={x:0,y:1}//start the game
   move.play();
   switch (e.key) {
    case "ArrowUp":
        console.log("ArrowUp")
        inputDir.x=0;
        inputDir.y=-1;
        break;

    case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x=0;
        inputDir.y=1;
            break;

    case "ArrowLeft":
        console.log("Left")
        inputDir.x=-1;
        inputDir.y=0;
          break;

    case "ArrowRight":
        console.log("Right")
        inputDir.x=1;
        inputDir.y=0;
        break;

    default:
        break;
   }
});

