/* Problem: ✅✅✅✅ Naive Pattern Search (Pattern with Distinct Characters Optimization) ✅✅✅✅

Given a text string `text` (length N) and a pattern string `pattern` (length M) in
which **all characters are distinct**, find all starting indices where the pattern
occurs in the text. Unlike the plain naive algorithm, we can skip more characters
after a mismatch thanks to the distinct character property, improving efficiency.

Key Requirements:
- Pattern characters are all distinct (no repetition).
- Return every index i such that text[i..i+M-1] == pattern.
- If no occurrence exists, return [-1].
- Works for any character set (case-sensitive).

Example 1:
Input: text = "ABCABCD", pattern = "ABCD" → Output: [3]
Explanation: Pattern matches the substring starting at index 3.

Example 2:
Input: text = "ABCDEFGABC", pattern = "CDE" → Output: [2]
Explanation: Match at index 2 only.

Example 3:
Input: text = "ABABABABA", pattern = "ABA" → Output: [0, 2, 4, 6]
Explanation: Pattern characters distinct (A,B,A) is false → assumption violated; still works but skip optimization degrades. (Use only when pattern distinct.)

Constraints:
- 1 ≤ M ≤ N ≤ 10^5
- Pattern characters must be distinct for skip optimization to hold
- Complexity improvement occurs in worst-case scenarios (O(N) comparisons)

Expected Complexities:
Time Complexity: O(N) when pattern characters are distinct (skipping j positions on mismatch)
Auxiliary Space: O(1) extra
*/

// ✅ TC = O(N-M+1) --> O(N) when pattern characters are distinct (skip optimization works)
// ✅ SC = O(1)
// Greedy skip: after matching j characters, mismatch allows shifting by j positions
// instead of 1 (because those j characters cannot re-match due to uniqueness).
function naiveDistinctPatternSearch(text, pattern) {
    let n = text.length;
    let m = pattern.length;

    if (m === 0) return [];      // No pattern → empty result (can be adjusted)
    if (m > n) return [-1];      // Pattern longer than text → impossible

    let result = [];             // Indices where pattern found

    let i = 0;                   // Current index in text where pattern alignment starts
    while (i <= n - m) {
        let j = 0;

        // Compare characters while they match
        for (; j < m; j++) {
            if (pattern[j] !== text[i + j]) {
                break;           // Mismatch → stop inner loop
            }
        }

        // If j == m, all characters matched
        if (j === m) {
            result.push(i);
        }

        // Shift the pattern optimally:
        // - If mismatch happened at first character (j == 0) → shift by 1 (same as naive)
        // - Otherwise, shift by j (number of matched characters)
        //   because pattern characters are distinct, none of the matched characters can
        //   be part of the next potential match starting within those positions.
        if (j === 0) {
            i += 1;
        } else {
            i += j;
        }
    }

    return result.length ? result : [-1];
}

// Test cases
console.log("Test 1:", naiveDistinctPatternSearch('ABCABCD', 'ABCD'));           // [3]
console.log("Test 2:", naiveDistinctPatternSearch('ABCDEFGABC', 'CDE'));         // [2]
console.log("Test 3:", naiveDistinctPatternSearch('AAAAA', 'AA'));               // ❌❌❌[0, 2] --> But actual answer is  [0, 1, 2, 3] (pattern not distinct → Does not work as expected)
console.log("Test 4:", naiveDistinctPatternSearch('XYZABCXYZABC', 'XYZ'));       // [0, 6]
console.log("Test 5:", naiveDistinctPatternSearch('HELLOWORLD', 'WORLD'));       // [5]
console.log("Test 6:", naiveDistinctPatternSearch('SHORT', 'LONGER'));           // [-1]
console.log("Test 7:", naiveDistinctPatternSearch('ABCD', ''));                  // []

