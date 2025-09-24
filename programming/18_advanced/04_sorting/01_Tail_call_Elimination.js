/* ✅ Tail Call Elimination (TCE) in QuickSort is an optimization technique that
  1. reduces the worst-case recursion depth from O(n) to O(log n) (...since we always recurse on the smaller partition).
  2. Prevents stack overflow for large arrays.
  3. Average and best-case time remains O(n log n).
  4. Worst-case time remains O(n²), but stack depth is improved.
  5. Auxiliary space reduces from O(n) (for recursion stack) to O(log n).
  6. The improvement is primarily in space (stack depth), not time.
  */

function quickSortTCEOptimization(arr, l = 0, h = arr.length - 1) {
    while (l < h) {

      // Partition 
      const p = lomutoPartition(arr, l, h);

      // If left partition is smaller, then recurse on left partition
      // otherwise recurse on right partition
      if(p-l < h-p){ // diff of indexes (if p-l < h-p --> left part is smaller size)
        quickSortTCEOptimization(arr, l, p-1 ); // recurse on left partition(smaller side)
        l = p + 1; // Eleminate Tail call for right partition(larger side)
      }else{
        quickSortTCEOptimization(arr, p + 1, h); // recurse on right partition(smaller side)
        h = p-1; // Eleminate Tail call for left partition(larger side)
      }
    }
  }

  function lomutoPartition(arr, l, h) {
    let pivot = arr[h];
    let i = l - 1;

    // (we are not going to pivot element. We are just going just before that element only)
    for (let j = l; j < h; j++) {
      if (arr[j] < pivot) {
        i = i + 1; // increment i before swap
        [arr[i], arr[j]] = [arr[j], arr[i]];
      } else {
        // if arr[j]>=pivot
        continue;
      }
    }

    // Fix pivot element at its correct position
    [arr[i + 1], arr[h]] = [arr[h], arr[i + 1]];

    // return pivot index
    return i + 1;
  }