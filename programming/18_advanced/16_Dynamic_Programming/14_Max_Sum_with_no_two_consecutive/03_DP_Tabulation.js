/* Problem: ✅✅✅✅ Max Sum with No Two Consecutive (DP Tabulation) ✅✅✅✅

Given an array `arr` of positive integers, find the maximum sum of elements
such that no two elements are consecutive (adjacent) in the array.

🎯 Goal: Find the maximum sum by selecting elements with the constraint that
no two selected elements can be adjacent.

Example 1:
Input: arr = [1, 2, 3, 4, 5]
Output: 9
Explanation: Maximum sum is 9 by selecting elements at indices [0, 2, 4]:
  - Select arr[0] = 1
  - Skip arr[1] = 2 (adjacent to arr[0])
  - Select arr[2] = 3
  - Skip arr[3] = 4 (adjacent to arr[2])
  - Select arr[4] = 5
  - Sum: 1 + 3 + 5 = 9

Example 2:
Input: arr = [10, 5, 15, 20, 2, 30]
Output: 60
Explanation: Maximum sum is 60 by selecting elements at indices [0, 3, 5]:
  - Select arr[0] = 10
  - Skip arr[1] = 5, arr[2] = 15 (adjacent to arr[0])
  - Select arr[3] = 20
  - Skip arr[4] = 2 (adjacent to arr[3])
  - Select arr[5] = 30
  - Sum: 10 + 20 + 30 = 60

Example 3:
Input: arr = [5, 10, 5]
Output: 10
Explanation: Maximum sum is 10 by selecting arr[1] = 10:
  - Option 1: Select arr[0] and arr[2] → 5 + 5 = 10
  - Option 2: Select arr[1] → 10
  - Maximum: max(10, 10) = 10

Constraints:
- 1 ≤ arr.length ≤ 1000
- 1 ≤ arr[i] ≤ 10^4

Expected Complexities:
Time Complexity: O(n) where n = array length
Space Complexity: O(n) for the DP array (can be optimized to O(1))

⚠️ Note: This file contains two solutions:
1. maxSumWithNoTwoConsecutive: Standard DP with O(n) space
2. maxSumNoAdjacent2: Space-optimized version with O(1) space

🧠 Core Idea:
- Use dynamic programming to build solution bottom-up
- dp[i] = maximum sum with no two consecutive elements from arr[0...i]
- For each element, we have two choices:
  1. Include the element: Add its value and use dp[i-2] (skip previous)
  2. Exclude the element: Use dp[i-1] (consider previous)
- Take the maximum of both choices.
- Base cases: first element (arr[0]) and first two elements (max of both).

📈 Recurrence Relation:
  Base cases:
      dp[0] = arr[0]  // First element, only one choice
      dp[1] = max(arr[0], arr[1])  // First two elements, pick maximum
  
  For i from 2 to n-1:
      include = arr[i] + dp[i-2]  // Include arr[i], skip arr[i-1]
      exclude = dp[i-1]            // Exclude arr[i], consider previous
      dp[i] = max(include, exclude)
  
  Answer = dp[n-1]

Base Cases:
- dp[0] = arr[0] (first element, only one choice)
- dp[1] = max(arr[0], arr[1]) (first two elements, pick maximum)

🎯 Why This Approach?
- Optimal substructure: Maximum sum for arr[0...i] depends on maximum sum for
  smaller subarrays (arr[0...i-1] or arr[0...i-2]).
- Overlapping subproblems: Avoids recalculating the same subproblems.
- Tabulation builds solution from smaller to larger subarrays.
- Guarantees optimal solution by considering both choices at each step.

💡 Key Insights:
- dp[i] = maximum sum with no two consecutive elements from arr[0...i]
- Include/exclude pattern: At each step, include or exclude the current element
- If we include: We must skip the previous element (use dp[i-2])
- If we exclude: We can consider the previous element (use dp[i-1])
- Take maximum of both choices
- Base cases handle first one and two elements

⚠️ IMPORTANT: Why dp[i-2] When Including?

When we include arr[i]:
- We add arr[i] to our sum
- We must skip arr[i-1] (previous element) to avoid consecutive elements
- So we use dp[i-2] (maximum sum from arr[0...i-2])
- This ensures no two consecutive elements are selected

Example: arr = [1, 2, 3, 4, 5], i = 4
- Include arr[4] = 5: We add 5, skip arr[3] = 4
- Use dp[2] (maximum sum from [1, 2, 3]) ✓
*/

