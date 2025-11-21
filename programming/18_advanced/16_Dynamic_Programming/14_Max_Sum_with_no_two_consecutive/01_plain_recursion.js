/* Problem: ✅✅✅✅ Max Sum with No Two Consecutive (Plain Recursion) ✅✅✅✅

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
Time Complexity: O(2^n) exponential (worst case, without memoization)
Space Complexity: O(n) for recursion stack

⚠️ Note: This is a plain recursive solution with exponential time complexity.
For better performance, see the DP Tabulation solution in 03_DP_Tabulation.js.

🧠 Core Idea:
- This is a classic include/exclude pattern problem.
- For each element, we have two choices:
  1. Include the element: Add its value and skip the previous element
  2. Exclude the element: Don't add it and consider the previous element
- Take the maximum of both choices.
- Base cases: empty array (0) and single element (the element itself).

📈 Recurrence Relation:
  if n === 0:
      return 0  // Base case: empty array, sum = 0
  
  if n === 1:
      return arr[0]  // Base case: single element, sum = element value
  
  include = arr[n-1] + maxSumWithNoTwoConsecutive(arr, n-2)
  // Include last element: add its value and skip previous element (n-2)
  
  exclude = maxSumWithNoTwoConsecutive(arr, n-1)
  // Exclude last element: don't add it, consider previous elements (n-1)
  
  return max(include, exclude)

Base Cases:
- n === 0: return 0 (empty array, no sum)
- n === 1: return arr[0] (single element, return its value)

🎯 Why This Approach?
- Optimal substructure: Maximum sum for n elements depends on maximum sum for
  smaller subarrays (n-1 or n-2 elements).
- Overlapping subproblems: Same subproblems are recalculated multiple times.
- Recursive solution explores all possible combinations.
- Guarantees optimal solution by considering both choices at each step.

💡 Key Insights:
- Include/exclude pattern: At each step, include or exclude the current element
- If we include: We must skip the previous element (to avoid consecutive)
- If we exclude: We can consider the previous element
- Take maximum of both choices
- Base cases handle empty array and single element

⚠️ IMPORTANT: Why n-2 When Including?

When we include arr[n-1] (the last element):
- We add arr[n-1] to our sum
- We must skip arr[n-2] (previous element) to avoid consecutive elements
- So we recursively solve for arr[0...n-3], which has length n-2
- This ensures no two consecutive elements are selected

Example: arr = [1, 2, 3, 4, 5], n = 5
- Include arr[4] = 5: We add 5, skip arr[3] = 4
- Solve for arr[0...2] = [1, 2, 3] with length 3 (n-2 = 5-2 = 3) ✓
*/

// ✅ TC = O(2^n) exponential (worst case, without memoization)
// ✅ SC = O(n) for recursion stack
function maxSumWithNoTwoConsecutive(arr, n=arr.length) {
    // Base case: empty array, sum = 0
    if(n===0) return 0
    
    // Base case: single element, return its value
    if(n===1) return arr[0]
    
    // Option 1: Include the last element (arr[n-1])
    // If we include arr[n-1], we must skip arr[n-2] to avoid consecutive elements
    // So we recursively solve for arr[0...n-3], which has length n-2
    let include = arr[n-1] + maxSumWithNoTwoConsecutive(arr, n-2)
    
    // Option 2: Exclude the last element (arr[n-1])
    // If we exclude arr[n-1], we can consider all previous elements
    // So we recursively solve for arr[0...n-2], which has length n-1
    let exclude = maxSumWithNoTwoConsecutive(arr, n-1)
    
    // Take maximum of both choices (we want maximum sum)
    return Math.max(include, exclude)
}

console.log(maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5])); // 9 --> [1, 3, 5]
console.log(maxSumWithNoTwoConsecutive([10, 5, 15, 20, 2, 30])); // 60 --> [10, 20, 30]

