// 🕒 TC (Worst/Avg/Best): O(n^2)/O(n^2)/O(n^2)
// 💾 SC: O(1)

class Solution {
  // 🕒 TC: O(n^2) (Worst/Avg/Best)
  // 💾 SC: O(1)
  selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n-1; i++) {
      let min_idx = i;
      for (let j = i+1; j < n; j++) {
        if (arr[j] < arr[min_idx]) {
          min_idx = j
        }
      }

      if(min_idx !== i){
        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]]
      }
    }

    console.log("Selection Sorted Array: ", arr);
  }

  // 🕒 TC: O(n^2) (Worst/Avg/Best)
  // 💾 SC: O(1)
  selectionSortByMax(arr) {
    const n = arr.length;
    for (let i = n - 1; i > 0; i--) {
      let max_idx = 0;
      for (let j = 1; j <= i; j++) {
        if (arr[j] > arr[max_idx]) {
          max_idx = j;
        }
      }
      if (max_idx !== i) {
        [arr[i], arr[max_idx]] = [arr[max_idx], arr[i]];
      }
    }
    console.log("Selection Sorted Array (by Max): ", arr);
  }

  // 🕒 TC: O(n^2) (Worst/Avg/Best)
  // 💾 SC: O(1)
  selectionSortByMax2(arr) {
    const n = arr.length;
    for (let i =0; i < n-1; i++) {
      let max_idx = 0;
      for (let j = 0; j < n - i ; j++) {
        if (arr[j] > arr[max_idx]) {
          max_idx = j;
        }
      }
      if (max_idx !== n-i-1) {
        [arr[n-i-1], arr[max_idx]] = [arr[max_idx], arr[n-i-1]];
      }
    }
    console.log("Selection Sorted Array (by Max): ", arr);
  }
}

export { Solution };

// Usage:
// import { Solution } from './03_selection_sort.js';
const sol = new Solution();
sol.selectionSort([64, 25, 12, 22, 11]); // arr is now sorted
sol.selectionSortByMax([64, 25, 12, 22, 11]); // arr is now sorted