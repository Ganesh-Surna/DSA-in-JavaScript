/* Problem: ✅✅✅✅ Longest Increasing Subsequence (LIS) — DP Tabulation O(n²) ✅✅✅✅

Given an integer array `arr`, find the length of the longest strictly increasing
subsequence. A subsequence is a sequence that can be derived from an array by
deleting some or no elements without changing the order of the remaining elements.

🎯 Goal: Find the length of the longest strictly increasing subsequence.

Example 1:
Input: arr = [10, 9, 2, 5, 3, 7, 101, 18, 200]
Output: 5
Explanation: The longest increasing subsequence is [2, 3, 7, 101, 200] with length 5.

Example 2:
Input: arr = [0, 1, 0, 3, 2, 3]
Output: 4
Explanation: The longest increasing subsequence is [0, 1, 2, 3] with length 4.

Example 3:
Input: arr = [10, 20, 30]
Output: 3
Explanation: The entire array is increasing, so LIS is [10, 20, 30] with length 3.

Example 4:
Input: arr = [30, 20, 10]
Output: 1
Explanation: All elements are decreasing, so LIS is any single element [30], [20], or [10] with length 1.

Example 5:
Input: arr = [10, 100, 20, 40]
Output: 3
Explanation: The longest increasing subsequence is [10, 20, 40] with length 3.

Example 6:
Input: arr = [10, 20]
Output: 2
Explanation: The entire array is increasing, so LIS is [10, 20] with length 2.

Example 7:
Input: arr = [10]
Output: 1
Explanation: Single element, so LIS is [10] with length 1.

Constraints:
- 1 ≤ arr.length ≤ 2500
- -10^4 ≤ arr[i] ≤ 10^4

Expected Complexities:
Time Complexity: O(n²) where n = arr.length
Space Complexity: O(n) for the DP array

⚠️ Note: There exists a better solution using binary search with O(n log n) time
complexity, which is covered in the next file (03_O(n logn).js). This DP tabulation
approach is more intuitive and easier to understand, but slower for large inputs.

🧠 Core Idea:
- Use dynamic programming with a 1D array `lis[i]` representing the length of
  the longest increasing subsequence ending at index `i`.
- For each element at index `i`, check all previous elements at indices `j < i`.
- If `arr[j] < arr[i]`, we can extend the subsequence ending at `j` by including
  `arr[i]`, so `lis[i] = max(lis[i], lis[j] + 1)`.
- The answer is the maximum value in the `lis` array.

📈 Recurrence Relation:
  lis[i] = 1  // Base case: each element is a subsequence of length 1
  
  For each i from 1 to n-1:
      For each j from 0 to i-1:
          if arr[j] < arr[i]:
              lis[i] = max(lis[i], lis[j] + 1)
  
  Answer = max(lis[0], lis[1], ..., lis[n-1])

Base Case:
- lis[i] = 1 for all i (each element is a subsequence of length 1)

🎯 Why This Approach?
- Optimal substructure: The LIS ending at index `i` depends on LIS ending at
  previous indices.
- Overlapping subproblems: We check all previous elements for each position.
- Tabulation builds solution iteratively from smaller subproblems.
- Guarantees optimal solution by exploring all possible subsequences.

💡 Key Insights:
- lis[i] represents LIS length ending at index i
- For each element, check all previous smaller elements
- Extend the longest subsequence found so far
- Final answer is maximum of all lis[i] values
- Each element starts with lis[i] = 1 (minimum subsequence)
*/

// ✅ TC = O(n²) where n = arr.length
// ✅ SC = O(n) for the lis array
function longestIncreasingSubsequence(arr){
    let n = arr.length
    
    // Initialize lis array: lis[i] = length of LIS ending at index i
    // Each element is a subsequence of length 1, so initialize with 1
    let lis = new Array(n).fill(1) // Initialize the lis array with 1s. Because the minimum length of the LIS is 1
    
    // For each element, check all previous elements
    for(let i=1; i<n; i++){
        for(let j=0; j<i; j++){
            // If previous element is smaller, we can extend the subsequence
            if(arr[j] < arr[i]){
                // Update lis[i] with maximum length found so far
                lis[i] = Math.max(lis[i], lis[j]+1) // Update the lis[i] with the maximum length of the LIS
            }
        }
    }
    
    // Return the maximum value in lis array (longest subsequence found)
    return Math.max(...lis) // Return the maximum of the LIS
}

