/* Problem: ✅✅✅✅ Minimum Deletions to Make Array Sorted (Variation of LIS) ✅✅✅✅

Given an integer array `arr`, find the minimum number of elements to delete so
that the remaining array is sorted in strictly increasing order.

🎯 Goal: Find the minimum number of deletions needed to make the array sorted.

Key Insight: This is a variation of the Longest Increasing Subsequence (LIS)
problem. To minimize deletions, we need to maximize the number of elements we
keep. The longest increasing subsequence gives us the maximum elements we can
keep. Therefore:
  Minimum deletions = n - LIS_length

Example 1:
Input: arr = [10, 9, 2, 5, 3, 7, 101, 18, 200]
Output: 4
Explanation:
  - LIS = [2, 3, 7, 101, 200] with length 5
  - Keep these 5 elements, delete the other 4: [10, 9, 5, 18]
  - Result: [2, 3, 7, 101, 200] is sorted
  - Deletions = 9 - 5 = 4

Example 2:
Input: arr = [0, 1, 0, 3, 2, 3]
Output: 2
Explanation:
  - LIS = [0, 1, 2, 3] with length 4
  - Keep these 4 elements, delete the other 2: [0, 3]
  - Result: [0, 1, 2, 3] is sorted
  - Deletions = 6 - 4 = 2

Example 3:
Input: arr = [10, 20, 30]
Output: 0
Explanation:
  - Array is already sorted
  - LIS = [10, 20, 30] with length 3
  - No deletions needed
  - Deletions = 3 - 3 = 0

Example 4:
Input: arr = [30, 20, 10]
Output: 2
Explanation:
  - All elements are decreasing
  - LIS = [30] or [20] or [10] with length 1
  - Keep 1 element, delete the other 2
  - Result: [30] or [20] or [10] is sorted
  - Deletions = 3 - 1 = 2

Example 5:
Input: arr = [10, 100, 20, 40]
Output: 1
Explanation:
  - LIS = [10, 20, 40] with length 3
  - Keep these 3 elements, delete 1: [100]
  - Result: [10, 20, 40] is sorted
  - Deletions = 4 - 3 = 1

Constraints:
- 1 ≤ arr.length ≤ 2500
- -10^4 ≤ arr[i] ≤ 10^4

Expected Complexities:
Time Complexity: O(n log n) where n = arr.length
Space Complexity: O(n) for the temp array

⚠️ Note: This is a variation of the Longest Increasing Subsequence (LIS)
problem. We use the same binary search approach as LIS to find the LIS length,
then calculate minimum deletions as n - LIS_length.

🧠 Core Idea:
- The problem reduces to finding the Longest Increasing Subsequence (LIS)
- Minimum deletions = Total elements - LIS length
- Use binary search approach (same as LIS) to find LIS length efficiently
- Maintain temp array with smallest tail values for each subsequence length

📈 Key Insight:
- To minimize deletions, maximize elements we keep
- The longest increasing subsequence is the maximum elements we can keep
- Therefore: deletions = n - LIS_length

🎯 Why This Approach?
- Optimal time complexity: O(n log n) using binary search
- Reduces to well-known LIS problem
- Efficient and elegant solution
- Space efficient: only O(n) space needed

💡 Key Insights:
- This is a variation of LIS problem
- Minimum deletions = n - LIS_length
- Use same binary search approach as LIS
- temp array maintains smallest tail values
- Final answer = n - temp.length
*/

