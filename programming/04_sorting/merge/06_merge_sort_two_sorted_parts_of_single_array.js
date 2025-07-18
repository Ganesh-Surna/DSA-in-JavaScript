// 🕒 TC (Worst/Avg/Best): O(n)/O(n)/O(n)
// 💾 SC: O(n)

class Solution {
  // 🕒 TC: O(n)
  // 💾 SC: O(n)
  // Merges two sorted parts of a single array (from start to mid, and mid+1 to end)
  merge(arr, start, mid, end) {
    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;
    
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
    }
    while (i < left.length) {
      arr[k++] = left[i++];
    }
    while (j < right.length) {
      arr[k++] = right[j++];
    }
  }

  // OR
  merge2(arr, start = 0, mid, end = arr.length - 1) {
    const len1 = mid + 1;
    const len2 = end + 1; // end = len -1 ==> len = end + 1

    let res = [];

    let start1 = start,
      start2 = mid + 1;
    while (start1 < len1 && start2 < len2) {
      if (arr[start1] <= arr[start2]) {
        res.push(arr[start1]);
        start1++;
      } else {
        res.push(arr[start2]);
        start2++;
      }
    }
    while (start1 < len1) {
      res.push(arr[start1]);
      start1++;
    }
    while (start2 < len2) {
      res.push(arr[start2]);
      start2++;
    }

    // Copy merged result back to original array
    for (let i = 0; i < res.length; i++) {
      arr[start + i] = res[i];
    }
    console.log("Merged Array (two sorted parts): ", arr);
  }
}

export { Solution };

// Usage:
// import { Solution } from './06_merge_sort_two_sorted_parts_of_single_array.js';
const sol = new Solution();
let arr = [1, 3, 5, 2, 4, 6];
sol.merge(arr, 0, 2, 5); // arr is now merged and sorted from 0 to 5
