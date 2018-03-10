var root;
var eval;  //evalTree result
var input;

function setup() {
  createCanvas(windowWidth, windowHeight);
  var expression = ["3", "4", "-", "8", "9", "+", "*" ];
  console.log("The expression is: " + expression);
  x = new ExpressionTree(expression);
  console.log("x: ");
  console.log(x);
  eval = x.evalTree();

  //Create input field
  input = input("enter a postfix expression");
}

function draw() {
  background(51);
  stroke(255);
  fill(255);
  text(eval, 30, 30);
  input();
}
