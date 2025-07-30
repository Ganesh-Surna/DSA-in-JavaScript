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
    nodesAtDistanceK(node = this.root, k) {
      if (!node) {
        return;
      }
      if (k === 0) {
        console.log(node.key);
      }
  
      this.nodesAtDistanceK(node.left, k - 1);
      this.nodesAtDistanceK(node.right, k - 1);
    }
  }
  
  const bTree = new BinaryTree();
  bTree.root = new Node(10);
  bTree.root.left = new Node(20);
  bTree.root.right = new Node(30);
  bTree.root.right.left = new Node(40);
  bTree.root.right.right = new Node(50);
  console.log("Nodes at K distance from root:");
  bTree.nodesAtDistanceK(bTree.root, 2);
  