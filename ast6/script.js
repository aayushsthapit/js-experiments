var $mainWrapper=document.getElementById("mainWrapper");
var ballWidth=15;
var ant=[];
var antscount=20;

var output=[];
for(var y=0;y<antscount;y++)
{
    var $movingant=document.createElement("div");
    output.push($movingant);
    $movingant.className="ant";
    $mainWrapper.appendChild($movingant);
    ant[y]={x:random(),y:random(),dx:1,dy:1, $elem:$movingant};
    var element=ant[a];
    for(x=0;x<y;x++){
        if((ant[y].x<ant[x].x+ballWidth)&&(ant[y].x+ballWidth>ant[x].x)&&(ant[y].y<ant[x].y+ballWidth)&&(ant[y].y+ballWidth>ant[x].y))
            {
                ant[y].x+=ballWidth;
                ant[y].y+=ballWidth;
                ant[y].dy=ant[y].dy*-1;
                ant[y].dx=ant[y].dx*-1;

            }
    }
}

ant.forEach(singleAnt => {
    singleAnt.$elem.onclick=function()
    {        
        ant.splice(ant.indexOf(singleAnt),1);
        $mainWrapper.removeChild(singleAnt.$elem);
        antscount--;
        console.log(ant);
    }
})

// for(var y=0;y<antscount;y++)
// {
//     var $movingant=document.createElement("div");
//     output.push($movingant);
//     $movingant.className="ant";
//     $mainWrapper.appendChild($movingant);
//     $movingant.onclick=function()
//     {
//         // console.log(output.indexOf($movingant));
//         console.log(output)
//     }
// }

    
var a=0;
setInterval(function()
{         
    for(var a=0;a<antscount;a++)    {
        ant[a]=boundaryCollision(ant[a]);
        ant=checkcollision(ant[a],ant,a);

        ant[a]=updateAnt(ant[a]);
        drawAnt(ant[a]);  //,$moving 
    }        
},25);

function checkcollision(antCurrent,ant,a)
{
    for(var i=0;i<antscount;i++)
    {
        if(i!=a)
        {
            if((antCurrent.x<ant[i].x+ballWidth)&&(antCurrent.x+ballWidth>ant[i].x)&&(antCurrent.y<ant[i].y+ballWidth)&&(antCurrent.y+ballWidth>ant[i].y))
            {

                ant[i].dy=ant[i].dy*-1;
                ant[a].dy=ant[a].dy*-1;
                ant[i].dx=ant[i].dx*-1;
                ant[a].dx=ant[a].dx*-1;
            }
        }

    }
    return ant;
}

function random()
{
    var x = Math.floor((Math.random() * 470) + 1);
    return x;
}

function drawAnt(ant)//,$movingant
{
    ant.$elem.style.top=ant.y+"px";
    ant.$elem.style.left=ant.x+"px";
}
function updateAnt(ant)
{
    ant.x=ant.x+ant.dx;
    ant.y=ant.y+ant.dy;
    return ant;
}

function boundaryCollision(ant)
{
    var containerTop=0;
    var containerBottom=500;
    var containerLeft=0;
    var containerRight=500;

    if(ant.x<=containerLeft)
    {
        ant.dx=ant.dx*-1;
    }
    if(ant.x+ballWidth>=containerRight)
    {
        ant.dx=ant.dx*-1;
    }
    if(ant.y<=containerTop)
    {
        ant.dy=ant.dy*-1;
    }
    if(ant.y+ballWidth>=containerBottom)
    {
        ant.dy=ant.dy*-1;
    }
    return ant;
}