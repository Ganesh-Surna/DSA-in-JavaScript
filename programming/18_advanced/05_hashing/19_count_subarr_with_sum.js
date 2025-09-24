/* Problem:
You are given an array arr[] of integers and a target sum. Find the total count of subarrays with their sum equal to the target sum.

Example 1:
Input: arr[] = [10, 2, -2, -20, 10], target = -10
Output: 3
Explanation: The 3 subarrays are:
- [10, 2, -2, -20]: sum = 10 + 2 + (-2) + (-20) = -10
- [2, -2, -20, 10]: sum = 2 + (-2) + (-20) + 10 = -10
- [-20, 10]: sum = (-20) + 10 = -10

Example 2:
Input: arr[] = [1, 1, 1], target = 2
Output: 2
Explanation: The 2 subarrays are:
- [1, 1] (first two elements): sum = 1 + 1 = 2
- [1, 1] (last two elements): sum = 1 + 1 = 2

Example 3:
Input: arr[] = [1, 2, 3], target = 3
Output: 2
Explanation: The 2 subarrays are:
- [1, 2]: sum = 1 + 2 = 3
- [3]: sum = 3 = 3

Example 4:
Input: arr[] = [1, 2, 3], target = 5
Output: 1
Explanation: The 1 subarray is:
- [2, 3]: sum = 2 + 3 = 5

Constraints:
1 ≤ n ≤ 10^6
-10^9 ≤ arr[i] ≤ 10^9
-10^9 ≤ target ≤ 10^9

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n)
*/

// ✅ TC = O(n) --> Single pass through array
// ✅ SC = O(n) --> Hash map for prefix sum frequencies
function subArraySum(arr, tar) {
    let pSum = 0;           // Prefix sum
    let pSumFreq = new Map(); // Frequency map for prefix sums
    let res = 0;            // Result counter
    
    // Initialize with prefix sum 0 having frequency 1
    // This handles subarrays starting from index 0
    pSumFreq.set(0, 1);
    
    for (let i = 0; i < arr.length; i++) {
        pSum += arr[i];     // Update prefix sum
        
        // Check if (pSum - tar) exists and add its frequency to result
        if (pSumFreq.has(pSum - tar)) {
            res += pSumFreq.get(pSum - tar);
        }
        
        // Update the frequency of current prefix sum
        pSumFreq.set(pSum, (pSumFreq.get(pSum) || 0) + 1);
    }
    
    return res;
}

// ✅ Test Cases
console.log(subArraySum([10, 2, -2, -20, 10], -10)); // 3
console.log(subArraySum([1, 1, 1], 2)); // 2
console.log(subArraySum([1, 2, 3], 3)); // 2
console.log(subArraySum([1, 2, 3], 5)); // 1
console.log(subArraySum([1, 2, 3], 6)); // 1
console.log(subArraySum([1, 2, 3], 7)); // 0

