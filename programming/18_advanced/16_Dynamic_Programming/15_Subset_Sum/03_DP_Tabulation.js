/* Problem: ✅✅✅✅ Subset Sum (DP Tabulation) ✅✅✅✅

Given an array `arr` of positive integers and a target `sum`, count the number
of ways to form the target sum by selecting elements from the array. Each
element can be used at most once.

🎯 Goal: Count the number of subsets whose elements sum to the target value.

Example 1:
Input: arr = [10, 5, 2, 3, 6], sum = 8
Output: 2
Explanation: There are 2 ways to form sum 8:
  - Subset 1: {5, 3} → 5 + 3 = 8
  - Subset 2: {2, 6} → 2 + 6 = 8

Example 2:
Input: arr = [1, 2, 3, 4, 5], sum = 10
Output: 3
Explanation: There are 3 ways to form sum 10:
  - Subset 1: {1, 2, 3, 4} → 1 + 2 + 3 + 4 = 10
  - Subset 2: {2, 3, 5} → 2 + 3 + 5 = 10
  - Subset 3: {1, 4, 5} → 1 + 4 + 5 = 10

Example 3:
Input: arr = [10, 20], sum = 0
Output: 1
Explanation: There is 1 way to form sum 0:
  - Empty subset {} → sum = 0

Example 4:
Input: arr = [10, 20, 15], sum = 37
Output: 0
Explanation: No subset can form sum 37.

Constraints:
- 1 ≤ arr.length ≤ 100
- 1 ≤ arr[i] ≤ 1000
- 0 ≤ sum ≤ 1000

Expected Complexities:
Time Complexity: O(n × sum) where n = array length
Space Complexity: O(n × sum) for the DP table

⚠️ Note: This is the optimized DP Tabulation solution. For the plain recursive
approach with exponential time complexity, see 01_plain_recursion.js.

🧠 Core Idea:
- Use dynamic programming to build solution bottom-up
- dp[i][j] = number of ways to form sum j using first i elements
- For each element and each sum, we have two choices:
  1. Include the element: Subtract its value from sum and use previous elements
  2. Exclude the element: Keep sum unchanged and use previous elements
- Count ways from both choices and add them (counting problem, not optimization).
- Base cases: sum = 0 (1 way) and n = 0 (0 ways for sum > 0).

📈 Recurrence Relation:
  Base cases:
      dp[i][0] = 1  // Sum = 0, always 1 way (empty subset)
      dp[0][j] = 0  // No elements, 0 ways for sum > 0 (already initialized)
  
  For i from 1 to n, j from 1 to sum:
      if j >= arr[i-1]:
          dp[i][j] = dp[i-1][j] + dp[i-1][j-arr[i-1]]
          // Exclude: dp[i-1][j] (don't use arr[i-1])
          // Include: dp[i-1][j-arr[i-1]] (use arr[i-1], reduce sum)
      else:
          dp[i][j] = dp[i-1][j]
          // Can't include (sum too small), only exclude
  
  Answer = dp[n][sum]

Base Cases:
- dp[i][0] = 1 (sum = 0, always 1 way - empty subset)
- dp[0][j] = 0 for j > 0 (no elements, no way to form sum > 0)

🎯 Why This Approach?
- Optimal substructure: Number of ways for sum j with i elements depends on
  number of ways for smaller sums or fewer elements.
- Overlapping subproblems: Avoids recalculating the same subproblems.
- Tabulation builds solution from smaller to larger problems.
- Guarantees correct count by considering both choices at each step.

💡 Key Insights:
- dp[i][j] = number of ways to form sum j using first i elements
- Include/exclude pattern: At each step, include or exclude the current element
- If we include: Subtract element value from sum (j - arr[i-1])
- If we exclude: Keep sum unchanged (j)
- Add both counts (we're counting ways, not finding max/min)
- Base case: sum = 0 means we found a way

⚠️ IMPORTANT: Why Add (dp[i-1][j] + dp[i-1][j-arr[i-1]]) Instead of Max?

This is a COUNTING problem, not an optimization problem!

We're counting the NUMBER OF WAYS to form the target sum.

When we have two choices:
- Exclude arr[i-1]: Gives us dp[i-1][j] number of ways
- Include arr[i-1]: Gives us dp[i-1][j-arr[i-1]] number of ways
- Total ways = exclude ways + include ways (add both counts)

Example: arr = [1, 2, 3], sum = 3, i = 3
- Exclude 3: Ways to form sum 3 with [1, 2] → dp[2][3] = 1 way ({1, 2})
- Include 3: Ways to form sum 3-3=0 with [1, 2] → dp[2][0] = 1 way (empty subset)
- Total: 1 + 1 = 2 ways ({1, 2} and {3})

If we used max: max(1, 1) = 1 ✗ (wrong, we have 2 ways)
If we use add: 1 + 1 = 2 ✓ (correct, we have 2 ways)

⭐ WHY dp[i-1][j-arr[i-1]] When Including?

When we include arr[i-1]:
- We use arr[i-1] in our subset
- We need to form sum (j - arr[i-1]) using remaining elements
- Remaining elements: first i-1 elements (arr[0...i-2])
- So we use dp[i-1][j-arr[i-1]] (ways to form j-arr[i-1] with first i-1 elements)

Example: arr = [1, 2, 3], sum = 5, i = 3
- Include arr[2] = 3: We use 3, need to form sum 5-3=2
- Ways to form sum 2 with [1, 2]: dp[2][2] = 1 way ({2})
- Total: 1 way ({2, 3}) ✓

⭐ WHY dp[i-1][j] When Excluding?

When we exclude arr[i-1]:
- We don't use arr[i-1] in our subset
- We need to form sum j using remaining elements
- Remaining elements: first i-1 elements (arr[0...i-2])
- So we use dp[i-1][j] (ways to form j with first i-1 elements)

Example: arr = [1, 2, 3], sum = 3, i = 3
- Exclude arr[2] = 3: We don't use 3, need to form sum 3
- Ways to form sum 3 with [1, 2]: dp[2][3] = 1 way ({1, 2})
- Total: 1 way ({1, 2}) ✓
*/

