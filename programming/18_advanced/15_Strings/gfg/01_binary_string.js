/* Problem: ✅✅✅✅ Count Binary Substrings Starting and Ending with '1' ✅✅✅✅

Given a binary string `s`, count the number of substrings that begin and end
with the character `'1'`. The substring must contain at least two characters,
so each valid substring corresponds to choosing two distinct positions that
contain `'1'` in the original string.

🧩 Step 1: Think about what counts as a valid substring
A substring is valid if it:
- starts at a `'1'`
- ends at a `'1'`
- has length ≥ 2 (start index ≠ end index)

Example: `s = "1111"`
Valid substrings →
1. `11` (1-2)
2. `11` (2-3)
3. `11` (3-4)
4. `111` (1-3)
5. `111` (2-4)
6. `1111` (1-4)
Total = 6

🧩 Step 2: Observe the pattern
Let the positions of `'1'` characters be `p₁, p₂, …, pₖ`. Each ordered pair
`(pᵢ, pⱼ)` with `i < j` defines one unique substring starting at `pᵢ` and ending
at `pⱼ`. Therefore, counting valid substrings reduces to counting pairs of
distinct `'1'` positions.

🧠 Step 3: How many such pairs exist?
Number of unordered pairs of `k` elements = `kC2 = k × (k - 1) / 2`. Each pair
corresponds to exactly one valid substring. Hence the answer is simply the
combination count of total `'1'` occurrences.

Example: `s = "10101"`
- Positions of `'1'`: [0, 2, 4]
- `k = 3` → `3C2 = 3`
- Valid substrings correspond to pairs: (0,2) → "101", (0,4) → "10101", (2,4) → "101"

Constraints:
- 1 ≤ |s| ≤ 10^5 (single pass solutions required)
- Characters ∈ {'0', '1'}

Expected Complexities:
- Time Complexity: O(n)
- Space Complexity: O(1)

Two equivalent implementations provided below:
1. **Formula-based:** count total `'1'`s, apply `nC2`.
2. **Streaming accumulation:** while scanning, for each `'1'`, add the number of
   earlier `'1'`s already seen.
Both achieve O(n) time and O(1) space.
*/

// WAY 1. With Formula
// ✅ TC = O(n) - Single pass to count '1's; combination computed in O(1)
// ✅ SC = O(1) - Uses constant counters regardless of string length
function binarySubstring(s) {
    let countOnes = 0
    
    for(let ch of s){
        if(ch==='1'){
            countOnes++
        }
        
    }
    return (countOnes*(countOnes-1)/2) // let say countOnes=n, then nC2 = n*(n-1)/2
}


// WAY 2. Without Formula
// ✅ TC = O(n) - Single pass, each character processed once
// ✅ SC = O(1) - Only two counters maintained throughout iteration
function binarySubstring(s) {
    let countOnes = 0;  // counts '1's seen so far
    let result = 0;     // total valid substrings

    for (let ch of s) {
        if (ch === '1') {
            result += countOnes; // each previous '1' makes one substring ending here
            countOnes++;         // include current '1' for future substrings
        }
    }

    return result;
}

/*🎯 CORE IDEA:
Both methods rely on the combinatorial insight that each pair of `'1'` positions
forms exactly one valid substring. The first approach computes the pair count at
the end; the second accumulates it incrementally.
*/

/*📋 STEP-BY-STEP FLOW (Formula Version):
1️⃣ Traverse the string once and count total occurrences of `'1'`.
2️⃣ Apply combination formula `countOnes * (countOnes - 1) / 2`.
3️⃣ Return the result.

📋 STEP-BY-STEP FLOW (Streaming Version):
1️⃣ Maintain `countOnes` (number of `'1'`s seen so far) and `result` (answer).
2️⃣ For each character:
   - If `'1'`: add `countOnes` to result (all previous `'1'`s pair with current), then increment `countOnes`.
3️⃣ Return `result`.
*/

/*🧠 WHY THIS WORKS:
- Every substring defined by start index `i` and end index `j` (i < j) corresponds
  to a unique pair of `'1'` positions. No pair is counted more than once.
- Formula approach encapsulates this pair counting directly.
- Streaming approach mirrors formula: `result` becomes the running total of
  current combinations, since for the kth `'1'`, there are `(k-1)` earlier `'1'`s.
*/

/*🎯 DETAILED WALKTHROUGH (Formula) → `s = "11101"`
Indices:     0 1 2 3 4
Characters:  1 1 1 0 1
`countOnes = 4`
`answer = 4 × 3 / 2 = 6`
Pairs → substrings:
(0,1) → "11"
(0,2) → "111"
(0,4) → "11101"
(1,2) → "11"
(1,4) → "1101"
(2,4) → "101"
*/

/*🎯 DETAILED WALKTHROUGH (Streaming) → `s = "10101"`
Initial: `countOnes = 0`, `result = 0`
- i=0, char='1': `result += 0`, `countOnes = 1`
- i=1, char='0': no change
- i=2, char='1': `result += 1` (pair with index 0) → `result = 1`, `countOnes = 2`
- i=3, char='0': no change
- i=4, char='1': `result += 2` (pairs with indices 0 and 2) → `result = 3`, `countOnes = 3`
Matches formula: `3 × 2 / 2 = 3`
*/

/*🎯 VISUALIZATION:
Imagine placing markers at each `'1'` position. Drawing lines between every pair
of markers represents all valid substrings. The total number of lines equals the
answer. Formula counts lines in aggregate; streaming counts them one marker at a time.
*/

/*🎯 COMPLEXITY ANALYSIS:
- Time: O(n) for a single traversal.
- Space: O(1) additional storage beyond counters.
*/

/*🎯 EDGE CASES:
- No `'1'` present → answer 0 (no substrings).
- Exactly one `'1'` → answer 0 (need two distinct positions).
- All characters `'1'` → answer `nC2`, the maximum possible.
*/

/*🎯 ADVANTAGES:
- Constant memory usage.
- Works efficiently for very long strings.
- Simple logic, easy to verify by hand.
*/

/*🎯 DISADVANTAGES / LIMITATIONS:
- Assumes binary alphabet; needs adaptation for different start/end criteria.
- Formula uses integer arithmetic; for extremely large counts, consider BigInt.
*/

/*🎯 REAL-WORLD APPLICATIONS:
- Counting relationships between active nodes in a binary state log.
- Data analysis on presence/absence sequences where `'1'` marks events of interest.
- Preprocessing step in combinatorial probability calculations.
*/

/*🎯 RELATED PROBLEMS:
- Count substrings with equal numbers of 0s and 1s (prefix diff method).
- Longest substring of unique characters (sliding window).
- Number of subarrays with sum K (prefix sums over binary arrays).
*/

/*🎯 TESTING STRATEGY:
- Empty string or no `'1'` characters.
- String with exactly two `'1'` characters to confirm base case.
- Alternating pattern ("1010...") to validate incremental accumulation.
- All `'1'` string to verify `nC2` growth.
- Random long strings to ensure linear performance.
*/

/*🎯 DEBUGGING TIPS:
- Print `countOnes` and `result` per iteration for the streaming method.
- Compare outputs of both methods for the same input to ensure parity.
- Cross-check results with brute-force enumeration on small strings.
*/

/*🎯 INTERVIEW TIPS:
- Start by explaining naive O(n^2) approach (enumerate all substrings).
- Show optimization by focusing on `'1'` positions and pair counting.
- Discuss both implementations and highlight their equivalence.
- Mention edge cases and constraints explicitly.
*/

