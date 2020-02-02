var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var highLevel = 0;
$(document).keydown(function() {

  if (started === false) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".btn").on("tap",function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length===gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("Game Over, Press any key to restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    if (level>highLevel) {
      highLevel=level-1 ;
    }
    $(".high-score").html("BEST LEVEL: "+highLevel);
    startOver();
  }
}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}
