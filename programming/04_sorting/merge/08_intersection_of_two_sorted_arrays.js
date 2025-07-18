// 🕒 TC (Worst/Avg/Best): O(m+n)/O(m+n)/O(m+n)
// 💾 SC: O(1) (excluding output array)

class Solution {
  // 🕒 TC: O(m+n)
  // 💾 SC: O(1) (excluding output array)
  // Returns the intersection elements of two sorted arrays (no duplicates in output)
  intersection(a, b) {
    const m = a.length;
    const n = b.length;
    let i = 0, j = 0;
    let result = [];

    while (i < m && j < n) {
      // Escaping the duplicates (only 1 element printed that is a[i-1])
      if (i > 0 && a[i] === a[i - 1]) {
        i++;
        continue;
      }

      if (a[i] < b[j]) {
        i++;
      } else if (a[i] > b[j]) {
        j++;
      } else {
        result.push(a[i]);
        i++;
        j++;
      }
    }
    console.log("Intersection of two sorted arrays: ", result);
    return result;
  }
}

export { Solution };

// Usage:
// import { Solution } from './08_intersection_of_two_sorted_arrays.js';
const sol = new Solution();
sol.intersection([1, 2, 2, 3, 4], [2, 2, 3, 5]); // Output: [2, 3]
