/* Problem:
Given two strings s1 and s2, return the length of their longest common subsequence (LCS). If there is no common subsequence, return 0.

A subsequence is a sequence that can be derived from the given string by deleting some or no elements without changing the order of the remaining elements. For example, "ABE" is a subsequence of "ABCDE".

Example 1:
Input: s1 = "ABCDGH", s2 = "AEDFHR"
Output: 3
Explanation: The longest common subsequence of "ABCDGH" and "AEDFHR" is "ADH", which has a length of 3.

Example 2:
Input: s1 = "ABC", s2 = "AC"
Output: 2
Explanation: The longest common subsequence of "ABC" and "AC" is "AC", which has a length of 2.

Example 3:
Input: s1 = "XYZW", s2 = "XYWZ"
Output: 3
Explanation: The longest common subsequences of "XYZW" and "XYWZ" are "XYZ" and "XYW", both of length 3.

Example 4:
Input: s1 = "AGGTAB", s2 = "GXTXAYB"
Output: 4
Explanation: The longest common subsequence is "GTAB", which has a length of 4.

Constraints:
1 ≤ s1.size(), s2.size() ≤ 10^3
Both strings s1 and s2 contain only uppercase English letters.

Expected Time Complexity: O(n * m)
Expected Auxiliary Space: O(min(n, m))
*/

// ✅✅✅ Approach 2: Using DP, Space Optimized ✅✅✅

// ✅ TC = O(n*m) --> Nested loops through both strings
// ✅ SC = O(min(n, m)) --> Space-optimized DP with two rows
function longestCommonSubsequence(s1, s2) {
    let n = s1.length, m = s2.length;
  
    // Always keep s2 as smaller to reduce space
    if (m > n) {
      [s1, s2] = [s2, s1];
      [n, m] = [m, n];
    }
  
    // Use only two rows: prev and curr
    let prev = new Array(m + 1).fill(0);
    let curr = new Array(m + 1).fill(0);
  
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          // Characters match: LCS length increases by 1
          curr[j] = 1 + prev[j - 1];
        } else {
          // Characters don't match: take maximum of two choices
          curr[j] = Math.max(prev[j], curr[j - 1]);
        }
      }
      // Swap rows for next iteration
      [prev, curr] = [curr, prev];
    }
  
    return prev[m];
}

// ✅ Test Cases
console.log(longestCommonSubsequence("ABCDGH", "AEDFHR")); // 3
console.log(longestCommonSubsequence("ABC", "AC"));        // 2
console.log(longestCommonSubsequence("XYZW", "XYWZ"));     // 3
console.log(longestCommonSubsequence("AGGTAB", "GXTXAYB")); // 4
console.log(longestCommonSubsequence("", "ABC"));          // 0
console.log(longestCommonSubsequence("ABC", ""));          // 0

