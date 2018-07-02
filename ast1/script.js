// Assignment 1
var star="*";
var output=[];
for(var i=0;i<4;i++)
{
    for(var j=0;j<6;j++)
    {
        for(var k=0;k<j;k++)
        {
            star += "*" 
        }
        output.push(star);
        star="*";
    }
    for(var l=4;l>=0;l--)
    {
        for(var m=0;m<l;m++)
        {
            star+="*";
        }
        output.push(star);

        star="*";
    }
}   
    var counterref=setInterval(function()
    {
        console.log(output[m]);
        m++; 
        if(m > 44) {
            clearInterval(counterref)
        }  

    },250)