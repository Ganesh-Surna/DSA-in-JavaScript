/* Problem: ✅✅✅✅ Coin Change — Count Ways (DP Tabulation) ✅✅✅✅

Given an array of coins `coins` and a target sum `sum`, find the total number
of ways to make the sum using the given coins. You can use each coin unlimited
number of times (coins are available in infinite supply).

🎯 Goal: Count all possible ways to make the target sum using the given coins.

Example 1:
Input: coins = [1, 2, 3], sum = 4
Output: 4
Explanation: There are 4 ways to make sum 4:
  1. {1, 1, 1, 1} → 1+1+1+1 = 4
  2. {1, 1, 2} → 1+1+2 = 4
  3. {2, 2} → 2+2 = 4
  4. {1, 3} → 1+3 = 4

Example 2:
Input: coins = [2, 3, 5, 6], sum = 10
Output: 5
Explanation: There are 5 ways to make sum 10:
  1. {2, 2, 2, 2, 2} → 2+2+2+2+2 = 10
  2. {2, 2, 3, 3} → 2+2+3+3 = 10
  3. {2, 2, 6} → 2+2+6 = 10
  4. {2, 3, 5} → 2+3+5 = 10
  5. {5, 5} → 5+5 = 10

Example 3:
Input: coins = [2, 3, 5, 6], sum = 20
Output: 21
Explanation: There are 21 different ways to make sum 20.

Example 4:
Input: coins = [1, 2], sum = 0
Output: 1
Explanation: There is 1 way to make sum 0: use no coins (empty set).

Example 5:
Input: coins = [5, 10], sum = 3
Output: 0
Explanation: It's impossible to make sum 3 with coins 5 and 10.

Constraints:
- 1 ≤ coins.length ≤ 300
- 1 ≤ coins[i] ≤ 5000
- 0 ≤ sum ≤ 5000
- All coins are distinct

Expected Complexities:
Time Complexity: O(n × sum) where n = coins.length
Space Complexity: O(n × sum) for the DP table

🧠 Core Idea:
- Use dynamic programming with a 2D table `dp[i][j]` representing the number
  of ways to make sum `j` using the first `i` coins.
- For each coin, we have two choices: include it or exclude it.
- If we include a coin, we can use it again (unlimited supply), so we stay
  at the same row `i` but reduce the sum by the coin value.
- If we exclude a coin, we move to the previous row `i-1` with the same sum.
- Build the table bottom-up, filling it from smaller subproblems to larger ones.

📈 Recurrence Relation:
  if coins[i-1] > j:
      dp[i][j] = dp[i-1][j]  // Coin value > sum, can't include → exclude only
  else:
      dp[i][j] = dp[i][j-coins[i-1]] + dp[i-1][j]
      // Include: dp[i][j-coins[i-1]] → use coin again (unlimited supply)
      // Exclude: dp[i-1][j] → don't use this coin

Base Cases:
- dp[i][0] = 1  // One way to make sum 0: use no coins (empty set)
- dp[0][j] = 0  // No coins available, can't make any sum > 0

🎯 Why This Approach?
- Optimal substructure: The number of ways to make sum `j` depends on ways to
  make smaller sums.
- Overlapping subproblems: The recursive solution recalculates the same
  subproblems multiple times.
- Tabulation avoids recursion overhead and builds solution iteratively.
- Handles unlimited coin supply correctly by allowing reuse of coins.

💡 Key Insights:
- dp[i][j] represents ways to make sum j using first i coins
- When including a coin, we can use it again → stay at row i
- When excluding a coin, we move to previous row i-1
- Base case: sum 0 can always be made in 1 way (empty set)
- If coin value > sum, we must exclude it
*/

