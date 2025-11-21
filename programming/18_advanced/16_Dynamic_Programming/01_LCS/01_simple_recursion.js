/* Problem: ✅✅✅✅ Longest Common Subsequence (LCS) — Naive Recursion ✅✅✅✅

Given two strings `s1` and `s2`, return the length of their Longest Common
Subsequence. A subsequence keeps relative order but may skip characters.

🎯 Why this matters:
- Measures similarity between sequences (version control diffs, DNA alignment).
- Serves as foundation for edit distance, shortest common supersequence, etc.
- Understanding recursion here sets the stage for memoization/tabulation DP.

🧠 Core Idea:
Explore both choices at every step:
- If last characters match, count 1 + LCS of remaining prefixes.
- Otherwise, try dropping one character from either string and take the best.

🧩 Step-by-Step Flow:
1️⃣ Base Case: if any string length reaches 0, LCS length is 0.
2️⃣ Match Case: `s1[m-1] === s2[n-1]` → add 1 and recurse on `(m-1, n-1)`.
3️⃣ Mismatch Case: recurse on `(m-1, n)` and `(m, n-1)`; pick larger result.
4️⃣ Return the computed value up the recursion stack.

📈 Time vs Space:
// ✅ TC = O(2^{min(m, n)}) — worst case branches into two calls whenever chars differ.
// ✅ SC = O(m + n) — maximum depth from reducing indices one at a time.

⚠️ Limitation: Massive overlapping subproblems cause exponential blowup, which is
why we switch to memoization in the next file.
*/

function lcs(s1, s2, m=s1.length, n=s2.length){
    if(m===0 || n===0){
        return 0
    }
    
    if(s1[m-1] === s2[n-1]){
        // Last characters match → include 1 and move diagonally
        return 1+lcs(s1, s2, m-1, n-1)
    }else{
        // Last characters differ → explore both possibilities
        return Math.max(lcs(s1, s2, m-1, n), lcs(s1, s2, m, n-1))
    }
}

console.log(lcs("AXYZ", "BAZ")) // 2 --> "AZ"

/*🎯 DETAILED WALKTHROUGH (s1 = "AXYZ", s2 = "BAZ"):

                                      lcs(AXYZ, BAZ)
                                   /                    \
                    lcs(AXY, BAZ)                        lcs(AXYZ, BA)
                      /         \                           /         \
            lcs(AX, BAZ)      lcs(AXY, BA)        lcs(AXY, BA)      lcs(AXYZ, B)
            ... repeated subtrees ...             ... repeats ...   ... repeats ...

Key paths:
- Match at 'Z': contributes 1 + lcs("AXY", "BA").
- Eventually matches 'A' giving another +1. Total = 2.
- Calls like lcs("AX", "B") appear multiple times, motivating memoization.

🧭 Visual Summary of Decisions:
- Matching characters: diagonal move → reduce both strings.
- Non-matching characters: horizontal/vertical move → drop one character.
- Each recursive level represents picking optimal future path.

✅ Edge Cases:
- One or both strings empty → immediately hit base case (returns 0).
- Identical strings → recursion descends diagonally, returning full length.
- Completely disjoint strings → explores entire tree, returns 0.

💡 Interview Tips:
- Start with definition of subsequence vs substring.
- Clearly state recurrence; derive two branches.
- Highlight exponential complexity and segue into DP optimizations.
*/