// ✅ TC = O(n) where n = array length
// ✅ SC = O(n) for 1D DP array
function maxSumWithNoTwoConsecutive(arr, n=arr.length) {
    // Initialize DP array: dp[i] = max sum with no two consecutive from arr[0...i]
    let dp=new Array(n).fill(0)
    
    // Base case 1: First element (only one choice, must include it)
    dp[0] = arr[0]
    
    // Base case 2: First two elements (pick the maximum, can't pick both)
    dp[1] = Math.max(arr[0], arr[1])
    
    // Build DP array: for each element from index 2 to n-1
    for(let i=2; i<n; i++){
        // Option 1: Include arr[i]
        // If we include arr[i], we must skip arr[i-1] to avoid consecutive elements
        // So we use dp[i-2] (maximum sum from arr[0...i-2])
        let include = arr[i] + dp[i-2]
        
        // Option 2: Exclude arr[i]
        // If we exclude arr[i], we can consider all previous elements
        // So we use dp[i-1] (maximum sum from arr[0...i-1])
        let exclude = dp[i-1]
        
        // Take maximum of both choices (we want maximum sum)
        dp[i] = Math.max(include, exclude)
    }
    
    // dp[n-1] contains maximum sum with no two consecutive elements from entire array
    return dp[n-1]
}



/* ⚡ SPACE-OPTIMIZED VERSION: O(1) Space ⚡

This version optimizes space from O(n) to O(1) by using only two variables
instead of an entire DP array. The key insight is that we only need dp[i-2]
and dp[i-1] to compute dp[i], so we don't need to store all previous values.

Time Complexity: O(n) - same as standard version
Space Complexity: O(1) - only two variables instead of array

Why This Works:
- We only need the last two computed values (dp[i-2] and dp[i-1])
- We can discard older values as we progress
- prev2 stores dp[i-2], prev1 stores dp[i-1]
- After computing curr (dp[i]), we update prev2 and prev1 for next iteration
*/

// ✅ TC = O(n) where n = array length
// ✅ SC = O(1) - only two variables instead of array
function maxSumNoAdjacent2(arr) {
    // Base cases
    if (arr.length === 0) return 0;  // Empty array
    if (arr.length === 1) return arr[0];  // Single element

    // Initialize: prev2 = dp[0], prev1 = dp[1]
    let prev2 = arr[0];             // dp[i-2]: max sum from arr[0...i-2]
    let prev1 = Math.max(arr[0], arr[1]); // dp[i-1]: max sum from arr[0...i-1]

    // Build solution: for each element from index 2 to n-1
    for (let i = 2; i < arr.length; i++) {
        // Compute dp[i] = max(include arr[i], exclude arr[i])
        // include = arr[i] + dp[i-2] = arr[i] + prev2
        // exclude = dp[i-1] = prev1
        let curr = Math.max(prev1, prev2 + arr[i]);
        
        // Update for next iteration:
        // prev2 becomes prev1 (dp[i-1] becomes dp[i-2] for next i)
        // prev1 becomes curr (dp[i] becomes dp[i-1] for next i)
        prev2 = prev1;
        prev1 = curr;
    }

    // prev1 contains dp[n-1] (maximum sum from entire array)
    return prev1;
}


console.log(maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5])); // 9 --> [1, 3, 5]
console.log(maxSumWithNoTwoConsecutive([10, 5, 15, 20, 2, 30])); // 60 --> [10, 20, 30]

