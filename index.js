var box = ".box";

var gamePattern = [];

var userPatern = [];

var started = false;

var level = 0;

var hardness;

$(".btn").click(function(){
      if(!started){
        hardness = prompt("Enter the hardness level (between 1 to 3): ");
        hardness = 150/hardness;
        started = true;
        $(".title").text("Level " + level);
        $(".btn").addClass("hidden");
        nextSequence();
      }
});

$(".box").click(function(){
    var userChosenColour = $(this).attr("id");
    userPatern.push(userChosenColour);

    animate(this);

    playAudio("success");

    checkAnswer(userPatern.length - 1);
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userPatern[currentLevel]) {

        console.log("success");
  
        if (userPatern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, hardness*4);
        }
  
      } else {
  
        console.log("wrong");
        $(".title").text("Game Over");
        setTimeout(function () {
            $(".title").text("Simon Memory Game");
        }, 1000);
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 1000);
        startOver();
        playAudio("wrong");
        $(".btn").removeClass("hidden");
    }
}

function nextSequence(){
    level++;
    userPatern = [];
    $(".title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4) + 1;
    var randomBox = ".box" + randomNumber;
    console.log(randomBox);
    gamePattern.push(randomBox);

    playAudio("pat");

    $(randomBox).fadeIn(hardness).fadeOut(hardness).fadeIn(hardness);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function animate(element){
    $(element).addClass("blink");
    setTimeout(function(){
        $(element).removeClass("blink");
    }, hardness);
}

function playAudio(res){
    var b = "wrong";
    if(res == b){
        const audio = new Audio("sounds/wrong.mp3");
        audio.play();
    }
    else if(res == "success"){
        const audio = new Audio("sounds/yellow.mp3");
        audio.play();
    }
    else if(res == "pat"){
        const audio = new Audio("sounds/blue.mp3");
        audio.play();
    }
    
}
