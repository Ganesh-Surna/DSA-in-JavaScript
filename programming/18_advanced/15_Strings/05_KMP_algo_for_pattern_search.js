/* Problem: ✅✅✅✅ KMP (Knuth–Morris–Pratt) Pattern Searching ✅✅✅✅

Given a text string `text` (length N) and a pattern string `pattern` (length M),
find all starting indices where the pattern occurs within the text. KMP improves
upon the naive approach by avoiding redundant comparisons using the pre-computed
LPS (Longest Prefix Suffix) array. This guarantees linear-time matching even in
worst-case scenarios with repetitive patterns.

Key requirements:
- Return all 0-based indices where `pattern` is found in `text`.
- If the pattern never occurs, return `[-1]`.
- Efficient for large texts with repetitive content.
- Works with any character set (ASCII/Unicode).

Example 1:
Input: text = "ABABABABCABABDABACDABABCABAB", pattern = "ABABCABAB"
Output: [4, 19]
Explanation: Two matches; KMP avoids re-scanning prefixes on mismatch.

Example 2:
Input: text = "AAAAA", pattern = "AAA"
Output: [0, 1, 2]
Explanation: Multiple overlapping occurrences handled efficiently.

Example 3:
Input: text = "HELLOWORLD", pattern = "WORLD"
Output: [5]

Constraints:
- 0 ≤ M ≤ N ≤ 10^6 (KMP still O(N + M))
- Pattern length 0 (empty pattern) → return every index (implementation choice below returns [])
- Works for binary data or mixed alphabets

Expected Complexities:
Time Complexity: O(N + M)
Auxiliary Space: O(M) for LPS array (re-usable across searches)
*/

// ✅ TC = O(N + M)
// ✅ SC = O(M)
// Uses precomputed LPS array to skip re-checking characters after mismatch.
function kmpPatternSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;

    if (m === 0) {
        return []; // Convention: empty pattern returns empty match list (can be adapted)
    }
    if (n === 0 || m > n) {
        return [-1];
    }

    const lps = new Array(m).fill(0);
    constructLPS(pattern, lps); // Preprocess pattern

    const result = [];          // Store starting indices of matches
    let i = 0;                  // Index into text
    let j = 0;                  // Index into pattern

    while (i < n) {
        if (text[i] === pattern[j]) {
            // Case 1: Characters match → move both pointers
            i += 1;
            j += 1;

            if (j === m) {
                // Full pattern matched ending at i-1 → Note down start index (i-j or i-m)
                result.push(i - j);
                // Continue searching for next match by using previous border
                j = lps[j - 1]; // ✅
            }
        } else {
            // Case 2: Characters mismatch
            if (j === 0) {
                // No prefix matched yet → advance text pointer
                i += 1;
            } else {
                // Some prefix matched → fallback to longest proper prefix that is also suffix
                j = lps[j - 1]; // ✅
                // Note: i is NOT incremented here (re-use prior comparisons)
            }
        }
    }

    return result.length ? result : [-1];
}


// Helper function copied here for standalone usage (matches documentation in `04_construct_LPS_by_KMP_algo.js`).
function constructLPS(pattern, lps) {
    const m = pattern.length;

    if (m === 0) {
        return lps; // Empty pattern → nothing to compute
    }

    lps[0] = 0;                // Base case
    let len = 0;               // Length of current longest prefix-suffix
    let i = 1;                 // Start from second character

    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len += 1;
            lps[i] = len; // ✅ 
            i += 1;
        } else {
            if (len === 0) {
                lps[i] = 0; // ✅ lps[i] = 0 when len = 0
                i += 1;
            } else {
                len = lps[len - 1];
            }
        }
    }

    return lps;
}

// Quick tests / usage examples
console.log("Test 1 (two matches):", kmpPatternSearch("ABABABABCABABDABACDABABCABAB", "ABABCABAB")); // [4, 19]
console.log("Test 2 (overlap):", kmpPatternSearch("AAAAA", "AAA"));                                    // [0, 1, 2]
console.log("Test 3 (single match):", kmpPatternSearch("HELLOWORLD", "WORLD"));                         // [5]
console.log("Test 4 (no match):", kmpPatternSearch("ABCDEFG", "HIJ"));                                   // [-1]
console.log("Test 5 (pattern == text):", kmpPatternSearch("PATTERN", "PATTERN"));                        // [0]
console.log("Test 6 (mixed chars):", kmpPatternSearch("abcXYZabcXYZ", "abcXYZ"));                       // [0, 6]
console.log("Test 7 (edge case pattern longer):", kmpPatternSearch("SHORT", "LONGER"));                  // [-1]
console.log("Test 8 (empty pattern):", kmpPatternSearch("TEXT", ""));                                    // []

