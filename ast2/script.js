// Assignment 2
var parentwrapper=document.getElementById("main-wrapper");

//Random Number Generator
function myFunction() {
    var x = Math.floor((Math.random() * 500) + 1);
    return x;
}
//Data preparation.
var datas=[];
for(var x=0;x<20;x++)
{
    datas.push({top:myFunction(),left:myFunction()});
}

//Plotting and deleting the scatter plot coordinates.
for(var i=0;i<datas.length;i++)
{
    var childelement=document.createElement("div");
    childelement.style.position="absolute";
    childelement.style.height="20px";
    childelement.style.width="20px";
    childelement.style.borderRadius="50%";
    childelement.style.background="green";
    childelement.style.left=datas[i].left+"px";
    childelement.style.top=datas[i].top+"px";
    parentwrapper.appendChild(childelement);
    childelement.onclick=function()
    {

        var x = document.createElement("LI");
        var axes="Left:"+this.style.left+",Top:"+this.style.top;
        var t = document.createTextNode(axes);
        x.appendChild(t);
        document.getElementById("mylist").appendChild(x);
        parentwrapper.removeChild(this);
    }

}
