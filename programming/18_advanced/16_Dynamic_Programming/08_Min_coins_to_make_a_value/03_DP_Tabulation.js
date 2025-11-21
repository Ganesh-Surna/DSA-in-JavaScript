/* Problem: ✅✅✅✅ Minimum Coins to Make a Value (DP Tabulation) ✅✅✅✅

Given an array of coins `coins` and a target sum `sum`, find the minimum number
of coins needed to make the sum. You can use each coin unlimited number of
times (coins are available in infinite supply). Return -1 if it's not possible
to make the sum.

🎯 Goal: Find the minimum number of coins needed to make the target sum.

Example 1:
Input: coins = [1, 2, 3], sum = 4
Output: 2
Explanation: Minimum coins needed is 2:
  - Option 1: [2, 2] → 2 + 2 = 4 (2 coins)
  - Option 2: [1, 3] → 1 + 3 = 4 (2 coins)
  - Option 3: [1, 1, 1, 1] → 1 + 1 + 1 + 1 = 4 (4 coins)
  - Minimum: 2 coins

Example 2:
Input: coins = [2, 3, 5, 6], sum = 10
Output: 2
Explanation: Minimum coins needed is 2:
  - Option: [5, 5] → 5 + 5 = 10 (2 coins)

Example 3:
Input: coins = [5, 10], sum = 3
Output: -1
Explanation: Cannot make sum 3 using coins 5 and 10 → return -1

Constraints:
- 1 ≤ coins.length ≤ 12
- 1 ≤ coins[i] ≤ 2^31
- 0 ≤ sum ≤ 10^4

Expected Complexities:
Time Complexity: O(n × sum) where n = number of coins
Space Complexity: 
  - minCoins: O(n × sum) for 2D DP table
  - minCoins2: O(sum) for 1D DP array (space optimized)

⚠️ Note: This is the optimized DP Tabulation solution. For the plain recursive
approach with exponential time complexity, see 01_plain_recursion.js.

🧠 Core Idea:
- Use dynamic programming to build solution bottom-up
- dp[i][j] = minimum coins needed to make sum j using first i coins
- For each coin and each sum, try: don't use coin OR use coin (if possible)
- Take minimum of both options
- Base case: dp[i][0] = 0 (0 coins needed for sum 0)
- Invalid case: dp[0][j] = Infinity (no coins available for sum > 0)

📈 Recurrence Relation (2D DP):
  dp[i][0] = 0  // Base case: 0 coins needed for sum 0
  dp[0][j] = Infinity  // Base case: impossible with 0 coins (j > 0)
  
  For each i from 1 to n, j from 1 to sum:
      dp[i][j] = dp[i-1][j]  // Option 1: Don't use coin i-1
      
      if j >= coins[i-1]:
          dp[i][j] = min(dp[i][j], 1 + dp[i][j - coins[i-1]])  // Option 2: Use coin i-1
          // Note: Stay in same row (i) because coins are unlimited
  
  Answer = dp[n][sum]

📈 Recurrence Relation (1D DP - Space Optimized):
  dp[0] = 0  // Base case: 0 coins needed for sum 0
  dp[j] = Infinity for j > 0  // Initialize as impossible
  
  For each coin in coins:
      For each j from coin to sum:
          dp[j] = min(dp[j], 1 + dp[j - coin])
  
  Answer = dp[sum]

Base Cases:
- dp[i][0] = 0 (0 coins needed for sum 0)
- dp[0][j] = Infinity (impossible with 0 coins for sum > 0)

🎯 Why This Approach?
- Optimal substructure: Minimum coins for sum j depends on minimum coins for
  smaller sums (j - coin_value).
- Overlapping subproblems: Avoids recalculating the same subproblems.
- Tabulation builds solution iteratively from smaller to larger sums.
- Guarantees optimal solution by exploring all coin options.

💡 Key Insights:
- dp[i][j] = minimum coins to make sum j using first i coins
- Try both options: don't use coin or use coin
- Take minimum of both options
- When using coin, stay in same row (unlimited supply)
- Space optimization: Only need current row, can use 1D array
*/

