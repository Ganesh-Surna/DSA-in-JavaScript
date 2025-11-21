/* Problem: ✅✅✅✅ 0-1 Knapsack (DP Tabulation) ✅✅✅✅

Given `n` items, each with a weight `weights[i]` and a value `values[i]`, and a
knapsack with capacity `capacity`, find the maximum value that can be obtained
by selecting items such that the total weight does not exceed the capacity.
Each item can be taken at most once (0-1 means either take it or don't).

🎯 Goal: Maximize the total value while staying within the weight capacity.

Example 1:
Input: weights = [5, 4, 6, 3], values = [10, 40, 30, 50], capacity = 10
Output: 90
Explanation: Maximum value is 90:
  - Select items with weights [4, 3] → values [40, 50]
  - Total weight: 4 + 3 = 7 ≤ 10 ✓
  - Total value: 40 + 50 = 90

Example 2:
Input: weights = [10, 20, 30], values = [60, 100, 120], capacity = 50
Output: 220
Explanation: Maximum value is 220:
  - Select items with weights [20, 30] → values [100, 120]
  - Total weight: 20 + 30 = 50 ≤ 50 ✓
  - Total value: 100 + 120 = 220

Example 3:
Input: weights = [2, 3, 4, 5], values = [3, 4, 5, 6], capacity = 5
Output: 7
Explanation: Maximum value is 7:
  - Select items with weights [2, 3] → values [3, 4]
  - Total weight: 2 + 3 = 5 ≤ 5 ✓
  - Total value: 3 + 4 = 7

Constraints:
- 1 ≤ n ≤ 100
- 1 ≤ weights[i] ≤ 1000
- 1 ≤ values[i] ≤ 1000
- 1 ≤ capacity ≤ 1000

Expected Complexities:
Time Complexity: O(n × capacity) where n = number of items
Space Complexity: O(n × capacity) for the DP table

⚠️ Note: This is the optimized DP Tabulation solution. For the plain recursive
approach with exponential time complexity, see 01_plain_recursion.js.

🧠 Core Idea:
- Use dynamic programming to build solution bottom-up
- dp[i][j] = maximum value using first i items with capacity j
- For each item and each capacity, try: exclude item OR include item (if possible)
- Take maximum of both options
- Base case: dp[i][0] = 0 (no capacity) and dp[0][j] = 0 (no items)

📈 Recurrence Relation:
  dp[i][0] = 0  // Base case: no capacity, no value
  dp[0][j] = 0  // Base case: no items, no value
  
  For each i from 1 to n, j from 1 to capacity:
      dp[i][j] = dp[i-1][j]  // Option 1: Exclude item i-1
      
      if j >= weights[i-1]:
          dp[i][j] = max(dp[i][j], values[i-1] + dp[i-1][j - weights[i-1]])
          // Option 2: Include item i-1
          // Note: Use dp[i-1] (previous row) because item can't be reused (0-1)
  
  Answer = dp[n][capacity]

Base Cases:
- dp[i][0] = 0 (no capacity, no value)
- dp[0][j] = 0 (no items, no value)

🎯 Why This Approach?
- Optimal substructure: Maximum value for capacity j depends on maximum value
  for smaller capacities (j - weight).
- Overlapping subproblems: Avoids recalculating the same subproblems.
- Tabulation builds solution iteratively from smaller to larger capacities.
- Guarantees optimal solution by exploring all item and capacity combinations.

💡 Key Insights:
- dp[i][j] = maximum value using first i items with capacity j
- Try both options: exclude item or include item
- Take maximum of both options
- When including: use dp[i-1] (previous row) because item can't be reused (0-1)
- This is key difference from unbounded knapsack (which uses dp[i])
*/

