// Using 2 stacks to implement a queue
class Queue {
  constructor() {
    this.s1 = [];
    this.s2 = [];
  }

  // ✅ TC: O(n)
  enqueue(x) {
    // Move all elements from s1 to s2
    while (this.s1.length) {
      this.s2.push(this.s1.pop());
    }

    // Push item into s1
    this.s1.push(x);

    // Push everything back to s1
    while (this.s2.length) {
      this.s1.push(this.s2.pop());
    }
  }

  // Dequeue an item from the queue
  // ✅ TC: O(1)
  dequeue() {
    // if first stack is empty
    if (this.s1.length === 0) {
      return -1;
    }

    // Return top of s1
    let x = this.s1.pop();
    return x;
  }
}

function main() {
  let q = new Queue();
  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);

  console.log(q.dequeue());
  console.log(q.dequeue());
  console.log(q.dequeue());
}

main();
