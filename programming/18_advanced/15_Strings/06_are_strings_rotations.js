/* Problem: ✅✅✅✅ Check Whether Two Strings Are Rotations of Each Other ✅✅✅✅

Given two strings `s1` and `s2`, determine whether `s2` is a rotation of `s1`.
A rotation means we can split `s1` at some pivot, swap the two halves, and obtain
`s2`. Example: `s1 = "ABCD"` → valid rotations: `"BCDA"`, `"CDAB"`, `"DABC"`, `"ABCD"`.

Requirements:
- Strings must be the same length to be rotations (including length zero).
- Character multiset must match automatically due to concatenation trick.
- Empty strings are rotations (trivial case).

Example 1:
Input: s1 = "ABCD", s2 = "CDAB" → Output: true (rotation by 2 positions).

Example 2:
Input: s1 = "ABAB", s2 = "ABBA" → Output: false (order cannot be achieved by rotation).

Example 3:
Input: s1 = "", s2 = "" → Output: true.

Constraints:
- 0 ≤ |s1|, |s2| ≤ 10^5
- Characters can be ASCII/Unicode (JS handles UTF-16)
- Expect O(N) solutions; naive rotation checks lead to O(N^2)

Two Approaches in This File:
1. Concatenation + built-in search (`includes`/`search`).
2. Concatenation + KMP pattern search for deterministic O(N) worst-case.

Expected Complexities:
- Concatenation = O(N)
- Built-in search = typically O(N) average (engine dependent)
- KMP search = O(N) worst-case with O(N) space for LPS array
*/

// Sol 1. Using Concatenation and Inbuilt Search Function
function areStringsRotations(s1, s2) {
    if(s1.length !== s2.length) return false
    let n = s1.length
    
    let doubleS1 = s1.concat(s1) // ✅ doubleS1 = s1 + s1 (concatenation)
    return doubleS1.search(s2) !== -1 // doubleS1.includes(s2) or doubleS1.indexOf(s2) !== -1
}


// Sol 2: Concatenation + KMP Pattern Search (deterministic linear time)
// ✅ TC = O(N + M) → O(N) because N == M for valid rotation check
// ✅ SC = O(M) for LPS array
// Why KMP? Guarantees O(N) matching even on adversarial repetitive inputs.
function areStringsRotationsUsingKMP(s1, s2) {
    if (s1.length !== s2.length) return false;
    if (s1.length === 0) return true; // Both empty → rotation by definition

    const concatenated = s1 + s1; // length 2N
    return modifiedKmpPatternSearch(concatenated, s2); // true if s2 occurs within concatenated string
}
// HELPER FUNCTIONS:
// ✅ TC = O(N + M)
// ✅ SC = O(M)
function modifiedKmpPatternSearch(text, pattern){
    let n=text.length
    let m = pattern.length
    
    let lps = new Array(m).fill(0)
    constructLPS(pattern, lps)
    
    let i=0
    let j=0
    while(i<n){
        if(text[i]===pattern[j]){
            i++
            j++
            if(j===m){
                return true // Return true immidiately after finding 1st pattern match
                // No need to update j = lps[j-1], coz we are not searching for another match
            }
        }else{
            if(j===0){
                i++
            }else{
                j=lps[j-1]
            }
        }
    }
    
    return false
}

// ✅ TC = O(M)
// ✅ SC = O(1)
function constructLPS(pattern, lps){
    let m = pattern.length
    lps[0]=0 // lps of 1st character = 0
    
    let i=1 // Start from second character
    let len=0
    
    while(i<m){
        if(pattern[i]===pattern[len]){
            len++
            lps[i]=len
            i++
        }else{
            if(len===0){
                lps[i]=0
                i++
            }else{
                len = lps[len-1]
            }

        }

    }
}

let s1 = "ABCD"
let s2 = "CDAB"
console.log(areStringsRotations(s1, s2)) // true

let s11 = "ABAB"
let s22 = "ABBA"
console.log(areStringsRotations(s11, s22)) // false

/*🎯 CORE IDEA:
- Rotations preserve order after some pivot. Doubling `s1` contains every possible
  rotation as a contiguous substring. If `s2` appears inside `s1 + s1`, it is a rotation.
- Built-in search is quick to implement; KMP offers deterministic guarantees.
*/

/*🎯 STEP-BY-STEP FLOW:
1️⃣ Validate lengths: unequal → immediately false.
2️⃣ Concatenate `s1` with itself: `doubleS1 = s1 + s1`.
3️⃣ Run substring search (`search`/`includes` or KMP) for `s2` within `doubleS1`.
4️⃣ Return true if found, else false.
*/

/*🎯 DETAILED WALKTHROUGH:
Example: s1 = "ABCD", s2 = "CDAB"
- doubleS1 = "ABCDABCD"
- Search window of length |s2| = 4 slides over concatenated string
- Matching substring found at index 2 → rotation confirmed

Example: s1 = "ABAB", s2 = "ABBA"
- doubleS1 = "ABABABAB"
- No exact substring match → not a rotation
*/

/*🎯 VISUALIZATION:
Original:    A B C D
Rotations:   B C D A
             C D A B
             D A B C
Concatenate: A B C D | A B C D
Sliding window of size 4 exposes each rotation.
*/

/*🎯 COMPLEXITY ANALYSIS:
- Concatenation: O(N)
- Built-in search: O(N) average
- KMP search: O(N) worst-case
- Space: O(N) for concatenated string + O(N) for LPS array when using KMP
*/

/*🎯 EDGE CASES:
- Empty strings: both empty → true
- Single-character strings: true if same char, else false
- Repeated characters (e.g., "AAAA" vs "AAAA") handled seamlessly
- Unicode/emoji strings supported by JS string comparisons
*/

/*🎯 ADVANTAGES & DISADVANTAGES:
- Built-in search: concise, delegates optimization to runtime
- KMP: consistent linear time across inputs, useful for interview explanation
- Both require concatenation storage; cannot avoid O(N) additional space
*/

/*🎯 REAL-WORLD APPLICATIONS:
- Detecting rotation equivalence in circular buffers
- DNA circular genome sequence comparisons
- Puzzles or cryptographic checks that depend on cyclic shifts
*/

/*🎯 RELATED PROBLEMS:
- Rotate string by k positions
- Determine minimum rotations to match another string
- Lexicographically minimal rotation (Booth's algorithm)
- Anagram checks (different requirement)
*/

/*🎯 TESTING STRATEGY:
- Equal strings vs different strings
- Rotations at different pivot positions
- Strings with repeated patterns
- Unicode/emoji cases
- Random large strings for performance
*/

/*🎯 DEBUGGING TIPS:
- Print `doubleS1` and search index for quick validation
- Log intermediate `i`, `j`, and `lps` values in KMP to ensure no infinite loops
- Confirm length check happens before concatenation to avoid wasted work
*/

/*🎯 INTERVIEW TIPS:
- Start with the concatenation insight; it’s intuitive and simple
- Discuss time/space complexity trade-offs of built-in vs KMP
- If asked for guaranteed linear time, explain KMP integration briefly
- Mention alternative data structures (queues) or algorithms (Booth) if relevant
*/