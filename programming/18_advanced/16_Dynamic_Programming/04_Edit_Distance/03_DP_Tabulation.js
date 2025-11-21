/* Problem: ✅✅✅✅ Edit Distance (Levenshtein Distance) — DP Tabulation ✅✅✅✅

Given two strings `s1` and `s2`, find the minimum number of operations required to
convert `s1` into `s2`. The allowed operations are:
1. Insert: Insert a character into `s1`
2. Delete: Delete a character from `s1`
3. Replace: Replace a character in `s1` with another character

🎯 Goal: Find the minimum number of edit operations needed to transform `s1` into `s2`.

Example 1:
Input: s1 = "horse", s2 = "ros"
Output: 3
Explanation:
  1. Replace 'h' with 'r' → "rorse"
  2. Delete 'r' → "rose"
  3. Delete 'e' → "ros"

Example 2:
Input: s1 = "intention", s2 = "execution"
Output: 5
Explanation:
  1. Delete 't' → "inention"
  2. Replace 'i' with 'e' → "enention"
  3. Replace 'n' with 'x' → "exention"
  4. Replace 'n' with 'c' → "exection"
  5. Insert 'u' → "execution"

Example 3:
Input: s1 = "abc", s2 = "abc"
Output: 0
Explanation: Strings are identical, no operations needed.

Example 4:
Input: s1 = "", s2 = "abc"
Output: 3
Explanation: Need to insert all 3 characters.

Example 5:
Input: s1 = "abc", s2 = ""
Output: 3
Explanation: Need to delete all 3 characters.

Constraints:
- 0 ≤ s1.length, s2.length ≤ 500
- Strings contain only lowercase English letters

Expected Complexities:
Time Complexity: O(m × n) where m = s1.length, n = s2.length
Space Complexity: O(m × n) for the DP table

🧠 Core Idea:
- Use dynamic programming with a 2D table `dp[i][j]` representing the minimum
  edit distance between the first `i` characters of `s1` and the first `j`
  characters of `s2`.
- Build the table bottom-up, filling it from smaller subproblems to larger ones.
- For each position, consider three operations: insert, delete, or replace.
- If characters match, no operation is needed (carry forward previous value).
- If characters don't match, take the minimum of the three operations and add 1.

📈 Recurrence Relation:
  if s1[i-1] === s2[j-1]:
      dp[i][j] = dp[i-1][j-1]  // Characters match, no operation needed
  else:
      dp[i][j] = 1 + min(
          dp[i][j-1],    // Insert: insert s2[j-1] into s1
          dp[i-1][j],    // Delete: delete s1[i-1] from s1
          dp[i-1][j-1]   // Replace: replace s1[i-1] with s2[j-1]
      )

Base Cases:
- dp[i][0] = i  // Delete all characters from s1 (i delete operations)
- dp[0][j] = j  // Insert all characters from s2 (j insert operations)

🎯 Why This Approach?
- Optimal substructure: The edit distance of larger strings depends on edit
  distances of smaller substrings.
- Overlapping subproblems: The recursive solution recalculates the same
  subproblems multiple times.
- Tabulation avoids recursion overhead and builds solution iteratively.
- Guarantees optimal solution by exploring all possible operations.

💡 Key Insights:
- dp[i][j] represents edit distance between s1[0...i-1] and s2[0...j-1]
- When characters match, no operation needed → use diagonal value
- When characters don't match, try all three operations → take minimum
- Base cases handle empty strings (all insertions or all deletions)
*/

// ✅ TC = O(m × n) where m = s1.length, n = s2.length
// ✅ SC = O(m × n) for the DP table
function editDistance(s1, s2){
    let m = s1.length
    let n = s2.length
    
    // Create DP table: dp[i][j] = edit distance between s1[0...i-1] and s2[0...j-1]
    let dp = new Array(m+1)
    for(let i=0; i<m+1; i++){
        dp[i] = new Array(n+1).fill(0)
    }
    
    // Base Case 1: If s2 is empty, delete all characters from s1
    // dp[i][0] = i (need i delete operations to make s1 empty)
    for(let i=0; i<m+1; i++){
        dp[i][0] = i // delete all characters from s1 -> so need i delete operations
    }
    
    // Base Case 2: If s1 is empty, insert all characters from s2
    // dp[0][j] = j (need j insert operations to make s1 equal to s2)
    for(let j=0; j<n+1; j++){
        dp[0][j] = j // insert all characters from s2 -> so need j insert operations
    }
    
    // Fill the DP table bottom-up
    for(let i=1; i<m+1; i++){
        for(let j=1; j<n+1; j++){
            if(s1[i-1] === s2[j-1]){
                // Characters match: no operation needed, carry forward diagonal value
                dp[i][j] = dp[i-1][j-1]  // Characters match, no operation needed
            }else{
                // Characters don't match: try all three operations, take minimum
                dp[i][j] = 1 + Math.min(
                    dp[i][j-1],    // Insert: insert s2[j-1] into s1 at position i
                    dp[i-1][j],    // Delete: delete s1[i-1] from s1
                    dp[i-1][j-1]   // Replace: replace s1[i-1] with s2[j-1]
                )
            }
        }
    }
    
    return dp[m][n]  // dp[m][n] = edit distance between entire s1 and s2
}

