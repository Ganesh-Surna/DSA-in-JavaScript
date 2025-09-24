/* Problem:
You are given an array arr[] of integers. Find the total count of subarrays with their sum equal to 0.

Example 1:
Input: arr[] = [0, 0, 5, 5, 0, 0]
Output: 6
Explanation: The 6 subarrays are [0], [0], [0], [0], [0,0], and [0,0].
- Single zeros: 4 subarrays
- Consecutive zeros: 2 subarrays [0,0]
- Total: 4 + 2 = 6

Example 2:
Input: arr[] = [6, -1, -3, 4, -2, 2, 4, 6, -12, -7]
Output: 4
Explanation: The 4 subarrays are:
- [-1, -3, 4]: sum = -1 + (-3) + 4 = 0
- [-2, 2]: sum = -2 + 2 = 0
- [2, 4, 6, -12]: sum = 2 + 4 + 6 + (-12) = 0
- [-1, -3, 4, -2, 2]: sum = -1 + (-3) + 4 + (-2) + 2 = 0

Example 3:
Input: arr[] = [0]
Output: 1
Explanation: The only subarray is [0].

Constraints:
1 ≤ n ≤ 10^6
-10^9 ≤ arr[i] ≤ 10^9

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n)
*/

// ✅ TC = O(n) --> Single pass through array
// ✅ SC = O(n) --> Hash map for prefix sum frequencies
function findSubarray(arr) {
    let pSum = 0;           // Prefix sum
    let freq = new Map();   // Frequency map for prefix sums
    let res = 0;            // Result counter
    
    // Base case: one way to have sum 0 before starting. This handles subarrays starting from index 0
    freq.set(0, 1);
    
    for (let num of arr) {
        pSum += num;        // Update prefix sum
        
        if (freq.has(pSum)) {
            // If we've seen this prefix sum before, we found zero sum subarrays
            res += freq.get(pSum);  // Add all previous occurrences
        }
        
        // Update frequency of current prefix sum
        freq.set(pSum, (freq.get(pSum) || 0) + 1);
    }
    
    return res;
}

// ✅ Test Cases
console.log(findSubarray([0, 0, 5, 5, 0, 0])); // 6
console.log(findSubarray([6, -1, -3, 4, -2, 2, 4, 6, -12, -7])); // 4
console.log(findSubarray([0])); // 1
console.log(findSubarray([1, -1, 0])); // 3
console.log(findSubarray([2, 3, -5, 0])); // 1

