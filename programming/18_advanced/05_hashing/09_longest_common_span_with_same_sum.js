/* Problem:
Given two arrays arr[] and brr[] of same size n, find the length of the longest common span with same sum in both arrays.

A common span with same sum means there exists a subarray in both arrays such that:
- The subarrays have the same starting and ending indices
- The sum of elements in both subarrays is equal

Example 1:
Input:
arr[] = [0, 1, 0, 0, 0, 0]
brr[] = [1, 0, 1, 0, 0, 1]
Output: 4
Explanation: 
- Subarray from index 1 to 4: arr[1:4] = [1,0,0,0], sum = 1
- Subarray from index 1 to 4: brr[1:4] = [0,1,0,0], sum = 1
- Both have same sum (1) and length 4

Example 2:
Input:
arr[] = [0, 1, 0, 1, 1, 1, 1]
brr[] = [1, 1, 1, 1, 1, 0, 1]
Output: 6
Explanation:
- Subarray from index 0 to 5: arr[0:5] = [0,1,0,1,1,1], sum = 4
- Subarray from index 0 to 5: brr[0:5] = [1,1,1,1,1,0], sum = 4
- Both have same sum (4) and length 6

Example 3:
Input:
arr[] = [0, 0, 0]
brr[] = [1, 1, 1]
Output: 0
Explanation: No common span with same sum exists.

Constraints:
1 ≤ n ≤ 10^5
-10^9 ≤ arr[i], brr[i] ≤ 10^9

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n)
*/

// ✅ TC = O(n) --> Single pass with hash map
// ✅ SC = O(n) --> Hash map for prefix sums
function longestCommonSubarrWithSameSum(arr, brr){
    let n = arr.length // arr & brr with same lengths
    
    // 1. Compute Difference array
    let diff = []
    for(let i=0; i<n; i++){
        diff[i] = arr[i] - brr[i]
    }
    
    // 2. Find length of longest subarray with zero sum in diff array
    let pSum = 0;
    let pSumMap = new Map()
    let maxLen = 0;
    
    for(let i=0; i<n; i++){
        pSum += diff[i]
        
        // If prefix sum is 0, subarray from 0 to i has sum 0
        if(pSum === 0){
            maxLen = i+1
        }
        
        // Store first occurrence of each prefix sum
        if(pSumMap.has(pSum) === false){
            pSumMap.set(pSum, i)
        }
        // If we've seen this prefix sum before, then the subarray between previous_index+1 and current index has zero sum in diff array (i.e., equal sum in arr and brr)
        if(pSumMap.has(pSum)){
            maxLen = Math.max(maxLen, i - pSumMap.get(pSum))
        }
    }
    
    return maxLen
}

// ✅ Test Cases
let arr = [0, 1, 0, 0, 0, 0], brr = [1, 0, 1, 0, 0, 1]; // 4
arr = [0, 1, 0, 1, 1, 1, 1], brr=[1, 1, 1, 1, 1, 0, 1]; // 6
arr = [0, 0, 0], brr=[1, 1, 1]; // 0
arr = [0, 0, 1, 0], brr=[1, 1, 1, 1]; // 1
console.log(longestCommonSubarrWithSameSum(arr, brr))

