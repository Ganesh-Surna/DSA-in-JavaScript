/* Problem: ✅✅✅✅ Longest Common Subsequence (LCS) — Bottom-Up Tabulation ✅✅✅✅

We iteratively build a DP table to obtain the LCS length for every pair of
prefixes. This implementation is iterative (no recursion) and is the standard
textbook DP solution.

🎯 Why Tabulation?
- Eliminates recursion overhead and explicit memo checks.
- Fills the DP table in increasing order of subproblem size.
- Facilitates reconstruction of the actual LCS if we track parent pointers.

🧠 Core Idea:
Define `dp[i][j]` = LCS length between `s1[0..i-1]` and `s2[0..j-1]`.
- If characters match → extend diagonal subsequence: `dp[i][j] = 1 + dp[i-1][j-1]`.
- Otherwise → take best of skipping one char from either string:
  `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.

🧩 Step-by-Step Flow:
1️⃣ Allocate an `(m+1) × (n+1)` table.
    - Row 0 / column 0 represent empty prefixes; values default to 0.
    - The extra row/column avoid index underflow when looking at `i-1` or `j-1`.
2️⃣ Initialize first row and first column to 0 (base cases with empty strings).
3️⃣ Iterate `i` from 1..m and `j` from 1..n, applying recurrence.
4️⃣ Final answer at `dp[m][n]`.

🧾 Why (m+1) × (n+1)?
- `dp[0][j]` = 0 represents LCS with empty prefix of `s1`.
- `dp[i][0]` = 0 represents empty prefix of `s2`.
- Having this guard band means transitions can always safely reference `dp[i-1][j-1]`,
  `dp[i-1][j]`, and `dp[i][j-1]` without boundary checks.

📈 Time vs Space:
// ✅ TC = O(m · n) — double loop.
// ✅ SC = O(m · n) — full table. Can be optimized to O(min(m, n)) with rolling arrays.
*/

function longestCommonSubsequence(s1, s2){
    let m = s1.length
    let n = s2.length
    // 1. Create 2D memo array - as 2 parameters(m & n) are varying
    let dp = new Array(m+1)
    for(let i=0; i<m+1; i++){
        dp[i] = new Array(n+1).fill(null)
    }
    
    // 2. Fill first Column
    // If n=0, LCS length is 0
    for(let i=0; i<m+1; i++){
        dp[i][0] = 0
    }
    
    // 3. Fill First Row
    // If m=0, LCS length is 0
    for(let i=0; i<n+1; i++){
        dp[0][i] = 0
    }
    
    // 4. Fill remaining table - according to Recursive solution
    for(let i=1; i<m+1; i++){
        for(let j=1; j<n+1; j++){
            if(s1[i-1] === s2[j-1]){
                dp[i][j] = 1+dp[i-1][j-1]  // 1 + diagnoal cell value
            }else{
                dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j]) // Max(up cell, left cell)
            }
        }
    }
    
    return dp[m][n]
}

console.log(longestCommonSubsequence("AXYZ", "BAZ")) // 2 --> "AZ"

/*🎯 DETAILED TABLE WALKTHROUGH (s1 = "AXYZ", s2 = "BAZ"):

Initialize dp with zeros in row 0/col 0:
      j → 0   1   2   3
          ""  B   A   Z
 i ↓
0 ""    0   0   0   0
1 "A"   0   ?   ?   ?
2 "X"   0   ?   ?   ?
3 "Y"   0   ?   ?   ?
4 "Z"   0   ?   ?   ?

Fill process:
- i=1, j=1 → compare 'A' vs 'B' → mismatch → max(0,0) = 0
- i=1, j=2 → compare 'A' vs 'A' → match → 1 + dp[0][1] = 1
- ... continue until ...
- i=4, j=3 → compare 'Z' vs 'Z' → match → 1 + dp[3][2] = 2

Final table segment:
      j → 0 1 2 3
 i ↓
0      0 0 0 0
1      0 0 1 1
2      0 0 1 1
3      0 0 1 1
4      0 0 1 2 ← answer

Notice: length grows along diagonal when chars match, otherwise longest prefix
value propagates horizontally/vertically.

🧭 Visual Insight:
- Each cell depends only on left, top, and top-left neighbors.
- The extra row/column make boundary conditions trivial.

✅ Edge Cases:
- Empty string in either input → dp[m][0] or dp[0][n] = 0
- Identical strings → diagonal becomes i (full length)
- No common characters → table stays 0 beyond guard band

💡 Interview Tips:
- Derive table formula from recursion: matching → diagonal, mismatch → max of left/up.
- Justify `(m+1) × (n+1)` dimension for clean base handling.
- Mention how to reconstruct actual LCS by backtracking from `dp[m][n]`.
- Discuss space optimization using two rows/columns.
*/