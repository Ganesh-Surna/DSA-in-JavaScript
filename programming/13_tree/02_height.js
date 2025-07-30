class Node {
  constructor(data) {
    this.key = data; // or this.data
    this.left = null;
    this.right = null;
  }
}
class BinaryTree {
  constructor() {
    this.root = null;
  }
  // ✅ TC = O(n), ✅ SC = O(h)
  height(node = this.root) {
    if (!node) {
      return 0; // return -1 for edges count convention
    }

    return Math.max(this.height(node.left), this.height(node.right)) + 1;
    // let leftH = 0, rightH = 0
    // leftH = this.height(node.left)
    // rightH = this.height(node.right)

    // return Math.max(leftH, rightH) + 1
  }
}

const bTree = new BinaryTree();
bTree.root = new Node(10);
bTree.root.left = new Node(20);
bTree.root.right = new Node(30);
bTree.root.right.left = new Node(40);
bTree.root.right.right = new Node(50);
console.log("Height: ", bTree.height()); // Output: 3
