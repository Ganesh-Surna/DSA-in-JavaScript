class MinHeap {
  constructor(arr) {
    if (arr === undefined) {
      this.arr = [];
    } else {
      this.arr = [...arr];
      let n = this.arr.length;
      // index of bottom rightmost internal node = parent of bottom lastmost leaf node
      let i = this.parent(n - 1);
      while (i >= 0) {
        this.minHeapify(i);
        i--;
      }
    }
  }

  // ✅ TC = O(logn)
  // ✅ SC = O(logn)
  minHeapify(i) {
    let arr = this.arr,
      n = this.arr.length;
    let l = this.left(i),
      r = this.right(i);

    // Find min among root, its left & right
    let min_idx = i;
    if (l < n && arr[l] < arr[min_idx]) {
      min_idx = l;
    }
    // not else if (it should check even after above if)
    if (r < n && arr[r] < arr[min_idx]) {
      min_idx = r;
    }

    // if min is one of its child, need to be swapped & minHeapify that child subtree
    if (min_idx !== i) {
      [arr[min_idx], arr[i]] = [arr[i], arr[min_idx]];

      this.minHeapify(min_idx);
    }
  }
  left(i) {
    return 2 * i + 1;
  }
  right(i) {
    return 2 * i + 2;
  }
  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  // ✅ TC = O(logn)
  // ✅ SC = O(logn)
  extractMin() {
    let arr = this.arr,
      n = this.arr.length;

    if (n === 0) return null;
    
    //Step1: Swap min(first(i.e., root)) with lastmost node
    [arr[0], arr[n - 1]] = [arr[n - 1], arr[0]];

    //Step2: Remove lastmost node that is min after above swap
    let min = arr.pop();

    // Step3: minHeapify the first(i.e., root) to maintain minHeap properties
    this.minHeapify(0);

    return min;
  }
  extractMinAnotherWay() {
    let arr = this.arr,
      n = this.arr.length;

    if (n === 0) return null;
    //Step1: Swap min(first(i.e., root)) with lastmost node
    let min = arr[0];
    arr[0] = arr[n - 1];

    //Step2: Remove lastmost node
    arr.pop();

    // Step3: minHeapify the first(i.e., root) to maintain minHeap properties
    this.minHeapify(0);

    return min;
  }

  // ✅ TC = O(logn) // while loop goes upto logn height
  // ✅ SC = O(1)
  decreaseKey(i, x) {
    let arr = this.arr;
    arr[i] = x;

    // i>0 (Not i>=0) because no parent for i=0
    while (i > 0 && arr[this.parent(i)] > arr[i]) {
      let p = this.parent(i);
      [arr[i], arr[p]] = [arr[p], arr[i]];
      i = p;
    }
  }

  // ✅ TC = O(logn)  ---> O(logn) + O(logn)
  // ✅ SC = O(logn)
  deleteKey(i) {
    if (i >= this.arr.length) return;
    this.decreaseKey(i, -Infinity);
    this.extractMin();
  }
}

let arr = [10, 5, 20, 2, 4, 8];
const minH = new MinHeap(arr);
console.log(minH.arr);
console.log("Extract Min: ", minH.extractMin());
console.log(minH.arr);
