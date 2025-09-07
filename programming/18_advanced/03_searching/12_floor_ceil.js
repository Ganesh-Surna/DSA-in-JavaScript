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