// ✅ TC = O(n × capacity) where n = number of items, capacity = knapsack capacity
// ✅ SC = O(n × capacity) for 2D DP table
function knapsack(weights, values, capacity){
    let n=weights.length
    
    // Initialize 2D DP table: dp[i][j] = max value using first i items with capacity j
    let dp = new Array(n+1)
    for(let i=0; i<n+1; i++){
        dp[i] = new Array(capacity+1).fill(0)
    }
    
    // Base case: if capacity = 0, then 0 (no capacity means no value)
    for(let i=0; i<n+1; i++){
        dp[i][0]=0
    }
    
    // Base case: if n=0, then 0 (no items means no value)
    for(let j=0; j<capacity+1; j++){
        dp[0][j]=0
    }
    
    // Build DP table: for each item and each capacity
    for(let i=1; i<n+1; i++){
        for(let j=1; j<capacity+1; j++){
            // Option 1: Exclude item i-1 (don't take the current item)
            dp[i][j] = dp[i-1][j]
            
            // Option 2: Include item i-1 (if it fits in current capacity)
            if(j >= weights[i-1]){
                // Include item i-1: add its value and use previous row (i-1) because
                // item can't be reused in 0-1 knapsack
                dp[i][j]=Math.max(dp[i][j], values[i-1] + dp[i-1][j-weights[i-1]])
            }
        }
    }
    
    // dp[n][capacity] contains maximum value using all n items with given capacity
    return dp[n][capacity]
}

console.log(knapsack([5, 4, 6, 3], [10, 40, 30, 50], 10)) // 90 --> weights: [4, 3] (value: 40+50 = 90)
console.log(knapsack([10, 20, 30], [60, 100, 120], 50)) // 220 --> weights: [20, 30] (value: 100+120 = 220)
console.log(knapsack([2, 3, 4, 5], [3, 4, 5, 6], 5)) // 7 --> weights: [2, 3] (value: 3+4 = 7)
console.log(knapsack([1, 2, 3, 4], [10, 20, 30, 40], 5)) // 50 --> weights: [2, 3] (value: 20+30 = 50)



