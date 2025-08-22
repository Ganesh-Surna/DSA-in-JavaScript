// ✅ TC = O(n)
// ✅ SC = O(1)
function buildHeap(arr) {
  let n = arr.length;

  let last_idx = n - 1;
  // index of Parent of last node
  let i = Math.floor((last_idx - 1) / 2);
  while (i >= 0) {
    maxHeapify(arr, n, i);
    i--;
  }
}
function maxHeapify(arr, size, i) {
  let n = size; // (that is shrinking from right, not the whole length of arr in case of Heap Sort)

  // left & right indeces
  let l = 2 * i + 1,
    r = 2 * i + 2;

  let max_idx = i;
  if (l < n && arr[l] > arr[max_idx]) {
    max_idx = l;
  }
  if (r < n && arr[r] > arr[max_idx]) {
    max_idx = r;
  }

  if (max_idx !== i) {
    [arr[max_idx], arr[i]] = [arr[i], arr[max_idx]];
    this.maxHeapify(max_idx, arr);
  }
}
function maxHeapifyIterative(arr, size, i) {
  while (true) {
    let l = this.left(i), r = this.right(i);
    let max_idx = i;
    if (l < size && arr[l] > arr[max_idx]) max_idx = l;
    if (r < size && arr[r] > arr[max_idx]) max_idx = r;
    if (max_idx === i) break;
    [arr[i], arr[max_idx]] = [arr[max_idx], arr[i]];
    i = max_idx; // Move to the child
  }
}
// ✅ TC = O(nlogn)
function heapSort(arr) {
  let n = arr.length;

  // Step1: Build Max Heap
  buildHeap(arr);

  // Step2: Swap first & last nodes & maxHeapify the arr excluding the last node. (The last node shrinks each time)

  // TC = O(nlogn) ---> O(n) * O(logn)
  for (let i = n - 1; i > 0; i--) {
    [arr[i], arr[0]] = [arr[0], arr[i]];

    // i is the size of arr to be considered while it is shrinking from right
    // only the root is voilating after above swap, so maxHeapify at index "0"
    // TC = O(logn)
    maxHeapify(arr, i, 0);
  }
}

class Solution {
  // Function to sort an array using Heap Sort.
  left(i) {
    return 2 * i + 1;
  }
  right(i) {
    return 2 * i + 2;
  }
  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  // ✅ TC = O(n)
  buildHeap(arr) {
    let n = arr.length;

    // index of parent of lastmost node (index of lastmost internal node)
    // (i.e., leaf nodes are already considered to be maxHeapified)
    let last_idx = this.parent(n - 1);
    for (let i = last_idx; i >= 0; i--) {
      this.maxHeapify(arr, n, i);
    }
  }

  // ✅ TC = O(logn)
  maxHeapify(arr, size, i) {
    let l = this.left(i),
      r = this.right(i);
    let max_idx = i;
    if (l < size && arr[l] > arr[max_idx]) {
      max_idx = l;
    }
    if (r < size && arr[r] > arr[max_idx]) {
      max_idx = r;
    }

    if (max_idx !== i) {
      [arr[i], arr[max_idx]] = [arr[max_idx], arr[i]];
      this.maxHeapify(arr, size, max_idx);
    }
  }

  maxHeapifyIterative(arr, size, i) {
    while (true) {
      let l = this.left(i), r = this.right(i);
      let max_idx = i;
      if (l < size && arr[l] > arr[max_idx]) max_idx = l;
      if (r < size && arr[r] > arr[max_idx]) max_idx = r;
      if (max_idx === i) break;
      [arr[i], arr[max_idx]] = [arr[max_idx], arr[i]];
      i = max_idx; // Move to the child
    }
  }

  // ✅ TC = O(nlogn)
  // ✅ SC = O(1)
  heapSort(arr) {
    let n = arr.length;

    // Step 1: Build maxHeap
    this.buildHeap(arr);
    // Step 2: While shrinking the heap from right
    // i. swap root with last el (in shrinked heap)
    // ii. maxHeapify the root (only node violating Heap),
    //     but the heapSize is shrinked heap size
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      this.maxHeapify(arr, i, 0); // the heap size is i, means the last el's index will be i-1
    }
  }
}

// Its TC is better SC=O(1) (maxHeapify can be write as iterative)
// But Merge Sort & Quick sort works much faster in practice
