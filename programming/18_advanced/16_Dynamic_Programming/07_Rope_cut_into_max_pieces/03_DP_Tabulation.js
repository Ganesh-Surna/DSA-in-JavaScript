/* Problem: ✅✅✅✅ Rope Cutting — Maximum Pieces (DP Tabulation) ✅✅✅✅

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
Time Complexity: O(n) where n = rope length
Space Complexity: O(n) for the DP array

⚠️ Note: This is the optimized DP Tabulation solution. For the plain recursive
approach with exponential time complexity, see 01_plain_recursion.js.

🧠 Core Idea:
- Use dynamic programming with a 1D array `dp[i]` representing the maximum number
  of pieces that can be cut from a rope of length `i`.
- Build the solution bottom-up, from smaller lengths to larger lengths.
- For each length `i`, try all three cut options (a, b, c) and take the maximum.
- If a cut is valid (i - cut_length >= 0), update dp[i] with the maximum.
- After trying all cuts, if dp[i] is valid (not -1), add 1 for the current cut.

📈 Recurrence Relation:
  dp[0] = 0  // Base case: rope of length 0 has 0 pieces
  
  For each i from 1 to n:
      dp[i] = -1  // Initialize as invalid
      
      if i - a >= 0:
          dp[i] = max(dp[i], dp[i-a])  // Try cutting length a
      if i - b >= 0:
          dp[i] = max(dp[i], dp[i-b])  // Try cutting length b
      if i - c >= 0:
          dp[i] = max(dp[i], dp[i-c])  // Try cutting length c
      
      if dp[i] !== -1:
          dp[i] = 1 + dp[i]  // Add 1 for current cut
  
  Answer = dp[n]

Base Case:
- dp[0] = 0 (rope of length 0 has 0 pieces)

🎯 Why This Approach?
- Optimal substructure: Maximum pieces for length i depends on maximum pieces
  for smaller lengths (i-a, i-b, i-c).
- Overlapping subproblems: Avoids recalculating the same subproblems.
- Tabulation builds solution iteratively from smaller to larger lengths.
- Guarantees optimal solution by exploring all three cut options.

💡 Key Insights:
- dp[i] represents maximum pieces for rope of length i
- Try all three cuts (a, b, c) for each length
- Take maximum of valid options
- Add 1 after finding maximum (one cut was made)
- If all options are invalid, dp[i] remains -1
*/

// ✅ TC = O(n) where n = rope length
// ✅ SC = O(n) for the DP array
function ropeCut(n, a, b, c){
    // Initialize DP array: dp[i] = maximum pieces for rope of length i
    // Fill with -1 (invalid) initially
    let dp = new Array(n+1).fill(-1)
    
    // Base case: rope of length 0 has 0 pieces
    dp[0] = 0
    
    // Build DP table bottom-up from length 1 to n
    for(let i=1; i<n+1; i++){
        // Try cutting length a
        if(i-a >=0){
            // If we can cut length a, check maximum pieces for remaining rope
            dp[i] = Math.max(dp[i], dp[i-a])
        }
        // Try cutting length b
        if(i-b >=0){
            // If we can cut length b, check maximum pieces for remaining rope
            dp[i] = Math.max(dp[i], dp[i-b])
        }
        // Try cutting length c
        if(i-c >=0){
            // If we can cut length c, check maximum pieces for remaining rope
            dp[i] = Math.max(dp[i], dp[i-c])
        }
        
        // If we found a valid solution, add 1 for the current cut
        if(dp[i] !== -1){
            dp[i] = 1+dp[i]  // Add 1 because we made one cut
        }
    }
    
    // dp[n] contains maximum pieces for rope of length n
    return dp[n]
}

console.log(ropeCut(5, 2, 5, 1)) // 5
console.log(ropeCut(23, 12, 9, 11)) // 2
console.log(ropeCut(5, 4, 2, 6)) // -1
console.log(ropeCut(9, 2, 2, 2)) // -1

