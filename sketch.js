const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;
var blocks = [];
var polygon_img, polygon;
var score = 0;
var bgcol;
var gameState = "onSling";

function preload() {
  time();
  polygon_img = loadImage("polygon.png");
}

function setup() {
  createCanvas(900, 400);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width / 2, height, width, 50);
  platform1  = new Ground(390,300,250,10);
  stand2 = new Ground(700,200,200,10);
  //level one
  block1 = new Block(300,275,30,40);
  block2 = new Block(330,275,30,40);
  block3 = new Block(360,275,30,40);
  block4 = new Block(390,275,30,40);
  block5 = new Block(420,275,30,40);
  block6 = new Block(450,275,30,40);
  block7 = new Block(480,275,30,40);
  //level two
  block8 = new Block(330,235,30,40);
  block9 = new Block(360,235,30,40);
  block10 = new Block(390,235,30,40);
  block11 = new Block(420,235,30,40);
  block12 = new Block(450,235,30,40);
  //level three
  block13 = new Block(360,195,30,40);
  block14 = new Block(390,195,30,40);
  block15 = new Block(420,195,30,40);
  //top
  block16 = new Block(390,155,30,40);

  //set 2 for second stand
  //level one
  blocks1 = new Block(640,175,30,40);
  blocks2 = new Block(670,175,30,40);
  blocks3 = new Block(700,175,30,40);
  blocks4 = new Block(730,175,30,40);
  blocks5 = new Block(760,175,30,40);
  //level two
  blocks6 = new Block(670,135,30,40);
  blocks7 = new Block(700,135,30,40);
  blocks8 = new Block(730,135,30,40);
  //top
  blocks9 = new Block(700,95,30,40);

  blocks.push(new Block(390, 155, 30, 40));

  polygon = Bodies.circle(100, 200, 20, { density: 1.2, restitution: 0.4, friction: 1 });
  World.add(world, polygon);

  sling = new SlingShot(polygon, { x: 100, y: 200 });

  Engine.run(engine);
}

function draw() {

  Engine.update(engine);
  if (bgcol)
    background(bgcol);

  ground.display();
  platform1.display();

  sling.display();

  imageMode(CENTER);
  image(polygon_img, polygon.position.x, polygon.position.y, 40, 40);

  noStroke();
  textSize(30);
  text("Score: " + score, 650, 70);

  textAlign(CENTER);
  if (gameState == "onSling") {
    text("Drag the hexagonal stone and throw it on the blocks", 400, 30);
  } else {
    text("Press space to get the stone back", 400, 30);
  }

  if (score == 500) {
    text("You Win!", 400, 200);
  }

  strokeWeight(2);
  stroke(15);
  fill("skyblue");
  block1.display();
  block2.display();
  block3.display();
  block4.display();
  block5.display();
  block6.display();
  block7.display();
  fill("pink");
  block8.display();
  block9.display();
  block10.display();
  block11.display();
  block12.display();
  fill("turquoise");
  block13.display();
  block14.display();
  block15.display();
  fill("grey");
  block16.display();
  fill("skyblue");
  blocks1.display();
  blocks2.display();
  blocks3.display();
  blocks4.display();
  blocks5.display();
  fill("turquoise");
  blocks6.display();
  blocks7.display();
  blocks8.display();
  fill("pink")
  blocks9.display();
stand2.display();

block1.score();
  block2.score();
  block3.score();
  block4.score();
  block5.score();
  block6.score();
  block7.score();
  block8.score();
  block9.score();
  block10.score();
  block11.score();
  block12.score();
  block13.score();
  block14.score();
  block15.score();
  block16.score();
  blocks1.score();
  blocks2.score();
  blocks3.score();
  blocks4.score();
  blocks5.score();
  blocks6.score();
  blocks7.score();
  blocks8.score();
  blocks9.score(); 
  drawSprites();

  if (mouseIsPressed) {
    if (gameState!="launched") {
    Body.setPosition(polygon, { x: mouseX, y: mouseY });
    }
  }
}

function mouseReleased() {
  sling.fly();
  gameState = "launched";
}

function keyPressed() {
  if (key == ' ') {
    sling.attach(polygon, {x: 100, y: 200});
  }
}

async function time() {
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/kolkata");
  var res = await response.json();
  var datetime = res.datetime.toString().slice(11, 13);

  let col;

  if (datetime > 6 && datetime < 18) {
    col = color(241, 171, 42);
  } else {
    col = color(19, 15, 45);
  }
  bgcol = col;
}