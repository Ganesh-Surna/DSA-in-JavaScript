/* Problem: ✅✅✅✅ Detect Anagram Substring (Anagram Search) ✅✅✅✅

Given a text string `text` (length N) and a pattern string `pattern` (length M),
check whether any substring of `text` is an anagram of `pattern`. In other words,
we need to detect whether `text` contains any permutation of `pattern`.

This is equivalent to asking: does there exist a window of length M inside `text`
whose character frequency distribution matches that of `pattern`?

Example 1:
Input: text = "geeksforgeeks", pattern = "frog"
Output: true  (substring "forg" is an anagram of "frog")

Example 2:
Input: text = "geeksforgeeks", pattern = "rseek"
Output: false (no substring permutes to "rseek")

Example 3:
Input: text = "abcd", pattern = "bcda"
Output: true  (entire string is an anagram)

Constraints:
- 0 ≤ M ≤ N ≤ 10^5
- Characters assumed ASCII (256 possibilities) in this implementation; can extend to Unicode by adjusting array size or using hash maps.
- Sliding window technique should run in O(N + alphabet_size) time.

Expected Complexities:
- Time Complexity: O(N * alphabet_size) → with fixed alphabet (ASCII) becomes O(N)
- Space Complexity: O(alphabet_size) → O(1) for fixed 256 ASCII characters
*/

// ✅ TC = O(N) for fixed-size alphabet (256)
// ✅ SC = O(1) extra beyond frequency arrays
// Sliding window + frequency comparison approach
function anagramSearch(text, pattern) {
    const n = text.length, m = pattern.length;
    if (m === 0) return true;   // Empty pattern → always found
    if (m > n) return false;    // Pattern longer than text → impossible

    let freqTxt = new Array(256).fill(0);
    let freqPat = new Array(256).fill(0);

    // Compute frequency for pattern and first window of text
    for (let i = 0; i < m; i++) {
        freqTxt[text.charCodeAt(i)]++;
        freqPat[pattern.charCodeAt(i)]++;
    }

    // Slide the window across text
    for (let i = m; i < n; i++) {
        if (areSame(freqTxt, freqPat)) return true; // Found matching frequencies

        // Slide window by removing left char and adding new one
        freqTxt[text.charCodeAt(i - m)]--;
        freqTxt[text.charCodeAt(i)]++;
    }

    // ✅ Check last window (IMPORTANT)
    return areSame(freqTxt, freqPat);


    // Helper function: compares frequency arrays
    // ✅ TC = O(256) = O(1)
    // ✅ SC = O(1)
    function areSame(freqTxt, freqPat) {
        for (let i = 0; i < 256; i++) {
            if (freqTxt[i] !== freqPat[i]) return false;
        }
        return true;
    }
}

// Quick tests / examples
console.log(anagramSearch('geeksforgeeks', 'frog'));  // true ✅ ("forg")
console.log(anagramSearch('geeksforgeeks', 'rseek')); // false ✅
console.log(anagramSearch('abcd', 'bcda'));           // true ✅
console.log(anagramSearch('abcd', 'efgh'));           // false ✅
console.log(anagramSearch('aaaaaaaaaa', 'aaa'));      // true ✅ (multiple windows)
console.log(anagramSearch('abc', ''));                // true ✅ (empty pattern)
console.log(anagramSearch('', 'abc'));                // false ✅ (pattern longer)

/*🎯 CORE IDEA:
Maintain two frequency arrays of size alphabet (256 for extended ASCII):
- One for the pattern (fixed throughout).
- One for the current sliding window of text.

As we slide the window by one character, decrement frequency of the outgoing
character and increment frequency of the incoming character. If the two frequency
arrays match at any step, the current window is an anagram of the pattern.
*/

/*🎯 STEP-BY-STEP FLOW:
1️⃣ Initialize `freqPat` with counts from `pattern`, and `freqTxt` with counts from the first window of size M in `text`.
2️⃣ For each subsequent position i (indexing the text window end):
   - Compare frequency arrays; if equal → return true.
   - Slide window: decrement count of outgoing character (`text[i-m]`), increment count of incoming character (`text[i]`).
3️⃣ After loop ends, check the final window (important case).
4️⃣ If no match found → return false.
*/

/*🎯 DETAILED WALKTHROUGH (Example: text = "geeksforgeeks", pattern = "frog"):
- Window length = 4.
- Initialize frequencies for "geek" and "frog".
- Slide window across text:
  - At substring "forg" (positions 4-7), freq arrays match → return true.
- Early exit ensures O(N) runtime.
*/

/*🎯 VISUALIZATION:
text:   g e e k s f o r g e e k s
pattern:        f r o g
window: [- - - -] slides across text
freq arrays track character counts of window vs pattern.
*/

/*🎯 COMPLEXITY ANALYSIS:
- Time: O(N * alphabet_size). With 256 ASCII → O(N).
- Space: O(alphabet_size) for two arrays of length 256.

Compared to sorting each window (O(M log M) per window) this sliding window +
frequency approach is more efficient.
*/

/*🎯 EDGE CASES:
- Pattern longer than text → false immediately.
- Empty pattern → true (every string contains empty anagram).
- Repeated characters in pattern handled via frequency arrays.
- Case-sensitive: characters compared via ASCII code; adjust if case-insensitive needed.
*/

/*🎯 ADVANTAGES:
- Deterministic linear time for fixed alphabet.
- Simple implementation using arrays.
- Early exit on first match.

🎯 DISADVANTAGES:
- Frequency array sized to 256; must adapt for Unicode or variable alphabets.
- For large Unicode sets, using `Map` might be more appropriate (but slower constant factors).
*/

/*🎯 REAL-WORLD APPLICATIONS:
- Plagiarism detection (search for rearranged fragments).
- DNA/protein sequence analysis (when alphabet is limited).
- Log scanning for scrambled keywords.
- Cryptanalysis (search for permuted tokens).
*/

/*🎯 RELATED PROBLEMS:
- Find all anagram starting indices (e.g., LeetCode 438).
- Minimum window substring.
- Group anagrams using character counts.
- Sliding window maximum/minimum problems.
*/

/*🎯 TESTING STRATEGY:
- Pattern appears early/late/not at all.
- Pattern equals text.
- Repeated characters in both text and pattern.
- Mixed casing or unicode (if alphabet extended).
- Empty pattern / empty text.
*/

/*🎯 DEBUGGING TIPS:
- Print frequency arrays for first few windows to ensure counts update correctly.
- Ensure frequencies never drop below zero (if they do, check window updates).
- Verify final window check executed (common bug is to forget last window).
*/

/*🎯 INTERVIEW TIPS:
- Start with brute force/sorting approach, then optimize to sliding window with frequency counts.
- Explain why frequency arrays offer O(1) comparisons (fixed alphabet).
- Discuss extending to Unicode (use hash maps) and trade-offs.
- Mention extension to return starting indices instead of boolean.
*/