// ✅ TC = O(n × sum) where n = coins.length
// ✅ SC = O(n × sum) for the DP table
function countCoinChangeWays(coins, sum){
    let n = coins.length
    
    // Create DP table: dp[i][j] = ways to make sum j using first i coins
    let dp = new Array(n+1)
    for(let i=0; i<n+1; i++){
        dp[i] = new Array(sum+1).fill(0)
    }
    
    // Base Case 1: If sum = 0, there is 1 way (use no coins - empty set)
    // dp[i][0] = 1 for all i (can always make sum 0 with any coin set)
    for(let i=0; i<n+1; i++){
        dp[i][0] = 1
    }
    
    // Base Case 2: If n = 0 (no coins) && sum > 0, there are 0 ways
    // dp[0][j] = 0 for all j > 0 (can't make any sum without coins)
    for(let j=1; j<sum+1; j++){
        dp[0][j] = 0
    }
    
    // Fill the DP table bottom-up
    for(let i=1; i<n+1; i++){
        for(let j=1; j<sum+1; j++){
            if(coins[i-1] > j){
                // Coin value > current sum: can't include this coin
                // Only option is to exclude it → use previous row
                dp[i][j] = dp[i-1][j]  // Exclude coin: ways using first i-1 coins
            }else{
                // Coin value ≤ current sum: can include or exclude
                // Include: dp[i][j-coins[i-1]] → use coin (can reuse, so stay at row i)
                // Exclude: dp[i-1][j] → don't use coin (move to row i-1)
                dp[i][j] = dp[i][j-coins[i-1]] + dp[i-1][j]
            }
        }
    }
    
    return dp[n][sum]  // dp[n][sum] = ways to make sum using all n coins
}

console.log(countCoinChangeWays([1, 2, 3], 4)) // 4
console.log(countCoinChangeWays([2, 3, 5, 6], 10)) // 5
console.log(countCoinChangeWays([2, 3, 5, 6], 20)) // 21

