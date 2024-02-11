let gameseq = [];
let userseq = [];

let started = false;
let level = 0;
let highestScore = 0;

let btns = ["red", "green", "blue", "yellow"];

let h2 = document.querySelector("h2");
let keypressedCount = 0;
document.addEventListener("keypress",function(){
    if(started == false){
        alert("Game Begins now");
        started = true;
    }
    keypressedCount++;
    if(keypressedCount == 1){
        levelup();
    }
});

function btnFlash(btn){
  btn.classList.add('flash');
  setTimeout(function(){
    btn.classList.remove('flash');
  }, 300)};

function levelup (){
    userseq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random()*3);
    let randomColor = btns[randIndx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameseq.push(randomColor);
    btnFlash(randomBtn);
};

function checkSeq(Idx){
    if(gameseq[Idx]== userseq[Idx]){
        if(userseq.length == gameseq.length){ //agar ye false hota hai to hum new button ke press hone ka wait karege
            setTimeout(levelup, 1000)
        }
    }else{
        h2.innerHTML = `GameOver!! Your Score was <b> ${level} <b> <br> Press any key to restart.`; 
        document.querySelector('body').style.backgroundColor = "red";
       setTimeout(() => {
        document.querySelector('body').style.backgroundColor = "bisque";
       }, 200);

       if(highestScore < level){
        highestScore = level;
       }
        h2.append(`  HighestScore = ${highestScore}`);
        reset();
    }
}

function buttonPress(){
    let btn = this;
    btnFlash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkSeq(userseq.length-1);
};

let allBtns = document.querySelectorAll('.btn');

for (btn of allBtns){
    btn.addEventListener("click", buttonPress);
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    keypressedCount = 0;
}