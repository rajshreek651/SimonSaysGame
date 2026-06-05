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
    if((userSeq[idx]) == gameSeq[idx]){ // CHECKING IF THE COLOR CLICKED BY THE USER MATCHES THE COLOR IN THE GAME SEQUENCE AT THE SAME INDEX, THEN LEVEL UP THE GAME IF THE USER HAS COMPLETED THE SEQUENCE
        if(userSeq.length == gameSeq.length){ 
            setTimeout(levelUp, 1000);
        }
    }else{ // IF THE COLOR CLICKED BY THE USER DOES NOT MATCH THE COLOR IN THE GAME SEQUENCE AT THE SAME INDEX, THEN GAME OVER
        let score = level - 1;

        if(score > highestScore){
            highestScore = score;
            h_score.innerText = highestScore;
        }

        h2.innerHTML = `GAME OVER! Your score was <b>${score}</b> <br> Press any key to restart the game.`;

        // FLASHING THE BACKGROUND COLOR TO RED FOR 200MS TO INDICATE THAT THE GAME IS OVER
        body.style.backgroundColor = "red";
        setTimeout(function(){
            body.style.backgroundColor = "white";
        }, 200);

        // ONCE RHE GAME GETS OVER WE NEED TO RESET THE GAME, ELSE THE GAME WILL FREEZE
        reset();
    }
}

function levelUp(){
    userSeq = []; // RESETTING THE USER SEQUENCE FOR THE NEW LEVEL, AS THE USER HAS TO START CLICKING FROM THE FIRST COLOR IN THE SEQUENCE AGAIN

    level++ ;
    h2.innerText = `Level ${level}`;

    let randNo = Math.floor(Math.random() * 4);
    let randColor = btnColors[randNo];
    let randBtn = document.querySelector(`.${randColor}`); // SELECTING THE ELEMENT USING CLASSNAME

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

            checkSeq(userSeq.length - 1); // CHECKING THE LAST INDEX OF THE USER SEQUENCE(i.e. CURRENT COLOR CLICKED BY THE USER) TO SEE IF IT MATCHES THE GAME SEQUENCE
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
