/* Problem: ✅✅✅✅ Minimum Window Substring (Containing All Characters of Pattern) ✅✅✅✅

Given two strings `s` (text) and `p` (pattern), find the smallest window in `s`
that contains all characters present in `p` (including duplicates). If no such
window exists, return an empty string.

Examples:
1. Input: s = "ADOBECODEBANC", p = "ABC" → Output: "BANC"
2. Input: s = "a", p = "aa" → Output: "" (window can't cover both 'a's)
3. Input: s = "aa", p = "aa" → Output: "aa"

Constraints:
- 1 ≤ |p| ≤ |s| ≤ 10^5 (needs O(n) solution)
- Characters limited to extended ASCII (size 256) in this implementation

Expected Complexities:
- Time: O(n + m) where n = |s|, m = |p|
- Space: O(256) = O(1) for frequency arrays

🔍 How we solve it (high level):
- Use a sliding window to expand rightwards until pattern fully covered.
- Then shrink from the left to drop unnecessary characters and minimize window.
- Keep two frequency arrays: one for pattern counts (`freqP`) and one for current
  window (`freqS`). Maintain a `matched` count that tracks how many pattern
  characters have been satisfied.
*/

// ✅ TC = O(n + m) - Count pattern once, then slide window across the text once
// ✅ SC = O(256) = O(1) - Fixed-size frequency arrays for ASCII
function smallestWindow(s, p) {
    let n = s.length
    let m = p.length
    
    let freqP = new Array(256).fill(0)
    let freqS = new Array(256).fill(0)
    
    for(let i=0; i<m; i++){
        freqP[p.charCodeAt(i)]++
    }
    
    let minLen=Infinity
    let minStart=-1
    let start=0
    let matched=0
    
    for(let end=0; end<n; end++){
        let endIdx = s.charCodeAt(end)
        freqS[endIdx]++
        
        if(freqP[endIdx]>0 && freqS[endIdx] <= freqP[endIdx]){
            matched++
        }
        
        while(matched === m){
            let windowLen = end - start + 1
            if(windowLen < minLen){
                minLen = windowLen
                minStart = start
            }
            
            // Shrink wnidow from left/start
            let startIdx = s.charCodeAt(start)
            freqS[startIdx]--
            start++
            
            // If we lost a needed char
            if(freqP[startIdx] > 0 && freqS[startIdx] < freqP[startIdx]){
                matched--
            }
            
        }
    }
    
    return minLen === Infinity ? "" : s.substring(minStart, minStart+minLen)
}

/*🎯 CORE IDEA:
- Expand window by moving `end` pointer until all characters of `p` are covered.
- Compare `freqS` and `freqP` to ensure coverage. `matched` counts how many
  pattern characters are satisfied.
- Once matched == m, try shrinking from left (`start`) to discard extra chars and
  update the best (smallest) window.
*/

/*📋 STEP-BY-STEP FLOW:
1️⃣ Precompute `freqP` counts for each character in `p`.
2️⃣ Initialize two pointers `start` and `end` to define current window.
3️⃣ Iterate `end` from 0 to n-1:
   - Include `s[end]` in `freqS`.
   - Increase `matched` when the inclusion contributes towards satisfying pattern.
4️⃣ Whenever `matched === m` (window covers pattern fully):
   - Update minimum window details.
   - Shrink from the left, updating `freqS` and `matched` if a required character
     is removed.
5️⃣ Return substring tracked by `minStart` & `minLen`, or empty string if not found.
*/

/*🧠 WHY IT WORKS:
- Sliding window maintains contiguous substrings efficiently.
- `freqS <= freqP` check ensures we only count characters that contribute to
  covering the pattern.
- Shrinking happens as soon as window is valid, guaranteeing minimality.
- Overall traversal is linear: each pointer moves at most n times.
*/

