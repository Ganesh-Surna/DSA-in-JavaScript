// Problem : Given an array arr[], find the maximum j – i such that arr[j] >= arr[i].
// where j > i

export function maxIndexDifference() {
  console.log("******* START of maxIndexDifference ********");
  // ✅ TC = O(n)
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

  /*
   * EXPLANATION:
   * 
   * This function finds the maximum difference between two indices i and j such that:
   * 1. i < j (i comes before j)
   * 2. arr[i] <= arr[j] (element at i is less than or equal to element at j)
   * 
   * ALGORITHM:
   * 1. Create leftMin array: For each index i, store the minimum element from index 0 to i
   * 2. Create rightMax array: For each index j, store the maximum element from index j to n-1
   * 3. Use two pointers to find the maximum difference where leftMin[i] <= rightMax[j]
   * 
   * EXAMPLE:
   * Input: arr = [34, 8, 10, 3, 2, 80, 30, 33, 1]
   * 
   * Step 1: Create leftMin array (minimum from left)
   * leftMin = [34, 8, 8, 3, 2, 2, 2, 2, 1]
   *            ↑   ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑
   *            0   1  2  3  4  5  6  7  8
   * 
   * Step 2: Create rightMax array (maximum from right)
   * rightMax = [80, 80, 80, 80, 80, 80, 33, 33, 1]
   *             ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑
   *             0   1   2   3   4   5   6   7   8
   * 
   * Step 3: Find maximum difference
   * Compare leftMin[i] with rightMax[j]:
   * - leftMin[0] = 34, rightMax[0] = 80: 34 <= 80 ✓, diff = 0-0 = 0
   * - leftMin[0] = 34, rightMax[1] = 80: 34 <= 80 ✓, diff = 1-0 = 1
   * - leftMin[0] = 34, rightMax[2] = 80: 34 <= 80 ✓, diff = 2-0 = 2
   * - ... continue until j reaches end
   * - leftMin[1] = 8, rightMax[0] = 80: 8 <= 80 ✓, diff = 0-1 = -1 (invalid)
   * - leftMin[1] = 8, rightMax[1] = 80: 8 <= 80 ✓, diff = 1-1 = 0
   * - leftMin[1] = 8, rightMax[2] = 80: 8 <= 80 ✓, diff = 2-1 = 1
   * - ... and so on
   * 
   * The maximum valid difference is 6 (when i=0, j=6: leftMin[0]=34, rightMax[6]=33, but 34 > 33)
   * Actually, the maximum difference is 5 (when i=1, j=6: leftMin[1]=8, rightMax[6]=33, 8 <= 33, diff = 6-1 = 5)
   * 
   * TIME COMPLEXITY: O(n) - we traverse the array 3 times
   * SPACE COMPLEXITY: O(n) - we use two additional arrays of size n
   */
  const result = maxIndexDiff([34, 8, 10, 3, 2, 80, 30, 33, 1]);
  console.log("maxIndexDiff([34, 8, 10, 3, 2, 80, 30, 33, 1]) =", result);
  console.log("******* END of maxIndexDifference ********");
}