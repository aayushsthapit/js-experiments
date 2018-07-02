var $mainWrapper=document.getElementById("mainWrapper");
var $secondWrapper=document.getElementById("secondWrapper");
var containerTop=0;
var containerBottom=500;
var containerLeft=0;
var containerRight=500;
var antWidth=20;



function container(props)
{
    this.antCount=30;
    var ant=[];
    var self=this;
    this.$parent=props;
    this.$element=document.createElement("div");
    this.$element.className="maindiv";
    this.$parent.appendChild(this.$element);

    this.init=function()
    {        
        for(var a=0;a<self.antCount;a++)
        {
                ant[a]=new ants({
                x:this.getRandom(),
                y:this.getRandom(),
                dx:1,
                dy:1,
                $parent:this.$element
            })
        }
        this.start();

    }

    this.getRandom=function()
    {
        var x = Math.floor((Math.random() * 470) + 1);
        return x;
    }
    
    this.start=function()
    {
        // console.log(ant);
        setInterval(function()
        {

            for(var a=0;a<self.antCount;a++)
            {

                ant[a].plot();
                ant[a].update();
                ant[a].checkBoundary();
                ant[a].checkCollision(ant,self.antCount);
                // console.log(ant);
            }
    
        },20)
    }

    // this.$elem.onclick=function(e)
    // {
    //     console.log(e.target);
    // }
    this.$element.onclick = function(e) 
    {
        console.log(self.$element);
        if(e.target && e.target.className==="ant")
        {
            var index=Array.from(this.children).indexOf(e.target);
            // console.log(Array.from(this.children).indexOf(e.target));
            console.log(ant);
            self.$element.removeChild(e.target);
            ant.splice(index,1);
            console.log(ant);     

            self.antCount--;          
        }
        
    }
    // console.log(this.$element);
}


function ants(props)
{
    this.x=props.x;
    this.y=props.y;
    this.dx=props.dx;
    this.dy=props.dy;
    this.$parent=props.$parent;
    this.$elem=document.createElement("div");
    this.$elem.className="ant";
    this.$parent.appendChild(this.$elem);
    var self=this;

    this.plot=function()
    {
        this.$elem.style.left=this.x+"px";
        this.$elem.style.top=this.y+"px";        
    }

    this.update=function()
    {
        this.x+=this.dx;
        this.y+=this.dy;
    }

    this.checkBoundary=function()
    {
        if(this.x<=containerLeft)
        {
            this.dx=this.dx*-1;
        }
        if(this.x+antWidth>=containerRight)
        {
            this.dx=this.dx*-1;
        }
        if(this.y<=containerTop)
        {
            this.dy=this.dy*-1;
        }
        if(this.y+antWidth>=containerBottom)
        {
            this.dy=this.dy*-1;
        }
    }

    this.checkCollision=function(ant,antCount)
    {        
        for(var i=0;i<antCount;i++)
        {
            if(i!=ant.indexOf(this))
            {
                
                if((this.x<ant[i].x+antWidth)&&(this.x+antWidth>ant[i].x)&&(this.y<ant[i].y+antWidth)&&(this.y+antWidth>ant[i].y))
                {
                    ant[i].dy=ant[i].dy*-1;
                    this.dy=this.dy*-1;
                    ant[i].dx=ant[i].dx*-1;
                    this.dx=this.dx*-1;
                }
            }
        }
    }

    this.checkoverlap=function(a)
    {
        for(var x=0;x<a;x++){
            if((this.x<ant[x].x+antWidth)&&(this.x+antWidth>ant[x].x)&&(this.y<ant[x].y+antWidth)&&(this.y+antWidth>ant[x].y))
                {
                    // console.log("in");
                    this.x+=antWidth;
                    this.y+=antWidth;
                    this.dy=this.dy*-1;
                    this.dx=this.dx*-1;
    
                }
        }
    }

}

var container1=new container($mainWrapper);
container1.init();

var container2=new container($secondWrapper);
container2.init();