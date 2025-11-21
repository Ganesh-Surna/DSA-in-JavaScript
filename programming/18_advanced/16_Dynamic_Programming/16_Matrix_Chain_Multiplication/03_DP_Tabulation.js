/* Problem: ✅✅✅ Matrix Chain Multiplication (Iterative DP Tabulation) ✅✅✅

Given an sequence of n matrices, where the dimension of matrix i is arr[i-1] × arr[i],
find the minimum number of scalar multiplications needed to multiply the entire chain.
You cannot reorder matrices, but you can decide where to place the parentheses.

Example 1:
Input: arr = [2, 1, 3, 4]
Interpretation: Matrices A1 (2×1), A2 (1×3), A3 (3×4)
Output: 20
Explanation: Optimal order = ((A1 × A2) × A3):
  - Cost of A1×A2 = 2×1×3 = 6
  - Cost of (A1×A2)×A3 = 2×3×4 = 24
  - Total = 6 + 24 = 30 ... Wait! But DP finds 20 via (A1 × (A2 × A3))
    - A2×A3 = 1×3×4 = 12
    - A1×(A2×A3) = 2×1×4 = 8
    - Total = 12 + 8 = 20

Example 2:
Input: arr = [1, 2, 3]
Matrices: A1 (1×2), A2 (2×3)
Output: 6
Explanation: Only one multiplication order → cost = 1×2×3 = 6

Example 3:
Input: arr = [1, 2]
Only one matrix (1×2), so no multiplication is needed.
Output: 0

Constraints:
- 2 ≤ arr.length ≤ 100
- 1 ≤ arr[i] ≤ 1000

Time Complexity: O(n³) due to the triple nested loop (gap, start, split)
Space Complexity: O(n²) for the DP table

🧠 Core Idea:
- dp[i][j] = minimum cost to multiply matrices from index i to index j.
- We fill dp table for smaller chains and build up to larger chains using "gap" (chain length).
- Every chain of length ≥ 3 has at least one split point p where i < p < j.
- Cost = cost(left side) + cost(right side) + cost of multiplying the results (arr[i]×arr[p]×arr[j]).

DP Recurrence:
  dp[i][j] = min(dp[i][j], dp[i][p] + dp[p][j] + arr[i] × arr[p] × arr[j])
  for all valid split points p (i < p < j)

Base Case:
- dp[i][i+1] = 0 because a single matrix (represented by arr[i] × arr[i+1]) needs no multiplication.

Why this works:
- Optimal substructure: The best way to multiply [i...j] depends on optimal ways to multiply subchains [i...p] and [p...j].
- Overlapping subproblems: The same intervals [i...j] appear while considering different split points or longer chains.
- Tabulation (bottom-up): We start with chains of length 2 and build up because longer chains depend on shorter ones.

✨ Additional insights:
- gap loops from 2 to n-1 because we only consider ranges where j - i ≥ 2 (meaning at least two matrices to multiply).
- For each (i, j), we try every split p to find the minimum cost.
- The multiplication cost is arr[i] × arr[p] × arr[j] because the resulting matrix from [i...p] has dimensions arr[i]×arr[p], and from [p...j] has arr[p]×arr[j].
- dp table stores results for every interval once, so repeated subproblems are avoided.

Use cases:
- Compiler optimization for parenthesizing matrix chains.
- Any problem where the order of combining or multiplying matters and has associative property.
*/

// ✅ TC = O(n³) 
// ✅ SC = O(n²)
function minMatrixMultiplications(arr, n=arr.length){
    let dp = new Array(n)
    for(let i=0; i<n; i++){
        dp[i] = new Array(n).fill(Infinity)
    }

    // Base case: single matrix (i+1 === j means two elements) needs no multiplication
    for(let i=0; i<n-1; i++){
        dp[i][i+1] = 0
    }

    // gap represents the interval length (j - i). Start from 2 (three numbers => two matrices).
    // in other words: gap >= 2 (size 3) ensures at least one split point
    for(let gap=2; gap<n; gap++){
        for(let i=0; i+gap<n; i++){
            let j = i+gap // j-i = gap

            for(let p=i+1; p<j; p++){
                /* Why p=i+1, Why Not p=i?
                    p (the split point) must satisfy: i < p < j
                */
                
                // split between p: [i...p] and [p...j] --> p includes in both left and right
                let curr = arr[i]*arr[p]*arr[j]
                let left = dp[i][p]
                let right = dp[p][j]
                dp[i][j] = Math.min(dp[i][j], curr + left + right)
            }
        }
    }
    
    return dp[0][n-1] // min cost to multiply matrices from 0 to n-1 (entire chain)
}

