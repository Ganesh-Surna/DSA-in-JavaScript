/* Problem: ✅✅✅✅ Longest Palindromic Subsequence (LPS) ✅✅✅✅

Given a string `s`, return (a) the length of its longest palindromic subsequence
and (b) one subsequence achieving that length. A subsequence keeps character
order but may skip characters. Palindromic means reads the same forward/backward.

🎯 Why this matters:
- Baseline for string DP problems: plays into palindrome partitioning, minimum
  insertions to form palindrome, edit distance variants, bioinformatics.
- Interview staple: shows ability to reduce a new problem to LCS by reversing.

🧠 Core Insight (How/Why):
- Any palindromic subsequence reads identically forward/backward.
- Therefore, LPS(s) == LCS(s, reverse(s)).
- Build the standard LCS DP table on `s` vs `rev`, then backtrack to construct
  the subsequence (which is inherently palindromic because mirror characters are matched).

🧩 Plan:
1️⃣ Compute `rev = reverse(s)`.
2️⃣ Build `(n+1) × (n+1)` LCS table between `s` and `rev`.
3️⃣ Backtrack to collect characters (diagonal on match, otherwise move towards
    larger neighbor). This yields an LCS which is the LPS.

📈 Complexity:
// ✅ TC = O(n²) — fill DP grid once.
// ✅ SC = O(n²) — DP grid (can be optimized to O(n) if only length is needed).
*/

function longestPalindromicSubsequence(s){
    const rev = [...s].reverse().join("");
    const dp = buildLcsTable(s, rev); // Build the LCS table (Here s1 is the original string and s2 is the reversed string)
    const lps = buildLCS(s, rev, dp); // Build the LPS string
    return { length: lps.length, lps };
}

function buildLcsTable(a, b){
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for(let i = 1; i <= m; i++){
        for(let j = 1; j <= n; j++){
            if(a[i - 1] === b[j - 1]){
                dp[i][j] = 1 + dp[i - 1][j - 1];
            }else{
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp;
}

function buildLCS(a, b, dp){
    let i = a.length;
    let j = b.length;
    const chars = [];

    while(i > 0 && j > 0){
        if(a[i - 1] === b[j - 1]){
            chars.push(a[i - 1]);
            i--; j--;
        }else if(dp[i - 1][j] >= dp[i][j - 1]){
            i--;
        }else{
            j--;
        }
    }
    return chars.reverse().join("");
}

/* ====================
 * Example test cases
 * ==================== */

function demo(){
    console.log(longestPalindromicSubsequence("bbbab"));      // { length: 4, lps: "bbbb" }
    console.log(longestPalindromicSubsequence("agbdba"));     // { length: 5, lps: "abdba" }
    console.log(longestPalindromicSubsequence("cbbd"));       // { length: 2, lps: "bb" }
    console.log(longestPalindromicSubsequence("abc"));        // { length: 1, lps: "a" (or b / c) }
    console.log(longestPalindromicSubsequence(""));           // { length: 0, lps: "" }
}

demo();

/*🎯 WALKTHROUGH (s = "agbdba")

1️⃣ Reverse string: rev = "abdbga".
2️⃣ Build LCS table (rows = s including empty prefix, cols = rev):
      "" a b d b g a
   ""  0 0 0 0 0 0 0
   a   0 1 1 1 1 1 1
   g   0 1 1 1 1 2 2
   b   0 1 2 2 2 2 2
   d   0 1 2 3 3 3 3
   b   0 1 2 3 4 4 4
   a   0 1 2 3 4 4 5
   LCS length = 5.

3️⃣ Backtrack from `(i=6, j=6)` while both indices > 0:
   - Step 1 (6,6): s[5]='a', rev[5]='a' → match → push 'a', move to (5,5).
   - Step 2 (5,5): 'b' vs 'g' mismatch. Compare neighbors:
         up = dp[4][5]=3, left = dp[5][4]=4 → left larger → move left to (5,4) (no push).
   - Step 3 (5,4): 'b' vs 'b' → match → push 'b', move diagonally to (4,3).
   - Step 4 (4,3): 'd' vs 'd' → match → push 'd', move to (3,2).
   - Step 5 (3,2): 'b' vs 'b' → match → push 'b', move to (2,1).
   - Step 6 (2,1): 'g' vs 'a' mismatch → up cell dp[1][1]=1 ≥ left dp[2][0]=0 → move up to (1,1).
   - Step 7 (1,1): 'a' vs 'a' → match → push 'a', move to (0,0).
   - Stop (i or j reached 0). Collected (in reverse order) = ['a','b','d','b','a'].
   - Reverse → `"abdba"` (palindrome of length 5).

✅ Result: length 5, subsequence "abdba".

📊 Visual Intuition:
- Matching `s` with `reverse(s)` ensures each matched pair becomes mirrored characters.
- Diagonal moves correspond to palindromic pairs; center character (if odd length) arises when both pointers meet the same character.

✅ Edge Cases:
- Empty string → length 0, subsequence "".
- Single character → length 1, subsequence that character.
- All identical characters → entire string is the LPS.
- Strings with no repeated characters → any single char is an LPS (length 1).

🪛 Debugging Tips:
- Check `rev` creation (spread + reverse + join ensures correct handling of UTF-16 units).
- Ensure `.reverse()` was applied before LCS run; forgetting gives wrong results.
- If LPS string is not palindromic, backtracking logic likely inserted mismatched chars; verify diagonal-only adds.

🧪 Testing Strategy:
- Palindrome input vs non-palindrome.
- Even vs odd length palindromes.
- Strings with multiple possible LPS (e.g., "bbbab").
- Mixed case / unicode characters to ensure reversal handles them.

💡 Interview Tips:
- Start by explaining reduction to LCS.
- Mention complexity and ways to optimize space if only length is required.
- Discuss how to modify to compute minimum insertions to form palindrome
  (n - LPS length).
- Emphasize difference between subsequence vs substring problems (e.g., Longest Palindromic Substring).
*/
