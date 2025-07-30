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

  // ✅ TC = O(n)
  // ✅ SC = theta(w) or O(n)
  // Better than levelorderLineByLine2()
  levelorderLineByLine() {
    if (!this.root) return;

    let q = new Queue();

    q.enque(this.root);

    let ans = "";

    // If size=1 means it is null of last level. So we stop
    while (!q.isEmpty()) {
      // ❌ common mistake : writing i<q.size() instead of i<count
      // because q.size() is changing after each iteration of for loop
      let count = q.size();
      for (let i = 0; i < count; i++) {
        let processedNode = q.deque();

        ans += processedNode.key + " ";

        if (processedNode.left) {
          q.enque(processedNode.left); // q.size() is changing
        }
        if (processedNode.right) {
          q.enque(processedNode.right); // q.size() is changing
        }
      }
      ans += "\n";
    }
    return ans;
  }

  // ✅ TC = O(n+h) = O(n) ==> (O(n) to process all nodes, O(h) to process "null" for all levels)
  // ✅ SC = theta(w) or O(n)
  levelorderLineByLine2() {
    if (!this.root) return;

    let q = new Queue();

    q.enque(this.root);
    q.enque(null);

    let ans = "";

    // If size=1 means it is null of last level. So we stop
    while (q.size() > 1) {
      let processedNode = q.deque();

      if (processedNode === null) {
        ans += "\n"; // adding new line for next level items
        q.enque(null);
        continue;
      }

      ans += processedNode.key + " ";
      if (processedNode.left) {
        q.enque(processedNode.left);
      }
      if (processedNode.right) {
        q.enque(processedNode.right);
      }
    }
    return ans;
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
console.log("Level Order Traversal Method 1:");
console.log(bTree.levelorderLineByLine().trim());
console.log("Level Order Traversal Method 2:");
console.log(bTree.levelorderLineByLine2().trim());

// Output:
// Level Order Traversal:
// 10
// 20 21
// 32 33 30 31
// 40
