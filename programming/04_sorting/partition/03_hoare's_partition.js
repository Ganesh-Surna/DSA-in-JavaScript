// Hoare's Partition Algorithm
// ✅ TC (Worst/Avg/Best): O(n)/O(n)/O(n)
// ✅ SC: O(1) (in-place)
// ❌ Not stable
//
// ✅ Main Steps:
// 1. Choose the first element as the pivot.
// 2. Initialize two pointers: i (from left), j (from right).
// 3. Increment i until arr[i] >= pivot, decrement j until arr[j] <= pivot.
// 4. If i >= j, return j (partition index).
// 5. If i < j, swap arr[i] and arr[j] and repeat.

// ✅ Key Diff b/w Hoare's & Lomuto:
// 1. Pivot Choice:
//    - Hoare: First element as pivot (commonly)
//    - Lomuto: Last element as pivot (commonly)
// 2. Partition Index Returned:
//    - Hoare: Returns the index where left side <= pivot, right side >= pivot (pivot not fixed)
//    - Lomuto: Returns the final index of the pivot (pivot is at correct position)
//              : left side < pivot, right side >= pivot (pivot is at correct position)
//              : (OR)
//              : left side <= pivot, right side > pivot (pivot is at correct position)
// 3. Swapping:
//    - Hoare: Swaps out-of-place elements from both ends
//    - Lomuto: Swaps only when a smaller element is found
// 4. Stability:
//    - Both are not stable
// 5. Efficiency:
//    - Hoare: Fewer swaps, generally faster
//    - Lomuto: Simpler, but more swaps
// 6. Handling of Equal Elements:
//    - Hoare: Can handle duplicates better (less likely to degrade to O(n^2))
//    - Lomuto: Can degrade to O(n^2) if many elements are equal


class Solution {
  hoaresPartition(arr, l = 0, h = arr.length - 1) {
    let pivot = arr[l];
    let i = l - 1;
    let j = h + 1;

    while (true) {
      // Do not use <= OR >= (results in never ending loop)
      do {i++} while (arr[i] < pivot); // Means stop when arr[i] >= pivot
      do {j--} while (arr[j] > pivot); // Means stop when arr[j] <= pivot

      // We are returning j . That is the index around which the partitions happens,
      // such that elemnts left to it(starting from it) are <= pivot.
      // And elemts right to it are >= pivot.
      // NOTE: the pivot element will not be fixed at its correct position
      if (i >= j) return j;

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
}

// Usage Example:
const sol = new Solution();
let arr = [5, 3, 8, 4, 2, 7, 1, 10, 11, 3, 2, 6, 5];
let partitionIndex = sol.hoaresPartition(arr, 0, arr.length - 1);
console.log(arr); // [5,  3,  2, 4, 2, 3, 1, 10, 11, 7, 8, 6, 5]
console.log(partitionIndex); // 6
