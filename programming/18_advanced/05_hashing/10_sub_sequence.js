/* Problem:
Find the length of the longest subsequence in an array that forms a consecutive sequence.

A consecutive sequence is a sequence of numbers where each number is exactly 1 more than the previous number.

Example 1:
Input: arr[] = [1, 3, 9, 2, 8, 2]
Output: 3
Explanation: The longest consecutive subsequence is [1, 2, 3] with length 3.
Note: The subsequence doesn't need to be contiguous in the original array.

Example 2:
Input: arr[] = [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The longest consecutive subsequence is [1, 2, 3, 4] with length 4.

Example 3:
Input: arr[] = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
Output: 9
Explanation: The longest consecutive subsequence is [0, 1, 2, 3, 4, 5, 6, 7, 8] with length 9.

Constraints:
0 ≤ n ≤ 10^5
-10^9 ≤ arr[i] ≤ 10^9

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n)
*/

// ✅ TC = O(2n) = O(n) --> Each element visited at most twice
// ✅ SC = O(n) --> Set for O(1) lookup
function maxSubSeqLen(arr){
    let s = new Set(arr)  // Create set for O(1) lookup
    
    let res = 0;
    for(let i=0; i<arr.length; i++){
        
        // Only start counting from the beginning of a sequence
        if(s.has(arr[i]-1)===false){
            
            let curr = 1  // Current sequence length
            while(s.has(arr[i]+curr)){  // Count consecutive elements
                curr++
            }
            
            res = Math.max(res, curr)  // Update maximum length
        }
    }
    
    return res
}

