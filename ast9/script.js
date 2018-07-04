let $mainWrapper=document.getElementById("mainWrapper");
let $mainMenu=document.getElementById("mainMenu");
let $mainGame=document.getElementById("mainGame");
let $baseWrapper=document.getElementById("baseWrapper");
const pipewidth=52;
const pipeheight=320;
const pipegap=150;
const pipesgap=150;
const borderright=576;
const birdheight=24;
const birdwidth=34;


class Maincontainer
{
    constructor(props)
    {
        this.$parent=props;
        this.$maingamewrapper=$mainGame;
    }

    init()
    {
        $mainMenu.style.display="inherit";
        let $playButton=document.getElementById("playButton");
        $playButton.onclick=function()
        {
            let $maingame=new Maingame($mainGame);
            $maingame.init();
        }
    }
}

class Maingame
{
    
    constructor(props)
    {
        let self=this;
        this.$parent=props;
        this.pipes=[];
        this.bird;
        this.game;
        this.$base=document.getElementById("moveBase");
        this.$scoreboard=document.getElementById("scoreBoard");
        this.$resetscreen=document.getElementById("resetScreen");
        this.$score=document.getElementById("score");
        this.$reset=document.getElementById("resetbutton");
        document.onkeydown = checkKey;

        function checkKey(e) 
        {
            e = e || window.event;
            self.bird.jumpup=true;
            self.bird.clickedheight=self.bird.y;
            self.bird.jumpdown=false;
            self.bird.jumpspeed=3;
            self.bird.dy=-1;
        }

        this.$parent.onclick=function()
        {
            self.bird.jumpup=true;
            self.bird.clickedheight=self.bird.y;
            self.bird.jumpdown=false;
            self.bird.jumpspeed=3;
            self.bird.dy=-1;
        }

        this.$reset.onclick=function()
        {
            let pipe;      
            self.pipes.forEach(function(pipe)
            {
                self.$parent.removeChild(pipe.$pipebottom);
                self.$parent.removeChild(pipe.$pipetop);
            })
            self.pipes=[];
            self.$parent.removeChild(self.bird.$bird);
            self.$resetscreen.style.display="none";
            $mainGame.style.display="none";
            $mainMenu.style.display="inherit";
        }

    }
    
    init()
    {
        
        $mainMenu.style.display="none";
        $mainGame.style.display="inherit";
        this.$scoreboard.style.display="inherit";
        this.maingameloop();
        this.createbird();
    }

   baseslider()
   {
        let marginleft=this.$base.style.marginLeft.replace(/px/,"");
        marginleft--;
        if(marginleft==-borderright)
        {
            marginleft=0;
        }
        this.$base.style.marginLeft=marginleft+"px";
   }

   createbird()
   {
       this.bird=new Bird({
           x:100,
           y:200,
           dy:1,
           jumpspeed:1.5,
           jumpup:false,
           jumpdown:false,
           clickedheight:0,
           $parent:this.$parent
       })
       this.bird.init();
   }
   createpipes()
   {
       if((this.pipes).length===0)
       {
            let pipe=new Pipes({
                x:borderright+pipewidth,
                y:this.randomnumber(),
                dx:1,
                $parent:this.$parent
        });
        this.pipes.push(pipe);
        pipe.init();
       }
       if((this.pipes).length>0)
       {
           let lastindex=this.pipes.length-1;
           if(this.pipes[lastindex].x==borderright-pipesgap)
           {               
                let pipe=new Pipes({
                x:borderright+pipewidth,
                y:this.randomnumber(),
                dx:1,
                $parent:this.$parent
            });
            this.pipes.push(pipe);
            pipe.init();
           }
       }

       
   }

   randomnumber()
   {
        var x = Math.floor((Math.random() *(360-pipegap-40)) + (pipegap+40));
        return x;
   }

   scoreupdate()
   {
    this.$scoreboard.innerHTML=this.bird.scorecount;
   }


    maingameloop()
    {
        let self = this;
        let pipe;
        this.game=setInterval(function()
        {
            self.scoreupdate();
            self.baseslider();
            self.createpipes();
            self.checkboundary();
            self.bird.display();
            self.bird.fly();
            
            self.pipes.forEach(function(pipe)
        {
            self.bird.score(pipe);
            pipe.display();
            pipe.update();
            self.checkcollision(pipe);
            pipe.checkboundary(self.pipes);
        })     

        },8);
        
        //Request animation frame

        // let loop=function()
        // {
        //     let raf=requestAnimationFrame(loop)
        //     self.baseslider();            
        // }
        // let raf=requestAnimationFrame(loop);

    }

    checkboundary()
    {
        if(this.bird.y+birdheight>=400)
        {
            clearInterval(this.game);
            this.$scoreboard.style.display="none";
            this.$score.innerHTML=this.bird.scorecount;
            this.$resetscreen.style.display="inherit";
        }

    }

