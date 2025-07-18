class Solution {
  // ✅ TC= O(log n)  (But reduces n/2 elements initally by end=Math.floor(n/2)  ---- Because sqrt should be less than its half)
  // ✅ SC = O(1)
  floorSqrt1(n) {
    // code here
    let res = 1,start = 1,end = Math.floor(n / 2);

    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (mid * mid === n) {
        return mid;
      } else if (mid * mid < n) {
        res = mid;
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }

    return res;
  }

  // ✅ TC= O(log n) 
  // ✅ SC = O(1)
  floorSqrt2(n) {
    let res = 1, start = 1, end = n;

    while (start <= end) {
      mid = Math.floor((start + end) / 2);

      if (mid * mid === n) return mid;

      if (mid * mid < n) {
        start = mid + 1;
        res = mid;
      } else {
        end = mid - 1;
      }
    }

    return res;
  }
}