/*🎯 STEP-BY-STEP WALKTHROUGH (arr = [1, 2, 3, 4, 5])

We'll trace through the recursive calls to find maximum sum with no two consecutive elements.

Initial call: maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 5)

maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 5):
  n=5, arr[4]=5
  Not base case (n≠0, n≠1)
  
  Option 1: Include arr[4]=5
    include = 5 + maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 3)
    // Include 5, skip 4, solve for [1, 2, 3]
  
  Option 2: Exclude arr[4]=5
    exclude = maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 4)
    // Exclude 5, solve for [1, 2, 3, 4]
  
  res = max(include, exclude)

Let's compute each:

Option 1: Include arr[4]=5
  maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 3):
    n=3, arr[2]=3
    Not base case
    
    Option 1: Include arr[2]=3
      include = 3 + maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 1)
      // Include 3, skip 2, solve for [1]
      maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 1):
        n=1, base case!
        return arr[0] = 1
      include = 3 + 1 = 4
    
    Option 2: Exclude arr[2]=3
      exclude = maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 2)
      // Exclude 3, solve for [1, 2]
      maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 2):
        n=2, arr[1]=2
        Not base case
        
        Option 1: Include arr[1]=2
          include = 2 + maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 0)
          // Include 2, skip 1, solve for []
          maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 0):
            n=0, base case!
            return 0
          include = 2 + 0 = 2
        
        Option 2: Exclude arr[1]=2
          exclude = maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 1)
          // Exclude 2, solve for [1]
          maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 1):
            n=1, base case!
            return arr[0] = 1
          exclude = 1
        
        res = max(2, 1) = 2
      exclude = 2
    
    res = max(4, 2) = 4
  include = 5 + 4 = 9

Option 2: Exclude arr[4]=5
  maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 4):
    n=4, arr[3]=4
    Not base case
    
    Option 1: Include arr[3]=4
      include = 4 + maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 2)
      // Include 4, skip 3, solve for [1, 2]
      // We already computed this above: maxSum([1, 2]) = 2
      include = 4 + 2 = 6
    
    Option 2: Exclude arr[3]=4
      exclude = maxSumWithNoTwoConsecutive([1, 2, 3, 4, 5], 3)
      // Exclude 4, solve for [1, 2, 3]
      // We already computed this above: maxSum([1, 2, 3]) = 4
      exclude = 4
    
    res = max(6, 4) = 6
  exclude = 6

Back to initial call:
  res = max(9, 6) = 9

🏆 Result: 9

✅ Maximum sum = 9 (select elements at indices [0, 2, 4]: 1 + 3 + 5 = 9)

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Include/Exclude Pattern
- At each step, we make a decision: include current element or exclude it
- If include: Add value and skip previous element (to avoid consecutive)
- If exclude: Don't add value and consider previous element
- Take maximum of both choices

Recursive Structure:
1. Base case: n=0 → return 0 (empty array)
2. Base case: n=1 → return arr[0] (single element)
3. Try including last element:
   a. Add arr[n-1] to sum
   b. Skip arr[n-2] (previous element)
   c. Recursively solve for arr[0...n-3] (length n-2)
4. Try excluding last element:
   a. Don't add arr[n-1]
   b. Recursively solve for arr[0...n-2] (length n-1)
5. Take maximum of both options

Why n-2 When Including?
- If we include arr[n-1], we add it to our sum
- We must skip arr[n-2] to avoid consecutive elements
- Remaining array: arr[0...n-3] has length n-2
- This ensures no two consecutive elements are selected

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- At each level, we make 2 choices (include or exclude)
- Maximum depth: n (array length)
- Total recursive calls: O(2^n) in worst case
- Each call: O(1) operations
- Total: O(2^n) exponential

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack depth: O(n) in worst case
- Each call: O(1) space
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Empty Array
Input: arr = []
n=0, base case: return 0 ✓

CASE 2: Single Element
Input: arr = [5]
n=1, base case: return 5 ✓

CASE 3: Two Elements
Input: arr = [5, 10]
Include arr[1]=10: 10 + maxSum([], 0) = 10 + 0 = 10
Exclude arr[1]=10: maxSum([5], 1) = 5
return max(10, 5) = 10 ✓

CASE 4: All Same Values
Input: arr = [5, 5, 5, 5]
Optimal: Select every other element
return 10 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Maximum sum for n elements depends on maximum sum for n-1 or n-2 elements
   - Optimal solution contains optimal solutions to subproblems
   - Try both options and take maximum

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are recalculated multiple times
   - Example: maxSum(arr, 2) might be called from multiple paths
   - This is why DP (memoization) helps

3️⃣ INCLUDE/EXCLUDE PATTERN:
   - At each step, we have two choices
   - We explore both choices recursively
   - Take maximum to get optimal solution

4️⃣ CORRECTNESS:
   - Base cases handle edge cases correctly
   - Include/exclude logic ensures no consecutive elements
   - Maximum selection guarantees optimal sum

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Tries all possible combinations: ✓
- Ensures no two consecutive elements: ✓
- Takes maximum at each step: ✓
- Base cases are correct: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 2-3: Check base cases
  - If n === 0, return 0 (empty array)
  - If n === 1, return arr[0] (single element)

Line 5: Try including last element
  - Add arr[n-1] to sum
  - Recursively solve for n-2 (skip previous element)

Line 6: Try excluding last element
  - Don't add arr[n-1]
  - Recursively solve for n-1 (consider previous elements)

Line 8: Return maximum
  - Take maximum of include and exclude

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

🎯 TESTING STRATEGY:
- Empty array
- Single element
- Two elements
- All same values
- Alternating pattern
- Large values
- Edge values

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print recursive calls with parameters
- Track which option is being tried (include or exclude)
- Verify base case is reached
- Check if maximum is calculated correctly
- Trace through small examples manually
- Verify no consecutive elements are selected

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Forgetting to skip previous element when including
- Wrong base case (returning 1 instead of arr[0] for n=1)
- Not considering both options
- Confusing n-1 and n-2 indices

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Clear base cases (n=0 → 0, n=1 → arr[0])
- Try both options (include and exclude)
- Take maximum of both choices
- Handle edge cases properly

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the include/exclude pattern clearly
- Walk through a small example
- Discuss time and space complexity
- Mention exponential time complexity
- Suggest DP optimization
- Handle edge cases
- Explain why n-2 when including

─────────────────────────────────────────

🎯 OPTIMIZATION NOTE:

⚠️ EXPONENTIAL TIME COMPLEXITY:
This plain recursive solution has O(2^n) time complexity, which is very slow
for large inputs. The same subproblems are recalculated multiple times.

For better performance, use:
- Memoization (DP Top-down): O(n) time, O(n) space
- Tabulation (DP Bottom-up): O(n) time, O(n) space
- Space-optimized: O(n) time, O(1) space
- See 03_DP_Tabulation.js for optimized solution

Example of overlapping subproblems:
- maxSumWithNoTwoConsecutive(arr, 2) might be called from multiple paths
- Without memoization, it's recalculated each time

─────────────────────────────────────────

🎯 KEY INSIGHTS:

1️⃣ INCLUDE/EXCLUDE PATTERN:
   - At each step, include or exclude current element
   - If include: skip previous element (avoid consecutive)
   - If exclude: consider previous element
   - Take maximum

2️⃣ RECURRENCE RELATION:
   - include = arr[n-1] + solve(n-2)
   - exclude = solve(n-1)
   - result = max(include, exclude)

3️⃣ BASE CASES:
   - n=0: return 0 (empty array)
   - n=1: return arr[0] (single element)

4️⃣ NO CONSECUTIVE CONSTRAINT:
   - When including, we skip previous element (n-2)
   - This ensures no two consecutive elements are selected

─────────────────────────────────────────

🎯 VARIABLE NAMING:
- `arr`: Input array of positive integers
- `n`: Current length of array being considered
- `include`: Maximum sum when including the last element
- `exclude`: Maximum sum when excluding the last element

─────────────────────────────────────────

🎯 CONCLUSION:
Max Sum with No Two Consecutive using Plain Recursion finds the maximum sum
by recursively trying both options (include current element or exclude it),
ensuring no two consecutive elements are selected (by using n-2 when including),
and taking the maximum of both choices. While intuitive, this approach has
exponential time complexity O(2^n). For better performance, use DP memoization
or tabulation (see 03_DP_Tabulation.js)!
*/