console.log(minMatrixMultiplications([2, 1, 3, 4])); // 20 → (A1 × (A2 × A3))
console.log(minMatrixMultiplications([1, 2, 3])); // 6 → only one way
console.log(minMatrixMultiplications([1, 2])); // 0 → single matrix, no multiplication needed



/*🧩 STEP-BY-STEP WALKTHROUGH (arr = [2, 1, 3, 4])

Interpretation:
- arr = [2, 1, 3, 4] defines 3 matrices:
  A1 (2×1), A2 (1×3), A3 (3×4).
- We store cost to multiply Ai to Aj in dp[a][b], where a and b refer to positions
  in the arr, so dp[0][3] stores the cost of multiplying the whole chain.

DP table (n × n) after initialization:
  - Fill everything with Infinity
  - Base case: dp[i][i+1] = 0 (single matrix between arr[i] and arr[i+1]).

     j→ 0    1    2    3
   i
   0   ∞    0    ∞    ∞
   1   ∞    ∞    0    ∞
   2   ∞    ∞    ∞    0
   3   ∞    ∞    ∞    ∞

We only care about cells where j > i, because the interval [i..j] must cover at least two numbers.

Filling the table:
1. gap = 2 (chain covering arr[i]..arr[i+2], i.e., two matrices)
   - i=0, j=2: only split p=1
       * left = dp[0][1] = 0 (A1 alone)
       * right = dp[1][2] = 0 (A2 alone)
       * combine cost = arr[0]×arr[1]×arr[2] = 2×1×3 = 6
       * dp[0][2] = min(∞, 0+0+6) = 6
   - i=1, j=3: only split p=2
       * left = dp[1][2] = 0, right = dp[2][3] = 0
       * combine = 1×3×4 = 12
       * dp[1][3] = 12

   Table update:

     j→ 0    1    2    3
   i
   0   ∞    0    6    ∞
   1   ∞    ∞    0    12
   2   ∞    ∞    ∞    0
   3   ∞    ∞    ∞    ∞

2. gap = 3 (chain covering arr[0]..arr[3], i.e., all matrices)
   - i=0, j=3: try splits p=1 and p=2
       * p=1:
           left = dp[0][1] = 0
           right = dp[1][3] = 12
           combine = arr[0]×arr[1]×arr[3] = 2×1×4 = 8
           total = 0 + 12 + 8 = 20
       * p=2:
           left = dp[0][2] = 6
           right = dp[2][3] = 0
           combine = 2×3×4 = 24
           total = 6 + 0 + 24 = 30
       * Choose min → dp[0][3] = 20

Final DP table:

     j→ 0    1    2    3
   i
   0   ∞    0    6    20
   1   ∞    ∞    0    12
   2   ∞    ∞    ∞    0
   3   ∞    ∞    ∞    ∞

Answer = dp[0][3] = 20 → best parenthesization is A1 × (A2 × A3).

👉 Why this logic works:
- We iterate gaps (j−i) from small to large so every dp[i][j] depends on previously computed
  intervals with smaller gaps.
- We try all split points p between i and j because each split represents a different
  place to put the parentheses.
- The combine cost arr[i]×arr[p]×arr[j] comes from multiplying the result matrices
  from the left ([i..p]) and right ([p..j]) halves.
- Math.min over all splits ensures we store only the cheapest order.

💡 Additional insights:
- dp[i][i+1] = 0 ensures single matrices contribute zero cost.
- The dp table stores the minimum cost for every subchain once, so we never recompute
  the same subproblem (overlapping subproblem property).
- Since we fill the table bottom-up, we always have the sub-results ready before using them.
*/