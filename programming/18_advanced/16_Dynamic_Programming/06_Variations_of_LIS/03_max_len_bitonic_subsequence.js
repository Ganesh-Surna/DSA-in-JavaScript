/* Problem: ✅✅✅✅ Maximum Length Bitonic Subsequence (Variation of LIS) ✅✅✅✅

Given an integer array `arr`, find the length of the longest bitonic subsequence.
A bitonic subsequence is a subsequence that first increases and then decreases.
It can also be strictly increasing, strictly decreasing, or have a single peak.

🎯 Goal: Find the length of the longest bitonic subsequence.

Key Insight: This is a variation of the Longest Increasing Subsequence (LIS)
problem. A bitonic subsequence has two parts:
1. Increasing part (from left to peak)
2. Decreasing part (from peak to right)

We combine LIS and LDS (Longest Decreasing Subsequence) to find the bitonic
subsequence. For each index i as the peak:
  Bitonic length = LIS ending at i + LDS starting at i - 1

Example 1:
Input: arr = [1, 11, 2, 10, 4, 5, 2, 1]
Output: 6
Explanation:
  - Bitonic subsequence: [1, 2, 10, 4, 2, 1]
  - Increasing part: [1, 2, 10] (ending at index 3)
  - Decreasing part: [10, 4, 2, 1] (starting at index 3)
  - Peak element: 10 (at index 3)
  - Length = 6

Example 2:
Input: arr = [12, 11, 40, 5, 3, 1]
Output: 5
Explanation:
  - Bitonic subsequence: [12, 40, 5, 3, 1]
  - Increasing part: [12, 40] (ending at index 2)
  - Decreasing part: [40, 5, 3, 1] (starting at index 2)
  - Peak element: 40 (at index 2)
  - Length = 5

Example 3:
Input: arr = [80, 60, 30, 40, 20, 10]
Output: 5
Explanation:
  - Bitonic subsequence: [80, 60, 30, 20, 10]
  - Increasing part: [80] (ending at index 0)
  - Decreasing part: [80, 60, 30, 20, 10] (starting at index 0)
  - Peak element: 80 (at index 0)
  - Length = 5

Constraints:
- 1 ≤ arr.length ≤ 1000
- -10^4 ≤ arr[i] ≤ 10^4

Expected Complexities:
Time Complexity: O(n²) where n = arr.length
Space Complexity: O(n) for the lis and lds arrays

⚠️ Note: This is a variation of the Longest Increasing Subsequence (LIS)
problem. We combine LIS (forward) and LDS (reverse) to find bitonic subsequences.

🧠 Core Idea:
- A bitonic subsequence has a peak element where it transitions from increasing
  to decreasing.
- For each index i as potential peak:
  - Find LIS ending at i (increasing part from left)
  - Find LDS starting at i (decreasing part to right)
  - Bitonic length = lis[i] + lds[i] - 1 (subtract 1 because peak is counted twice)
- The answer is the maximum bitonic length over all possible peaks.

📈 Algorithm Steps:
1. Build LIS array: lis[i] = length of LIS ending at index i (forward direction)
2. Build LDS array: lds[i] = length of LDS starting at index i (reverse direction)
3. For each index i, calculate bitonic length = lis[i] + lds[i] - 1
4. Return maximum bitonic length

🎯 Why This Approach?
- Optimal substructure: Bitonic subsequence = increasing part + decreasing part
- Combines two well-known problems: LIS and LDS
- Each index can be a peak, so we check all possibilities
- Guarantees optimal solution by exploring all peaks

💡 Key Insights:
- Bitonic subsequence = increasing part + decreasing part
- Peak element is counted in both LIS and LDS, so subtract 1
- LIS is built forward (ending at each index)
- LDS is built reverse (starting at each index)
- Final answer = max(lis[i] + lds[i] - 1) for all i
*/

