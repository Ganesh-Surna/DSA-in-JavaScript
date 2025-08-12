// Find triplets with zero sum

// Given an array arr[] of integers, determine whether it contains a triplet 
// whose sum equals zero. 
// Return true if such a triplet exists, otherwise, return false.

// Examples:

// Input: arr[] = [0, -1, 2, -3, 1]
// Output: true
// Explanation: The triplet [0, -1, 1] has a sum equal to zero.

// Input: arr[] = [1, 2, 3]
// Output: false
// Explanation: No triplet with a sum of zero exists.

// Input: arr[] = [-5, 3, 2, -1, 0, 1]
// Output: true
// Explanation: The triplet [-5, 3, 2] has a sum equal to zero.

// Constraints:
// 1 <= arr.size() <= 103
// -106 <= arr[i] <= 106

// Expected Complexities
// Time Complexity: O(n^2)
// Auxiliary Space: O(1)

class Solution {
  // Function to find triplets with zero sum.
  /**
   * ✅ TC: O(n^2) (due to sorting and two-pointer search)
   * ✅ SC: O(1) (ignoring sort stack space)
   */
  findTriplets(arr) {
    // Sort the array first
    // (Sorting the array is necessary to use two-pointer technique)
    arr.sort((a, b) => a - b);

    const n = arr.length;
    for (let i = 0; i < n - 2; i++) {
      // To avoid duplicates, skip the same element
      if (i > 0 && arr[i] === arr[i - 1]) continue;

      let left = i + 1;
      let right = n - 1;

      while (left < right) {
        const sum = arr[i] + arr[left] + arr[right];
        if (sum === 0) {
          return true;
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }
    return false;
  }

  /**
   * ✅ TC: O(n^2)
   * ✅ SC: O(n) (for hash set in each iteration)
   * ✅ No Sorting
   */
  findTripletsHashSet(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 2; i++) {
      const seen = new Set();
      for (let j = i + 1; j < n; j++) {
        const required = -(arr[i] + arr[j]);
        if (seen.has(required)) {
          return true;
        }
        seen.add(arr[j]);
      }
    }
    return false;
  }
}