/*🎯 CORE IDEA:
- Build LPS array for pattern (longest prefix that is also suffix for each prefix).
- While scanning the text, keep track of pattern index `j`.
- On mismatch, use `lps[j-1]` to determine how much of the pattern can still match.
- Avoid re-checking characters already known to match → linear time.
*/

/*🎯 STEP-BY-STEP FLOW (Search Phase):
1️⃣ Preprocess pattern → compute `lps` array in O(M).
2️⃣ Initialize `i = 0`, `j = 0`.
3️⃣ While `i < n`:
   - If characters match → increment both `i` and `j`.
   - If mismatch and `j > 0` → set `j = lps[j-1]` (fallback in pattern).
   - If mismatch and `j == 0` → increment `i` (move to next text character).
4️⃣ When `j === m`, record match at `i - m` and reset `j = lps[m-1]` to continue overlapping matches.
*/

/*🎯 DETAILED WALKTHROUGH (Example 1):
text    = ABABABABCABABDABACDABABCABAB
pattern = ABABCABAB
lps     = [0,0,1,2,0,1,2,3,4]

- Start with i=0, j=0
- Characters matched until mismatch at i=4 (text[4]=B, pattern[4]=C) with j=4 → fallback j=lps[3]=2 → continue without moving i
- Eventually j reaches 9 (full match) when i=13 → record index 4 → set j=lps[8]=4 to search for overlapped matches
- Continue scanning; second match recorded at index 19.
*/

/*🎯 VISUALIZATION OF FALLBACK:
             i
text:   A B A B A B A B C ...
pattern:A B A B C A B A B
             j

- When mismatch occurs at `C` vs `B`, we fallback `j` to `lps[j-1]` → align longest
  border `ABAB` with text ending at current position without moving `i`.
*/

/*🎯 COMPLEXITY ANALYSIS:
- Preprocess: O(M) to build LPS.
- Search:     O(N) because every character advances `i` at most once; `j` moves back using LPS but total regressions are bounded by N.
- Total:      O(N + M)
- Space:      O(M) for LPS array.
*/

/*🎯 EDGE CASES:
- Empty pattern → [] (by design; alternative is to return all indices 0..N).
- Pattern longer than text → [-1].
- Text or pattern with Unicode characters → works due to direct comparisons.
- Highly repetitive text/pattern (e.g., "AAAA...") still linear time.
*/

/*🎯 ADVANTAGES VS NAIVE SEARCH:
- Naive worst-case O(N*M) (e.g., text="AAAAAAAAAB", pattern="AAAAB").
- KMP always O(N + M) by leveraging LPS reuse.
- No need for hashing (like Rabin-Karp) or additional data structures.

🎯 DISADVANTAGES:
- More complex to implement than naive search.
- Requires understanding of prefix-function logic.
*/

/*🎯 REAL-WORLD APPLICATIONS:
- DNA/protein sequence matching.
- Log analysis and intrusion detection (pattern scanning).
- Plagiarism detection.
- Text editors searching for substrings.
*/

/*🎯 RELATED PROBLEMS:
- Z-algorithm for pattern matching.
- Rabin-Karp (rolling hash based).
- Boyer-Moore (heuristic skipping from right to left).
- Automata-based pattern search.
*/

/*🎯 TESTING STRATEGY:
- Pattern occurs once vs multiple times.
- Overlapping matches (pattern shares prefix/suffix).
- No match scenario.
- Pattern equals text.
- Mixed-case and special characters.
- Very long repetitive strings (performance stress test).
*/

/*🎯 DEBUGGING TIPS:
- Print `(i, j)` and `result` to ensure pointers move as expected.
- Verify `j` never becomes negative and LPS indices exist.
- Ensure `result` is `[-1]` when no matches.
- Confirm `constructLPS` is correct (shared utility function).
*/

/*🎯 COMMON MISTAKES:
- Forgetting to push match before resetting `j`.
- Incrementing `i` after fallback (should not happen).
- Not handling empty pattern or pattern longer than text.
- Returning empty array instead of `[-1]` when no matches (depends on requirement).
*/

/*🎯 BEST PRACTICES:
- Keep `constructLPS` reusable and tested separately.
- Document match/mismatch branches clearly.
- Add helper `buildLPS` for readability (see separate file `04_construct_LPS_by_KMP_algo.js`).
- Use descriptive variable names and log intermediate states when debugging.
*/

/*🎯 INTERVIEW TIPS:
- Start by explaining the LPS concept and how it prevents re-checking characters.
- Walk through a small example showing fallback steps.
- Emphasize linear time performance and contrast with naive algorithm.
- Discuss variations (e.g., case-insensitive search, streaming data).
*/
