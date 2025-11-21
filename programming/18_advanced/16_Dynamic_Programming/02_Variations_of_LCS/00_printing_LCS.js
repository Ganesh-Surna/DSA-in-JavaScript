/* Problem: ✅✅✅✅ Printing the Longest Common Subsequence (LCS) ✅✅✅✅

We already know how to compute the LENGTH of the longest common subsequence,
but most interviewers (and real-world diff tools) actually want the sequence
itself. Given two strings `s1` and `s2`, return the actual LCS string.

🎯 Why bother printing the LCS?
- Diff utilities (Git, SVN) highlight common subsequences to show minimal edits.
- Bioinformatics: reconstructing shared DNA segments between sequences.
- Text comparison, plagiarism detection, code similarity metrics.
- Builds intuition for reconstructing answers from DP tables (classic pattern).

🧠 Core Idea (How it works):
1. Reuse the bottom-up DP table from standard LCS length computation.
2. Each cell `dp[i][j]` stores the length of LCS for prefixes `s1[0..i-1]` & `s2[0..j-1]`.
3. After filling the table, walk BACKWARDS from `dp[m][n]` to reconstruct the sequence:
   - If characters match → include that character and move diagonally (`i-1`, `j-1`).
   - Otherwise move to the neighbor (up or left) with the larger value.
4. Because we collect characters in reverse order during backtracking, reverse at end.

🧾 Why the `(m+1) × (n+1)` table AGAIN?
- Row 0 / Column 0 represent empty prefixes (length 0), just like the length DP.
- Having this extra border eliminates boundary checks while referencing `i-1` or `j-1`.
- During backtracking, reaching row 0 or column 0 naturally means no more characters.

📈 Expected Complexities:
// ✅ Time Complexity: O(m · n) to fill table + O(m + n) to backtrack.
// ✅ Space Complexity: O(m · n) for the table (can be optimized with parent pointers, but clarity > optimization here).

🧩 Step-by-Step Flow (How and Why):
1️⃣ Build DP table exactly like `03_DP_Tabulation.js`.
2️⃣ Start from bottom-right corner `(i = m, j = n)`.
3️⃣ While `i > 0` and `j > 0`:
   - If `s1[i-1] === s2[j-1]` → char is part of LCS → push to array, decrement both `i` & `j`.
   - Else move towards the cell with the larger LCS length (`dp[i-1][j]` vs `dp[i][j-1]`).
4️⃣ Reverse collected characters (because we added from tail to head).

🔍 Practical tip: You can also build the string by appending to the front, but
using an array + reverse is simpler and more efficient (front insert is O(n)).



NOTE:
  dp[i-1][j] → LCS without the last character of s1
  dp[i][j-1] → LCS without the last character of s2
  dp[i-1][j-1] → LCS without last character of BOTH strings
*/

function printLCS(s1, s2){
    const m = s1.length;
    const n = s2.length;
    if(m === 0 || n === 0) return ""; // Quick exit for empty strings

    // 1️⃣ Build DP table with an extra row/column for empty prefixes
    const dp = new Array(m + 1);
    for(let i = 0; i <= m; i++){
        dp[i] = new Array(n + 1).fill(0);
    }

    for(let i = 1; i <= m; i++){
        for(let j = 1; j <= n; j++){
            if(s1[i - 1] === s2[j - 1]){
                dp[i][j] = 1 + dp[i - 1][j - 1]; // ↖︎ diagonal on match
            }else{
              let exclude_s1_last = dp[i - 1][j];
              let exclude_s2_last = dp[i][j - 1];
                dp[i][j] = Math.max(exclude_s1_last, exclude_s2_last); // ↑ or ←, keep best
            }
        }
    }

    // 2️⃣ Backtrack to reconstruct the sequence
    let i = m, j = n;
    const chars = [];

    while(i > 0 && j > 0){
        if(s1[i - 1] === s2[j - 1]){
            chars.push(s1[i - 1]); // Part of LCS → store character
            i--; j--;               // Move diagonally (consume both chars)
        }else if(dp[i - 1][j] >= dp[i][j - 1]){
            i--; // Move up: skipping s1[i-1] gives longer/equal LCS length
        }else{
            j--; // Move left: skipping s2[j-1] gives longer LCS length
        }
    }

    return chars.reverse().join(""); // We collected in reverse order
}

/* ====================
 * Example test cases
 * ==================== */

function demo(){
    console.log(printLCS("AXYZ", "BAZ"));           // "AZ"
    console.log(printLCS("ABCBDAB", "BDCAB"));      // "BCAB" (or "BDAB")
    console.log(printLCS("XMJYAUZ", "MZJAWXU"));    // "MJAU" (one valid LCS)
    console.log(printLCS("", "ABCDE"));             // ""
    console.log(printLCS("ABC", "DEF"));            // ""
}

demo();

