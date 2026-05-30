let gameSeq = [];
let userSeq = [];

let btnColors = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;

let highestScore = 0;
let h_score = document.querySelector(".score");

let h2 = document.querySelector("h2");
let colorBtns = document.querySelectorAll(".btn");
let body = document.querySelector("body");

document.addEventListener("keypress", function(){
    if(started == false){
        started = true;
        console.log("Game started!!");

        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("game-flash");
    setTimeout(function(){
        btn.classList.remove("game-flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("user-flash");
    setTimeout(function(){
        btn.classList.remove("user-flash");
    }, 250);
}

function checkSeq(idx){
    if((userSeq[idx]) == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){ 
            setTimeout(levelUp, 1000);
        }
    }else{
        let score = level - 1;

        if(score > highestScore){
            highestScore = score;
            h_score.innerText = highestScore;
        }

        h2.innerHTML = `GAME OVER! Your score was <b>${score}</b> <br> Press any key to restart the game.`;

        body.style.backgroundColor = "red";
        setTimeout(function(){
            body.style.backgroundColor = "white";
        }, 200);

        reset();
    }
}

function levelUp(){
    userSeq = [];

    level++ ;
    h2.innerText = `Level ${level}`;

    let randNo = Math.floor(Math.random() * 4);
    let randColor = btnColors[randNo];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

for(let btn of colorBtns){
    btn.addEventListener("click", function(){
        if(level == 0){
            console.log("Press Enter to start the game...");
        }else{
            userFlash(this);
            let color = btn.getAttribute("id");
            userSeq.push(color);

            checkSeq(userSeq.length - 1);
        }
    });
}

function reset(){
    started = false;
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}