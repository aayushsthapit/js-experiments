class Player {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.leftTopx;
        this.leftTopy;
        this.leftBottomx;
        this.leftBottomy;
        this.rightBottomx;
        this.rightBottomy;
        this.rightTopx;
        this.rightTopy;
        this.speed = props.speed;
        this.mod = props.mod;
        this.angle = props.angle;
        this.delay = props.delay;
        this.move = props.move;
        this.buttonPressed = [false, false, false, false, false]; //[Leftarrow, uparrow, rightarrow, downarrow,spacebar]
        this.$parent = props.$parent;
        this.$car = document.createElement("div");
        this.$car.className = "car";
        this.$parent.appendChild(this.$car);
        let self = this;
        window.addEventListener("keydown", keypress_handler, false);
        window.addEventListener("keyup", keyup_handler, false);

        function keyup_handler(event) {
            if (event.keyCode === Up_ARROW) {
                self.buttonPressed[1] = false;
            }

            if (event.keyCode === DOWN_ARROW) {
                self.buttonPressed[3] = false;
            }

            if (event.keyCode === LEFT_ARROW) {
                self.buttonPressed[0] = false;
            }
            if (event.keyCode == RIGHT_ARROW) {
                self.buttonPressed[2] = false;
            }

            if (event.keyCode === SPACE_BAR) {
                self.buttonPressed[4] = false;
            }
        }

        function keypress_handler(event) {

            if (event.keyCode === Up_ARROW) {
                self.buttonPressed[1] = true;
            }

            if (event.keyCode === DOWN_ARROW) {
                self.buttonPressed[3] = true;
            }

            if (event.keyCode === LEFT_ARROW) {
                self.buttonPressed[0] = true;
            }

            if (event.keyCode == RIGHT_ARROW) {
                self.buttonPressed[2] = true;
            }

            if (event.keyCode === SPACE_BAR) {
                self.buttonPressed[4] = true;
            }
        }
    }

    renderPlayer() {
        var text = this.angle + "deg";
        text = "rotate(" + text + ")";
        this.$car.style.transform = text;
        this.$car.style.left = this.x - (PLAYER_WIDTH / 2) + "px";
        this.$car.style.top = this.y - (PLAYER_HEIGHT / 2) + "px";
    }

    updatePlayer() {
        this.momentumPlayer();
        this.x += (this.speed) * (this.mod) * Math.cos(Math.PI / 180 * this.angle);
        this.y += (this.speed) * (this.mod) * Math.sin(Math.PI / 180 * this.angle);
    }

    //For gradually decreasing the speed of player after the accelerator is released.
    momentumPlayer() {
        if (this.move === -1) {
            this.delay--;
            if (this.delay === 30) {
                this.speed = 1.5;
            }
            if (this.delay === 20) {
                this.speed = 1;
            }
            if (this.delay === 10) {
                this.speed = 0.5;
            }
            if (this.delay === 0) {
                this.speed = 2;
                this.mod = 0;
                this.move = 0;
            }
        }
    }

    getFourCornersCoordinatesBeforeRotation() {
        // Translating all points to origin.
        this.leftTopx = (this.x - (PLAYER_WIDTH / 2)) - this.x;
        this.leftTopy = (this.y - (PLAYER_HEIGHT / 2)) - this.y;
        this.leftBottomx = (this.x - (PLAYER_WIDTH / 2)) - this.x;
        this.leftBottomy = (this.y + (PLAYER_HEIGHT / 2)) - this.y;
        this.rightBottomx = (this.x + (PLAYER_WIDTH / 2)) - this.x;
        this.rightBottomy = (this.y + (PLAYER_HEIGHT / 2)) - this.y;
        this.rightTopx = (this.x + (PLAYER_WIDTH / 2)) - this.x;
        this.rightTopy = (this.y - (PLAYER_HEIGHT / 2)) - this.y;
    }

    getFourCornersCoordinatesAfterRotation(a, b) {
        var rotatedX = a * Math.cos(Math.PI / 180 * this.angle) - b * Math.sin(Math.PI / 180 * this.angle);
        var rotatedY = a * Math.sin(Math.PI / 180 * this.angle) + b * Math.cos(Math.PI / 180 * this.angle);

        // translate back
        let X = rotatedX + this.x;
        let Y = rotatedY + this.y;
        return [X, Y];
    }

    checkKeyStatus() {
        //[Leftarrow, uparrow, rightarrow, downarrow,spacebar]
        if (this.buttonPressed[1] == true) {
            this.speed = 2;
            this.delay = 40;
            this.move = 1;
            this.mod = 1;
        }

        if (this.buttonPressed[3] == true) {
            this.speed = 2;
            this.delay = 40;
            this.move = 1;
            this.mod = -1;
        }

        if (((this.buttonPressed[0] == true) && (this.mod === 1)) || ((this.buttonPressed[2] == true) && (this.mod === -1))) {
            this.angle -= 2;
        }
        
        if (((this.buttonPressed[2] == true) && (this.mod === 1)) || ((this.buttonPressed[0] == true) && (this.mod === -1))) {
            this.angle += 2;
        }

        if (this.buttonPressed[4] == true) {
            this.speed = 0;
            this.delay = 0;
            this.mod = 0;
            this.move = 0;
        }

        if (this.buttonPressed[1] === false || this.buttonPressed[3] === false) {
            this.move = -1;
        }
    }

}