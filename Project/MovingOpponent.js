class MovingOpponent {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.dx = props.dx;
        this.$parent = props.$parent;
        this.$movingOpponent = document.createElement('div');
    }

    init() {
        this.$movingOpponent.className = 'opponents';
        this.$parent.appendChild(this.$movingOpponent);
    }

    renderOpponent() {
        if(this.dx===-1)
        {
            this.$movingOpponent.style.background="url('images/movingopponent-left.png')";
        }
        if(this.dx===1)
        {
            this.$movingOpponent.style.background="url('images/movingopponent-right.png')";
        }
        this.$movingOpponent.style.left = this.x + 'px';
        this.$movingOpponent.style.top = this.y + 'px';
    }

    updateOpponent() {
        this.x = this.x + this.dx;          
    }
}