/*🎯 CORE IDEA: Utilize the unique character property of the pattern to skip ahead
multiple characters after a partial match followed by a mismatch. If the first j
characters matched but the (j+1)th mismatched, none of the matched characters can
start the next match (due to distinctness), so shift by j positions instead of 1.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - n = text length, m = pattern length, i = 0.

2️⃣ WHILE LOOP (i ≤ n - m):
   - Compare pattern with text starting at i.
   - Track number of matched characters j.

3️⃣ MATCH CASE (j == m):
   - Record index i in result (full match found).

4️⃣ SHIFT LOGIC:
   - If mismatch occurs immediately (j == 0) → i += 1 (same as naive algorithm).
   - Else → i += j (skip matched characters) because pattern is distinct.

5️⃣ LOOP CONTINUES UNTIL i > n - m.

🧠 WHY THE SKIP WORKS:
- When pattern has all distinct characters, once `pattern[0..j-1]` matches `text[i..i+j-1]` and mismatch occurs at j, none of the matched characters can form a prefix with `pattern[0]` starting in the range (i+1) to (i+j-1). Therefore we can safely skip to i + j.
- This optimization reduces redundant comparisons and yields O(N) performance in the best and average cases.

💡 KEY INSIGHTS:
- Works best when pattern characters are unique and alphabet is large.
- If pattern has repeating characters, algorithm degenerates to standard naive worst-case O(N*M) (since shifts may only be by 1).
- Useful stepping stone towards more advanced algorithms like KMP.
*/

/*🎯 DETAILED OPERATION WALKTHROUGH (Distinct Pattern):

Example: text = "ABCABCD", pattern = "ABCD"

1️⃣ i = 0:
   - Compare ABCD with text[0..3] = ABCA → mismatch at j=3 (C vs D).
   - Shift by j (=3) → i = 3.

2️⃣ i = 3:
   - Compare ABCD with text[3..6] = ABCD → complete match → record index 3.
   - Shift by j (=4) → i = 7 (> n - m) → loop ends.

Result: [3]

Note: Without skip optimization, we would have checked i = 0, 1, 2, 3 separately.
*/

/*🎯 COMPLEXITY ANALYSIS:
- Best/Average Case (distinct pattern): O(N)
- Worst Case (pattern not distinct or matching text): O(N*M) but typically improved
- Space: O(1) extra

Compared to plain naive search, this variant can drastically reduce comparisons
when pattern characters are unique and mismatches occur after partial matches.
*/

/*🎯 EDGE CASES:
- Pattern longer than text → [-1]
- Empty pattern → [] (or handle per specification)
- Pattern not distinct → algorithm still correct but may not gain efficiency
- Text/pattern with Unicode characters → works as long as equality comparison valid
*/

/*🎯 ADVANTAGES:
- Easy optimization over basic naive search
- No preprocessing tables needed
- Linear time for distinct patterns in practice

🎯 DISADVANTAGES:
- Assumes pattern characters distinct; otherwise loses efficiency
- Still worse than KMP/Z/Boyer-Moore in worst-case scenarios
- Not suitable when we need guaranteed linear time regardless of pattern
*/

/*🎯 RELATED ALGORITHMS:
- Standard Naive Pattern Search (no skip)
- Knuth-Morris-Pratt (prefix-function based)
- Rabin-Karp (rolling hash)
- Z-algorithm, Boyer-Moore (heuristic skipping)
*/

/*🎯 TESTING STRATEGY:
- Distinct pattern with multiple matches
- Distinct pattern with mismatches after partial matches
- Pattern with repeated characters (to see degraded performance)
- Pattern equal to text
- Pattern longer than text
*/

/*🎯 DEBUGGING TIPS:
- Log values of i and j to ensure skips happen correctly
- Verify loop bound (i ≤ n - m)
- Ensure result is [-1] when no matches found
- Check for infinite loops (i must increase each iteration)
*/

/*🎯 COMMON MISTAKES:
- Forgetting to shift by j after partial match
- Using `i < n - m` instead of `i ≤ n - m`
- Not handling case when pattern length > text length
- Assuming speed-up when pattern has repeated characters
*/

/*🎯 BEST PRACTICES:
- Guard pattern length cases early
- Document the distinct-character assumption clearly
- Use descriptive variable names (`result`, `i`, `j`)
- Provide tests where skips reduce iterations
*/

/*🎯 INTERVIEW TIPS:
- Mention optimization relies on distinct characters
- Contrast with vanilla naive search
- Use this as segue to discuss KMP/Boyer-Moore
- Be ready to modify for overlapping characters if asked
*/