/*🎯 CORE IDEA: Instead of checking every possible subarray (O(n²)), we use PREFIX SUM technique with HASH MAP to efficiently count zero sum subarrays in O(n) time.

📋 STEP-BY-STEP FLOW:

1️⃣ PREFIX SUM CONCEPT:
   - If prefix sum at index i equals prefix sum at index j, then sum(arr[j+1:i]) = 0
   - This means subarray from j+1 to i has zero sum
   - We can count all such pairs to get total zero sum subarrays

2️⃣ HASH MAP FREQUENCY TRACKING:
   - Store frequency of each prefix sum encountered
   - When we see a prefix sum again, we found zero sum subarrays
   - Count = number of previous occurrences of same prefix sum

3️⃣ BASE CASE HANDLING:
   - Initialize freq[0] = 1 to handle subarrays starting from index 0
   - This accounts for cases where prefix sum itself is 0

4️⃣ ALGORITHM STEPS:
   a) Initialize prefix sum = 0, frequency map, result = 0
   b) Set freq[0] = 1 (base case)
   c) For each element:
      * Update prefix sum
      * If prefix sum seen before: add frequency to result
      * Increment frequency of current prefix sum

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) vs O(n²) for nested loops
2️⃣ PREFIX SUM: Mathematical property enables efficient counting
3️⃣ HASH MAP: O(1) lookup for frequency checking
4️⃣ SINGLE PASS: Process each element exactly once

💡 KEY INSIGHTS:

1️⃣ PREFIX SUM PROPERTY: If pSum[i] = pSum[j], then sum(arr[j+1:i]) = 0
2️⃣ FREQUENCY COUNTING: Each occurrence of same prefix sum creates zero sum subarrays
3️⃣ BASE CASE: freq[0] = 1 handles subarrays starting from index 0
4️⃣ CUMULATIVE COUNTING: Add all previous occurrences, not just 1

🎯 WHY PREFIX SUM WORKS?
- If we've seen prefix sum S before, and we see it again, then the subarray between those positions has sum 0
- This is because: pSum[current] - pSum[previous] = 0
- Therefore: sum(arr[previous+1:current]) = 0

🎯 ALGORITHM INTUITION:
Think of it as tracking "running totals" and looking for when we return to a previous total.
When we do, the elements we added since that previous total must sum to zero.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [6, -1, -3, 4, -2, 2, 4, 6, -12, -7]     (n=10)

🎯 GOAL: Count zero sum subarrays!

🔍 STEP-BY-STEP PROCESS:

📋 Initialize:
pSum = 0, freq = {0: 1}, res = 0

📋 Process each element:

ITERATION 0: num = 6
pSum = 0 + 6 = 6
freq.has(6) = false
freq = {0: 1, 6: 1}
res = 0

ITERATION 1: num = -1
pSum = 6 + (-1) = 5
freq.has(5) = false
freq = {0: 1, 6: 1, 5: 1}
res = 0

ITERATION 2: num = -3
pSum = 5 + (-3) = 2
freq.has(2) = false
freq = {0: 1, 6: 1, 5: 1, 2: 1}
res = 0

ITERATION 3: num = 4
pSum = 2 + 4 = 6
freq.has(6) = true! (seen at iteration 0)
res = 0 + 1 = 1
freq = {0: 1, 6: 2, 5: 1, 2: 1}

📊 Zero sum subarray found: arr[1:3] = [-1, -3, 4] (sum = 0)

ITERATION 4: num = -2
pSum = 6 + (-2) = 4
freq.has(4) = false
freq = {0: 1, 6: 2, 5: 1, 2: 1, 4: 1}
res = 1

ITERATION 5: num = 2
pSum = 4 + 2 = 6
freq.has(6) = true! (seen at iterations 0 and 3)
res = 1 + 2 = 3
freq = {0: 1, 6: 3, 5: 1, 2: 1, 4: 1}

📊 Zero sum subarrays found:
- arr[1:5] = [-1, -3, 4, -2, 2] (sum = 0)
- arr[4:5] = [-2, 2] (sum = 0)

ITERATION 6: num = 4
pSum = 6 + 4 = 10
freq.has(10) = false
freq = {0: 1, 6: 3, 5: 1, 2: 1, 4: 1, 10: 1}
res = 3

ITERATION 7: num = 6
pSum = 10 + 6 = 16
freq.has(16) = false
freq = {0: 1, 6: 3, 5: 1, 2: 1, 4: 1, 10: 1, 16: 1}
res = 3

ITERATION 8: num = -12
pSum = 16 + (-12) = 4
freq.has(4) = true! (seen at iteration 4)
res = 3 + 1 = 4
freq = {0: 1, 6: 3, 5: 1, 2: 1, 4: 2, 10: 1, 16: 1}

📊 Zero sum subarray found: arr[5:8] = [2, 4, 6, -12] (sum = 0)

ITERATION 9: num = -7
pSum = 4 + (-7) = -3
freq.has(-3) = false
freq = {0: 1, 6: 3, 5: 1, 2: 1, 4: 2, 10: 1, 16: 1, -3: 1}
res = 4

🏆 FINAL RESULT: res = 4

🎯 VERIFICATION:
1. arr[1:3] = [-1, -3, 4] → sum = 0 ✓
2. arr[1:5] = [-1, -3, 4, -2, 2] → sum = 0 ✓
3. arr[4:5] = [-2, 2] → sum = 0 ✓
4. arr[5:8] = [2, 4, 6, -12] → sum = 0 ✓

─────────────────────────────────────────

📊 SIMPLE EXAMPLE:
arr = [0, 0, 5, 5, 0, 0]     (n=6)

🔍 Process:
- i=0: pSum=0, freq.has(0)=true → res=1, freq={0:2}
- i=1: pSum=0, freq.has(0)=true → res=3, freq={0:3}
- i=2: pSum=5, freq.has(5)=false → res=3, freq={0:3, 5:1}
- i=3: pSum=10, freq.has(10)=false → res=3, freq={0:3, 5:1, 10:1}
- i=4: pSum=10, freq.has(10)=true → res=4, freq={0:3, 5:1, 10:2}
- i=5: pSum=10, freq.has(10)=true → res=6, freq={0:3, 5:1, 10:3}

🏆 FINAL RESULT: 6

🎯 VERIFICATION:
- Single zeros: [0], [0], [0], [0] → 4 subarrays
- Consecutive zeros: [0,0], [0,0] → 2 subarrays
- Total: 6 ✓

🔍 WHY THIS WORKS:
1️⃣ PREFIX SUM property enables efficient zero sum detection
2️⃣ HASH MAP provides O(1) frequency lookup and update
3️⃣ FREQUENCY COUNTING accounts for multiple occurrences
4️⃣ BASE CASE handles subarrays starting from index 0

💡 KEY INSIGHT:
We don't need to check every subarray - we can use the mathematical property
that equal prefix sums indicate zero sum subarrays between them!

🎯 TIME COMPLEXITY ANALYSIS:
- Single pass through array: O(n)
- Hash map operations: O(1) per operation
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Hash map storage: O(n) - at most n distinct prefix sums
- Other variables: O(1)
- Total: O(n)

🎯 MATHEMATICAL PROOF:
For subarray arr[i:j] to have sum 0:
sum(arr[i:j]) = 0
⟺ prefixSum[j] - prefixSum[i-1] = 0
⟺ prefixSum[j] = prefixSum[i-1]

This proves that equal prefix sums indicate zero sum subarrays!

🎯 EDGE CASES HANDLED:
- Single element arrays: [0] → 1 subarray
- All zeros: [0, 0, 0] → 6 subarrays
- No zero sums: [1, 2, 3] → 0 subarrays
- Mixed cases: [1, -1, 0] → 3 subarrays

*/
