/* Problem: ✅✅✅✅ Rope Cutting — Maximum Pieces (Plain Recursion) ✅✅✅✅

Given a rope of length `n` and three possible cut lengths `a`, `b`, and `c`, find
the maximum number of pieces that can be cut from the rope. You can make cuts
of lengths `a`, `b`, or `c` only. Return -1 if it's not possible to cut the rope.

🎯 Goal: Find the maximum number of pieces that can be cut from a rope of length n
using cuts of lengths a, b, or c.

Example 1:
Input: n = 5, a = 2, b = 5, c = 1
Output: 5
Explanation:
  - Cut 1: length 1 → remaining 4, pieces = 1
  - Cut 2: length 1 → remaining 3, pieces = 2
  - Cut 3: length 1 → remaining 2, pieces = 3
  - Cut 4: length 1 → remaining 1, pieces = 4
  - Cut 5: length 1 → remaining 0, pieces = 5
  - Maximum pieces = 5 (using all cuts of length 1)

Example 2:
Input: n = 23, a = 12, b = 9, c = 11
Output: 2
Explanation:
  - Option 1: Cut 12 + 11 = 23 → pieces = 2
  - Option 2: Cut 9 + 9 + 5 (not possible) → invalid
  - Maximum pieces = 2

Example 3:
Input: n = 5, a = 4, b = 2, c = 6
Output: -1
Explanation:
  - Cannot cut rope of length 5 using lengths 4, 2, or 6
  - 4 > 5 (too large), 2 can be used but 5-2=3 cannot be cut further
  - 6 > 5 (too large)
  - Not possible → return -1

Example 4:
Input: n = 9, a = 2, b = 2, c = 2
Output: -1
Explanation:
  - All cut lengths are 2
  - 9 is odd, cannot be divided into pieces of length 2
  - Not possible → return -1

Constraints:
- 1 ≤ n ≤ 10^4
- 1 ≤ a, b, c ≤ 10^4

Expected Complexities:
Time Complexity: O(3^n) exponential (worst case, without memoization)
Space Complexity: O(n) for recursion stack

⚠️ Note: This is a plain recursive solution with exponential time complexity.
For better performance, see the DP Tabulation solution in 03_DP_Tabulation.js.

🧠 Core Idea:
- For a rope of length n, we have three choices: cut a, b, or c
- After cutting, we have a smaller subproblem: ropeCut(n - cut_length)
- We try all three options and take the maximum
- Base case: n = 0 means we successfully cut the rope (return 0 pieces)
- Invalid case: n < 0 means we cannot cut (return -1)

📈 Recurrence Relation:
  if n < 0:
      return -1  // Invalid: cannot cut negative length
  
  if n === 0:
      return 0   // Base case: rope fully cut, 0 pieces remaining
  
  res = max(
      ropeCut(n - a, a, b, c),
      ropeCut(n - b, a, b, c),
      ropeCut(n - c, a, b, c)
  )
  
  if res === -1:
      return -1  // None of the cuts lead to valid solution
  
  return 1 + res  // Add 1 for current cut

Base Cases:
- n < 0: return -1 (invalid)
- n = 0: return 0 (successfully cut, no pieces remaining)

🎯 Why This Approach?
- Optimal substructure: Maximum pieces for length n depends on maximum pieces
  for smaller lengths (n-a, n-b, n-c).
- Overlapping subproblems: Same subproblems are recalculated multiple times.
- Recursive solution explores all possible cut combinations.
- Guarantees optimal solution by trying all three options.

💡 Key Insights:
- Try all three cut options (a, b, c) at each step
- Take maximum of the three recursive results
- If all three return -1, the current state is invalid
- Add 1 to the result because we made one cut
- Base case: n = 0 means we successfully cut the rope
*/

// ✅ TC = O(3^n) exponential (worst case, without memoization)
// ✅ SC = O(n) for recursion stack
function ropeCut(n, a, b, c){
    // Base case: Invalid - cannot cut negative length
    if(n < 0) return -1
    
    // Base case: Successfully cut the rope - no pieces remaining
    if(n === 0) return 0
    
    // Try all three cut options and take the maximum
    let res = Math.max(
                ropeCut(n-a, a, b, c),  // Try cutting length a
                ropeCut(n-b, a, b, c),  // Try cutting length b
                ropeCut(n-c, a, b, c),  // Try cutting length c
              )
    
    // If all three options return -1, current state is invalid
    if(res === -1) return -1
    
    // Add 1 for the current cut we just made
    return 1+res // +1 because we made one cut, then add the result from remaining rope
} 

console.log(ropeCut(5, 2, 5, 1)) // 5
console.log(ropeCut(23, 12, 9, 11)) // 2
console.log(ropeCut(5, 4, 2, 6)) // -1
console.log(ropeCut(9, 2, 2, 2)) // -1

