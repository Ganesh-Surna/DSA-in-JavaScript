// Given a sorted array arr[] and an integer x,
// find the index (0-based) of the largest element in arr[]
// that is less than or equal to x. This element is called
// the floor of x. If such an element does not exist, return -1.

// Note: In case of multiple occurrences of ceil of x,
// return the index of the last occurrence.

// Examples

// Input: arr[] = [1, 2, 8, 10, 10, 12, 19], x = 5
// Output: 1
// Explanation: Largest number less than or equal to 5 is 2, whose index is 1.

// Input: arr[] = [1, 2, 8, 10, 10, 12, 19], x = 11
// Output: 4
// Explanation: Largest Number less than or equal to 11 is 10, whose indices are 3 and 4. The index of last occurrence is 4.

// Input: arr[] = [1, 2, 8, 10, 10, 12, 19], x = 0
// Output: -1
// Explanation: No element less than or equal to 0 is found. So, output is -1.

// Expected Complexities
// Time Complexity: O(log n)
// Auxiliary Space: O(1)

class Solution {
  findFloor(arr, x) {
    // your code here
    let res = -1, l = 0, h = arr.length - 1;
    while (l <= h) {
      let mid = Math.floor((l + h) / 2);
      if (arr[mid] === x) { // but if multiple occurences of x then return the last Index
        if (mid === arr.length - 1 || arr[mid + 1] !== x) {
          return mid;
        }
        l = mid + 1;
      } else if (arr[mid] < x) {
        res = mid;
        l = mid + 1;
      } else {
        h = mid - 1;
      }
    }

    return res;
  }

  findCeil(arr, x) {
    // Find the index of the smallest element >= x
    let res = -1, l = 0, h = arr.length - 1;
    while (l <= h) {
      let mid = Math.floor((l + h) / 2);
      if (arr[mid] === x) { // if multiple occurences of x then return the first Index
        if (mid === 0 || arr[mid - 1] !== x) {
          return mid;
        }
        h = mid - 1;
      } else if (arr[mid] > x) {
        res = mid;
        h = mid - 1;
      } else {
        l = mid + 1;
      }
    }

    return res;
  }
}