/*🎯 STEP-BY-STEP WALKTHROUGH (coins = [1, 2, 3], sum = 4)

We'll build a DP table where dp[i][j] represents the number of ways to make
sum j using the first i coins.

Initialization:
n = 3 (number of coins)
coins = [1, 2, 3]
sum = 4

DP Table Structure:
        sum:  0  1  2  3  4
coins:
    []    [1,  ?, ?, ?, ?]
    [1]   [1,  ?, ?, ?, ?]
    [1,2] [1,  ?, ?, ?, ?]
    [1,2,3][1, ?, ?, ?, ?]

Base Cases (Row 0 and Column 0):
- dp[0][0] = 1 (empty set makes sum 0)
- dp[i][0] = 1 (can always make sum 0 with any coin set)
- dp[0][j] = 0 (no coins, can't make any sum > 0)

After Base Cases:
        sum:  0  1  2  3  4
coins:
    []    [1,  0, 0, 0, 0]
    [1]   [1,  ?, ?, ?, ?]
    [1,2] [1,  ?, ?, ?, ?]
    [1,2,3][1, ?, ?, ?, ?]

Filling the Table:

i=1, j=1: Consider coin 1, sum 1
  coins[0] = 1 ≤ 1 → can include
  dp[1][1] = dp[1][1-1] + dp[0][1]
           = dp[1][0] + dp[0][1]
           = 1 + 0 = 1
  Ways: {1}

        sum:  0  1  2  3  4
coins:
    []    [1,  0, 0, 0, 0]
    [1]   [1,  1, ?, ?, ?]
    [1,2] [1,  ?, ?, ?, ?]
    [1,2,3][1, ?, ?, ?, ?]

i=1, j=2: Consider coin 1, sum 2
  coins[0] = 1 ≤ 2 → can include
  dp[1][2] = dp[1][2-1] + dp[0][2]
           = dp[1][1] + dp[0][2]
           = 1 + 0 = 1
  Ways: {1, 1}

        sum:  0  1  2  3  4
coins:
    []    [1,  0, 0, 0, 0]
    [1]   [1,  1, 1, ?, ?]
    [1,2] [1,  ?, ?, ?, ?]
    [1,2,3][1, ?, ?, ?, ?]

i=1, j=3: Consider coin 1, sum 3
  coins[0] = 1 ≤ 3 → can include
  dp[1][3] = dp[1][3-1] + dp[0][3]
           = dp[1][2] + dp[0][3]
           = 1 + 0 = 1
  Ways: {1, 1, 1}

        sum:  0  1  2  3  4
coins:
    []    [1,  0, 0, 0, 0]
    [1]   [1,  1, 1, 1, ?]
    [1,2] [1,  ?, ?, ?, ?]
    [1,2,3][1, ?, ?, ?, ?]

i=1, j=4: Consider coin 1, sum 4
  coins[0] = 1 ≤ 4 → can include
  dp[1][4] = dp[1][4-1] + dp[0][4]
           = dp[1][3] + dp[0][4]
           = 1 + 0 = 1
  Ways: {1, 1, 1, 1}

        sum:  0  1  2  3  4
coins:
    []    [1,  0, 0, 0, 0]
    [1]   [1,  1, 1, 1, 1]
    [1,2] [1,  ?, ?, ?, ?]
    [1,2,3][1, ?, ?, ?, ?]

i=2, j=1: Consider coins [1,2], sum 1
  coins[1] = 2 > 1 → can't include coin 2
  dp[2][1] = dp[1][1] = 1
  Ways: {1} (same as using only coin 1)

        sum:  0  1  2  3  4
coins:
    []    [1,  0, 0, 0, 0]
    [1]   [1,  1, 1, 1, 1]
    [1,2] [1,  1, ?, ?, ?]
    [1,2,3][1, ?, ?, ?, ?]

i=2, j=2: Consider coins [1,2], sum 2
  coins[1] = 2 ≤ 2 → can include
  dp[2][2] = dp[2][2-2] + dp[1][2]
           = dp[2][0] + dp[1][2]
           = 1 + 1 = 2
  Ways: {1, 1} and {2}

        sum:  0  1  2  3  4
coins:
    []    [1,  0, 0, 0, 0]
    [1]   [1,  1, 1, 1, 1]
    [1,2] [1,  1, 2, ?, ?]
    [1,2,3][1, ?, ?, ?, ?]

i=2, j=3: Consider coins [1,2], sum 3
  coins[1] = 2 ≤ 3 → can include
  dp[2][3] = dp[2][3-2] + dp[1][3]
           = dp[2][1] + dp[1][3]
           = 1 + 1 = 2
  Ways: {1, 1, 1} and {1, 2}

        sum:  0  1  2  3  4
coins:
    []    [1,  0, 0, 0, 0]
    [1]   [1,  1, 1, 1, 1]
    [1,2] [1,  1, 2, 2, ?]
    [1,2,3][1, ?, ?, ?, ?]

i=2, j=4: Consider coins [1,2], sum 4
  coins[1] = 2 ≤ 4 → can include
  dp[2][4] = dp[2][4-2] + dp[1][4]
           = dp[2][2] + dp[1][4]
           = 2 + 1 = 3
  Ways: {1, 1, 1, 1}, {1, 1, 2}, and {2, 2}

        sum:  0  1  2  3  4
coins:
    []    [1,  0, 0, 0, 0]
    [1]   [1,  1, 1, 1, 1]
    [1,2] [1,  1, 2, 2, 3]
    [1,2,3][1, ?, ?, ?, ?]

i=3, j=1: Consider coins [1,2,3], sum 1
  coins[2] = 3 > 1 → can't include coin 3
  dp[3][1] = dp[2][1] = 1
  Ways: {1} (same as using coins [1,2])

        sum:  0  1  2  3  4
coins:
    []    [1,  0, 0, 0, 0]
    [1]   [1,  1, 1, 1, 1]
    [1,2] [1,  1, 2, 2, 3]
    [1,2,3][1, 1, ?, ?, ?]

i=3, j=2: Consider coins [1,2,3], sum 2
  coins[2] = 3 > 2 → can't include coin 3
  dp[3][2] = dp[2][2] = 2
  Ways: {1, 1} and {2} (same as using coins [1,2])

        sum:  0  1  2  3  4
coins:
    []    [1,  0, 0, 0, 0]
    [1]   [1,  1, 1, 1, 1]
    [1,2] [1,  1, 2, 2, 3]
    [1,2,3][1, 1, 2, ?, ?]

i=3, j=3: Consider coins [1,2,3], sum 3
  coins[2] = 3 ≤ 3 → can include
  dp[3][3] = dp[3][3-3] + dp[2][3]
           = dp[3][0] + dp[2][3]
           = 1 + 2 = 3
  Ways: {1, 1, 1}, {1, 2}, and {3}

        sum:  0  1  2  3  4
coins:
    []    [1,  0, 0, 0, 0]
    [1]   [1,  1, 1, 1, 1]
    [1,2] [1,  1, 2, 2, 3]
    [1,2,3][1, 1, 2, 3, ?]

i=3, j=4: Consider coins [1,2,3], sum 4
  coins[2] = 3 ≤ 4 → can include
  dp[3][4] = dp[3][4-3] + dp[2][4]
           = dp[3][1] + dp[2][4]
           = 1 + 3 = 4
  Ways: {1, 1, 1, 1}, {1, 1, 2}, {2, 2}, and {1, 3}

Final DP Table:
        sum:  0  1  2  3  4
coins:
    []    [1,  0, 0, 0, 0]
    [1]   [1,  1, 1, 1, 1]
    [1,2] [1,  1, 2, 2, 3]
    [1,2,3][1, 1, 2, 3, 4]

🏆 Result: dp[3][4] = 4

✅ There are 4 ways to make sum 4 using coins [1, 2, 3]:
  1. {1, 1, 1, 1}
  2. {1, 1, 2}
  3. {2, 2}
  4. {1, 3}

─────────────────────────────────────────

📊 UNDERSTANDING INCLUDE VS EXCLUDE:

1️⃣ INCLUDE COIN (dp[i][j-coins[i-1]]):
   - Use coin coins[i-1] in the solution
   - Since coins have unlimited supply, we can use it again
   - Stay at row i (same coin set available)
   - Reduce sum by coin value: j → j-coins[i-1]
   - Example: dp[2][4] includes coin 2 → dp[2][4-2] = dp[2][2]

2️⃣ EXCLUDE COIN (dp[i-1][j]):
   - Don't use coin coins[i-1] in the solution
   - Move to previous row i-1 (fewer coins available)
   - Keep same sum j
   - Example: dp[2][4] excludes coin 2 → dp[1][4]

3️⃣ WHEN COIN VALUE > SUM:
   - Can't include the coin (would exceed sum)
   - Must exclude it → dp[i][j] = dp[i-1][j]
   - Example: coin 3, sum 2 → dp[3][2] = dp[2][2]

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Outer loop: n iterations (number of coins)
- Inner loop: sum iterations (target sum)
- Each cell computation: O(1) (just comparisons and addition)
- Total: O(n × sum)

🎯 SPACE COMPLEXITY ANALYSIS:
- DP table: (n+1) × (sum+1) = O(n × sum)
- No additional space needed
- Total: O(n × sum)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Sum = 0
Input: coins = [1, 2, 3], sum = 0
dp[i][0] = 1 for all i
Output: 1 ✓ (empty set)

CASE 2: No Coins, Sum > 0
Input: coins = [], sum = 5
dp[0][5] = 0
Output: 0 ✓ (impossible without coins)

CASE 3: Impossible Sum
Input: coins = [5, 10], sum = 3
All coins > sum → all excluded
dp[2][3] = 0
Output: 0 ✓

CASE 4: Single Coin, Multiple Uses
Input: coins = [2], sum = 6
dp[1][6] = dp[1][4] = dp[1][2] = dp[1][0] = 1
Output: 1 ✓ (only way: {2, 2, 2})

CASE 5: All Coins Same Value
Input: coins = [1, 1, 1], sum = 3
All coins are 1, so effectively same as [1]
dp[3][3] = 1
Output: 1 ✓ (only way: {1, 1, 1})

─────────────────────────────────────────

🎯 WHY UNLIMITED SUPPLY MATTERS:

When we INCLUDE a coin:
- We use dp[i][j-coins[i-1]] (stay at row i)
- This allows reusing the same coin multiple times
- Example: coin 1 can be used as {1}, {1,1}, {1,1,1}, etc.

If coins had LIMITED supply:
- We would use dp[i-1][j-coins[i-1]] (move to row i-1)
- Each coin could only be used once
- This would be a different problem (0/1 Knapsack variant)

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Considers all possible combinations: ✓
- Handles unlimited coin supply correctly: ✓
- Optimal substructure: ✓
- Handles all base cases: ✓
- Counts all valid ways: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 4-7: Initialize DP table
  - Create (n+1) × (sum+1) table
  - Fill with 0s initially

Line 10-12: Base case - sum = 0
  - dp[i][0] = 1 (one way: empty set)

Line 16-18: Base case - no coins, sum > 0
  - dp[0][j] = 0 (impossible without coins)

Line 20-32: Fill DP table
  - If coin value > sum: exclude only
  - If coin value ≤ sum: include + exclude
  - Include: stay at row i, reduce sum
  - Exclude: move to row i-1, keep sum

Line 34: Return final answer
  - dp[n][sum] contains total ways using all coins

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Vending machines (making change)
- Payment systems (counting payment combinations)
- Cryptocurrency transactions
- Game development (scoring systems)
- Financial planning (investment combinations)
- Combinatorial counting problems

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Coin Change (this problem - count ways)
- Coin Change II (minimum coins)
- Combination Sum
- Combination Sum II
- Perfect Squares
- Integer Break

─────────────────────────────────────────

🎯 TESTING STRATEGY:
- Sum = 0 (should return 1)
- No coins (should return 0 for sum > 0)
- Impossible sum (all coins > sum)
- Single coin (multiple uses)
- All coins same value
- Large sum with small coins
- Large coins with small sum

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print DP table after each iteration
- Verify base cases are correct
- Check coin indexing (i-1 for coins array)
- Ensure include case stays at row i (unlimited supply)
- Trace through example manually
- Verify sum reduction: j-coins[i-1]

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Using dp[i-1][j-coins[i-1]] instead of dp[i][j-coins[i-1]] for include
  (forgetting unlimited supply allows reuse)
- Wrong base case for sum = 0 (should be 1, not 0)
- Off-by-one errors in indexing
- Not handling coin value > sum case
- Confusing with minimum coins problem

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Use descriptive variable names (n for coins, sum for target)
- Initialize base cases clearly
- Comment include vs exclude logic
- Test with edge cases first
- Verify with known examples
- Remember: include stays at same row (unlimited supply)

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the recurrence relation clearly
- Walk through a small example
- Discuss time and space complexity
- Mention unlimited vs limited supply difference
- Relate to real-world applications
- Compare with minimum coins variant

─────────────────────────────────────────

🎯 SPACE OPTIMIZATION POSSIBILITY:
Since we only need previous row to compute current row, we can optimize
space from O(n × sum) to O(sum) using a 1D array. However, for the include
case, we need to iterate from left to right (not right to left) because we
need dp[i][j-coins[i-1]] which is in the current row being filled.

Space-optimized version would use:
  dp[j] = dp[j-coins[i-1]] + dp[j]  (for j from coins[i-1] to sum)

─────────────────────────────────────────

🎯 KEY DIFFERENCE FROM MINIMUM COINS:
This problem: COUNT all ways to make sum
Minimum coins: FIND minimum number of coins to make sum

Recurrence for minimum coins:
  dp[i][j] = min(1 + dp[i][j-coins[i-1]], dp[i-1][j])

Recurrence for count ways (this problem):
  dp[i][j] = dp[i][j-coins[i-1]] + dp[i-1][j]

─────────────────────────────────────────

🎯 CONCLUSION:
Coin Change (Count Ways) using DP Tabulation efficiently counts all possible
ways to make a target sum using given coins with unlimited supply by building
a 2D table bottom-up, considering include and exclude choices at each step,
achieving O(n × sum) time and O(n × sum) space complexity!
*/