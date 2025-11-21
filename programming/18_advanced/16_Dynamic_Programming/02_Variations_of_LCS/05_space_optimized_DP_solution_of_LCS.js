/* Problem: ✅✅✅✅ LCS — Space Optimized DP (Two-Row/One-Row) ✅✅✅✅

Goal: compute the length of the Longest Common Subsequence (LCS) of `s1` and `s2`
without storing the entire `m × n` DP table. Traditional tabulation needs O(m·n)
memory; here we shrink it to O(min(m, n)) by keeping only the previous and
current row (a rolling array).

🎯 Why this matters:
- Handles very long strings where storing full DP table would exhaust memory.
- Demonstrates a standard DP optimization pattern (state compression).
- Foundation for interview questions that ask you to improve space complexity.

🧠 Core Idea:
- The LCS recurrence only needs values from the previous row (`dp[i-1][*]`) and
  the current row (`dp[i][*]` up to j). Therefore, two 1D arrays suffice:

    if s1[i-1] === s2[j-1] → curr[j] = 1 + prev[j-1]
    else                    → curr[j] = max(prev[j], curr[j-1])

- After finishing row `i`, swap `prev` and `curr`, resetting `curr` for reuse.
- To minimize space, iterate on the shorter string (`s2`) for the inner loop so
  arrays are length `|s2| + 1`.

📈 Complexity:
// ✅ Time  : O(m · n) (same amount of work as full table)
// ✅ Space : O(min(m, n)) (only two rows or even one rolling array)

⚠️ Limitation: This version returns only the LCS length. Reconstructing the
actual subsequence requires more information than two rows can provide.
*/

function lcsSpaceOptimized(s1, s2){
    // Ensure s2 is shorter to minimize inner array size
    if(s1.length < s2.length){
        return lcsSpaceOptimized(s2, s1); // swap to make s1 the longer string
    }

    const m = s1.length;
    const n = s2.length;
    if(n === 0) return 0;

    let prev = new Array(n + 1).fill(0); // ✅ n+1
    let curr = new Array(n + 1).fill(0); // ✅ n+1

    for(let i = 1; i <= m; i++){
        for(let j = 1; j <= n; j++){
            if(s1[i - 1] === s2[j - 1]){
                curr[j] = 1 + prev[j - 1]; 
            }else{
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        // roll rows (swap the previous and current rows)
        [prev, curr] = [curr, prev];
    }

    return prev[n]; // ✅
}

/* ====================
 * Example test cases
 * ==================== */

function demo(){
    console.log(lcsSpaceOptimized("AXYZ", "BAZ"));           // 2
    console.log(lcsSpaceOptimized("ABCBDAB", "BDCAB"));      // 4
    console.log(lcsSpaceOptimized("XMJYAUZ", "MZJAWXU"));    // 4
    console.log(lcsSpaceOptimized("", "ABCDE"));             // 0
    console.log(lcsSpaceOptimized("ABC", "DEF"));            // 0
}

demo();

/*🎯 STEP-BY-STEP WALKTHROUGH (s1 = "AXYZ", s2 = "BAZ")

We ensure `s2` is the shorter string → `s2 = "BAZ"` (length 3). Arrays have size 4.

Initialization:
prev = [0, 0, 0, 0]   // indices correspond to "", B, A, Z
curr = [0, 0, 0, 0]

Iterate i from 1..|s1|:

i = 1 (char 'A'):
  j = 1 (B): 'A'≠'B' → curr[1] = max(prev[1]=0, curr[0]=0) = 0
  j = 2 (A): 'A'=='A' → curr[2] = 1 + prev[1] = 1
  j = 3 (Z): mismatch → curr[3] = max(prev[3]=0, curr[2]=1) = 1
  After row: curr = [0, 0, 1, 1]; swap → prev=[0,0,1,1], curr reset to [0,0,0,0]

i = 2 (char 'X'):
  j = 1: mismatch → curr[1] = max(prev[1]=0, curr[0]=0) = 0
  j = 2: mismatch → curr[2] = max(prev[2]=1, curr[1]=0) = 1
  j = 3: mismatch → curr[3] = max(prev[3]=1, curr[2]=1) = 1
  Swap → prev=[0,0,1,1], curr reset.

i = 3 (char 'Y'):
  j = 1: mismatch → curr[1] = max(prev[1]=0, curr[0]=0) = 0
  j = 2: mismatch → curr[2] = max(prev[2]=1, curr[1]=0) = 1
  j = 3: mismatch → curr[3] = max(prev[3]=1, curr[2]=1) = 1
  Swap → prev remains [0,0,1,1].

i = 4 (char 'Z'):
  j = 1: mismatch → 0
  j = 2: mismatch → 1
  j = 3: 'Z'=='Z' → curr[3] = 1 + prev[2] = 1 + 1 = 2
  Final prev (after swap) = [0, 0, 1, 2]

Answer = prev[3] = 2 → LCS length is 2 (subsequence "AZ").

✅ Observations:
- Only two arrays of size `|s2|+1` are maintained throughout.
- Curr row always reads values already computed in same row (curr[j-1]) or from
  the previous row (prev[j], prev[j-1]).
- Swapping `prev` and `curr` after each outer iteration effectively “slides” the window.
- Because we never keep older rows, we cannot reconstruct the actual subsequence from this version.

✅ Edge Cases:
- Either string empty → immediate return 0 (since inner loop size becomes zero).
- Strings of drastically different lengths → algorithm automatically iterates on the shorter one inside.
- Repeated characters everywhere (e.g., `"aaaa..."`) → still works; length equals shorter string.
- Completely distinct alphabets → arrays stay zero and result is 0.

🧠 Debugging Tips:
- Print `prev` each iteration to ensure values progress correctly.
- Ensure curr is reset (or overwritten) before processing next row.
- Watch for off-by-one: arrays sized `n+1`, indices start at 1 for characters.

🧪 Testing Ideas:
- Very long strings where full DP would be memory-heavy.
- Cases where `s2` is empty (should immediately return 0).
- Strings with many common characters vs none.

💡 Interview Notes:
- Always mention why only two rows are enough (dependency on immediate previous row).
- Explain the trade-off: lose reconstruction ability in exchange for memory savings.
- Highlight the technique as a general DP optimization pattern (also used in knapsack, edit distance, etc.).
*/
