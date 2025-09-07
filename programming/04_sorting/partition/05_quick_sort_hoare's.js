// Quick Sort (using Hoare's Partition)
// ✅ TC (Worst/Avg/Best): O(n^2)/O(n log n)/O(n log n)
// ✅ SC: O(log n) (due to recursion stack, in-place)
// ❌ Not stable
//
// ✅ Main Steps:
// 1. Choose a pivot (here, first element using Hoare's partition).
// 2. Partition the array around the pivot so that elements <= pivot are left, >= pivot are right (pivot not fixed).
// 3. Recursively apply quick sort to left and right subarrays.
class Solution {
  quickSort(arr, l = 0, h = arr.length - 1) {
    if (l < h) {
      const p = this.hoaresPartition(arr, l, h);
      // in lomuto partition we exclude p (because pivot fixed at crct position and p is the pivot)
      this.quickSort(arr, l, p ); // partition upto p (p included) (because pivot is not fixed at its correct position, and p is not pivot. p is the index around which the partition happens)
      this.quickSort(arr, p + 1, h); // partition right to p (p excludes)
    }
  }

  hoaresPartition(arr, l, h) {
    let pivot = arr[l];
    let i = l - 1;
    let j = h + 1;

    while (true) {
      // Do not use <= OR >= (results in never ending loop)
      do {i++} while (arr[i] < pivot); // Means stop when arr[i] >= pivot
      do {j--} while (arr[j] > pivot); // Means stop when arr[j] <= pivot

      // We are returning j . That is the index around which the partitions happens,
      // such that elements left to it (starting from it) are <= pivot.
      // And elements right to it are >= pivot.
      // NOTE: the pivot element will not be fixed at its correct position
      if (i >= j) return j;

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
}

// Usage Example:
const sol = new Solution();
let arr = [10, 7, 8, 9, 1, 5];
sol.quickSort(arr, 0, arr.length - 1);
console.log(arr); // [ 1, 5, 7, 8, 9, 10 ]