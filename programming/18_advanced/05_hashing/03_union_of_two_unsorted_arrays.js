// 🕒 TC (Worst/Avg/Best): O(m+n)/O(m+n)/O(m+n)
// 💾 SC: O(m+n)

class Solution {
  // 🕒 TC: O(m+n)
  // 💾 SC: O(m+n)
  // Returns the union of two unsorted arrays as an array (no duplicates)
  unsortedUnion(a, b) {
    const set = new Set(a);
    for (let i = 0; i < b.length; i++) {
      set.add(b[i]);
    }
    // const result = Array.from(set);
    console.log("Count of Union of two unsorted arrays: ", set.size);
    return set.size;
  }

  // 🕒 TC: O(m+n+k log k)
  // 💾 SC: O(m+n)
  // Returns the sorted array of the union of two unsorted arrays (no duplicates)
  sortedResultOfUnsortedUnion(a, b) {
    const set = new Set(a);
    for (let i = 0; i < b.length; i++) {
      set.add(b[i]);
    }
    // const result = Array.from(set).sort((x, y) => x - y);
    console.log("Count of Union of two unsorted arrays: ", set.size);
    return set.size;
  }
}

export { Solution };

// Usage:
// import { Solution } from './09_union_of_two_unsorted_arrays.js';
const sol = new Solution();
sol.unsortedUnion([1, 2, 2, 3], [2, 3, 4, 5]); // Output: [1, 2, 3, 4, 5] (order may vary)
sol.sortedResultOfUnsortedUnion([1, 2, 2, 3], [2, 3, 4, 5]); // Output: [1, 2, 3, 4, 5] (sorted)
