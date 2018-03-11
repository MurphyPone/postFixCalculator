var root; //The Tree
var inputField, outputText, evalBtn, prefixBtn, infixBtn, postfixBtn, aboutBtn, testBtn;  //IO components
var expression, content;

function setup() {
  var canvas = createCanvas(1000, 600);
  canvas.parent('sketch-holder');

  expression = ["3", "4", "+", "8", "9", "-", "/" ]; // = -1 * 17 = -17
  console.log("The expression is: " + expression);

  root = new ExpressionTree(expression);
  console.log(root);
  content = root.toInfixNotation()

  // Grabbing stuff from html //

  //get input
  inputField = document.getElementsByName('input-field')[0]; //returns a collection of all elements sharing name
  inputField.value = root.toPostfixNotation();
  //get output
  outputText = document.getElementById('output-field'); //returns the item
  outputText.innerHTML = root.toPostfixNotation();

  //eval button
  evalBtn = document.getElementsByName('eval-button')[0];
  evalBtn.addEventListener("click", TreeFromInput);

  //toPrefix button
  prefixBtn = document.getElementsByName('toPrefix')[0];

  //toInfix button
  infixBtn = document.getElementsByName('toInfix')[0]; //MAKE THE BUTTONS LOOK CLEANER

  //toPostfix button
  postfixBtn = document.getElementsByName('toPostfix')[0]; //MAKE THE BUTTONS LOOK CLEANER

  //about button
  aboutBtn = document.getElementsByName('about')[0]; //MAKE THE BUTTONS LOOK CLEANER
}

function draw() {
  background(51);
  stroke(255);
  fill(255);
  textSize(20);
  if( !isNaN(root.eval) ) {
    text(content + " = " + root.eval, 30, 30);
    push()
      translate(500, 60);
      drawNode(root, 1);
    pop();
  }
}

//Button handling//
function TreeFromInput() {
  var raw = inputField.value  //all one string
  expression = raw.trim().split(" ");
  root = new ExpressionTree(expression);
  content = root.toPostfixNotation();
}

function displayPrefix() {
  var v = root.toPrefixNotation();
  content =root.toPrefixNotation();
  outputText.innerHTML = v;
}

function displayInfix() {
  var v = root.toInfixNotation();
  content = root.toInfixNotation();
  outputText.innerHTML = v;
}

function displayPostfix() {
  var v = root.toPostfixNotation();
  content = root.toPostfixNotation();
  outputText.innerHTML = v;
}

function redirect() {
  var win = window.open("http://hackbi.org/meetTheTeam", '_blank');
  win.focus();
}

//draw the tree
function drawNode(rt, layer, right) {
  if(rt != null ) {
    //setup
    var spread = PI/5;
    var radius = 2 * 20.0 / layer * 1.2;
    translate(0, radius);
    fill(255);

    //Correct rotation
    if(right === true) {
      rotate(-1.75 * spread/(layer - 1) );
    } else if(right === false) {
      rotate(1.75 * spread/(layer - 1) );
    }

    //adjust bubbles
    var xOff = -10 * 2/layer;
    var yOff = radius/layer;
    var val = rt.value;

    if(rt.value == "*") {
      yOff = radius/layer
    } else if( rt.value == "/" ) {
      yOff = 23/layer;
      xOff = -25/layer;
      val = "÷";
    } else if( rt.value == "-" ) {
    } else if( rt.value == "+" ) {
    } else if( !isNaN(rt.value) ) {  //Is a number
      yOff = 10;
    } else {
      yOff = 5;
    }

    //Draw circle/value
    textSize(2 * 40/layer);
    text(val, xOff, yOff);
    noFill();
    strokeWeight(3);
    ellipse(0, 0, radius*2, radius*2);
    strokeWeight(1);

    //Draw lines
    if(rt.hasChildren()) {
      push();
      rotate(1.75 * spread/layer);
        line(0, radius, 0, 100/(layer * .8) );
        translate(0, 100/(layer * .8)  );
        drawNode(rt.getRight(), layer + 1, true);
      pop();

      push();
        rotate(-1.75 * spread/layer);
        line(0, radius, 0, 100/(layer * .8) );
        translate(0, 100/(layer * .8)  );
        drawNode(rt.getLeft(), layer + 1, false);
      pop();
    }
  }
}