// ✅ TC = O(n × sum) where n = number of coins, sum = target sum
// ✅ SC = O(n × sum) for 2D DP table
function minCoins(coins, sum){
    let n=coins.length
    
    // Initialize 2D DP table: dp[i][j] = min coins to make sum j using first i coins
    let dp = new Array(n+1)
    for(let i=0; i<n+1; i++){
        dp[i] = new Array(sum+1).fill(Infinity)
    }
    
    // Base case: If sum=0, 0 coins needed (for any number of coins)
    for(let i=0; i<n+1; i++){
        dp[i][0] = 0
    }
    
    // Base case: If n=0 & sum > 0, impossible (no coins available)
    for(let j=1; j<sum+1; j++){
        dp[0][j] = Infinity
    }
    
    // Build DP table: for each coin and each sum
    for(let i=1; i<n+1; i++){
        for(let j=1; j<sum+1; j++){
            // Option 1: Don't take the coin
            dp[i][j] = dp[i-1][j];

            // Option 2: Take coin[i-1] (unbounded → stay in same row)
            if (j >= coins[i-1]) { // if sum >= last coin val
                dp[i][j] = Math.min(dp[i][j], 1 + dp[i][j - coins[i-1]]);
            }
        }
    }
    
    // Return result, convert Infinity to -1 for consistency
    return dp[n][sum] === Infinity ? -1 : dp[n][sum];
}

/*─────────────────────────────────────────────────────────────────────────────
🎯 SPACE OPTIMIZED IMPLEMENTATION: minCoins2 (1D DP)

This is a space-optimized version that uses only O(sum) space instead of
O(n × sum). The key insight is that we only need the current row, not all
previous rows, because coins can be reused (unlimited supply).

Key Differences from minCoins:
1. 1D array instead of 2D: dp[j] = min coins to make sum j
2. Iterate coins first, then sums: For each coin, update all possible sums
3. Same logic: Still tries all coins and takes minimum
4. Better space: O(sum) instead of O(n × sum)

Why this works:
- When processing coin i, we update dp[j] for all j >= coin[i]
- dp[j] already contains the best solution using previous coins
- We can reuse the same coin multiple times (unlimited supply)
- So we only need one row (current state), not all rows
─────────────────────────────────────────────────────────────────────────────*/

// ✅ TC = O(n × sum) where n = number of coins, sum = target sum
// ✅ SC = O(sum) for 1D DP array (space optimized)
function minCoins2(coins, sum){
    let n=coins.length
    
    // Initialize 1D DP array: dp[j] = min coins to make sum j
    let dp = new Array(sum+1).fill(Infinity)
    
    // Base case: 0 coins needed for sum 0
    dp[0] = 0
    
    // For each coin, update all possible sums
    for(let i=0; i<n; i++){ // Coins
        /* j starts from coins[i], because:
         * - We can only use coin[i] if the current sum j >= coins[i]
         * - If j < coins[i], we cannot use this coin (sum is too small)
         * - Starting from coins[i] ensures we only check valid cases
         * - This optimization avoids unnecessary iterations for j < coins[i]
         * - Example: For coin=5, we only need to check j=5,6,7,... not j=1,2,3,4
         */
        for(let j=coins[i]; j<sum+1; j++){
            // Try using coin[i]: min coins = 1 + min coins for (j - coins[i])
            dp[j] = Math.min(dp[j], 1+dp[j-coins[i]])
        }
    }
    
    // Return result, convert Infinity to -1 for consistency
    return dp[sum] === Infinity ? -1 : dp[sum]
}

console.log(minCoins([1, 2, 3], 4)) // 2 --> [2, 2] or [1, 3]
console.log(minCoins([2, 3, 5, 6], 10)) // 2 --> [5, 5]
console.log(minCoins([2, 3, 5, 6], 20)) // 4 --> [5, 5, 5, 5] or [2, 6, 6, 6]
console.log(minCoins([2, 3, 5, 6], 25)) // 5 --> [5, 5, 5, 5, 5] or [3, 6, 6, 5, 5]

