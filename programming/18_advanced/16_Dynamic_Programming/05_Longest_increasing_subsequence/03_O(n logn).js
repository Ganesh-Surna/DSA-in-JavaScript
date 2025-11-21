/* Problem: ✅✅✅✅ Longest Increasing Subsequence (LIS) — Binary Search O(n log n) ✅✅✅✅

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

Constraints:
- 1 ≤ arr.length ≤ 2500
- -10^4 ≤ arr[i] ≤ 10^4

Expected Complexities:
Time Complexity: O(n log n) where n = arr.length
Space Complexity: O(n) for the temp array

⚠️ Note: This is the optimal solution using binary search. For a more intuitive
O(n²) DP approach, see the previous file (01_O(n^2).js).

🧠 Core Idea:
- Maintain an array `temp` where `temp[i]` stores the smallest tail value among
  all increasing subsequences of length `i+1`.
- For each element, use binary search to find where it should be placed:
  - If element > last element in temp: extend the longest subsequence (append)
  - Otherwise: replace the smallest element ≥ current element (maintain smallest tail)
- The length of `temp` is the length of the longest increasing subsequence.

📈 Key Insight:
- We don't need to track the actual subsequence, only its length.
- By maintaining smallest tail values, we can extend subsequences optimally.
- Binary search finds the correct position in O(log n) time.

🎯 Why This Approach?
- Optimal time complexity: O(n log n) vs O(n²) for DP approach.
- Uses binary search to find insertion position efficiently.
- Maintains invariant: temp[i] = smallest tail for subsequences of length i+1.
- Space efficient: only O(n) space needed.

💡 Key Insights:
- temp[i] = smallest tail value for subsequences of length i+1
- If arr[i] > temp[last]: extend longest subsequence
- Otherwise: replace to maintain "smallest tail" property
- Binary search finds ceil index (smallest element ≥ target)
- Final answer = temp.length
*/

// ✅ TC = O(n log n) where n = arr.length
// ✅ SC = O(n) for the temp array
function longestIncreasingSubsequence(arr){
    let n = arr.length
    
    // temp[i] = smallest tail value among all increasing subsequences of length i+1
    // Initialize with first element
    let temp = [arr[0]] // array that stores the minimum possible tail for all increasing subsequences of different lengths.
    
    // Process each element
    for(let i=1; i<n; i++){
        if(arr[i] > temp[temp.length - 1]){
            // Current element is larger than last element in temp
            // We can extend the longest subsequence found so far
            temp.push(arr[i])
        }else{
            // Current element is ≤ last element in temp
            // Use binary search to find position to replace
            // Replace to maintain "smallest tail" property
            let idx = ceilIdx(temp, arr[i]) // A binary search (ceil index) to replace the smallest element ≥ arr[i].
            temp[idx] = arr[i]
        }
    }
    
    // Length of temp = length of longest increasing subsequence
    return temp.length // Return the length of the temp array (longest increasing subsequence)
    
    // Helper function - Finding ceil idx of target using binary search
    // Returns the index of the smallest element in temp that is ≥ target
    function ceilIdx(temp, target){
        let l=0, r=temp.length-1
        while(l < r){
            let mid = Math.floor((l+r)/2)
            if(temp[mid] < target){
                // temp[mid] < target: we need a larger element, search right
                l = mid+1
            }else{
                // temp[mid] ≥ target: this could be our answer, but check left for smaller
                r = mid
            }
        }
        
        // r is the index of smallest element ≥ target (ceil index)
        return r
    }
}

console.log(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18, 200])); // 5 --> [2, 3, 7, 101, 200]
console.log(longestIncreasingSubsequence([0, 1, 0, 3, 2, 3])); // 4 --> [0, 1, 2, 3]
console.log(longestIncreasingSubsequence([10, 20, 30])); // 3 --> [10, 20, 30]
console.log(longestIncreasingSubsequence([30, 20, 10])); // 1 --> [30] or [20] or [10]
console.log(longestIncreasingSubsequence([10, 100, 20, 40])) // 3 --> [10, 20, 40]
console.log(longestIncreasingSubsequence([10, 20])) // 2 --> [10, 20]
console.log(longestIncreasingSubsequence([10])) // 1 --> [10]

