/* Problem: ✅✅✅✅ Optimal Picking Max Value Game (DP Tabulation) ✅✅✅✅

Given an array `arr` of positive integers, two players take turns picking from
either end of the array (leftmost or rightmost element). Both players play
optimally. Find the maximum value that the first player can obtain.

🎯 Goal: Find the maximum value the first player can get when both players play optimally.

Example 1:
Input: arr = [5, 3, 7, 10]
Output: 15
Explanation: Optimal strategy:
  - Player 1 picks 10 (right end) → remaining [5, 3, 7]
  - Player 2 picks 7 (right end) → remaining [5, 3]
  - Player 1 picks 5 (left end) → remaining [3]
  - Player 2 picks 3
  - Player 1 total: 10 + 5 = 15

Example 2:
Input: arr = [20, 5, 4, 6]
Output: 25
Explanation: Optimal strategy:
  - Player 1 picks 20 (left end) → remaining [5, 4, 6]
  - Player 2 picks 6 (right end) → remaining [5, 4]
  - Player 1 picks 5 (left end) → remaining [4]
  - Player 2 picks 4
  - Player 1 total: 20 + 5 = 25

Constraints:
- 1 ≤ arr.length ≤ 100
- 1 ≤ arr[i] ≤ 10^7

Expected Complexities:
Time Complexity: O(n²) where n = array length
Space Complexity: O(n²) for the DP table

⚠️ Note: This is the optimized DP Tabulation solution. For the plain recursive
approach with exponential time complexity, see 01_plain_recursion.js.

🧠 Core Idea:
- Use dynamic programming to build solution bottom-up
- dp[i][j] = maximum value first player can get from subarray [i, j]
- Fill DP table by "gap" (distance between i and j) instead of row-by-row
- For each gap, compute all subarrays of that length
- Base case: gap=1 (2 elements) → pick maximum
- Then compute gap=2, 3, 4, ..., n-1

📈 Recurrence Relation:
  Base case (gap = 1, i+1 === j):
      dp[i][i+1] = max(arr[i], arr[i+1])
  
  For gap = 2 to n-1, i from 0 to n-gap-1, j = i + gap:
      pickI = arr[i] + min(
          dp[i+2][j],      // Opponent picks i+1
          dp[i+1][j-1]     // Opponent picks j
      )
      
      pickJ = arr[j] + min(
          dp[i+1][j-1],    // Opponent picks i
          dp[i][j-2]      // Opponent picks j-1
      )
      
      dp[i][j] = max(pickI, pickJ)
  
  Answer = dp[0][n-1]

Base Cases:
- dp[i][i+1] = max(arr[i], arr[i+1]) for all i (gap = 1, only 2 elements)

🎯 Why This Approach?
- Optimal substructure: Maximum value for [i, j] depends on maximum value for
  smaller subarrays after opponent's move.
- Overlapping subproblems: Avoids recalculating the same subproblems.
- Gap-based tabulation builds solution from smaller gaps to larger gaps.
- Guarantees optimal solution by exploring all subarray combinations.

💡 Key Insights:
- dp[i][j] = maximum value first player can get from subarray [i, j]
- Try both options: pick left (i) or pick right (j)
- Opponent will leave us minimum: use Math.min for opponent's choices
- We take maximum: use Math.max for our choices
- Fill by gap: smaller gaps must be computed before larger gaps

⚠️ IMPORTANT: Why Gap-Based Approach Instead of Normal Row-by-Row?

This DP solution is DIFFERENT from typical DP tabulation! Here's why:

NORMAL DP TABULATION (e.g., 0-1 Knapsack):
- Fill row by row: dp[0][*], then dp[1][*], then dp[2][*], etc.
- dp[i][j] depends on dp[i-1][*] (previous row)
- Dependencies are "upward" (previous row)

THIS PROBLEM (Gap-Based):
- Fill by gap: gap=1, then gap=2, then gap=3, etc.
- dp[i][j] depends on dp[i+2][j], dp[i+1][j-1], dp[i][j-2]
- These are at SMALLER gaps (closer indices)
- Dependencies are "diagonal" and require smaller gaps first

Example for arr = [5, 3, 7, 10]:
  To compute dp[0][3] (gap=3):
    - Needs dp[2][3] (gap=1) ✓ already computed
    - Needs dp[1][2] (gap=1) ✓ already computed
    - Needs dp[0][1] (gap=1) ✓ already computed
  
  If we tried row-by-row:
    - dp[0][3] needs dp[2][3] and dp[1][2]
    - But dp[2][3] is in row 2, which we haven't filled yet!
    - This is why gap-based approach is necessary!

Visual Representation:
  dp table (gap-based filling):
  
  gap=1: [0][1] [1][2] [2][3]  ← Base case (2 elements)
  gap=2: [0][2] [1][3]         ← Depends on gap=1
  gap=3: [0][3]                 ← Depends on gap=1 and gap=2
  
  NOT row-by-row:
  Row 0: [0][0] [0][1] [0][2] [0][3]  ← Can't fill [0][2] or [0][3] yet!
  Row 1: [1][1] [1][2] [1][3]
  Row 2: [2][2] [2][3]
  Row 3: [3][3]

   ⭐⭐WHY dp[0][n-1] IS THE ANSWER, WHY NOT dp[n-1][n-1]?
    THE SIMPLE REASON
        ✔ Because dp[i][j] means: Maximum value the FIRST player can get from the subarray arr[i...j].
        dp[n-1][n-1] → only element at index n-1. i.e., single coin, NOT the full game.
        dp[0][n-1] → the ENTIRE array, i.e. the full game✅
*/

