/* Problem: ✅✅✅✅ Minimum Coins to Make a Value (Plain Recursion) ✅✅✅✅

Given an array of coins `coins` and a target sum `sum`, find the minimum number
of coins needed to make the sum. You can use each coin unlimited number of
times (coins are available in infinite supply). Return Infinity if it's not
possible to make the sum.

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
  - Other options use more coins

Example 3:
Input: coins = [2, 3, 5, 6], sum = 20
Output: 4
Explanation: Minimum coins needed is 4:
  - Option 1: [5, 5, 5, 5] → 5 + 5 + 5 + 5 = 20 (4 coins)
  - Option 2: [2, 6, 6, 6] → 2 + 6 + 6 + 6 = 20 (4 coins)

Example 4:
Input: coins = [5, 10], sum = 3
Output: Infinity
Explanation: Cannot make sum 3 using coins 5 and 10 → return Infinity

Constraints:
- 1 ≤ coins.length ≤ 12
- 1 ≤ coins[i] ≤ 2^31
- 0 ≤ sum ≤ 10^4

Expected Complexities:
Time Complexity: O(2^n) exponential (worst case, without memoization)
Space Complexity: O(n) for recursion stack

⚠️ Note: This is a plain recursive solution with exponential time complexity.
For better performance, see the DP Tabulation solution in 03_DP_Tabulation.js.

🧠 Core Idea:
- For a sum `sum`, we have two choices for each coin: use it or don't use it.
- If we use a coin, reduce the sum by coin value and add 1 to coin count.
- If we don't use a coin, move to the next coin with the same sum.
- Take the minimum of both options.
- Base case: sum = 0 means we successfully made the sum (return 0 coins).
- Invalid case: sum < 0 or no coins left means impossible (return Infinity).

📈 Recurrence Relation:
  if sum === 0:
      return 0  // Base case: successfully made sum, 0 coins needed
  
  if n === 0 || sum < 0:
      return Infinity  // Invalid: no coins left or negative sum
  
  return min(
      minCoins(coins, sum - coins[n-1], n) + 1,  // Use coin: add 1 coin
      minCoins(coins, sum, n-1)                   // Don't use coin
  )

Base Cases:
- sum = 0: return 0 (successfully made sum, no coins needed)
- n = 0 or sum < 0: return Infinity (impossible to make sum)

🎯 Why This Approach?
- Optimal substructure: Minimum coins for sum depends on minimum coins for
  smaller sums (sum - coin_value).
- Overlapping subproblems: Same subproblems are recalculated multiple times.
- Recursive solution explores all possible coin combinations.
- Guarantees optimal solution by trying all options and taking minimum.

💡 Key Insights:
- Try both options: use coin or don't use coin
- Take minimum of the two options
- Add 1 when using a coin (we used one coin)
- Base case: sum = 0 means success (return 0)
- Invalid case: return Infinity (not possible)
- Coins can be reused (unlimited supply)
*/

// NOTE : See below --> 🎯 COMPARISON WITH COIN CHANGE (COUNT WAYS):
// ✅ TC = O(2^n) exponential (worst case, without memoization)
// ✅ SC = O(n) for recursion stack
function minCoins(coins, sum, n=coins.length){
    // Base case: Successfully made the sum - no coins needed
    if(sum === 0) return 0
    
    // Base case: Invalid - no coins left or negative sum
    if(n === 0 || sum < 0) return Infinity
    
    // Take the MINIMUM of the two options:
    // Option 1: Use the current coin
    // Option 2: Don't use the current coin
    return Math.min(
        minCoins(coins, sum-coins[n-1], n) + 1, // ⭐ +1 because we are using one coin
        minCoins(coins, sum, n-1) // not using the current coin
    )
}

/*─────────────────────────────────────────────────────────────────────────────
🎯 ALTERNATIVE IMPLEMENTATION: minCoins2 (Iterative Coin Selection)

This is an alternative recursive approach that uses a different strategy:
- Instead of tracking coin index `n`, it iterates through all coins
- For each coin, it tries using it and recursively solves for remaining sum
- Takes the minimum across all coin options
- More intuitive for some: "try every coin and pick the best"

Key Differences from minCoins:
1. No index parameter: Works directly with the sum
2. Iterative selection: Loops through all coins instead of binary choice
3. Same logic: Still tries all coins and takes minimum
4. Same complexity: O(2^n) exponential time, O(n) space

Variable Naming:
- `res`: Stores the best (minimum) result found so far
- `sub_res`: Stores the result from recursive call for remaining sum
- For each coin, we compute `sub_res` and update `res` with the minimum

When to use minCoins vs minCoins2:
- minCoins: When you want explicit "use/don't use" decision per coin
- minCoins2: When you prefer "try all coins" iterative approach
- Both solve the same problem with same complexity
─────────────────────────────────────────────────────────────────────────────*/

