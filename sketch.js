const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var database;

var backgroundImg,bg
var girl1,girl1Img
var mount,mountImg
var alien,alienImg
var coin,coinImg
var coin1,coin1Img
var Ig,InvisibleCoin,Ig2;

var death = 0;
var score = 0;
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){

  backgroundImg=loadImage("38 images/bg.jpg")
  mountImg=loadImage("38 images/mountain.png")
  girl1Img=loadImage("38 images/girl1.png")
  coinImg=loadAnimation("38 images/coin1.png","38 images/coin2.png",
  "38 images/coin3.png","38 images/coin4.png","38 images/coin5.png","38 images/coin6.png")
  alienImg=loadImage("38 images/alien.png");
  coin1Img=loadImage("38 images/coin2.png")
}


function setup() {

  createCanvas(1000,600);
  
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

//bg =createSprite(200,300,0,0)
//bg.addImage("bg",backgroundImg)
//bg.velocityY=3
//bg .scale=0.03

girl1=createSprite(200,200,0,0)
girl1.addImage("girl",girl1Img)
girl1.velocityY=1

MountainG=new Group();
coinG=new Group();
IgG=new Group();
Ig2G=new Group();
InvisibleCoinG=new Group();
alianGroup=new Group();

score=0;
death=0;
}


function draw() {
  
  if (gameState===PLAY){
    background("TURQUOISE");
    edges= createEdgeSprites();

  textSize(20);
  fill("tan");
  text("coin: "+ score,150,30);
  textSize(20);
  fill("red");
  text("death: "+ death,250,30);

  //if (bg.y >700) 
    //{
    // bg.y = 600
    //}

    girl1.velocityY = girl1.velocityY + 0.8
  
    girl1.velocityX=0
   
    if (death===1){
      gameState=END
    }
  
  if(keyDown("space")&&girl1.y>=100){
      girl1.velocityY=-9   
    }

  if (keyDown("LEFT_ARROW")) {
      girl1.velocityX =- 9 
    }

  if (keyDown("RIGHT_ARROW")) {
      girl1.velocityX = 9
    }

  if (girl1.isTouching(InvisibleCoinG)) {

  for(var k=0;k<coinG.length;k++){

  if(coinG.contains(coinG.get(k))){

  if(girl1.isTouching(coinG.get(k))){
      coinG.get(k).destroy();
      score=score+1

    } } }}

    if (Ig2G.isTouching(alianGroup)) {

      for(var k=0;k<alianGroup.length;k++){
    
      if(alianGroup.contains(alianGroup.get(k))){
    
      if(Ig2G.isTouching(alianGroup.get(k))){
          alianGroup.get(k).destroy();
    
        } } }}

  if (girl1.isTouching(alianGroup)) {

    for(var k=0;k<alianGroup.length;k++){
        
  if(alianGroup.contains(alianGroup.get(k))){
        
  if(girl1.isTouching(alianGroup.get(k))){
       alianGroup.get(k).destroy();
      death=death+1  

   } } }}
  
 
  girl1.collide(IgG)
  alianGroup.collide(Ig2G)

  spawnMount();
  

  spawnAlian()

  }else if (gameState === END) {

    //bg.velocityY=0
    alianGroup.velocityX=0
    MountainG.setVelocityYEach(0);
    girl1.velocityY=0
  
    coinG.destroyEach();

    if(keyDown("DOWN_ARROW"))
    {
      reset();   
    }
  }
  
  Engine.update(engine);
  
  drawSprites();
  
}


function spawnMount(){
  
  if (frameCount % 60 === 0) {
    mount = createSprite(400, -50, 10, 10);
    mount.addImage("mount", mountImg);
    mount.velocityY = 4;
    mount.x = Math.round(random(80, 750))
    mount.scale=0.5
    Ig=createSprite(400,-85,100,10)
    Ig.velocityY=4
    Ig.x=mount.x
    Ig.visible = false;
    Ig2=createSprite(-0,-50,60,60)
    Ig2.velocityY=4
    Ig2.x=mount.x
    Ig2.visible = false;
    coin= createSprite(400, -120, 10, 10);
    coin.addAnimation("coin", coinImg);
    coin.velocityY = 4;
    coin.scale=0.2
    coin.x = mount.x
    coin.visible=true
    InvisibleCoin=createSprite(400,-125,10,10);
    InvisibleCoin.velocityY= 4
    InvisibleCoin.x=coin.x
    InvisibleCoin.visible=false
     
    
     
    girl1.depth= MountainG.depth
     girl1.depth=girl1.depth+1
    
    MountainG.add(mount);
    coinG.add(coin)
    IgG.add(Ig);
    Ig2G.add(Ig2);
    InvisibleCoinG.add(InvisibleCoin)
}
}

function spawnAlian(){
if (frameCount % 200 === 0) {
 
  alian=createSprite(1000,200,10,10)
  alian.y = Math.round(random(80, 550))
  alian.addImage("alien",alienImg)
  alian.velocityX= -4
  alian.scale=0.5
  alianGroup.add(alian)
  
}
}

function reset()
{
  gameState=PLAY
  girl1.addImage("girl",girl1Img)
  girl1.x=200
  girl1.y=200
  MountainG.destroyEach();
  coinG.destroyEach();
  alianGroup.destroyEach();
  score=0
  death=0
}