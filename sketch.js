//making variables.....
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;

var obstacleGroup;
var doorsGroup;

var score;

//loading images in function preload
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

//function setup....
function setup(){

//creating canvas
  createCanvas(1000, 500);

//create groups...
obstacleGroup = createGroup();
doorsGroup = createGroup();

//creating tower sprite, adding image, velocity
  tower = createSprite(500, 250);
  tower.addImage(towerImg);
  tower.velocityY = 3;

//creating ghost sprite, adding image, velocity
 ghost = createSprite(200, 200);
 ghost.addImage(ghostImg);
 ghost.scale = 0.5;

 //score as 0
 score = 0;
}


//function draw.......
function draw() {

//background
  background(20);

textSize(10);
fill("white")                           
text("Score:" +score, 20, 20);
score = score + Math.round(frameCount/30);

textSize(10);
text("INSTRUCTIONS: ", 20, 50);
text("🌸Press space to make the ghost fly", 20, 80);
text("🌸Use arrow keys to move", 20, 100);
text("🌸Dogde the obstacles", 820, 30);
text("🌸Don't fall", 820, 50);

textSize(22);
fill("yellow")
text("ALL THE BEST", 800, 450);

if(gameState == PLAY){

//sound..
//spookySound.loop()

//making the tower move forever to make it look as it is infinity
  if(tower.y > 400){
      tower.y = 300
    }

//giving movement functions to the ghost
  if(keyDown("right_arrow")){
    ghost.x = ghost.x +5;
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x -5;
  }
  if(keyDown("space")){
    ghost.velocityY = -10;
  }

  if (ghost.y > 520 || ghost.isTouching(doorsGroup)|| ghost.isTouching(obstacleGroup)){
    gameState = END;
  }

  //adding gravity
  ghost.velocityY = ghost.velocityY +0.8;

  }
  if(gameState == END){

    fill("red");
    textSize(20);
    text("GAME OVER", 420, 250);
    text("💥💥💥💥", 425, 150);

    doorsGroup.setVelocityYEach(0);
    doorsGroup.setLifetimeEach(-1);

    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);

    tower.velocityY = 0;
    ghost.x = 500
    ghost.y = 250

    score = 0;

    if (keyDown("SPACE")){
      reset();
    }

  }
   
//calling functions to spawn obstacles
  spawnDoors();
  spawnObstacles();

  //draw the sprites
  drawSprites();
}

//function of spawning the door at random positiions
function spawnDoors(){

if(frameCount % 250 === 0 ){
  door = createSprite(100, 100, 50, 70);
  door.x = Math.round(random(20, 480))
  door.addImage(doorImg);
  door.scale = 1;
  door.velocityY = 3;
  door.lifetime = 420;
  doorsGroup.add(door);
}
}

//function of spawning the obstacles at random positions
function spawnObstacles(){
 
if(frameCount % 150 === 0){
  climber = createSprite(120, 10, 30, 30);
  climber.y = Math.round(random(10, 480));
  climber.addImage(climberImg);
  climber.scale = 1;
  climber.velocityX = 5;
  climber.lifetime = 500;
 obstacleGroup.add(climber)
}
}
function reset(){
  gameState = PLAY;

  doorsGroup.destroyEach();
  obstaclesGroup.destroyEach();

  tower.velocityY = 5;


  score = 0;
}

//edges bounceooff/
//edgeswrite
//reset