/*🎯 CORE IDEA: Instead of checking every possible subarray (O(n²)), we use a MATHEMATICAL TRANSFORMATION and HASH MAP to efficiently find the longest common span with same sum.

📋 STEP-BY-STEP FLOW:

1️⃣ MATHEMATICAL TRANSFORMATION:
   - Create difference array: diff[i] = arr[i] - brr[i]
   - Key insight: If sum(arr[i:j]) = sum(brr[i:j]), then sum(diff[i:j]) = 0
   - This transforms our problem to: "Find longest subarray with zero sum"

2️⃣ ZERO SUM SUBARRAY TECHNIQUE:
   - Use prefix sum approach with hash map
   - If prefix sum at index i equals prefix sum at index j, then sum(arr[j+1:i]) = 0
   - Store first occurrence of each prefix sum in hash map

3️⃣ ALGORITHM STEPS:
   a) Compute difference array: diff[i] = arr[i] - brr[i]
   b) Initialize prefix sum = 0, hash map, maxLen = 0
   c) For each element in diff array:
      * Add to prefix sum
      * If prefix sum = 0: subarray from 0 to i has sum 0
      * If prefix sum seen before: subarray from (first occurrence + 1) to i has sum 0
      * Store first occurrence of each prefix sum

4️⃣ HASH MAP OPTIMIZATION:
   - Store first occurrence of each prefix sum
   - When we see same prefix sum again, we found a zero sum subarray
   - Length = current_index - first_occurrence_index

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) vs O(n²) for naive approach
2️⃣ MATHEMATICAL INSIGHT: Transform to zero sum subarray problem
3️⃣ HASH MAP: Enables O(1) lookup for prefix sums
4️⃣ SINGLE PASS: Process array once with linear time

💡 KEY INSIGHTS:

1️⃣ TRANSFORMATION: sum(arr[i:j]) = sum(brr[i:j]) ⟺ sum(diff[i:j]) = 0
2️⃣ PREFIX SUM: If pSum[i] = pSum[j], then sum(arr[j+1:i]) = 0
3️⃣ HASH MAP: Store first occurrence for maximum length calculation
4️⃣ ZERO SUM: Special case when prefix sum equals 0

🎯 MATHEMATICAL PROOF:
For subarray arr[i:j] and brr[i:j] to have same sum:
sum(arr[i:j]) = sum(brr[i:j])
⟺ sum(arr[i:j]) - sum(brr[i:j]) = 0
⟺ sum(arr[i:j] - brr[i:j]) = 0
⟺ sum(diff[i:j]) = 0

This proves our transformation is correct!
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [0, 1, 0, 0, 0, 0]     (n=6)
brr = [1, 0, 1, 0, 0, 1]     (n=6)

🎯 GOAL: Find longest common span with same sum!

🔍 STEP-BY-STEP PROCESS:

1️⃣ DIFFERENCE ARRAY COMPUTATION:
diff = []
for i=0 to 5:
- diff[0] = arr[0] - brr[0] = 0 - 1 = -1
- diff[1] = arr[1] - brr[1] = 1 - 0 = 1
- diff[2] = arr[2] - brr[2] = 0 - 1 = -1
- diff[3] = arr[3] - brr[3] = 0 - 0 = 0
- diff[4] = arr[4] - brr[4] = 0 - 0 = 0
- diff[5] = arr[5] - brr[5] = 0 - 1 = -1

📊 diff = [-1, 1, -1, 0, 0, -1]

2️⃣ ZERO SUM SUBARRAY DETECTION:
pSum = 0, pSumMap = {}, maxLen = 0

📋 Process each element:

ITERATION 0: i=0, diff[0] = -1
pSum = 0 + (-1) = -1
pSum ≠ 0, pSumMap doesn't have -1
pSumMap = {-1: 0}
maxLen = 0

ITERATION 1: i=1, diff[1] = 1
pSum = -1 + 1 = 0
pSum = 0 → subarray from 0 to 1 has sum 0
maxLen = max(0, 1+1) = 2
pSumMap = {-1: 0, 0: 1}

ITERATION 2: i=2, diff[2] = -1
pSum = 0 + (-1) = -1
pSum ≠ 0, pSumMap has -1 (at index 0)
maxLen = max(2, 2-0) = 2
pSumMap = {-1: 0, 0: 1}

ITERATION 3: i=3, diff[3] = 0
pSum = -1 + 0 = -1
pSum ≠ 0, pSumMap has -1 (at index 0)
maxLen = max(2, 3-0) = 3
pSumMap = {-1: 0, 0: 1}

ITERATION 4: i=4, diff[4] = 0
pSum = -1 + 0 = -1
pSum ≠ 0, pSumMap has -1 (at index 0)
maxLen = max(3, 4-0) = 4
pSumMap = {-1: 0, 0: 1}

ITERATION 5: i=5, diff[5] = -1
pSum = -1 + (-1) = -2
pSum ≠ 0, pSumMap doesn't have -2
pSumMap = {-1: 0, 0: 1, -2: 5}
maxLen = 4

🏆 FINAL RESULT: maxLen = 4

🎯 VERIFICATION:
- diff[1:4] = [1, -1, 0, 0], sum = 1-1+0+0 = 0 ✓
- This means arr[1:4] and brr[1:4] have same sum
- arr[1:4] = [1, 0, 0, 0], sum = 1
- brr[1:4] = [0, 1, 0, 0], sum = 1 ✓
- Length = 4 ✓

─────────────────────────────────────────

📊 COMPLEX EXAMPLE:
arr = [0, 1, 0, 1, 1, 1, 1]     (n=7)
brr = [1, 1, 1, 1, 1, 0, 1]     (n=7)

🔍 DIFFERENCE ARRAY:
diff = [0-1, 1-1, 0-1, 1-1, 1-1, 1-0, 1-1]
diff = [-1, 0, -1, 0, 0, 1, 0]

🔍 ZERO SUM DETECTION:
pSum = 0, pSumMap = {}, maxLen = 0

📋 Key iterations:
- i=0: pSum = -1, maxLen = 0
- i=1: pSum = -1, maxLen = max(0, 1-0) = 1
- i=2: pSum = -2, maxLen = 1
- i=3: pSum = -2, maxLen = max(1, 3-2) = 1
- i=4: pSum = -2, maxLen = max(1, 4-2) = 2
- i=5: pSum = -1, maxLen = max(2, 5-0) = 5
- i=6: pSum = -1, maxLen = max(5, 6-0) = 6

🏆 FINAL RESULT: maxLen = 6

🎯 VERIFICATION:
- diff[0:5] = [-1, 0, -1, 0, 0, 1], sum = -1+0-1+0+0+1 = -1
- Wait, let me recalculate...
- Actually, the maximum occurs at i=6 with pSum = -1
- diff[1:6] = [0, -1, 0, 0, 1, 0], sum = 0-1+0+0+1+0 = 0 ✓
- arr[1:6] = [1, 0, 1, 1, 1, 1], sum = 5
- brr[1:6] = [1, 1, 1, 1, 0, 1], sum = 5 ✓
- Length = 6 ✓

🔍 WHY THIS WORKS:
1️⃣ MATHEMATICAL TRANSFORMATION converts complex problem to zero sum subarray
2️⃣ PREFIX SUM with hash map enables O(n) solution
3️⃣ FIRST OCCURRENCE storage ensures maximum length calculation
4️⃣ SINGLE PASS through array maintains linear time complexity

💡 KEY INSIGHT:
We don't need to check every possible subarray - the mathematical transformation
allows us to use the efficient zero sum subarray technique!

*/