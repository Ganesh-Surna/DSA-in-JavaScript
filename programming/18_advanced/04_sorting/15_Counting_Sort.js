/* Problem:
Given a string s consisting of lowercase english letters, arrange all its letters in lexicographical order using Counting Sort.

Example 1:
Input: s = "edsab"
Output: "abdes"
Explanation: In lexicographical order, s will be "abdes".
The characters in order are: a, b, d, e, s

Example 2:
Input: s = "geeksforgeeks"
Output: "eeeefggkkorss"
Explanation: In lexicographical order, s will be "eeeefggkkorss".
Character frequencies: e=4, f=1, g=2, k=2, o=1, r=1, s=2

Example 3:
Input: s = "hello"
Output: "ehllo"
Explanation: In lexicographical order, s will be "ehllo".
Character frequencies: e=1, h=1, l=2, o=1

Constraints:
1 ≤ s.length ≤ 10^5
All characters are lowercase english letters (a-z)

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(1) - only 26 characters
*/

// ✅ TC = O(n) --> Linear time counting and reconstruction
// ✅ SC = O(1) --> Only 26 character counts (constant space)
function countSort(s) {
    let codeCount = new Array(26).fill(0)
    let aCode = 'a'.charCodeAt(0)
    
    // Count frequency of each character
    for(let char of s){
        let code = char.charCodeAt(0);
        codeCount[code-aCode]++
    }
    
    // Reconstruct string in lexicographical order
    s = ''
    for(let i=0; i<26; i++){
        let c = codeCount[i]
        while(c>0){
            s += String.fromCharCode(aCode+i)
            c--
        }
    }
    
    return s
}

// ✅ Test Cases
console.log(countSort("edsab"));           // "abdes"
console.log(countSort("geeksforgeeks"));   // "eeeefggkkorss"
console.log(countSort("hello"));           // "ehllo"
console.log(countSort("programming"));     // "aggimmnoprr"
console.log(countSort("a"));               // "a"

/*🎯 CORE IDEA: Instead of comparison-based sorting (O(n log n)), we use COUNTING SORT which leverages the fact that we have a limited range of characters (a-z) to achieve O(n) time complexity.

📋 STEP-BY-STEP FLOW:

1️⃣ COUNTING PHASE:
   - Create count array of size 26 (for a-z)
   - Initialize all counts to 0
   - For each character in string:
     * Convert character to ASCII code
     * Calculate index: code - 'a'.charCodeAt(0)
     * Increment count at that index

2️⃣ RECONSTRUCTION PHASE:
   - Iterate through count array (0 to 25)
   - For each non-zero count:
     * Add the character (a+i) to result string
     * Repeat count times
   - This automatically gives lexicographical order!

3️⃣ CHARACTER MAPPING:
   - 'a' → index 0, 'b' → index 1, ..., 'z' → index 25
   - ASCII: 'a' = 97, 'b' = 98, ..., 'z' = 122
   - Index = charCode - 97 = charCode - 'a'.charCodeAt(0)

4️⃣ LEXICOGRAPHICAL ORDER:
   - Since we iterate count array from 0 to 25
   - Characters are added in order: a, b, c, ..., z
   - This automatically gives lexicographical order!

5️⃣ FREQUENCY HANDLING:
   - Each character appears exactly as many times as its count
   - while(c>0) loop ensures correct frequency
   - No need for stable sorting since all same characters are identical

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) vs O(n log n) for comparison-based sorting
2️⃣ LIMITED RANGE: Only 26 possible characters (a-z)
3️⃣ COUNTING SORT: Perfect for small, known range of values
4️⃣ NO COMPARISONS: Direct counting and reconstruction

💡 KEY INSIGHTS:

1️⃣ COUNTING SORT WORKS: Because we have limited range (26 characters)
2️⃣ LEXICOGRAPHICAL ORDER: Achieved by iterating count array in order
3️⃣ CHARACTER MAPPING: ASCII arithmetic gives us array indices
4️⃣ FREQUENCY PRESERVATION: while loop maintains character counts

🎯 MATHEMATICAL ANALYSIS:
- Counting phase: O(n) - visit each character once
- Reconstruction phase: O(n) - output each character once
- Total time: O(n)
- Space: O(1) - only 26 integers for counts

🎯 WHY NOT COMPARISON-BASED SORTING?
- Comparison-based sorting: O(n log n) minimum
- Counting sort: O(n) when range is limited
- For 26 characters, counting sort is optimal!
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
s = "edsab"

🎯 GOAL: Sort characters in lexicographical order

🔍 STEP-BY-STEP PROCESS:

1️⃣ COUNTING PHASE:
   codeCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
   aCode = 97 ('a'.charCodeAt(0))

   📋 Process each character:
   - 'e': code = 101, index = 101-97 = 4, codeCount[4]++
   - 'd': code = 100, index = 100-97 = 3, codeCount[3]++
   - 's': code = 115, index = 115-97 = 18, codeCount[18]++
   - 'a': code = 97, index = 97-97 = 0, codeCount[0]++
   - 'b': code = 98, index = 98-97 = 1, codeCount[1]++

   📊 Final count array:
   codeCount = [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
                a  b     d  e                                           s

2️⃣ RECONSTRUCTION PHASE:
   result = ""

   📋 Iterate through count array:
   - i=0: count=1, add 'a' once → result = "a"
   - i=1: count=1, add 'b' once → result = "ab"
   - i=2: count=0, skip
   - i=3: count=1, add 'd' once → result = "abd"
   - i=4: count=1, add 'e' once → result = "abde"
   - i=5-17: count=0, skip
   - i=18: count=1, add 's' once → result = "abdes"
   - i=19-25: count=0, skip

🏆 FINAL RESULT: "abdes"

─────────────────────────────────────────

📊 COMPLEX EXAMPLE:
s = "geeksforgeeks"

🔍 COUNTING PHASE:
   codeCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

   📋 Character frequencies:
   - 'g': 2 times → codeCount[6] = 2
   - 'e': 4 times → codeCount[4] = 4
   - 'k': 2 times → codeCount[10] = 2
   - 's': 2 times → codeCount[18] = 2
   - 'f': 1 time → codeCount[5] = 1
   - 'o': 1 time → codeCount[14] = 1
   - 'r': 1 time → codeCount[17] = 1

   📊 Final count array:
   codeCount = [0, 0, 0, 0, 4, 1, 2, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0]
                a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z

🔍 RECONSTRUCTION PHASE:
   result = ""
   - i=4: count=4, add 'e' 4 times → "eeee"
   - i=5: count=1, add 'f' 1 time → "eeeef"
   - i=6: count=2, add 'g' 2 times → "eeeefgg"
   - i=10: count=2, add 'k' 2 times → "eeeefggkk"
   - i=14: count=1, add 'o' 1 time → "eeeefggkko"
   - i=17: count=1, add 'r' 1 time → "eeeefggkkor"
   - i=18: count=2, add 's' 2 times → "eeeefggkkorss"

🏆 FINAL RESULT: "eeeefggkkorss"

🎯 VERIFICATION:
- Original: "geeksforgeeks"
- Sorted: "eeeefggkkorss"
- Character frequencies match: e=4, f=1, g=2, k=2, o=1, r=1, s=2 ✓
- Lexicographical order: e < f < g < k < o < r < s ✓

🔍 WHY THIS WORKS:
- Counting sort is perfect for limited range (26 characters)
- Lexicographical order achieved by iterating count array in order
- No comparisons needed - direct counting and reconstruction
- O(n) time complexity vs O(n log n) for comparison-based sorting

*/