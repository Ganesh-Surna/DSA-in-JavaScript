/* Problem: ✅✅✅✅ Subset Sum (Plain Recursion) ✅✅✅✅

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
- 1 ≤ arr.length ≤ 20
- 1 ≤ arr[i] ≤ 1000
- 0 ≤ sum ≤ 1000

Expected Complexities:
Time Complexity: O(2^n) exponential (worst case, without memoization)
Space Complexity: O(n) for recursion stack

⚠️ Note: This is a plain recursive solution with exponential time complexity.
For better performance, see the DP Tabulation solution in 03_DP_Tabulation.js.

🧠 Core Idea:
- This is a counting problem using include/exclude pattern.
- For each element, we have two choices:
  1. Include the element: Subtract its value from sum and consider remaining elements
  2. Exclude the element: Keep sum unchanged and consider remaining elements
- Count ways from both choices and add them (not max, because we're counting).
- Base cases: sum becomes 0 (found a way) or no elements left or sum becomes negative.

📈 Recurrence Relation:
  if sum === 0:
      return 1  // Base case: found a way to form sum 0 (empty subset or exact match)
  
  if n === 0 || sum < 0:
      return 0  // Base case: no elements left or sum negative (no way)
  
  include = subsetSum(arr, sum - arr[n-1], n-1)
  // Include last element: subtract its value, consider remaining elements
  
  exclude = subsetSum(arr, sum, n-1)
  // Exclude last element: keep sum unchanged, consider remaining elements
  
  return include + exclude  // Add both counts (we're counting ways)

Base Cases:
- sum === 0: return 1 (found a way - empty subset or exact match)
- n === 0: return 0 (no elements left, no way)
- sum < 0: return 0 (sum became negative, no way)

🎯 Why This Approach?
- Optimal substructure: Number of ways for sum with n elements depends on
  number of ways for smaller sums or fewer elements.
- Overlapping subproblems: Same subproblems are recalculated multiple times.
- Recursive solution explores all possible subsets.
- Guarantees correct count by considering both choices at each step.

💡 Key Insights:
- Include/exclude pattern: At each step, include or exclude the current element
- If we include: Subtract element value from sum (sum - arr[n-1])
- If we exclude: Keep sum unchanged
- Add both counts (we're counting ways, not finding max/min)
- Base case: sum === 0 means we found a way

⚠️ IMPORTANT: Why Add (include + exclude) Instead of Max?

This is a COUNTING problem, not an optimization problem!

We're counting the NUMBER OF WAYS to form the target sum.

When we have two choices:
- Include: Gives us `include` number of ways
- Exclude: Gives us `exclude` number of ways
- Total ways = include + exclude (add both counts)

Example: arr = [1, 2, 3], sum = 3
- Include 3: Ways to form sum 3-3=0 with [1, 2] → 1 way (empty subset)
- Exclude 3: Ways to form sum 3 with [1, 2] → 1 way ({1, 2})
- Total: 1 + 1 = 2 ways ({3} and {1, 2})

If we used max: max(1, 1) = 1 ✗ (wrong, we have 2 ways)
If we use add: 1 + 1 = 2 ✓ (correct, we have 2 ways)

⭐ WHY sum === 0 Returns 1?

When sum becomes 0, we've successfully formed the target sum!

This can happen in two ways:
1. We've selected elements that exactly sum to the target
2. We're considering an empty subset (sum was already 0)

Example: arr = [10, 20], sum = 0
- Empty subset {} has sum 0 → 1 way ✓

Example: arr = [1, 2, 3], sum = 3
- We include 3, sum becomes 3-3=0 → found a way ✓
- We return 1 to count this way
*/

// ✅ TC = O(2^n) exponential (worst case, without memoization)
// ✅ SC = O(n) for recursion stack
function subsetSum(arr, sum=0, n=arr.length) {
    // Base case: If sum becomes 0, we found a way to form the target sum
    // This counts as 1 way (either empty subset or exact match)
    if(sum===0) return 1 // Counting 1 if the sum becomes 0
    
    // Base case: If no elements left or sum becomes negative, no way to form sum
    if(n===0 || sum < 0) return 0
    
    // Option 1: Include the last element (arr[n-1])
    // If we include arr[n-1], we subtract its value from sum
    // Then we recursively solve for remaining elements (n-1) with new sum (sum-arr[n-1])
    let include = subsetSum(arr, sum-arr[n-1], n-1)
    
    // Option 2: Exclude the last element (arr[n-1])
    // If we exclude arr[n-1], we keep sum unchanged
    // Then we recursively solve for remaining elements (n-1) with same sum
    let exclude = subsetSum(arr, sum, n-1)
    
    // ⚠️ WHY Add (include + exclude)?
    // We're COUNTING the number of ways, not finding maximum/minimum.
    // Total ways = ways from including + ways from excluding
    // We add both counts to get total number of ways.
    return include + exclude 
}

