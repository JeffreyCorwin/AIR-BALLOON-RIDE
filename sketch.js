var ball;
var database;
var bg, balloon;
var ba;

function preload(){
    bg = loadImage("cityImage.png");
    balloon = loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png")
}

function setup(){
    database = firebase.database();
    createCanvas(1000, 1000);
    ba = createSprite(400, 250);
    ba.scale = 0.5
    ba.addImage(bg);

    ball = createSprite(250,250,10,10);
    ball.addAnimation('balAnim', balloon);
    ball.scale = 0.2;
    ball.shapeColor = "red";
    var ballPosition = database.ref('ball');
    ballPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePos(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePos(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePos(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePos(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("data not recieved from database")
}

function writePos(x, y){
    database.ref('ball').set({
        'x':position.x + x,
        'y':position.y + y})
}
