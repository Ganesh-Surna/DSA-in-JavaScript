export function maxIndexDifference() {
  console.log("******* START of maxIndexDifference ********");
  // ✅ TC= O(n)
  // ✅ SC = O(n)
  function maxIndexDiff(arr) {
    const n = arr.length;
    let leftMin = new Array(n);
    leftMin[0] = arr[0];
    for (let i = 1; i < n; i++) {
      leftMin[i] = Math.min(arr[i], leftMin[i - 1]);
    }
    let rightMax = new Array(n);
    rightMax[n - 1] = arr[n - 1];
    for (let j = n - 2; j >= 0; j--) {
      rightMax[j] = Math.max(arr[j], rightMax[j + 1]);
    }
    let maxIdxDiff = 0, i = 0, j = 0;
    while (i < n && j < n) {
      if (leftMin[i] <= rightMax[j]) {
        maxIdxDiff = Math.max(maxIdxDiff, j - i);
        j++;
      } else {
        i++;
      }
    }
    return maxIdxDiff;
  }
  const result = maxIndexDiff([34, 8, 10, 3, 2, 80, 30, 33, 1]);
  console.log("maxIndexDiff([34, 8, 10, 3, 2, 80, 30, 33, 1]) =", result);
  console.log("******* END of maxIndexDifference ********");
}