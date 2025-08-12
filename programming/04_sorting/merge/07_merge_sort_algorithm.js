// 🕒 TC (Worst/Avg/Best): O(n log n)/O(n log n)/O(n log n)
// 💾 SC: O(n)

class Solution {
  // 🕒 TC: O(n log n)
  // 💾 SC: O(n)
  // Recursively sorts the array using merge sort
  mergeSort(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);
      this.mergeSort(arr, start, mid); // left part
      this.mergeSort(arr, mid + 1, end); // right part
      this.merge(arr, start, mid, end); // merge both parts
    }
    // Print only when the full array is sorted
    if (start === 0 && end === arr.length - 1) {
      console.log("Merge Sorted Array: ", arr);
    }
  }

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

  // OR we can also write the merge like this
  merge2(arr, start = 0, mid, end = arr.length - 1) {
    const len1 = mid + 1;
    const len2 = end + 1; // end = len - 1 ==> len = end + 1

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
  }
}

export { Solution };

// Usage:
// import { Solution } from './07_merge_sort_algorithm.js';
const sol = new Solution();
let arr = [12, 11, 13, 5, 6, 7];
sol.mergeSort(arr); // arr is now fully sorted
