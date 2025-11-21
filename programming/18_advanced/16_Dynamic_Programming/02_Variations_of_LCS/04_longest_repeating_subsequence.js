/* Problem: ✅✅✅✅ Longest Repeating Subsequence (LRS) ✅✅✅✅

Given a string `s`, find the longest subsequence that appears at least twice
without reusing the same indices (i.e., the two occurrences must come from
different positions). Unlike substrings, subsequences can skip characters.

🎯 Why it matters:
- Used in DNA/protein motif discovery (repeated patterns with gaps).
- Helps reason about compression/deduplication of data.
- Classic reduction to LCS that checks if you can spot repeated structures.

🧠 Core Idea (How/Why):
- Take LCS of the string with itself, but forbid matching the same index:
      dp[i][j] = 1 + dp[i-1][j-1], if s[i-1] == s[j-1] and i != j
      otherwise max of top/left.
- This ensures we count only repeated characters that occur at different positions.
- Backtracking the same table yields one valid LRS string.

📈 Complexity:
// ✅ TC = O(n²)
// ✅ SC = O(n²)
*/

function longestRepeatingSubsequence(s){
    const n = s.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    // Here take s1 & s2 are the same string
    for(let i = 1; i <= n; i++){
        for(let j = 1; j <= n; j++){
            if(s[i - 1] === s[j - 1] && i !== j){ // ✅ If the characters match and the indices are different
                dp[i][j] = 1 + dp[i - 1][j - 1];
            }else{ // If the characters do not match or the indices are the same
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    const lrs = buildLRS(s, dp);
    return { length: lrs.length, lrs };
}

function buildLRS(s, dp){
    let i = s.length;
    let j = s.length;
    const chars = [];

    while(i > 0 && j > 0){
        if(s[i - 1] === s[j - 1] && i !== j){ // ✅ If the characters match and the indices are different
            chars.push(s[i - 1]);
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
    console.log(longestRepeatingSubsequence("AABEBCDD"));   // { length: 3, lrs: "ABD" or similar }
    console.log(longestRepeatingSubsequence("axxzxy"));      // { length: 2, lrs: "xx" or "xy" }
    console.log(longestRepeatingSubsequence("aab"));        // { length: 1, lrs: "a" }
    console.log(longestRepeatingSubsequence("abc"));        // { length: 0, lrs: "" }
    console.log(longestRepeatingSubsequence("aaaa"));       // { length: 3, lrs: "aaa" }
}

demo();

/*🎯 WALKTHROUGH (s = "AABEBCDD")

1️⃣ Build DP table (LCS against itself with i ≠ j constraint). Final LRS length = 3.
   Snapshot of bottom-right corner (indices include empty row/col):
       "" A A B E B C D D
   ""  0 0 0 0 0 0 0 0 0
   A   0 0 1 1 1 1 1 1 1
   A   0 1 1 1 1 1 1 1 1
   B   0 1 1 1 2 2 2 2 2
   E   0 1 1 2 2 3 3 3 3
   B   0 1 1 2 3 3 3 3 3
   C   0 1 1 2 3 3 4 4 4
   D   0 1 1 2 3 3 4 4 5
   D   0 1 1 2 3 3 4 5 5

2️⃣ Backtrack step-by-step (indices start at i=8, j=8; string is 1-indexed in DP):
   - Step 1 (8,8): s[7]='D', s[7]='D' but i==j → not allowed. Compare neighbors:
         up = dp[7][8]=4, left = dp[8][7]=4. Tie → follow rule “move up”.
         Move to (7,8). chars = [].
   - Step 2 (7,8): s[6]='D', s[7]='D' (indices differ!) → match allowed.
         Append 'D'. Move diagonally to (6,7). chars = ['D'].
   - Step 3 (6,7): s[5]='C', s[6]='D' → mismatch.
         up dp[5][7]=3 vs left dp[6][6]=4 → move left to (6,6).
   - Step 4 (6,6): s[5]='C', s[5]='C' but i==j → cannot take.
         up dp[5][6]=3 vs left dp[6][5]=3 → move up to (5,6).
   - Step 5 (5,6): s[4]='B', s[5]='C' → mismatch.
         up dp[4][6]=3 vs left dp[5][5]=3 → move up to (4,6).
   - Step 6 (4,6): s[3]='E', s[5]='C' → mismatch.
         up dp[3][6]=2 vs left dp[4][5]=3 → move left to (4,5).
   - Step 7 (4,5): s[3]='E', s[4]='B' → mismatch.
         up dp[3][5]=2 vs left dp[4][4]=2 → move up to (3,5).
   - Step 8 (3,5): s[2]='B', s[4]='B' and i≠j → match!
         Append 'B'. Move diagonally to (2,4). chars = ['D','B'].
   - Step 9 (2,4): s[1]='A', s[3]='E' → mismatch.
         up dp[1][4]=1 vs left dp[2][3]=1 → move up to (1,4).
   - Step10 (1,4): s[0]='A', s[3]='E' → mismatch.
         up dp[0][4]=0 vs left dp[1][3]=1 → move left to (1,3).
   - Step11 (1,3): s[0]='A', s[2]='B' → mismatch.
         up dp[0][3]=0 vs left dp[1][2]=1 → move left to (1,2).
   - Step12 (1,2): s[0]='A', s[1]='A' and i≠j → match!
         Append 'A'. Move diagonally to (0,1). chars = ['D','B','A'].
   - Stop because i == 0. Reverse chars → "ABD".

Result: length 3, repeating subsequence "ABD". One occurrence uses indices (1,3,5),
the other uses (2,4,8) — entirely different positions, satisfying the condition.

🧠 Intuition:
- By forcing `i !== j`, we prevent the trivial match of a character with itself.
- Diagonal moves correspond to picking characters for both occurrences. Because
  both pointers walk the same string, each diagonal move picks two different indices.

✅ Edge Cases:
- All unique characters → LRS length 0.
- All same characters (e.g., "aaaa") → LRS length = n-1 (you can repeat any char except reusing same index).
- Empty string → length 0, subsequence "".

🪛 Debugging Tips:
- Verify `i !== j` check exists in both DP fill and backtracking; forgetting it
  turns the problem back into LCS with itself (which equals |s|).
- Track dp table for small strings to ensure diagonals only used when allowed.

🧪 Testing Suggestions:
- Strings with overlapping repeats (e.g., "axxzxy").
- Cases where multiple LRS answers exist; ensure one valid string returned.
- Very short strings (length 1 or 2) to confirm base behavior.

💡 Interview Notes:
- Start with definition of LRS and connect it to LCS reduction.
- Mention DP table purpose, constraint i ≠ j, and complexity.
- Discuss practical uses (pattern detection, compression) and how to adapt to count-only vs reconstruction.
*/
