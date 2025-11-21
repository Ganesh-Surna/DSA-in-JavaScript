/* Problem: ✅✅✅✅ 0-1 Knapsack (Plain Recursion) ✅✅✅✅

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

Example 4:
Input: weights = [1, 2, 3, 4], values = [10, 20, 30, 40], capacity = 5
Output: 50
Explanation: Maximum value is 50:
  - Select items with weights [2, 3] → values [20, 30]
  - Total weight: 2 + 3 = 5 ≤ 5 ✓
  - Total value: 20 + 30 = 50

Constraints:
- 1 ≤ n ≤ 100
- 1 ≤ weights[i] ≤ 1000
- 1 ≤ values[i] ≤ 1000
- 1 ≤ capacity ≤ 1000

Expected Complexities:
Time Complexity: O(2^n) exponential (worst case, without memoization)
Space Complexity: O(n) for recursion stack

⚠️ Note: This is a plain recursive solution with exponential time complexity.
For better performance, see the DP Tabulation solution in 03_DP_Tabulation.js.

🧠 Core Idea:
- For each item, we have two choices: include it or exclude it.
- If we include an item, add its value and reduce capacity by its weight.
- If we exclude an item, keep the same capacity.
- Take the maximum of both options.
- Base case: if n = 0 or capacity = 0, return 0 (no items or no capacity).
- If item weight > capacity, we must exclude it.

📈 Recurrence Relation:
  if n === 0 || capacity === 0:
      return 0  // Base case: no items or no capacity
  
  if capacity >= weights[n-1]:
      // Can include or exclude the item
      include = values[n-1] + knapsack(weights, values, capacity - weights[n-1], n-1)
      exclude = knapsack(weights, values, capacity, n-1)
      return max(include, exclude)
  else:
      // Must exclude (item too heavy)
      return knapsack(weights, values, capacity, n-1)

Base Cases:
- n = 0 or capacity = 0: return 0 (no value possible)

🎯 Why This Approach?
- Optimal substructure: Maximum value for capacity depends on maximum value
  for smaller capacities (capacity - weight).
- Overlapping subproblems: Same subproblems are recalculated multiple times.
- Recursive solution explores all possible item combinations.
- Guarantees optimal solution by trying both options (include/exclude).

💡 Key Insights:
- Try both options: include item or exclude item
- Take maximum of both options
- If item weight > capacity, must exclude it
- Base case: n = 0 or capacity = 0 means no value possible (return 0)
- Each item can be taken at most once (0-1 constraint)
*/

// ✅ TC = O(2^n) exponential (worst case, without memoization)
// ✅ SC = O(n) for recursion stack
function knapsack(weights, values, capacity, n=weights.length){
    // Base case: No items left or no capacity left
    if(n === 0 || capacity === 0) return 0
    
    // Check if we can include the current item (last item in array)
    if(capacity >= weights[n-1]){
        // The item's weight <= capacity. so we can include/exclude on our wish
        // Take max of 2 options (include or exclude):
        
        // Option 1: Take the item
        // Add item's value and recursively solve for remaining capacity and items
        let include = values[n-1] + knapsack(weights, values, capacity-weights[n-1], n-1)
        
        // Option 2: Do not take the item
        // Keep same capacity, recursively solve for remaining items
        let exclude = knapsack(weights, values, capacity, n-1)
        
        // Return max of both options
        return Math.max(include, exclude)
    }else{
        // Skip the item if it's weight > capacity
        // Cannot include this item, so skip it and solve for remaining items
        return knapsack(weights, values, capacity, n-1)
    }
}

console.log(knapsack([5, 4, 6, 3], [10, 40, 30, 50], 10)) // 90 --> weights: [4, 3] (value: 40+50 = 90)
console.log(knapsack([10, 20, 30], [60, 100, 120], 50)) // 220 --> weights: [20, 30] (value: 100+120 = 220)
console.log(knapsack([2, 3, 4, 5], [3, 4, 5, 6], 5)) // 7 --> weights: [2, 3] (value: 3+4 = 7)
console.log(knapsack([1, 2, 3, 4], [10, 20, 30, 40], 5)) // 50 --> weights: [2, 3] (value: 20+30 = 50)

