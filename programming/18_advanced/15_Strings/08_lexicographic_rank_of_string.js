/* Problem: ✅✅✅✅ Lexicographic Rank of a String ✅✅✅✅

Given a string `s` of length `n`, compute its lexicographic rank among all
permutations of its characters sorted in dictionary order. Rank starts at 1.

For example, `"abc"`, `"acb"`, `"bac"`, `"bca"`, `"cab"`, `"cba"` have ranks 1 through 6 respectively.

Requirements:
- Assume all characters are unique (current implementation). If duplicates exist,
  the algorithm must be modified (not covered here).
- Works with ASCII set (256 possible character codes).
- Factorial values fit within standard number range for `n ≤ 20` approximately; for
  larger `n`, consider using big integers.

Example:
Input: `s = "STRING"`
Output: `598`
Explanation provided in detailed walkthrough below.

Constraints:
- 1 ≤ |s| ≤ 20 for safe factorial computation in 64-bit integer
- ASCII characters; extendable to Unicode by increasing frequency array size

Expected Complexities:
- Time Complexity: O(n + alphabet_size)
- Space Complexity: O(alphabet_size)
*/

// ✅ TC = O(n)
// ✅ SC = O(1)
function lexicographicRankOfString(s) {
    let n = s.length;
    let fact = factorial(n); // Total permutations of all characters
    
    // Step 1: Count frequency of each character (ASCII based)
    let freq = new Array(256).fill(0);
    for (let i = 0; i < n; i++) { // O(n)
        freq[s.charCodeAt(i)]++;
    }

    // Step 2: Build prefix sum of frequencies
    // freqPreSum[i] → total count of characters ≤ ASCII(i)
    let freqPreSum = freq;
    for (let i = 1; i < 256; i++) { // O(256) = O(1)
        freqPreSum[i] += freqPreSum[i - 1];
    }

    let rank = 1; // Rank starts from 1 (not 0)

    // Step 3: For each character in the string
    for (let i = 0; i < n; i++) { // O(n)
        // Each step reduces available characters → divide factorial
        fact = fact / (n - i);

        // Count how many smaller characters are still available
        let smallerChars = freqPreSum[s.charCodeAt(i) - 1]; // 

        // Add the number of permutations that would come before the current prefix
        rank += smallerChars * fact;

        // Step 4: "Use up" the current character
        // Meaning — for later positions, this character is no longer available
        for (let j = s.charCodeAt(i); j < 256; j++) { // O(256) = O(1)
            freqPreSum[j]--;
        }
    }

    return rank;
}
function factorial(n) {
    let f = 1;
    for (let i = n; i > 1; i--) {
        f = f * i;
    }
    return f;
}


// Example outputs
console.log(lexicographicRankOfString('abc'));   // 1
console.log(lexicographicRankOfString('acb'));   // 2
console.log(lexicographicRankOfString('bac'));   // 3
console.log(lexicographicRankOfString('bca'));   // 4
console.log(lexicographicRankOfString('cab'));   // 5
console.log(lexicographicRankOfString('cba'));   // 6
console.log(lexicographicRankOfString('string')); // 598

/*🎯 CORE IDEA:
For each position `i`, count permutations starting with all characters smaller
than `s[i]` that are still unused. Multiply the count of smaller characters by
the number of permutations of remaining characters (`(n-i-1)!`) and add to rank.
*/

/*🎯 STEP-BY-STEP FLOW:
1️⃣ Compute factorial of `n` (total permutations).
2️⃣ Build frequency array and its prefix sum to quickly know how many characters
    are smaller than any given character.
3️⃣ Iterate over each character in the string:
   - Reduce `fact` by dividing by remaining length.
   - Use prefix sums to count how many smaller characters are still unused.
   - Add their contribution to rank.
   - Update prefix sums to remove current character.
4️⃣ Rank starts at 1, return final value.
*/

/*🎯 DETAILED WALKTHROUGH (Example: `s = "STRING"`)
Characters sorted: `G I N R S T` (lexicographic order)
Length `n = 6`, so total permutations = 6! = 720.

Step-by-step:
- i = 0, char = 'S'
  Remaining length = 6 → fact = 720 / 6 = 120
  Characters smaller than 'S' (unused): 'G', 'I', 'N', 'R'
  Count = 4 → contribution = 4 * 120 = 480
  Rank = 1 + 480 = 481
  Remove 'S' from availability

- i = 1, char = 'T'
  Remaining length = 5 → fact = 120 / 5 = 24
  Characters smaller than 'T': 'G', 'I', 'N', 'R' (still available)
  Count = 4 → contribution = 4 * 24 = 96
  Rank = 481 + 96 = 577
  Remove 'T'

- i = 2, char = 'R'
  Remaining length = 4 → fact = 24 / 4 = 6
  Smaller unused chars: 'G', 'I', 'N'
  Count = 3 → contribution = 3 * 6 = 18
  Rank = 577 + 18 = 595
  Remove 'R'

- i = 3, char = 'I'
  Remaining length = 3 → fact = 6 / 3 = 2
  Smaller unused chars: 'G'
  Count = 1 → contribution = 1 * 2 = 2
  Rank = 595 + 2 = 597
  Remove 'I'

- i = 4, char = 'N'
  Remaining length = 2 → fact = 2 / 2 = 1
  Smaller unused chars: 'G'
  Count = 1 → contribution = 1 * 1 = 1
  Rank = 597 + 1 = 598
  Remove 'N'

- i = 5, char = 'G'
  Remaining length = 1 → fact = 1 / 1 = 1
  No smaller unused chars → contribution = 0
  Rank stays 598

Final rank = 598 ✅
*/

/*🎯 VISUALIZATION:
Sorted permutations of "STRING" begin with:
G I N R S T
G I N R T S
 ... (many permutations) ...
Eventually reach S T R I N G, which is the 598th entry.
*/

/*🎯 COMPLEXITY ANALYSIS:
- Time: O(n + alphabet_size). Alphabet size fixed (256) → O(n).
- Space: O(alphabet_size) for frequency arrays.
- Factorial operations per character: O(1) (precomputed cumulatively).
*/

/*🎯 EDGE CASES:
- Empty string → rank conventionally 1.
- Repeated characters: algorithm needs adjustment (divide by factorial of duplicates).
- Large n: factorial may overflow standard number; use BigInt or modular arithmetic.
*/

/*🎯 REAL-WORLD APPLICATIONS:
- Ranking permutations in combinatorial enumeration.
- Encoding permutations as integers (factorial number system).
- Generating lexicographic permutations efficiently.
*/

/*🎯 RELATED PROBLEMS:
- Unrank permutation (given rank, produce permutation).
- Next lexicographic permutation.
- Factorial number system conversions.
*/

/*🎯 TESTING STRATEGY:
- Simple strings (abc, acb, etc.).
- Random strings with unique characters.
- Edge cases: single char, empty string.
- Strings nearing factorial overflow thresholds.
*/

/*🎯 DEBUGGING TIPS:
- Print `freqPreSum` and `fact` per iteration for verification.
- Ensure characters are counted correctly and removed from availability.
- Check integer division vs floating arithmetic when `fact` shrinks.
*/

/*🎯 INTERVIEW TIPS:
- Begin with brute-force idea (generate all permutations) and explain impracticality.
- Introduce factorials for remaining positions and prefix counts to avoid enumeration.
- Mention adjustments needed for repeated characters (divide by factorial of duplicates).
- Provide step-by-step example to demonstrate understanding (like `"STRING"`).
*/
