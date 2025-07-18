// 🕒 TC (Worst/Avg/Best): O(n^2)/O(n^2)/O(n) for bubbleSortOptimized, O(n^2) for bubbleSort
// 💾 SC: O(1) for both

class Solution {
  // 🕒 TC: O(n^2) (Worst/Avg), O(n) (Best, if already sorted)
  // 💾 SC: O(1)
  bubbleSortOptimized(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      // if not swapped at least once in a iteration means it's sorted before that iteration only
      let isSwapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          isSwapped = true;
        }
      }

      if (!isSwapped) break;
    }

    console.log("Optimized Bubble Sorted Array: ", arr);
  }

  // 🕒 TC: O(n^2) (Worst/Avg/Best)
  // 💾 SC: O(1)
  bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }

    console.log("Bubble Sorted Array: ", arr);
  }
}

export { Solution };

// Usage:
// import { Solution } from './02_bubble_sort.js';
const sol = new Solution();
sol.bubbleSortOptimized([5, 1, 4, 2, 8]); // arr is now sorted
sol.bubbleSort([5, 1, 4, 2, 8]); // arr is now sorted