/*🎯 STEP-BY-STEP WALKTHROUGH (n = 5, a = 2, b = 5, c = 1)

We'll build a DP table where dp[i] represents the maximum number of pieces
that can be cut from a rope of length i.

Initialization:
n = 5, a = 2, b = 5, c = 1

Initialize DP array:
dp = [-1, -1, -1, -1, -1, -1]
      [0,  1,  2,  3,  4,  5]  (indices)

Base case:
dp[0] = 0  // Rope of length 0 has 0 pieces

Processing each length:

i=1: Try to cut rope of length 1
  Try cut a=2: 1-2 = -1 < 0 → skip
  Try cut b=5: 1-5 = -4 < 0 → skip
  Try cut c=1: 1-1 = 0 >= 0 → dp[1] = max(-1, dp[0]) = max(-1, 0) = 0
  dp[1] = 0 (valid), so add 1: dp[1] = 1 + 0 = 1

dp = [0, 1, -1, -1, -1, -1]

i=2: Try to cut rope of length 2
  Try cut a=2: 2-2 = 0 >= 0 → dp[2] = max(-1, dp[0]) = max(-1, 0) = 0
  Try cut b=5: 2-5 = -3 < 0 → skip
  Try cut c=1: 2-1 = 1 >= 0 → dp[2] = max(0, dp[1]) = max(0, 1) = 1
  dp[2] = 1 (valid), so add 1: dp[2] = 1 + 1 = 2

dp = [0, 1, 2, -1, -1, -1]

i=3: Try to cut rope of length 3
  Try cut a=2: 3-2 = 1 >= 0 → dp[3] = max(-1, dp[1]) = max(-1, 1) = 1
  Try cut b=5: 3-5 = -2 < 0 → skip
  Try cut c=1: 3-1 = 2 >= 0 → dp[3] = max(1, dp[2]) = max(1, 2) = 2
  dp[3] = 2 (valid), so add 1: dp[3] = 1 + 2 = 3

dp = [0, 1, 2, 3, -1, -1]

i=4: Try to cut rope of length 4
  Try cut a=2: 4-2 = 2 >= 0 → dp[4] = max(-1, dp[2]) = max(-1, 2) = 2
  Try cut b=5: 4-5 = -1 < 0 → skip
  Try cut c=1: 4-1 = 3 >= 0 → dp[4] = max(2, dp[3]) = max(2, 3) = 3
  dp[4] = 3 (valid), so add 1: dp[4] = 1 + 3 = 4

dp = [0, 1, 2, 3, 4, -1]

i=5: Try to cut rope of length 5
  Try cut a=2: 5-2 = 3 >= 0 → dp[5] = max(-1, dp[3]) = max(-1, 3) = 3
  Try cut b=5: 5-5 = 0 >= 0 → dp[5] = max(3, dp[0]) = max(3, 0) = 3
  Try cut c=1: 5-1 = 4 >= 0 → dp[5] = max(3, dp[4]) = max(3, 4) = 4
  dp[5] = 4 (valid), so add 1: dp[5] = 1 + 4 = 5

Final DP array:
dp = [0, 1, 2, 3, 4, 5]

🏆 Result: dp[5] = 5

✅ Maximum pieces = 5 (using cuts: 1, 1, 1, 1, 1)

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Bottom-Up DP
- Build solution from smaller lengths to larger lengths
- dp[i] = maximum pieces for rope of length i
- For each length, try all three cut options
- Take maximum of valid options, then add 1

Algorithm Steps:
1. Initialize dp array with -1 (invalid)
2. Set base case: dp[0] = 0
3. For each length i from 1 to n:
   a. Try cutting a, b, c (if valid)
   b. Take maximum of valid options
   c. If valid, add 1 for current cut
4. Return dp[n]

Why Add 1 After Taking Max?
- We first find the maximum pieces from remaining rope
- Then we add 1 because we made one cut to get to that state
- Example: dp[5] = max(dp[3], dp[0], dp[4]) = 4, then add 1 → 5

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Outer loop: n iterations (length 1 to n)
- Each iteration: O(1) operations (3 comparisons and max)
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- DP array: O(n+1) = O(n)
- No additional space needed
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Exact Match
Input: n = 5, a = 5, b = 2, c = 1
dp[5] = max(dp[0], dp[3], dp[4]) = max(0, 3, 4) = 4
dp[5] = 1 + 4 = 5
But wait, if a=5, then dp[5] = max(-1, dp[0]) = 0, then 1+0 = 1 ✓

CASE 2: Not Possible
Input: n = 5, a = 4, b = 2, c = 6
Trace:
  dp[0] = 0
  i=1: Try a=4? 1-4=-1 no. b=2? 1-2=-1 no. c=6? 1-6=-1 no. dp[1] = -1
  i=2: Try a=4? 2-4=-1 no. b=2? 2-2=0 yes → dp[2]=max(-1, dp[0])=0, then dp[2]=1
  i=3: Try a=4? 3-4=-1 no. b=2? 3-2=1 yes → dp[3]=max(-1, dp[1])=max(-1,-1)=-1. c=6? 3-6=-1 no. dp[3]=-1
  i=4: Try a=4? 4-4=0 yes → dp[4]=max(-1, dp[0])=0, then dp[4]=1. b=2? 4-2=2 yes → dp[4]=max(1, dp[2])=max(1,1)=1, then dp[4]=2. c=6? 4-6=-1 no. dp[4]=2
  i=5: Try a=4? 5-4=1 yes → dp[5]=max(-1, dp[1])=max(-1,-1)=-1. b=2? 5-2=3 yes → dp[5]=max(-1, dp[3])=max(-1,-1)=-1. c=6? 5-6=-1 no. dp[5]=-1
Output: -1 ✓ (cannot cut rope of length 5)

CASE 3: Multiple Valid Options
Input: n = 5, a = 2, b = 5, c = 1
dp[5] = max(dp[3], dp[0], dp[4]) = max(3, 0, 4) = 4
dp[5] = 1 + 4 = 5 ✓

CASE 4: All Same Length
Input: n = 9, a = 2, b = 2, c = 2
dp[9] = max(dp[7], dp[7], dp[7]) = dp[7]
dp[7] = max(dp[5], dp[5], dp[5]) = dp[5]
dp[5] = max(dp[3], dp[3], dp[3]) = dp[3]
dp[3] = max(dp[1], dp[1], dp[1]) = dp[1]
dp[1] = -1 (1-2=-1, can't cut)
So dp[9] = -1 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Maximum pieces for length i depends on maximum pieces for i-a, i-b, i-c
   - Optimal solution contains optimal solutions to subproblems
   - Try all options and take maximum

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are solved only once
   - Results stored in DP table
   - No recalculation needed

3️⃣ BOTTOM-UP CONSTRUCTION:
   - Solve smaller problems first
   - Use results to solve larger problems
   - Guarantees all dependencies are available

4️⃣ CORRECTNESS:
   - Base case: dp[0] = 0 is correct
   - Invalid states remain -1
   - Valid states compute maximum correctly

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Tries all possible cut combinations: ✓
- Takes maximum at each step: ✓
- Handles invalid cases correctly: ✓
- Base case is correct: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 3: Initialize DP array
  - Create array of size n+1
  - Fill with -1 (invalid initially)

Line 6: Set base case
  - dp[0] = 0 (rope of length 0 has 0 pieces)

Line 8-23: Build DP table
  - For each length i from 1 to n
  - Try all three cuts (if valid)
  - Take maximum of valid options
  - Add 1 if solution is valid

Line 25: Return result
  - dp[n] contains maximum pieces

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
- Print dp array after each iteration
- Verify base case (dp[0] = 0)
- Check if cuts are valid (i - cut >= 0)
- Verify maximum calculation
- Check if adding 1 is correct
- Trace through small examples manually

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Forgetting to add 1 after taking max
- Not initializing with -1
- Wrong base case (dp[0] should be 0, not 1)
- Not checking if cut is valid (i - cut >= 0)
- Adding 1 before taking max (should be after)

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Initialize with -1 (invalid state)
- Set base case clearly (dp[0] = 0)
- Check validity before trying cuts
- Take maximum of all valid options
- Add 1 only if solution is valid

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the DP approach clearly
- Walk through a small example
- Discuss time and space complexity
- Compare with recursive approach
- Handle edge cases
- Mention optimization benefits

─────────────────────────────────────────

🎯 COMPARISON WITH RECURSIVE APPROACH:

Plain Recursion (See 01_plain_recursion.js):
- Time: O(3^n) exponential
- Space: O(n) recursion stack
- Recalculates same subproblems
- Very slow for large inputs

DP Tabulation (This solution):
- Time: O(n) linear
- Space: O(n) for DP array
- Each subproblem solved once
- Much faster and efficient

─────────────────────────────────────────

🎯 KEY DIFFERENCES:

1️⃣ TIME COMPLEXITY:
   - Recursion: O(3^n) exponential
   - DP: O(n) linear
   - Massive improvement for large n

2️⃣ SUBPROBLEM HANDLING:
   - Recursion: Recalculates same subproblems
   - DP: Stores results, no recalculation

3️⃣ APPROACH:
   - Recursion: Top-down (from n to 0)
   - DP: Bottom-up (from 0 to n)

4️⃣ OVERHEAD:
   - Recursion: Function call overhead
   - DP: Simple array access

─────────────────────────────────────────

🎯 WHY ADD 1 AFTER TAKING MAX?

Explanation:
- First, we find the maximum pieces from remaining rope after making a cut
- Example: For length 5, we try cuts: 5-2=3, 5-5=0, 5-1=4
- We get: dp[3]=3, dp[0]=0, dp[4]=4
- Maximum is 4 (from cutting length 1, remaining 4)
- Then we add 1 because we made one cut to get to length 4
- Result: 1 + 4 = 5 pieces total

If we added 1 before taking max:
- We would get: 1+dp[3]=4, 1+dp[0]=1, 1+dp[4]=5
- Max would be 5, but this counts the cut twice in some cases

The correct approach:
- Find max pieces from remaining rope first
- Then add 1 for the current cut
- This ensures we count each cut exactly once

─────────────────────────────────────────

🎯 CONCLUSION:
Rope Cutting using DP Tabulation efficiently finds the maximum number of pieces
by building a DP table bottom-up, trying all three cut options at each length,
taking the maximum of valid options, and adding 1 for each cut made, achieving
O(n) time and O(n) space complexity. This is a massive improvement over the
exponential recursive approach!
*/