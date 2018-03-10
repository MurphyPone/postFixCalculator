class TreeNode {
  constructor(v, l, r) {
		if(v && l && r) {
	    this.value = v;
			this.left = l;
	    this.right = r;
		} else {
			this.value = v;
			this.left = null;
			this.right = null;
		}
  }

	getLeft() { return this.left; }
	getRight() { return this.right; }
	getValue() { return this.value; }

	setLeft(l) { this.left = l; }
	setRight(r) { this.right = r; }
	setValue(v) { this.value = v; }

	fix(v, l, r) {
		this.value = v;
		this.left = l;
		this.right = r;
	}

}
