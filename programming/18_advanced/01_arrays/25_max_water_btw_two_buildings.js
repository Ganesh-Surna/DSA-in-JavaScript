function maxWater(arr) {
  let n = arr.length;

  if (n <= 2) return 0;

  let l = 0, r = n - 1;
  let res = 0;

  while (l < r) {
    let minH = Math.min(arr[l], arr[r]);
    let gap = r - l - 1;
    
    res = Math.max(res, gap * minH);

    // Move the pointer with smaller height
    if (arr[l] < arr[r]) {
      l++;
    } else {
      r--;
    }
  }

  return res;
}
