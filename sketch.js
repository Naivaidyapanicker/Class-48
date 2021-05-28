var ground,groungimg;
var ironman , ironmanImg;
var shoot = 0;
var laser,laserImg;
var bg,bgimg;
var spaceship,spaceshipimg;
var PLAY=1;
var END=0;
var gameState=PLAY;
var count=0;
var life=0;
function preload(){
 groundimg=loadImage("ground.png");
 ironmanImg=loadImage("ironmanstand.png");
 laserImg=loadImage("laserbeam.png");
 bgimg=loadImage("background.gif");
 spaceshipimg=loadImage("spaceship.png");
}

function setup(){
  createCanvas(1000,1000);
 ground=createSprite(500,980,1000,50);
ground.addImage("ground",groundimg);
ground.scale=2.0;

bg=createSprite(300,435,1000,800);
bg.addImage("bg",bgimg);
bg.velocityY=-8;

ironman=createSprite(500,800,50,50);
ironman.addImage("ironman",ironmanImg);
ironman.scale =0.35;




laserGroup = new Group();  
spaceShipGroup = new Group();

}


function draw(){
  background(bgimg);
 /*stroke(70);
  fill("black");
  text("Spaceships Destroyed:"+count,500,100); */
  
  ironman.x=mouseX;
  ironman.y=mouseY;
  if(gameState==PLAY){
    bg.velocityY=-8;
    if(bg.y<=0){
      bg.y=bg.height/2;
    }
     
     shoot = shoot - 1;
   
     if(keyDown("space") && shoot < 460) {
       laser = createSprite(ironman.x,ironman.y - 130);
       laser.addImage(laserImg);
       laser.velocityY = -8; 
       laser.scale = 0.9;
      laserGroup.add(laser);
       //laserSound.play();
       //console.log(laser.x);
       shoot = laser.y;
     } 
     spaceShipGroup.overlap(laser, explosion);
     if(spaceShipGroup.isTouching(laser)){
      count=count+1;
     }
     
     if(spaceShipGroup.isTouching(ground))
     {
       life=life+1;
     }
     if(life==2)
     {
       gameState=END;
     }
     
     spawnSpaceships();
  }
 
  if(gameState==END)
  {
    ironman.velocityY=0;
    bg.velocityY=0;
    spaceShipGroup.setVelocityYEach(0);
    spaceShipGroup.setLifetimeEach(0);
   
  }
 

drawSprites();
}

function explosion(laser) {
  laser.remove();
}

function spawnSpaceships(){
  if(frameCount%150==0){
    spaceShip=createSprite(400,10,50,50);
    spaceShip.addImage("spaceship",spaceshipimg);
    spaceShip.scale=0.5;
    spaceShip.x=Math.round(random(100,900));
    spaceShip.velocityY=1;


    spaceShipGroup.add(spaceShip);
  }
}