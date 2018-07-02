var $body = document.getElementsByTagName("body")[0];

function Container(props) {
  this.height = props.height;
  this.width = props.width;
  this.$parent = props.$parent;
  this.$elem = document.createElement("div");
  this.boxes = [];

  var self = this;

  this.plot = function() {
    self.$elem.className = "container";
    self.$elem.style.height = self.height + "px";
    self.$elem.style.width = self.width + "px";
    self.$parent.appendChild(self.$elem);
  };

  this.addBox = function(box) {
    this.boxes.push(box);
  };
}

function Box(props) {
  this.x = props.x;
  this.y = props.y;
  this.dx = props.dx;
  this.dy = props.dy;
  this.size = props.size;
  this.speed = props.speed;
  this.container = props.container;
  this.backgroundColor = props.backgroundColor;
  this.$elem = document.createElement("div");

  var self = this;

  var updateElement = function() {
    self.$elem.style.top = self.y + "px";
    self.$elem.style.left = self.x + "px";
  };

  this.plot = function() {
    self.$elem.className = "box";
    self.$elem.style.height = self.size + "px";
    self.$elem.style.width = self.size + "px";
    self.$elem.style.backgroundColor = self.backgroundColor;
    self.container.$elem.appendChild(self.$elem);
    updateElement();
  };

  this.incrementPosition = function() {
    self.x += self.dx * self.speed;
    self.y += self.dy * self.speed;
  };
  this.updateElement = function() {
    updateElement();
  };

  this.reversePosition = function() {
    self.dx *= -1;
    self.dy *= -1;
  };

  this.checkCollision = function(box2) {
    var b1Left = this.x;
    var b1Right = this.x + this.size;
    var b1Top = this.y;
    var b1Bottom = this.y + this.size;

    var b2Left = box2.x;
    var b2Right = box2.x + this.size;
    var b2Top = box2.y;
    var b2Bottom = box2.y + this.size;

    //right edge of 1 > left edge of 2
    //left edge of 1 < right edge of 2
    //bottom edge of 1 > top edge of 2
    //top edge of 1 < bottom edge of 2
    return (
      b1Right > b2Left &&
      b1Left < b2Right &&
      b1Bottom > b2Top &&
      b1Top < b2Bottom
    );
  };
}

var container = new Container({
  height: 500,
  width: 500,
  $parent: $body
});
container.plot();

var box1 = new Box({
  x: 0,
  y: 10,
  size: 50,
  dx: 1,
  dy: 0,
  speed: 10,
  container: container,
  backgroundColor: "blue"
});
container.addBox(box1);
box1.plot();

var box2 = new Box({
  x: 500,
  y: 10,
  size: 50,
  dx: -1,
  dy: 0,
  speed: 10,
  container: container,
  backgroundColor: "red"
});
container.addBox(box2);
box2.plot();

setInterval(function() {
  container.boxes.forEach(box => {
    box.incrementPosition();
    box.updateElement();
  });

  if (box1.checkCollision(box2)) {
    console.log("BOOM");

    box1.reversePosition();
    box2.reversePosition();
  }
}, 100);

console.log(box1);

// 1. Instance variable
// 2. Constructor
// 3. Instance method
// 4. Public method
// 5. Private method
// 6. Class variable
// 7. Class method
// 8. Association