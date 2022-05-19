var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false

function nextSequence() {
  userClickedPattern = []

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut().fadeIn();

  playSound(randomChosenColour);
}

$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length-1)
});

$(".mobile-playAgain").on("click", function () {
  if(!started) {
    $("#level-title").text("Level "+level)
    nextSequence()
    started = true;
  }
})

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed")
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed")
  }, 100)
}

$(document).on("keydown", function() {
  if(!started) {
    $("#level-title").text("Level "+level)
    nextSequence();
    started = true;
  }
})

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200)
    $("#level-title").text("Game Over, Press Any Key to Restart or the Play Button to Restart")
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}