/*🎯 STEP-BY-STEP WALKTHROUGH (n = 5, a = 2, b = 5, c = 1)

We'll trace through the recursive calls to find maximum pieces.

Initial call: ropeCut(5, 2, 5, 1)

ropeCut(5, 2, 5, 1):
  n = 5, not base case
  Try three options:
    1. ropeCut(5-2, 2, 5, 1) = ropeCut(3, 2, 5, 1)
    2. ropeCut(5-5, 2, 5, 1) = ropeCut(0, 2, 5, 1)
    3. ropeCut(5-1, 2, 5, 1) = ropeCut(4, 2, 5, 1)
  res = max(result1, result2, result3)

Let's compute each:

ropeCut(0, 2, 5, 1):
  n = 0 → base case
  return 0 ✓

ropeCut(3, 2, 5, 1):
  Try three options:
    1. ropeCut(3-2, 2, 5, 1) = ropeCut(1, 2, 5, 1)
    2. ropeCut(3-5, 2, 5, 1) = ropeCut(-2, 2, 5, 1) → return -1
    3. ropeCut(3-1, 2, 5, 1) = ropeCut(2, 2, 5, 1)
  
  ropeCut(1, 2, 5, 1):
    Try three options:
      1. ropeCut(1-2, 2, 5, 1) = ropeCut(-1, 2, 5, 1) → return -1
      2. ropeCut(1-5, 2, 5, 1) = ropeCut(-4, 2, 5, 1) → return -1
      3. ropeCut(1-1, 2, 5, 1) = ropeCut(0, 2, 5, 1) → return 0
    res = max(-1, -1, 0) = 0
    return 1 + 0 = 1 ✓
  
  ropeCut(2, 2, 5, 1):
    Try three options:
      1. ropeCut(2-2, 2, 5, 1) = ropeCut(0, 2, 5, 1) → return 0
      2. ropeCut(2-5, 2, 5, 1) = ropeCut(-3, 2, 5, 1) → return -1
      3. ropeCut(2-1, 2, 5, 1) = ropeCut(1, 2, 5, 1) → return 1 (from above)
    res = max(0, -1, 1) = 1
    return 1 + 1 = 2 ✓
  
  res = max(1, -1, 2) = 2
  return 1 + 2 = 3 ✓

ropeCut(4, 2, 5, 1):
  Try three options:
    1. ropeCut(4-2, 2, 5, 1) = ropeCut(2, 2, 5, 1) → return 2 (from above)
    2. ropeCut(4-5, 2, 5, 1) = ropeCut(-1, 2, 5, 1) → return -1
    3. ropeCut(4-1, 2, 5, 1) = ropeCut(3, 2, 5, 1) → return 3 (from above)
  res = max(2, -1, 3) = 3
  return 1 + 3 = 4 ✓

Back to ropeCut(5, 2, 5, 1):
  res = max(3, 0, 4) = 4
  return 1 + 4 = 5 ✓

🏆 Result: 5 pieces

✅ Maximum pieces = 5 (using cuts: 1, 1, 1, 1, 1)

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Recursive Tree
- At each step, try all three cut options
- Recursively solve smaller subproblems
- Take maximum of all valid options
- Base case: n = 0 means success

Recursive Structure:
1. Base case: n = 0 → return 0 (success)
2. Invalid case: n < 0 → return -1 (failure)
3. Try all three cuts: n-a, n-b, n-c
4. Take maximum of results
5. If all return -1, return -1
6. Otherwise, return 1 + maximum result

Why Add 1?
- When we make a cut, we create one piece
- Then we recursively solve for remaining rope
- Total pieces = 1 (current) + pieces from remaining rope

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- At each level, we make 3 recursive calls
- Maximum depth: n (if we cut 1 each time)
- Total recursive calls: 3^n in worst case
- Each call: O(1) operations
- Total: O(3^n) exponential

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack depth: O(n) in worst case
- Each call: O(1) space
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Exact Match
Input: n = 5, a = 5, b = 2, c = 1
ropeCut(5-5) = ropeCut(0) = 0
return 1 + 0 = 1 ✓

CASE 2: Not Possible
Input: n = 5, a = 4, b = 2, c = 6
All cuts lead to invalid states
return -1 ✓

CASE 3: Multiple Valid Options
Input: n = 5, a = 2, b = 5, c = 1
Try all three, take maximum
return 5 ✓

CASE 4: All Same Length
Input: n = 9, a = 2, b = 2, c = 2
9 is odd, cannot be divided by 2
return -1 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Maximum pieces for length n depends on maximum pieces for n-a, n-b, n-c
   - Optimal solution contains optimal solutions to subproblems
   - Try all options and take maximum

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are recalculated multiple times
   - Example: ropeCut(2) might be called from multiple paths
   - This is why DP (memoization) helps

3️⃣ COMPLETE EXPLORATION:
   - Try all three cut options at each step
   - No valid solution is missed
   - Guarantees optimal solution

4️⃣ CORRECTNESS:
   - Base cases handle edge cases correctly
   - Invalid states return -1
   - Valid states return maximum pieces

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Tries all possible cut combinations: ✓
- Takes maximum at each step: ✓
- Handles invalid cases correctly: ✓
- Base cases are correct: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 2: Check invalid case
  - If n < 0, cannot cut → return -1

Line 4: Check base case
  - If n = 0, successfully cut → return 0

Line 6-10: Try all three cuts
  - Recursively try cutting a, b, and c
  - Take maximum of three results

Line 11: Check if all invalid
  - If all three return -1, current state is invalid

Line 13: Return result
  - Add 1 for current cut
  - Add result from remaining rope

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Resource allocation (dividing resources optimally)
- Cutting stock problem
- Manufacturing optimization
- Material cutting in industries
- Network packet segmentation
- Memory allocation

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Rope Cutting (this problem)
- Coin Change (similar structure)
- Rod Cutting
- Unbounded Knapsack
- Partition Equal Subset Sum

─────────────────────────────────────────

🎯 TESTING STRATEGY:
- Exact match (one cut fits perfectly)
- Not possible (cannot cut)
- Multiple valid options
- All same cut lengths
- Large values
- Edge values (n = 1, 2, 3)

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print recursive calls with parameters
- Track which cut option is being tried
- Verify base cases are reached
- Check if -1 is returned correctly
- Trace through small examples manually

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Forgetting to add 1 to result
- Not handling -1 correctly
- Wrong base case (returning 1 instead of 0)
- Not checking if all options return -1
- Confusing with minimum cuts problem

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Clear base cases (n = 0 and n < 0)
- Try all three options
- Take maximum correctly
- Handle -1 cases properly
- Add 1 for current cut

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the recursive structure clearly
- Walk through a small example
- Discuss time and space complexity
- Mention exponential time complexity
- Suggest DP optimization
- Handle edge cases

─────────────────────────────────────────

🎯 OPTIMIZATION NOTE:

⚠️ EXPONENTIAL TIME COMPLEXITY:
This plain recursive solution has O(3^n) time complexity, which is very slow
for large inputs. The same subproblems are recalculated multiple times.

For better performance, use:
- Memoization (DP Top-down): O(n) time, O(n) space
- Tabulation (DP Bottom-up): O(n) time, O(n) space
- See 03_DP_Tabulation.js for optimized solution

Example of overlapping subproblems:
- ropeCut(3) might be called from ropeCut(5) via cut a=2
- ropeCut(3) might also be called from ropeCut(4) via cut c=1
- Without memoization, ropeCut(3) is recalculated

─────────────────────────────────────────

🎯 COMPARISON WITH DP APPROACH:

Plain Recursion (This solution):
- Time: O(3^n) exponential
- Space: O(n) recursion stack
- Simple and intuitive
- Very slow for large inputs

DP Memoization:
- Time: O(n) linear
- Space: O(n) for memo + recursion stack
- Same recursive structure
- Much faster

DP Tabulation:
- Time: O(n) linear
- Space: O(n) for DP array
- Iterative approach
- No recursion overhead

─────────────────────────────────────────

🎯 WHEN TO USE EACH:

Use Plain Recursion when:
- Learning recursive thinking
- Small inputs (n < 20)
- Understanding the problem structure
- Prototyping solution

Use DP when:
- Large inputs (n > 20)
- Performance is critical
- Need optimal time complexity
- Production code

─────────────────────────────────────────

🎯 RECURSIVE TREE VISUALIZATION:

For n = 5, a = 2, b = 5, c = 1:

                    ropeCut(5)
                   /    |    \
            cut a=2  cut b=5  cut c=1
              /        |        \
        ropeCut(3)  ropeCut(0)  ropeCut(4)
         /  |  \        ✓         /  |  \
    cut a  b  c              cut a  b  c
     /     |   \              /     |   \
  (1)    (-1)  (2)          (2)   (-1)  (3)
   |                          |          |
  ...                        ...        ...

Each node represents a recursive call
Leaves are base cases (n = 0 or n < 0)

─────────────────────────────────────────

🎯 CONCLUSION:
Rope Cutting using Plain Recursion finds the maximum number of pieces by
recursively trying all three cut options at each step, taking the maximum
result, and handling base cases correctly. While intuitive, this approach
has exponential time complexity O(3^n). For better performance, use DP
memoization or tabulation (see 03_DP_Tabulation.js)!
*/