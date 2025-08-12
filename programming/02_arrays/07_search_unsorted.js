// Given an unsorted array arr[] of size N, 
// find the first occurrence of a given element x.

class Solution {
  // ✅ TC= O(n/2) --> O(n)
  // ✅ SC = O(1)
  search1(arr, x) {
    // code here
    let res = -1;
    let start = 0,
      end = arr.length - 1;

    while (start <= end) {
      if (arr[start] === x) {
        return start;
      } else if (arr[end] === x) {
        res = end;
        end--;
        start++;
      } else {
        end--;
        start++;
      }
    }

    return res;
  }

  // ✅ TC= O(n)
  // ✅ SC = O(1)
  search2(arr, x) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === x) return i;
    }
    return -1;
  }
}
