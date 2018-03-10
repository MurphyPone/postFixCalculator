class ExpressionTree extends TreeNode {
  constructor(expression) {
    super("");  //super TreeNode constructor
    var temp = this.buildTree(expression);	//Temp TreeNode
		this.fix(temp.getValue(), temp.getLeft(), temp.getRight());	//Circumvent casting issues
  }

  //buildTree method
  buildTree(ex) { //expression is a string of numbers/operators
		var unprocessed = []; //stack

		for(var i = 0; i < ex.length; i++) {
			var current = ex[i].trim();	//cut down on O(n) iterations

      //if current is a number
			if( this.isOperand(current) ) {  //Leave as String here for convenient evaluation
				unprocessed.push(new TreeNode(current) );	//Create it as a TreeNode when you push

      } else if( this.isOperator(current) ) {
				var right = new TreeNode( unprocessed.pop() );
        var left = new TreeNode( unprocessed.pop() );
				//creates a sub-tree with operator as root and last 2 operands as the left and right sub-nodes
				var root = new TreeNode(current, left, right);

				unprocessed.push(root); //replace last 2 operands with a reference to the tree node that has them as leaves
        console.log(unprocessed);
			}
		}
		return unprocessed.pop();	//push that mini expression back onto the stack
	}

  //recursive method evalTrees
	evalTree() {
		return this.evalTreeHelper(this);	//pass in self as the root for the first pass
	}

	//recursive helper //TODO this is broken
	evalTreeHelper(root) {
		if (this.isOperator(root.getValue() ) ) {
			var op1 = this.evalTreeHelper( root.getLeft() );
			var op2 = this.evalTreeHelper( root.getRight() );

			if(root.getValue() == "+" ) {
				return op1 + op2;
      }

      if(root.getValue() == "-" ) {
				return op1 * op2;
      }

      if(root.getValue() == "*" ) {
				return op1 - op2;
      }

      if(root.getValue() == "/" ) {
				if(op2 != 0) {
          return op1 / op2;
			  } else { return 0; } //~infinity
			}

		} else {  //operands have no children in ExpressionTrees, so just return the value of the node
			return root.getValue(); //cast to int after parsing the string?
    }
	}

  //HELPER METHODS //

  //Accepts a string and determines if it is a number
  isOperand(num) {
    return !isNaN(num);
  }

  //Accepts a string and determines if it is an operator
  isOperator(op) {
    if( isNaN(op) ) { //If it is not a number
      if( op == "+" || op == "-" || op == "*" || op == "/") { //and is one of the defined operators  //TODO add more operators
        return true;
      } else { return false; }  //not a defined operator
    } else { return false; }  //is a number
  }
}
