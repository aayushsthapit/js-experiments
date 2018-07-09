class MainGame {
    constructor(props) {
        this.$mainMenu = props.$mainMenu;
        this.$mainGame = document.getElementById("mainGame");
        this.level = 1;
        this.mapObject;
        this.player;
        this.opponents = [];
        this.gameLoop;
        this.gameWon=false;
        this.$timer = document.getElementById("timer");
        this.countDown = 40;
        this.displayMessage;
        this.$reset = document.getElementById("reset");
        this.$displayLevel=document.getElementById("displayLevel");
        this.$displayMessage = document.getElementById('displayMessage');
        this.$resetButton = document.getElementById('restart');
        this.$nextButton = document.getElementById('next');
    }

    init() {
        this.$mainMenu.style.display = 'none';
        this.$mainGame.style.display = 'inherit';
        this.createMap();
        this.createPlayer();
        if (this.level > 2) {
            this.createMovingOpponents();
        }
        this.mainGameloop();
    }

    createMap() {
        if (this.level === 1 || this.level === 3) {
            let a,b,c,finishTileX,finishTileY;
            if(this.level===1){
                a=4;
                b=1;
                c=13;
                finishTileX=6;
                finishTileY=5;
            }

            if(this.level===3){
                a=7;
                b=13;
                c=6;
                finishTileX=6;
                finishTileY=0;
            }

            this.mapObject = new Map({
                rows: 6,
                startTileRow: 2,
                startTileCol: 0,
                finishTileRow: finishTileY,
                finishTileCol: finishTileX,
                cols: 8,
                tsize: 48,
                tiles: [1, 2, 3, a, 5, 6, b, 2, 9, 7, 7, 7, 7, 7, 7, 11, 7, 7, 2, 3, 4, 5, 7, 12, 9, 7, 1, 6, 2, 3, 7, 10, 8, 7, 7, 7, 7, 7, 7, 6, 9, 1, 2, 3, 4, 5, c, 11],
                $parent: this.$mainGame
            })
            this.mapObject.init();
        }

        if(this.level === 2 || this.level === 4)
        {
        this.mapObject = new Map({
            rows: 6,
            startTileRow: 0,
            startTileCol: 0,
            finishTileRow: 5,
            finishTileCol: 3,
            cols: 8,
            tsize: 48,
            tiles: [7, 7, 7, 7, 7, 7, 7, 7, 1, 2, 3, 4, 5, 6, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 5, 4, 3, 2, 1, 7, 5, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 10, 13, 12, 9, 8, 11],
            $parent: this.$mainGame
        })
            this.mapObject.init();
        }

    }

    createMovingOpponents() {
        let startRow,startCol;
        if(this.level===3)
        {
            startRow=100;
            startCol=600;
        }
        if(this.level===4)
        {
            startRow=200;
            startCol=700;
        }
        let opponent1 = new MovingOpponent({
            x: startCol,
            y: startRow,
            dx: -1,
            $parent: this.$mainGame
        })
        opponent1.init();
        this.opponents.push(opponent1);

        let opponent2 = new MovingOpponent({
            x: 100,
            y: 400,
            dx: 1,
            $parent: this.$mainGame
        })
        opponent2.init();
        this.opponents.push(opponent2);
    }

    createPlayer() {
        this.player = new Player({
            x: this.mapObject.startTileCol * TILE_WIDTH + (TILE_WIDTH / 2),
            y: this.mapObject.startTileRow * TILE_HEIGHT + (TILE_WIDTH / 2),
            speed: 2,
            mod: 0,
            angle: 0,
            delay: 0,
            move: 0,
            $parent: this.$mainGame
        })
    }

    checkCollision(movingOpponentObject) {
        let self = this;

        if (this.level > 2) {
            let q = movingOpponentObject.x;
            let r = movingOpponentObject.x + MOVING_OPPONENT_WIDTH;
            let s = movingOpponentObject.y;
            let t = movingOpponentObject.y + MOVING_OPPONENT_HEIGHT;
            determineCollision(q, r, s, t); //For checking collision of player with moving opponent cars.
        }


        for (let x = 0; x < this.mapObject.rows; x++) {
            for (let y = 0; y < this.mapObject.cols; y++) {
                let tileindex = this.mapObject.getTile(y, x);

                if (tileindex != 7 && tileindex != 13) {
                    let a = TILE_WIDTH * y + GAP_CARS_SIDE;
                    let b = TILE_WIDTH * y + TILE_WIDTH - GAP_CARS_SIDE;
                    let c = TILE_HEIGHT * x + GAP_CARS_TOPDOWN;
                    let d = TILE_HEIGHT * x + TILE_HEIGHT - GAP_CARS_TOPDOWN;
                    determineCollision(a, b, c, d); // For checking collision of player with parked cars.                          
                }
            }
        }

        function determineCollision(a, b, c, d) {
            self.player.getFourCornersCoordinatesBeforeRotation();

            let leftTop = self.player.getFourCornersCoordinatesAfterRotation(self.player.leftTopx, self.player.leftTopy);
            let leftBottom = self.player.getFourCornersCoordinatesAfterRotation(self.player.leftBottomx, self.player.leftBottomy);
            let rightTop = self.player.getFourCornersCoordinatesAfterRotation(self.player.rightTopx, self.player.rightTopy);
            let rightBottom = self.player.getFourCornersCoordinatesAfterRotation(self.player.rightBottomx, self.player.rightBottomy);

            if ((leftTop[0] > a) && (leftTop[0] < b) && (leftTop[1] > c) && (leftTop[1] < d)) {
                self.displayMessage = "Game Over! You Collided.";
                self.reset();
            }
            if ((leftBottom[0] > a) && (leftBottom[0] < b) && (leftBottom[1] > c) && (leftBottom[1] < d)) {
                self.displayMessage = "Game Over! You Collided.";
                self.reset();
            }
            if ((rightTop[0] > a) && (rightTop[0] < b) && (rightTop[1] > c) && (rightTop[1] < d)) {
                self.displayMessage = "Game Over! You Collided.";
                self.reset();
            }
            if ((rightBottom[0] > a) && (rightBottom[0] < b) && (rightBottom[1] > c) && (rightBottom[1] < d)) {
                self.displayMessage = "Game Over! You Collided.";
                self.reset();
            }
        };
    }

    checkGameStatus() {
        this.player.getFourCornersCoordinatesBeforeRotation();

        let leftTop = this.player.getFourCornersCoordinatesAfterRotation(this.player.leftTopx, this.player.leftTopy);
        let leftBottom = this.player.getFourCornersCoordinatesAfterRotation(this.player.leftBottomx, this.player.leftBottomy);
        let rightTop = this.player.getFourCornersCoordinatesAfterRotation(this.player.rightTopx, this.player.rightTopy);
        let rightBottom = this.player.getFourCornersCoordinatesAfterRotation(this.player.rightBottomx, this.player.rightBottomy);

        let finishTilex = this.mapObject.finishTileCol * TILE_WIDTH;
        let finishTiley = this.mapObject.finishTileRow * TILE_HEIGHT;
        //Checking if all four corners of player car lies inside the finish tile or not.
        if ((leftTop[0] > finishTilex) && (leftTop[0] < finishTilex + TILE_WIDTH) &&
            (leftTop[1] > finishTiley) && (leftTop[1] < finishTiley + TILE_HEIGHT) &&

            ((leftBottom[0] > finishTilex) && (leftBottom[0] < finishTilex + TILE_WIDTH) &&
                (leftBottom[1] > finishTiley) && (leftBottom[1] < finishTiley + TILE_HEIGHT)) &&

            ((rightTop[0] > finishTilex) && (rightTop[0] < finishTilex + TILE_WIDTH) &&
                (rightTop[1] > finishTiley) && (rightTop[1] < finishTiley + TILE_HEIGHT)) &&

            ((rightBottom[0] > finishTilex) && (rightBottom[0] < finishTilex + TILE_WIDTH) &&
                (rightBottom[1] > finishTiley) && (rightBottom[1] < finishTiley + TILE_HEIGHT))) {
            this.gameWon=true;
            this.displayMessage = "Congratulations!";
            this.reset();
        }

    }

    checkBoundary(movingOpponentObject) {
        this.player.getFourCornersCoordinatesBeforeRotation();

        let leftTop = this.player.getFourCornersCoordinatesAfterRotation(this.player.leftTopx, this.player.leftTopy);
        let leftBottom = this.player.getFourCornersCoordinatesAfterRotation(this.player.leftBottomx, this.player.leftBottomy);
        let rightTop = this.player.getFourCornersCoordinatesAfterRotation(this.player.rightTopx, this.player.rightTopy);
        let rightBottom = this.player.getFourCornersCoordinatesAfterRotation(this.player.rightBottomx, this.player.rightBottomy);

        //Checking if all four corners of player car lies inside the four boundaries of game or not.
        if ((leftTop[0] < BOUNDARY_LEFT) || (leftTop[0] > BOUNDARY_RIGHT) ||
            (leftTop[1] < BOUNDARY_TOP) || (leftTop[1] > BOUNDARY_BOTTOM) ||

            ((leftBottom[0] < BOUNDARY_LEFT) || (leftBottom[0] > BOUNDARY_RIGHT) ||
                (leftBottom[1] < BOUNDARY_TOP) || (leftBottom[1] > BOUNDARY_BOTTOM)) ||

            ((rightTop[0] < BOUNDARY_LEFT) || (rightTop[0] > BOUNDARY_RIGHT) ||
                (rightTop[1] < BOUNDARY_TOP) || (rightTop[1] > BOUNDARY_BOTTOM)) ||

            ((rightBottom[0] < BOUNDARY_LEFT) || (rightBottom[0] > BOUNDARY_RIGHT) ||
                (rightBottom[1] < BOUNDARY_TOP) || (rightBottom[1] > BOUNDARY_BOTTOM))) 
        {
            this.displayMessage = "Crashed into boundary!";
            this.reset();
        }

        //Checking boundary of moving opponents.
        if(this.level>2)
        {
            if ((movingOpponentObject.x< BOUNDARY_LEFT) || ( movingOpponentObject.x + MOVING_OPPONENT_WIDTH> BOUNDARY_RIGHT) ||
            (movingOpponentObject.y < BOUNDARY_TOP) || (movingOpponentObject.y + MOVING_OPPONENT_HEIGHT> BOUNDARY_BOTTOM))
            {
                movingOpponentObject.dx = -movingOpponentObject.dx;
                movingOpponentObject.dy = -movingOpponentObject.dy;
            }
        }
    }

    checkCollisionofOpponents(movingOpponentObject) {
        for (let x = 0; x < this.mapObject.rows; x++) {
            for (let y = 0; y < this.mapObject.cols; y++) {
                let tileindex = this.mapObject.getTile(y, x);

                if (tileindex != 7) {
                    if ((movingOpponentObject.x + MOVING_OPPONENT_WIDTH > TILE_WIDTH * y) && (movingOpponentObject.x < TILE_WIDTH * y + TILE_WIDTH) &&
                        (movingOpponentObject.y + MOVING_OPPONENT_HEIGHT > TILE_HEIGHT * x) && (movingOpponentObject.y < TILE_HEIGHT * x + TILE_HEIGHT)) 
                        {
                            movingOpponentObject.dx = -movingOpponentObject.dx;
                            movingOpponentObject.dy = -movingOpponentObject.dy;
                        }
                }
            }
        }

    }

    mainGameloop() {
        this.$timer.innerHTML = this.countDown;
        let timer = 0; //timer is used just to keep track of the time elapsed and decrease the countDown by 1 every 1 second.

        this.gameLoop = setInterval(function () {
        timer++;
            if (timer === 66) {
                this.countDown--;
                this.$timer.innerHTML = this.countDown;
                timer = 0;                
                if (this.countDown === 0) {
                    this.displayMessage = "Time's Up!"
                    this.reset();
                }
            }

            if (this.level > 2) {
                this.opponents.forEach(function (element) {
                    element.renderOpponent();
                    element.updateOpponent();
                    this.checkCollision(element);
                    this.checkCollisionofOpponents(element);
                    this.checkBoundary(element);
                }.bind(this))
            }
            if (this.level <=2) {
                this.checkCollision();
                this.checkBoundary();
            }
            this.player.checkKeyStatus();
            this.player.renderPlayer();
            this.checkGameStatus();            
            this.player.updatePlayer();
        }.bind(this), 15)
    }

    reset() {
        clearInterval(this.gameLoop);
        this.$reset.style.display = "inherit";
        if(this.gameWon && this.level<4)
        {
            this.gameWon=false;
            this.$nextButton.style.display="inherit";           
        }
        this.$displayLevel.innerHTML=this.level;
        this.$displayMessage.innerHTML = this.displayMessage;
        let self=this;

        function clearAll()
        {
            //Reseting the player car.
            self.player.$parent.removeChild(self.player.$car);
            delete(self.player);

            //Reseting the map.
            self.mapObject.$mapDivs.forEach(function (element) {
                self.mapObject.$parent.removeChild(element);
            }.bind(self));
            delete(self.mapObject);
            
            //Reseting the moving opponents.
            if(self.level>2)
            {
                self.opponents.forEach(function (element) {
                    element.$parent.removeChild(element.$movingOpponent);
                }.bind(self))
                self.opponents = [];
            }
            self.countDown = 40;
            self.$nextButton.style.display="none";
            self.$reset.style.display = "none";
        };

        //Next level button handler
        this.$nextButton.onclick=function()
        {
            clearAll();
            this.level++;
            this.init();
        }.bind(this);

        //Restart Button handler
        this.$resetButton.onclick = function () {            
            clearAll();  
            this.init();
        }.bind(this);

    }

}