/*🎯 STEP-BY-STEP WALKTHROUGH (coins = [1, 2, 3], sum = 4)

We'll build a DP table where dp[i][j] represents the minimum number of coins
needed to make sum j using the first i coins.

Initialization:
n = 3, sum = 4

Initialize DP table:
dp = [
  [0, ∞, ∞, ∞, ∞],  // i=0: no coins available
  [0, ∞, ∞, ∞, ∞],  // i=1: can use coin 1
  [0, ∞, ∞, ∞, ∞],  // i=2: can use coins 1,2
  [0, ∞, ∞, ∞, ∞]   // i=3: can use coins 1,2,3
]

Base cases:
- dp[i][0] = 0 for all i (0 coins needed for sum 0)
- dp[0][j] = Infinity for j > 0 (impossible with no coins)

Processing:

i=1, coin=1:
  j=1: dp[1][1] = min(dp[0][1], 1+dp[1][0]) = min(∞, 1+0) = 1
  j=2: dp[1][2] = min(dp[0][2], 1+dp[1][1]) = min(∞, 1+1) = 2
  j=3: dp[1][3] = min(dp[0][3], 1+dp[1][2]) = min(∞, 1+2) = 3
  j=4: dp[1][4] = min(dp[0][4], 1+dp[1][3]) = min(∞, 1+3) = 4

dp = [
  [0, ∞, ∞, ∞, ∞],
  [0, 1, 2, 3, 4],  // Using only coin 1
  [0, ∞, ∞, ∞, ∞],
  [0, ∞, ∞, ∞, ∞]
]

i=2, coin=2:
  j=1: dp[2][1] = dp[1][1] = 1 (can't use coin 2, j < 2)
  j=2: dp[2][2] = min(dp[1][2], 1+dp[2][0]) = min(2, 1+0) = 1
  j=3: dp[2][3] = min(dp[1][3], 1+dp[2][1]) = min(3, 1+1) = 2
  j=4: dp[2][4] = min(dp[1][4], 1+dp[2][2]) = min(4, 1+1) = 2

dp = [
  [0, ∞, ∞, ∞, ∞],
  [0, 1, 2, 3, 4],
  [0, 1, 1, 2, 2],  // Using coins 1,2
  [0, ∞, ∞, ∞, ∞]
]

i=3, coin=3:
  j=1: dp[3][1] = dp[2][1] = 1 (can't use coin 3, j < 3)
  j=2: dp[3][2] = dp[2][2] = 1 (can't use coin 3, j < 3)
  j=3: dp[3][3] = min(dp[2][3], 1+dp[3][0]) = min(2, 1+0) = 1
  j=4: dp[3][4] = min(dp[2][4], 1+dp[3][1]) = min(2, 1+1) = 2

Final DP table:
dp = [
  [0, ∞, ∞, ∞, ∞],
  [0, 1, 2, 3, 4],
  [0, 1, 1, 2, 2],
  [0, 1, 1, 1, 2]  // Using coins 1,2,3
]

🏆 Result: dp[3][4] = 2

✅ Minimum coins needed = 2 (using [2, 2] or [1, 3])

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Bottom-Up DP
- Build solution from smaller sums to larger sums
- dp[i][j] = minimum coins to make sum j using first i coins
- For each coin and sum, try: don't use coin or use coin
- Take minimum of both options

Algorithm Steps (2D DP):
1. Initialize dp table with Infinity
2. Set base cases: dp[i][0] = 0, dp[0][j] = Infinity
3. For each coin i from 1 to n:
   a. For each sum j from 1 to sum:
      - Option 1: Don't use coin → dp[i-1][j]
      - Option 2: Use coin (if j >= coin) → 1 + dp[i][j-coin]
      - Take minimum
4. Return dp[n][sum]

Why Stay in Same Row When Using Coin?
- Coins are unlimited (can reuse same coin)
- When we use coin i, we can still use it again
- So we stay in row i (not i-1) when using coin i
- This is the key difference from bounded knapsack

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Outer loop: n iterations (number of coins)
- Inner loop: sum iterations (target sum)
- Each iteration: O(1) operations
- Total: O(n × sum)

🎯 SPACE COMPLEXITY ANALYSIS:
- 2D DP: O(n × sum) for dp table
- 1D DP: O(sum) for dp array (space optimized)
- No additional space needed
- Total: O(n × sum) or O(sum) depending on implementation

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Sum = 0
Input: coins = [1, 2, 3], sum = 0
dp[i][0] = 0 for all i
return 0 ✓

CASE 2: Not Possible
Input: coins = [5, 10], sum = 3
All dp[0][j] = Infinity for j > 0
dp[1][3] = Infinity (can't use coin 5)
dp[2][3] = Infinity (can't use coin 10)
return -1 ✓

CASE 3: Exact Match
Input: coins = [5], sum = 5
dp[1][5] = min(dp[0][5], 1+dp[1][0]) = min(∞, 1+0) = 1
return 1 ✓

CASE 4: Multiple Valid Options
Input: coins = [1, 2, 3], sum = 4
Try all combinations, take minimum
return 2 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Minimum coins for sum j depends on minimum coins for j - coin_value
   - Optimal solution contains optimal solutions to subproblems
   - Try all options and take minimum

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are solved only once
   - Results stored in DP table
   - No recalculation needed

3️⃣ BOTTOM-UP CONSTRUCTION:
   - Solve smaller sums first
   - Use results to solve larger sums
   - Guarantees all dependencies are available

4️⃣ CORRECTNESS:
   - Base cases handle edge cases correctly
   - Invalid states remain Infinity
   - Valid states compute minimum correctly

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Tries all possible coin combinations: ✓
- Takes minimum at each step: ✓
- Handles invalid cases correctly: ✓
- Base cases are correct: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

2D DP (minCoins):
Line 4-7: Initialize 2D DP table
  - Create array of size n+1
  - Each row has sum+1 elements
  - Fill with Infinity initially

Line 10-12: Set base case (sum = 0)
  - dp[i][0] = 0 for all i

Line 15-17: Set base case (no coins)
  - dp[0][j] = Infinity for j > 0

Line 19-29: Build DP table
  - For each coin and sum
  - Try don't use coin (dp[i-1][j])
  - Try use coin (1 + dp[i][j-coin])
  - Take minimum

1D DP (minCoins2):
Line 38: Initialize 1D DP array
  - Create array of size sum+1
  - Fill with Infinity

Line 40: Set base case
  - dp[0] = 0

Line 42-46: Build DP array
  - For each coin
  - For each sum >= coin value
  - Update dp[j] = min(dp[j], 1 + dp[j-coin])

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Making change (minimum coins for payment)
- Vending machines
- Currency exchange
- Resource allocation
- Optimization problems
- Greedy algorithm verification

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Minimum Coins (this problem)
- Coin Change (Count Ways) - similar but counts ways
- Coin Change II
- Unbounded Knapsack
- Rod Cutting

─────────────────────────────────────────

🎯 TESTING STRATEGY:
- Sum = 0 (should return 0)
- Not possible (should return -1)
- Multiple valid options
- Single coin type
- Large values
- Edge values (sum = 0, 1, 2)

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print dp table after each iteration
- Verify base cases (dp[i][0] = 0)
- Check if coin can be used (j >= coin)
- Verify minimum calculation
- Check if Infinity is handled correctly
- Trace through small examples manually

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Forgetting to add 1 when using coin
- Using wrong row index (should stay in same row for unlimited)
- Not initializing with Infinity
- Wrong base case (dp[i][0] should be 0, not Infinity)
- Not checking if j >= coin before using coin

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Initialize with Infinity (invalid state)
- Set base cases clearly (dp[i][0] = 0)
- Check validity before using coin (j >= coin)
- Take minimum of all valid options
- Handle Infinity correctly (convert to -1)

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the DP approach clearly
- Walk through a small example
- Discuss time and space complexity
- Mention space optimization (1D DP)
- Compare with recursive approach
- Handle edge cases
- Explain why we stay in same row (unlimited supply)

─────────────────────────────────────────

🎯 COMPARISON: minCoins vs minCoins2

Both functions solve the same problem but use different space complexities:

APPROACH 1: minCoins (2D DP)
- Space: O(n × sum) - stores all coin combinations
- Structure: dp[i][j] = min coins using first i coins for sum j
- Pros: Clear structure, easy to understand, can track which coins used
- Cons: More memory usage
- When to use: When you need to track coin usage or understand the structure

APPROACH 2: minCoins2 (1D DP - Space Optimized)
- Space: O(sum) - only stores current state
- Structure: dp[j] = min coins for sum j
- Pros: Less memory, same time complexity
- Cons: Can't easily track which coins were used
- When to use: When space is a concern or you only need the answer

KEY DIFFERENCES:

1️⃣ SPACE COMPLEXITY:
   minCoins: O(n × sum) - 2D table
   minCoins2: O(sum) - 1D array

2️⃣ ITERATION ORDER:
   minCoins: For each coin, for each sum
   minCoins2: For each coin, for each sum >= coin

3️⃣ STATE TRACKING:
   minCoins: Tracks which coins are available
   minCoins2: Only tracks current best for each sum

4️⃣ MEMORY USAGE:
   minCoins: More memory (n × sum elements)
   minCoins2: Less memory (sum elements)

5️⃣ COMPLEXITY:
   Both: O(n × sum) time, but different space

WHICH ONE TO USE?

Use minCoins (2D) when:
- You need to understand the structure
- You want to track which coins are used
- Space is not a concern
- Learning DP concepts

Use minCoins2 (1D) when:
- Space is a concern
- You only need the answer
- Production code with large inputs
- Memory optimization is important

Both are correct and solve the same problem!

─────────────────────────────────────────

🎯 COMPARISON WITH RECURSIVE APPROACH:

Plain Recursion (See 01_plain_recursion.js):
- Time: O(2^n) exponential
- Space: O(n) recursion stack
- Recalculates same subproblems
- Very slow for large inputs

DP Tabulation (This solution):
- Time: O(n × sum) polynomial
- Space: O(n × sum) or O(sum)
- Each subproblem solved once
- Much faster and efficient

Improvement:
- Time: From O(2^n) to O(n × sum) - massive improvement
- Space: From O(n) to O(n × sum) or O(sum) - trade-off for speed

─────────────────────────────────────────

🎯 KEY INSIGHTS:

1️⃣ UNLIMITED SUPPLY:
   - Coins can be reused
   - When using coin, stay in same row (not previous row)
   - This is key difference from bounded knapsack

2️⃣ BOTTOM-UP APPROACH:
   - Build from smaller sums to larger sums
   - Use results of smaller subproblems
   - Guarantees optimal solution

3️⃣ SPACE OPTIMIZATION:
   - Only need current row, not all rows
   - Can use 1D array instead of 2D
   - Reduces space from O(n × sum) to O(sum)

4️⃣ BASE CASES:
   - dp[i][0] = 0 (0 coins for sum 0)
   - dp[0][j] = Infinity (impossible with no coins)

─────────────────────────────────────────

🎯 CONCLUSION:
Minimum Coins using DP Tabulation efficiently finds the minimum number of coins
needed by building a DP table bottom-up, trying all coin options at each sum,
taking the minimum of valid options, and handling unlimited coin supply correctly.
This achieves O(n × sum) time complexity, a massive improvement over the
exponential recursive approach!

Two implementations are provided:
1. minCoins: 2D DP approach (O(n × sum) space) - clearer structure
2. minCoins2: 1D DP approach (O(sum) space) - space optimized

Both solve the same problem with the same time complexity - choose based on your
space requirements!
*/