    checkcollision(pipe)
    {
        let self = this;
        if((this.bird.x<pipe.x+pipewidth)&&(this.bird.x+birdwidth>pipe.x)&&((this.bird.y+birdheight>pipe.y)||(this.bird.y<pipe.y-pipegap)))
        {
            clearInterval(this.game);
            this.$scoreboard.style.display="none";
            this.$score.innerHTML=this.bird.scorecount;
            this.$resetscreen.style.display="inherit";            
            this.$parent.onclick=function()
            {}
            document.onkeydown = checkKey;
            function checkKey(e) 
            {
                e = e || window.event;
            }            
            this.bird.rotate=true;
            let crash=setInterval(function()
            {                
                self.bird.display();
                self.bird.crash();
                if(self.bird.y+birdheight>=400)
                {
                    clearInterval(crash);
                }
            },4)
        }
        
    }
}


class Pipes
{
    constructor(props)
    {
        this.x=props.x;
        this.y=props.y;
        this.dx=props.dx;
        this.$parent=props.$parent;
        this.$pipebottom=document.createElement("div");
        this.$pipetop=document.createElement("div");
    }

    init()
    {        
        this.$pipebottom.className="pipes";
        this.$pipetop.className="pipes";
        this.$parent.appendChild(this.$pipebottom);
        this.$parent.appendChild(this.$pipetop);
        this.display();
    }

    display()
    {
        this.$pipetop.style.transform="rotate(180deg)";
        this.$pipebottom.style.left=this.x+"px";
        this.$pipebottom.style.top=this.y+"px";
        this.$pipetop.style.left=this.x+"px";
        this.$pipetop.style.top=this.y-pipeheight-pipegap+"px";
    }

    update()
    {
        this.x=this.x-this.dx;
    }

    checkboundary(pipes)
    {

        if(this.x===-pipewidth)
        {            
            this.$parent.removeChild(this.$pipebottom);
            this.$parent.removeChild(this.$pipetop);
            pipes.splice(pipes.indexOf(this),1);
        }
    }
}

class Bird
{
    constructor(props)
    {
        this.x=props.x;
        this.y=props.y;
        this.dy=props.dy;
        this.margintop=0;
        this.jumpspeed=props.jumpspeed;
        this.clickedheight=props.clickedheight;
        this.jumpup=props.jumpup;
        this.jumpdown=props.jumpdown;
        this.$parent=props.$parent;
        this.rotate=false;
        this.angle=0;
        this.spritecounter=0;
        this.flapcount=0;

        this.scorecount=0;
        this.$bird=document.createElement("div");
    }

    init()
    {
        this.$bird.className="bird";
        this.$parent.appendChild(this.$bird);
        this.$bird.style.transform="rotate(30deg)";
    }

    display()
    {
        if(this.spritecounter===10)
        {
            if(this.flapcount===-96)
            {
                this.flapcount=0;
            }
            this.$bird.style.backgroundPositionY=(-this.flapcount)+"px";
            this.flapcount=this.flapcount-24;
            this.spritecounter=0;
        }
        this.spritecounter++;
        this.$bird.style.left=this.x+"px";
        this.$bird.style.top=this.y+"px";
    }
    
    fly()
    {
        if(this.jumpup)
        {
            this.$bird.style.transform="rotate(-30deg)";          
            if(this.y<=this.clickedheight-40)
            {            
                this.jumpspeed=1.4;
            }
            if(this.y<=this.clickedheight-50)
            {             
                this.jumpspeed=1.3;            
            }
            if(this.y<=this.clickedheight-60)
            {             
                this.jumpspeed=1;            
            }

            if(this.y<=this.clickedheight-70)
            {              
                this.clickedheight=this.y;
                this.dy=1;
                this.jumpdown=true;
                this.jumpup=false;
            }
        }

        if(this.jumpdown)
        {
            if(this.y>=this.clickedheight+10)
            {
                this.jumpspeed=1.3; 
            }
            if(this.y>=this.clickedheight+20)
            {
                this.jumpspeed=1.4;  
            }
            if(this.y>=this.clickedheight+30)
            {            
                this.jumpspeed=1.5;
            }
            if(this.y>=this.clickedheight+80)
            {
                this.rotate=true;
                this.jumpdown=false;
            }
        }
        if(this.y<=-50)
        {
            this.dy=1;
            this.rotate=true;
            this.jumpup=false;
            this.y=this.y+this.dy*this.jumpspeed;
        }
        if(this.y>-50)
        {
            this.y=this.y+this.dy*this.jumpspeed;
        }
        if(this.rotate)
        {
            this.angle=this.angle+2;
            let text=this.angle+"deg";
            text="rotate("+text+")";
            this.$bird.style.transform=text;
            if(this.angle==90)
            {
                this.rotate=false;
                this.angle=0;
            }
        }
        
    }

    crash()
    {
        this.dy=1;
        this.y=this.y+this.dy;
        if(this.rotate)
        {
            this.angle=this.angle+1;
            let text=this.angle+"deg";
            text="rotate("+text+")";
            this.$bird.style.transform=text;
            if(this.angle==90)
            {
                this.rotate=false;
                this.angle=0;
            }
        }
    }

    score(pipe)
    {
        if((this.x===pipe.x+pipewidth)&&(this.y+birdheight<pipe.y)&&(this.y>pipe.y-pipegap))
        {
            this.scorecount++;
        }
    }
    
}

let mainContainer1=new Maincontainer($mainWrapper);
mainContainer1.init();
