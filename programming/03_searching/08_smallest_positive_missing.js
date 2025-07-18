// Given an array arr[] of size N, find the smallest positive number missing from the array.

class Solution {
  findMissing(arr, n) {
    // Step 1: Replace non-positive numbers with (n+1)
    for (let i = 0; i < n; i++) {
      if (arr[i] <= 0) {
        arr[i] = n + 1;
      }
    }

    // Step 2: Mark indices as negative
    for (let i = 0; i < n; i++) {
      const num = Math.abs(arr[i]); // Math.abs must for subsequent iterations when it is changed to -ve due to previous iterations
      if (num <= n) {
        arr[num - 1] = -Math.abs(arr[num - 1]); // Changes to negative
      }
    }

    // Step 3: Find the first positive index
    for (let i = 0; i < n; i++) {
      if (arr[i] > 0) {
        return i + 1;
      }
    }

    // If all 1..n are present, return n+1
    return n + 1;
  }
}
