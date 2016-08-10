var player;

var sprite;

var pipes = [];

// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;

var labelScore;

/*
 * Loads all resources for the game and gives them names.
 */

function preload() {
  game.load.image("playerImg", "../assets/flappy_frog.png");
  game.load.audio("score", "../assets/point.ogg");

  game.load.image("pipeBlock","../assets/pipe.png");

}
/*
 * Initialises the game. This function is only called once.
 */

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);


var pipeInterval = 1.75 * Phaser.Timer.SECOND;
game.time.events.loop(
  pipeInterval,
   generatePipe
);

game.input.keyboard
.addKey(Phaser.Keyboard.SPACEBAR)
.onDown
.add(playerJump);


game.stage.setBackgroundColor("#00cccc");

game.add.text(280, 40, "Flappy Frog", {font: "60px Times", fill: "#00cc00"});

//game.add.sprite(5, 370, "playerImg");
//game.add.sprite(670, 370, "playerImg");
//game.add.sprite(10, 70, "playerImg");
//game.add.sprite(670, 70, "playerImg");

//game.input.onDown.add(clickHandler);
game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    // set the background colour of the scene
labelScore = game.add.text(20, 20, "0");

player = game.add.sprite(100, 200, "playerImg");
game.physics.arcade.enable(player);
///player.body.velocity.y = 25;
///player.body.gravity.y = 500;
}

/*
 * This function updates the scene. It is called for every new frame.
 */
 function generatePipe(){
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count=0; count<8; count++) {
        if (count != gap && count != gap+1) {
            addPipeBlock(750, count*50);
        }
    }
    changeScore();
}

function addPipeBlock(x, y) {
    var block = game.add.sprite(x,y,"pipeBlock");
    pipes.push(block);
  }

function update() {

          //  400 is the speed it will move towards the mouse
          game.physics.arcade.moveToPointer(player, 400);


}

function clickHandler(event) {
    game.add.sprite(event.x, event.y, "playerImg");
}

function spaceHandler() {
    game.sound.play("score");
}

function changeScore() {
    score = score + 1;
    labelScore.setText(score.toString());
}



function gameOver(){
    registerScore(score);
    game.state.restart();
}

function playerJump() {
    player.body.velocity.y = -200;
  }

  function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipeBlock");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;
  }

// Collisions and GameOver

  function update(){
     game.physics.arcade.overlap(
          player,
                  pipes,
                  gameOver);
  }

  function gameOver(){
     game.paused = true;
     registerScore(score);
  }
