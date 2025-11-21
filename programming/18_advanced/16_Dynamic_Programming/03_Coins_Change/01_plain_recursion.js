/* Problem: ✅✅✅✅ Coin Change — Count Ways (Plain Recursion) ✅✅✅✅

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
Explanation: It's impossible to make sum 3 with coins 5 and 10 → return 0.

Constraints:
- 1 ≤ coins.length ≤ 300
- 1 ≤ coins[i] ≤ 5000
- 0 ≤ sum ≤ 5000
- All coins are distinct

Expected Complexities:
Time Complexity: O(2^n) exponential (worst case, without memoization)
Space Complexity: O(n) for recursion stack

⚠️ Note: This is a plain recursive solution with exponential time complexity.
For better performance, see the DP Tabulation solution in 03_DP_Tabulation.js.

🧠 Core Idea:
- For a sum `sum`, we have two choices for each coin: use it or don't use it.
- If we use a coin, reduce the sum by coin value (can reuse same coin).
- If we don't use a coin, move to the next coin with the same sum.
- Sum the results of both options (count all ways).
- Base case: sum = 0 means we successfully made the sum (return 1 way).
- Invalid case: sum < 0 or no coins left means impossible (return 0 ways).

📈 Recurrence Relation:
  if sum === 0:
      return 1  // Base case: successfully made sum, 1 way (empty set)
  
  if n === 0 || sum < 0:
      return 0  // Invalid: no coins left or negative sum, 0 ways
  
  return countCoinChangeWays(coins, sum - coins[n-1], n) +  // Use coin
         countCoinChangeWays(coins, sum, n-1)                // Don't use coin

Base Cases:
- sum = 0: return 1 (one way: use no coins - empty set)
- n = 0 or sum < 0: return 0 (zero ways to make sum)

🎯 Why This Approach?
- Optimal substructure: Number of ways for sum depends on number of ways for
  smaller sums (sum - coin_value).
- Overlapping subproblems: Same subproblems are recalculated multiple times.
- Recursive solution explores all possible coin combinations.
- Guarantees correct count by trying all options and summing results.

💡 Key Insights:
- Try both options: use coin or don't use coin
- Sum the results of both options (count all ways)
- Don't add +1 when using coin (we're counting ways, not coins)
- Base case: sum = 0 means success (return 1 way)
- Invalid case: return 0 (zero ways)
- Coins can be reused (unlimited supply)
*/

// NOTE : See below --> 🎯 COMPARISON WITH MINIMUM COINS:
// ✅ TC = O(2^n) exponential (worst case, without memoization)
// ✅ SC = O(n) for recursion stack
function countCoinChangeWays(coins, sum, n=coins.length){
    // Base case: Successfully made the sum - one way exists (empty set)
    if(sum === 0){
        return 1 
    }
    
    // Base case: Invalid - no coins left or negative sum
    if(n === 0 || sum<0){
        return 0
    }
    
    // Take the ⭐SUM of the two options:
    // Option 1: Use the current coin
    // Option 2: Don't use the current coin
    return countCoinChangeWays(coins, sum-coins[n-1], n) + countCoinChangeWays(coins, sum, n-1)
}

console.log(countCoinChangeWays([1, 2, 3], 4)) // 4
console.log(countCoinChangeWays([2, 3, 5, 6], 10)) // 5
console.log(countCoinChangeWays([2, 3, 5, 6], 20)) // 21

