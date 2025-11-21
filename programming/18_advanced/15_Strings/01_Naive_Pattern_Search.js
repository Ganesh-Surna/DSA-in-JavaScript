/* Problem: ✅✅✅✅ Naive Pattern Search (Brute Force String Matching) ✅✅✅✅

Given a text string `text` of length N and a pattern string `pattern` of length M,
find all starting indices in `text` where `pattern` occurs as a contiguous substring.
Return the indices in ascending order; if the pattern does not appear, return [-1].
This is the simplest string searching technique that checks for a match at every
possible starting position.

Key Requirements:
- Compare pattern against text for each possible alignment (0 ≤ i ≤ N - M).
- Characters must match exactly (case-sensitive).
- Multiple occurrences should all be reported.
- If no occurrences, return [-1].

Example 1:
Input: text = "ABCABCD", pattern = "ABCD" → Output: [3]
Explanation: Pattern "ABCD" starts at index 3 in the text.

Example 2:
Input: text = "AAAAA", pattern = "AAA" → Output: [0, 1, 2]
Explanation: Pattern appears at indices 0, 1, and 2.

Example 3:
Input: text = "HELLO", pattern = "WORLD" → Output: [-1]
Explanation: Pattern not found.

Constraints:
- 1 ≤ M ≤ N ≤ 10^5 (practical limits vary; naive algorithm is O(N*M))
- Alphabet can be any character set; comparisons are direct equality checks
- Pattern and text are plain strings (ASCII/Unicode)

Expected Complexities:
Time Complexity: O((N - M + 1) * M) worst case (O(N*M)); best case O(N)
Auxiliary Space: O(1) extra (excluding output list)
*/

// ✅ TC = O((N - M + 1) * M) worst case (e.g., text="AAAAAAAA", pattern="AAAA")
// ✅ SC = O(1) extra (result array aside)
// Naive strategy: try matching the pattern at every possible starting index.
function naivePatternSearch(text, pattern) {
    let n = text.length;
    let m = pattern.length;

    if (m === 0) return []; // optional: no pattern to search (can be adjusted per requirements)
    if (m > n) return [-1]; // pattern longer than text → impossible

    let result = []; // indices where pattern starts

    // Slide the pattern over text one by one
    for (let i = 0; i < n - m + 1; i++) { // OR --> i <= n - m (❌❌ but NOT i < n - m)
        let j = 0;

        // Check if pattern matches text starting at position i
        for (; j < m; j++) {
            if (pattern[j] !== text[i + j]) {
                break; // mismatch at position j, move to next i
            }
        }

        // If we completed the inner loop without breaking, pattern matched entirely
        if (j === m) {
            result.push(i);
        }
    }

    return result.length ? result : [-1];
}


// ✅ If just checking if pattern is present in text or not, then this is the best approach.
// ✅ TC = O(n*m)
// ✅ SC = O(1)
function naivePatternSearch(pat, txt) {
   let m = pat.length
   let n = txt.length
   
   if(m > n) return false
   
   for(let i=0; i<n-m+1; i++){
       let j=0
       for(; j<m; j++){
           if(pat[j] !== txt[i+j]){
               break // break inner loop
           }
           
       }
       if(j===m) return true // If pattern is present in text, return true
   }
   
   return false // If pattern is not present in text, return false
}

// Test cases
console.log("Test 1:", naivePatternSearch('ABCABCD', 'ABCD')); // [3]
console.log("Test 2:", naivePatternSearch('AAAAA', 'AAA'));    // [0, 1, 2]
console.log("Test 3:", naivePatternSearch('HELLO', 'WORLD'));  // [-1]
console.log("Test 4:", naivePatternSearch('ABC', ''));         // [] (no pattern)
console.log("Test 5:", naivePatternSearch('AABAACAADAABAABA', 'AABA')); // [0, 9, 12]
console.log("Test 6:", naivePatternSearch('SHORT', 'LONGER')); // [-1]

