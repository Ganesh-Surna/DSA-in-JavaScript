// 🕒 TC (Worst/Avg/Best): O(m+n)/O(m+n)/O(m+n)
// 💾 SC: O(m+n)

class Solution {
  // 🕒 TC: O(m+n)
  // 💾 SC: O(m+n)
  // Merges "TWO SORTED" arrays a and b into a new sorted array
  merge(a, b) {
    const m = a.length;
    const n = b.length;

    const res = [];
    let i = 0,
      j = 0;

    while (i < m && j < n) {
      if (a[i] <= b[j]) {
        res.push(a[i]);
        i++;
      } else {
        res.push(b[j]);
        j++;
      }
    }

    while (i < m) {
      res.push(a[i]);
      i++;
    }
    while (j < n) {
      res.push(b[j]);
      j++;
    }
    console.log("Merged Sorted Array: ", res);
    return res;
  }

  // ⚠️ This approach is UNSTABLE: when a[i] === b[j], pushing both and moving both pointers
  // can disrupt the original order of equal elements from the same array.
  mergeMoveBothWhenDuplicates(a, b) {
    const m = a.length;
    const n = b.length;

    const res = [];
    let i = 0,
      j = 0;

    while (i < m && j < n) {
      if (a[i] < b[j]) {
        res.push(a[i]);
        i++;
      } else if (a[i] === b[j]) {
        res.push(a[i]);
        res.push(b[j]);
        i++;
        j++;
      } else {
        res.push(b[j]);
        j++;
      }
    }

    while (i < m) {
      res.push(a[i]);
      i++;
    }
    while (j < n) {
      res.push(b[j]);
      j++;
    }
    console.log("Merged Sorted Array: ", res);
    return res;
  }
}

export { Solution };

// Usage:
// import { Solution } from './05_merge_sort.js';
const sol = new Solution();
sol.mergeSort([1, 3, 5], [2, 4, 6]); // Merged and sorted output
