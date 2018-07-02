var $mainWrapper=document.getElementById("mainWrapper");
var $mainmenuwrapper=document.getElementById('mainMenu');

$mainmenuwrapper.style.backgroundImage="url('images/mainmenu-bg.png')";
var $playbuttons=document.getElementById('playbutton');
var $maingames=document.getElementById('mainGame');
var $backgroundWrapper=document.getElementById("backgroundWrapper");
var $backgroundSliders=document.getElementById("backgroundSlider");
$backgroundSliders.style.listStyleType="none";
$backgroundSliders.style.height="5000px";
$backgroundSliders.style.marginTop="-1182px";

$scoreboard=document.createElement("div");
$scoreboard.className="scoreboard";

var enemies=[];
var bullets=[];
var rocketheight=100;
var rocketwidth=100;
var windowheight=591;
var goodguy;
var bulletwidth=10;
var bulletheight=10;
var bulletspeed=5;
var score=0;
var game;


// maingames.style.backgroundImage="url('images/goodguy.png')";
var newgame= new Startgame($mainWrapper);
newgame.init();

function Startgame(props)
{
    var self=this;
    this.$mainWrapper=props;
    this.init=function()
    {
        var mainmenu=new Mainmenu(self.$mainWrapper);
        mainmenu.init();
    }
}

function Mainmenu(props)
{
    var self=this;
    this.$mainmenuwrap=$mainmenuwrapper;
    this.$playbutton=$playbuttons;
    this.$parent=props;
    this.init=function()
    {
        self.$mainmenuwrap.style.display="inherit";
    }

    this.$playbutton.onclick=function()
    {
        self.$mainmenuwrap.style.display="none";
        var newgame=new Maingame({$parent:self.$parent,$mainmenu:self.$mainmenuwrap});
        newgame.init();
        
    }
}

function Maingame(props)
{
    $maingames.appendChild($scoreboard);
    var self=this;
    this.$parent=props.$parent;
    this.$mainmenu=props.$mainmenu;
    this.$maingame=$maingames;
    this.$backgroundwrap=$backgroundWrapper;
    this.$backgroundSlider=$backgroundSliders;
    this.init=function()
    {
        self.$maingame.style.display="inherit";
        self.$backgroundwrap.style.display="inherit";
        goodguy=new Goodguy({
            x:30,
            y:windowheight-rocketheight-30,
            dx:30,
            $parent:self.$maingame
        });
        goodguy.init();
        self.animate();
    }
    this.createEnemy=function()
    {
        if(enemies.length===0)
        {
            var createenemy=new Enemies({
                x:randomnumber(),
                y:-110,
                dy:1,
                $parent:self.$maingame
    
            })
            createenemy.init();
            enemies.push(createenemy);
       }
       if(enemies.length>0)
       {
           var latestenemy=enemies[enemies.length-1];
           if (latestenemy.y===0)
           {
                var createenemy=new Enemies({
                    x:randomnumber(),
                    y:-110,
                    dy:1,
                    $parent:self.$maingame
        
                })
                createenemy.init();
                enemies.push(createenemy);
                
           }
       }    
    }

    this.animate=function()
    {           
           game=setInterval(function()
        {
            $scoreboard.innerHTML=score;
            moveBackground(self.$backgroundSlider);
            
            self.createEnemy();
            
            enemies.forEach(function(element) {
                element.checkboundary();
                element.checkCollision();
                element.displayenemy();
              });  

            goodguy.displaygoodguy();   
            updateenemy(); 
            bullets.forEach(function(bullet)
        {            
            bullet.checkupperboundary();
            bullet.drawbullets();
            bullet.updatebullets();
            bullet.checkbulletCollision();
            //
        });  
            
        },15)
    }
}

function Goodguy(props)
{
    var self=this;
    this.x=props.x;
    this.y=props.y;
    this.dx=props.dx;  
    this.$parent=props.$parent;
    this.$elem=document.createElement("div");
    this.init=function()
    {
        self.$elem.className="goodguy";
        self.$parent.appendChild(self.$elem);
        self.$elem.style.backgroundImage="url('images/goodguy1.png')";
    } 
    this.displaygoodguy=function()
    {
        
        self.$elem.style.top=self.y+"px";
        self.$elem.style.left=self.x+"px";
    }
    this.removegoodguy=function()
    {
        self.$parent.removeChild(self.$elem);
    }
}

