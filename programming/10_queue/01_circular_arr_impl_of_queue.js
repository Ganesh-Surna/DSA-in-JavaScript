class Queue {
  constructor(cap) {
    this.cap = cap;
    this.arr = new Array(cap);
    this.front = 0;
    this.sz = 0;
  }
  // Adding at rear
  enque(x) {
    if (this.sz === this.cap) {
      return;
    }
    let r = this.front + this.sz - 1; // current rear index
    r = (r + 1) % this.cap; // new rear index (circular)
    // Or directly write r = (this.front + this.sz) % this.cap; // new rear index (circular) ✅
    this.arr[r] = x;
    this.sz++;
  }

  // Removing front
  deque() {
    if (this.sz === 0) return null;

    let front = this.arr[this.front]; // current front element

    this.front = (this.front + 1) % this.cap; // move front to next element (circular)

    this.sz--;

    // Removed value (not removed in fact, just changed front point)
    return front;
  }
  getFront() {
    if (this.sz === 0) return null;
    return this.arr[this.front]; // current front element
  }
  getRear() {
    if (this.sz === 0) return null;
    const r = (this.front + this.sz - 1) % this.cap; // current rear index(circular) ✅
    return this.arr[r];
  }
  size() {
    return this.sz;
  }
  isEmpty() {
    return this.sz === 0;
  }
}

// Capacity must be given
const q = new Queue(4);
q.enque(1);
q.enque(2);
console.log("Size: ", q.size());
console.log("is Empty? ", q.isEmpty());
console.log("Front: ", q.getFront());
console.log("Rear: ", q.getRear());
console.log("Deque: ", q.deque());
console.log("Size: ", q.size());
console.log("Front: ", q.getFront());
console.log("Rear: ", q.getRear());

// Difference between circular array and Linked List implementation of queue:
// 1. Memory Allocation:
//      Circular Array:  Fixed size (requires pre-allocation)(Fixed-Size Queue)
//      LL: (Dynamic Queue)
// 2. Space Efficiency
//      Cicular Array : (Wastes space if underutilized)
//      LL : No wasted space (allocates per node)
// 3. Overflow Handling:
//      Circular Array : Needs resizing (costly)
//      LL : No overflow (unless heap exhausted)
// 4. Cache Performance:
//      Circular Array : Better (contiguous memory)
//      LL : Worse (scattered memory)
// 5. Implementation Complexity:
//      Circular Array : Requires modulo arithmetic for circular logic
//      LL : Simpler (just pointer updates)
// 6. Best Use Case:
//      Circular Array : When max size is known & memory is tight
//      LL : When size is unpredictable
