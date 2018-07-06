
class MainGame
{
    constructor(props)
    {
        this.$parent=props.$parent;
        this.$mainGame=document.getElementById("mainGame");
    }

    init()
    {
        this.$mainGame.style.display="inherit";
    }
}