// ✅ TC = O(n²) where n = arr.length
// ✅ SC = O(n) for the lis and lds arrays
function maxLenBitonicSubsequence(arr){
    let n = arr.length
    
    // lis[i] = length of Longest Increasing Subsequence ending at index i
    let lis = new Array(n).fill(1) // Longest Increasing Subsequence
    
    // lds[i] = length of Longest Decreasing Subsequence starting at index i
    let lds = new Array(n).fill(1) // Longest Decreasing Subsequence
    
    // Build LIS (forward direction)
    // lis[i] = length of Longest Increasing Subsequence ⭐ending at index i
    for(let i=1; i<n; i++){ // Start from i=1. Because (LIS[0] = 1) anyways
        for(let j=0; j<i; j++){
            if(arr[j] < arr[i]){
                lis[i] = Math.max(lis[i], lis[j]+1)
            }
        }
    }
    
    // Build LDS (reverse direction)
    // lds[i] = length of Longest Decreasing Subsequence ⭐starting at index i
    for(let i=n-2; i>=0; i--){ // Start from i=n-2. Because (LDS[n-1] = 1) anyways
        for(let j=n-1; j>i; j--){
            if(arr[j] < arr[i]){
                lds[i] = Math.max(lds[i], lds[j]+1)
            }
        }
    }
    
    // Find maximum bitonic length
    // For each index i as peak: bitonic length = lis[i] + lds[i] - 1
    let res = 1
    for(let i=0; i<n; i++){
        res = Math.max(res, lis[i]+lds[i]-1) // -1 because we are counting the current element twice(in both LIS and LDS)
    }
    
    return res
}

console.log(maxLenBitonicSubsequence([1, 11, 2, 10, 4, 5, 2, 1])); // 6 = [1, 2, 10, 4, 2, 1]
console.log(maxLenBitonicSubsequence([12, 11, 40, 5, 3, 1])); // 5 = [12, 40, 5, 3, 1]
console.log(maxLenBitonicSubsequence([80, 60, 30, 40, 20, 10])); // 5 = [80, 60, 30, 20, 10]