console.log(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18, 200])); // 5 --> [2, 3, 7, 101, 200]
console.log(longestIncreasingSubsequence([0, 1, 0, 3, 2, 3])); // 4 --> [0, 1, 2, 3]
console.log(longestIncreasingSubsequence([10, 20, 30])); // 3 --> [10, 20, 30]
console.log(longestIncreasingSubsequence([30, 20, 10])); // 1 --> [30] or [20] or [10]
console.log(longestIncreasingSubsequence([10, 100, 20, 40])) // 3 --> [10, 20, 40]
console.log(longestIncreasingSubsequence([10, 20])) // 2 --> [10, 20]
console.log(longestIncreasingSubsequence([10])) // 1 --> [10]

/*🎯 STEP-BY-STEP WALKTHROUGH (arr = [10, 9, 2, 5, 3, 7, 101, 18, 200])

We'll build a lis array where lis[i] represents the length of the longest
increasing subsequence ending at index i.

Initialization:
arr = [10, 9, 2, 5, 3, 7, 101, 18, 200]
n = 9

Initialize lis array:
lis = [1, 1, 1, 1, 1, 1, 1, 1, 1]
      (Each element is a subsequence of length 1)

Processing each element:

i=1: arr[1] = 9
  Check j=0: arr[0]=10, 10 < 9? No → skip
  lis[1] = 1 (no extension possible)

lis = [1, 1, 1, 1, 1, 1, 1, 1, 1]

i=2: arr[2] = 2
  Check j=0: arr[0]=10, 10 < 2? No → skip
  Check j=1: arr[1]=9, 9 < 2? No → skip
  lis[2] = 1 (no extension possible)

lis = [1, 1, 1, 1, 1, 1, 1, 1, 1]

i=3: arr[3] = 5
  Check j=0: arr[0]=10, 10 < 5? No → skip
  Check j=1: arr[1]=9, 9 < 5? No → skip
  Check j=2: arr[2]=2, 2 < 5? Yes → lis[3] = max(1, lis[2]+1) = max(1, 2) = 2
  lis[3] = 2 (can extend subsequence [2] → [2, 5])

lis = [1, 1, 1, 2, 1, 1, 1, 1, 1]

i=4: arr[4] = 3
  Check j=0: arr[0]=10, 10 < 3? No → skip
  Check j=1: arr[1]=9, 9 < 3? No → skip
  Check j=2: arr[2]=2, 2 < 3? Yes → lis[4] = max(1, lis[2]+1) = max(1, 2) = 2
  Check j=3: arr[3]=5, 5 < 3? No → skip
  lis[4] = 2 (can extend subsequence [2] → [2, 3])

lis = [1, 1, 1, 2, 2, 1, 1, 1, 1]

i=5: arr[5] = 7
  Check j=0: arr[0]=10, 10 < 7? No → skip
  Check j=1: arr[1]=9, 9 < 7? No → skip
  Check j=2: arr[2]=2, 2 < 7? Yes → lis[5] = max(1, lis[2]+1) = max(1, 2) = 2
  Check j=3: arr[3]=5, 5 < 7? Yes → lis[5] = max(2, lis[3]+1) = max(2, 3) = 3
  Check j=4: arr[4]=3, 3 < 7? Yes → lis[5] = max(3, lis[4]+1) = max(3, 3) = 3
  lis[5] = 3 (can extend subsequence [2, 3] or [2, 5] → [2, 3, 7] or [2, 5, 7])

lis = [1, 1, 1, 2, 2, 3, 1, 1, 1]

i=6: arr[6] = 101
  Check j=0: arr[0]=10, 10 < 101? Yes → lis[6] = max(1, lis[0]+1) = max(1, 2) = 2
  Check j=1: arr[1]=9, 9 < 101? Yes → lis[6] = max(2, lis[1]+1) = max(2, 2) = 2
  Check j=2: arr[2]=2, 2 < 101? Yes → lis[6] = max(2, lis[2]+1) = max(2, 2) = 2
  Check j=3: arr[3]=5, 5 < 101? Yes → lis[6] = max(2, lis[3]+1) = max(2, 3) = 3
  Check j=4: arr[4]=3, 3 < 101? Yes → lis[6] = max(3, lis[4]+1) = max(3, 3) = 3
  Check j=5: arr[5]=7, 7 < 101? Yes → lis[6] = max(3, lis[5]+1) = max(3, 4) = 4
  lis[6] = 4 (can extend subsequence [2, 3, 7] → [2, 3, 7, 101])

lis = [1, 1, 1, 2, 2, 3, 4, 1, 1]

i=7: arr[7] = 18
  Check j=0: arr[0]=10, 10 < 18? Yes → lis[7] = max(1, lis[0]+1) = max(1, 2) = 2
  Check j=1: arr[1]=9, 9 < 18? Yes → lis[7] = max(2, lis[1]+1) = max(2, 2) = 2
  Check j=2: arr[2]=2, 2 < 18? Yes → lis[7] = max(2, lis[2]+1) = max(2, 2) = 2
  Check j=3: arr[3]=5, 5 < 18? Yes → lis[7] = max(2, lis[3]+1) = max(2, 3) = 3
  Check j=4: arr[4]=3, 3 < 18? Yes → lis[7] = max(3, lis[4]+1) = max(3, 3) = 3
  Check j=5: arr[5]=7, 7 < 18? Yes → lis[7] = max(3, lis[5]+1) = max(3, 4) = 4
  Check j=6: arr[6]=101, 101 < 18? No → skip
  lis[7] = 4 (can extend subsequence [2, 3, 7] → [2, 3, 7, 18])

lis = [1, 1, 1, 2, 2, 3, 4, 4, 1]

i=8: arr[8] = 200
  Check j=0: arr[0]=10, 10 < 200? Yes → lis[8] = max(1, lis[0]+1) = max(1, 2) = 2
  Check j=1: arr[1]=9, 9 < 200? Yes → lis[8] = max(2, lis[1]+1) = max(2, 2) = 2
  Check j=2: arr[2]=2, 2 < 200? Yes → lis[8] = max(2, lis[2]+1) = max(2, 2) = 2
  Check j=3: arr[3]=5, 5 < 200? Yes → lis[8] = max(2, lis[3]+1) = max(2, 3) = 3
  Check j=4: arr[4]=3, 3 < 200? Yes → lis[8] = max(3, lis[4]+1) = max(3, 3) = 3
  Check j=5: arr[5]=7, 7 < 200? Yes → lis[8] = max(3, lis[5]+1) = max(3, 4) = 4
  Check j=6: arr[6]=101, 101 < 200? Yes → lis[8] = max(4, lis[6]+1) = max(4, 5) = 5
  Check j=7: arr[7]=18, 18 < 200? Yes → lis[8] = max(5, lis[7]+1) = max(5, 5) = 5
  lis[8] = 5 (can extend subsequence [2, 3, 7, 101] → [2, 3, 7, 101, 200])

Final lis array:
lis = [1, 1, 1, 2, 2, 3, 4, 4, 5]

🏆 Result: max(lis) = 5

✅ The longest increasing subsequence has length 5: [2, 3, 7, 101, 200]

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

For each element at index i:
1. Start with lis[i] = 1 (each element is a subsequence of length 1)
2. Check all previous elements at indices j < i
3. If arr[j] < arr[i], we can extend the subsequence ending at j
4. Update lis[i] = max(lis[i], lis[j] + 1)
5. After processing all elements, return max(lis)

Key Insight:
- lis[i] stores the length of LIS ending at index i
- We extend the longest subsequence found so far
- Final answer is the maximum value in lis array

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Outer loop: n iterations (n = arr.length)
- Inner loop: up to i iterations for each i (worst case: 0 + 1 + 2 + ... + (n-1))
- Total iterations: 1 + 2 + 3 + ... + (n-1) = n(n-1)/2
- Each iteration: O(1) operations (comparison and max)
- Total: O(n²)

🎯 SPACE COMPLEXITY ANALYSIS:
- lis array: O(n)
- No additional space needed
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Single Element
Input: arr = [10]
lis = [1]
Output: 1 ✓

CASE 2: All Increasing
Input: arr = [10, 20, 30]
lis = [1, 2, 3]
Output: 3 ✓

CASE 3: All Decreasing
Input: arr = [30, 20, 10]
lis = [1, 1, 1] (no element can extend previous)
Output: 1 ✓

CASE 4: All Same Elements
Input: arr = [5, 5, 5]
lis = [1, 1, 1] (5 < 5 is false, so no extension)
Output: 1 ✓

CASE 5: Mixed Pattern
Input: arr = [10, 100, 20, 40]
lis = [1, 2, 2, 3]
Output: 3 ✓ (subsequence: [10, 20, 40])

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - LIS ending at index i depends on LIS ending at previous indices
   - If we know LIS lengths for all indices < i, we can compute lis[i]
   - Optimal solution contains optimal solutions to subproblems

2️⃣ OVERLAPPING SUBPROBLEMS:
   - We check all previous elements for each position
   - Same subproblems are considered multiple times
   - DP avoids recomputation

3️⃣ GREEDY CHOICE:
   - For each element, we extend the longest subsequence found so far
   - This ensures we always have the best option at each step

4️⃣ COMPLETE EXPLORATION:
   - We check all possible previous elements
   - No valid subsequence is missed
   - Guarantees optimal solution

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Considers all possible subsequences: ✓
- Extends longest subsequence at each step: ✓
- Handles all edge cases: ✓
- Optimal substructure property: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 4: Initialize lis array
  - Create array of size n
  - Fill with 1s (each element is a subsequence of length 1)

Line 6-13: Fill lis array
  - Outer loop: process each element from index 1 to n-1
  - Inner loop: check all previous elements (0 to i-1)
  - If arr[j] < arr[i]: extend subsequence
  - Update lis[i] with maximum length found

Line 15: Return maximum
  - Find maximum value in lis array
  - This is the length of longest increasing subsequence

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Stock market analysis (longest upward trend)
- DNA sequence analysis
- Scheduling problems
- Network routing
- Data compression
- Pattern recognition
- Game theory

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Longest Increasing Subsequence (this problem)
- Longest Decreasing Subsequence
- Longest Bitonic Subsequence
- Russian Doll Envelopes
- Maximum Length of Pair Chain
- Number of Longest Increasing Subsequence

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
- Print lis array after each iteration
- Verify base case (lis[i] = 1 initially)
- Check comparison: arr[j] < arr[i] (strictly increasing)
- Ensure inner loop goes from 0 to i-1
- Trace through example manually
- Verify final max operation

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Using ≤ instead of < (should be strictly increasing)
- Not initializing lis array with 1s
- Wrong loop bounds (should check j < i)
- Forgetting to take max at the end
- Not considering all previous elements

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Initialize lis array with 1s (base case)
- Use descriptive variable names
- Check all previous elements (complete exploration)
- Use Math.max for updates
- Return max of lis array (not lis[n-1])

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the DP approach clearly
- Walk through a small example
- Discuss time and space complexity
- Mention the O(n log n) binary search solution exists
- Relate to real-world applications
- Handle edge cases

─────────────────────────────────────────

🎯 OPTIMIZATION NOTE:

⚠️ BETTER SOLUTION EXISTS:
There is a more efficient O(n log n) solution using binary search and a
different DP approach. This solution:
- Uses binary search to find insertion position
- Maintains an array of smallest tail values
- Reduces time complexity from O(n²) to O(n log n)
- Covered in the next file: 03_O(n logn).js

The current O(n²) solution is:
✅ More intuitive and easier to understand
✅ Better for learning DP concepts
✅ Easier to implement correctly
❌ Slower for large inputs (n > 1000)

The O(n log n) solution is:
✅ Much faster for large inputs
✅ Optimal time complexity
❌ More complex to understand
❌ Harder to implement correctly

─────────────────────────────────────────

🎯 COMPARISON WITH BINARY SEARCH APPROACH:

Current Approach (O(n²)):
- For each element, check all previous elements
- Simple and intuitive
- Easy to understand and implement
- Good for small to medium inputs
- Time: O(n²), Space: O(n)

Binary Search Approach (O(n log n)) - See 03_O(n logn).js:
- Use binary search to find insertion position
- Maintain array of smallest tail values
- More complex but faster
- Better for large inputs
- Time: O(n log n), Space: O(n)

─────────────────────────────────────────

🎯 WHEN TO USE EACH APPROACH:

Use O(n²) approach when:
- Learning DP concepts
- Small to medium arrays (n < 1000)
- Need intuitive, easy-to-understand solution
- Interview asks for any solution

Use O(n log n) approach when:
- Large arrays (n > 1000)
- Performance is critical
- Need optimal time complexity
- Interview asks for optimal solution

─────────────────────────────────────────

🎯 RECONSTRUCTING THE ACTUAL SUBSEQUENCE:

To reconstruct the actual LIS (not just length), we need to:
1. Track parent pointers during DP
2. Start from index with maximum lis value
3. Backtrack using parent pointers
4. Reverse to get correct order

This adds O(n) space for parent array but allows reconstruction.

─────────────────────────────────────────

🎯 CONCLUSION:
Longest Increasing Subsequence using DP Tabulation efficiently finds the
length of the longest strictly increasing subsequence by building a 1D DP
array where each element stores the LIS length ending at that position,
checking all previous elements to extend subsequences, achieving O(n²) time
and O(n) space complexity. For better performance on large inputs, see the
O(n log n) binary search solution in the next file (03_O(n logn).js)!
*/