// ✅ TC = O(n log n) where n = arr.length
// ✅ SC = O(n) for the temp array
function minDeletionsToGetSortedArr(arr){
    let n = arr.length
    
    // Find LIS using binary search approach
    // temp[i] = smallest tail value among all increasing subsequences of length i+1
    let temp = [arr[0]]
    
    // Process each element to build LIS
    for(let i=1; i<n; i++){
        if(arr[i] > temp[temp.length - 1]){
            // Current element extends the longest subsequence
            temp.push(arr[i])
        }else{
            // Use binary search to find position to replace
            // Maintains "smallest tail" property
            let idx = ceilIdx(temp, arr[i])
            temp[idx] = arr[i]
        }
    }
    
    // LIS length = temp.length
    let lisLen = temp.length // length of the longest increasing subsequence
    
    // Minimum deletions = Total elements - Elements we keep (LIS)
    return n - lisLen // min no.of deletions needed to make the arr sorted = n - len of LIS
    
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

console.log(minDeletionsToGetSortedArr([10, 9, 2, 5, 3, 7, 101, 18, 200])); // 4 = (9 - 5) --> lis = [2, 3, 7, 101, 200]
console.log(minDeletionsToGetSortedArr([0, 1, 0, 3, 2, 3])); // 2 = (6 - 4) --> lis = [0, 1, 2, 3]
console.log(minDeletionsToGetSortedArr([10, 20, 30])); // 0 = (3 - 3) --> lis = [10, 20, 30]
console.log(minDeletionsToGetSortedArr([30, 20, 10])); // 2 = (3 - 1) --> lis = [30] or [20] or [10]
console.log(minDeletionsToGetSortedArr([10, 100, 20, 40])) // 1 = (4 - 3) --> lis = [10, 20, 40]
console.log(minDeletionsToGetSortedArr([10, 20])) // 0 = (2 - 2) --> lis = [10, 20]
console.log(minDeletionsToGetSortedArr([10])) // 0 = (1 - 1) --> lis = [10]

/*🎯 STEP-BY-STEP WALKTHROUGH (arr = [10, 9, 2, 5, 3, 7, 101, 18, 200])

We'll find the LIS length using binary search, then calculate deletions.

Step 1: Find LIS Length
Initialization:
arr = [10, 9, 2, 5, 3, 7, 101, 18, 200]
temp = [10]  // Start with first element

Processing each element (same as LIS algorithm):

i=1: arr[1] = 9
  Compare: 9 > temp[0]=10? No
  Binary search: ceilIdx([10], 9) → 0
  temp[0] = 9
  temp = [9]

i=2: arr[2] = 2
  Compare: 2 > temp[0]=9? No
  Binary search: ceilIdx([9], 2) → 0
  temp[0] = 2
  temp = [2]

i=3: arr[3] = 5
  Compare: 5 > temp[0]=2? Yes
  Append: temp.push(5)
  temp = [2, 5]

i=4: arr[4] = 3
  Compare: 3 > temp[1]=5? No
  Binary search: ceilIdx([2, 5], 3) → 1
  temp[1] = 3
  temp = [2, 3]

i=5: arr[5] = 7
  Compare: 7 > temp[1]=3? Yes
  Append: temp.push(7)
  temp = [2, 3, 7]

i=6: arr[6] = 101
  Compare: 101 > temp[2]=7? Yes
  Append: temp.push(101)
  temp = [2, 3, 7, 101]

i=7: arr[7] = 18
  Compare: 18 > temp[3]=101? No
  Binary search: ceilIdx([2, 3, 7, 101], 18) → 3
  temp[3] = 18
  temp = [2, 3, 7, 18]

i=8: arr[8] = 200
  Compare: 200 > temp[3]=18? Yes
  Append: temp.push(200)
  temp = [2, 3, 7, 18, 200]

Final temp array:
temp = [2, 3, 7, 18, 200]
LIS length = temp.length = 5

Step 2: Calculate Minimum Deletions
Total elements: n = 9
LIS length: 5
Minimum deletions = n - LIS_length = 9 - 5 = 4

🏆 Result: 4 deletions needed

✅ Elements to keep: [2, 3, 7, 18, 200] (LIS)
✅ Elements to delete: [10, 9, 5, 101] (4 elements)

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Reduction to LIS
- Problem: Minimize deletions to make array sorted
- Equivalent: Maximize elements we keep (which must form increasing sequence)
- Solution: Find LIS, then deletions = n - LIS_length

Algorithm Steps:
1. Find LIS length using binary search approach
2. Calculate minimum deletions = n - LIS_length
3. Return result

Why This Works:
- To make array sorted, we need to keep elements in increasing order
- The longest increasing subsequence is the maximum elements we can keep
- Therefore, minimum deletions = total - maximum we can keep

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Finding LIS: O(n log n) using binary search
- Calculation: O(1)
- Total: O(n log n)

🎯 SPACE COMPLEXITY ANALYSIS:
- temp array: O(n) in worst case
- No additional space needed
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Already Sorted
Input: arr = [10, 20, 30]
LIS = [10, 20, 30], length = 3
Deletions = 3 - 3 = 0 ✓

CASE 2: All Decreasing
Input: arr = [30, 20, 10]
LIS = [30] or [20] or [10], length = 1
Deletions = 3 - 1 = 2 ✓

CASE 3: Single Element
Input: arr = [10]
LIS = [10], length = 1
Deletions = 1 - 1 = 0 ✓

CASE 4: All Same Elements
Input: arr = [5, 5, 5]
LIS = [5], length = 1
Deletions = 3 - 1 = 2 ✓

CASE 5: Mixed Pattern
Input: arr = [10, 100, 20, 40]
LIS = [10, 20, 40], length = 3
Deletions = 4 - 3 = 1 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ PROBLEM REDUCTION:
   - Minimize deletions = Maximize elements we keep
   - Elements we keep must form increasing sequence
   - Therefore: find longest increasing subsequence

2️⃣ OPTIMAL SUBSTRUCTURE:
   - LIS has optimal substructure property
   - Maximum elements we can keep = LIS length
   - Minimum deletions = n - LIS length

3️⃣ CORRECTNESS:
   - LIS gives maximum elements in sorted order
   - Remaining elements must be deleted
   - Formula: deletions = n - LIS_length is correct

4️⃣ EFFICIENCY:
   - Uses O(n log n) binary search approach
   - Optimal time complexity
   - Space efficient

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Correctly finds LIS length: ✓
- Formula n - LIS_length is correct: ✓
- Handles all edge cases: ✓
- Optimal time complexity: ✓
- Guarantees minimum deletions: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 3: Initialize temp array
  - Start with first element
  - temp[0] = smallest tail for length 1

Line 5-12: Find LIS length
  - Same algorithm as LIS problem
  - Use binary search for efficiency
  - Maintain smallest tail property

Line 14: Get LIS length
  - temp.length = LIS length

Line 16: Calculate deletions
  - Minimum deletions = n - LIS_length

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Data cleaning (remove outliers to get sorted data)
- Array optimization (minimize removals)
- Sequence processing
- Data preprocessing
- Quality control in sorted datasets

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Longest Increasing Subsequence (base problem)
- Minimum Deletions to Make Array Sorted (this problem)
- Longest Decreasing Subsequence
- Minimum Insertions to Make Array Sorted
- Remove Duplicates from Sorted Array

─────────────────────────────────────────

🎯 TESTING STRATEGY:
- Already sorted array
- All decreasing array
- Single element
- All same elements
- Mixed patterns
- Large arrays
- Negative numbers
- Duplicate values

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print temp array after each iteration
- Verify LIS length calculation
- Check deletion formula: n - LIS_length
- Trace through example manually
- Verify with known examples

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Forgetting to find LIS first
- Wrong formula (using LIS_length instead of n - LIS_length)
- Not understanding problem reduction
- Confusing with minimum insertions problem

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Understand problem reduction to LIS
- Use efficient binary search approach
- Verify formula: deletions = n - LIS_length
- Handle edge cases correctly
- Test with various inputs

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the problem reduction clearly
- Show how it relates to LIS
- Walk through the formula: n - LIS_length
- Discuss time and space complexity
- Handle edge cases
- Mention it's a variation of LIS

─────────────────────────────────────────

🎯 COMPARISON WITH OTHER APPROACHES:

Naive Approach (O(n²)):
- For each element, check all previous elements
- Build LIS using DP
- Time: O(n²), Space: O(n)
- Simpler but slower

Binary Search Approach (This solution):
- Use binary search to find LIS
- Maintain smallest tail values
- Time: O(n log n), Space: O(n)
- Faster and optimal

─────────────────────────────────────────

🎯 VARIATION NOTES:

This problem is a variation of LIS:
- Base problem: Find LIS length
- Variation: Find minimum deletions
- Relationship: deletions = n - LIS_length

Other variations:
- Minimum insertions to make sorted
- Maximum sum increasing subsequence
- Longest bitonic subsequence

─────────────────────────────────────────

🎯 WHY n - LIS_LENGTH?

Explanation:
- Total elements: n
- Elements we can keep (LIS): LIS_length
- Elements we must delete: n - LIS_length

Example:
- arr = [10, 9, 2, 5, 3, 7, 101, 18, 200]
- n = 9
- LIS = [2, 3, 7, 18, 200], length = 5
- Keep 5 elements, delete 9 - 5 = 4 elements
- Result: [2, 3, 7, 18, 200] is sorted

─────────────────────────────────────────

🎯 CONCLUSION:
Minimum Deletions to Make Array Sorted efficiently finds the minimum number
of deletions needed by reducing the problem to finding the Longest Increasing
Subsequence (LIS), then calculating deletions as n - LIS_length, achieving
O(n log n) time and O(n) space complexity using binary search!
*/