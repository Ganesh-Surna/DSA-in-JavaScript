/* Problem: ✅✅✅✅ Longest Common Subsequence (LCS) — Top-Down Dynamic Programming ✅✅✅✅

We eliminate redundant recursion by memoizing subproblems. Given strings `s1`
and `s2`, compute the length of their longest common subsequence.

🎯 Why Memoization?
- The naive recursion revisits the same `(m, n)` states repeatedly.
- Storing results for each prefix pair avoids exponential blowup.

🧠 Core Idea:
- Treat `(m, n)` — lengths of prefixes considered — as our state.
- Cache `memo[m][n]` the first time we compute it.
- Reuse cached value on subsequent visits instead of recursing again.

🧩 Step-by-Step Flow:
1️⃣ Initialize a 2D memo table of size `(m+1) × (n+1)` with `null`.
    - Extra row/column represent empty prefixes; makes base cases natural.
2️⃣ Recursively evaluate `lcs(m, n)`:
    - If memoized value exists, return it.
    - If `m === 0 || n === 0`, store and return 0.
    - If characters match, store `1 + lcs(m-1, n-1)`.
    - Otherwise, store `max(lcs(m-1, n), lcs(m, n-1))`.
3️⃣ Final answer is `memo[m][n]`.

🧾 Why (m+1) × (n+1)?
- `memo[i][j]` tracks LCS length for prefixes `s1[0..i-1]` and `s2[0..j-1]`.
- Row 0 ↔ empty prefix of `s1`; column 0 ↔ empty prefix of `s2`.
- Using extra border allows direct base cases without negative indices.
  (For example, when `m=0`, we simply return `memo[0][n] = 0`).

📈 Time vs Space:
// ✅ TC = O(m · n) — each state computed once.
// ✅ SC = O(m · n) for memo table + O(m + n) recursion stack depth.

📊 Complexity Gain: from exponential to polynomial by caching results.
*/

function longestCommonSubsequence(s1, s2){
    let m = s1.length
    let n = s2.length
    // 1. Create 2D memo array - as 2 parameters(m & n) are varying
    let memo = new Array(m+1)
    for(let i=0; i<m+1; i++){
        memo[i] = new Array(n+1).fill(null)
    }
    
    return lcs(s1, s2, m, n)
    
    
    // LCS helper function
    function lcs(s1, s2, m=s1.length, n=s2.length){
        
        // 1. If memo[m][n] is already compute, use it
        if(memo[m][n] !== null){
            return memo[m][n]
        }
        
        if(m===0 || n===0){
            memo[m][n] = 0
        }else{
            if(s1[m-1]===s2[n-1]){
                memo[m][n] = 1 + lcs(s1, s2, m-1, n-1)
            }else{
                memo[m][n] = Math.max(lcs(s1, s2, m-1, n), lcs(s1, s2, m, n-1))
            }
        }
        
        return memo[m][n]
    }
}

console.log(longestCommonSubsequence("AXYZ", "BAZ")) // 2 --> "AZ"

/*🎯 DETAILED WALKTHROUGH (s1="AXYZ", s2="BAZ"):
State indices (m, n) correspond to lengths of prefixes considered.

Call stack snapshot:
- lcs(4,3) (checking "AXYZ" vs "BAZ")
  → matches 'Z' → 1 + lcs(3,2)
- lcs(3,2) ("AXY" vs "BA")
  → mismatch 'Y' vs 'A' → max(lcs(2,2), lcs(3,1))
- lcs(2,2) ("AX" vs "BA")
  → mismatch 'X' vs 'A' → max(lcs(1,2), lcs(2,1))
- On hitting base or previously computed states, memo returns cached value.

Memo table after complete run (rows: i=0..4, cols: j=0..3):
 j→   0 1 2 3
      "" B A Z
 i↓
0 ""  0 0 0 0
1 "A"  0 0 1 1
2 "AX" 0 0 1 1
3 "AXY"0 0 1 1
4 "AXYZ"0 0 1 2  ← result

Rows/columns 0 are the guard band handling empty prefixes.

🧭 Visual Benefit:
- Every unique `(m, n)` pair computed once, turning recursion tree into DAG.
- Memo table shows growth of LCS as prefixes expand.

✅ Edge Cases:
- Empty string on either side → returns 0 immediately.
- Identical strings → diagonal recursion with memo storing incremental matches.
- Disjoint strings → memo fills with 0s.

💡 Interview Tips:
- Start from recursive recurrence, then explain overlapping subproblems.
- Justify table sizing and base case handling.
- Discuss trade-offs: recursion stack vs iterative tabulation.
- Mention possibility of reconstructing actual subsequence via parent pointers.
*/