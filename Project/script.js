let $mainWrapper = document.getElementById("mainWrapper");


class MainContainer {
    constructor(props) {
        this.$mainMenu = document.getElementById("mainMenu");
        this.$parent = props.$parent;
    }

    init() {
        this.$mainMenu.style.display = 'inherit';
        let $startButton = document.getElementById("startButton");
        let self = this;
        $startButton.onclick = function () {
            let $mainGame = new MainGame({
                $parent: this.$parent,
                $mainMenu: this.$mainMenu
            });
            $mainGame.init();
        }.bind(this);
    }

}


class MainGame {
    constructor(props) {
        this.$mainMenu = props.$mainMenu;
        this.$mainGame = document.getElementById("mainGame");
        this.mapLevel1;
        this.player;
        this.mainGameloop;
    }

    init() {
        this.$mainMenu.style.display = 'none';
        this.$mainGame.style.display = "inherit";
        this.renderMap();
        this.createPlayer();
        // this.createPlayer(this.$parent);
        this.mainGameloop();
    }

    renderMap() {
        this.mapLevel1 = new Map({
            rows: 6,
            cols: 8,
            tsize: 48,
            tiles: [1, 2, 3, 4, 5, 6, 1, 2, 9, 7, 7, 7, 7, 7, 7, 11, 8, 7, 2, 3, 4, 5, 7, 12, 9, 7, 1, 6, 2, 3, 7, 10, 8, 7, 7, 7, 7, 7, 7, 7, 9, 1, 2, 3, 4, 5, 6, 11],
            $parent: this.$mainGame
        })
        this.mapLevel1.init();
    }

    createPlayer()
    {
        this.player=new Player({
             x : 100,
             y : 100,
             speed : 2,
             mod : 0,
             angle : 0,
             delay:0,
             move : 0,
             $parent:this.$mainGame
        })
    }

    mainGameloop()
    {
        this.mainGameloop=setInterval(function()
        {
            this.player.renderPlayer();
            this.player.updatePlayer();
        }.bind(this),15)
    }
}

class Map {
    constructor(props) {
        this.rows = props.rows;
        this.cols = props.cols;
        this.tsize = props.tsize;
        this.tiles = props.tiles;
        this.$parent = props.$parent;
        this.getTile = function (col, row) {
            return this.tiles[row * this.cols + col];
        };
        this.$mapDivs = [];
    }

    init() {
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                let tileindex = this.getTile(y, x);
                if (tileindex != 0) 
                {
                    let $map = document.createElement("div");
                    $map.className = "map";
                    this.$mapDivs.push($map);
                    this.$parent.appendChild($map);
                    $map.style.backgroundImage = "url('images/"+tileindex+".png')";
                }
            }
        }
    }
}

class Player
{
    constructor(props)
    {
        this.x=props.x;
        this.y=props.y;
        this.speed=props.speed;
        this.mod=props.mod;
        this.angle=props.angle;
        this.delay=props.delay;
        this.move=props.move;
        this.$parent=props.$parent;
        this.$car=document.createElement("div");
        this.$car.className = "car";
        this.$parent.appendChild(this.$car);
        let self=this;
        window.addEventListener("keydown", keypress_handler, false);
        window.addEventListener("keyup", keyup_handler, false);

        

        function keyup_handler(event) 
        {
            if (event.keyCode == 38 || event.keyCode == 40) 
            {
                self.move = -1;
            }
        }
        
        function keypress_handler(event) 
        {            
            if (event.keyCode == 38) 
            {
                self.speed = 2;
                self.delay = 40;
                self.move = 1;
                self.mod = 1;    
                
            }
            if (event.keyCode == 40) 
            {
                self.speed = 2;
                self.delay = 40;
                self.move = 1;
                self.mod = -1;
            }
            if (((event.keyCode == 37) && (self.mod === 1)) || ((event.keyCode == 39) && (self.mod === -1))) 
            {
                self.angle -= 5;
                
            }
            if (((event.keyCode == 39) && (self.mod === 1)) || ((event.keyCode == 37) && (self.mod === -1))) 
            {
                self.angle += 5;
            }
    
            if (event.keyCode == 32) 
            {
                self.speed = 0;
                self.delay = 0;
                self.mod = 0;
                self.move = 0;
            }
        }
    }
    renderPlayer()
    {
        var text = this.angle + "deg";
        text = "rotate(" + text + ")";
        this.$car.style.transform = text;
        this.$car.style.left = this.x + "px";
        this.$car.style.top = this.y + "px";
    }

    updatePlayer()
    {
        this.momentumPlayer();
        this.x += (this.speed * this.mod) * Math.cos(Math.PI / 180 * this.angle);
        this.y += (this.speed * this.mod) * Math.sin(Math.PI / 180 * this.angle);
    }
//For gradually decreasing the speed of player after the accelerator is released.
    momentumPlayer()
    {
        if (this.move === -1) 
        {
            this.delay--;
            if (this.delay === 30) 
            {
                this.speed = 1.5;
            }
            if (this.delay === 20) 
            {
                this.speed = 1;
            }
            if (this.delay === 10) 
            {
                this.speed = 0.5;
            }
            if (this.delay === 0) 
            {
                this.speed = 2;
                this.mod = 0;
                this.move = 0;
            }
        }   
    }


}



let game = new MainContainer({
    $parent: $mainWrapper
});
game.init();