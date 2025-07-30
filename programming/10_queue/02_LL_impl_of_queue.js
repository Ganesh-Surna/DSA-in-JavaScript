class Node {
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
    const newNode = new Node(x);
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

const q = new Queue();
q.enque(1);
console.log("Size: ", q.size());
console.log("is Empty? ", q.isEmpty());
console.log("Front: ", q.getFront());
console.log("Rear: ", q.getRear());
console.log("Deque: ", q.deque());
console.log("Size: ", q.size());
console.log("Front: ", q.getFront());
console.log("Rear: ", q.getRear());



// **** No size property: *****
class MyQueue {
  constructor() {
    this.front = null; // QueueNode
    this.rear = null; // QueueNode
  }

  /**
   * @param {number} x
   */
  // Function to push an element into the queue.
  push(x) {
    // code here
    const newNode = new Node(x);
    if (!this.rear) {
      // !this.front also works
      // If queue is empty, set front and rear to new node
      this.front = this.rear = newNode;
    } else {
      // If queue is not empty, add new node to rear and update rear
      this.rear.next = newNode;
      this.rear = newNode;
    }
  }

  /**
   * @returns {number}
   */
  // Function to pop front element from the queue.
  pop() {
    // If queue is empty, return -1
    if (!this.front) return -1; // !this.rear also works
    let front = this.front;

    if (this.front === this.rear) {
      // If queue has only one node, set front and rear to null
      this.front = this.rear = null;
    } else {
      // If queue has more than one node, move front to next node
      this.front = this.front.next;
    }

    return front.data;
  }
}


// Checks needed for enque:
// 1. If queue is empty, set front and rear to new node
// 2. If queue is not empty, add new node to rear and update rear

// Checks needed for deque:
// 1. If queue is empty, return -1
// 2. If queue has "only 1 node", set front and rear to null
// 3. If queue has more than 1 node, move front to next node & return front.data