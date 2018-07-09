let $mainWrapper = document.getElementById("mainWrapper");
let PLAYER_HEIGHT = 42;
let PLAYER_WIDTH = 90;
const TILE_WIDTH = 100;
const TILE_HEIGHT = 100;
const GAP_CARS_SIDE = 30;
const GAP_CARS_TOPDOWN = 10;
const Up_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const LEFT_ARROW = 37;
const SPACE_BAR = 32;
const BOUNDARY_LEFT = 0;
const BOUNDARY_RIGHT = 800;
const BOUNDARY_TOP = 0;
const BOUNDARY_BOTTOM = 600;
const MOVING_OPPONENT_WIDTH = 81;
const MOVING_OPPONENT_HEIGHT = 100;



class MainContainer {
    constructor(props) {
        this.$mainMenu = document.getElementById("mainMenu");
        this.$parent = props.$parent;
    }

    init() {
        this.$mainMenu.style.display = 'inherit';
        let self = this;
        this.$mainMenu.onclick = function () {
            let $mainGame = new MainGame({
                $parent: this.$parent,
                $mainMenu: this.$mainMenu
            });
            $mainGame.init();
        }.bind(this);
    }

}


let game = new MainContainer({
    $parent: $mainWrapper
});
game.init();