/*🎯 CRYSTAL-CLEAR WALKTHROUGH (Example: s1 = "ABCBDAB", s2 = "BDCABA")

1️⃣ DP TABLE CONSTRUCTION (showing final table values)
Indices: i axis for `s1` (down), j axis for `s2` (across). Row 0 / column 0 = 0.

        ""  B  D  C  A  B  A
   ""   0  0  0  0  0  0  0
s1 "A"  0  0  0  0  1  1  1
   "B"  0  1  1  1  1  2  2
   "C"  0  1  1  2  2  2  2
   "B"  0  1  1  2  2  3  3
   "D"  0  1  2  2  2  3  3
   "A"  0  1  2  2  3  3  4
   "B"  0  1  2  3  3  4  4 ← dp[7][6] = 4 (LCS length)

Highlights:
- Diagonal increases happen on matches (e.g., 'C' vs 'C', 'A' vs 'A', 'B' vs 'B').
- Horizontal/vertical propagations carry the best known LCS so far.

2️⃣ BACKTRACKING (How we choose the characters):
Start at the bottom-right of the table (`i = 7`, `j = 6`, current LCS length = 4).
While both indices are positive, look at the table and decide where to move:
- Step 1: Compare `s1[6] = 'B'` with `s2[5] = 'A'`. They do **not** match.
  • Look up (`dp[6][6] = 4`) and left (`dp[7][5] = 4`).
  • Values tie, so we follow our convention “move UP on ties”. New position → `(6, 6)`.
- Step 2: Now `s1[5] = 'A'`, `s2[5] = 'A'`. They match!
  • Append `'A'` to our answer list.
  • Move diagonally to `(5, 5)` because we used both characters.
- Step 3: At `(5, 5)`, `s1[4] = 'D'`, `s2[4] = 'B'` → mismatch.
  • Check `dp[4][5] = 3` (up) vs `dp[5][4] = 2` (left). Up is larger.
  • Move to `(4, 5)`.
- Step 4: `(4, 5)` compares `s1[3] = 'B'` with `s2[4] = 'B'` → match!
  • Append `'B'`. Move diagonally to `(3, 4)`.
- Step 5: `(3, 4)` compares `s1[2] = 'C'` with `s2[3] = 'A'` → mismatch.
  • Check neighbors: `dp[2][4] = 1` (up) vs `dp[3][3] = 2` (left). Left is bigger.
  • Move left to `(3, 3)`.
- Step 6: `(3, 3)` compares `s1[2] = 'C'` with `s2[2] = 'C'` → match!
  • Append `'C'`. Move diagonally to `(2, 2)`.
- Step 7: `(2, 2)` compares `s1[1] = 'B'` with `s2[1] = 'D'` → mismatch.
  • Check `dp[1][2] = 0` (up) vs `dp[2][1] = 1` (left). Left wins → move to `(2, 1)`.
- Step 8: `(2, 1)` compares `s1[1] = 'B'` with `s2[0] = 'B'` → match!
  • Append `'B'`. Move diagonally to `(1, 0)`.
- Step 9: Column index hits 0 → stop (no more characters in second string).

Collected characters (in reverse order of discovery): `['A', 'B', 'C', 'B']`.
Reverse them → final LCS string = "BCBA".
Because of ties during moves, other valid sequences like "BCAB" or "BDAB" are possible, but every choice still yields length 4.

3️⃣ WHY THE PATH WORKS (Intuition):
- Matching cells represent characters that must appear in the LCS.
- When mismatch occurs, we move to the neighbor with the larger value because
  that neighbor corresponds to dropping one character to keep the longest length.
- Ties mean multiple valid subsequences exist; our tie-breaking (preferring ↑ on >=) is deterministic.

🧭 VISUAL RECAP:
- Think of the DP table as a map. Starting from bottom-right, always move towards
  the neighbor with the same LCS length until a match forces a diagonal move.
- Each diagonal move adds one character to the result.

✅ EDGE CASES:
- Either string empty → early return "" (no LCS).
- Identical strings → diagonal path all the way, result equals original strings.
- No common characters → never hit match; backtracking slides to row/column 0, return "".
- Multiple valid LCSs → tie-breaking decides which one we return (all correct).

🎯 ADVANTAGES:
- Clear template for any “print the solution” DP problem.
- Easily extendable to return all LCSs (with extra branching) or shortest common supersequence.
- Lays groundwork for diff utilities, edit scripts, and alignment algorithms.

⚠️ DISADVANTAGES:
- Requires O(m · n) memory (can be large for big strings). For very long strings
  you may use Hirschberg’s algorithm (divide-and-conquer that keeps O(min(m,n))).

🧪 TESTING STRATEGY:
- Empty vs non-empty combinations.
- Strings with repeated characters causing multiple LCSs.
- Stress test with long identical strings (should return same string).
- Cases like s1="AAAA", s2="AA" to ensure repeated matches handled correctly.

🪛 DEBUGGING TIPS:
- Print the DP table if output seems wrong; verify diagonal matches at expected spots.
- Trace backtracking path manually on small samples.
- Ensure chars collected reversed before returning.
- Watch off-by-one: `s1[i-1]` & `s2[j-1]` when `i`/`j` > 0.

💡 INTERVIEW TIPS:
- Start by stating you’ll reuse the DP table from LCS length.
- Mention `(m+1) × (n+1)` dimension and how it simplifies boundaries.
- Walk through a small example and physically trace the backtracking steps.
- Discuss memory trade-offs and variants (space-optimized DP, Hirschberg).
- Conclude by highlighting real-world tie-in (diff tools, DNA alignment).
*/
