var towerImg, tower;
var doorImg, door, doorsGroup;
var ghost, ghostImg;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup() {
  createCanvas(500, 500);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.scale = 2
  
  doorsGroup = new Group();


  ghost = createSprite(250, 250, 10, 10)
  ghost.addImage(ghostImg)
  ghost.scale = 0.05
}

function draw() {
  background(200);
  if(gameState === "play"){

  
  spawnDoors();
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("space")){
      ghost.velocityY = -2
    }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x -2
    }
    if (keyDown("right_arrow")){
      ghost.x = ghost.x +2
    }
    ghost.velocityY = ghost.velocityY + 0.5

    if(doorsGroup.isTouching(ghost)){
      ghost.destroy();
      text("Game Over", 300, 300)
      gameState = "end"
    }
    
    }
    drawSprites()
  }
  if(gameState === "end"){
    text("Game Over", 300, 300)
  }


function spawnDoors(){
  if (frameCount%240===0){
    door = createSprite(Math.round(random(100,500)), -75, 10, 10)
    door.addImage(doorImg)
    door.scale = 0.05
    door.velocityY = 1;
    door.lifetime = 600;
    doorsGroup.add(door);
    
    ghost.depth = door.depth
    ghost.depth += 1
  }
}

