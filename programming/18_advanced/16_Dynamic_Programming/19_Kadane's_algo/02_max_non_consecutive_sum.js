/* Problem: ✅✅✅ Maximum Sum Without Adjacent Elements ✅✅✅

Given an array of integers (positives and negatives), pick a subset such that no two
selected elements were adjacent in the original array, and the total sum is maximized.

Examples:
  - arr = [4, 5, 6, 7, 8] → best selection {4, 6, 8} → sum = 18
  - arr = [-9, -8, 8, 3, -4] → ignore negatives, just take 8 → sum = 8
  - arr = [5, 5, 10, 100, 10, 5] → select {5, 10, 100, 5} → sum = 110

Constraints:
  - 1 ≤ arr.length ≤ 10⁵
  - -10⁴ ≤ arr[i] ≤ 10⁴

Core intuition:
  - Every index i faces two options: include arr[i] (but then skip arr[i-1])
    or exclude arr[i] (so we can take whatever was best up to i-1).
  - The Kadane-like approach keeps two running values: `include` (best sum ending at i when we take arr[i]) and
    `exclude` (best sum ending at i when we skip arr[i]).
  - The DP version builds a table `dp[i]` storing the best sum using arr[0..i], so you can trace the
    decision-making for each prefix.

Complexities:
  - Kadane-style: Time = O(n), Space = O(1)
  - DP tabulation: Time = O(n), Space = O(n)
*/

// ✅ Kadane-style include/exclude tracking
function maximumNonConsecutiveSum(arr, n = arr.length) {
    if (n === 0) return 0;
    if (n === 1) return arr[0];

    let include = arr[0]; // best sum that includes current element
    let exclude = 0;      // best sum that excludes current element

    for (let i = 1; i < n; i++) {
        let newInclude = arr[i] + exclude;           // take arr[i], so add to exclude (skip previous)
        let newExclude = Math.max(include, exclude); // skip arr[i], carry forward the best so far

        include = newInclude;
        exclude = newExclude;
    }

    return Math.max(include, exclude); // best of taking or skipping the last element
}

// 2. DP Tabulation
// ✅ TC = O(n)
// ✅ SC = O(n)
function maximumNonConsecutiveSumDP(arr, n = arr.length) {
    if (n === 0) return 0;
    if (n === 1) return arr[0];

    let dp = new Array(n).fill(0);

    dp[0] = arr[0];
    dp[1] = Math.max(arr[0], arr[1]);

    for (let i = 2; i < n; i++) {
        let include = arr[i] + dp[i - 2];               // pick arr[i], so add best up to i-2
        let exclude = dp[i - 1];                       // skip arr[i], keep best up to i-1
        let curr = arr[i];                             // consider taking arr[i] alone if negatives dominate
        dp[i] = Math.max(curr, include, exclude);
    }

    return dp[n - 1]; 
}

console.log(maximumNonConsecutiveSum([4, 5, 6, 7, 8]));                     // 18
console.log(maximumNonConsecutiveSum([-9, -8, 8, 3, -4]));                  // 8
console.log(maximumNonConsecutiveSum([1, 2, 3]));                           // 4
console.log(maximumNonConsecutiveSum([5, 5, 10, 100, 10, 5]));              // 110
console.log(maximumNonConsecutiveSum([-366, 50, 677, -13, -33, -923, 495, -851])); // 1172


/*🧩 STEP-BY-STEP WALKTHROUGH (arr = [5, 5, 10, 100, 10, 5])

DP table interpretation:
  - dp[i] records the best sum we can get using arr[0..i] without selecting adjacent entries.

    i:   0   1   2     3      4      5
  arr:   5   5  10   100     10      5
  dp:    5   5  10   105    115    120

  Steps:
    - dp[0] = 5
    - dp[1] = max(5, 5) = 5 → can't take both 5s adjacent.
    - dp[2] = max(10, 10+5=15, 5) = 15 → best is {arr[0], arr[2]}
    - dp[3] = max(100, 100+5=105, 15) = 105 → best is {arr[0], arr[3]}
    - dp[4] = max(10, 10+15=25, 105) = 105 → still best from dp[3].
    - dp[5] = max(5, 5+105=110, 105) = 110 → take arr[5] plus dp[3] => {5, 10, 100, 5}

  The final answer is dp[n-1] = 110.

Why the Kadane-style logic matches this:
  - `include` mirrors selecting arr[i] plus `exclude` from previous step.
  - `exclude` mirrors the best sum we already had (max(include, exclude)).
  - This keeps the same decisions as the DP table but uses O(1) space.
*/