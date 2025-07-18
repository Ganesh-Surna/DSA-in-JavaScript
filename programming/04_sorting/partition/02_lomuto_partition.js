// Lomuto Partition Algorithm
// ✅ TC (Worst/Avg/Best): O(n)/O(n)/O(n)
// ✅ SC: O(1) (in-place)
// ❌ Not stable
//
// Main Steps:
// 1. Choose the last element as the pivot.
// 2. Initialize index i to track the end of the "less than pivot" section.
// 3. Traverse the array from left to right (excluding the pivot):
//    - If an element is less than the pivot, increment i and swap arr[i] with arr[j].
// 4. After the loop, place the pivot after the last smaller element by swapping arr[i+1] and arr[h].
// 5. Return the final index of the pivot (i+1).
class Solution {
  // Type 1: all elements < pivot come before it, and elements >= pivot follow it.
  lomutoPartition(arr, l = 0, h = arr.length - 1) {
    // STEP 1: Choose the last element as pivot
    let pivot = arr[h];

    // STEP 2: Initialize i to track the end of the "less than pivot" section
    let i = l - 1;

    // STEP 3: Traverse and rearrange elements (we are not going to pivot element. We are just going just before that element only)
    for (let j = l; j < h; j++) {
      if (arr[j] < pivot) {
        // increment i before swapping
        i = i + 1;
        // Swap arr[i] and arr[j] so that all elements < pivot are to the left
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      // If arr[j] >= pivot, do nothing and continue
    }

    // STEP 4: Place pivot in its correct position
    [arr[i + 1], arr[h]] = [arr[h], arr[i + 1]];

    // STEP 5: Return the correct position of pivot
    return i + 1;
  }

  // Type 2: all elements <= pivot come before it, and elements > pivot follow it.
  lomutoPartition2(arr, l = 0, h = arr.length - 1) {
    let pivot = arr[h];

    let i = l - 1;

    for (let j = l; j < h; j++) {
      //
      if (arr[j] <= pivot) {
        i = i + 1;
        // Swap arr[i] and arr[j] so that all elements <= pivot are to the left
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      // If arr[j] > pivot, do nothing and continue
    }

    // STEP 4: Place pivot in its correct position
    [arr[i + 1], arr[h]] = [arr[h], arr[i + 1]];

    // STEP 5: Return the correct position of pivot
    return i + 1;
  }
}

// Usage Example:
const sol = new Solution();
let arr = [3, 8, 6, 12, 10, 7];
let pivotIndex = sol.lomutoPartition(arr, 0, arr.length - 1);
console.log(arr); // Output: [3, 6, 7, 12, 10, 8] (partitioned around pivot 7)
console.log(pivotIndex); // Output: 2 (final index of pivot)