// ✅ TC = O(2^n) exponential (worst case, without memoization)
// ✅ SC = O(n) for recursion stack
function minCoins2(coins, sum) {
    // Base Case: exact sum achieved - no coins needed
    if (sum === 0) return 0;

    // Base Case: impossible (negative sum) - cannot make negative sum
    if (sum < 0) return Infinity;

    let res = Infinity;

    // Try every coin in the array
    for (let coin of coins) {
        // Take this coin and solve for remaining sum
        let sub_res = minCoins2(coins, sum - coin);

        // If we found a valid solution, update res
        if (sub_res !== Infinity) {
            res = Math.min(res, 1 + sub_res);  // +1 because we used one coin
        }
    }

    return res;
}


console.log(minCoins([1, 2, 3], 4)) // 2 --> [2, 2] or [1, 3]
console.log(minCoins([2, 3, 5, 6], 10)) // 2 --> [5, 5]
console.log(minCoins([2, 3, 5, 6], 20)) // 4 --> [5, 5, 5, 5] or [2, 6, 6, 6]
console.log(minCoins([2, 3, 5, 6], 25)) // 5 --> [5, 5, 5, 5, 5] or [3, 6, 6, 5, 5]



/*🎯 STEP-BY-STEP WALKTHROUGH (coins = [1, 2, 3], sum = 4)

We'll trace through the recursive calls to find minimum coins.

Initial call: minCoins([1, 2, 3], 4, 3)

minCoins([1, 2, 3], 4, 3):
  sum = 4, n = 3, coins[2] = 3
  Try two options:
    1. Use coin 3: minCoins([1, 2, 3], 4-3, 3) + 1 = minCoins([1, 2, 3], 1, 3) + 1
    2. Don't use coin 3: minCoins([1, 2, 3], 4, 2)
  res = min(option1, option2)

Let's compute each:

Option 1: Use coin 3
minCoins([1, 2, 3], 1, 3):
  sum = 1, n = 3, coins[2] = 3
  Try two options:
    1. Use coin 3: minCoins([1, 2, 3], 1-3, 3) + 1 = minCoins([1, 2, 3], -2, 3) + 1 → Infinity
    2. Don't use coin 3: minCoins([1, 2, 3], 1, 2)
  
  minCoins([1, 2, 3], 1, 2):
    sum = 1, n = 2, coins[1] = 2
    Try two options:
      1. Use coin 2: minCoins([1, 2, 3], 1-2, 2) + 1 = minCoins([1, 2, 3], -1, 2) + 1 → Infinity
      2. Don't use coin 2: minCoins([1, 2, 3], 1, 1)
    
    minCoins([1, 2, 3], 1, 1):
      sum = 1, n = 1, coins[0] = 1
      Try two options:
        1. Use coin 1: minCoins([1, 2, 3], 1-1, 1) + 1 = minCoins([1, 2, 3], 0, 1) + 1 = 0 + 1 = 1
        2. Don't use coin 1: minCoins([1, 2, 3], 1, 0) → Infinity
      return min(1, Infinity) = 1
    
    return min(Infinity, 1) = 1
  
  return min(Infinity, 1) = 1

So option 1: 1 + 1 = 2 (use coin 3, then coin 1)

Option 2: Don't use coin 3
minCoins([1, 2, 3], 4, 2):
  sum = 4, n = 2, coins[1] = 2
  Try two options:
    1. Use coin 2: minCoins([1, 2, 3], 4-2, 2) + 1 = minCoins([1, 2, 3], 2, 2) + 1
    2. Don't use coin 2: minCoins([1, 2, 3], 4, 1)
  
  minCoins([1, 2, 3], 2, 2):
    sum = 2, n = 2, coins[1] = 2
    Try two options:
      1. Use coin 2: minCoins([1, 2, 3], 2-2, 2) + 1 = minCoins([1, 2, 3], 0, 2) + 1 = 0 + 1 = 1
      2. Don't use coin 2: minCoins([1, 2, 3], 2, 1)
      
      minCoins([1, 2, 3], 2, 1):
        sum = 2, n = 1, coins[0] = 1
        Try two options:
          1. Use coin 1: minCoins([1, 2, 3], 2-1, 1) + 1 = minCoins([1, 2, 3], 1, 1) + 1 = 1 + 1 = 2
          2. Don't use coin 1: minCoins([1, 2, 3], 2, 0) → Infinity
        return min(2, Infinity) = 2
      
      return min(1, 2) = 1
    
    return 1
  
  So: minCoins([1, 2, 3], 2, 2) + 1 = 1 + 1 = 2
  
  minCoins([1, 2, 3], 4, 1):
    sum = 4, n = 1, coins[0] = 1
    Try two options:
      1. Use coin 1: minCoins([1, 2, 3], 4-1, 1) + 1 = minCoins([1, 2, 3], 3, 1) + 1
      2. Don't use coin 1: minCoins([1, 2, 3], 4, 0) → Infinity
      
      minCoins([1, 2, 3], 3, 1):
        sum = 3, n = 1, coins[0] = 1
        Try two options:
          1. Use coin 1: minCoins([1, 2, 3], 3-1, 1) + 1 = minCoins([1, 2, 3], 2, 1) + 1 = 2 + 1 = 3
          2. Don't use coin 1: minCoins([1, 2, 3], 3, 0) → Infinity
        return min(3, Infinity) = 3
      
      return 3 + 1 = 4
    
    return min(4, Infinity) = 4
  
  return min(2, 4) = 2

Back to minCoins([1, 2, 3], 4, 3):
  res = min(2, 2) = 2

🏆 Result: 2 coins

✅ Minimum coins needed = 2 (using [2, 2] or [1, 3])

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Recursive Tree with Minimum
- At each step, try two options: use coin or don't use coin
- Recursively solve smaller subproblems
- Take minimum of all valid options
- Base case: sum = 0 means success (return 0)

Recursive Structure:
1. Base case: sum = 0 → return 0 (success)
2. Invalid case: n = 0 or sum < 0 → return Infinity (failure)
3. Try two options: use coin or don't use coin
4. Take minimum of results
5. Add 1 when using a coin

Why Add 1?
- When we use a coin, we've used one coin
- Then we recursively solve for remaining sum
- Total coins = 1 (current) + coins from remaining sum

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- At each level, we make 2 recursive calls (use or don't use)
- Maximum depth: n (number of coins) or sum (if using smallest coin)
- Total recursive calls: O(2^n) in worst case
- Each call: O(1) operations
- Total: O(2^n) exponential

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack depth: O(n) in worst case
- Each call: O(1) space
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Exact Match
Input: coins = [5], sum = 5
minCoins([5], 5, 1):
  Use coin 5: minCoins([5], 0, 1) + 1 = 0 + 1 = 1
  Don't use: minCoins([5], 5, 0) = Infinity
return min(1, Infinity) = 1 ✓

CASE 2: Not Possible
Input: coins = [5, 10], sum = 3
All paths lead to invalid states
return Infinity ✓

CASE 3: Multiple Valid Options
Input: coins = [1, 2, 3], sum = 4
Try all combinations, take minimum
return 2 ✓

CASE 4: Single Coin Type
Input: coins = [2], sum = 6
Use coin 2 three times
return 3 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Minimum coins for sum depends on minimum coins for sum - coin_value
   - Optimal solution contains optimal solutions to subproblems
   - Try all options and take minimum

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are recalculated multiple times
   - Example: minCoins(coins, 2, 1) might be called from multiple paths
   - This is why DP (memoization) helps

3️⃣ COMPLETE EXPLORATION:
   - Try both options (use coin or don't use coin)
   - No valid solution is missed
   - Guarantees optimal solution

4️⃣ CORRECTNESS:
   - Base cases handle edge cases correctly
   - Invalid states return Infinity
   - Valid states return minimum coins

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Tries all possible coin combinations: ✓
- Takes minimum at each step: ✓
- Handles invalid cases correctly: ✓
- Base cases are correct: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 2: Check base case
  - If sum = 0, successfully made sum → return 0

Line 3: Check invalid case
  - If n = 0 or sum < 0, impossible → return Infinity

Line 8-11: Try two options
  - Use coin: recursively solve for sum - coin, add 1
  - Don't use coin: recursively solve for same sum with n-1 coins
  - Take minimum of both options

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
- Exact match (one coin fits perfectly)
- Not possible (cannot make sum)
- Multiple valid options
- Single coin type
- Large values
- Edge values (sum = 0, 1, 2)

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print recursive calls with parameters
- Track which option is being tried
- Verify base cases are reached
- Check if Infinity is returned correctly
- Trace through small examples manually

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Forgetting to add 1 when using coin
- Using sum instead of min
- Wrong base case (returning 1 instead of 0 for sum=0)
- Not returning Infinity for invalid cases
- Confusing with count ways problem

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Clear base cases (sum = 0 and invalid)
- Try both options (use or don't use)
- Take minimum correctly
- Handle Infinity cases properly
- Add 1 when using coin

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the recursive structure clearly
- Walk through a small example
- Discuss time and space complexity
- Mention exponential time complexity
- Suggest DP optimization
- Handle edge cases
- Distinguish from count ways problem

─────────────────────────────────────────

🎯 OPTIMIZATION NOTE:

⚠️ EXPONENTIAL TIME COMPLEXITY:
This plain recursive solution has O(2^n) time complexity, which is very slow
for large inputs. The same subproblems are recalculated multiple times.

For better performance, use:
- Memoization (DP Top-down): O(n × sum) time, O(n × sum) space
- Tabulation (DP Bottom-up): O(n × sum) time, O(n × sum) space
- See 03_DP_Tabulation.js for optimized solution

Example of overlapping subproblems:
- minCoins(coins, 2, 1) might be called from multiple paths
- Without memoization, it's recalculated each time

─────────────────────────────────────────

🎯 COMPARISON WITH COIN CHANGE (COUNT WAYS):

⚠️ IMPORTANT: Don't confuse these two similar problems!

MINIMUM COINS (This Problem):
- Goal: Find MINIMUM number of coins
- Operation: Math.MIN of options
- Base case (sum=0): return 0 (0 coins needed)
- Invalid case: return Infinity (impossible)
- When using coin: add +1 (we used one coin)
- Recurrence: min(use_coin + 1, don't_use_coin)

COIN CHANGE - COUNT WAYS (See 03_Coins_Change/01_plain_recursion.js):
- Goal: COUNT all possible ways
- Operation: SUM (+) of options
- Base case (sum=0): return 1 (one way: use no coins)
- Invalid case: return 0 (zero ways)
- When using coin: don't add +1 (we're counting ways, not coins)
- Recurrence: use_coin + don't_use_coin

─────────────────────────────────────────

🎯 SIDE-BY-SIDE COMPARISON:

MINIMUM COINS:
function minCoins(coins, sum, n=coins.length){
    if(sum === 0) return 0           // 0 coins needed
    if(n === 0 || sum < 0) return Infinity  // Impossible
    return Math.min(
        minCoins(coins, sum-coins[n-1], n) + 1,  // Use coin: +1
        minCoins(coins, sum, n-1)                 // Don't use
    )
}

COUNT WAYS:
function countCoinChangeWays(coins, sum, n=coins.length){
    if(sum === 0) return 1           // 1 way (empty set)
    if(n === 0 || sum < 0) return 0  // 0 ways
    return countCoinChangeWays(coins, sum-coins[n-1], n) +  // Use coin: no +1
           countCoinChangeWays(coins, sum, n-1)            // Don't use
}

─────────────────────────────────────────

🎯 KEY DIFFERENCES TABLE:

| Aspect | Minimum Coins | Count Ways |
|--------|---------------|------------|
| Goal | Find minimum number | Count all ways |
| Operation | Math.min() | Addition (+) |
| Base (sum=0) | return 0 | return 1 |
| Invalid | return Infinity | return 0 |
| Using coin | Add +1 | Don't add +1 |
| Example | min(2, 3) = 2 | 2 + 3 = 5 |

─────────────────────────────────────────

🎯 WHY THESE DIFFERENCES?

1️⃣ GOAL DIFFERENCE:
   - Minimum Coins: Optimize (minimize coins)
   - Count Ways: Count (all possibilities)

2️⃣ BASE CASE DIFFERENCE:
   - Minimum Coins: sum=0 means 0 coins needed (success)
   - Count Ways: sum=0 means 1 way exists (empty set)

3️⃣ INVALID CASE DIFFERENCE:
   - Minimum Coins: Infinity (impossible to minimize)
   - Count Ways: 0 (zero ways to make sum)

4️⃣ OPERATION DIFFERENCE:
   - Minimum Coins: min() to find minimum
   - Count Ways: + to count all ways

5️⃣ +1 DIFFERENCE:
   - Minimum Coins: +1 when using coin (count the coin)
   - Count Ways: No +1 (counting ways, not coins)

─────────────────────────────────────────

🎯 EXAMPLE COMPARISON:

Input: coins = [1, 2, 3], sum = 4

MINIMUM COINS:
- Find minimum number of coins
- Options: [1,1,1,1] (4), [2,2] (2), [1,3] (2)
- Answer: 2 (minimum)

COUNT WAYS:
- Count all possible ways
- Ways: [1,1,1,1], [1,1,2], [1,3], [2,2]
- Answer: 4 (total ways)

─────────────────────────────────────────

🎯 WHEN TO USE EACH:

Use MINIMUM COINS when:
- Need to minimize number of coins
- Optimization problem
- Example: Making change with fewest coins

Use COUNT WAYS when:
- Need to count all possibilities
- Combinatorial problem
- Example: How many ways to make change

─────────────────────────────────────────

🎯 COMPARISON: minCoins vs minCoins2

Both functions solve the same problem but use different recursive strategies:

APPROACH 1: minCoins (Index-Based, Binary Choice)
- Strategy: For each coin at index n, decide: use it or don't use it
- Parameters: (coins, sum, n) - tracks which coin we're considering
- Recursive calls: 2 per level (use coin or don't use coin)
- Structure: Binary tree (use/don't use decision)
- Base case: n = 0 means we've considered all coins
- Pros: Explicit decision making, clear coin-by-coin progression
- Cons: Requires index parameter, slightly more complex

APPROACH 2: minCoins2 (Iterative Selection)
- Strategy: For current sum, try every coin and pick the best
- Parameters: (coins, sum) - simpler, no index tracking
- Recursive calls: Up to coins.length per level (one per coin)
- Structure: Multi-way tree (try each coin)
- Base case: sum = 0 or sum < 0
- Pros: Simpler parameters, more intuitive "try all coins" logic
- Cons: May try same coin multiple times in different branches

KEY DIFFERENCES:

1️⃣ PARAMETER STRUCTURE:
   minCoins: (coins, sum, n) - tracks coin index
   minCoins2: (coins, sum) - simpler, no index

2️⃣ RECURSIVE STRUCTURE:
   minCoins: Binary choice (use coin n or don't use coin n)
   minCoins2: Iterative choice (try coin 1, try coin 2, ..., try coin n)

3️⃣ DECISION MAKING:
   minCoins: "Should I use coin at index n?"
   minCoins2: "Which coin should I use next?"

4️⃣ RECURSIVE CALLS:
   minCoins: 2 calls per level (use/don't use)
   minCoins2: Up to coins.length calls per level (one per coin)

5️⃣ COMPLEXITY:
   Both: O(2^n) time, O(n) space (same exponential complexity)

WHICH ONE TO USE?

Use minCoins when:
- You want explicit "use/don't use" decision per coin
- You prefer binary decision tree structure
- You want to track which coins you've considered
- You're learning DP with index-based approaches

Use minCoins2 when:
- You prefer simpler parameters (no index)
- You find "try all coins" more intuitive
- You want iterative coin selection
- You prefer cleaner function signature

Both are correct and solve the same problem!

─────────────────────────────────────────

🎯 STEP-BY-STEP COMPARISON (coins = [1, 2, 3], sum = 4)

minCoins approach:
  minCoins([1,2,3], 4, 3):
    Option 1: Use coin 3 → minCoins([1,2,3], 1, 3) + 1
    Option 2: Don't use coin 3 → minCoins([1,2,3], 4, 2)
    Take minimum

minCoins2 approach:
  minCoins2([1,2,3], 4):
    Try coin 1 → minCoins2([1,2,3], 3) + 1
    Try coin 2 → minCoins2([1,2,3], 2) + 1
    Try coin 3 → minCoins2([1,2,3], 1) + 1
    Take minimum of all three

Both eventually explore the same solution space, just with different
recursive structures!

─────────────────────────────────────────

🎯 CONCLUSION:
Minimum Coins using Plain Recursion finds the minimum number of coins needed
by recursively trying both options (use coin or don't use coin) at each step,
taking the minimum result, and adding 1 when using a coin. While intuitive,
this approach has exponential time complexity O(2^n). For better performance,
use DP memoization or tabulation (see 03_DP_Tabulation.js). Remember: this is
different from the "Count Ways" problem which counts all possible ways!

Two implementations are provided:
1. minCoins: Index-based binary choice approach
2. minCoins2: Iterative coin selection approach

Both solve the same problem with the same complexity - choose based on your
preference for recursive structure!
*/