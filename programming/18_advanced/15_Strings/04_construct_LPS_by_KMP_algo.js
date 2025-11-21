/* Problem: ✅✅✅✅ Construct LPS (Longest Prefix Suffix) Array for KMP Pattern Matching ✅✅✅✅

Given a pattern string `pattern` (length M), build its LPS array where `lps[i]`
contains the length of the longest proper prefix of the substring `pattern[0..i]`
that is also a suffix of this substring. The LPS array is crucial for the Knuth-
Morris-Pratt (KMP) algorithm because it tells us how far to shift the pattern
without re-checking characters, ensuring linear-time pattern searching.

Key requirements:
- Accept any string (including repeated characters, lowercase/uppercase mix).
- LPS array must be in-place filled (passed-in array or newly created).
- Ensure `lps[0] = 0` always (no proper prefix/suffix for single char).
- Handle edge cases like empty string, single character, repeated substrings.

Example 1:
Input: pattern = "AAABAAAAC"
Output LPS: [0, 1, 2, 0, 1, 2, 3, 3, 0]
Explanation: `lps[6] = 3` because substring "AAABAAA" has longest proper prefix-suffix "AAA" of length 3.

Example 2:
Input: pattern = "ABCDE"
Output LPS: [0, 0, 0, 0, 0] (no repeating prefix/suffix).

Example 3:
Input: pattern = "AAAA"
Output LPS: [0, 1, 2, 3] (each prefix matches suffix due to repeated 'A').

Constraints:
- 0 ≤ M ≤ 10^5 (handle empty string consistently)
- Characters can be any ASCII/Unicode symbols
- Result must be computed in O(M) time and O(1) extra space (beyond `lps` array)

Expected Complexities:
Time Complexity: O(M) (single pass with backtracking on mismatch)
Auxiliary Space: O(1) besides the output array
*/

// ✅ TC = O(M)
// ✅ SC = O(1) extra (uses the provided `lps` array)
// KMP pre-processing: compute longest prefix that is also suffix for each index.
// NOTE: `lps` must be sized to `pattern.length` before calling.
function constructLPS(pattern, lps) {
    const m = pattern.length;

    if (m === 0) {
        return lps; // Empty pattern → nothing to compute
    }

    lps[0] = 0;                // First character always has LPS value 0
    let len = 0;               // Length of previous longest prefix-suffix
    let i = 1;                 // Start from second character

    // Process the pattern from left to right
    while (i < m) {
        if (pattern[i] === pattern[len]) {
            // Case 1: Characters match → extend current prefix-suffix
            len += 1;
            lps[i] = len;      // ✅ Record LPS value for position i
            i += 1;
        } else {
            // Case 2: Characters mismatch
            if (len === 0) {
                // Case 2a: No prefix to fallback → LPS value becomes 0
                lps[i] = 0; // ✅ lps[i] = 0 when len = 0
                i += 1;
            } else {
                // Case 2b: Fallback to shorter prefix-suffix and retry
                len = lps[len - 1];
                // i remains the same; attempt match with shorter prefix
            }
        }
    }

    return lps;
}

// Helper to build LPS without requiring caller to allocate the array.
function buildLPS(pattern) {
    const lps = new Array(pattern.length).fill(0);
    return constructLPS(pattern, lps);
}

// Test cases (console-based quick checks)
console.log("Test 1:", buildLPS("AAABAAAAC"));          // [0,1,2,0,1,2,3,3,0]
console.log("Test 2:", buildLPS("ABCDE"));              // [0,0,0,0,0]
console.log("Test 3:", buildLPS("AAAA"));               // [0,1,2,3]
console.log("Test 4:", buildLPS("ABABAC"));             // [0,0,1,2,3,0]
console.log("Test 5:", buildLPS("AABAACAABAA"));        // [0,1,0,1,2,0,1,2,3,4,5]
console.log("Test 6:", buildLPS("") );                  // []
console.log("Test 7:", buildLPS("A"));                   // [0]
console.log("Test 8:", buildLPS("ABCDABD"));            // [0,0,0,0,1,2,0]

