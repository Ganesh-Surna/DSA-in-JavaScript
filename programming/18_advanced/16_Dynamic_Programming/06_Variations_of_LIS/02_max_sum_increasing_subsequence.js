/* Problem: ✅✅✅✅ Maximum Sum Increasing Subsequence (Variation of LIS) ✅✅✅✅

Given an integer array `arr`, find the maximum sum of an increasing subsequence.
Unlike the standard LIS problem which finds the longest subsequence, this problem
finds the subsequence with the maximum sum.

🎯 Goal: Find the maximum sum of an increasing subsequence.

Key Insight: This is a variation of the Longest Increasing Subsequence (LIS)
problem. Instead of tracking the length of subsequences, we track their sum.
The approach is similar: use dynamic programming where msis[i] represents the
maximum sum of an increasing subsequence ending at index i.

Example 1:
Input: arr = [3, 1, 10, 4, 7]
Output: 14
Explanation:
  - Increasing subsequences and their sums:
    [3] → sum = 3
    [1] → sum = 1
    [10] → sum = 10
    [3, 4] → sum = 7
    [3, 7] → sum = 10
    [1, 4] → sum = 5
    [1, 7] → sum = 8
    [3, 4, 7] → sum = 14 (maximum)
  - Maximum sum = 14

Example 2:
Input: arr = [3, 20, 4, 6, 7, 30]
Output: 53
Explanation:
  - Increasing subsequence with maximum sum: [3, 20, 30]
  - Sum = 3 + 20 + 30 = 53

Example 3:
Input: arr = [10, 20, 30]
Output: 60
Explanation:
  - Entire array is increasing: [10, 20, 30]
  - Sum = 10 + 20 + 30 = 60

Example 4:
Input: arr = [30, 20, 10]
Output: 30
Explanation:
  - All elements are decreasing
  - Best subsequence: [30] (single element)
  - Sum = 30

Constraints:
- 1 ≤ arr.length ≤ 1000
- -10^4 ≤ arr[i] ≤ 10^4

Expected Complexities:
Time Complexity: O(n²) where n = arr.length
Space Complexity: O(n) for the msis array

⚠️ Note: This is a variation of the Longest Increasing Subsequence (LIS)
problem. We use dynamic programming similar to LIS, but track sum instead of length.

🧠 Core Idea:
- Use dynamic programming with array `msis[i]` representing the maximum sum of
  an increasing subsequence ending at index `i`.
- For each element at index `i`, check all previous elements at indices `j < i`.
- If `arr[j] < arr[i]`, we can extend the subsequence ending at `j` by including
  `arr[i]`, so `msis[i] = max(msis[i], msis[j] + arr[i])`.
- The answer is the maximum value in the `msis` array.

📈 Recurrence Relation:
  msis[i] = arr[i]  // Base case: each element is a subsequence with sum = itself
  
  For each i from 1 to n-1:
      For each j from 0 to i-1:
          if arr[j] < arr[i]:
              msis[i] = max(msis[i], msis[j] + arr[i])
  
  Answer = max(msis[0], msis[1], ..., msis[n-1])

Base Case:
- msis[i] = arr[i] for all i (each element is a subsequence with sum = itself)

🎯 Why This Approach?
- Optimal substructure: The maximum sum ending at index `i` depends on maximum
  sums ending at previous indices.
- Overlapping subproblems: We check all previous elements for each position.
- Tabulation builds solution iteratively from smaller subproblems.
- Guarantees optimal solution by exploring all possible subsequences.

💡 Key Insights:
- msis[i] represents maximum sum ending at index i
- For each element, check all previous smaller elements
- Extend the subsequence with maximum sum found so far
- Final answer is maximum of all msis[i] values
- Each element starts with msis[i] = arr[i] (sum of single element)
*/

// ✅ TC = O(n²) where n = arr.length
// ✅ SC = O(n) for the msis array
function maxSumIncreasingSubsequence(arr){
    let n = arr.length
    
    // Initialize msis array: msis[i] = maximum sum of increasing subsequence ending at index i
    // Each element is a subsequence with sum = itself, so initialize with arr values
    let msis = [...arr] // msis[i] = arr[i] initially (each element is a subsequence of sum = itself)
    
    // For each element, check all previous elements
    for(let i=1; i<n; i++){
        for(let j=0; j<i; j++){
            // If previous element is smaller, we can extend the subsequence
            if(arr[j] < arr[i]){
                // Update msis[i] with maximum sum found so far
                // Option 1: Keep current msis[i] (don't extend)
                // Option 2: Extend subsequence ending at j by adding arr[i]
                msis[i] = Math.max(msis[i], msis[j]+arr[i]) // Take maximum of current sum or extending previous subsequence
            }
        }
    }
    
    // Return the maximum value in msis array (maximum sum found)
    return Math.max(...msis) // Return the maximum of the msis
}

