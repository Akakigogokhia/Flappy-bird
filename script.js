var hole = document.getElementById("hole");
var block = document.getElementById("block");
var block1 = document.getElementById("block1");
var character = document.getElementById("character");
var score = document.getElementById("score");
var swoosh = new Audio("sounds/swoosh.mp3");
var backg = new Audio("sounds/backg.mp3");
backg.volume = 0.8;
swoosh.playbackRate = 4;
var hit = new Audio("sounds/hit.mp3");
var point = new Audio("sounds/point.mp3");
var jumping = 0;
var counter = 0;
var noJumpCount = 0;
score.textContent = 0;
var highScore = 0;

hole.addEventListener('animationiteration', () => {
    counter++;
    point.play();
    score.textContent = counter;
    noJumpCount = 0;
    var random = -(Math.random()*300 + 250);
    hole.style.top = random + "px";
    block1.style.top = random + "px";
    block.style.top = 600 - (-random-203) + "px";    
    
})

setInterval(function(){
    backg.play();
    var characterTop = 
    parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    //character elementis zeda sazgvris mdebareoba
    if (jumping==0){
        noJumpCount++;
        console.log(noJumpCount);
        character.style.top = (characterTop + 4.5) + "px";
        if (noJumpCount<40){
            character.style.transform = "rotate(20deg)";
            
        }else{
            character.style.transform = "rotate(90deg)"; 
        }
       
    }

    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(600-characterTop);
    if ((characterTop > 545)||(blockLeft < 50)&&(blockLeft > -55)&&((cTop < holeTop-8)||(cTop > holeTop + 149))){
        if (counter > highScore){
            highScore = counter;
        }
        hit.play();
        backg.pause();
        alert("Game over. Score: "+ counter + " Highest Score: "+ highScore);
        counter = 0;

        score.textContent = 0;
        character.style.top = 100 + "px";
        block.style.left = 500 + "px";
        block1.style.left = 500 + "px";
        hole.style.left = 500 + "px";
    }
},10)

function jump(){
    jumping = 1;
    swoosh.play();
    noJumpCount = 0; 
    character.style.transform = "rotate(340deg)";
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if ((characterTop > 6) && (jumpCount < 15)){
            swoosh.play();
            character.style.top = (characterTop - 6.9) + "px";
        
    }
        jumpCount++;
        if (jumpCount > 20){
            clearInterval(jumpInterval)
            jumping = 0;
        }
    },10)

}