/*🎯 CORE IDEA: The LPS array captures how much we can reuse previous matches.
It enables KMP to avoid re-checking characters by knowing the length of the
longest proper prefix that is also a suffix for each prefix of the pattern.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Set `lps[0] = 0` (no proper prefix/suffix for single char).
   - `len` tracks current prefix length that is also a suffix.
   - `i` iterates over pattern characters from index 1 onward.

2️⃣ MATCH CASE (pattern[i] === pattern[len]):
   - Increment `len` because prefix extended by one.
   - Set `lps[i] = len` and move to next index.

3️⃣ MISMATCH WITH len === 0:
   - No prefix to fallback to → `lps[i] = 0`.
   - Move to next index (`i += 1`).

4️⃣ MISMATCH WITH len > 0:
   - Reduce `len` to `lps[len-1]` (try shorter prefix that is still suffix).
   - Do NOT increment `i`; re-test with reduced prefix length.

5️⃣ LOOP UNTIL i == pattern length.

🧠 WHY IT WORKS:
- On mismatch we reuse knowledge from already-computed LPS values (`lps[len-1]`).
- This avoids re-evaluating characters from scratch, ensuring linear complexity.
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

Example: pattern = "AAABAAAAC"

Index: 0 1 2 3 4 5 6 7 8
Char : A A A B A A A A C

- i = 1, len = 0 → match (A == A) → len=1 → lps[1]=1
- i = 2, len = 1 → match (A == A) → len=2 → lps[2]=2
- i = 3, len = 2 → mismatch (B != A) → fallback len=lps[1]=1
  retry: pattern[3]=B, pattern[1]=A → mismatch → fallback len=lps[0]=0
  len=0 → lps[3]=0 → i=4
- i = 4, len = 0 → match (A == A) → len=1 → lps[4]=1
- i = 5, len = 1 → match (A == A) → len=2 → lps[5]=2
- i = 6, len = 2 → match (A == A) → len=3 → lps[6]=3
- i = 7, len = 3 → mismatch (A != B?) Wait: pattern[7]=A, pattern[3]=B (len=3) → mismatch
  fallback len = lps[2] = 2 → retry with len=2 (pattern[7]=A, pattern[2]=A) → match
  len=3 → lps[7]=3
- i = 8, len = 3 → mismatch (C vs B) → fallback len=lps[2]=2 → mismatch again → fallback len=lps[1]=1 → mismatch → fallback len=lps[0]=0 → len=0 → lps[8]=0
Result: [0,1,2,0,1,2,3,3,0]
*/

/*🎯 VISUALIZATION:
Consider pattern prefix with current `i` and `len` pointers:

pattern: [ ... prefix ... | unmatched suffix ]
          0           len   i

- When characters match, both pointers advance.
- When mismatch occurs, `len` jumps back to `lps[len-1]`, effectively shifting
the prefix window left to the longest previous candidate.
*/

/*🎯 COMPLEXITY ANALYSIS:
- Time: O(M). Each character is processed at most twice (once moving forward,
once due to fallback via `len` updates).
- Space: O(1) extra (in-place within provided `lps` array).

Comparison:
- Naive prefix computation would re-check characters resulting in O(M^2).
- LPS computation avoids redundant comparisons by leveraging previously recorded
prefix lengths.
*/

/*🎯 EDGE CASES:
- Empty pattern: return [] (no comparisons needed).
- Single character: [0].
- Repetitive characters (e.g., "AAAA...") produce increasing sequence.
- Patterns with alternating characters ("ABAB") produce oscillating LPS values.
*/

/*🎯 ADVANTAGES:
- Enables KMP pattern searching to run in O(N + M).
- Pure pre-processing step with no additional data structures.
- Handles overlapping prefixes and suffixes efficiently.

🎯 DISADVANTAGES:
- Requires understanding of prefix-suffix relationships.
- Harder to reason about initially compared to naive matching.
*/

/*🎯 REAL-WORLD APPLICATIONS:
- Fast substring search (DNA sequencing, malware detection).
- Plagiarism and text similarity checks.
- Log analysis for repeated patterns.
*/

/*🎯 RELATED PROBLEMS:
- Knuth-Morris-Pratt full pattern search.
- Z-array / prefix function in string algorithms.
- Periodicity detection in strings.
*/

/*🎯 TESTING STRATEGY:
- Patterns with no repeats.
- Patterns with partial repeats.
- Completely repetitive patterns.
- Mixed-case and special-character strings.
- Edge cases: empty string, single character.
*/

/*🎯 DEBUGGING TIPS:
- Print `(i, len, lps)` while running to see fallback steps.
- Verify `i` always increases or `len` decreases (no infinite loops).
- Ensure `lps[len - 1]` access guarded by `len > 0`.
*/

/*🎯 COMMON MISTAKES:
- Forgetting to keep `i` unchanged when falling back.
- Not initializing `lps` array with zeros.
- Mishandling empty string (should return []).
- Confusing `len` with `i` while updating.
*/

/*🎯 BEST PRACTICES:
- Separate helper `buildLPS` for convenience and clarity.
- Add comments explaining match/mismatch cases.
- Validate with known KMP examples.
- Draw prefix-suffix tables to reason about transitions.
*/

/*🎯 INTERVIEW TIPS:
- Explain purpose: avoiding re-checking characters in KMP.
- Walk through sample pattern to show fallback logic.
- Mention linear time guarantee and why `len` fallback works.
- Compare with alternative pre-processing (Z-algorithm).
*/