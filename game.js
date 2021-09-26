const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedpattern = [];
var isStarted = false;
var level = 0;
//resetting global variables.
function resetVariables() {
    level = 0;
    gamePattern.length = 0;
    isStarted = false;
}
//playing sound according to button.
function playSoundForButton(button) {
    switch (button) {
        case "red":
            new Audio("sounds/red.mp3").play();
            break;
        case "yellow":
            new Audio("sounds/yellow.mp3").play();
            break;
        case "green":
            new Audio("sounds/green.mp3").play();
            break;
        case "blue":
            new Audio("sounds/blue.mp3").play();
            break;
        default:
            new Audio("sounds/wrong.mp3").play();
    }
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeOut().fadeIn();
    playSoundForButton(randomChoosenColor);
    level++;
    $("h1").text("Level " + level);
}

function animatePress(color) {
    $("." + color).addClass("pressed");
    setTimeout(function () {
        $("." + color).removeClass("pressed");
    }, 100);
}

// eventListners 
//check for keypress
$(document).keypress(function () {
    if (isStarted === false) {
        isStarted = true;
        level = 0;
        nextSequence();
    }
});

function checkAnswer(currentLevel) {
    if (userClickedpattern[currentLevel] !== gamePattern[currentLevel]) {
        console.log("wronog");
        playSoundForButton("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        resetVariables();
        userClickedpattern.length = 0;
    }
    if (userClickedpattern[currentLevel] === gamePattern[currentLevel] && currentLevel == level-1) {
        console.log("sucess");
        setTimeout(function () {
            nextSequence();
            userClickedpattern.length = 0;
        }, 1000);
    }
}

//to check for button click
function handler(userChoosenColour) {
    userClickedpattern.push(userChoosenColour);
    animatePress(userChoosenColour);
    checkAnswer(userClickedpattern.length - 1);
}
$(".btn").click(function () {
    handler(this.id);
})