/*🎯 STEP-BY-STEP WALKTHROUGH (arr = [1, 11, 2, 10, 4, 5, 2, 1])

We'll build LIS and LDS arrays, then combine them to find bitonic subsequence.

Initialization:
arr = [1, 11, 2, 10, 4, 5, 2, 1]
n = 8

Initialize arrays:
lis = [1, 1, 1, 1, 1, 1, 1, 1]
lds = [1, 1, 1, 1, 1, 1, 1, 1]

Step 1: Build LIS (forward direction)
lis[i] = length of LIS ending at index i

i=1: arr[1] = 11
  Check j=0: arr[0]=1, 1 < 11? Yes → lis[1] = max(1, lis[0]+1) = max(1, 2) = 2
  lis[1] = 2

i=2: arr[2] = 2
  Check j=0: arr[0]=1, 1 < 2? Yes → lis[2] = max(1, lis[0]+1) = max(1, 2) = 2
  Check j=1: arr[1]=11, 11 < 2? No → skip
  lis[2] = 2

i=3: arr[3] = 10
  Check j=0: arr[0]=1, 1 < 10? Yes → lis[3] = max(1, lis[0]+1) = max(1, 2) = 2
  Check j=1: arr[1]=11, 11 < 10? No → skip
  Check j=2: arr[2]=2, 2 < 10? Yes → lis[3] = max(2, lis[2]+1) = max(2, 3) = 3
  lis[3] = 3

i=4: arr[4] = 4
  Check j=0: arr[0]=1, 1 < 4? Yes → lis[4] = max(1, lis[0]+1) = max(1, 2) = 2
  Check j=1: arr[1]=11, 11 < 4? No → skip
  Check j=2: arr[2]=2, 2 < 4? Yes → lis[4] = max(2, lis[2]+1) = max(2, 3) = 3
  Check j=3: arr[3]=10, 10 < 4? No → skip
  lis[4] = 3

i=5: arr[5] = 5
  Check j=0: arr[0]=1, 1 < 5? Yes → lis[5] = max(1, lis[0]+1) = max(1, 2) = 2
  Check j=1: arr[1]=11, 11 < 5? No → skip
  Check j=2: arr[2]=2, 2 < 5? Yes → lis[5] = max(2, lis[2]+1) = max(2, 3) = 3
  Check j=3: arr[3]=10, 10 < 5? No → skip
  Check j=4: arr[4]=4, 4 < 5? Yes → lis[5] = max(3, lis[4]+1) = max(3, 4) = 4
  lis[5] = 4

i=6: arr[6] = 2
  Check j=0: arr[0]=1, 1 < 2? Yes → lis[6] = max(1, lis[0]+1) = max(1, 2) = 2
  Check j=1: arr[1]=11, 11 < 2? No → skip
  Check j=2: arr[2]=2, 2 < 2? No → skip
  Check j=3: arr[3]=10, 10 < 2? No → skip
  Check j=4: arr[4]=4, 4 < 2? No → skip
  Check j=5: arr[5]=5, 5 < 2? No → skip
  lis[6] = 2

i=7: arr[7] = 1
  Check j=0: arr[0]=1, 1 < 1? No → skip
  Check j=1: arr[1]=11, 11 < 1? No → skip
  Check j=2: arr[2]=2, 2 < 1? No → skip
  Check j=3: arr[3]=10, 10 < 1? No → skip
  Check j=4: arr[4]=4, 4 < 1? No → skip
  Check j=5: arr[5]=5, 5 < 1? No → skip
  Check j=6: arr[6]=2, 2 < 1? No → skip
  lis[7] = 1

LIS array: lis = [1, 2, 2, 3, 3, 4, 2, 1]

Step 2: Build LDS (reverse direction)
lds[i] = length of LDS starting at index i

i=6: arr[6] = 2
  Check j=7: arr[7]=1, 1 < 2? Yes → lds[6] = max(1, lds[7]+1) = max(1, 2) = 2
  lds[6] = 2

i=5: arr[5] = 5
  Check j=6: arr[6]=2, 2 < 5? Yes → lds[5] = max(1, lds[6]+1) = max(1, 3) = 3
  Check j=7: arr[7]=1, 1 < 5? Yes → lds[5] = max(3, lds[7]+1) = max(3, 2) = 3
  lds[5] = 3

i=4: arr[4] = 4
  Check j=5: arr[5]=5, 5 < 4? No → skip
  Check j=6: arr[6]=2, 2 < 4? Yes → lds[4] = max(1, lds[6]+1) = max(1, 3) = 3
  Check j=7: arr[7]=1, 1 < 4? Yes → lds[4] = max(3, lds[7]+1) = max(3, 2) = 3
  lds[4] = 3

i=3: arr[3] = 10
  Check j=4: arr[4]=4, 4 < 10? Yes → lds[3] = max(1, lds[4]+1) = max(1, 4) = 4
  Check j=5: arr[5]=5, 5 < 10? Yes → lds[3] = max(4, lds[5]+1) = max(4, 4) = 4
  Check j=6: arr[6]=2, 2 < 10? Yes → lds[3] = max(4, lds[6]+1) = max(4, 3) = 4
  Check j=7: arr[7]=1, 1 < 10? Yes → lds[3] = max(4, lds[7]+1) = max(4, 2) = 4
  lds[3] = 4

i=2: arr[2] = 2
  Check j=3: arr[3]=10, 10 < 2? No → skip
  Check j=4: arr[4]=4, 4 < 2? No → skip
  Check j=5: arr[5]=5, 5 < 2? No → skip
  Check j=6: arr[6]=2, 2 < 2? No → skip
  Check j=7: arr[7]=1, 1 < 2? Yes → lds[2] = max(1, lds[7]+1) = max(1, 2) = 2
  lds[2] = 2

i=1: arr[1] = 11
  Check j=2: arr[2]=2, 2 < 11? Yes → lds[1] = max(1, lds[2]+1) = max(1, 3) = 3
  Check j=3: arr[3]=10, 10 < 11? Yes → lds[1] = max(3, lds[3]+1) = max(3, 5) = 5
  Check j=4: arr[4]=4, 4 < 11? Yes → lds[1] = max(5, lds[4]+1) = max(5, 4) = 5
  Check j=5: arr[5]=5, 5 < 11? Yes → lds[1] = max(5, lds[5]+1) = max(5, 4) = 5
  Check j=6: arr[6]=2, 2 < 11? Yes → lds[1] = max(5, lds[6]+1) = max(5, 3) = 5
  Check j=7: arr[7]=1, 1 < 11? Yes → lds[1] = max(5, lds[7]+1) = max(5, 2) = 5
  lds[1] = 5

i=0: arr[0] = 1
  Check j=1: arr[1]=11, 11 < 1? No → skip
  Check j=2: arr[2]=2, 2 < 1? No → skip
  Check j=3: arr[3]=10, 10 < 1? No → skip
  Check j=4: arr[4]=4, 4 < 1? No → skip
  Check j=5: arr[5]=5, 5 < 1? No → skip
  Check j=6: arr[6]=2, 2 < 1? No → skip
  Check j=7: arr[7]=1, 1 < 1? No → skip
  lds[0] = 1

LDS array: lds = [1, 5, 2, 4, 3, 3, 2, 1]

Step 3: Combine LIS and LDS
For each index i as peak: bitonic length = lis[i] + lds[i] - 1

i=0: bitonic = lis[0] + lds[0] - 1 = 1 + 1 - 1 = 1
i=1: bitonic = lis[1] + lds[1] - 1 = 2 + 5 - 1 = 6
i=2: bitonic = lis[2] + lds[2] - 1 = 2 + 2 - 1 = 3
i=3: bitonic = lis[3] + lds[3] - 1 = 3 + 4 - 1 = 6
i=4: bitonic = lis[4] + lds[4] - 1 = 3 + 3 - 1 = 5
i=5: bitonic = lis[5] + lds[5] - 1 = 4 + 3 - 1 = 6
i=6: bitonic = lis[6] + lds[6] - 1 = 2 + 2 - 1 = 3
i=7: bitonic = lis[7] + lds[7] - 1 = 1 + 1 - 1 = 1

🏆 Result: max(1, 6, 3, 6, 5, 6, 3, 1) = 6

✅ The longest bitonic subsequence has length 6: [1, 2, 10, 4, 2, 1]
   Peak at index 1 (11) or index 3 (10) or index 5 (5)

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Bitonic Subsequence
- A bitonic subsequence first increases, then decreases
- It has a peak element where it transitions
- Can be strictly increasing, strictly decreasing, or have a peak

Algorithm Structure:
1. Build LIS (forward): lis[i] = LIS ending at i
2. Build LDS (reverse): lds[i] = LDS starting at i
3. Combine: bitonic[i] = lis[i] + lds[i] - 1
4. Return: max(bitonic[i]) for all i

Why Subtract 1?
- Peak element is counted in both LIS and LDS
- lis[i] includes the peak
- lds[i] includes the peak
- So we subtract 1 to avoid double counting

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Building LIS: O(n²) (nested loops)
- Building LDS: O(n²) (nested loops)
- Combining: O(n) (single loop)
- Total: O(n²)

🎯 SPACE COMPLEXITY ANALYSIS:
- lis array: O(n)
- lds array: O(n)
- No additional space needed
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Single Element
Input: arr = [10]
lis = [1], lds = [1]
bitonic = 1 + 1 - 1 = 1
Output: 1 ✓

CASE 2: All Increasing
Input: arr = [10, 20, 30]
lis = [1, 2, 3], lds = [3, 2, 1]
bitonic = max(1+3-1, 2+2-1, 3+1-1) = max(3, 3, 3) = 3
Output: 3 ✓

CASE 3: All Decreasing
Input: arr = [30, 20, 10]
lis = [1, 1, 1], lds = [3, 2, 1]
bitonic = max(1+3-1, 1+2-1, 1+1-1) = max(3, 2, 1) = 3
Output: 3 ✓

CASE 4: Single Peak
Input: arr = [1, 2, 3, 2, 1]
lis = [1, 2, 3, 2, 1], lds = [5, 4, 3, 2, 1]
bitonic = max(1+5-1, 2+4-1, 3+3-1, 2+2-1, 1+1-1) = max(5, 5, 5, 3, 1) = 5
Output: 5 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ BITONIC STRUCTURE:
   - Bitonic = increasing part + decreasing part
   - Peak element connects both parts
   - Each index can be a peak

2️⃣ OPTIMAL SUBSTRUCTURE:
   - LIS ending at i gives increasing part
   - LDS starting at i gives decreasing part
   - Combining gives bitonic with peak at i

3️⃣ COMPLETE EXPLORATION:
   - Check all indices as potential peaks
   - No valid bitonic subsequence is missed
   - Guarantees optimal solution

4️⃣ CORRECTNESS:
   - LIS and LDS are computed correctly
   - Combination formula accounts for double counting
   - Maximum over all peaks gives optimal answer

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Correctly builds LIS: ✓
- Correctly builds LDS: ✓
- Correctly combines (subtracts 1): ✓
- Handles all edge cases: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 4-5: Initialize arrays
  - lis[i] = 1 (each element is LIS of length 1)
  - lds[i] = 1 (each element is LDS of length 1)

Line 9-15: Build LIS (forward)
  - Process from left to right
  - lis[i] = LIS ending at index i

Line 19-25: Build LDS (reverse)
  - Process from right to left
  - lds[i] = LDS starting at index i

Line 28-30: Combine LIS and LDS
  - For each index i: bitonic = lis[i] + lds[i] - 1
  - Find maximum over all indices

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Mountain range analysis (ascending then descending)
- Stock market trends (upward then downward)
- Signal processing (increasing then decreasing signals)
- Network routing (optimal paths with peak)
- Data analysis (trends with turning points)

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Longest Increasing Subsequence (base problem)
- Longest Decreasing Subsequence
- Maximum Length Bitonic Subsequence (this problem)
- Longest Bitonic Subarray
- Mountain Array

─────────────────────────────────────────

🎯 TESTING STRATEGY:
- Single element
- All increasing
- All decreasing
- Single peak
- Multiple peaks
- Large arrays
- Negative numbers
- Duplicate values

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print lis array after building
- Print lds array after building
- Verify bitonic calculation (subtract 1)
- Check LIS direction (forward)
- Check LDS direction (reverse)
- Trace through example manually

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Forgetting to subtract 1 (double counting peak)
- Wrong direction for LDS (should be reverse)
- Confusing LDS starting vs ending
- Not checking all indices as peaks
- Wrong comparison in LDS (arr[j] < arr[i])

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Build LIS forward (ending at each index)
- Build LDS reverse (starting at each index)
- Remember to subtract 1 when combining
- Check all indices as potential peaks
- Verify with known examples

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain bitonic concept clearly
- Show how LIS and LDS combine
- Explain why we subtract 1
- Walk through a small example
- Discuss time and space complexity
- Handle edge cases

─────────────────────────────────────────

🎯 COMPARISON WITH LIS:

Longest Increasing Subsequence (LIS):
- Goal: Find longest increasing subsequence
- Direction: Forward only
- Time: O(n²) or O(n log n)
- Space: O(n)

Maximum Length Bitonic Subsequence:
- Goal: Find longest bitonic subsequence
- Direction: Forward (LIS) + Reverse (LDS)
- Time: O(n²)
- Space: O(n)

─────────────────────────────────────────

🎯 KEY DIFFERENCES:

1️⃣ DIRECTION:
   - LIS: Forward only
   - Bitonic: Forward (LIS) + Reverse (LDS)

2️⃣ STRUCTURE:
   - LIS: Only increasing
   - Bitonic: Increasing then decreasing

3️⃣ COMBINATION:
   - LIS: Direct answer
   - Bitonic: Combine LIS and LDS, subtract 1

─────────────────────────────────────────

🎯 WHY SUBTRACT 1?

Explanation:
- lis[i] = LIS ending at i (includes element at i)
- lds[i] = LDS starting at i (includes element at i)
- When combining: lis[i] + lds[i] counts element at i twice
- Therefore: bitonic[i] = lis[i] + lds[i] - 1

Example:
- arr = [1, 2, 10, 4, 2, 1], peak at index 2 (value 10)
- lis[2] = 2 ([1, 2] ending at 2)
- lds[2] = 4 ([2, 10, 4, 2, 1] starting at 2)
- Without subtracting: 2 + 4 = 6 (counts 2 twice)
- With subtracting: 2 + 4 - 1 = 5 (correct)

Wait, let me recalculate for the actual example:
- For index 3 (value 10):
- lis[3] = 3 ([1, 2, 10] ending at 3)
- lds[3] = 4 ([10, 4, 2, 1] starting at 3)
- bitonic = 3 + 4 - 1 = 6 ✓

─────────────────────────────────────────

🎯 CONCLUSION:
Maximum Length Bitonic Subsequence efficiently finds the longest bitonic
subsequence by combining Longest Increasing Subsequence (forward) and Longest
Decreasing Subsequence (reverse), calculating bitonic length for each index
as a potential peak, and returning the maximum, achieving O(n²) time and
O(n) space complexity!
*/