/*🎯 DETAILED WALKTHROUGH (Example: s = "ADOBECODEBANC", p = "ABC"):
Goal: find smallest window in `s` containing all characters A, B, C.
Initial state: start=0, matched=0, minLen=∞, minStart=-1, freqP(A)=1, freqP(B)=1, freqP(C)=1.

1️⃣ Expand window (move `end` right) until all pattern chars are covered.

- end=0 → char='A'
  freqS[A]=1 (≤ freqP[A]) ⇒ matched=1. Window = "A"
- end=1 → char='D'
  Not in pattern ⇒ matched unchanged. Window = "AD"
- end=2 → char='O'
  Not in pattern ⇒ matched unchanged. Window = "ADO"
- end=3 → char='B'
  freqS[B]=1 (≤ freqP[B]) ⇒ matched=2. Window = "ADOB"
- end=4 → char='E'
  Not in pattern ⇒ matched unchanged. Window = "ADOBE"
- end=5 → char='C'
  freqS[C]=1 (≤ freqP[C]) ⇒ matched=3 (now matched == m). Window = "ADOBEC"

2️⃣ All pattern chars present → attempt to shrink from left (`start`) while window stays valid.

- Current window [0,5], length 6 → best so far (minLen=6, minStart=0)
- Shrink step: remove s[start]='A'
  • freqS[A] becomes 0 (< freqP[A]) ⇒ matched decreases to 2 ⇒ stop shrinking
  • Move start to 1. Window now misses 'A'

3️⃣ Continue expanding since window no longer valid (matched < m).

- end=6 → 'O' (no change)
- end=7 → 'D' (no change)
- end=8 → 'E' (no change)
- end=9 → 'B'
  freqS[B]=2 (> freqP[B]) ⇒ still matched=2 (extra B doesn’t increase matched)
- end=10 → 'A'
  freqS[A]=1 (≤ freqP[A]) ⇒ matched=3. Window [1,10] = "DOBECODEBA"

4️⃣ Shrink again while window remains valid.

- Check window length: 10-1+1 = 10 (longer than best, but shrink to improve)
- start=1: remove 'D' (not required) ⇒ matched stays 3 → start=2
- start=2: remove 'O' (not required) ⇒ matched stays 3 → start=3
- start=3: remove 'B'
  • freqS[B] drops from 2 to 1 (still ≥ required 1) ⇒ matched stays 3 → start=4
- start=4: remove 'E' (not required) ⇒ matched stays 3 → start=5
- start=5: remove 'C'
  • freqS[C] drops to 0 (< required 1) ⇒ matched becomes 2 ⇒ stop shrinking
- Just before removing 'C', window was [3,10] = "BECODEBA" with length 8. Best minLen still 6.

5️⃣ Keep expanding to bring 'C' back.

- end=11 → 'N' (not required)
- end=12 → 'C'
  freqS[C]=1 ⇒ matched=3 again. Window [5,12] = "CODEBANC"

6️⃣ Final shrink to find minimal window.

- Evaluate window length: 12-5+1 = 8 → try shrinking
- start=5: remove 'C'
  • freqS[C] becomes 0 (< required) ⇒ matched=2 ⇒ cannot remove; need to include this 'C'
- Before removal, record that best window might be later within this range.
- At this point start advances past extras in previous steps (already >=5). Continue sliding window by incrementing start until we hit position 9:
  - start=6 removes 'O' (not required)
  - start=7 removes 'D' (not required)
  - start=8 removes 'E' (not required)
  - start=9 removes 'B'
    • freqS[B] goes from 2 to 1 (still enough) → window [9,12] = "BANC"
    • length = 4 < current minLen (6) ⇒ update minLen=4, minStart=9
- Next shrink step would remove 'A'; that would drop matched to 2, so we stop.

Result: substring starting at index 9 with length 4 ⇒ `"BANC"`.
Key idea: every time window covers pattern, tighten from the left to try to beat previous best.
*/

/*🎯 VISUAL TIMELINE:
Indices: 0 1 2 3 4 5 6 7 8 9 10 11 12
Chars:   A D O B E C O D E B  A  N  C
Window evolves:
- [0,5] "ADOBEC" covers ABC, length 6
- [3,10] "BECODEBA" covers ABC, length 8 → shrink to length 6
- [9,12] "BANC" covers ABC, length 4 ← minimal window
*/

/*🎯 COMPLEXITY ANALYSIS:
- Time: O(n + m). Counting pattern is O(m). Each index in `s` is visited at most twice (once by `end`, once by `start`).
- Space: O(256) for frequency arrays, treated as constant.
*/

/*🎯 EDGE CASES:
- Pattern longer than string → impossible → return "" (handled naturally as matched never reaches m).
- Characters absent in `s` → result empty.
- Multiple valid windows → algorithm ensures smallest length is chosen.
- Case sensitivity: ASCII-based; uppercase and lowercase treated distinct.
*/

/*🎯 ADVANTAGES:
- Linear time sliding window; efficient for large inputs.
- Constant extra space beyond fixed-size frequency arrays.
- Works with duplicate characters in pattern (mandatory counts enforced).
*/

/*🎯 DISADVANTAGES / LIMITATIONS:
- Assumes ASCII; for Unicode, adjust array size or use hash maps.
- If character set huge, constant factor may increase with map usage.
*/

/*🎯 REAL-WORLD APPLICATIONS:
- DNA/protein sequence analysis (finding motif occurrences).
- Text processing (finding minimal snippet containing keywords).
- Stream processing to detect minimal window containing required tokens.
*/

/*🎯 RELATED PROBLEMS:
- Longest substring with at most K distinct characters.
- Minimum window with all distinct characters.
- Anagram detection using sliding windows (fixed window size).
*/

/*🎯 TESTING STRATEGY:
- Pattern longer than string.
- Pattern identical to string.
- String containing multiple overlapping occurrences.
- Inputs with repeated characters in pattern.
- Edge cases with minimal window at start or end.
*/

/*🎯 DEBUGGING TIPS:
- Print `start`, `end`, `matched`, `minStart`, `minLen` during sample runs.
- Track `freqS` vs `freqP` for key characters to ensure counts align.
- Verify shrink condition only runs when `matched === m`.
*/

/*🎯 INTERVIEW TIPS:
- Start with brute-force idea (check all substrings) and explain its O(n^2) cost.
- Introduce sliding window concept and how we maintain counts.
- Emphasize handling duplicates in `p` with frequency arrays.
- Walk interviewer through the "ADOBECODEBANC" example.
- Discuss complexity and possible optimizations (hash maps for Unicode).
*/