/*🎯 STEP-BY-STEP WALKTHROUGH (weights = [5, 4, 6, 3], values = [10, 40, 30, 50], capacity = 10)

We'll trace through the recursive calls to find maximum value.

Initial call: knapsack([5, 4, 6, 3], [10, 40, 30, 50], 10, 4)

knapsack([5, 4, 6, 3], [10, 40, 30, 50], 10, 4):
  n = 4, capacity = 10, current item: weight=3, value=50 (index 3)
  capacity (10) >= weight (3)? Yes!
  Try two options:
    Option 1: Include item 3
      include = 50 + knapsack([5, 4, 6, 3], [10, 40, 30, 50], 10-3, 3)
                 = 50 + knapsack([5, 4, 6, 3], [10, 40, 30, 50], 7, 3)
    
    Option 2: Exclude item 3
      exclude = knapsack([5, 4, 6, 3], [10, 40, 30, 50], 10, 3)
  
  res = max(include, exclude)

Let's compute each:

Option 1: Include item 3
knapsack([5, 4, 6, 3], [10, 40, 30, 50], 7, 3):
  n = 3, capacity = 7, current item: weight=6, value=30 (index 2)
  capacity (7) >= weight (6)? Yes!
  Try two options:
    Option 1a: Include item 2
      include = 30 + knapsack([5, 4, 6, 3], [10, 40, 30, 50], 7-6, 2)
                 = 30 + knapsack([5, 4, 6, 3], [10, 40, 30, 50], 1, 2)
      
      knapsack([5, 4, 6, 3], [10, 40, 30, 50], 1, 2):
        n = 2, capacity = 1, current item: weight=4, value=40 (index 1)
        capacity (1) >= weight (4)? No!
        Must exclude: knapsack([5, 4, 6, 3], [10, 40, 30, 50], 1, 1)
        
        knapsack([5, 4, 6, 3], [10, 40, 30, 50], 1, 1):
          n = 1, capacity = 1, current item: weight=5, value=10 (index 0)
          capacity (1) >= weight (5)? No!
          Must exclude: knapsack([5, 4, 6, 3], [10, 40, 30, 50], 1, 0)
          return 0 (base case)
        return 0
      So: 30 + 0 = 30
    
    Option 1b: Exclude item 2
      exclude = knapsack([5, 4, 6, 3], [10, 40, 30, 50], 7, 2)
      
      knapsack([5, 4, 6, 3], [10, 40, 30, 50], 7, 2):
        n = 2, capacity = 7, current item: weight=4, value=40 (index 1)
        capacity (7) >= weight (4)? Yes!
        Try two options:
          Include: 40 + knapsack([5, 4, 6, 3], [10, 40, 30, 50], 7-4, 1)
                  = 40 + knapsack([5, 4, 6, 3], [10, 40, 30, 50], 3, 1)
          
          knapsack([5, 4, 6, 3], [10, 40, 30, 50], 3, 1):
            n = 1, capacity = 3, current item: weight=5, value=10 (index 0)
            capacity (3) >= weight (5)? No!
            Must exclude: knapsack([5, 4, 6, 3], [10, 40, 30, 50], 3, 0)
            return 0
          So: 40 + 0 = 40
          
          Exclude: knapsack([5, 4, 6, 3], [10, 40, 30, 50], 7, 1)
          = knapsack([5, 4, 6, 3], [10, 40, 30, 50], 7, 1)
          = 0 (capacity 7, weight 5 > 7? No wait, let me recalculate)
          Actually: capacity 7, weight 5, can include: 10 + knapsack(..., 2, 0) = 10
          Exclude: knapsack(..., 7, 0) = 0
          max(10, 0) = 10
        So: max(40, 10) = 40
      So: 40
  
  So: max(30, 40) = 40

So Option 1: 50 + 40 = 90

Option 2: Exclude item 3
knapsack([5, 4, 6, 3], [10, 40, 30, 50], 10, 3):
  n = 3, capacity = 10, current item: weight=6, value=30 (index 2)
  capacity (10) >= weight (6)? Yes!
  Try two options:
    Include: 30 + knapsack([5, 4, 6, 3], [10, 40, 30, 50], 10-6, 2)
             = 30 + knapsack([5, 4, 6, 3], [10, 40, 30, 50], 4, 2)
    
    knapsack([5, 4, 6, 3], [10, 40, 30, 50], 4, 2):
      n = 2, capacity = 4, current item: weight=4, value=40 (index 1)
      capacity (4) >= weight (4)? Yes!
      Include: 40 + knapsack([5, 4, 6, 3], [10, 40, 30, 50], 4-4, 1) = 40 + 0 = 40
      Exclude: knapsack([5, 4, 6, 3], [10, 40, 30, 50], 4, 1) = 0
      return max(40, 0) = 40
    So: 30 + 40 = 70
    
    Exclude: knapsack([5, 4, 6, 3], [10, 40, 30, 50], 10, 2)
    = 40 (from above calculation)
  
  So: max(70, 40) = 70

So Option 2: 70

Back to initial call:
  res = max(90, 70) = 90

🏆 Result: 90

✅ Maximum value = 90 (select items with weights [4, 3], values [40, 50])

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Recursive Decision Tree
- At each step, decide: include item or exclude item
- Recursively solve smaller subproblems
- Take maximum of both options
- Base case: no items or no capacity means no value

Recursive Structure:
1. Base case: n = 0 or capacity = 0 → return 0
2. If item weight <= capacity:
   a. Try including item (add value, reduce capacity)
   b. Try excluding item (keep capacity)
   c. Take maximum
3. If item weight > capacity:
   a. Must exclude item
   b. Solve for remaining items

Why Take Maximum?
- We want to maximize total value
- Include option: value of item + best value from remaining
- Exclude option: best value without this item
- Maximum gives us the optimal choice

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- At each level, we make 2 recursive calls (include or exclude)
- Maximum depth: n (number of items)
- Total recursive calls: O(2^n) in worst case
- Each call: O(1) operations
- Total: O(2^n) exponential

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack depth: O(n) in worst case
- Each call: O(1) space
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: No Items or No Capacity
Input: weights = [], values = [], capacity = 10
n = 0 → base case
return 0 ✓

CASE 2: All Items Too Heavy
Input: weights = [20, 30, 40], values = [10, 20, 30], capacity = 10
All items have weight > capacity
All must be excluded
return 0 ✓

CASE 3: Can Take All Items
Input: weights = [1, 2, 3], values = [10, 20, 30], capacity = 10
All items fit
return 10 + 20 + 30 = 60 ✓

CASE 4: Optimal Selection
Input: weights = [5, 4, 6, 3], values = [10, 40, 30, 50], capacity = 10
Need to select best combination
return 90 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Maximum value for capacity depends on maximum value for smaller capacities
   - Optimal solution contains optimal solutions to subproblems
   - Try both options and take maximum

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are recalculated multiple times
   - Example: knapsack(weights, values, 7, 2) might be called from multiple paths
   - This is why DP (memoization) helps

3️⃣ COMPLETE EXPLORATION:
   - Try both options (include or exclude) for each item
   - No valid combination is missed
   - Guarantees optimal solution

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

Line 2: Check base case
  - If n = 0 or capacity = 0, no value possible → return 0

Line 4: Check if item can fit
  - If capacity >= weights[n-1], can include or exclude

Line 9: Include option
  - Add item's value
  - Reduce capacity by item's weight
  - Recursively solve for remaining items (n-1)

Line 11: Exclude option
  - Keep same capacity
  - Recursively solve for remaining items (n-1)

Line 14: Return maximum
  - Take maximum of include and exclude options

Line 17: Must exclude
  - If weight > capacity, cannot include
  - Skip item and solve for remaining items

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
- Print recursive calls with parameters
- Track which option is being tried (include/exclude)
- Verify base cases are reached
- Check if maximum is calculated correctly
- Trace through small examples manually
- Verify capacity reduction when including item

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Forgetting to add item value when including
- Not reducing capacity when including item
- Using wrong index (n-1 vs n)
- Wrong base case (returning 1 instead of 0)
- Not handling weight > capacity case
- Confusing with unbounded knapsack

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Clear base cases (n = 0 or capacity = 0)
- Try both options (include or exclude)
- Take maximum correctly
- Handle weight > capacity case
- Reduce capacity when including item
- Use n-1 for remaining items

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the recursive structure clearly
- Walk through a small example
- Discuss time and space complexity
- Mention exponential time complexity
- Suggest DP optimization
- Handle edge cases
- Explain 0-1 constraint (each item once)

─────────────────────────────────────────

🎯 OPTIMIZATION NOTE:

⚠️ EXPONENTIAL TIME COMPLEXITY:
This plain recursive solution has O(2^n) time complexity, which is very slow
for large inputs. The same subproblems are recalculated multiple times.

For better performance, use:
- Memoization (DP Top-down): O(n × capacity) time, O(n × capacity) space
- Tabulation (DP Bottom-up): O(n × capacity) time, O(n × capacity) space
- See 03_DP_Tabulation.js for optimized solution

Example of overlapping subproblems:
- knapsack(weights, values, 7, 2) might be called from multiple paths
- Without memoization, it's recalculated each time

─────────────────────────────────────────

🎯 COMPARISON WITH UNBOUNDED KNAPSACK:

⚠️ IMPORTANT: Don't confuse 0-1 Knapsack with Unbounded Knapsack!

0-1 KNAPSACK (This Problem):
- Each item can be taken at most once
- When including: n-1 (move to next item)
- Recurrence: max(include + knapsack(..., n-1), exclude + knapsack(..., n-1))
- Example: Can't take same item twice

UNBOUNDED KNAPSACK:
- Each item can be taken unlimited times
- When including: n (stay with same items)
- Recurrence: max(include + knapsack(..., n), exclude + knapsack(..., n-1))
- Example: Can take same item multiple times

KEY DIFFERENCE:
- 0-1: n-1 when including (item is used, move to next)
- Unbounded: n when including (item can be reused)

─────────────────────────────────────────

🎯 KEY INSIGHTS:

1️⃣ 0-1 CONSTRAINT:
   - Each item can be taken at most once
   - When including item, move to next item (n-1)
   - This is key difference from unbounded knapsack

2️⃣ INCLUDE/EXCLUDE DECISION:
   - For each item, try both options
   - Include: add value, reduce capacity, move to next item
   - Exclude: keep capacity, move to next item
   - Take maximum

3️⃣ WEIGHT CONSTRAINT:
   - If weight > capacity, must exclude
   - Only consider include option if weight <= capacity
   - This ensures we never exceed capacity

4️⃣ BASE CASE:
   - n = 0: no items left, no value possible
   - capacity = 0: no capacity left, no value possible
   - Both return 0

─────────────────────────────────────────

🎯 VARIABLE NAMING:
- `weights`: Array of item weights
- `values`: Array of item values
- `capacity`: Maximum weight capacity of knapsack
- `n`: Number of items being considered
- `include`: Value when including current item
- `exclude`: Value when excluding current item

─────────────────────────────────────────

🎯 CONCLUSION:
0-1 Knapsack using Plain Recursion finds the maximum value by recursively
trying both options (include item or exclude item) at each step, taking the
maximum result, and handling weight constraints correctly. While intuitive,
this approach has exponential time complexity O(2^n). For better performance,
use DP memoization or tabulation (see 03_DP_Tabulation.js)!
*/