console.log(maxSumIncreasingSubsequence([3, 1, 10, 4, 7])); // 14 = [3+4+7]
console.log(maxSumIncreasingSubsequence([3, 20, 4, 6, 7, 30])); // 53 = [3+20+30]
console.log(maxSumIncreasingSubsequence([10, 20, 30])); // 60 --> [10+20+30]
console.log(maxSumIncreasingSubsequence([30, 20, 10])); // 30 = [30]

/*🎯 STEP-BY-STEP WALKTHROUGH (arr = [3, 1, 10, 4, 7])

We'll build an msis array where msis[i] represents the maximum sum of an
increasing subsequence ending at index i.

Initialization:
arr = [3, 1, 10, 4, 7]
n = 5

Initialize msis array (each element is a subsequence with sum = itself):
msis = [3, 1, 10, 4, 7]

Processing each element:

i=1: arr[1] = 1
  Check j=0: arr[0]=3, 3 < 1? No → skip
  msis[1] = 1 (no extension possible)
  
msis = [3, 1, 10, 4, 7]

i=2: arr[2] = 10
  Check j=0: arr[0]=3, 3 < 10? Yes → msis[2] = max(10, msis[0]+10) = max(10, 3+10) = max(10, 13) = 13
  Check j=1: arr[1]=1, 1 < 10? Yes → msis[2] = max(13, msis[1]+10) = max(13, 1+10) = max(13, 11) = 13
  msis[2] = 13 (can extend [3] or [1] → [3, 10] or [1, 10], max sum is [3, 10] = 13)
  
msis = [3, 1, 13, 4, 7]

i=3: arr[3] = 4
  Check j=0: arr[0]=3, 3 < 4? Yes → msis[3] = max(4, msis[0]+4) = max(4, 3+4) = max(4, 7) = 7
  Check j=1: arr[1]=1, 1 < 4? Yes → msis[3] = max(7, msis[1]+4) = max(7, 1+4) = max(7, 5) = 7
  Check j=2: arr[2]=10, 10 < 4? No → skip
  msis[3] = 7 (can extend [3] → [3, 4] = 7)
  
msis = [3, 1, 13, 7, 7]

i=4: arr[4] = 7
  Check j=0: arr[0]=3, 3 < 7? Yes → msis[4] = max(7, msis[0]+7) = max(7, 3+7) = max(7, 10) = 10
  Check j=1: arr[1]=1, 1 < 7? Yes → msis[4] = max(10, msis[1]+7) = max(10, 1+7) = max(10, 8) = 10
  Check j=2: arr[2]=10, 10 < 7? No → skip
  Check j=3: arr[3]=4, 4 < 7? Yes → msis[4] = max(10, msis[3]+7) = max(10, 7+7) = max(10, 14) = 14
  msis[4] = 14 (can extend [3, 4] → [3, 4, 7] = 14)
  
Final msis array:
msis = [3, 1, 13, 7, 14]

🏆 Result: max(msis) = 14

✅ The maximum sum increasing subsequence has sum 14: [3, 4, 7]

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Maximum Sum vs Maximum Length
- LIS: Find longest subsequence (maximize length)
- MSIS: Find subsequence with maximum sum (maximize sum)
- Same structure, different optimization goal

For each element at index i:
1. Start with msis[i] = arr[i] (each element is a subsequence with sum = itself)
2. Check all previous elements at indices j < i
3. If arr[j] < arr[i], we can extend the subsequence ending at j
4. Update msis[i] = max(msis[i], msis[j] + arr[i])
5. After processing all elements, return max(msis)

Key Insight:
- msis[i] stores the maximum sum ending at index i
- We extend the subsequence with maximum sum found so far
- Final answer is the maximum value in msis array

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Outer loop: n iterations (n = arr.length)
- Inner loop: up to i iterations for each i (worst case: 0 + 1 + 2 + ... + (n-1))
- Total iterations: 1 + 2 + 3 + ... + (n-1) = n(n-1)/2
- Each iteration: O(1) operations (comparison and max)
- Total: O(n²)

🎯 SPACE COMPLEXITY ANALYSIS:
- msis array: O(n)
- No additional space needed
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Single Element
Input: arr = [10]
msis = [10]
Output: 10 ✓

CASE 2: All Increasing
Input: arr = [10, 20, 30]
msis = [10, 30, 60]
Output: 60 ✓ (sum of entire array)

CASE 3: All Decreasing
Input: arr = [30, 20, 10]
msis = [30, 20, 10] (no element can extend previous)
Output: 30 ✓ (maximum single element)

CASE 4: All Same Elements
Input: arr = [5, 5, 5]
msis = [5, 5, 5] (5 < 5 is false, so no extension)
Output: 5 ✓

CASE 5: Mixed Pattern
Input: arr = [3, 20, 4, 6, 7, 30]
msis = [3, 23, 7, 13, 20, 53]
Output: 53 ✓ (subsequence: [3, 20, 30])

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Maximum sum ending at index i depends on maximum sums ending at previous indices
   - If we know maximum sums for all indices < i, we can compute msis[i]
   - Optimal solution contains optimal solutions to subproblems

2️⃣ OVERLAPPING SUBPROBLEMS:
   - We check all previous elements for each position
   - Same subproblems are considered multiple times
   - DP avoids recomputation

3️⃣ GREEDY CHOICE:
   - For each element, we extend the subsequence with maximum sum found so far
   - This ensures we always have the best option at each step

4️⃣ COMPLETE EXPLORATION:
   - We check all possible previous elements
   - No valid subsequence is missed
   - Guarantees optimal solution

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Considers all possible subsequences: ✓
- Extends subsequence with maximum sum at each step: ✓
- Handles all edge cases: ✓
- Optimal substructure property: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 4: Initialize msis array
  - Copy arr array (each element is a subsequence with sum = itself)
  - msis[i] = arr[i] initially

Line 7-14: Fill msis array
  - Outer loop: process each element from index 1 to n-1
  - Inner loop: check all previous elements (0 to i-1)
  - If arr[j] < arr[i]: extend subsequence
  - Update msis[i] with maximum sum found

Line 17: Return maximum
  - Find maximum value in msis array
  - This is the maximum sum of increasing subsequence

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Stock market analysis (maximum profit from increasing trend)
- Investment portfolio optimization
- Resource allocation problems
- Scheduling with weights
- Network optimization
- Financial planning

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Longest Increasing Subsequence (base problem - maximize length)
- Maximum Sum Increasing Subsequence (this problem - maximize sum)
- Maximum Sum Subarray (Kadane's algorithm)
- Maximum Product Subarray
- Longest Bitonic Subsequence

─────────────────────────────────────────

🎯 TESTING STRATEGY:
- Single element
- All increasing
- All decreasing
- All same elements
- Mixed patterns
- Large arrays
- Negative numbers
- Duplicate values

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print msis array after each iteration
- Verify base case (msis[i] = arr[i] initially)
- Check comparison: arr[j] < arr[i] (strictly increasing)
- Ensure inner loop goes from 0 to i-1
- Trace through example manually
- Verify final max operation

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Using ≤ instead of < (should be strictly increasing)
- Not initializing msis with arr values
- Wrong loop bounds (should check j < i)
- Forgetting to take max at the end
- Not considering all previous elements
- Confusing with maximum sum subarray (Kadane's)

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Initialize msis array with arr values (base case)
- Use descriptive variable names
- Check all previous elements (complete exploration)
- Use Math.max for updates
- Return max of msis array (not msis[n-1])

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the DP approach clearly
- Walk through a small example
- Discuss time and space complexity
- Compare with LIS problem
- Relate to real-world applications
- Handle edge cases

─────────────────────────────────────────

🎯 COMPARISON WITH LIS:

Longest Increasing Subsequence (LIS):
- Goal: Maximize length
- Track: Length of subsequence
- Initialize: lis[i] = 1
- Update: lis[i] = max(lis[i], lis[j] + 1)
- Time: O(n²) or O(n log n)

Maximum Sum Increasing Subsequence (MSIS):
- Goal: Maximize sum
- Track: Sum of subsequence
- Initialize: msis[i] = arr[i]
- Update: msis[i] = max(msis[i], msis[j] + arr[i])
- Time: O(n²)

─────────────────────────────────────────

🎯 KEY DIFFERENCES FROM LIS:

1️⃣ INITIALIZATION:
   - LIS: lis[i] = 1 (each element is length 1)
   - MSIS: msis[i] = arr[i] (each element is sum = itself)

2️⃣ UPDATE RULE:
   - LIS: lis[i] = max(lis[i], lis[j] + 1) (add 1 for length)
   - MSIS: msis[i] = max(msis[i], msis[j] + arr[i]) (add arr[i] for sum)

3️⃣ OPTIMIZATION GOAL:
   - LIS: Maximize length
   - MSIS: Maximize sum

─────────────────────────────────────────

🎯 WHEN TO USE EACH:

Use LIS when:
- Need to find longest subsequence
- Length is more important than sum
- Example: Pattern matching, sequence alignment

Use MSIS when:
- Need to find subsequence with maximum sum
- Sum is more important than length
- Example: Stock trading, investment optimization

─────────────────────────────────────────

🎯 RECONSTRUCTING THE ACTUAL SUBSEQUENCE:

To reconstruct the actual MSIS (not just sum), we need to:
1. Track parent pointers during DP
2. Start from index with maximum msis value
3. Backtrack using parent pointers
4. Reverse to get correct order

This adds O(n) space for parent array but allows reconstruction.

─────────────────────────────────────────

🎯 CONCLUSION:
Maximum Sum Increasing Subsequence efficiently finds the maximum sum of an
increasing subsequence by building a 1D DP array where each element stores
the maximum sum ending at that position, checking all previous elements to
extend subsequences, achieving O(n²) time and O(n) space complexity!
*/