console.log(editDistance("horse", "ros")); // 3
// 1. replace 'h' with 'r' (horse -> rorse)
// 2. remove 'r' (rorse -> rose)
// 3. remove 'e' (rose -> ros)

console.log(editDistance("intention", "execution")); // 5
// 1. remove 't' (intention -> inention)
// 2. replace 'i' with 'e' (inention -> enention)
// 3. replace 'n' with 'x' (enention -> exention)
// 4. replace 'n' with 'c' (exention -> exection)
// 5. insert 'u' (exection -> execution)

/*🎯 STEP-BY-STEP WALKTHROUGH (s1 = "horse", s2 = "ros")

We'll build a DP table where dp[i][j] represents the minimum edit distance
between s1[0...i-1] and s2[0...j-1].

Initialization:
m = 5 (length of "horse")
n = 3 (length of "ros")

DP Table Structure:
        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  ?,  ?,  ?]
    o  [2,  ?,  ?,  ?]
    r  [3,  ?,  ?,  ?]
    s  [4,  ?,  ?,  ?]
    e  [5,  ?,  ?,  ?]

Base Cases (Row 0 and Column 0):
- dp[0][0] = 0 (empty to empty: 0 operations)
- dp[0][j] = j (empty to s2[0...j-1]: j insertions)
- dp[i][0] = i (s1[0...i-1] to empty: i deletions)

After Base Cases:
        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  ?,  ?,  ?]
    o  [2,  ?,  ?,  ?]
    r  [3,  ?,  ?,  ?]
    s  [4,  ?,  ?,  ?]
    e  [5,  ?,  ?,  ?]

Filling the Table:

i=1, j=1: Compare 'h' with 'r'
  'h' ≠ 'r' → mismatch
  dp[1][1] = 1 + min(
      dp[1][0] = 1,    // Insert 'r': "h" → "hr" (cost 1)
      dp[0][1] = 1,    // Delete 'h': "h" → "" (cost 1)
      dp[0][0] = 0     // Replace 'h' with 'r': "h" → "r" (cost 1)
  ) = 1 + min(1, 1, 0) = 1 + 0 = 1

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  ?,  ?]
    o  [2,  ?,  ?,  ?]
    r  [3,  ?,  ?,  ?]
    s  [4,  ?,  ?,  ?]
    e  [5,  ?,  ?,  ?]

i=1, j=2: Compare 'h' with 'o'
  'h' ≠ 'o' → mismatch
  dp[1][2] = 1 + min(
      dp[1][1] = 1,    // Insert 'o': "h" → "ho" (cost 1)
      dp[0][2] = 2,    // Delete 'h': "h" → "" (cost 1) + "" → "o" (cost 1) = 2
      dp[0][1] = 1     // Replace 'h' with 'o': "h" → "o" (cost 1)
  ) = 1 + min(1, 2, 1) = 1 + 1 = 2

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  ?]
    o  [2,  ?,  ?,  ?]
    r  [3,  ?,  ?,  ?]
    s  [4,  ?,  ?,  ?]
    e  [5,  ?,  ?,  ?]

i=1, j=3: Compare 'h' with 's'
  'h' ≠ 's' → mismatch
  dp[1][3] = 1 + min(
      dp[1][2] = 2,    // Insert 's': "h" → "hs" (cost 1)
      dp[0][3] = 3,    // Delete 'h': "h" → "" (cost 1) + "" → "s" (cost 2) = 3
      dp[0][2] = 2     // Replace 'h' with 's': "h" → "s" (cost 1)
  ) = 1 + min(2, 3, 2) = 1 + 2 = 3

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  3]
    o  [2,  ?,  ?,  ?]
    r  [3,  ?,  ?,  ?]
    s  [4,  ?,  ?,  ?]
    e  [5,  ?,  ?,  ?]

i=2, j=1: Compare 'o' with 'r'
  'o' ≠ 'r' → mismatch
  dp[2][1] = 1 + min(
      dp[2][0] = 2,    // Insert 'r': "ho" → "hor" (cost 1)
      dp[1][1] = 1,    // Delete 'o': "ho" → "h" (cost 1)
      dp[1][0] = 1     // Replace 'o' with 'r': "ho" → "hr" (cost 1)
  ) = 1 + min(2, 1, 1) = 1 + 1 = 2

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  3]
    o  [2,  2,  ?,  ?]
    r  [3,  ?,  ?,  ?]
    s  [4,  ?,  ?,  ?]
    e  [5,  ?,  ?,  ?]

i=2, j=2: Compare 'o' with 'o'
  'o' === 'o' → match!
  dp[2][2] = dp[1][1] = 1  // No operation needed, carry forward diagonal

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  3]
    o  [2,  2,  1,  ?]
    r  [3,  ?,  ?,  ?]
    s  [4,  ?,  ?,  ?]
    e  [5,  ?,  ?,  ?]

i=2, j=3: Compare 'o' with 's'
  'o' ≠ 's' → mismatch
  dp[2][3] = 1 + min(
      dp[2][2] = 1,    // Insert 's': "ho" → "hos" (cost 1)
      dp[1][3] = 3,    // Delete 'o': "ho" → "h" (cost 1) + "h" → "s" (cost 2) = 3
      dp[1][2] = 2     // Replace 'o' with 's': "ho" → "hs" (cost 1)
  ) = 1 + min(1, 3, 2) = 1 + 1 = 2

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  3]
    o  [2,  2,  1,  2]
    r  [3,  ?,  ?,  ?]
    s  [4,  ?,  ?,  ?]
    e  [5,  ?,  ?,  ?]

i=3, j=1: Compare 'r' with 'r'
  'r' === 'r' → match!
  dp[3][1] = dp[2][0] = 2  // No operation needed, carry forward diagonal

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  3]
    o  [2,  2,  1,  2]
    r  [3,  2,  ?,  ?]
    s  [4,  ?,  ?,  ?]
    e  [5,  ?,  ?,  ?]

i=3, j=2: Compare 'r' with 'o'
  'r' ≠ 'o' → mismatch
  dp[3][2] = 1 + min(
      dp[3][1] = 2,    // Insert 'o': "hor" → "horo" (cost 1)
      dp[2][2] = 1,    // Delete 'r': "hor" → "ho" (cost 1)
      dp[2][1] = 2     // Replace 'r' with 'o': "hor" → "hoo" (cost 1)
  ) = 1 + min(2, 1, 2) = 1 + 1 = 2

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  3]
    o  [2,  2,  1,  2]
    r  [3,  2,  2,  ?]
    s  [4,  ?,  ?,  ?]
    e  [5,  ?,  ?,  ?]

i=3, j=3: Compare 'r' with 's'
  'r' ≠ 's' → mismatch
  dp[3][3] = 1 + min(
      dp[3][2] = 2,    // Insert 's': "hor" → "hors" (cost 1)
      dp[2][3] = 2,    // Delete 'r': "hor" → "ho" (cost 1) + "ho" → "hos" (cost 1) = 2
      dp[2][2] = 1     // Replace 'r' with 's': "hor" → "hos" (cost 1)
  ) = 1 + min(2, 2, 1) = 1 + 1 = 2

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  3]
    o  [2,  2,  1,  2]
    r  [3,  2,  2,  2]
    s  [4,  ?,  ?,  ?]
    e  [5,  ?,  ?,  ?]

i=4, j=1: Compare 's' with 'r'
  's' ≠ 'r' → mismatch
  dp[4][1] = 1 + min(
      dp[4][0] = 4,    // Insert 'r': "hors" → "horsr" (cost 1)
      dp[3][1] = 2,    // Delete 's': "hors" → "hor" (cost 1)
      dp[3][0] = 3     // Replace 's' with 'r': "hors" → "horr" (cost 1)
  ) = 1 + min(4, 2, 3) = 1 + 2 = 3

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  3]
    o  [2,  2,  1,  2]
    r  [3,  2,  2,  2]
    s  [4,  3,  ?,  ?]
    e  [5,  ?,  ?,  ?]

i=4, j=2: Compare 's' with 'o'
  's' ≠ 'o' → mismatch
  dp[4][2] = 1 + min(
      dp[4][1] = 3,    // Insert 'o': "hors" → "horso" (cost 1)
      dp[3][2] = 2,    // Delete 's': "hors" → "hor" (cost 1) + "hor" → "horo" (cost 1) = 2
      dp[3][1] = 2     // Replace 's' with 'o': "hors" → "horo" (cost 1)
  ) = 1 + min(3, 2, 2) = 1 + 2 = 3

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  3]
    o  [2,  2,  1,  2]
    r  [3,  2,  2,  2]
    s  [4,  3,  3,  ?]
    e  [5,  ?,  ?,  ?]

i=4, j=3: Compare 's' with 's'
  's' === 's' → match!
  dp[4][3] = dp[3][2] = 2  // No operation needed, carry forward diagonal

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  3]
    o  [2,  2,  1,  2]
    r  [3,  2,  2,  2]
    s  [4,  3,  3,  2]
    e  [5,  ?,  ?,  ?]

i=5, j=1: Compare 'e' with 'r'
  'e' ≠ 'r' → mismatch
  dp[5][1] = 1 + min(
      dp[5][0] = 5,    // Insert 'r': "horse" → "horser" (cost 1)
      dp[4][1] = 3,    // Delete 'e': "horse" → "hors" (cost 1)
      dp[4][0] = 4     // Replace 'e' with 'r': "horse" → "horsr" (cost 1)
  ) = 1 + min(5, 3, 4) = 1 + 3 = 4

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  3]
    o  [2,  2,  1,  2]
    r  [3,  2,  2,  2]
    s  [4,  3,  3,  2]
    e  [5,  4,  ?,  ?]

i=5, j=2: Compare 'e' with 'o'
  'e' ≠ 'o' → mismatch
  dp[5][2] = 1 + min(
      dp[5][1] = 4,    // Insert 'o': "horse" → "horseo" (cost 1)
      dp[4][2] = 3,    // Delete 'e': "horse" → "hors" (cost 1) + "hors" → "horso" (cost 1) = 2
      dp[4][1] = 3     // Replace 'e' with 'o': "horse" → "horso" (cost 1)
  ) = 1 + min(4, 3, 3) = 1 + 3 = 4

        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  3]
    o  [2,  2,  1,  2]
    r  [3,  2,  2,  2]
    s  [4,  3,  3,  2]
    e  [5,  4,  4,  ?]

i=5, j=3: Compare 'e' with 's'
  'e' ≠ 's' → mismatch
  dp[5][3] = 1 + min(
      dp[5][2] = 4,    // Insert 's': "horse" → "horses" (cost 1)
      dp[4][3] = 2,    // Delete 'e': "horse" → "hors" (cost 1) + "hors" → "ros" (cost 1) = 2
      dp[4][2] = 3     // Replace 'e' with 's': "horse" → "horss" (cost 1)
  ) = 1 + min(4, 2, 3) = 1 + 2 = 3

Final DP Table:
        ""  r   o   s
    "" [0,  1,  2,  3]
    h  [1,  1,  2,  3]
    o  [2,  2,  1,  2]
    r  [3,  2,  2,  2]
    s  [4,  3,  3,  2]
    e  [5,  4,  4,  3]

🏆 Result: dp[5][3] = 3

✅ Minimum edit distance from "horse" to "ros" is 3 operations.

─────────────────────────────────────────

📊 UNDERSTANDING THE THREE OPERATIONS:

1️⃣ INSERT (dp[i][j-1]):
   - Insert s2[j-1] into s1 at position i
   - After insertion, we've matched s2[j-1], so we move to s2[j-2]
   - s1 still has i characters to process
   - Example: "h" → "hr" (insert 'r')

2️⃣ DELETE (dp[i-1][j]):
   - Delete s1[i-1] from s1
   - After deletion, we've removed s1[i-1], so we move to s1[i-2]
   - s2 still has j characters to process
   - Example: "ho" → "h" (delete 'o')

3️⃣ REPLACE (dp[i-1][j-1]):
   - Replace s1[i-1] with s2[j-1]
   - After replacement, both characters are matched, so we move to s1[i-2] and s2[j-2]
   - Example: "h" → "r" (replace 'h' with 'r')

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Outer loop: m iterations (length of s1)
- Inner loop: n iterations (length of s2)
- Each cell computation: O(1) (just comparisons and min operation)
- Total: O(m × n)

🎯 SPACE COMPLEXITY ANALYSIS:
- DP table: (m+1) × (n+1) = O(m × n)
- No additional space needed
- Total: O(m × n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Empty Strings
Input: s1 = "", s2 = ""
dp[0][0] = 0
Output: 0 ✓

CASE 2: One Empty String
Input: s1 = "abc", s2 = ""
dp[3][0] = 3 (delete all)
Output: 3 ✓

Input: s1 = "", s2 = "abc"
dp[0][3] = 3 (insert all)
Output: 3 ✓

CASE 3: Identical Strings
Input: s1 = "abc", s2 = "abc"
All characters match → diagonal values carried forward
dp[3][3] = 0
Output: 0 ✓

CASE 4: Completely Different Strings
Input: s1 = "abc", s2 = "xyz"
All characters different → all operations are replace
dp[3][3] = 3
Output: 3 ✓

CASE 5: One Character Strings
Input: s1 = "a", s2 = "b"
dp[1][1] = 1 + min(dp[1][0]=1, dp[0][1]=1, dp[0][0]=0) = 1 + 0 = 1
Output: 1 ✓

─────────────────────────────────────────

🎯 WHY TABULATION OVER RECURSION?

ADVANTAGES:
✅ No recursion overhead (no function call stack)
✅ Better cache locality (sequential memory access)
✅ Easier to optimize (can use space optimization)
✅ No stack overflow risk for large inputs
✅ Predictable memory usage

DISADVANTAGES:
❌ Must fill entire table (even if not all values needed)
❌ Less intuitive than recursion
❌ Harder to reconstruct actual operations (need backtracking)

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Considers all possible operations: ✓
- Takes minimum at each step: ✓
- Optimal substructure: ✓
- Handles all base cases: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 5-8: Initialize DP table
  - Create (m+1) × (n+1) table
  - Fill with 0s initially

Line 11-13: Base case - empty s2
  - dp[i][0] = i (delete all from s1)

Line 16-18: Base case - empty s1
  - dp[0][j] = j (insert all from s2)

Line 20-32: Fill DP table
  - Compare characters s1[i-1] and s2[j-1]
  - If match: use diagonal value
  - If mismatch: try all three operations, take minimum

Line 34: Return final answer
  - dp[m][n] contains edit distance for entire strings

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Spell checkers and autocorrect
- DNA sequence alignment
- Plagiarism detection
- Version control systems (diff algorithms)
- Fuzzy string matching
- Natural language processing
- Data deduplication

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Edit Distance (this problem)
- One Edit Distance
- Delete Operation for Two Strings
- Minimum ASCII Delete Sum for Two Strings
- Longest Common Subsequence (LCS)

─────────────────────────────────────────

🎯 TESTING STRATEGY:
- Empty strings
- Identical strings
- One character strings
- Completely different strings
- One string is substring of another
- Strings with repeated characters
- Large strings (stress test)

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print DP table after each iteration
- Verify base cases are correct
- Check character indexing (i-1, j-1)
- Ensure min operation considers all three cases
- Trace through example manually

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Off-by-one errors in indexing (use i-1, j-1 for characters)
- Forgetting base cases
- Wrong operation costs (should be 1 for each operation)
- Not handling empty strings correctly
- Confusing insert/delete directions

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Use descriptive variable names (m, n for lengths)
- Initialize base cases clearly
- Comment each operation (insert, delete, replace)
- Test with edge cases first
- Verify with known examples

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the recurrence relation clearly
- Walk through a small example
- Discuss time and space complexity
- Mention optimization possibilities (space optimization)
- Relate to real-world applications

─────────────────────────────────────────

🎯 SPACE OPTIMIZATION POSSIBILITY:
Since we only need previous row to compute current row, we can optimize
space from O(m × n) to O(min(m, n)) using two arrays (similar to LCS
space optimization). However, this makes it harder to reconstruct the
actual sequence of operations.

─────────────────────────────────────────

🎯 CONCLUSION:
Edit Distance using DP Tabulation efficiently computes the minimum number
of operations to transform one string into another by building a 2D table
bottom-up, considering insert, delete, and replace operations at each step,
achieving O(m × n) time and O(m × n) space complexity!
*/