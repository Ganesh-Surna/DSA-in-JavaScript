// Three way partitioning
// Difficulty: EasyAccuracy: 41.58%Submissions: 179K+Points: 2Average Time: 20m
// Given an array and a range a, b. The task is to partition the array around the range such that the array is divided into three parts.
// 1) All elements smaller than a come first.
// 2) All elements in range a to b come next.
// 3) All elements greater than b appear in the end.
// The individual elements of three sets can appear in any order. You are required to return the modified array.

// Note: The generated output is true if you modify the given array successfully. Otherwise false.

// Geeky Challenge: Solve this problem in O(n) time complexity.

// Examples:

// Input: arr[] = [1, 2, 3, 3, 4], a = 1, b = 2
// Output: true
// Explanation: One possible arrangement is: {1, 2, 3, 3, 4}. If you return a valid arrangement, output will be true.
// Input: arr[] = [1, 4, 3, 6, 2, 1], a = 1, b = 3
// Output: true
// Explanation: One possible arrangement is: {1, 3, 2, 1, 4, 6}. If you return a valid arrangement, output will be true.
// Constraints:
// 1 <= arr.size()<= 106
// 1 <= array[i], a, b <= 109

// Expected Complexities
// Time Complexity: O(n)
// Auxiliary Space: O(1)


// ✅ "Dutch National Flag algorithm"
// ✅ Not Stable
// ✅ In-place
// ✅ No Auxillary space
class Solution {
  // Function to partition the array around the range such
  // that array is divided into three parts.
  threeWayPartition(arr, a, b) {
    let n = arr.length;
    // low: marks the end of the region with elements < a
    // mid: current index being checked
    // high: marks the start of the region with elements > b
    let low = 0, mid = 0, high = n - 1;
    while (mid <= high) {
      if (arr[mid] < a) {
        // arr[mid] belongs to the < a region, so swap it to the front (low region)
        // After swapping, both arr[low] and arr[mid] are correctly placed, so increment both
        [arr[low], arr[mid]] = [arr[mid], arr[low]];
        low++; // Move low forward, as the < a region has grown by one
        mid++; // Move mid forward, as the swapped-in value at mid is already checked
      } else if (arr[mid] > b) {
        // arr[mid] belongs to the > b region, so swap it to the end (high region)
        // After swapping, arr[high] is now in its correct region, but the new arr[mid] could be any value
        // So, only decrement high, and re-check the new arr[mid] in the next iteration
        [arr[mid], arr[high]] = [arr[high], arr[mid]];
        high--; // Move high backward, as the > b region has grown by one
        // Do NOT increment mid here, as the swapped-in value at mid needs to be checked
      } else {
        // arr[mid] is in [a, b], so it's already in the correct region
        // Just move mid forward to check the next element
        mid++;
      }
    }
    return true;
  }
}
