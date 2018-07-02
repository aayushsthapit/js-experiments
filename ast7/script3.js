var $container = document.getElementById("container");

function Box(props) {
  this.x = props.x;
  this.y = props.y;
  this.$parent = props.$parent;
  this.height =
    (Box.MAX_HEIGHT > props.height ? Box.MAX_HEIGHT : props.h) || 50;
  this.width = props.width || 50;
  this.dx = props.dx || 1;
  this.dy = props.dy || 1;

  var self = this;

  this.$elem = document.createElement("div");

  var plotPosition = function() {
    console.log("PLOTPOSITION IS CALLED:");
    console.log(self, self.$elem);
    self.$elem.style.top = self.y + "px";
    self.$elem.style.left = self.x + "px";
  };

  this.init = function() {
    console.log("INIT IS CALLED", this);
    this.$elem.className = "box";
    this.$elem.width = this.width;
    this.$elem.height = this.height;
    plotPosition();
    this.$parent.appendChild(this.$elem);
  };

  this.plot = function() {
    console.log("PLOT IS CALLED:");
    plotPosition();
  };

  this.updatePosition = function() {
    this.x += this.dx;
    this.y += this.dy;
  };
}
Box.MAX_HEIGHT = 200;
Box.someClassFunction = function() {
  alert("BOOM");
};

var box1 = new Box({
  x: 10,
  y: 20,
  $parent: $container
});
box1.init();
console.log(box1);

var box2 = new Box({
  x: 500,
  y: 100,
  height: 500,
  width: 100,
  $parent: $container
});
box2.init();

// setInterval(function() {
//   box1.updatePosition();
//   box1.plot();
//   box2.updatePosition();
//   box2.plot();
// }, 100);

console.log(box2);