// ✅ TC = O(n²) where n = array length
// ✅ SC = O(n²) for 2D DP table
function optimalPickingDP(arr) {
    const n = arr.length;
    
    // Initialize DP table: dp[i][j] = max value first player can get from [i, j]
    const dp = Array.from({ length: n }, () => Array(n).fill(0));
    
    // Initialize single elements: if only 1 element left, current player gets it
    // This is needed when opponent's move leaves us with a single element
    for (let i = 0; i < n; i++) {
        dp[i][i] = arr[i];
    }
    
    // Base case: gap = 1 (only 2 elements, pick maximum)
    // For each pair of adjacent elements, first player picks the maximum
    for (let i = 0; i < n - 1; i++) {
        dp[i][i + 1] = Math.max(arr[i], arr[i + 1]);
    }

    // Handle all gaps: gap = 2, 3, 4, ..., n-1
    // ⚠️ KEY DIFFERENCE: We fill by "gap" (distance between i and j) instead of
    // row-by-row or column-by-column. This is because dp[i][j] depends on
    // dp[i+2][j], dp[i+1][j-1], and dp[i][j-2], which are all at SMALLER gaps.
    // We must compute smaller gaps first, then larger gaps.
    for (let gap = 2; gap < n; gap++) {
        // For each starting index i, compute dp[i][i+gap]
        // i + gap < n ensures j = i + gap is within bounds
        for (let i = 0; i + gap < n; i++) {
            let j = i + gap;  // j is i + gap (end index)
            
            // Option 1: Pick left (arr[i])
            // If we pick arr[i], opponent gets subarray [i+1, j] and plays optimally.
            // Opponent can pick i+1 (left) → we get [i+2, j]
            // Opponent can pick j (right) → we get [i+1, j-1]
            // Opponent will leave us the minimum (they maximize their value).
            let a = (i + 2 <= j) ? dp[i + 2][j] : 0;      // Opponent picks i+1
            let b = (i + 1 <= j - 1) ? dp[i + 1][j - 1] : 0;  // Opponent picks j
            let pickI = arr[i] + Math.min(a, b);
            
            // Option 2: Pick right (arr[j])
            // If we pick arr[j], opponent gets subarray [i, j-1] and plays optimally.
            // Opponent can pick i (left) → we get [i+1, j-1]
            // Opponent can pick j-1 (right) → we get [i, j-2]
            // Opponent will leave us the minimum (they maximize their value).
            // b = (i + 1 <= j - 1) ? dp[i + 1][j - 1] : 0;  // Opponent picks i --> NOTE: b is already computed above
            let c = (i <= j - 2) ? dp[i][j - 2] : 0;      // Opponent picks j-1
            let pickJ = arr[j] + Math.min(b, c);  
            
            // Take maximum of both options (we maximize our value)
            dp[i][j] = Math.max(pickI, pickJ);
        }
    }

    // dp[0][n-1] contains maximum value first player can get from entire array [0, n-1]
    return dp[0][n - 1];
}

