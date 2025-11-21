/* Problem: ✅✅✅✅ Shortest Common Supersequence (SCS) ✅✅✅✅

Given two strings `s1` and `s2`, build the **shortest** string that contains both
as subsequences. We return:
1️⃣ The minimum length.
2️⃣ One valid supersequence string achieving that length.

Key Concept:
 - A string X is a subsequence of string S if X can be obtained 
   by deleting zero or more characters from S without changing the order of remaining characters
 - ✅ A string S is a supersequence of string X if X is a subsequence of S

🎯 Why care?
- Diff/merge tools: produce the smallest merged document honoring both edits.
- Bioinformatics: combine strands while respecting character order.
- Sets up understanding for edit distance variants and sequence alignment.

🧠 Core relationship with LCS:
- LCS captures the overlapping part we can reuse once.
- Anything outside the LCS must appear explicitly in the SCS.
- Therefore: `|SCS| = |s1| + |s2| - LCS(s1, s2)`.

🧩 Plan (How & Why):
1️⃣ Build the standard `(m+1) × (n+1)` LCS table (`dp[i][j]` = LCS length for
    prefixes `s1[0..i-1]`, `s2[0..j-1]`).
2️⃣ Backtrack from `(m, n)`:
    - Matching chars → include once, move diagonally (reuse overlap).
    - Otherwise move to the neighbor with larger LCS value and append that
      character (the divergence must appear in SCS).
3️⃣ After one string is exhausted, append remaining characters from the other.
4️⃣ Reverse the collected characters (we built from end to start).

📈 Complexity:
// ✅ TC = O(m · n) — build table + single pass backtrack.
// ✅ SC = O(m · n) — DP table (can be optimized if only length needed).
*/

function shortestCommonSupersequence(s1, s2){
    const m = s1.length;
    const n = s2.length;
    if(m === 0) return { length: n, scs: s2 };
    if(n === 0) return { length: m, scs: s1 };

    const dp = buildLcsTable(s1, s2);
    const scsStr = buildSCS(s1, s2, dp);
    return { length: scsStr.length, scs: scsStr };
}

function buildLcsTable(s1, s2){
    const m = s1.length;
    const n = s2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for(let i = 1; i <= m; i++){
        for(let j = 1; j <= n; j++){
            if(s1[i - 1] === s2[j - 1]){
                dp[i][j] = 1 + dp[i - 1][j - 1];
            }else{
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp;
}

function buildSCS(s1, s2, dp){
    let i = s1.length;
    let j = s2.length;
    const chars = [];

    while(i > 0 && j > 0){
        if(s1[i - 1] === s2[j - 1]){
            chars.push(s1[i - 1]); // Shared char (part of LCS) → include once
            i--; j--;
        }else if(dp[i - 1][j] >= dp[i][j - 1]){
            chars.push(s1[i - 1]); // Diverge by taking from s1
            i--;
        }else{
            chars.push(s2[j - 1]); // Diverge by taking from s2
            j--;
        }
    }

    // Append remaining characters from either string
    while(i > 0){
        chars.push(s1[i - 1]);
        i--;
    }
    while(j > 0){
        chars.push(s2[j - 1]);
        j--;
    }

    return chars.reverse().join("");
}

/* ====================
 * Example test cases
 * ==================== */

function demo(){
    console.log(shortestCommonSupersequence("geek", "eke")); // { length: 5, scs: "gekek" }
    console.log(shortestCommonSupersequence("AGGTAB", "GXTXAYB")); // { length: 10, scs: "AGXGTXAYB" }
    console.log(shortestCommonSupersequence("abac", "cab")); // { length: 5, scs: "cabac" }
    console.log(shortestCommonSupersequence("ABC", "ABC")); // { length: 3, scs: "ABC" }
    console.log(shortestCommonSupersequence("", "XYZ")); // { length: 3, scs: "XYZ" }
}

demo();

/*🎯 CRYSTAL-CLEAR WALKTHROUGH (s1 = "geek", s2 = "eke")

1️⃣ Build LCS table. Resulting LCS = "ek" (length 2).
   dp grid (rows indexed by `s1` with empty prefix, columns by `s2`):

         ""  e  k  e
      ""  0  0  0  0
      g   0  0  0  0
      e   0  1  1  1
      e   0  1  1  2
      k   0  1  2  2

2️⃣ Backtracking decisions (start at `i=4`, `j=3`):
   - Cell (4,3): s1[3]='k', s2[2]='e' → mismatch.
        Neighbors: up dp[3][3]=2, left dp[4][2]=2. Tie → follow rule “move up”.
        Append 'k'. chars = ["k"]; move to (3,3).
   - Cell (3,3): s1[2]='e', s2[2]='e' → match.
        Append 'e'. chars = ["k","e"]; move diagonally to (2,2).
   - Cell (2,2): s1[1]='e', s2[1]='k' → mismatch.
        Up dp[1][2]=0, left dp[2][1]=1 → left larger → include s2[j-1]='k'.
        chars = ["k","e","k"]; move to (2,1).
   - Cell (2,1): s1[1]='e', s2[0]='e' → match.
        Append 'e'. chars = ["k","e","k","e"]; move to (1,0).
   - Now `j=0`, exit main loop. Remaining prefix in s1 (indices ≥1) must be added:
        append s1[0]='g'. chars = ["k","e","k","e","g"].

3️⃣ Reverse → "gekek". Length = 5, matching formula `|s1| + |s2| - LCS = 4 + 3 - 2`.
    - "geek" is a subsequence: take positions (1,2,3,5) of "gekek".
    - "eke" is a subsequence: take positions (2,3,4).

✅ Result: "gekek" is a shortest common supersequence.

──────────────────────────────────────────────────────────────────────────────

📊 Visual Intuition:
- Think of LCS characters as “anchor points”. We weave both strings together by
  walking along the DP table:
    • Diagonal move ↔ same character in both strings → include once.
    • Up move ↔ extra char from s1 that must appear.
    • Left move ↔ extra char from s2.
- Reversing at the end restores left-to-right order.

✅ Edge Cases:
- Either string empty → SCS = the other string (length equals non-empty length).
- Identical strings → SCS = original string (no extra chars).
- No common characters → SCS length = m + n (concatenate both).
- Highly repetitive strings → tie-breaking rule (>=) yields deterministic output,
  but other valid SCS strings of same length exist.

🪛 Debugging Tips:
- If result length ≠ m + n - dp[m][n], revisit backtracking.
- Print `(i,j)` decisions to ensure moves agree with dp comparisons.
- For mistaken characters, ensure you reverse the collected array exactly once.

🧪 Testing Strategy:
- Symmetric cases: (`s1=s2`, swapped inputs).
- Completely different alphabets (forces concatenation).
- One string as subsequence of other (SCS should equal longer string).
- Large strings with random overlaps to validate performance.

💡 Interview Talking Points:
- Start from LCS formula to justify minimal length.
- Explain table backtracking with a tiny example (3–4 letters).
- Mention that SCS is dual to “minimum insertions deletions” problem:
  SCS length = m + n - LCS, operations = (m - LCS) deletions + (n - LCS) insertions.
- Highlight applications (diff tools, alignment, scheduling).
*/