console.log(subsetSum([10, 5, 2, 3, 6], 8)); // 2 --> {5, 3} & {2, 6}
console.log(subsetSum([1, 2, 3, 4, 5], 10)); // 3 --> {1, 2, 3, 4} & {2, 3, 5} & {1, 4, 5}
console.log(subsetSum([10, 20], 0)); // 1 --> {} i.e., empty subset
console.log(subsetSum([10, 20, 15], 37)); // 0 --> No subset found

/*🎯 STEP-BY-STEP WALKTHROUGH (arr = [10, 5, 2, 3, 6], sum = 8)

We'll trace through the recursive calls to count the number of ways to form sum 8.

Initial call: subsetSum([10, 5, 2, 3, 6], 8, 5)

subsetSum([10, 5, 2, 3, 6], 8, 5):
  n=5, sum=8, arr[4]=6
  Not base case (sum≠0, n≠0, sum>0)
  
  Option 1: Include arr[4]=6
    include = subsetSum([10, 5, 2, 3, 6], 8-6=2, 4)
    // Include 6, new sum = 2, solve for [10, 5, 2, 3]
  
  Option 2: Exclude arr[4]=6
    exclude = subsetSum([10, 5, 2, 3, 6], 8, 4)
    // Exclude 6, sum = 8, solve for [10, 5, 2, 3]
  
  res = include + exclude

Let's compute each:

Option 1: Include arr[4]=6
  subsetSum([10, 5, 2, 3, 6], 2, 4):
    n=4, sum=2, arr[3]=3
    Not base case
    
    Option 1: Include arr[3]=3
      include = subsetSum([10, 5, 2, 3, 6], 2-3=-1, 3)
      // Include 3, new sum = -1
      subsetSum([10, 5, 2, 3, 6], -1, 3):
        sum=-1 < 0, base case!
        return 0
      include = 0
    
    Option 2: Exclude arr[3]=3
      exclude = subsetSum([10, 5, 2, 3, 6], 2, 3)
      // Exclude 3, sum = 2, solve for [10, 5, 2]
      subsetSum([10, 5, 2, 3, 6], 2, 3):
        n=3, sum=2, arr[2]=2
        Not base case
        
        Option 1: Include arr[2]=2
          include = subsetSum([10, 5, 2, 3, 6], 2-2=0, 2)
          // Include 2, new sum = 0
          subsetSum([10, 5, 2, 3, 6], 0, 2):
            sum=0, base case!
            return 1
          include = 1
        
        Option 2: Exclude arr[2]=2
          exclude = subsetSum([10, 5, 2, 3, 6], 2, 2)
          // Exclude 2, sum = 2, solve for [10, 5]
          subsetSum([10, 5, 2, 3, 6], 2, 2):
            n=2, sum=2, arr[1]=5
            Not base case
            
            Option 1: Include arr[1]=5
              include = subsetSum([10, 5, 2, 3, 6], 2-5=-3, 1)
              sum=-3 < 0, return 0
              include = 0
            
            Option 2: Exclude arr[1]=5
              exclude = subsetSum([10, 5, 2, 3, 6], 2, 1)
              // Exclude 5, sum = 2, solve for [10]
              subsetSum([10, 5, 2, 3, 6], 2, 1):
                n=1, sum=2, arr[0]=10
                Not base case
                
                Option 1: Include arr[0]=10
                  include = subsetSum([10, 5, 2, 3, 6], 2-10=-8, 0)
                  sum=-8 < 0, return 0
                  include = 0
                
                Option 2: Exclude arr[0]=10
                  exclude = subsetSum([10, 5, 2, 3, 6], 2, 0)
                  n=0, return 0
                  exclude = 0
                
                res = 0 + 0 = 0
              exclude = 0
            
            res = 0 + 0 = 0
          exclude = 0
        
        res = 1 + 0 = 1
      exclude = 1
    
    res = 0 + 1 = 1
  include = 1

Option 2: Exclude arr[4]=6
  subsetSum([10, 5, 2, 3, 6], 8, 4):
    n=4, sum=8, arr[3]=3
    Not base case
    
    Option 1: Include arr[3]=3
      include = subsetSum([10, 5, 2, 3, 6], 8-3=5, 3)
      // Include 3, new sum = 5, solve for [10, 5, 2]
      subsetSum([10, 5, 2, 3, 6], 5, 3):
        n=3, sum=5, arr[2]=2
        Not base case
        
        Option 1: Include arr[2]=2
          include = subsetSum([10, 5, 2, 3, 6], 5-2=3, 2)
          // Include 2, new sum = 3, solve for [10, 5]
          subsetSum([10, 5, 2, 3, 6], 3, 2):
            n=2, sum=3, arr[1]=5
            Not base case
            
            Option 1: Include arr[1]=5
              include = subsetSum([10, 5, 2, 3, 6], 3-5=-2, 1)
              sum=-2 < 0, return 0
              include = 0
            
            Option 2: Exclude arr[1]=5
              exclude = subsetSum([10, 5, 2, 3, 6], 3, 1)
              // Exclude 5, sum = 3, solve for [10]
              subsetSum([10, 5, 2, 3, 6], 3, 1):
                n=1, sum=3, arr[0]=10
                Not base case
                
                Option 1: Include arr[0]=10
                  include = subsetSum([10, 5, 2, 3, 6], 3-10=-7, 0)
                  sum=-7 < 0, return 0
                  include = 0
                
                Option 2: Exclude arr[0]=10
                  exclude = subsetSum([10, 5, 2, 3, 6], 3, 0)
                  n=0, return 0
                  exclude = 0
                
                res = 0 + 0 = 0
              exclude = 0
            
            res = 0 + 0 = 0
          include = 0
        
        Option 2: Exclude arr[2]=2
          exclude = subsetSum([10, 5, 2, 3, 6], 5, 2)
          // Exclude 2, sum = 5, solve for [10, 5]
          subsetSum([10, 5, 2, 3, 6], 5, 2):
            n=2, sum=5, arr[1]=5
            Not base case
            
            Option 1: Include arr[1]=5
              include = subsetSum([10, 5, 2, 3, 6], 5-5=0, 1)
              // Include 5, new sum = 0
              subsetSum([10, 5, 2, 3, 6], 0, 1):
                sum=0, base case!
                return 1
              include = 1
            
            Option 2: Exclude arr[1]=5
              exclude = subsetSum([10, 5, 2, 3, 6], 5, 1)
              // Exclude 5, sum = 5, solve for [10]
              subsetSum([10, 5, 2, 3, 6], 5, 1):
                n=1, sum=5, arr[0]=10
                Not base case
                
                Option 1: Include arr[0]=10
                  include = subsetSum([10, 5, 2, 3, 6], 5-10=-5, 0)
                  sum=-5 < 0, return 0
                  include = 0
                
                Option 2: Exclude arr[0]=10
                  exclude = subsetSum([10, 5, 2, 3, 6], 5, 0)
                  n=0, return 0
                  exclude = 0
                
                res = 0 + 0 = 0
              exclude = 0
            
            res = 1 + 0 = 1
          exclude = 1
        
        res = 0 + 1 = 1
      include = 1
    
    Option 2: Exclude arr[3]=3
      exclude = subsetSum([10, 5, 2, 3, 6], 8, 3)
      // Exclude 3, sum = 8, solve for [10, 5, 2]
      // This will not find any way (sum 8 with [10, 5, 2] is impossible)
      exclude = 0
    
    res = 1 + 0 = 1
  exclude = 1

Back to initial call:
  res = 1 + 1 = 2

🏆 Result: 2

✅ Number of ways to form sum 8 = 2
  - Way 1: {5, 3} → 5 + 3 = 8
  - Way 2: {2, 6} → 2 + 6 = 8

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Counting with Include/Exclude Pattern
- At each step, we make a decision: include current element or exclude it
- If include: Subtract element value from sum and consider remaining elements
- If exclude: Keep sum unchanged and consider remaining elements
- Count ways from both choices and add them (we're counting, not optimizing)

Recursive Structure:
1. Base case: sum === 0 → return 1 (found a way)
2. Base case: n === 0 or sum < 0 → return 0 (no way)
3. Try including last element:
   a. Subtract arr[n-1] from sum
   b. Recursively solve for remaining elements (n-1) with new sum
4. Try excluding last element:
   a. Keep sum unchanged
   b. Recursively solve for remaining elements (n-1) with same sum
5. Add both counts (total ways = include ways + exclude ways)

Why Add Instead of Max?
- This is a COUNTING problem, not an optimization problem
- We want total number of ways, not maximum/minimum
- Total ways = ways from including + ways from excluding
- Example: 2 ways from include + 1 way from exclude = 3 total ways

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

CASE 1: Sum = 0
Input: arr = [10, 20], sum = 0
sum=0, base case: return 1 ✓ (empty subset)

CASE 2: No Way
Input: arr = [10, 20, 15], sum = 37
All recursive paths lead to sum < 0 or n = 0
return 0 ✓

CASE 3: Single Element Matches
Input: arr = [5], sum = 5
Include 5: sum becomes 0 → return 1
Exclude 5: sum=5, n=0 → return 0
return 1 + 0 = 1 ✓

CASE 4: Single Element Doesn't Match
Input: arr = [5], sum = 10
Include 5: sum becomes 5, n=0 → return 0
Exclude 5: sum=10, n=0 → return 0
return 0 + 0 = 0 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Number of ways for sum with n elements depends on number of ways for
     smaller sums or fewer elements
   - Optimal solution contains optimal solutions to subproblems
   - Try both options and add counts

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are recalculated multiple times
   - Example: subsetSum(arr, 5, 2) might be called from multiple paths
   - This is why DP (memoization) helps

3️⃣ COUNTING PATTERN:
   - At each step, we have two choices
   - We explore both choices recursively
   - Add counts to get total number of ways

4️⃣ CORRECTNESS:
   - Base cases handle edge cases correctly
   - Include/exclude logic ensures all subsets are considered
   - Addition of counts guarantees correct total

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Tries all possible subsets: ✓
- Counts ways correctly: ✓
- Adds counts at each step: ✓
- Base cases are correct: ✓
- Guarantees correct count: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 2: Check base case (sum === 0)
  - If sum becomes 0, we found a way
  - Return 1 to count this way

Line 3: Check base cases (n === 0 or sum < 0)
  - If no elements left or sum negative, no way
  - Return 0

Line 5: Try including last element
  - Subtract arr[n-1] from sum
  - Recursively solve for n-1 elements

Line 6: Try excluding last element
  - Keep sum unchanged
  - Recursively solve for n-1 elements

Line 8: Return sum of counts
  - Add include and exclude counts
  - Total ways = ways from including + ways from excluding

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

🎯 TESTING STRATEGY:
- Sum = 0 (empty subset)
- No way to form sum
- Single element matches
- Single element doesn't match
- Multiple ways
- Large values

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print recursive calls with parameters
- Track which option is being tried (include or exclude)
- Verify base case is reached
- Check if counts are added correctly
- Trace through small examples manually
- Verify sum doesn't go negative unnecessarily

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Using max instead of add (wrong for counting problems)
- Wrong base case (returning 0 instead of 1 for sum=0)
- Not handling sum < 0 case
- Confusing with optimization problems

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Clear base cases (sum=0 → 1, n=0 or sum<0 → 0)
- Try both options (include and exclude)
- Add counts (not max/min for counting problems)
- Handle edge cases properly

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the counting vs optimization difference clearly
- Walk through a small example
- Discuss time and space complexity
- Mention exponential time complexity
- Suggest DP optimization
- Handle edge cases
- Explain why we add instead of max

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
- subsetSum(arr, 5, 2) might be called from multiple paths
- Without memoization, it's recalculated each time

─────────────────────────────────────────

🎯 KEY INSIGHTS:

1️⃣ COUNTING VS OPTIMIZATION:
   - This is a COUNTING problem, not optimization
   - We add counts (include + exclude), not max/min
   - Total ways = sum of ways from all choices

2️⃣ INCLUDE/EXCLUDE PATTERN:
   - At each step, include or exclude current element
   - If include: subtract element value from sum
   - If exclude: keep sum unchanged
   - Add both counts

3️⃣ BASE CASES:
   - sum=0: return 1 (found a way)
   - n=0 or sum<0: return 0 (no way)

4️⃣ RECURRENCE RELATION:
   - include = solve(sum - arr[n-1], n-1)
   - exclude = solve(sum, n-1)
   - result = include + exclude

─────────────────────────────────────────

🎯 VARIABLE NAMING:
- `arr`: Input array of positive integers
- `sum`: Target sum we're trying to form
- `n`: Current number of elements being considered
- `include`: Number of ways when including the last element
- `exclude`: Number of ways when excluding the last element

─────────────────────────────────────────

🎯 CONCLUSION:
Subset Sum using Plain Recursion counts the number of ways to form a target
sum by recursively trying both options (include current element or exclude it),
subtracting element value when including, keeping sum unchanged when excluding,
and adding the counts from both choices. While intuitive, this approach has
exponential time complexity O(2^n). For better performance, use DP memoization
or tabulation (see 03_DP_Tabulation.js)!
*/