/*🎯 CORE IDEA: Align the pattern at every possible index in the text and check all
characters sequentially. If all characters match, record the starting index.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZE:
   - Let n = text length, m = pattern length.
   - If m > n, pattern cannot fit → return [-1].

2️⃣ SLIDE PATTERN:
   - For each i from 0 to n - m:
     - Compare pattern[0..m-1] with text[i..i+m-1].

3️⃣ CHARACTER COMPARISON:
   - If a mismatch occurs, break and shift pattern by one.
   - If all m characters match, record index i.

4️⃣ RESULT:
   - Return all indices where full match found.
   - If none, return [-1].

🧠 WHY IT WORKS:
- Exhaustively checks all alignments ensuring no match is missed.
- Simple and intuitive; easy to implement.
- Serves as baseline for understanding advanced algorithms.

💡 KEY INSIGHTS:
- Worst-case time O(N*M) due to repeated comparisons.
- Best-case time O(N) when mismatches occur early.
- Works for any character set; comparisons are straightforward.
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

Example: text = "ABCABCD", pattern = "ABCD"

1️⃣ Align pattern at index 0:
   Compare text[0..3] = "ABCA" with "ABCD" → mismatch at position 3 (C vs D) → shift.

2️⃣ i = 1:
   text[1..4] = "BCAB" vs "ABCD" → mismatch at position 0 (B vs A) → shift.

3️⃣ i = 2:
   text[2..5] = "CABC" vs "ABCD" → mismatch at position 0 → shift.

4️⃣ i = 3:
   text[3..6] = "ABCD" vs "ABCD" → all characters match → record index 3.

5️⃣ i = 4:
   text[4..7] = "BCD" vs "ABCD" → insufficient length (i > n - m) → loop ends.

📊 Result: [3]
*/

/*🎯 COMPLEXITY ANALYSIS:
- Worst Case: O(N*M)
  Example: text = "AAAAAAAA", pattern = "AAAA" → for each i, compare all m characters.
- Best Case: O(N)
  Example: text = "ABCDEFG", pattern = "XYZ" → mismatch immediately at each i.
- Average Case: Depends on alphabet size and randomness; can approach O(N*M) for small alphabets.

Space Complexity:
- O(1) extra (result list aside); comparisons done in-place.
*/

/*🎯 EDGE CASES:
- Pattern longer than text → return [-1]
- Empty pattern → return [] (or adjust per requirement)
- Text or pattern with repeating characters (stress worst-case)
- Pattern equal to text → single match at index 0
- Case sensitivity: matches only identical characters
*/

/*🎯 ADVANTAGES:
- Simple and intuitive
- No preprocessing needed
- Works on any data type that supports equality comparison

🎯 DISADVANTAGES:
- Inefficient for large strings/patterns (O(N*M) time)
- Redundant comparisons (no reuse of previous results)
- Not suitable for real-time or large-scale text search
*/

/*🎯 REAL-WORLD USES:
- Educational purposes (understanding string matching basics)
- Quick-and-dirty pattern matching for small inputs
- Baseline to compare optimized algorithms
*/

/*🎯 RELATED ALGORITHMS:
- Rabin-Karp (rolling hash) → Average O(N + M)
- Knuth-Morris-Pratt (KMP) → O(N + M) using prefix table
- Z-algorithm → O(N + M), builds Z-array for pattern+text
- Boyer-Moore (heuristics) → O(N/M) average, best for large alphabets
*/

/*🎯 TESTING STRATEGY:
- Pattern present multiple times (overlapping and non-overlapping)
- Pattern absent
- Pattern equals text
- Pattern longer than text
- Mixed-case strings
- Random strings to check performance
*/

/*🎯 DEBUGGING TIPS:
- Print indices and mismatches to see how comparisons progress
- Verify loop ranges (i ≤ n - m)
- Ensure result is [-1] when no matches
- Watch out for off-by-one errors when slicing text
*/

/*🎯 COMMON MISTAKES:
- Using i < n instead of i ≤ n - m in outer loop
- Not returning [-1] when result array empty
- Forgetting to handle pattern longer than text
- Ignoring empty pattern scenarios
*/

/*🎯 BEST PRACTICES:
- Guard against corner cases early (m > n, empty pattern)
- Use descriptive variable names (`n`, `m`, `result`)
- Keep loops clear and avoid nested condition clutter
- Extend easily to count occurrences or return boolean
*/

/*🎯 INTERVIEW TIPS:
- Explain time complexity clearly (O(N*M) worst case)
- Contrast with optimized algorithms (KMP, Rabin-Karp)
- Be prepared to implement KMP if interviewer asks for efficient version
- Mention overlapping match handling when relevant
*/