var root;
var eval;  //evalTree result

function setup() {
  createCanvas(windowWidth, windowHeight);
  var expression = ["3", "4", "-"];
  console.log("The expression is: " + expression);
  x = new ExpressionTree(expression);
  console.log("x: ");
  console.log(x);
  eval = x.evalTree();
}

function draw() {
  background(51);
  stroke(255);
  fill(255);
  text(eval, 30, 30);
}