// ✅ Test Cases
console.log(maxSubSeqLen([1, 3, 9, 2, 8, 2])); // 3 (1, 2, 3)
console.log(maxSubSeqLen([100, 4, 200, 1, 3, 2])); // 4 (1, 2, 3, 4)
console.log(maxSubSeqLen([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); // 9 (0, 1, 2, 3, 4, 5, 6, 7, 8)
console.log(maxSubSeqLen([1, 2, 0, 1])); // 3 (0, 1, 2)

/*🎯 CORE IDEA: Instead of sorting the array (O(n log n)), we use a HASH SET and SMART SEQUENCE DETECTION to efficiently find the longest consecutive subsequence in O(n) time.

📋 STEP-BY-STEP FLOW:

1️⃣ HASH SET CREATION:
   - Create a Set from the array for O(1) lookup
   - This allows us to quickly check if a number exists in the array
   - Duplicates are automatically handled by Set

2️⃣ SEQUENCE START DETECTION:
   - For each element, check if (element - 1) exists in the set
   - If (element - 1) doesn't exist, this element is the START of a sequence
   - This prevents counting the same sequence multiple times

3️⃣ SEQUENCE COUNTING:
   - Starting from a sequence start, count consecutive elements
   - Use while loop: while (element + count) exists in set
   - Increment count for each consecutive element found

4️⃣ MAXIMUM TRACKING:
   - Keep track of the maximum sequence length found
   - Update maximum whenever a longer sequence is discovered

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) vs O(n log n) for sorting approach
2️⃣ SMART DETECTION: Only count each sequence once by starting from sequence beginnings
3️⃣ HASH SET: O(1) lookup enables efficient consecutive element checking
4️⃣ SINGLE PASS: Each element is visited at most twice

💡 KEY INSIGHTS:

1️⃣ SEQUENCE START: Only start counting from elements that don't have (element-1)
2️⃣ CONSECUTIVE CHECKING: Use hash set to check if next consecutive element exists
3️⃣ AVOID DUPLICATES: By starting from sequence beginnings, we avoid recounting
4️⃣ LINEAR TIME: Each element is processed at most twice (once in outer loop, once in inner while)

🎯 WHY EACH ELEMENT VISITED AT MOST TWICE?
- Outer loop: Each element visited once
- Inner while loop: Each element visited at most once (when checking consecutive elements)
- Total: O(n) time complexity

🎯 ALGORITHM INTUITION:
Think of it as finding "islands" of consecutive numbers. We only start exploring each island once
(from its leftmost point), and we explore the entire island before moving to the next one.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [1, 3, 9, 2, 8, 2]     (n=6)

🎯 GOAL: Find longest consecutive subsequence!

🔍 STEP-BY-STEP PROCESS:

1️⃣ HASH SET CREATION:
s = Set([1, 3, 9, 2, 8, 2]) = {1, 2, 3, 8, 9}
Note: Duplicate 2 is automatically handled by Set

2️⃣ SEQUENCE DETECTION:

📋 Process each element:

ITERATION 0: i=0, arr[0] = 1
Check: s.has(1-1) = s.has(0) = false ✓
This is a sequence start!
curr = 1
while(s.has(1+1)) = while(s.has(2)) = true → curr = 2
while(s.has(1+2)) = while(s.has(3)) = true → curr = 3
while(s.has(1+3)) = while(s.has(4)) = false → stop
res = max(0, 3) = 3

📊 Found sequence: [1, 2, 3] with length 3

─────────────────────────────────────────

ITERATION 1: i=1, arr[1] = 3
Check: s.has(3-1) = s.has(2) = true ✗
Skip this element (not a sequence start)

─────────────────────────────────────────

ITERATION 2: i=2, arr[2] = 9
Check: s.has(9-1) = s.has(8) = true ✗
Skip this element (not a sequence start)

─────────────────────────────────────────

ITERATION 3: i=3, arr[3] = 2
Check: s.has(2-1) = s.has(1) = true ✗
Skip this element (not a sequence start)

─────────────────────────────────────────

ITERATION 4: i=4, arr[4] = 8
Check: s.has(8-1) = s.has(7) = false ✓
This is a sequence start!
curr = 1
while(s.has(8+1)) = while(s.has(9)) = true → curr = 2
while(s.has(8+2)) = while(s.has(10)) = false → stop
res = max(3, 2) = 3

📊 Found sequence: [8, 9] with length 2

─────────────────────────────────────────

ITERATION 5: i=5, arr[5] = 2
Check: s.has(2-1) = s.has(1) = true ✗
Skip this element (not a sequence start)

🏆 FINAL RESULT: res = 3

🎯 VERIFICATION:
- Longest consecutive subsequence: [1, 2, 3]
- Length: 3 ✓
- Elements exist in original array: 1✓, 2✓, 3✓

─────────────────────────────────────────

📊 COMPLEX EXAMPLE:
arr = [100, 4, 200, 1, 3, 2]     (n=6)

🔍 HASH SET:
s = {1, 2, 3, 4, 100, 200}

🔍 SEQUENCE DETECTION:

📋 Key iterations:
- i=0, arr[0]=100: s.has(99)=false → sequence [100], length=1
- i=1, arr[1]=4: s.has(3)=true → skip
- i=2, arr[2]=200: s.has(199)=false → sequence [200], length=1  
- i=3, arr[3]=1: s.has(0)=false → sequence [1,2,3,4], length=4
- i=4, arr[4]=3: s.has(2)=true → skip
- i=5, arr[5]=2: s.has(1)=true → skip

🏆 FINAL RESULT: res = 4

🎯 VERIFICATION:
- Longest consecutive subsequence: [1, 2, 3, 4]
- Length: 4 ✓
- Elements exist in original array: 1✓, 2✓, 3✓, 4✓

🔍 WHY THIS WORKS:
1️⃣ HASH SET enables O(1) lookup for consecutive element checking
2️⃣ SEQUENCE START detection prevents duplicate counting
3️⃣ CONSECUTIVE COUNTING finds complete sequences efficiently
4️⃣ LINEAR TIME complexity achieved by smart sequence detection

💡 KEY INSIGHT:
We don't need to sort the array - we can find consecutive sequences by
checking if consecutive numbers exist in the array using hash set lookup!

🎯 TIME COMPLEXITY ANALYSIS:
- Hash set creation: O(n)
- Outer loop: O(n) iterations
- Inner while loop: Each element visited at most once across all iterations
- Total: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Hash set storage: O(n) space
- Other variables: O(1) space
- Total: O(n) space complexity

*/