// ✅ TC = O(n × sum) where n = array length, sum = target sum
// ✅ SC = O(n × sum) for 2D DP table
function subsetSum(arr, sum=0, n=arr.length) {
    // Early return: If sum = 0, always 1 way (empty subset)
    if(sum === 0) return 1 // subsetSum([], 0) should return 1 (empty subset)
    
    // Early return: If no elements, no way to form sum > 0
    if(n===0) return 0 
    
    // Initialize DP table: dp[i][j] = number of ways to form sum j using first i elements
    let dp = new Array(n+1)
    for(let i=0; i<n+1; i++){
        dp[i] = new Array(sum+1).fill(0)
    }
    
    // Base Cases:
    
    // 1. If sum=0 --> 1 subset (empty subset, always possible)
    // For any number of elements, sum=0 can always be formed by selecting nothing
    for(let i=0; i<n+1; i++){
        dp[i][0] = 1
    }
    
    // 2. If sum > 0 && n=0 --> No subsets
    // Already handled: dp[0][j] = 0 for j > 0 (initialized with 0)
    // No need to explicitly set, as array is already filled with 0
    
    // Build DP table: for each number of elements and each sum
    for(let i=1; i<n+1; i++){  // i = number of elements (start from 1)
        for(let j=1; j<sum+1; j++){  // j = current sum (start from 1)
            // Check if we can include arr[i-1] (current element)
            if(j >= arr[i-1]){ // sum >= current element value
                // We have two choices:
                // Option 1: Exclude arr[i-1] → use dp[i-1][j] (don't use current element)
                // Option 2: Include arr[i-1] → use dp[i-1][j-arr[i-1]] (use current element, reduce sum)
                // Total ways = exclude ways + include ways (we're counting, so add)
                dp[i][j] = dp[i-1][j] + dp[i-1][j-arr[i-1]]
            }else{
                // Can't include arr[i-1] (sum is too small)
                // Only option: Exclude arr[i-1] → use dp[i-1][j]
                dp[i][j] = dp[i-1][j]
            }
        }
    }
    
    // dp[n][sum] contains number of ways to form sum using all n elements
    return dp[n][sum]
}

console.log(subsetSum([10, 5, 2, 3, 6], 8)); // 2 --> {5, 3} & {2, 6}
console.log(subsetSum([1, 2, 3, 4, 5], 10)); // 3 --> {1, 2, 3, 4} & {2, 3, 5} & {1, 4, 5}
console.log(subsetSum([10, 20], 0)); // 1 --> {} i.e., empty subset
console.log(subsetSum([10, 20, 15], 37)); // 0 --> No subset found

