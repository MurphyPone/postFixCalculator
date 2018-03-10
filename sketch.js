var root;

function setup() {
  createCanvas(windowWidth, windowHeight);
  var expression = "3 4 +";
  console.log(expression);
  x = new ExpressionTree(expression);
}

function draw() {
  background(51);
  stroke(255);
  fill(255);
  text(x.evalTree(), 30, 30);
}