/*🎯 STEP-BY-STEP WALKTHROUGH (arr = [1, 2, 3, 4, 5])

We'll build a DP array where dp[i] represents the maximum sum with no two
consecutive elements from arr[0...i].

Initialization:
arr = [1, 2, 3, 4, 5], n = 5

Step 1: Initialize Base Cases

Base case 1: dp[0] = arr[0] = 1
  - First element, only one choice (must include it)

Base case 2: dp[1] = max(arr[0], arr[1]) = max(1, 2) = 2
  - First two elements, pick the maximum (can't pick both)

Current DP array:
dp = [1, 2, 0, 0, 0]

Step 2: Compute dp[2] (considering arr[0...2] = [1, 2, 3])

Option 1: Include arr[2] = 3
  include = 3 + dp[0] = 3 + 1 = 4
  // Include 3, skip 2, use dp[0] (max sum from [1])

Option 2: Exclude arr[2] = 3
  exclude = dp[1] = 2
  // Exclude 3, use dp[1] (max sum from [1, 2])

dp[2] = max(4, 2) = 4

Current DP array:
dp = [1, 2, 4, 0, 0]

Step 3: Compute dp[3] (considering arr[0...3] = [1, 2, 3, 4])

Option 1: Include arr[3] = 4
  include = 4 + dp[1] = 4 + 2 = 6
  // Include 4, skip 3, use dp[1] (max sum from [1, 2])

Option 2: Exclude arr[3] = 4
  exclude = dp[2] = 4
  // Exclude 4, use dp[2] (max sum from [1, 2, 3])

dp[3] = max(6, 4) = 6

Current DP array:
dp = [1, 2, 4, 6, 0]

Step 4: Compute dp[4] (considering arr[0...4] = [1, 2, 3, 4, 5])

Option 1: Include arr[4] = 5
  include = 5 + dp[2] = 5 + 4 = 9
  // Include 5, skip 4, use dp[2] (max sum from [1, 2, 3])

Option 2: Exclude arr[4] = 5
  exclude = dp[3] = 6
  // Exclude 5, use dp[3] (max sum from [1, 2, 3, 4])

dp[4] = max(9, 6) = 9

Final DP array:
dp = [1, 2, 4, 6, 9]

🏆 Result: dp[4] = 9

✅ Maximum sum = 9 (select elements at indices [0, 2, 4]: 1 + 3 + 5 = 9)

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Bottom-Up DP with Include/Exclude Pattern
- Build solution from smaller subarrays to larger subarrays
- dp[i] = maximum sum with no two consecutive elements from arr[0...i]
- For each element, try including it or excluding it
- Take maximum of both choices

Algorithm Steps:
1. Initialize dp[0] = arr[0] (first element)
2. Initialize dp[1] = max(arr[0], arr[1]) (first two elements)
3. For each i from 2 to n-1:
   a. Include arr[i]: arr[i] + dp[i-2] (skip previous)
   b. Exclude arr[i]: dp[i-1] (consider previous)
   c. dp[i] = max(include, exclude)
4. Return dp[n-1]

Why dp[i-2] When Including?
- If we include arr[i], we add it to our sum
- We must skip arr[i-1] to avoid consecutive elements
- So we use dp[i-2] (maximum sum from arr[0...i-2])
- This ensures no two consecutive elements are selected

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Initialize base cases: O(1)
- Loop: n-2 iterations (i from 2 to n-1)
- Each iteration: O(1) operations
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Standard version: DP array O(n)
- Space-optimized version: Only two variables O(1)
- Total: O(n) or O(1) depending on version

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Single Element
Input: arr = [5]
dp[0] = 5 ✓

CASE 2: Two Elements
Input: arr = [5, 10]
dp[0] = 5
dp[1] = max(5, 10) = 10 ✓

CASE 3: Three Elements
Input: arr = [5, 10, 5]
dp[0] = 5
dp[1] = max(5, 10) = 10
dp[2] = max(5 + 5, 10) = max(10, 10) = 10 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Maximum sum for arr[0...i] depends on maximum sum for arr[0...i-1] or arr[0...i-2]
   - Optimal solution contains optimal solutions to subproblems
   - Try both options and take maximum

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are solved only once
   - Results stored in DP array (or variables)
   - No recalculation needed

3️⃣ BOTTOM-UP CONSTRUCTION:
   - Solve smaller subarrays first
   - Use results to solve larger subarrays
   - Guarantees all dependencies are available

4️⃣ CORRECTNESS:
   - Base cases handle edge cases correctly
   - Include/exclude logic ensures no consecutive elements
   - Maximum selection guarantees optimal sum

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Considers all possible combinations: ✓
- Ensures no two consecutive elements: ✓
- Takes maximum at each step: ✓
- Base cases are correct: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Standard Version (maxSumWithNoTwoConsecutive):
Line 2: Initialize DP array
  - Create array of size n
  - Fill with 0 initially

Line 4: Set base case 1
  - dp[0] = arr[0] (first element)

Line 5: Set base case 2
  - dp[1] = max(arr[0], arr[1]) (first two elements)

Line 7-11: Build DP array
  - For each i from 2 to n-1
  - Try include (arr[i] + dp[i-2])
  - Try exclude (dp[i-1])
  - Take maximum

Line 13: Return result
  - dp[n-1] contains maximum sum

Space-Optimized Version (maxSumNoAdjacent2):
Line 19-20: Handle base cases
  - Empty array: return 0
  - Single element: return arr[0]

Line 22-23: Initialize variables
  - prev2 = arr[0] (dp[0])
  - prev1 = max(arr[0], arr[1]) (dp[1])

Line 25-29: Build solution
  - For each i from 2 to n-1
  - Compute curr = max(prev1, prev2 + arr[i])
  - Update prev2 = prev1, prev1 = curr

Line 31: Return result
  - prev1 contains maximum sum

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- House robbery problem (can't rob adjacent houses)
- Resource allocation
- Scheduling problems
- Selection problems with constraints
- Optimization problems

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Max Sum with No Two Consecutive (this problem)
- House Robber
- Maximum Sum of Non-Adjacent Elements
- Stick Thief Problem
- Maximum Subset Sum

─────────────────────────────────────────

🎯 COMPARISON WITH RECURSIVE APPROACH:

Plain Recursion (See 01_plain_recursion.js):
- Time: O(2^n) exponential
- Space: O(n) recursion stack
- Recalculates same subproblems
- Very slow for large inputs

DP Tabulation (This solution):
- Time: O(n) linear
- Space: O(n) for DP array (or O(1) for space-optimized)
- Each subproblem solved once
- Much faster and efficient

Improvement:
- Time: From O(2^n) to O(n) - massive improvement
- Space: From O(n) to O(n) or O(1) - same or better

─────────────────────────────────────────

🎯 COMPARISON BETWEEN TWO VERSIONS:

Standard Version (maxSumWithNoTwoConsecutive):
- Space: O(n) - uses entire DP array
- Easier to understand and debug
- Can track all intermediate values
- Good for learning and understanding

Space-Optimized Version (maxSumNoAdjacent2):
- Space: O(1) - uses only two variables
- More memory efficient
- Same time complexity O(n)
- Better for production code

Key Difference:
- Standard: Stores all dp[i] values in array
- Optimized: Only stores dp[i-2] and dp[i-1] in variables
- Both produce same result, optimized version uses less memory

─────────────────────────────────────────

🎯 KEY INSIGHTS:

1️⃣ INCLUDE/EXCLUDE PATTERN:
   - At each step, include or exclude current element
   - If include: skip previous element (use dp[i-2])
   - If exclude: consider previous element (use dp[i-1])
   - Take maximum

2️⃣ BOTTOM-UP APPROACH:
   - Build from smaller subarrays to larger subarrays
   - Use results of smaller subproblems
   - Guarantees optimal solution

3️⃣ BASE CASES:
   - dp[0] = arr[0] (first element)
   - dp[1] = max(arr[0], arr[1]) (first two elements)

4️⃣ NO CONSECUTIVE CONSTRAINT:
   - When including, we skip previous element (dp[i-2])
   - This ensures no two consecutive elements are selected

5️⃣ SPACE OPTIMIZATION:
   - We only need dp[i-2] and dp[i-1] to compute dp[i]
   - Don't need entire array
   - Can reduce space from O(n) to O(1)

─────────────────────────────────────────

🎯 VARIABLE NAMING:

Standard Version:
- `arr`: Input array of positive integers
- `n`: Array length
- `dp[i]`: Maximum sum with no two consecutive elements from arr[0...i]
- `i`: Current index being processed
- `include`: Maximum sum when including arr[i]
- `exclude`: Maximum sum when excluding arr[i]

Space-Optimized Version:
- `arr`: Input array of positive integers
- `prev2`: dp[i-2] (maximum sum from arr[0...i-2])
- `prev1`: dp[i-1] (maximum sum from arr[0...i-1])
- `curr`: dp[i] (maximum sum from arr[0...i])
- `i`: Current index being processed

─────────────────────────────────────────

🎯 CONCLUSION:
Max Sum with No Two Consecutive using DP Tabulation efficiently finds the
maximum sum by building a DP array bottom-up, trying both options (include
current element or exclude it) at each step, ensuring no two consecutive
elements are selected (by using dp[i-2] when including), and taking the
maximum of both choices. This achieves O(n) time complexity, a massive
improvement over the exponential recursive approach. The space can be further
optimized to O(1) by using only two variables instead of an array, as shown
in the space-optimized version!
*/