/*🎯 STEP-BY-STEP WALKTHROUGH (coins = [1, 2, 3], sum = 4)

We'll trace through the recursive calls to count all ways.

Initial call: countCoinChangeWays([1, 2, 3], 4, 3)

countCoinChangeWays([1, 2, 3], 4, 3):
  sum = 4, n = 3, coins[2] = 3
  Try two options:
    1. Use coin 3: countCoinChangeWays([1, 2, 3], 4-3, 3) = countCoinChangeWays([1, 2, 3], 1, 3)
    2. Don't use coin 3: countCoinChangeWays([1, 2, 3], 4, 2)
  res = option1 + option2

Let's compute each:

Option 1: Use coin 3
countCoinChangeWays([1, 2, 3], 1, 3):
  sum = 1, n = 3, coins[2] = 3
  Try two options:
    1. Use coin 3: countCoinChangeWays([1, 2, 3], 1-3, 3) = countCoinChangeWays([1, 2, 3], -2, 3) → 0
    2. Don't use coin 3: countCoinChangeWays([1, 2, 3], 1, 2)
  
  countCoinChangeWays([1, 2, 3], 1, 2):
    sum = 1, n = 2, coins[1] = 2
    Try two options:
      1. Use coin 2: countCoinChangeWays([1, 2, 3], 1-2, 2) = countCoinChangeWays([1, 2, 3], -1, 2) → 0
      2. Don't use coin 2: countCoinChangeWays([1, 2, 3], 1, 1)
      
      countCoinChangeWays([1, 2, 3], 1, 1):
        sum = 1, n = 1, coins[0] = 1
        Try two options:
          1. Use coin 1: countCoinChangeWays([1, 2, 3], 1-1, 1) = countCoinChangeWays([1, 2, 3], 0, 1) = 1
          2. Don't use coin 1: countCoinChangeWays([1, 2, 3], 1, 0) → 0
        return 1 + 0 = 1
    
    return 0 + 1 = 1
  
  return 0 + 1 = 1

So option 1: 1 way (use coin 3, then coin 1)

Option 2: Don't use coin 3
countCoinChangeWays([1, 2, 3], 4, 2):
  sum = 4, n = 2, coins[1] = 2
  Try two options:
    1. Use coin 2: countCoinChangeWays([1, 2, 3], 4-2, 2) = countCoinChangeWays([1, 2, 3], 2, 2)
    2. Don't use coin 2: countCoinChangeWays([1, 2, 3], 4, 1)
  
  countCoinChangeWays([1, 2, 3], 2, 2):
    sum = 2, n = 2, coins[1] = 2
    Try two options:
      1. Use coin 2: countCoinChangeWays([1, 2, 3], 2-2, 2) = countCoinChangeWays([1, 2, 3], 0, 2) = 1
      2. Don't use coin 2: countCoinChangeWays([1, 2, 3], 2, 1)
      
      countCoinChangeWays([1, 2, 3], 2, 1):
        sum = 2, n = 1, coins[0] = 1
        Try two options:
          1. Use coin 1: countCoinChangeWays([1, 2, 3], 2-1, 1) = countCoinChangeWays([1, 2, 3], 1, 1) = 1
          2. Don't use coin 1: countCoinChangeWays([1, 2, 3], 2, 0) → 0
        return 1 + 0 = 1
      
      return 1 + 1 = 2
    
    return 1 + 2 = 3
  
  countCoinChangeWays([1, 2, 3], 4, 1):
    sum = 4, n = 1, coins[0] = 1
    Try two options:
      1. Use coin 1: countCoinChangeWays([1, 2, 3], 4-1, 1) = countCoinChangeWays([1, 2, 3], 3, 1)
      2. Don't use coin 1: countCoinChangeWays([1, 2, 3], 4, 0) → 0
      
      countCoinChangeWays([1, 2, 3], 3, 1):
        sum = 3, n = 1, coins[0] = 1
        Try two options:
          1. Use coin 1: countCoinChangeWays([1, 2, 3], 3-1, 1) = countCoinChangeWays([1, 2, 3], 2, 1) = 1
          2. Don't use coin 1: countCoinChangeWays([1, 2, 3], 3, 0) → 0
        return 1 + 0 = 1
      
      return 1 + 0 = 1
    
    return 0 + 1 = 1
  
  return 3 + 1 = 4

Back to countCoinChangeWays([1, 2, 3], 4, 3):
  res = 1 + 4 = 5

Wait, let me recalculate more carefully. The issue is that when we use a coin,
we can reuse it (n stays the same), so we need to be careful.

Actually, let me trace it correctly:
- When we use coin 3: we can still use coin 3 again (n=3, unlimited supply)
- When we don't use coin 3: we move to next coin (n=2)

Let me simplify the trace:

countCoinChangeWays([1, 2, 3], 4, 3):
  Option 1: Use coin 3 → countCoinChangeWays([1, 2, 3], 1, 3)
  Option 2: Don't use coin 3 → countCoinChangeWays([1, 2, 3], 4, 2)
  
  countCoinChangeWays([1, 2, 3], 1, 3):
    Option 1: Use coin 3 → countCoinChangeWays([1, 2, 3], -2, 3) = 0
    Option 2: Don't use coin 3 → countCoinChangeWays([1, 2, 3], 1, 2)
    
    countCoinChangeWays([1, 2, 3], 1, 2):
      Option 1: Use coin 2 → countCoinChangeWays([1, 2, 3], -1, 2) = 0
      Option 2: Don't use coin 2 → countCoinChangeWays([1, 2, 3], 1, 1)
      
      countCoinChangeWays([1, 2, 3], 1, 1):
        Option 1: Use coin 1 → countCoinChangeWays([1, 2, 3], 0, 1) = 1
        Option 2: Don't use coin 1 → countCoinChangeWays([1, 2, 3], 1, 0) = 0
        return 1 + 0 = 1
      
      return 0 + 1 = 1
    
    return 0 + 1 = 1
  
  countCoinChangeWays([1, 2, 3], 4, 2):
    Option 1: Use coin 2 → countCoinChangeWays([1, 2, 3], 2, 2)
    Option 2: Don't use coin 2 → countCoinChangeWays([1, 2, 3], 4, 1)
    
    countCoinChangeWays([1, 2, 3], 2, 2):
      Option 1: Use coin 2 → countCoinChangeWays([1, 2, 3], 0, 2) = 1
      Option 2: Don't use coin 2 → countCoinChangeWays([1, 2, 3], 2, 1)
      
      countCoinChangeWays([1, 2, 3], 2, 1):
        Option 1: Use coin 1 → countCoinChangeWays([1, 2, 3], 1, 1) = 1
        Option 2: Don't use coin 1 → countCoinChangeWays([1, 2, 3], 2, 0) = 0
        return 1 + 0 = 1
      
      return 1 + 1 = 2
    
    countCoinChangeWays([1, 2, 3], 4, 1):
      Option 1: Use coin 1 → countCoinChangeWays([1, 2, 3], 3, 1)
      Option 2: Don't use coin 1 → countCoinChangeWays([1, 2, 3], 4, 0) = 0
      
      countCoinChangeWays([1, 2, 3], 3, 1):
        Option 1: Use coin 1 → countCoinChangeWays([1, 2, 3], 2, 1) = 1
        Option 2: Don't use coin 1 → countCoinChangeWays([1, 2, 3], 3, 0) = 0
        return 1 + 0 = 1
      
      return 1 + 0 = 1
    
    return 2 + 1 = 3
  
  return 1 + 3 = 4

🏆 Result: 4 ways

✅ Total ways to make sum 4 = 4:
  1. {1, 1, 1, 1}
  2. {1, 1, 2}
  3. {2, 2}
  4. {1, 3}

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Recursive Tree with Summation
- At each step, try two options: use coin or don't use coin
- Recursively solve smaller subproblems
- Sum the results of all valid options (count all ways)
- Base case: sum = 0 means success (return 1 way)

Recursive Structure:
1. Base case: sum = 0 → return 1 (one way: empty set)
2. Invalid case: n = 0 or sum < 0 → return 0 (zero ways)
3. Try two options: use coin or don't use coin
4. Sum the results (count all ways)
5. Don't add +1 (we're counting ways, not coins)

Why Sum (Not Min)?
- We want to count ALL possible ways
- Each option contributes to the total count
- Summing gives us the total number of ways

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

CASE 1: Sum = 0
Input: coins = [1, 2, 3], sum = 0
return 1 ✓ (one way: use no coins)

CASE 2: Not Possible
Input: coins = [5, 10], sum = 3
All paths lead to invalid states
return 0 ✓

CASE 3: Multiple Ways
Input: coins = [1, 2, 3], sum = 4
Try all combinations, sum all ways
return 4 ✓

CASE 4: Single Coin Type
Input: coins = [2], sum = 6
Use coin 2 three times
return 1 ✓ (only one way: {2, 2, 2})

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Number of ways for sum depends on number of ways for sum - coin_value
   - Total ways = ways using coin + ways not using coin
   - Try all options and sum results

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are recalculated multiple times
   - Example: countCoinChangeWays(coins, 2, 1) might be called from multiple paths
   - This is why DP (memoization) helps

3️⃣ COMPLETE EXPLORATION:
   - Try both options (use coin or don't use coin)
   - No valid way is missed
   - Guarantees correct count

4️⃣ CORRECTNESS:
   - Base cases handle edge cases correctly
   - Invalid states return 0
   - Valid states return correct count

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Tries all possible coin combinations: ✓
- Sums all ways at each step: ✓
- Handles invalid cases correctly: ✓
- Base cases are correct: ✓
- Guarantees correct count: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 2-4: Check base case
  - If sum = 0, successfully made sum → return 1 (one way)

Line 5-7: Check invalid case
  - If n = 0 or sum < 0, impossible → return 0 (zero ways)

Line 12: Try two options
  - Use coin: recursively solve for sum - coin (can reuse, so n stays same)
  - Don't use coin: recursively solve for same sum with n-1 coins
  - Sum the results (count all ways)

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Counting payment combinations
- Vending machines (ways to make change)
- Cryptocurrency transactions
- Game development (scoring combinations)
- Financial planning (investment combinations)
- Combinatorial counting problems

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Coin Change (Count Ways) - this problem
- Minimum Coins - similar but finds minimum
- Coin Change II
- Combination Sum
- Combination Sum II
- Perfect Squares

─────────────────────────────────────────

🎯 TESTING STRATEGY:
- Sum = 0 (should return 1)
- Not possible (should return 0)
- Multiple ways
- Single coin type
- Large values
- Edge values (sum = 0, 1, 2)

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print recursive calls with parameters
- Track which option is being tried
- Verify base cases are reached
- Check if 0 is returned correctly
- Trace through small examples manually

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Using min instead of sum
- Forgetting base case (sum=0 should return 1)
- Wrong base case (returning 0 instead of 1 for sum=0)
- Adding +1 when using coin (shouldn't add +1)
- Confusing with minimum coins problem

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Clear base cases (sum = 0 returns 1, invalid returns 0)
- Try both options (use or don't use)
- Sum the results (count all ways)
- Don't add +1 (counting ways, not coins)
- Handle edge cases properly

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the recursive structure clearly
- Walk through a small example
- Discuss time and space complexity
- Mention exponential time complexity
- Suggest DP optimization
- Handle edge cases
- Distinguish from minimum coins problem

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
- countCoinChangeWays(coins, 2, 1) might be called from multiple paths
- Without memoization, it's recalculated each time

─────────────────────────────────────────

🎯 COMPARISON WITH MINIMUM COINS:

⚠️ IMPORTANT: Don't confuse these two similar problems!

COIN CHANGE - COUNT WAYS (This Problem):
- Goal: COUNT all possible ways
- Operation: SUM (+) of options
- Base case (sum=0): return 1 (one way: use no coins)
- Invalid case: return 0 (zero ways)
- When using coin: don't add +1 (we're counting ways, not coins)
- Recurrence: use_coin + don't_use_coin

MINIMUM COINS (See 08_Min_coins_to_make_a_value/01_plain_recursion.js):
- Goal: Find MINIMUM number of coins
- Operation: Math.MIN of options
- Base case (sum=0): return 0 (0 coins needed)
- Invalid case: return Infinity (impossible)
- When using coin: add +1 (we used one coin)
- Recurrence: min(use_coin + 1, don't_use_coin)

─────────────────────────────────────────

🎯 SIDE-BY-SIDE COMPARISON:

COUNT WAYS (This solution):
function countCoinChangeWays(coins, sum, n=coins.length){
    if(sum === 0) return 1           // 1 way (empty set)
    if(n === 0 || sum < 0) return 0  // 0 ways
    return countCoinChangeWays(coins, sum-coins[n-1], n) +  // Use coin: no +1
           countCoinChangeWays(coins, sum, n-1)            // Don't use
}

MINIMUM COINS:
function minCoins(coins, sum, n=coins.length){
    if(sum === 0) return 0           // 0 coins needed
    if(n === 0 || sum < 0) return Infinity  // Impossible
    return Math.min(
        minCoins(coins, sum-coins[n-1], n) + 1,  // Use coin: +1
        minCoins(coins, sum, n-1)                 // Don't use
    )
}

─────────────────────────────────────────

🎯 KEY DIFFERENCES TABLE:

| Aspect | Count Ways | Minimum Coins |
|--------|------------|---------------|
| Goal | Count all ways | Find minimum number |
| Operation | Addition (+) | Math.min() |
| Base (sum=0) | return 1 | return 0 |
| Invalid | return 0 | return Infinity |
| Using coin | Don't add +1 | Add +1 |
| Example | 2 + 3 = 5 | min(2, 3) = 2 |

─────────────────────────────────────────

🎯 WHY THESE DIFFERENCES?

1️⃣ GOAL DIFFERENCE:
   - Count Ways: Count (all possibilities)
   - Minimum Coins: Optimize (minimize coins)

2️⃣ BASE CASE DIFFERENCE:
   - Count Ways: sum=0 means 1 way exists (empty set)
   - Minimum Coins: sum=0 means 0 coins needed (success)

3️⃣ INVALID CASE DIFFERENCE:
   - Count Ways: 0 (zero ways to make sum)
   - Minimum Coins: Infinity (impossible to minimize)

4️⃣ OPERATION DIFFERENCE:
   - Count Ways: + to count all ways
   - Minimum Coins: min() to find minimum

5️⃣ +1 DIFFERENCE:
   - Count Ways: No +1 (counting ways, not coins)
   - Minimum Coins: +1 when using coin (count the coin)

─────────────────────────────────────────

🎯 EXAMPLE COMPARISON:

Input: coins = [1, 2, 3], sum = 4

COUNT WAYS:
- Count all possible ways
- Ways: [1,1,1,1], [1,1,2], [1,3], [2,2]
- Answer: 4 (total ways)

MINIMUM COINS:
- Find minimum number of coins
- Options: [1,1,1,1] (4), [2,2] (2), [1,3] (2)
- Answer: 2 (minimum)

─────────────────────────────────────────

🎯 WHEN TO USE EACH:

Use COUNT WAYS when:
- Need to count all possibilities
- Combinatorial problem
- Example: How many ways to make change

Use MINIMUM COINS when:
- Need to minimize number of coins
- Optimization problem
- Example: Making change with fewest coins

─────────────────────────────────────────

🎯 UNLIMITED SUPPLY NOTE:

Both problems allow unlimited coin supply:
- When using a coin, we can use it again
- That's why we pass `n` (not `n-1`) when using coin
- Example: countCoinChangeWays(coins, sum-coins[n-1], n)
- The `n` stays the same because coins are unlimited

─────────────────────────────────────────

🎯 CONCLUSION:
Coin Change (Count Ways) using Plain Recursion counts all possible ways to
make a sum by recursively trying both options (use coin or don't use coin) at
each step, summing the results to count all ways. While intuitive, this
approach has exponential time complexity O(2^n). For better performance, use
DP memoization or tabulation (see 03_DP_Tabulation.js). Remember: this is
different from the "Minimum Coins" problem which finds the minimum number of
coins needed!
*/