/*🎯 STEP-BY-STEP WALKTHROUGH (arr = [10, 9, 2, 5, 3, 7, 101, 18, 200])

We'll maintain a temp array where temp[i] = smallest tail value for subsequences
of length i+1. The length of temp gives us the LIS length.

Initialization:
arr = [10, 9, 2, 5, 3, 7, 101, 18, 200]
temp = [10]  // Start with first element

Processing each element:

i=1: arr[1] = 9
  Compare: 9 > temp[0]=10? No
  Binary search: ceilIdx([10], 9)
    - l=0, r=0, mid=0
    - temp[0]=10 < 9? No, so r=0
    - Return 0
  temp[0] = 9  // Replace 10 with 9 (smaller tail for length 1)
  temp = [9]

i=2: arr[2] = 2
  Compare: 2 > temp[0]=9? No
  Binary search: ceilIdx([9], 2)
    - l=0, r=0, mid=0
    - temp[0]=9 < 2? No, so r=0
    - Return 0
  temp[0] = 2  // Replace 9 with 2 (smaller tail for length 1)
  temp = [2]

i=3: arr[3] = 5
  Compare: 5 > temp[0]=2? Yes
  Append: temp.push(5)
  temp = [2, 5]  // Length 2 subsequence: [2, 5]

i=4: arr[4] = 3
  Compare: 3 > temp[1]=5? No
  Binary search: ceilIdx([2, 5], 3)
    - l=0, r=1, mid=0
    - temp[0]=2 < 3? Yes, so l=1
    - l=1, r=1, mid=1
    - temp[1]=5 < 3? No, so r=1
    - Return 1
  temp[1] = 3  // Replace 5 with 3 (smaller tail for length 2)
  temp = [2, 3]  // Length 2 subsequence: [2, 3]

i=5: arr[5] = 7
  Compare: 7 > temp[1]=3? Yes
  Append: temp.push(7)
  temp = [2, 3, 7]  // Length 3 subsequence: [2, 3, 7]

i=6: arr[6] = 101
  Compare: 101 > temp[2]=7? Yes
  Append: temp.push(101)
  temp = [2, 3, 7, 101]  // Length 4 subsequence: [2, 3, 7, 101]

i=7: arr[7] = 18
  Compare: 18 > temp[3]=101? No
  Binary search: ceilIdx([2, 3, 7, 101], 18)
    - l=0, r=3, mid=1
    - temp[1]=3 < 18? Yes, so l=2
    - l=2, r=3, mid=2
    - temp[2]=7 < 18? Yes, so l=3
    - l=3, r=3, mid=3
    - temp[3]=101 < 18? No, so r=3
    - Return 3
  temp[3] = 18  // Replace 101 with 18 (smaller tail for length 4)
  temp = [2, 3, 7, 18]  // Length 4 subsequence: [2, 3, 7, 18]

i=8: arr[8] = 200
  Compare: 200 > temp[3]=18? Yes
  Append: temp.push(200)
  temp = [2, 3, 7, 18, 200]  // Length 5 subsequence: [2, 3, 7, 18, 200]

Final temp array:
temp = [2, 3, 7, 18, 200]

🏆 Result: temp.length = 5

✅ The longest increasing subsequence has length 5.

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: "Smallest Tail" Property
- temp[i] = smallest tail value among all increasing subsequences of length i+1
- By maintaining smallest tails, we can extend subsequences optimally
- Example: If we have [2, 5] and [2, 3], both are length 2, but [2, 3] is better
  because 3 < 5, so we can extend it with smaller values

For each element:
1. If element > last element in temp: extend longest subsequence (append)
2. Otherwise: use binary search to find position to replace
3. Replace maintains "smallest tail" property

Binary Search (ceilIdx):
- Finds the smallest element in temp that is ≥ target
- This is the position where we should replace
- Ensures temp remains sorted

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Outer loop: n iterations (n = arr.length)
- Each iteration:
  - Comparison: O(1)
  - Binary search (ceilIdx): O(log n) in worst case
- Total: O(n log n)

🎯 SPACE COMPLEXITY ANALYSIS:
- temp array: O(n) in worst case (when entire array is increasing)
- No additional space needed
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Single Element
Input: arr = [10]
temp = [10]
Output: 1 ✓

CASE 2: All Increasing
Input: arr = [10, 20, 30]
temp = [10, 20, 30] (all appended)
Output: 3 ✓

CASE 3: All Decreasing
Input: arr = [30, 20, 10]
temp = [30] → [20] → [10] (all replaced)
Output: 1 ✓

CASE 4: All Same Elements
Input: arr = [5, 5, 5]
temp = [5] → [5] → [5] (all replaced at same position)
Output: 1 ✓

CASE 5: Mixed Pattern
Input: arr = [10, 100, 20, 40]
temp = [10] → [10, 100] → [10, 20] → [10, 20, 40]
Output: 3 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ SMALLEST TAIL INVARIANT:
   - temp[i] = smallest tail for subsequences of length i+1
   - This allows optimal extension of subsequences
   - Replacing maintains the invariant

2️⃣ BINARY SEARCH EFFICIENCY:
   - Finds insertion position in O(log n) time
   - temp array is always sorted (by construction)
   - Ceil index ensures correct replacement

3️⃣ OPTIMAL SUBSTRUCTURE:
   - Length of LIS depends on optimal choices at each step
   - Maintaining smallest tails ensures optimality
   - No need to track actual subsequence, only length

4️⃣ CORRECTNESS:
   - temp.length always equals LIS length
   - Each replacement maintains the invariant
   - Final answer is correct

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Maintains smallest tail property: ✓
- Binary search finds correct position: ✓
- Handles all edge cases: ✓
- Optimal time complexity: ✓
- Guarantees correct LIS length: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 3: Initialize temp array
  - Start with first element
  - temp[0] = smallest tail for length 1

Line 5-12: Process each element
  - If larger than last: extend (append)
  - Otherwise: replace using binary search

Line 19-31: Binary search (ceilIdx)
  - Finds smallest element ≥ target
  - Standard binary search with modification
  - Returns index for replacement

Line 14: Return result
  - temp.length = LIS length

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
- Print temp array after each iteration
- Verify binary search correctness
- Check ceil index calculation
- Ensure temp remains sorted
- Trace through example manually
- Verify final length

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Wrong binary search implementation
- Not maintaining sorted order
- Incorrect ceil index calculation
- Forgetting to handle edge cases
- Confusing with actual subsequence reconstruction

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Use binary search for efficiency
- Maintain smallest tail property
- Keep temp array sorted
- Handle edge cases (empty, single element)
- Verify binary search logic

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the "smallest tail" concept clearly
- Walk through binary search logic
- Discuss time and space complexity
- Compare with O(n²) approach
- Relate to real-world applications
- Handle edge cases

─────────────────────────────────────────

🎯 COMPARISON WITH O(n²) APPROACH:

O(n²) Approach (See 01_O(n^2).js):
- For each element, check all previous elements
- Simple and intuitive
- Easy to understand and implement
- Time: O(n²), Space: O(n)
- Better for learning DP concepts

O(n log n) Approach (This solution):
- Use binary search to find insertion position
- Maintain array of smallest tail values
- More complex but faster
- Time: O(n log n), Space: O(n)
- Better for large inputs and optimal solution

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

⚠️ IMPORTANT: This algorithm only finds the LENGTH of LIS, not the actual
subsequence. The temp array does NOT represent the actual LIS.

To reconstruct the actual LIS, you need to:
1. Use the O(n²) approach with parent pointers, OR
2. Modify this algorithm to track parent indices during binary search

The temp array here is just for maintaining smallest tail values efficiently.

─────────────────────────────────────────

🎯 BINARY SEARCH EXPLANATION (ceilIdx):

The ceilIdx function finds the "ceiling" index - the smallest element in temp
that is ≥ target.

Example: temp = [2, 3, 7, 18], target = 5
- We want to find where 5 should go
- temp[0]=2 < 5, so search right
- temp[1]=3 < 5, so search right
- temp[2]=7 ≥ 5, this is our answer
- Return index 2

Why this works:
- temp is always sorted (by construction)
- We want smallest element ≥ target
- Binary search finds this efficiently

─────────────────────────────────────────

🎯 WHY SMALLEST TAIL MATTERS:

Example: Consider subsequences of length 2
- Option 1: [2, 5] → tail = 5
- Option 2: [2, 3] → tail = 3

Both are valid subsequences of length 2, but [2, 3] is better because:
- We can extend it with smaller values (e.g., 4, 5, 6, ...)
- [2, 5] can only be extended with values > 5

By maintaining smallest tail, we maximize future extension possibilities.

─────────────────────────────────────────

🎯 CONCLUSION:
Longest Increasing Subsequence using Binary Search efficiently finds the
length of the longest strictly increasing subsequence by maintaining an array
of smallest tail values for each subsequence length, using binary search to
find optimal insertion positions, achieving O(n log n) time and O(n) space
complexity. This is the optimal solution for large inputs!
*/