function Enemies(props)
{
    var self=this;
    this.x=props.x;
    this.y=props.y;
    this.dy=props.dy;
    this.hits=0;
    this.$parent=props.$parent;
    this.$enemies=document.createElement("div");

    this.init=function()
    {        
        self.$enemies.className="enemies";
        self.$parent.appendChild(self.$enemies);
        // self.displayenemy($enemies);
        self.$enemies.style.backgroundImage="url('images/badguy3.png')";
    }
    this.displayenemy=function()
    {
        self.$enemies.style.top=self.y+"px";
        self.$enemies.style.left=self.x+"px";
    }
    this.checkboundary=function()
    {
        if(self.y+rocketheight===windowheight)
        {           
            self.$parent.removeChild(self.$enemies);         
            enemies.splice(enemies.indexOf(this),1);
        }
    }
    this.checkCollision=function()
    {
        if((self.y<goodguy.y+rocketheight)&&(self.y+rocketwidth-20>goodguy.y)&&(self.x<goodguy.x+rocketwidth)&&(self.x+rocketwidth>goodguy.x))
        {
            clearInterval(game);
            resetgame();
        }
    }

    this.removeenemies=function()
    {
        self.$parent.removeChild(self.$enemies);         
        enemies.splice(enemies.indexOf(this),1);
    }
    this.clearenemiesfromparent=function()
    {
        self.$parent.removeChild(self.$enemies);
    }
}

function Bullet(props)
{
    var self=this;
    this.x=props.x;
    this.y=props.y;
    this.dy=props.dy;
    this.$parent=props.$parent;
    this.$elem=document.createElement("div");

    this.init=function()
    {
        self.$elem.className="bullets";
        self.$parent.appendChild(self.$elem);
    }
    this.drawbullets=function()
    {        
        self.$elem.style.left=self.x+"px";
        self.$elem.style.top=self.y+"px";        
    }

    this.updatebullets=function()
    {
       self.y=self.y-self.dy*bulletspeed;
    }

    this.checkupperboundary=function()
    {
        if(self.y<0)
        {
            self.$parent.removeChild(self.$elem);    
            bullets.splice(bullets.indexOf(this),1);

        }
    }
    this.removebullets=function()
    {
        self.$parent.removeChild(self.$elem);    
        bullets.splice(bullets.indexOf(this),1);
    }
    this.clearbulletsfromparent=function()
    {
        self.$parent.removeChild(self.$elem);
    }

    this.checkbulletCollision=function()
    {
        enemies.forEach(function(enemy)
        {            
            if((self.y<enemy.y+rocketheight-30)&&(self.y+bulletheight>enemy.y)&&(self.x<enemy.x+rocketwidth)&&(self.x+bulletheight>enemy.x))
            {
                enemy.hits++;
                console.log(enemy.hits);
                self.removebullets();
                if(enemy.hits===5)
                {
                    score=score+10;
                    enemy.removeenemies();                    
                }
                
            }
        });
    }
}


function moveBackground($backgroundSlider)
{
    var x=parseInt($backgroundSlider.style.marginTop.replace(/px/,""));
            if(x==0)
            {
               x=-1182; 
            }
            x++;
            $backgroundSlider.style.marginTop=x+"px";

}

function updateenemy()
{
    enemies.forEach(function(element) {
        element.y=element.y+element.dy        
      });
}
function randomnumber()
{
    var x = Math.floor((Math.random() * 3) + 1);
    if(x===1)
    {
        x=30;
    }
    if(x===2)
    {
        x=160;
    }
    if(x===3)
    {
        x=290;
    }
    return x;
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37')//LEft arrow
    {
        
        if(goodguy.x>30)
        {
            goodguy.x=goodguy.x-(rocketwidth+30);
        }        
    }
    if (e.keyCode == '39') //Right arrow
    {
        if(goodguy.x<(rocketwidth*2)+90)
        {
            goodguy.x=goodguy.x+(rocketwidth+30);
        } 
    }
    if(e.keyCode=='32')
    {        
        newbullets=new Bullet({
            x:goodguy.x+(rocketwidth/2)-(bulletwidth/2),
            y:goodguy.y-bulletwidth,
            dy:1,
            $parent:$maingames
        });
        newbullets.init();
        bullets.push(newbullets);        
    }

}

function resetgame()
{
    $reset=document.getElementById('reset');
    // $reset.innerHTML=score;
    $reset.style.display="inherit";
    $scoretext=document.getElementById('scoretext');
    $scoretext.innerHTML=score;
    $restartbutton=document.getElementById('resetbutton');
    $restartbutton.onclick=function()
    {
        enemies.forEach(function(enemy)
        {
        enemy.clearenemiesfromparent();
        })
        bullets.forEach(function(bullet)
        {
        bullet.clearbulletsfromparent();
        })
        enemies=[];
        console.log(enemies);
        $maingames.removeChild($scoreboard);
        bullets=[];
        
        goodguy.removegoodguy();
        score=0;
        $reset.style.display="none";
        $maingames.style.display="none";
        $backgroundWrapper.style.display="none";
        $mainmenuwrapper.style.display="inherit";
    }
    
}
