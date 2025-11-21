/* Problem: ✅✅✅✅ Diff Utility using LCS ✅✅✅✅

Given two sequences (strings, arrays of lines, etc.) `s1` (original) and `s2`
(edited), produce a human-readable edit script similar to Unix `diff`.

Output format per line:
- `"  X"` → unchanged item (belongs to LCS)
- `"- X"` → delete from original
- `"+ X"` → insert from edited version

🎯 Why this matters:
- Core of version-control diffs (Git, SVN) and merge tools.
- Demonstrates how LCS reveals the “common core” and what changed.
- Useful for explaining edit scripts, patch generation, and text comparison.

🧠 Core Idea:
1️⃣ Build LCS DP table for `s1` and `s2`.
2️⃣ Backtrack from `(m, n)`:
   - Match → emit `"  value"`, move diagonally.
   - If `dp[i-1][j] >= dp[i][j-1]` → deletion (move up).
   - Else → insertion (move left).
3️⃣ After loop, flush remaining characters as deletions or insertions.
4️⃣ Reverse collected script to restore forward order.

📈 Complexity:
// ✅ Time  : O(m · n)
// ✅ Space : O(m · n) for the DP table.

💡 Note: For line-based diffs, treat each line as an element in the sequences
before running this algorithm.
*/

function diffUtility(s1, s2){
    const dp = buildLcsTable(s1, s2);
    return buildDiff(s1, s2, dp);
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

function buildDiff(a, b, dp){
    let i = a.length;
    let j = b.length;
    const edits = [];

    while(i > 0 && j > 0){
        if(a[i - 1] === b[j - 1]){
            edits.push(`  ${a[i - 1]}`); // Unchanged (belongs to LCS)
            i--; j--;
        }else if(dp[i - 1][j] >= dp[i][j - 1]){
            edits.push(`- ${a[i - 1]}`); // Deletion from s1 (Means previously it was there in initail-file(s1) but now it is NOT there in the edited-file(s2))
            i--;
        }else{
            edits.push(`+ ${b[j - 1]}`); // Insertion from s2 (Means previously it was NOT there in initail-file(s1) but now it is there in the edited-file(s2))
            j--;
        }
    }

    // If there are remaining characters in s1, then we need to delete them
    while(i > 0){
        edits.push(`- ${a[i - 1]}`); // Deletion from s1 (Means previously it was there in initail-file(s1) but now it is NOT there in the edited-file(s2))
        i--;
    }
    // If there are remaining characters in s2, then we need to insert them
    while(j > 0){
        edits.push(`+ ${b[j - 1]}`); // Insertion from s2 (Means previously it was NOT there in initail-file(s1) but now it is there in the edited-file(s2))
        j--;
    }

    return edits.reverse(); // Reverse the edits to get the correct order
}

/* ====================
 * Example test cases
 * ==================== */

function demo(){
    console.log(diffUtility("ABCDF", "ABZCF").join("\n"));
    console.log("---");
    console.log(diffUtility("XMJYAUZ", "MZJAWXU").join("\n"));
    console.log("---");
    console.log(diffUtility("hello", "yellow").join("\n"));
}

demo();

/*🎯 WALKTHROUGH (s1 = "ABCDF", s2 = "ABZCF")

1️⃣ Build DP table (rows = `s1`, columns = `s2`):
         ""  A  B  Z  C  F
      ""  0  0  0  0  0  0
      A   0  1  1  1  1  1
      B   0  1  2  2  2  2
      C   0  1  2  2  3  3
      D   0  1  2  2  3  3
      F   0  1  2  2  3  4
   LCS = "ABCF" (length 4).

2️⃣ Backtracking (start i=5, j=5; indices 1-based in DP):
   - (5,5): `F` vs `F` → match → push "  F", move to (4,4).
   - (4,4): `D` vs `C` → mismatch.
        dp[3][4]=3 > dp[4][3]=2 → delete from s1 → push "- D", move to (3,4).
   - (3,4): `C` vs `C` → match → push "  C", move to (2,3).
   - (2,3): `B` vs `Z` → mismatch.
        dp[2][2]=2 > dp[1][3]=1 → insert from s2 → push "+ Z", move to (2,2).
   - (2,2): `B` vs `B` → match → push "  B", move to (1,1).
   - (1,1): `A` vs `A` → match → push "  A", stop.
   - Reverse stack → script order:
        "  A", "  B", "+ Z", "  C", "- D", "  F".
     Read aloud: keep A, keep B, insert Z, keep C, delete D, keep F.

✅ Observations:
- Lines prefixed with two spaces are exactly the LCS (unchanged content).
- Moving up in DP emits deletions; moving left emits insertions.
- Reversing the collected edits restores chronological order (top to bottom).

🧠 Debugging Tips:
- Print `(i, j)` and chosen direction to ensure moves align with DP values.
- If the script looks backwards, confirm you call `reverse()` before returning.
- Tie-breaking (`dp[i-1][j] === dp[i][j-1]`) should be deterministic for stable diffs.

🧪 Testing Ideas:
- Identical inputs → expect only "  " lines.
- Completely different strings → expect all deletions followed by all insertions.
- Line-based diffs: split large strings by `\n`, feed arrays, inspect output.

💡 Interview Notes:
- Explain how LCS isolates the unchanged “spine” while everything else becomes insert/delete operations.
- Mention that production diff tools (e.g., Myers) optimize runtime but rely on the same conceptual backbone.
- Discuss extensions like weighting operations or handling substitutions.
*/