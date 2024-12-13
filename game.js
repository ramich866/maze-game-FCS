//Initialized variables
let score = 0;
let time_remaining = 10; 
let is_game_running = false;
const lose_sfx = new Audio("sound-effects/lose.mp3");
const collect_sfx = new Audio("sound-effects/oi oi oi.mp3");
const win_sfx = new Audio("sound-effects/victory royale.mp3");

//Declared variables
let end;
let start;
let items;
let boundaries; 
let reset_button;
let timer_display;
let status_display;
let countdown_interval;

document.addEventListener("DOMContentLoaded", loadPage);

function collectItem(event){
    if (is_game_running){
    event.target.style.display = "none"; 
    // event.target.classList.add("collecting") //nvm
    collect_sfx.play();
    score = score + 1;
    status_display.innerHTML = "" + "</br>" + "Your Score is: " + score;
    }
}

function resetItems(){
    items.forEach((item) => {
        item.style.display = "block";
    });
}

function startCountdown(time_remaining){
    countdown_interval = setInterval(() => {
        if (!is_game_running) {
            clearInterval(countdown_interval);
        }
        if (time_remaining > 0) {
            time_remaining--;
            timer_display.innerHTML = "Time remaining: " + time_remaining;
        } 
        else {
            gameOver();
            clearInterval(countdown_interval);
        }
    }, 900);
}

function displayScore(message){
    if(message != "")
        status_display.innerHTML = message + "<br/>" + "Your Score is: " + score;
}

function gameOver(){
    if(is_game_running){

        clearInterval(countdown_interval);

        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(243, 159, 159)"; 
        if(score > 0)
            score = score - 1;

        is_game_running = false;
        displayScore("Game Over!");
        lose_sfx.play();
        time_remaining = 10;
    }
}

function startGame(){
    resetItems();
    displayScore("");
    is_game_running = true;
    startCountdown(time_remaining);
    for(let i = 0; i < boundaries.length; i++)
        boundaries[i].style.backgroundColor = "#eeeeee"; 
}

function endGame(){
    if(is_game_running){
        clearInterval(countdown_interval);
        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(113 225 141)"; 
        score = score + 5;
        displayScore("You Won!");
        is_game_running = false;
        win_sfx.play();
        time_remaining = 10;
    }
}

function resetScore(){
    score = 0;
    displayScore(" ");
    for(let i = 0; i < boundaries.length; i++)
        boundaries[i].style.backgroundColor = "#eeeeee"; 
    timer_display.innerHTML = "Time remaining: " + time_remaining;
}

function loadPage(){
    end = document.getElementById("end");
    start = document.getElementById("start");
    items = document.querySelectorAll(".item");
    reset_button = document.getElementById("button");
    timer_display = document.getElementById("timer");
    status_display = document.getElementById("status");
    boundaries = document.getElementsByClassName("boundary");

    end.addEventListener("mouseover", endGame);
    start.addEventListener("click", startGame);
    reset_button.addEventListener("click", resetScore);

    for(let i = 0; i < boundaries.length; i++){
        boundaries[i].addEventListener("mouseover", gameOver);
    }
    for (let i = 0; i < items.length; i++){
        items[i].addEventListener("mouseover", collectItem);
    }
}

console.log(items);