/*🎯 CORE IDEA: Instead of using recursive approaches (O(2^n)), we use DYNAMIC PROGRAMMING with SPACE OPTIMIZATION to efficiently find the longest common subsequence in O(n*m) time and O(min(n,m)) space.

📋 STEP-BY-STEP FLOW:

1️⃣ SPACE OPTIMIZATION:
   - Always keep the shorter string as s2 to minimize space
   - Use only two rows (prev and curr) instead of full DP table
   - Swap rows after each iteration to simulate 2D DP

2️⃣ DP STATE DEFINITION:
   - dp[i][j] = length of LCS of s1[0:i] and s2[0:j]
   - Base case: dp[0][j] = 0 and dp[i][0] = 0 (empty strings)

3️⃣ RECURRENCE RELATION:
   - If s1[i-1] == s2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]
   - If s1[i-1] != s2[j-1]: dp[i][j] = max(dp[i-1][j], dp[i][j-1])

4️⃣ ROW SWAPPING TECHNIQUE:
   - Use prev array for previous row (i-1)
   - Use curr array for current row (i)
   - Swap arrays after processing each row

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n*m) vs O(2^n) for recursive approach
2️⃣ SPACE OPTIMIZATION: O(min(n,m)) vs O(n*m) for full DP table
3️⃣ DYNAMIC PROGRAMMING: Avoids recalculating overlapping subproblems
4️⃣ ROW SWAPPING: Simulates 2D DP with 1D arrays

💡 KEY INSIGHTS:

1️⃣ OPTIMAL SUBSTRUCTURE: LCS of prefixes can be built from smaller LCS
2️⃣ OVERLAPPING SUBPROBLEMS: Same subproblems appear multiple times
3️⃣ SPACE OPTIMIZATION: Only need previous row to compute current row
4️⃣ CHARACTER MATCHING: When characters match, LCS length increases by 1

🎯 WHY DYNAMIC PROGRAMMING WORKS?
- Optimal substructure: LCS of s1[0:i] and s2[0:j] depends on smaller LCS
- Overlapping subproblems: Same subproblems appear in recursive calls
- Memoization: Store results to avoid recalculation

🎯 ALGORITHM INTUITION:
Think of it as building the LCS length incrementally by comparing characters.
When characters match, we extend the LCS. When they don't match, we take the
best result from excluding one character from either string.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
s1 = "ABCDGH", s2 = "AEDFHR"     (n=6, m=6)

🎯 GOAL: Find length of longest common subsequence!

🔍 STEP-BY-STEP PROCESS:

📋 STEP 1: Space optimization
Since m = n = 6, no swapping needed
s1 = "ABCDGH", s2 = "AEDFHR"

📋 STEP 2: Initialize DP arrays
prev = [0, 0, 0, 0, 0, 0, 0]  // for row i-1
curr = [0, 0, 0, 0, 0, 0, 0]  // for row i

📋 STEP 3: Fill DP table row by row

ROW 1 (i=1, s1[0]='A'):
  j=1: s1[0]='A', s2[0]='A' → MATCH → curr[1] = 1 + prev[0] = 1
  j=2: s1[0]='A', s2[1]='E' → NO MATCH → curr[2] = max(prev[2], curr[1]) = max(0, 1) = 1
  j=3: s1[0]='A', s2[2]='D' → NO MATCH → curr[3] = max(prev[3], curr[2]) = max(0, 1) = 1
  j=4: s1[0]='A', s2[3]='F' → NO MATCH → curr[4] = max(prev[4], curr[3]) = max(0, 1) = 1
  j=5: s1[0]='A', s2[4]='H' → NO MATCH → curr[5] = max(prev[5], curr[4]) = max(0, 1) = 1
  j=6: s1[0]='A', s2[5]='R' → NO MATCH → curr[6] = max(prev[6], curr[5]) = max(0, 1) = 1
  Before Swap:
  prev = [0, 0, 0, 0, 0, 0, 0], curr = [0, 1, 1, 1, 1, 1, 1]
  After Swap:
  prev = [0, 1, 1, 1, 1, 1, 1], curr = [0, 0, 0, 0, 0, 0, 0]

ROW 2 (i=2, s1[1]='B'):
  j=1: s1[1]='B', s2[0]='A' → NO MATCH → curr[1] = max(prev[1], curr[0]) = max(1, 0) = 1
  j=2: s1[1]='B', s2[1]='E' → NO MATCH → curr[2] = max(prev[2], curr[1]) = max(1, 1) = 1
  j=3: s1[1]='B', s2[2]='D' → NO MATCH → curr[3] = max(prev[3], curr[2]) = max(1, 1) = 1
  j=4: s1[1]='B', s2[3]='F' → NO MATCH → curr[4] = max(prev[4], curr[3]) = max(1, 1) = 1
  j=5: s1[1]='B', s2[4]='H' → NO MATCH → curr[5] = max(prev[5], curr[4]) = max(1, 1) = 1
  j=6: s1[1]='B', s2[5]='R' → NO MATCH → curr[6] = max(prev[6], curr[5]) = max(1, 1) = 1
  Before Swap:
  prev = [0, 1, 1, 1, 1, 1, 1], curr = [0, 1, 1, 1, 1, 1, 1]
  After Swap:
  prev = [0, 1, 1, 1, 1, 1, 1], curr = [0, 1, 1, 1, 1, 1, 1]

ROW 3 (i=3, s1[2]='C'):
  j=1: s1[2]='C', s2[0]='A' → NO MATCH → curr[1] = max(prev[1], curr[0]) = max(1, 0) = 1
  j=2: s1[2]='C', s2[1]='E' → NO MATCH → curr[2] = max(prev[2], curr[1]) = max(1, 1) = 1
  j=3: s1[2]='C', s2[2]='D' → NO MATCH → curr[3] = max(prev[3], curr[2]) = max(1, 1) = 1
  j=4: s1[2]='C', s2[3]='F' → NO MATCH → curr[4] = max(prev[4], curr[3]) = max(1, 1) = 1
  j=5: s1[2]='C', s2[4]='H' → NO MATCH → curr[5] = max(prev[5], curr[4]) = max(1, 1) = 1
  j=6: s1[2]='C', s2[5]='R' → NO MATCH → curr[6] = max(prev[6], curr[5]) = max(1, 1) = 1
  Before Swap:
  prev = [0, 1, 1, 1, 1, 1, 1], curr = [0, 1, 1, 1, 1, 1, 1]
  After Swap:
  prev = [0, 1, 1, 1, 1, 1, 1], curr = [0, 1, 1, 1, 1, 1, 1]

ROW 4 (i=4, s1[3]='D'):
  j=1: s1[3]='D', s2[0]='A' → NO MATCH → curr[1] = max(prev[1], curr[0]) = max(1, 0) = 1
  j=2: s1[3]='D', s2[1]='E' → NO MATCH → curr[2] = max(prev[2], curr[1]) = max(1, 1) = 1
  j=3: s1[3]='D', s2[2]='D' → MATCH → curr[3] = 1 + prev[2] = 1 + 1 = 2
  j=4: s1[3]='D', s2[3]='F' → NO MATCH → curr[4] = max(prev[4], curr[3]) = max(1, 2) = 2
  j=5: s1[3]='D', s2[4]='H' → NO MATCH → curr[5] = max(prev[5], curr[4]) = max(1, 2) = 2
  j=6: s1[3]='D', s2[5]='R' → NO MATCH → curr[6] = max(prev[6], curr[5]) = max(1, 2) = 2
  Before Swap:
  prev = [0, 1, 1, 1, 1, 1, 1], curr = [0, 1, 1, 2, 2, 2, 2]
  After Swap:
  prev = [0, 1, 1, 2, 2, 2, 2], curr = [0, 1, 1, 1, 1, 1, 1]

ROW 5 (i=5, s1[4]='G'):
  j=1: s1[4]='G', s2[0]='A' → NO MATCH → curr[1] = max(prev[1], curr[0]) = max(1, 0) = 1
  j=2: s1[4]='G', s2[1]='E' → NO MATCH → curr[2] = max(prev[2], curr[1]) = max(1, 1) = 1
  j=3: s1[4]='G', s2[2]='D' → NO MATCH → curr[3] = max(prev[3], curr[2]) = max(2, 1) = 2
  j=4: s1[4]='G', s2[3]='F' → NO MATCH → curr[4] = max(prev[4], curr[3]) = max(2, 2) = 2
  j=5: s1[4]='G', s2[4]='H' → NO MATCH → curr[5] = max(prev[5], curr[4]) = max(2, 2) = 2
  j=6: s1[4]='G', s2[5]='R' → NO MATCH → curr[6] = max(prev[6], curr[5]) = max(2, 2) = 2
  Before Swap:
  prev = [0, 1, 1, 2, 2, 2, 2], curr = [0, 1, 1, 2, 2, 2, 2]
  After Swap:
  prev = [0, 1, 1, 2, 2, 2, 2], curr = [0, 1, 1, 2, 2, 2, 2]

ROW 6 (i=6, s1[5]='H'):
  j=1: s1[5]='H', s2[0]='A' → NO MATCH → curr[1] = max(prev[1], curr[0]) = max(1, 0) = 1
  j=2: s1[5]='H', s2[1]='E' → NO MATCH → curr[2] = max(prev[2], curr[1]) = max(1, 1) = 1
  j=3: s1[5]='H', s2[2]='D' → NO MATCH → curr[3] = max(prev[3], curr[2]) = max(2, 1) = 2
  j=4: s1[5]='H', s2[3]='F' → NO MATCH → curr[4] = max(prev[4], curr[3]) = max(2, 2) = 2
  j=5: s1[5]='H', s2[4]='H' → MATCH → curr[5] = 1 + prev[4] = 1 + 2 = 3
  j=6: s1[5]='H', s2[5]='R' → NO MATCH → curr[6] = max(prev[6], curr[5]) = max(2, 3) = 3
  Before Swap:
  prev = [0, 1, 1, 2, 2, 2, 2], curr = [0, 1, 1, 2, 2, 3, 3]
  After Swap:
  prev = [0, 1, 1, 2, 2, 3, 3], curr = [0, 1, 1, 2, 2, 2, 2]

🏆 FINAL RESULT: prev[6] = 3

🎯 VERIFICATION:
LCS of "ABCDGH" and "AEDFHR" is "ADH" with length 3 ✓

─────────────────────────────────────────

📊 SIMPLE EXAMPLE:
s1 = "ABC", s2 = "AC"     (n=3, m=2)

🔍 Process:

ROW 1 (i=1, s1[0]='A'):
- j=1: 'A'=='A' → MATCH → curr[1] = 1 + prev[0] = 1
- j=2: 'A'!='C' → NO MATCH → curr[2] = max(prev[2], curr[1]) = max(0, 1) = 1
  Before Swap:
  prev = [0, 0, 0], curr = [0, 1, 1]
  After Swap:
  prev = [0, 1, 1], curr = [0, 0, 0]

ROW 2 (i=2, s1[1]='B'):
- j=1: 'B'!='A' → NO MATCH → curr[1] = max(prev[1], curr[0]) = max(1, 0) = 1
- j=2: 'B'!='C' → NO MATCH → curr[2] = max(prev[2], curr[1]) = max(1, 1) = 1
  Before Swap:
  prev = [0, 1, 1], curr = [0, 1, 1]
  After Swap:
  prev = [0, 1, 1], curr = [0, 1, 1]

ROW 3 (i=3, s1[2]='C'):
- j=1: 'C'!='A' → NO MATCH → curr[1] = max(prev[1], curr[0]) = max(1, 0) = 1
- j=2: 'C'=='C' → MATCH → curr[2] = 1 + prev[1] = 1 + 1 = 2
  Before Swap:
  prev = [0, 1, 1], curr = [0, 1, 2]
  After Swap:
  prev = [0, 1, 2], curr = [0, 1, 1]

🏆 FINAL RESULT: prev[2] = 2

🎯 VERIFICATION:
LCS of "ABC" and "AC" is "AC" with length 2 ✓

🔍 WHY THIS WORKS:
1️⃣ DYNAMIC PROGRAMMING avoids recalculating overlapping subproblems
2️⃣ SPACE OPTIMIZATION reduces space from O(n*m) to O(min(n,m))
3️⃣ ROW SWAPPING simulates 2D DP table with 1D arrays
4️⃣ CHARACTER MATCHING logic correctly builds LCS incrementally

💡 KEY INSIGHT:
We don't need to store the entire DP table - we only need the previous row
to compute the current row! This reduces space complexity significantly.

🎯 TIME COMPLEXITY ANALYSIS:
- Nested loops: O(n * m) where n = s1.length, m = s2.length
- Each cell computation: O(1)
- Total: O(n * m)

🎯 SPACE COMPLEXITY ANALYSIS:
- Two arrays of size min(n, m): O(min(n, m))
- Other variables: O(1)
- Total: O(min(n, m))

🎯 MATHEMATICAL PROOF:
- Base case: LCS of empty strings is 0
- Recurrence: LCS[i][j] = max(LCS[i-1][j], LCS[i][j-1]) if chars don't match
- LCS[i][j] = 1 + LCS[i-1][j-1] if chars match
- This correctly computes the optimal LCS length

🎯 EDGE CASES HANDLED:
- Empty strings: Returns 0
- No common characters: Returns 0
- Identical strings: Returns string length
- One string is substring of other: Returns shorter string length

🎯 COMPARISON WITH OTHER APPROACHES:
- Recursive: O(2^n) time, O(n) space - exponential!
- Memoized recursive: O(n*m) time, O(n*m) space
- Space-optimized DP: O(n*m) time, O(min(n,m)) space - optimal!

🎯 OPTIMIZATION TECHNIQUES:
- Always use shorter string as s2 to minimize space
- Use row swapping instead of full 2D table
- Initialize arrays with 0 for base cases
- Process rows in order to maintain DP properties

🎯 SPACE OPTIMIZATION INSIGHT:
- DP[i][j] only depends on DP[i-1][j], DP[i][j-1], and DP[i-1][j-1]
- We can use two 1D arrays instead of 2D table
- Row swapping allows us to simulate the 2D table behavior

🎯 DYNAMIC PROGRAMMING PRINCIPLES:
- Optimal substructure: LCS of prefixes builds optimal LCS
- Overlapping subproblems: Same subproblems appear multiple times
- Memoization: Store results to avoid recalculation
- Bottom-up approach: Build solution from smaller subproblems

*/
  