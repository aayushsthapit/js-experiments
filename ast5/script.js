var $mainContainer=document.getElementById("main-container");
$mainContainer.onkeydown="keypressed()";

var $movingball=document.createElement("div");
$movingball.className="ball";
$mainContainer.appendChild($movingball);

var $movingball2=document.createElement("div");
$movingball2.className="ball2";
$mainContainer.appendChild($movingball2);

var speed=1;
var ballWidth=30;
var ball={
    x:30,y:0,dx:1,dy:1,
    $elem:$movingball
};
var ball2={
    x:40,y:60,dx:1,dy:1,$elem:$movingball2
}
setInterval(function(){
    updateBall(ball,ball2);
    ball.x=ball.x+ball.dx*speed;
    ball.y=ball.y+ball.dy*speed;
    ball2.x=ball2.x+ball2.dx*speed;
    ball2.y=ball2.y+ball2.dy*speed;


    checkBallCollision(ball,ball2);
    checkBoundaryCollision(ball,ball2);


},5);

function updateBall(ball,ball2)
{
    ball.$elem.style.top=ball.y+"px";
    ball.$elem.style.left=ball.x+"px";
    ball2.$elem.style.left=ball2.x+"px";
    ball2.$elem.style.top=ball2.y+"px";
}

function checkBoundaryCollision(ball,ball2)
{
    var containerTop=0;
    var containerBottom=500;
    var containerLeft=0;
    var containerRight=500;

    if(ball.x<=containerLeft)
    {
        ball.dx=ball.dx*-1;
    }
    if(ball.x+ballWidth>=containerRight)
    {
        ball.dx=ball.dx*-1;
    }
    if(ball.y<=containerTop)
    {
        ball.dy=ball.dy*-1;
    }
    if(ball.y+ballWidth>=containerBottom)
    {
        ball.dy=ball.dy*-1;
    }
    
    if(ball2.x<=containerLeft)
    {
        ball2.dx=ball2.dx*-1;
    }
    if(ball2.x+ballWidth>=containerRight)
    {
        ball2.dx=ball2.dx*-1;
    }
    if(ball2.y<=containerTop)
    {
        ball2.dy=ball2.dy*-1;
    }
    if(ball2.y+ballWidth>=containerBottom)
    {
        ball2.dy=ball2.dy*-1;
    }
}

function checkBallCollision(ball,ball2)
{
    if((ball.x<ball2.x+ballWidth)&&(ball.x+ballWidth>ball2.x)&&(ball.y<ball2.y+ballWidth)&&(ball.y+ballWidth>ball2.y))
    {
        ball2.dy=ball2.dy*-1;
        ball.dy=ball.dy*-1;
        ball2.dx=ball2.dx*-1;
        ball.dx=ball.dx*-1;
    }
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') 
    {
        ball2.dy=-1;
        ball2.dx=0;
       
    }
    else if (e.keyCode == '40')
    {
        ball2.dy=1;
        ball2.dx=0;
    }
    else if (e.keyCode == '37')
    {
        ball2.dx=-1;
        ball2.dy=0;
    }
    else if (e.keyCode == '39') 
    {
        ball2.dx=1;
        ball2.dy=0;
    }

}