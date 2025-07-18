// 🕒 TC (Worst/Avg/Best): O(n^2)/O(n^2)/O(n)
// 💾 SC: O(1)

class Solution {
  // 🕒 TC: O(n^2) (Worst/Avg), O(n) (Best, already sorted)
  // 💾 SC: O(1)
  insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      const key = arr[i];

      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      if (j !== i - 1) {
        // j is the last index where (a[j]>key) & moved to next index by creating space at its original index
        //  then j-- happened
        // so j+1 is the created space for the "key" to sit there
        arr[j + 1] = key;
      }
    }
    console.log("Insertion Sorted Array: ", arr);
  }
}

export { Solution };

// Usage:
// import { Solution } from './04_insertion_sort.js';
const sol = new Solution();
sol.insertionSort([12, 11, 13, 5, 6]); // arr is now sorted
