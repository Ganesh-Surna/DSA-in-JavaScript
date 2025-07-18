// 🕒 TC (Worst/Avg/Best): O(n log n)/O(n log n)/O(n log n)
// 💾 SC: O(n)

class MergeSort {
  // 🕒 TC: O(n log n)
  // 💾 SC: O(n)
  // Steps:
  // 1. If the array has more than one element, split it into two halves.
  // 2. Recursively sort both halves.
  // 3. Merge the sorted halves.
  mergeSort(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);
      // Step 1: Sort the left half
      this.mergeSort(arr, start, mid);
      // Step 2: Sort the right half
      this.mergeSort(arr, mid + 1, end);
      // Step 3: Merge the sorted halves
      this.merge(arr, start, mid, end);
    }
    // Print only when the full array is sorted
    if (start === 0 && end === arr.length - 1) {
      console.log("Merge Sorted Array: ", arr);
    }
  }

  // 🕒 TC: O(n)
  // 💾 SC: O(n)
  // Merges two sorted parts of a single array (from start to mid, and mid+1 to end)
  // Steps:
  // 1. Copy the left and right subarrays.
  // 2. Compare elements from both subarrays and merge them in sorted order.
  // 3. Copy any remaining elements from the left subarray.
  // 4. Copy any remaining elements from the right subarray.
  merge(arr, start, mid, end) {
    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);
    let i = 0,
      j = 0,
      k = start;
    // Step 2: Merge left and right subarrays
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
    }
    // Step 3: Copy remaining elements from left subarray
    while (i < left.length) {
      arr[k++] = left[i++];
    }
    // Step 4: Copy remaining elements from right subarray
    while (j < right.length) {
      arr[k++] = right[j++];
    }
  }
} 