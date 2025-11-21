/* Problem: ✅✅✅✅ Minimum Insertions & Deletions to Convert s1 → s2 ✅✅✅✅

We want the minimum number of character operations to transform one string into
another using only:
- Deletions from `s1`.
- Insertions into `s1` (equivalently, insertions of characters from `s2`).

🔥 Key Insight: The longest common subsequence (LCS) is the portion already
aligned between both strings. Any character in `s1` that is **not** part of the
LCS must be deleted. Any character required by `s2` but missing from the LCS must
be inserted.

Formulas derived from this logic:
- `deletions = |s1| - LCS(s1, s2)` → characters to drop from `s1`.
- `insertions = |s2| - LCS(s1, s2)` → characters to add so that remaining subsequence grows into `s2`.

🧠 Why LCS works here:
- LCS preserves relative order across both strings.
- By keeping only the LCS characters, we minimize edits.
- Everything outside the LCS must be deleted or inserted to match the target.

🧩 Step-by-Step Plan:
1️⃣ Compute LCS length using classic tabulation (`m+1 × n+1` DP table).
2️⃣ Delete extra characters from `s1` → count = `m - LCS`.
3️⃣ Insert missing characters from `s2` → count = `n - LCS`.
4️⃣ Return both counts.

📈 Complexity:
// ✅ TC = O(m · n) — building the DP table once.
// ✅ SC = O(m · n) — full table (expressed for clarity; can be optimized to O(min(m, n))).
*/

function minInsertionsDeletions(s1, s2){
    const m = s1.length;
    const n = s2.length;

    const lcsLen = lcsLength(s1, s2);
    const deletions = m - lcsLen;
    const insertions = n - lcsLen;

    return { insertions, deletions };
}

// Bottom-up LCS length helper (same recurrence as previous files)
function lcsLength(s1, s2){
    const m = s1.length;
    const n = s2.length;
    const dp = new Array(m + 1);
    for(let i = 0; i <= m; i++) dp[i] = new Array(n + 1).fill(0);

    for(let i = 1; i <= m; i++){
        for(let j = 1; j <= n; j++){
            if(s1[i - 1] === s2[j - 1]){
                dp[i][j] = 1 + dp[i - 1][j - 1];
            }else{
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}

/* ====================
 * Example test cases
 * ==================== */

function demo(){
    console.log(minInsertionsDeletions("heap", "pea"));        // { insertions:1, deletions:2 }
    console.log(minInsertionsDeletions("geeksforgeeks", "geeks")); // { insertions:0, deletions:8 }
    console.log(minInsertionsDeletions("abcdef", "fbdamn"));    // sample arbitrary
    console.log(minInsertionsDeletions("", "abc"));            // { insertions:3, deletions:0 }
    console.log(minInsertionsDeletions("abc", ""));            // { insertions:0, deletions:3 }
}

demo();

/*🎯 CRYSTAL-CLEAR WALKTHROUGH: s1 = "heap", s2 = "pea"

1️⃣ Build LCS table (same as standard LCS). Final LCS length = 2 for subsequence "ea".
    ✅ This means we should keep the characters 'e' and 'a' (in order) from `s1`.
2️⃣ Compute operations:
    - Deletions = |"heap"| - 2 = 4 - 2 = 2 → remove any characters of `s1` that are not part of "ea".
    - Insertions = |"pea"| - 2 = 3 - 2 = 1 → add the missing character from `s2` that is not covered by the LCS.
3️⃣ Step-by-step edit sequence (not unique, but one optimal plan):
    - Start: "heap"
    - Delete 'h' (not in LCS) → "eap"
    - Delete last 'p' (not in LCS) → "ea"
    - Insert 'p' at the front (missing from `s2`) → "pea"
   Total operations = 2 deletions + 1 insertion = 3.

🧠 Why this is minimal: keeping only the LCS characters guarantees the smallest
number of edits; any alternative still requires discarding two characters from
`heap` and inserting one 'p' to match the order in `pea`.

🎯 SECOND WALKTHROUGH: s1 = "geeksforgeeks", s2 = "geeks"
- LCS = "geeks" (length 5).
- Deletions = 13 - 5 = 8 (remove all non-LCS letters from `s1`).
- Insertions = 5 - 5 = 0 → already present.
- Steps: strip out "for" and the extra "geeks" suffix.

📊 VISUALIZATION TIP:
Think of LCS as pins that hold both strings together. Anything hanging off those
pins on `s1` is chopped off; gaps on `s2` are filled by insertion.

✅ EDGE CASES:
- Either string empty → all characters in the other string must be inserted or deleted.
- Identical strings → LCS equals full length → 0 insertions and deletions.
- No common characters → LCS = 0 → delete all of `s1`, insert all of `s2`.

🔄 RELATION TO EDIT DISTANCE:
When operations allowed are insertions and deletions only, the edit distance
simplifies to `(m - LCS) + (n - LCS)`. Substitutions are treated as delete + insert.

🧪 TESTING STRATEGY:
- Balanced vs unbalanced lengths.
- Strings with repeated characters.
- Completely different strings.
- Empty/one-letter strings.

🪛 DEBUGGING TIPS:
- Print LCS table to ensure correct diagonal/neighbor propagation.
- Verify `m - lcsLen` and `n - lcsLen` stay non-negative.
- Confirm the helper returns same LCS length as previous implementations.

💡 INTERVIEW TIPS:
- Start from LCS concept; derive formulas interactively.
- Show small example to justify why counts align with minimal edits.
- Mention link to edit distance and how substitions can be modeled.
*/
