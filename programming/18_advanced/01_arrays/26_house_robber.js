/* Problem: ✅✅✅✅ House Robber ✅✅✅✅

You are a professional robber planning to rob houses along a street. 
Each house has a certain amount of money stashed. All houses are arranged in a line, 
and adjacent houses have security systems connected. 
If two adjacent houses are robbed on the same night, 
the security system will automatically alert the police.

Given an integer array nums representing the amount of money in each house, 
return the maximum amount of money you can rob without alerting the police.

Constraint: You cannot rob two adjacent houses.

You are given an array nums where nums[i] is the amount of money in house i. 
Return the maximum amount you can rob.

Example 1:
Input: nums = [1, 2, 3, 1]
Output: 4
Explanation:
Rob house 0 (money = 1) and house 2 (money = 3).
Total amount = 1 + 3 = 4.
Alternative: Rob house 1 (2) and house 3 (1) → 2 + 1 = 3.
Maximum is 4.

Example 2:
Input: nums = [2, 7, 9, 3, 1]
Output: 12
Explanation:
Rob house 0 (2), house 2 (9), and house 4 (1).
Total = 2 + 9 + 1 = 12.

Example 3:
Input: nums = [5, 3, 4, 11, 2]
Output: 16
Explanation:
Rob house 0 (5) and house 3 (11).
Total = 5 + 11 = 16.

Example 4:
Input: nums = [1]
Output: 1
Explanation: Only one house, rob it.

Example 5:
Input: nums = []
Output: 0
Explanation: No houses to rob.

Constraints:
- 0 ≤ nums.length ≤ 100
- 0 ≤ nums[i] ≤ 400

Expected Complexities:
Time Complexity: O(n) - single pass through array
Auxiliary Space: O(1) - only two variables used
*/

// ✅ TC = O(n)
// ✅ SC = O(1)
function houseRobber(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
  
    let prev1 = 0; // dp[i-1] - max money up to previous house
    let prev2 = 0; // dp[i-2] - max money up to house before previous
  
    for (let num of nums) {
      const temp = prev1;
      prev1 = Math.max(prev1, prev2 + num); // choose max between skipping or robbing
      prev2 = temp;
    }
  
    return prev1;
}

// Test cases
console.log("Test 1:", houseRobber([2, 1, 1, 2])); // 4 (rob houses 0 and 3)
console.log("Test 2:", houseRobber([2, 7, 9, 3, 1])); // 12 (rob houses 0, 2, 4)
console.log("Test 3:", houseRobber([5, 3, 4, 11, 2])); // 16 (rob houses 0, 3)
console.log("Test 4:", houseRobber([1])); // 1
console.log("Test 5:", houseRobber([])); // 0
console.log("Test 6:", houseRobber([2, 1])); // 2
console.log("Test 7:", houseRobber([1, 2, 3, 1])); // 4 (rob houses 0, 2)