console.log(optimalPickingDP([5, 3, 7, 10])) // 15
console.log(optimalPickingDP([20, 5, 4, 6])) // 25

/*🎯 STEP-BY-STEP WALKTHROUGH (arr = [5, 3, 7, 10])

We'll build a DP table where dp[i][j] represents the maximum value the first
player can obtain from subarray [i, j] when both players play optimally.

Initialization:
n = 4, arr = [5, 3, 7, 10]

Step 1: Initialize Single Elements (gap = 0)
If only 1 element remains, the current player gets it:
dp[0][0] = 5, dp[1][1] = 3, dp[2][2] = 7, dp[3][3] = 10

Step 2: Base Case (gap = 1, only 2 elements)
For each pair of adjacent elements, first player picks the maximum:
dp[0][1] = max(5, 3) = 5
dp[1][2] = max(3, 7) = 7
dp[2][3] = max(7, 10) = 10

Current DP table:
dp = [
  [5, 5, 0, 0],   // i=0
  [0, 3, 7, 0],   // i=1
  [0, 0, 7, 10],  // i=2
  [0, 0, 0, 10]   // i=3
]
      [0, 1, 2, 3]  (j indices)

Step 3: Gap = 2 (3 elements)
Compute dp[i][i+2] for all valid i:

i=0, j=2 (subarray [5, 3, 7]):
  Option 1: Pick left (arr[0]=5)
    If we pick 5, opponent gets [3, 7] and plays optimally.
    - Opponent picks 3 (left) → we get [7] → dp[2][2] = 7
    - Opponent picks 7 (right) → we get [3] → dp[1][1] = 3
    - Opponent will leave us min(7, 3) = 3
    pickI = 5 + 3 = 8
  
  Option 2: Pick right (arr[2]=7)
    If we pick 7, opponent gets [5, 3] and plays optimally.
    - Opponent picks 5 (left) → we get [3] → dp[1][1] = 3
    - Opponent picks 3 (right) → we get [5] → dp[0][0] = 5
    - Opponent will leave us min(3, 5) = 3
    pickJ = 7 + 3 = 10
  
  dp[0][2] = max(8, 10) = 10

i=1, j=3 (subarray [3, 7, 10]):
  Option 1: Pick left (arr[1]=3)
    If we pick 3, opponent gets [7, 10] and plays optimally.
    - Opponent picks 7 (left) → we get [10] → dp[3][3] = 10
    - Opponent picks 10 (right) → we get [7] → dp[2][2] = 7
    - Opponent will leave us min(10, 7) = 7
    pickI = 3 + 7 = 10
  
  Option 2: Pick right (arr[3]=10)
    If we pick 10, opponent gets [3, 7] and plays optimally.
    - Opponent picks 3 (left) → we get [7] → dp[2][2] = 7
    - Opponent picks 7 (right) → we get [3] → dp[1][1] = 3
    - Opponent will leave us min(7, 3) = 3
    pickJ = 10 + 3 = 13
  
  dp[1][3] = max(10, 13) = 13

Current DP table:
dp = [
  [5, 5, 10, 0],  // i=0
  [0, 3, 7, 13],  // i=1
  [0, 0, 7, 10],  // i=2
  [0, 0, 0, 10]   // i=3
]

Step 4: Gap = 3 (4 elements, entire array)
Compute dp[0][3] (subarray [5, 3, 7, 10]):

  Option 1: Pick left (arr[0]=5)
    If we pick 5, opponent gets [3, 7, 10] and plays optimally.
    - Opponent picks 3 (left) → we get [7, 10] → dp[2][3] = 10
    - Opponent picks 10 (right) → we get [3, 7] → dp[1][2] = 7
    - Opponent will leave us min(10, 7) = 7
    pickI = 5 + 7 = 12
  
  Option 2: Pick right (arr[3]=10)
    If we pick 10, opponent gets [5, 3, 7] and plays optimally.
    - Opponent picks 5 (left) → we get [3, 7] → dp[1][2] = 7
    - Opponent picks 7 (right) → we get [5, 3] → dp[0][1] = 5
    - Opponent will leave us min(7, 5) = 5
    pickJ = 10 + 5 = 15
  
  dp[0][3] = max(12, 15) = 15

Final DP table:
dp = [
  [5, 5, 10, 15], // i=0
  [0, 3, 7, 13],  // i=1
  [0, 0, 7, 10],  // i=2
  [0, 0, 0, 10]   // i=3
]

🏆 Result: dp[0][3] = 15

✅ Maximum value for first player = 15
Optimal strategy: Pick 10 (right), opponent picks 7, we pick 5

─────────────────────────────────────────

📊 UNDERSTANDING THE GAP-BASED APPROACH:

Key Concept: Fill by Gap (Distance Between Indices)
- Instead of filling row-by-row or column-by-column, we fill by "gap"
- Gap = j - i (distance between start and end indices)
- Smaller gaps must be computed before larger gaps
- This ensures all dependencies are available

Why Gap-Based?
- dp[i][j] depends on dp[i+2][j], dp[i+1][j-1], dp[i][j-2]
- These are all at SMALLER gaps (closer indices)
- Example: dp[0][3] (gap=3) needs:
  - dp[2][3] (gap=1) ✓
  - dp[1][2] (gap=1) ✓
  - dp[0][1] (gap=1) ✓
- If we tried row-by-row, dp[2][3] wouldn't be ready yet!

Visual Representation:
  Gap=1: [0][1] [1][2] [2][3]  ← Base case
  Gap=2: [0][2] [1][3]         ← Depends on gap=1
  Gap=3: [0][3]                 ← Depends on gap=1 and gap=2

Algorithm Steps:
1. Initialize dp[i][i] = arr[i] for all i (single elements: current player gets it)
2. Fill base case: dp[i][i+1] = max(arr[i], arr[i+1]) for all i (gap=1, 2 elements)
3. For gap = 2 to n-1:
   a. For each i from 0 to n-gap-1:
      - j = i + gap
      - Compute pickI (pick left) and pickJ (pick right)
      - dp[i][j] = max(pickI, pickJ)
4. Return dp[0][n-1]

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Outer loop: gap from 2 to n-1 → O(n) iterations
- Inner loop: i from 0 to n-gap-1 → O(n) iterations in worst case
- Each iteration: O(1) operations
- Total: O(n²)

🎯 SPACE COMPLEXITY ANALYSIS:
- DP table: O(n²)
- No additional space needed
- Total: O(n²)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Two Elements
Input: arr = [5, 10]
Base case: dp[0][1] = max(5, 10) = 10 ✓

CASE 2: Three Elements
Input: arr = [1, 2, 3]
Base case: dp[0][1]=2, dp[1][2]=3
Gap=2: dp[0][2] = max(1+min(dp[2][2], dp[1][1]), 3+min(dp[1][1], dp[0][0]))
      = max(1+min(3, 2), 3+min(2, 1)) = max(3, 4) = 4 ✓

CASE 3: All Same Values
Input: arr = [5, 5, 5, 5]
All choices are equivalent
Result depends on array length (even/odd) ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Maximum value for [i, j] depends on maximum value for smaller subarrays
   - Optimal solution contains optimal solutions to subproblems
   - Try both options and take maximum

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are solved only once
   - Results stored in DP table
   - No recalculation needed

3️⃣ GAP-BASED CONSTRUCTION:
   - Solve smaller gaps first
   - Use results to solve larger gaps
   - Guarantees all dependencies are available

4️⃣ CORRECTNESS:
   - Base case handles 2 elements correctly
   - Opponent's optimal play is modeled correctly
   - Our optimal choice is computed correctly

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Tries all possible subarrays: ✓
- Models opponent's optimal play correctly: ✓
- Takes maximum at each step: ✓
- Base case is correct: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 130: Initialize DP table
  - Create 2D array of size n × n
  - Fill with 0 initially

Line 133-136: Initialize single elements
  - dp[i][i] = arr[i] for all i
  - If only 1 element remains, current player gets it
  - Needed when opponent's move leaves us with a single element

Line 139-141: Base case (gap = 1)
  - For each pair of adjacent elements
  - dp[i][i+1] = max(arr[i], arr[i+1])

Line 144: Outer loop (gap)
  - Start from gap = 2 (3 elements)
  - Go up to gap = n-1 (entire array)

Line 147: Inner loop (starting index)
  - For each starting index i
  - j = i + gap (end index)
  - Ensure j < n (within bounds)

Line 149-165: Compute both options
  - Option 1: Pick left (arr[i])
    * Opponent can pick i+1 → we get [i+2, j]
    * Opponent can pick j → we get [i+1, j-1]
    * Opponent leaves us minimum
  - Option 2: Pick right (arr[j])
    * Opponent can pick i → we get [i+1, j-1]
    * Opponent can pick j-1 → we get [i, j-2]
    * Opponent leaves us minimum

Line 168: Take maximum
  - dp[i][j] = max(pickI, pickJ)

Line 172: Return result
  - dp[0][n-1] contains maximum value for entire array

─────────────────────────────────────────

🎯 COMPARISON WITH NORMAL DP TABULATION:

NORMAL DP (e.g., 0-1 Knapsack):
- Fill row by row: dp[0][*], dp[1][*], dp[2][*], ...
- Dependencies: dp[i][j] depends on dp[i-1][*]
- Direction: Top to bottom (previous row)

THIS PROBLEM (Gap-Based):
- Fill by gap: gap=1, gap=2, gap=3, ...
- Dependencies: dp[i][j] depends on dp[i+2][j], dp[i+1][j-1], dp[i][j-2]
- Direction: Diagonal (smaller gaps to larger gaps)

Why Different?
- Normal DP: dependencies are "upward" (previous state)
- This problem: dependencies are "diagonal" (smaller subarrays)
- Gap-based ensures all dependencies are computed first

─────────────────────────────────────────

🎯 COMPARISON WITH RECURSIVE APPROACH:

Plain Recursion (See 01_plain_recursion.js):
- Time: O(2^n) exponential
- Space: O(n) recursion stack
- Recalculates same subproblems
- Very slow for large inputs

DP Tabulation (This solution):
- Time: O(n²) polynomial
- Space: O(n²) for DP table
- Each subproblem solved once
- Much faster and efficient

Improvement:
- Time: From O(2^n) to O(n²) - massive improvement
- Space: From O(n) to O(n²) - trade-off for speed

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Game theory problems
- Competitive programming
- Algorithm design
- Decision making under uncertainty
- Two-player zero-sum games
- Optimal strategy problems

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Optimal Picking Max Value Game (this problem)
- Stone Game
- Predict the Winner
- Coin Game
- Nim Game
- Two Player Game

─────────────────────────────────────────

🎯 KEY INSIGHTS:

1️⃣ GAP-BASED FILLING:
   - Fill DP table by gap (distance between indices)
   - Smaller gaps must be computed before larger gaps
   - This is different from normal row-by-row DP

2️⃣ GAME THEORY:
   - Both players play optimally
   - Opponent maximizes their value, which minimizes ours
   - We maximize our value by choosing best option

3️⃣ MIN-MAX STRATEGY:
   - We use Math.max (maximize our value)
   - Opponent uses Math.min (minimize our value)
   - This models optimal play from both sides

4️⃣ BASE CASE:
   - Only 2 elements left
   - Pick the maximum (we get to choose first)

─────────────────────────────────────────

🎯 VARIABLE NAMING:
- `arr`: Array of values
- `n`: Array length
- `dp[i][j]`: Maximum value first player can get from subarray [i, j]
- `gap`: Distance between i and j (j - i)
- `i`: Starting index of subarray
- `j`: Ending index of subarray (i + gap)
- `pickI`: Value when picking from left (i)
- `pickJ`: Value when picking from right (j)

─────────────────────────────────────────

🎯 CONCLUSION:
Optimal Picking Max Value Game using DP Tabulation efficiently finds the
maximum value the first player can obtain by building a DP table using a
gap-based approach (filling by distance between indices rather than row-by-row),
trying both options (pick left or pick right), modeling the opponent's optimal
play (using Math.min), and taking the maximum of both options. This achieves
O(n²) time complexity, a massive improvement over the exponential recursive
approach. The gap-based approach is necessary because dependencies are diagonal
(smaller subarrays) rather than upward (previous state)!
*/
