// alert("Kawaii?")
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var clicked = false;
var level = 0;

$(document).keypress(function(){
  if(!clicked){
    $("#level-title").text("Level "+ level);
    nextSequence();
    clicked= true;
  }
});
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    playSound("wrong");
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

};

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //flash of the button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


  $(".btn").click(function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);});


//playSound when clicked and to show
function playSound(element){
     var audio = new Audio("sounds/" +element +".mp3");
     audio.play();
   }

//animate the click by adding white shadow for a 100ms
function animatePress(currentColor){
  var flash =$("#" + currentColor);
  flash.addClass("pressed");
  setTimeout (function () { flash.removeClass ('pressed'); }, 100);
}
function startOver(){
  level= 0;
  gamePattern = [];
  started =false;
}