/*🎯 CORE IDEA: Use dynamic programming to track maximum money robbed up to each house. 
At each house, choose between: (1) skip current house and keep previous max, or 
(2) rob current house and add to max from two houses back. 
Use two variables (prev1, prev2) to track last two states, optimizing space to O(1).

📋 STEP-BY-STEP FLOW:

1️⃣ BASE CASES:
   - Empty array: return 0
   - Single house: return nums[0]
   - These prevent edge case issues

2️⃣ INITIALIZATION:
   - prev1 = 0 (max money up to previous house)
   - prev2 = 0 (max money up to two houses back)
   - Both start at 0 (no houses robbed yet)

3️⃣ ITERATE THROUGH HOUSES:
   - For each house (num):
     - Calculate two options:
       * Skip: keep prev1 (previous max)
       * Rob: prev2 + num (rob current + max from 2 back)
     - Take maximum of these two options
     - Update prev1 and prev2 for next iteration

4️⃣ STATE TRANSITION:
   - temp = prev1 (save current prev1)
   - prev1 = max(prev1, prev2 + num) (new max)
   - prev2 = temp (shift previous max)
   - This maintains rolling window of last two states

5️⃣ RETURN RESULT:
   - prev1 contains max money after considering all houses
   - Return prev1

🧠 WHY THIS APPROACH?

1️⃣ DYNAMIC PROGRAMMING:
   - Optimal substructure: max at i depends on max at i-1 and i-2
   - Each house has two choices: rob or skip
   - Build solution incrementally

2️⃣ SPACE OPTIMIZATION:
   - Traditional DP uses O(n) array
   - Only need last two states
   - Use two variables: O(1) space

3️⃣ RECURRENCE RELATION:
   - dp[i] = max(dp[i-1], dp[i-2] + nums[i])
   - Either skip current or rob current
   - Take maximum for optimal solution

💡 KEY INSIGHTS:

1️⃣ TWO CHOICES AT EACH HOUSE:
   - Skip: max money stays same as previous house
   - Rob: add current money to max from 2 houses back
   - Cannot rob adjacent houses (constraint)

2️⃣ ROLLING VARIABLES:
   - prev1: max money including/excluding house i-1
   - prev2: max money including/excluding house i-2
   - Update in each iteration

3️⃣ GREEDY WON'T WORK:
   - Can't just pick highest values
   - Must respect adjacency constraint
   - DP ensures optimal solution

4️⃣ STATE TRACKING:
   - prev1 represents best decision up to current position
   - prev2 allows robbing current house (no adjacency violation)
   - Rolling update maintains correctness
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Standard Case

INPUT: nums = [2, 7, 9, 3, 1]

OUTPUT: 12
EXPLANATION: Rob houses 0, 2, 4 → 2 + 9 + 1 = 12

🎯 GOAL: Find maximum money without robbing adjacent houses!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
nums = [2, 7, 9, 3, 1]
length = 5 (not 0 or 1, continue)
prev1 = 0 (max up to previous house)
prev2 = 0 (max up to two houses back)

─────────────────────────────────────────

ITERATION 1: num = 2 (house 0)

Step 1: Save current prev1
temp = prev1 = 0

Step 2: Calculate new prev1
Option 1 (skip): prev1 = 0
Option 2 (rob): prev2 + num = 0 + 2 = 2
prev1 = max(0, 2) = 2 ✓

Step 3: Update prev2
prev2 = temp = 0

State: prev1 = 2, prev2 = 0
Meaning: Max money up to house 0 is 2 (rob house 0)

─────────────────────────────────────────

ITERATION 2: num = 7 (house 1)

Step 1: Save current prev1
temp = prev1 = 2

Step 2: Calculate new prev1
Option 1 (skip): prev1 = 2
Option 2 (rob): prev2 + num = 0 + 7 = 7
prev1 = max(2, 7) = 7 ✓

Step 3: Update prev2
prev2 = temp = 2

State: prev1 = 7, prev2 = 2
Meaning: Max money up to house 1 is 7 (rob house 1, skip house 0)

─────────────────────────────────────────

ITERATION 3: num = 9 (house 2)

Step 1: Save current prev1
temp = prev1 = 7

Step 2: Calculate new prev1
Option 1 (skip): prev1 = 7
Option 2 (rob): prev2 + num = 2 + 9 = 11
prev1 = max(7, 11) = 11 ✓

Step 3: Update prev2
prev2 = temp = 7

State: prev1 = 11, prev2 = 7
Meaning: Max money up to house 2 is 11 (rob houses 0 and 2)

─────────────────────────────────────────

ITERATION 4: num = 3 (house 3)

Step 1: Save current prev1
temp = prev1 = 11

Step 2: Calculate new prev1
Option 1 (skip): prev1 = 11
Option 2 (rob): prev2 + num = 7 + 3 = 10
prev1 = max(11, 10) = 11 ✓

Step 3: Update prev2
prev2 = temp = 11

State: prev1 = 11, prev2 = 11
Meaning: Max money up to house 3 is 11 (skip house 3, keep previous max)

─────────────────────────────────────────

ITERATION 5: num = 1 (house 4)

Step 1: Save current prev1
temp = prev1 = 11

Step 2: Calculate new prev1
Option 1 (skip): prev1 = 11
Option 2 (rob): prev2 + num = 11 + 1 = 12
prev1 = max(11, 12) = 12 ✓

Step 3: Update prev2
prev2 = temp = 11

State: prev1 = 12, prev2 = 11
Meaning: Max money up to house 4 is 12 (rob house 4)

─────────────────────────────────────────

Return prev1 = 12

🏆 FINAL RESULT: 12
Houses robbed: 0 (2), 2 (9), 4 (1) → 2 + 9 + 1 = 12

─────────────────────────────────────────

📊 EXAMPLE 2: Simple Case

INPUT: nums = [5, 3, 4, 11, 2]

OUTPUT: 16

PROCESS:

INIT: prev1 = 0, prev2 = 0

ITERATION 1: num = 5
prev1 = max(0, 0+5) = 5
prev2 = 0

ITERATION 2: num = 3
prev1 = max(5, 0+3) = 5 (skip house 1)
prev2 = 5

ITERATION 3: num = 4
prev1 = max(5, 5+4) = 9 (rob house 2)
prev2 = 5

ITERATION 4: num = 11
prev1 = max(9, 5+11) = 16 (rob house 3)
prev2 = 9

ITERATION 5: num = 2
prev1 = max(16, 9+2) = 16 (skip house 4)
prev2 = 16

Return 16

🏆 RESULT: 16 (rob houses 0 and 3 → 5 + 11)

─────────────────────────────────────────

📊 EXAMPLE 3: Two Houses

INPUT: nums = [2, 1]

OUTPUT: 2

PROCESS:

INIT: prev1 = 0, prev2 = 0

ITERATION 1: num = 2
prev1 = max(0, 0+2) = 2
prev2 = 0

ITERATION 2: num = 1
prev1 = max(2, 0+1) = 2 (skip house 1)
prev2 = 2

Return 2

🏆 RESULT: 2 (rob house 0 only)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION: STATE EVOLUTION

Houses: [2, 7, 9, 3, 1]
Indices: 0  1  2  3  4

STATE TRACKING:

Initial:
prev2 = 0, prev1 = 0

After house 0 (value 2):
prev2 = 0, prev1 = 2
Decision: Rob house 0

After house 1 (value 7):
prev2 = 2, prev1 = 7
Decision: Rob house 1, skip house 0

After house 2 (value 9):
prev2 = 7, prev1 = 11
Decision: Rob houses 0, 2

After house 3 (value 3):
prev2 = 11, prev1 = 11
Decision: Skip house 3

After house 4 (value 1):
prev2 = 11, prev1 = 12
Decision: Rob houses 0, 2, 4

─────────────────────────────────────────

📊 DECISION TREE AT EACH HOUSE:

House 0 (2):
  Skip: 0
  Rob: 0 + 2 = 2 ✓
  Choose: 2

House 1 (7):
  Skip: 2
  Rob: 0 + 7 = 7 ✓
  Choose: 7

House 2 (9):
  Skip: 7
  Rob: 2 + 9 = 11 ✓
  Choose: 11

House 3 (3):
  Skip: 11 ✓
  Rob: 7 + 3 = 10
  Choose: 11

House 4 (1):
  Skip: 11
  Rob: 11 + 1 = 12 ✓
  Choose: 12

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ DYNAMIC PROGRAMMING PRINCIPLE:
   - Optimal solution contains optimal subsolutions
   - Max at house i depends on decisions at i-1, i-2
   - Build solution incrementally
   - Avoid recomputation

2️⃣ TWO-CHOICE DECISION:
   - At each house: skip or rob
   - Skip: keep previous max (prev1)
   - Rob: add to max from 2 houses back (prev2 + num)
   - Take maximum for optimal

3️⃣ ADJACENCY CONSTRAINT:
   - Cannot rob adjacent houses
   - prev2 ensures we skip at least one house
   - Robbing current means using prev2, not prev1
   - Constraint naturally enforced

4️⃣ ROLLING VARIABLES:
   - Only need last two states
   - prev1 → current max
   - prev2 → previous max
   - Update in each iteration

💡 KEY INSIGHT:
At each house, the maximum money is either (1) the max from previous house
(skip current), or (2) current house value plus max from two houses back
(rob current), with rolling variables optimizing space to O(1)!

🎯 TIME COMPLEXITY ANALYSIS:
- Single pass through array: O(n)
- Each iteration: O(1) operations
- No nested loops
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Two variables (prev1, prev2): O(1)
- No recursion stack
- No additional arrays
- Optimal space: O(1)

🎯 EDGE CASES:

CASE 1: Empty Array
Input: []
Line 72: return 0
Output: 0

CASE 2: Single House
Input: [5]
Line 73: return nums[0] = 5
Output: 5

CASE 3: Two Houses
Input: [3, 5]
Iteration 1: prev1 = 3
Iteration 2: prev1 = max(3, 0+5) = 5
Output: 5 (rob house 1)

CASE 4: All Same Values
Input: [5, 5, 5, 5]
Pattern: Rob alternating houses
Output: 10 (rob houses 0, 2 or 1, 3)

CASE 5: Increasing Values
Input: [1, 2, 3, 4]
prev1 evolution: 1 → 2 → 4 → 6
Output: 6 (rob houses 1, 3)

CASE 6: Decreasing Values
Input: [4, 3, 2, 1]
prev1 evolution: 4 → 4 → 6 → 6
Output: 6 (rob houses 0, 2)

🎯 ALGORITHM CORRECTNESS:
- Considers all valid combinations: ✓
- Respects adjacency constraint: ✓
- Finds optimal solution: ✓
- Handles edge cases: ✓
- Efficient: ✓

🎯 RECURRENCE RELATION:

TRADITIONAL DP:
dp[i] = max(dp[i-1], dp[i-2] + nums[i])

SPACE-OPTIMIZED (THIS SOLUTION):
prev1 = max(prev1, prev2 + nums[i])

Same logic, O(1) space!

🎯 COMPARISON WITH OTHER APPROACHES:

APPROACH 1: Recursion (Brute Force)
- Try all combinations
- Time: O(2^n) - exponential
- Space: O(n) - recursion stack

APPROACH 2: Recursion + Memoization
- Cache subproblem results
- Time: O(n)
- Space: O(n) - cache + stack

APPROACH 3: DP Array
- Bottom-up DP
- Time: O(n)
- Space: O(n) - dp array

APPROACH 4: Space-Optimized DP (THIS)
- Rolling variables
- Time: O(n)
- Space: O(1) - optimal!

🎯 IMPLEMENTATION DETAILS:
- Line 72-73: Handle base cases
- Line 75-76: Initialize prev1, prev2
- Line 78: Iterate through houses
- Line 79: Save current prev1
- Line 80: Calculate max (skip vs rob)
- Line 81: Update prev2
- Line 84: Return result

🎯 WHY TEMP VARIABLE:
Line 79: const temp = prev1

Needed because:
- prev1 is updated in line 80
- prev2 needs OLD value of prev1
- temp stores old prev1 for use in line 81
- Without temp, prev2 would get NEW prev1 (wrong!)

🎯 STATE TRANSITION VISUALIZATION:

BEFORE ITERATION i:
prev2 ← max up to house i-2
prev1 ← max up to house i-1

DURING ITERATION i:
temp ← prev1 (save)
prev1 ← max(prev1, prev2 + nums[i]) (update)
prev2 ← temp (shift)

AFTER ITERATION i:
prev2 ← max up to house i-1
prev1 ← max up to house i

Ready for next iteration!

🎯 ADVANTAGES:
- Optimal time: O(n)
- Optimal space: O(1)
- Simple iterative solution
- Easy to understand
- No recursion overhead

🎯 DISADVANTAGES:
- Doesn't track which houses robbed (only max value)
- If need actual houses, need modification
- Cannot easily parallelize
- Fixed constraint (non-adjacent)

🎯 REAL-WORLD APPLICATIONS:
- Resource allocation with constraints
- Job scheduling (no overlap)
- Investment planning (cooldown periods)
- Task selection (mutual exclusion)
- Optimization with dependencies

🎯 RELATED PROBLEMS:
- House Robber II (circular array)
- House Robber III (binary tree)
- Delete and Earn
- Maximum sum with no adjacent elements
- Stock buy/sell with cooldown

🎯 EXTENSIONS:

VARIATION 1: Circular Houses
- First and last houses adjacent
- Solve twice: exclude first OR exclude last
- Take maximum

VARIATION 2: Binary Tree Houses
- Tree structure instead of array
- DFS with include/exclude states
- Similar DP logic

VARIATION 3: K-constraint
- Cannot rob within K houses
- Use dp[i-k] instead of dp[i-2]
- Similar approach

🎯 COMMON MISTAKES:
- Not handling empty/single house cases
- Forgetting temp variable (corrupts prev2)
- Wrong max calculation
- Starting prev1/prev2 at wrong values
- Off-by-one errors

🎯 BEST PRACTICES:
- Handle edge cases first
- Use clear variable names
- Comment the recurrence relation
- Test with small examples
- Verify space optimization correctness

🎯 DEBUGGING TIPS:
- Print prev1, prev2 at each step
- Verify state transitions
- Check edge cases thoroughly
- Trace small examples by hand
- Verify max calculation

🎯 INTERVIEW TIPS:
- Start with recurrence relation
- Explain two choices (skip/rob)
- Show DP array approach first
- Then optimize to O(1) space
- Discuss tradeoffs
- Handle edge cases
- Analyze complexity

🎯 TESTING STRATEGY:
- Empty array
- Single house
- Two houses
- All same values
- Increasing/decreasing
- Large array
- Edge values (0, max)

🎯 CONCLUSION:
The House Robber problem is efficiently solved using dynamic programming with
space optimization, where at each house we choose between skipping (keep prev max)
or robbing (add to max from 2 houses back), maintaining only two variables for
optimal O(n) time and O(1) space complexity!
*/
