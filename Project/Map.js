class Map {
    constructor(props) {
        this.rows = props.rows;
        this.cols = props.cols;
        this.startTileRow = props.startTileRow;
        this.startTileCol = props.startTileCol;
        this.finishTileRow = props.finishTileRow;
        this.finishTileCol = props.finishTileCol;
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
                if (tileindex != 0) {
                    let $map = document.createElement("div");
                    $map.className = "map";
                    this.$mapDivs.push($map);
                    this.$parent.appendChild($map);
                    $map.style.backgroundImage = "url('images/" + tileindex + ".png')";
                }
            }
        }
    }
}