/*🎯 STEP-BY-STEP WALKTHROUGH (arr = [10, 5, 2, 3, 6], sum = 8)

We'll build a DP table where dp[i][j] represents the number of ways to form
sum j using the first i elements.

Initialization:
arr = [10, 5, 2, 3, 6], n = 5, sum = 8

Step 1: Initialize Base Cases

Base case: dp[i][0] = 1 for all i (sum = 0, always 1 way - empty subset)
Base case: dp[0][j] = 0 for all j > 0 (no elements, no way to form sum > 0)

DP table after base cases:
dp = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0],  // i=0: no elements
  [1, 0, 0, 0, 0, 0, 0, 0, 0],  // i=1: can use arr[0]=10
  [1, 0, 0, 0, 0, 0, 0, 0, 0],  // i=2: can use arr[0,1]=[10,5]
  [1, 0, 0, 0, 0, 0, 0, 0, 0],  // i=3: can use arr[0,1,2]=[10,5,2]
  [1, 0, 0, 0, 0, 0, 0, 0, 0],  // i=4: can use arr[0,1,2,3]=[10,5,2,3]
  [1, 0, 0, 0, 0, 0, 0, 0, 0]   // i=5: can use all elements
]
      [0, 1, 2, 3, 4, 5, 6, 7, 8]  (sums)

Step 2: Compute dp[1][j] (using first 1 element: arr[0]=10)

j=1: 1 < 10, can't include → dp[1][1] = dp[0][1] = 0
j=2: 2 < 10, can't include → dp[1][2] = dp[0][2] = 0
...
j=10: 10 >= 10, can include:
  exclude: dp[0][10] = 0
  include: dp[0][10-10] = dp[0][0] = 1
  dp[1][10] = 0 + 1 = 1

For j < 10: dp[1][j] = 0
For j = 10: dp[1][10] = 1

Step 3: Compute dp[2][j] (using first 2 elements: arr[0,1]=[10,5])

j=1-4: j < 5, can't include 5 → dp[2][j] = dp[1][j] = 0
j=5: 5 >= 5, can include:
  exclude: dp[1][5] = 0
  include: dp[1][5-5] = dp[1][0] = 1
  dp[2][5] = 0 + 1 = 1
j=6-9: j < 10, can't include 10, but can include 5:
  exclude: dp[1][j] = 0
  include: dp[1][j-5] = dp[1][j-5] = 0 (if j-5 < 10) or 1 (if j-5 = 0)
  Actually, let's compute:
  j=6: exclude=0, include=dp[1][1]=0 → dp[2][6] = 0
  j=7: exclude=0, include=dp[1][2]=0 → dp[2][7] = 0
  j=8: exclude=0, include=dp[1][3]=0 → dp[2][8] = 0
j=10: 10 >= 5, can include:
  exclude: dp[1][10] = 1
  include: dp[1][10-5] = dp[1][5] = 0
  dp[2][10] = 1 + 0 = 1
j=15: 15 >= 5, can include:
  exclude: dp[1][15] = 0
  include: dp[1][15-5] = dp[1][10] = 1
  dp[2][15] = 0 + 1 = 1

Step 4: Compute dp[3][j] (using first 3 elements: arr[0,1,2]=[10,5,2])

j=1: 1 < 2, can't include → dp[3][1] = dp[2][1] = 0
j=2: 2 >= 2, can include:
  exclude: dp[2][2] = 0
  include: dp[2][2-2] = dp[2][0] = 1
  dp[3][2] = 0 + 1 = 1
j=3: 3 >= 2, can include:
  exclude: dp[2][3] = 0
  include: dp[2][3-2] = dp[2][1] = 0
  dp[3][3] = 0 + 0 = 0
...
j=7: 7 >= 2, can include:
  exclude: dp[2][7] = 0
  include: dp[2][7-2] = dp[2][5] = 1
  dp[3][7] = 0 + 1 = 1
j=8: 8 >= 2, can include:
  exclude: dp[2][8] = 0
  include: dp[2][8-2] = dp[2][6] = 0
  dp[3][8] = 0 + 0 = 0

Continue this process...

Final result: dp[5][8] = 2

✅ Number of ways to form sum 8 = 2
  - Way 1: {5, 3} → 5 + 3 = 8
  - Way 2: {2, 6} → 2 + 6 = 8

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Bottom-Up DP with Include/Exclude Pattern
- Build solution from smaller to larger problems
- dp[i][j] = number of ways to form sum j using first i elements
- For each element and each sum, try including it or excluding it
- Add counts from both choices (counting problem)

Algorithm Steps:
1. Initialize dp[i][0] = 1 for all i (sum = 0, always 1 way)
2. Initialize dp[0][j] = 0 for j > 0 (no elements, no way)
3. For each i from 1 to n (elements):
   a. For each j from 1 to sum (target sums):
      - If j >= arr[i-1]: Can include
        * Exclude: dp[i-1][j]
        * Include: dp[i-1][j-arr[i-1]]
        * Total: dp[i-1][j] + dp[i-1][j-arr[i-1]]
      - Else: Can't include
        * Only exclude: dp[i-1][j]
4. Return dp[n][sum]

Why dp[i-1][j-arr[i-1]] When Including?
- If we include arr[i-1], we use it in our subset
- We need to form sum (j - arr[i-1]) using remaining elements
- Remaining: first i-1 elements
- So we use dp[i-1][j-arr[i-1]]

Why dp[i-1][j] When Excluding?
- If we exclude arr[i-1], we don't use it
- We need to form sum j using remaining elements
- Remaining: first i-1 elements
- So we use dp[i-1][j]

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Initialize base cases: O(n)
- Outer loop: n iterations (i from 1 to n)
- Inner loop: sum iterations (j from 1 to sum)
- Each iteration: O(1) operations
- Total: O(n × sum)

🎯 SPACE COMPLEXITY ANALYSIS:
- DP table: O(n × sum)
- No additional space needed
- Total: O(n × sum)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Sum = 0
Input: arr = [10, 20], sum = 0
dp[i][0] = 1 for all i ✓ (empty subset)

CASE 2: No Way
Input: arr = [10, 20, 15], sum = 37
All dp[3][37] paths lead to 0
return 0 ✓

CASE 3: Single Element Matches
Input: arr = [5], sum = 5
dp[1][5] = dp[0][5] + dp[0][0] = 0 + 1 = 1 ✓

CASE 4: Single Element Doesn't Match
Input: arr = [5], sum = 10
dp[1][10] = dp[0][10] + dp[0][5] = 0 + 0 = 0 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Number of ways for sum j with i elements depends on number of ways for
     smaller sums or fewer elements
   - Optimal solution contains optimal solutions to subproblems
   - Try both options and add counts

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are solved only once
   - Results stored in DP table
   - No recalculation needed

3️⃣ BOTTOM-UP CONSTRUCTION:
   - Solve smaller problems first
   - Use results to solve larger problems
   - Guarantees all dependencies are available

4️⃣ CORRECTNESS:
   - Base cases handle edge cases correctly
   - Include/exclude logic ensures all subsets are considered
   - Addition of counts guarantees correct total

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Considers all possible subsets: ✓
- Counts ways correctly: ✓
- Adds counts at each step: ✓
- Base cases are correct: ✓
- Guarantees correct count: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 2-3: Early returns
  - If sum = 0, return 1 (empty subset)
  - If n = 0, return 0 (no elements)

Line 5-8: Initialize DP table
  - Create 2D array of size (n+1) × (sum+1)
  - Fill with 0 initially

Line 16-18: Set base case (sum = 0)
  - dp[i][0] = 1 for all i

Line 25-33: Build DP table
  - For each i from 1 to n (elements)
  - For each j from 1 to sum (target sums)
  - If j >= arr[i-1]: Can include
    * dp[i][j] = dp[i-1][j] + dp[i-1][j-arr[i-1]]
  - Else: Can't include
    * dp[i][j] = dp[i-1][j]

Line 35: Return result
  - dp[n][sum] contains number of ways

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Combinatorial counting problems
- Resource allocation
- Decision making
- Constraint satisfaction
- Optimization problems

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Subset Sum (this problem)
- Count Subsets with Given Sum
- Partition Equal Subset Sum
- Target Sum
- Coin Change (Count Ways)
- 0-1 Knapsack (similar structure)

─────────────────────────────────────────

🎯 COMPARISON WITH RECURSIVE APPROACH:

Plain Recursion (See 01_plain_recursion.js):
- Time: O(2^n) exponential
- Space: O(n) recursion stack
- Recalculates same subproblems
- Very slow for large inputs

DP Tabulation (This solution):
- Time: O(n × sum) polynomial
- Space: O(n × sum) for DP table
- Each subproblem solved once
- Much faster and efficient

Improvement:
- Time: From O(2^n) to O(n × sum) - massive improvement
- Space: From O(n) to O(n × sum) - trade-off for speed

─────────────────────────────────────────

🎯 KEY INSIGHTS:

1️⃣ COUNTING VS OPTIMIZATION:
   - This is a COUNTING problem, not optimization
   - We add counts (exclude + include), not max/min
   - Total ways = sum of ways from all choices

2️⃣ INCLUDE/EXCLUDE PATTERN:
   - At each step, include or exclude current element
   - If include: subtract element value from sum
   - If exclude: keep sum unchanged
   - Add both counts

3️⃣ BASE CASES:
   - dp[i][0] = 1 (sum=0, always 1 way)
   - dp[0][j] = 0 for j > 0 (no elements, no way)

4️⃣ DP STRUCTURE:
   - dp[i][j] = ways to form sum j with first i elements
   - Build from smaller to larger problems
   - Use previously computed values

─────────────────────────────────────────

🎯 VARIABLE NAMING:
- `arr`: Input array of positive integers
- `sum`: Target sum we're trying to form
- `n`: Array length
- `dp[i][j]`: Number of ways to form sum j using first i elements
- `i`: Current number of elements being considered
- `j`: Current sum being considered

─────────────────────────────────────────

🎯 CONCLUSION:
Subset Sum using DP Tabulation efficiently counts the number of ways to form
a target sum by building a DP table bottom-up, trying both options (include
current element or exclude it) at each step, subtracting element value when
including, keeping sum unchanged when excluding, and adding the counts from
both choices. This achieves O(n × sum) time complexity, a massive improvement
over the exponential recursive approach!
*/