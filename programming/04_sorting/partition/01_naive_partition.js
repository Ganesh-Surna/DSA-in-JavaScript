// Naive Partition Algorithm
// ✅ TC (Worst/Avg/Best): O(n)/O(n)/O(n)
// ✅ SC: O(n) (uses extra array for partitioning)
// but ✅ STABLE
class Solution {
  naivePartition(arr, p) {
    // STEP 1: Move the pivot element to the end of the array
    let n = arr.length;
    [arr[n - 1], arr[p]] = [arr[p], arr[n - 1]];

    // STEP 2: Collect all elements less than or equal to the pivot into temp
    let temp = [];
    for (let i = 0; i < n; i++) {
      if (arr[i] <= arr[n - 1]) {
        temp.push(arr[i]);
      }
    }

    // STEP 3: Collect all elements greater than the pivot into temp
    for (let i = 0; i < n; i++) {
      if (arr[i] > arr[n - 1]) {
        temp.push(arr[i]);
      }
    }

    // STEP 4: Copy elements from temp back to arr to complete the partition
    for (let i = 0; i < n; i++) {
      arr[i] = temp[i];
    }
  }
}

// Usage Example:
const sol = new Solution();
let arr = [3, 8, 6, 12, 10, 7];
let pivotIndex = 2; // Example: pivot is arr[2] = 6
sol.naivePartition(arr, pivotIndex);
console.log(arr); // Output: [3, 6, 8, 12, 10, 7] (partitioned around pivot 6)