/*🎯 STEP-BY-STEP WALKTHROUGH (weights = [5, 4, 6, 3], values = [10, 40, 30, 50], capacity = 10)

We'll build a DP table where dp[i][j] represents the maximum value that can be
obtained using the first i items with capacity j.

Initialization:
n = 4, capacity = 10

Initialize DP table:
dp = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // i=0: no items
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // i=1: can use item 0
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // i=2: can use items 0,1
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // i=3: can use items 0,1,2
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]   // i=4: can use items 0,1,2,3
]
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  (capacities)

Base cases:
- dp[i][0] = 0 for all i (no capacity)
- dp[0][j] = 0 for all j (no items)

Processing:

i=1, item: weight=5, value=10
  j=1: weight 5 > 1, can't include → dp[1][1] = dp[0][1] = 0
  j=2: weight 5 > 2, can't include → dp[1][2] = dp[0][2] = 0
  j=3: weight 5 > 3, can't include → dp[1][3] = dp[0][3] = 0
  j=4: weight 5 > 4, can't include → dp[1][4] = dp[0][4] = 0
  j=5: weight 5 <= 5, can include → dp[1][5] = max(dp[0][5], 10 + dp[0][0]) = max(0, 10) = 10
  j=6: weight 5 <= 6, can include → dp[1][6] = max(dp[0][6], 10 + dp[0][1]) = max(0, 10) = 10
  j=7: weight 5 <= 7, can include → dp[1][7] = max(dp[0][7], 10 + dp[0][2]) = max(0, 10) = 10
  j=8: weight 5 <= 8, can include → dp[1][8] = max(dp[0][8], 10 + dp[0][3]) = max(0, 10) = 10
  j=9: weight 5 <= 9, can include → dp[1][9] = max(dp[0][9], 10 + dp[0][4]) = max(0, 10) = 10
  j=10: weight 5 <= 10, can include → dp[1][10] = max(dp[0][10], 10 + dp[0][5]) = max(0, 10) = 10

dp[1] = [0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10]

i=2, item: weight=4, value=40
  j=1: weight 4 > 1, can't include → dp[2][1] = dp[1][1] = 0
  j=2: weight 4 > 2, can't include → dp[2][2] = dp[1][2] = 0
  j=3: weight 4 > 3, can't include → dp[2][3] = dp[1][3] = 0
  j=4: weight 4 <= 4, can include → dp[2][4] = max(dp[1][4], 40 + dp[1][0]) = max(0, 40) = 40
  j=5: weight 4 <= 5, can include → dp[2][5] = max(dp[1][5], 40 + dp[1][1]) = max(10, 40) = 40
  j=6: weight 4 <= 6, can include → dp[2][6] = max(dp[1][6], 40 + dp[1][2]) = max(10, 40) = 40
  j=7: weight 4 <= 7, can include → dp[2][7] = max(dp[1][7], 40 + dp[1][3]) = max(10, 40) = 40
  j=8: weight 4 <= 8, can include → dp[2][8] = max(dp[1][8], 40 + dp[1][4]) = max(10, 40) = 40
  j=9: weight 4 <= 9, can include → dp[2][9] = max(dp[1][9], 40 + dp[1][5]) = max(10, 50) = 50
  j=10: weight 4 <= 10, can include → dp[2][10] = max(dp[1][10], 40 + dp[1][6]) = max(10, 50) = 50

dp[2] = [0, 0, 0, 0, 40, 40, 40, 40, 40, 50, 50]

i=3, item: weight=6, value=30
  j=1-5: weight 6 > j, can't include → dp[3][j] = dp[2][j]
  j=6: weight 6 <= 6, can include → dp[3][6] = max(dp[2][6], 30 + dp[2][0]) = max(40, 30) = 40
  j=7: weight 6 <= 7, can include → dp[3][7] = max(dp[2][7], 30 + dp[2][1]) = max(40, 30) = 40
  j=8: weight 6 <= 8, can include → dp[3][8] = max(dp[2][8], 30 + dp[2][2]) = max(40, 30) = 40
  j=9: weight 6 <= 9, can include → dp[3][9] = max(dp[2][9], 30 + dp[2][3]) = max(50, 30) = 50
  j=10: weight 6 <= 10, can include → dp[3][10] = max(dp[2][10], 30 + dp[2][4]) = max(50, 70) = 70

dp[3] = [0, 0, 0, 0, 40, 40, 40, 40, 40, 50, 70]

i=4, item: weight=3, value=50
  j=1-2: weight 3 > j, can't include → dp[4][j] = dp[3][j]
  j=3: weight 3 <= 3, can include → dp[4][3] = max(dp[3][3], 50 + dp[3][0]) = max(0, 50) = 50
  j=4: weight 3 <= 4, can include → dp[4][4] = max(dp[3][4], 50 + dp[3][1]) = max(40, 50) = 50
  j=5: weight 3 <= 5, can include → dp[4][5] = max(dp[3][5], 50 + dp[3][2]) = max(40, 50) = 50
  j=6: weight 3 <= 6, can include → dp[4][6] = max(dp[3][6], 50 + dp[3][3]) = max(40, 50) = 50
  j=7: weight 3 <= 7, can include → dp[4][7] = max(dp[3][7], 50 + dp[3][4]) = max(40, 90) = 90
  j=8: weight 3 <= 8, can include → dp[4][8] = max(dp[3][8], 50 + dp[3][5]) = max(40, 90) = 90
  j=9: weight 3 <= 9, can include → dp[4][9] = max(dp[3][9], 50 + dp[3][6]) = max(50, 90) = 90
  j=10: weight 3 <= 10, can include → dp[4][10] = max(dp[3][10], 50 + dp[3][7]) = max(70, 90) = 90

Final DP table:
dp[4] = [0, 0, 0, 50, 50, 50, 50, 90, 90, 90, 90]

🏆 Result: dp[4][10] = 90

✅ Maximum value = 90 (select items with weights [4, 3], values [40, 50])

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Bottom-Up DP
- Build solution from smaller capacities to larger capacities
- dp[i][j] = maximum value using first i items with capacity j
- For each item and capacity, try: exclude item or include item
- Take maximum of both options

Algorithm Steps:
1. Initialize dp table with 0
2. Set base cases: dp[i][0] = 0, dp[0][j] = 0
3. For each item i from 1 to n:
   a. For each capacity j from 1 to capacity:
      - Option 1: Exclude item → dp[i-1][j]
      - Option 2: Include item (if j >= weight) → values[i-1] + dp[i-1][j-weight]
      - Take maximum
4. Return dp[n][capacity]

Why Use dp[i-1] When Including?
- In 0-1 knapsack, each item can be taken at most once
- When we include item i-1, we've used it
- So we look at dp[i-1][j-weight] (previous row, previous items)
- This ensures we don't use the same item twice
- Key difference from unbounded knapsack (which uses dp[i][j-weight])

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Outer loop: n iterations (items 1 to n)
- Inner loop: capacity iterations (capacities 1 to capacity)
- Each iteration: O(1) operations
- Total: O(n × capacity)

🎯 SPACE COMPLEXITY ANALYSIS:
- DP table: O(n × capacity)
- No additional space needed
- Total: O(n × capacity)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: No Items or No Capacity
Input: weights = [], values = [], capacity = 10
dp[0][10] = 0 ✓

CASE 2: All Items Too Heavy
Input: weights = [20, 30, 40], values = [10, 20, 30], capacity = 10
All items have weight > capacity
dp[3][10] = 0 ✓

CASE 3: Can Take All Items
Input: weights = [1, 2, 3], values = [10, 20, 30], capacity = 10
All items fit
dp[3][10] = 10 + 20 + 30 = 60 ✓

CASE 4: Optimal Selection
Input: weights = [5, 4, 6, 3], values = [10, 40, 30, 50], capacity = 10
Need to select best combination
dp[4][10] = 90 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Maximum value for capacity j depends on maximum value for j - weight
   - Optimal solution contains optimal solutions to subproblems
   - Try all options and take maximum

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are solved only once
   - Results stored in DP table
   - No recalculation needed

3️⃣ BOTTOM-UP CONSTRUCTION:
   - Solve smaller capacities first
   - Use results to solve larger capacities
   - Guarantees all dependencies are available

4️⃣ CORRECTNESS:
   - Base cases handle edge cases correctly
   - Invalid states (weight > capacity) are handled
   - Valid states compute maximum correctly

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Tries all possible item combinations: ✓
- Takes maximum at each step: ✓
- Handles invalid cases correctly: ✓
- Base cases are correct: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 4-7: Initialize DP table
  - Create 2D array of size (n+1) × (capacity+1)
  - Fill with 0 initially

Line 10-12: Set base case (no capacity)
  - dp[i][0] = 0 for all i

Line 14-16: Set base case (no items)
  - dp[0][j] = 0 for all j

Line 18-28: Build DP table
  - For each item i from 1 to n
  - For each capacity j from 1 to capacity
  - Try exclude (dp[i-1][j])
  - Try include (if j >= weight)
  - Take maximum

Line 30: Return result
  - dp[n][capacity] contains maximum value

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Resource allocation (budget optimization)
- Investment portfolio selection
- Cutting stock problem
- Resource scheduling
- Load balancing
- Network packet selection
- Memory allocation

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- 0-1 Knapsack (this problem)
- Unbounded Knapsack (items can be reused)
- Fractional Knapsack (greedy solution)
- Subset Sum
- Partition Equal Subset Sum
- Target Sum
- Coin Change (similar structure)

─────────────────────────────────────────

🎯 TESTING STRATEGY:
- No items or no capacity
- All items too heavy
- Can take all items
- Optimal selection needed
- Large values
- Edge values (single item, two items)

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print dp table after each iteration
- Verify base cases (dp[i][0] = 0, dp[0][j] = 0)
- Check if item can fit (j >= weight)
- Verify maximum calculation
- Trace through small examples manually
- Verify using dp[i-1] when including (0-1 constraint)

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Forgetting to add item value when including
- Not reducing capacity correctly
- Using wrong row index (should use i-1, not i)
- Wrong base case (returning 1 instead of 0)
- Not handling weight > capacity case
- Confusing with unbounded knapsack (using dp[i] instead of dp[i-1])

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Initialize with 0 (base case value)
- Set base cases clearly (dp[i][0] = 0, dp[0][j] = 0)
- Check if item can fit before including
- Take maximum of all valid options
- Use dp[i-1] when including (0-1 constraint)

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the DP approach clearly
- Walk through a small example
- Discuss time and space complexity
- Mention space optimization possibility
- Compare with recursive approach
- Handle edge cases
- Explain why dp[i-1] is used (0-1 constraint)

─────────────────────────────────────────

🎯 COMPARISON WITH RECURSIVE APPROACH:

Plain Recursion (See 01_plain_recursion.js):
- Time: O(2^n) exponential
- Space: O(n) recursion stack
- Recalculates same subproblems
- Very slow for large inputs

DP Tabulation (This solution):
- Time: O(n × capacity) polynomial
- Space: O(n × capacity) for DP table
- Each subproblem solved once
- Much faster and efficient

Improvement:
- Time: From O(2^n) to O(n × capacity) - massive improvement
- Space: From O(n) to O(n × capacity) - trade-off for speed

─────────────────────────────────────────

🎯 COMPARISON WITH UNBOUNDED KNAPSACK:

⚠️ IMPORTANT: Don't confuse 0-1 Knapsack with Unbounded Knapsack!

0-1 KNAPSACK (This Problem):
- Each item can be taken at most once
- When including: use dp[i-1][j-weight] (previous row)
- Recurrence: max(dp[i-1][j], values[i-1] + dp[i-1][j-weight])
- Example: Can't take same item twice

UNBOUNDED KNAPSACK:
- Each item can be taken unlimited times
- When including: use dp[i][j-weight] (same row)
- Recurrence: max(dp[i-1][j], values[i-1] + dp[i][j-weight])
- Example: Can take same item multiple times

KEY DIFFERENCE:
- 0-1: dp[i-1][j-weight] when including (item used, move to previous row)
- Unbounded: dp[i][j-weight] when including (item can be reused, stay in same row)

─────────────────────────────────────────

🎯 KEY INSIGHTS:

1️⃣ 0-1 CONSTRAINT:
   - Each item can be taken at most once
   - When including item, use dp[i-1] (previous row)
   - This ensures item is not reused
   - Key difference from unbounded knapsack

2️⃣ BOTTOM-UP APPROACH:
   - Build from smaller capacities to larger capacities
   - Use results of smaller subproblems
   - Guarantees optimal solution

3️⃣ TWO OPTIONS:
   - Exclude item: dp[i-1][j] (don't use item, keep capacity)
   - Include item: values[i-1] + dp[i-1][j-weight] (use item, reduce capacity)
   - Take maximum

4️⃣ BASE CASES:
   - dp[i][0] = 0 (no capacity, no value)
   - dp[0][j] = 0 (no items, no value)

─────────────────────────────────────────

🎯 SPACE OPTIMIZATION NOTE:

The current implementation uses O(n × capacity) space. This can be optimized to
O(capacity) space by using a 1D array and iterating backwards:

```javascript
let dp = new Array(capacity+1).fill(0)
for(let i=1; i<=n; i++){
    for(let j=capacity; j>=weights[i-1]; j--){  // Iterate backwards
        dp[j] = Math.max(dp[j], values[i-1] + dp[j-weights[i-1]])
    }
}
```

Why iterate backwards?
- When we include an item, we need values from smaller capacities
- Iterating backwards ensures we don't overwrite values we need
- This reduces space from O(n × capacity) to O(capacity)

─────────────────────────────────────────

🎯 VARIABLE NAMING:
- `weights`: Array of item weights
- `values`: Array of item values
- `capacity`: Maximum weight capacity of knapsack
- `n`: Number of items
- `dp[i][j]`: Maximum value using first i items with capacity j
- `i`: Current item index (1 to n)
- `j`: Current capacity (1 to capacity)

─────────────────────────────────────────

🎯 CONCLUSION:
0-1 Knapsack using DP Tabulation efficiently finds the maximum value by building
a DP table bottom-up, trying both options (include item or exclude item) at each
step, taking the maximum, and handling the 0-1 constraint correctly (using dp[i-1]
when including). This achieves O(n × capacity) time complexity, a massive
improvement over the exponential recursive approach!
*/