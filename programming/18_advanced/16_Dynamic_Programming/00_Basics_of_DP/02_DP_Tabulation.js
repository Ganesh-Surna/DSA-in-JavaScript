/*
========================================================
FIBONACCI: DP TABULATION (BOTTOM-UP)
========================================================

1) BOTTOM-UP APPROACH STEPS
   -> Decide size/dimensions of DP table.
      For fib(n), need array dp[0..n].
   -> Fill known entries (base cases).
      dp[0] = 0, dp[1] = 1.
   -> Derive transition from recurrence to fill remaining cells.
      dp[i] = dp[i - 1] + dp[i - 2] for i ≥ 2.

2) EXAMPLE (n = 4)
   Index: 0  1  2  3  4
   Start: [0, 1, _, _, _]
   Fill : dp[2] = 1, dp[3] = 2, dp[4] = 3
   Result array: [0, 1, 1, 2, 3]

3) IMPLEMENTATION
   function fib(n) {
     const dp = new Array(n + 1).fill(0);
     if (n === 0) return 0;
     dp[0] = 0;
     dp[1] = 1;
     for (let i = 2; i <= n; i++) {
       dp[i] = dp[i - 1] + dp[i - 2];
     }
     return dp[n];
   }

   - Time: Θ(n)
   - Space: Θ(n) (can be optimized to O(1) by keeping only last two values).

4) MEMOIZATION vs TABULATION
   Memoization (Top-Down):
     * Recursively explores states; cache results when first computed.
     * Only computes states that are actually needed by recursion.
     * Uses call stack ⇒ potential recursion-depth issues but easy to adapt from naive recursion.
     * Overhead per call: cache lookups; may require hash/array initialization.

   Tabulation (Bottom-Up):
     * Iterative; explicitly defines evaluation order to fill table.
     * Requires understanding of dependency order beforehand.
     * No recursion, so no stack overflow risk; usually better constant factors.
     * Often easier to apply space optimizations (rolling arrays).

   Summary:
     - Both reduce exponential recursion to polynomial/linear complexity.
     - Choose memoization for quick conversion from recursive solution or sparse state usage.
     - Choose tabulation for predictable iteration, lower overhead, and when recursion depth is a concern.
*/

