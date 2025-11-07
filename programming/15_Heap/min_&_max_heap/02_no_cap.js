/* ✅ 1. Min Heap WITHOUT fixed capacity */
class MinHeap {
    constructor() {
      this.size = 0;
      this.harr = [];
    }
  
    parent(i) {
      return Math.floor((i - 1) / 2);
    }
    left(i) {
      return 2 * i + 1;
    }
    right(i) {
      return 2 * i + 2;
    }
  
    insertKey(val) {
      let i = this.size;
      this.harr[i] = val;
  
      while (i > 0 && this.harr[this.parent(i)] > this.harr[i]) {
        let p = this.parent(i);
        [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
        i = p; // Move to parent
      }
  
      this.size++;
    }
  
    decreaseKey(i, x) {
      this.harr[i] = x;
  
      while (i > 0 && this.harr[this.parent(i)] > this.harr[i]) {
        let p = this.parent(i);
        [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
        i = p;
      }
    }
  
    deleteKey(i) {
      if (this.size === 0 || i >= this.size) return -1;
  
      this.decreaseKey(i, -Infinity);
      this.extractMin();
    }
  
    extractMin() {
      if (this.size === 0) return -1;
  
      [this.harr[0], this.harr[this.size - 1]] = [
        this.harr[this.size - 1],
        this.harr[0],
      ];
  
      let min = this.harr.pop();
      this.size--;
  
      this.minHeapify(0); // root is violated
  
      return min;
    }
  
    minHeapify(i) {
      while (true) {
        let l = this.left(i);
        let r = this.right(i);
  
        let minIdx = i;
        if (l < this.size && this.harr[l] < this.harr[minIdx]) {
          minIdx = l;
        }
        if (r < this.size && this.harr[r] < this.harr[minIdx]) {
          minIdx = r;
        }
  
        if (minIdx === i) break;
  
        [this.harr[i], this.harr[minIdx]] = [this.harr[minIdx], this.harr[i]];
  
        i = minIdx; // Move to child
      }
    }
}



/* ✅ 2. Max Heap WITHOUT fixed capacity */
class MaxHeap {
constructor() {
    this.size = 0;
    this.harr = []
}

parent(i) {
    return Math.floor((i - 1) / 2);
}
left(i) {
    return 2 * i + 1;
}
right(i) {
    return 2 * i + 2;
}

insertKey(val) {
    let i = this.size;
    this.harr[i] = val;

    while (i > 0 && this.harr[this.parent(i)] < this.harr[i]) {
    // ✅ For Min Heap < is used
    let p = this.parent(i);
    [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
    i = p; // Move to parent
    }

    this.size++;
}

// ✅ For Min Heap we use decreaseKey (Coz decreasing a key violates the min heap property, which helps in deleting the element)
// ✅ For Max Heap we use increaseKey (Coz increasing a key violates the max heap property, which helps in deleting the element)
increaseKey(i, x) {
    this.harr[i] = x;

    while (i > 0 && this.harr[this.parent(i)] < this.harr[i]) {
    // ✅ For Min Heap < is used
    let p = this.parent(i);
    [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
    i = p;
    }
}

deleteKey(i) {
    if (this.size === 0 || i >= this.size) return -1;

    this.increaseKey(i, Infinity); // ✅ For minHeap --> decreaseKey(i, -Infinity)
    this.extractMax();
}

extractMax() {
    if (this.size === 0) return -1;

    [this.harr[0], this.harr[this.size - 1]] = [
    this.harr[this.size - 1],
    this.harr[0],
    ];

    let max = this.harr.pop();
    this.size--;

    this.maxHeapify(0); // root is violated

    return max;
}

maxHeapify(i) {
    while (true) {
    let l = this.left(i);
    let r = this.right(i);

    let maxIdx = i;
    if (l < this.size && this.harr[l] > this.harr[maxIdx]) {
        // ✅ For Min Heap < is used
        maxIdx = l;
    }
    if (r < this.size && this.harr[r] > this.harr[maxIdx]) {
        // ✅ For Min Heap < is used
        maxIdx = r;
    }

    if (maxIdx === i) break;

    [this.harr[i], this.harr[maxIdx]] = [this.harr[maxIdx], this.harr[i]];

    i = maxIdx; // Move to child
    }
}
}