/*🎯 CORE IDEA: Instead of checking every possible subarray (O(n²)), we use PREFIX SUM technique with HASH MAP to efficiently count subarrays with given sum in O(n) time.

📋 STEP-BY-STEP FLOW:

1️⃣ PREFIX SUM CONCEPT:
   - If prefix sum at index i minus target equals prefix sum at index j, then sum(arr[j+1:i]) = target
   - This means subarray from j+1 to i has sum equal to target
   - We can count all such pairs to get total subarrays with given sum

2️⃣ HASH MAP FREQUENCY TRACKING:
   - Store frequency of each prefix sum encountered
   - When we see (pSum - target), we found target sum subarrays
   - Count = number of previous occurrences of (pSum - target)

3️⃣ BASE CASE HANDLING:
   - Initialize freq[0] = 1 to handle subarrays starting from index 0
   - This accounts for cases where prefix sum itself equals target

4️⃣ ALGORITHM STEPS:
   a) Initialize prefix sum = 0, frequency map, result = 0
   b) Set freq[0] = 1 (base case)
   c) For each element:
      * Update prefix sum
      * If (pSum - target) seen before: add frequency to result
      * Increment frequency of current prefix sum

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) vs O(n²) for nested loops
2️⃣ PREFIX SUM: Mathematical property enables efficient counting
3️⃣ HASH MAP: O(1) lookup for frequency checking
4️⃣ SINGLE PASS: Process each element exactly once

💡 KEY INSIGHTS:

1️⃣ PREFIX SUM PROPERTY: If pSum[i] - target = pSum[j], then sum(arr[j+1:i]) = target
2️⃣ FREQUENCY COUNTING: Each occurrence of (pSum - target) creates target sum subarrays
3️⃣ BASE CASE: freq[0] = 1 handles subarrays starting from index 0
4️⃣ CUMULATIVE COUNTING: Add all previous occurrences, not just 1

🎯 WHY PREFIX SUM WORKS?
- If we've seen prefix sum S before, and current prefix sum is S + target, then the subarray between those positions has sum = target
- This is because: pSum[current] - pSum[previous] = target
- Therefore: sum(arr[previous+1:current]) = target

🎯 ALGORITHM INTUITION:
Think of it as tracking "running totals" and looking for when current total minus target equals a previous total.
When we find such a case, the elements we added since that previous total must sum to the target.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [10, 2, -2, -20, 10], target = -10     (n=5)

🎯 GOAL: Count subarrays with sum = -10!

🔍 STEP-BY-STEP PROCESS:

📋 Initialize:
pSum = 0, pSumFreq = {0: 1}, res = 0

📋 Process each element:

ITERATION 0: i=0, arr[0] = 10
pSum = 0 + 10 = 10
pSumFreq.has(10 - (-10)) = pSumFreq.has(20) = false
pSumFreq = {0: 1, 10: 1}
res = 0

ITERATION 1: i=1, arr[1] = 2
pSum = 10 + 2 = 12
pSumFreq.has(12 - (-10)) = pSumFreq.has(22) = false
pSumFreq = {0: 1, 10: 1, 12: 1}
res = 0

ITERATION 2: i=2, arr[2] = -2
pSum = 12 + (-2) = 10
pSumFreq.has(10 - (-10)) = pSumFreq.has(20) = false
pSumFreq = {0: 1, 10: 2, 12: 1}
res = 0

ITERATION 3: i=3, arr[3] = -20
pSum = 10 + (-20) = -10
pSumFreq.has(-10 - (-10)) = pSumFreq.has(0) = true! (frequency = 1)
res = 0 + 1 = 1
pSumFreq = {0: 1, 10: 2, 12: 1, -10: 1}

📊 Target sum subarray found: arr[0:3] = [10, 2, -2, -20] (sum = -10)

ITERATION 4: i=4, arr[4] = 10
pSum = -10 + 10 = 0
pSumFreq.has(0 - (-10)) = pSumFreq.has(10) = true! (frequency = 2)
res = 1 + 2 = 3
pSumFreq = {0: 1, 10: 3, 12: 1, -10: 1}

📊 Target sum subarrays found:
- arr[1:4] = [2, -2, -20, 10] (sum = -10)
- arr[4:4] = [10] (sum = 10, but we're looking for -10... wait, let me recalculate)

🎯 CORRECTION: Let me trace this more carefully:

ITERATION 4: i=4, arr[4] = 10
pSum = -10 + 10 = 0
pSumFreq.has(0 - (-10)) = pSumFreq.has(10) = true! (frequency = 2)
res = 1 + 2 = 3

📊 Target sum subarrays found:
- arr[0:4] = [10, 2, -2, -20, 10] (sum = 0, but we need -10... let me recalculate)

🎯 ACTUAL CALCULATION:
arr[0:4] = [10, 2, -2, -20, 10] = 10 + 2 + (-2) + (-20) + 10 = 0
But we're looking for -10, not 0.

Let me recalculate the prefix sums:
- pSum[0] = 10
- pSum[1] = 12  
- pSum[2] = 10
- pSum[3] = -10
- pSum[4] = 0

When pSum[4] = 0, we look for pSum[4] - target = 0 - (-10) = 10
We've seen 10 at indices 0 and 2, so:
- arr[1:4] = [2, -2, -20, 10] = 2 + (-2) + (-20) + 10 = -10 ✓
- arr[3:4] = [-20, 10] = (-20) + 10 = -10 ✓

🏆 FINAL RESULT: res = 3

🎯 VERIFICATION:
1. arr[0:3] = [10, 2, -2, -20] → sum = -10 ✓
2. arr[1:4] = [2, -2, -20, 10] → sum = -10 ✓  
3. arr[3:4] = [-20, 10] → sum = -10 ✓

─────────────────────────────────────────

📊 SIMPLE EXAMPLE:
arr = [1, 1, 1], target = 2     (n=3)

🔍 Process:
- i=0: pSum=1, pSumFreq.has(1-2)=pSumFreq.has(-1)=false → res=0, pSumFreq={0:1, 1:1}
- i=1: pSum=2, pSumFreq.has(2-2)=pSumFreq.has(0)=true → res=1, pSumFreq={0:1, 1:1, 2:1}
- i=2: pSum=3, pSumFreq.has(3-2)=pSumFreq.has(1)=true → res=2, pSumFreq={0:1, 1:2, 2:1, 3:1}

🏆 FINAL RESULT: 2

🎯 VERIFICATION:
- arr[0:1] = [1, 1] → sum = 2 ✓
- arr[1:2] = [1, 1] → sum = 2 ✓

🔍 WHY THIS WORKS:
1️⃣ PREFIX SUM property enables efficient target sum detection
2️⃣ HASH MAP provides O(1) frequency lookup and update
3️⃣ FREQUENCY COUNTING accounts for multiple occurrences
4️⃣ BASE CASE handles subarrays starting from index 0

💡 KEY INSIGHT:
We don't need to check every subarray - we can use the mathematical property
that (pSum[i] - target) = pSum[j] indicates target sum subarrays between j+1 and i!

🎯 TIME COMPLEXITY ANALYSIS:
- Single pass through array: O(n)
- Hash map operations: O(1) per operation
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Hash map storage: O(n) - at most n distinct prefix sums
- Other variables: O(1)
- Total: O(n)

🎯 MATHEMATICAL PROOF:
For subarray arr[i:j] to have sum = target:
sum(arr[i:j]) = target
⟺ prefixSum[j] - prefixSum[i-1] = target
⟺ prefixSum[j] - target = prefixSum[i-1]

This proves that (pSum[j] - target) = pSum[i-1] indicates target sum subarrays!

🎯 EDGE CASES HANDLED:
- Single element arrays: [5], target=5 → 1 subarray
- No target sums: [1, 2, 3], target=7 → 0 subarrays
- Multiple occurrences: [1, 1, 1], target=2 → 2 subarrays
- Negative targets: [1, -1, 1], target=0 → 2 subarrays

🎯 COMPARISON WITH ZERO SUM:
- Zero sum: Look for pSum[i] = pSum[j] (same prefix sums)
- Target sum: Look for pSum[i] - target = pSum[j] (difference equals target)
- Both use same prefix sum + hash map technique!

*/