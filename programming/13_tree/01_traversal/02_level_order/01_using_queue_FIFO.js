// Level Order Traversal (or) Breadth First Traversal

// Recursion is not a solution for level order traversal
// because it processes nodes in a single direction completely and then processes the other direction.
// So we can not print nodes in same level at a time with recursion.

// So we need to use "Queue" to print nodes in same level at a time.
class QNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
// Queue implementation using Linked List
class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.len = 0;
  }
  // Adding at rear
  // ✅ TC: O(1)
  enque(x) {
    const newNode = new QNode(x);
    if (this.len === 0) {
      this.rear = this.front = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.len++;
  }

  // Removing front
  // ✅ TC: O(1)
  deque() {
    if (this.len === 0) return null;

    let front = this.front;

    if (this.len === 1) {
      this.rear = this.front = null;
    } else {
      this.front = this.front.next;
    }
    this.len--;

    // Removed value
    return front.data;
  }

  // ✅ TC: O(1)
  getFront() {
    if (!this.front) return null;
    return this.front.data;
  }

  // ✅ TC: O(1)
  getRear() {
    if (!this.rear) return null;
    return this.rear.data;
  }

  // ✅ TC: O(1)
  size() {
    return this.len;
  }

  // ✅ TC: O(1)
  isEmpty() {
    return this.len === 0;
  }
}


// The above part is Linked List implementation of Queue.


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

  // Using Queue --> FIFO (First In First Out)
  // ✅ TC = O(n)
  // ✅ SC = theta(w) or O(n) (w = width of the tree)
  levelorder() {
    if (!this.root) return;

    let q = new Queue(); // Queue stores nodes level by level → O(w) space
    q.enque(this.root);

    while (!q.isEmpty()) {
      let processedNode = q.deque();
      console.log(processedNode.key);
      if (processedNode.left) {
        q.enque(processedNode.left);
      }
      if (processedNode.right) {
        q.enque(processedNode.right);
      }
    }
  }
}

const bTree = new BinaryTree();
bTree.root = new Node(10);
bTree.root.left = new Node(20);
bTree.root.right = new Node(21);
bTree.root.right.left = new Node(30);
bTree.root.right.right = new Node(31);
bTree.root.left.left = new Node(32);
bTree.root.left.right = new Node(33);
bTree.root.left.right.left = new Node(40);
console.log("Level Order Traversal:");
bTree.levelorder();

// Output:
// Level Order Traversal:
// 10
// 20
// 21
// 32
// 33
// 30
// 31
// 40
