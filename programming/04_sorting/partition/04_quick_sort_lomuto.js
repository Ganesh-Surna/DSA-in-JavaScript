// Quick Sort (using Lomuto Partition)
// ✅ TC (Worst/Avg/Best): O(n^2)/O(n log n)/O(n log n)
// ✅ SC: O(log n) (due to recursion stack, in-place)
// ❌ Not stable
//
// Main Steps:
// 1. Choose a pivot (here, last element using Lomuto partition).
// 2. Partition the array around the pivot so that elements < pivot are left, >= pivot are right.
// 3. Recursively apply quick sort to left and right subarrays.

class Solution {
  quickSort(arr, l = 0, h = arr.length - 1) {
    if (l < h) {
      const p = this.lomutoPartition(arr, l, h);
      this.quickSort(arr, l, p - 1); // partition left to p (p excludes)
      this.quickSort(arr, p + 1, h); // partition right to p (p excludes)
    }
  }

  lomutoPartition(arr, l, h) {
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
}

// Usage Example:
const sol = new Solution();
let arr = [10, 7, 8, 9, 1, 5];
sol.quickSort(arr, 0, arr.length - 1);
console.log(arr); // Output: [1, 5, 7, 8, 9, 10]
