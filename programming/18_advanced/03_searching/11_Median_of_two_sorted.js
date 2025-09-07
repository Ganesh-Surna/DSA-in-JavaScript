/* Problem:
Given two sorted arrays of sizes N and M respectively. 
The task is to find the median of the two arrays when they get merged.
If there are even number of elements in the resulting array, 
find the floor of the average of two medians.

Example 1:
Input:
N = 5
M = 6
arr[] = {1,2,3,4,5}
brr[] = {3,4,5,6,7,8}
Output: 4
Explanation: After merging two arrays, we get 1,2,3,3,4,4,5,5,6,7,8. Median is 4.

Example 2:
Input:
N = 2
M = 3
arr[] = {1,2}
brr[] = {2,3,4}
Output: 2
Explanation: After merging two arrays, we get 1,2,2,3,4. Median is 2.

Expected Time Complexity : O(log(max(m,n)))
Expected Auxilliary Space : O(1)
*/

// ✅ TC = O(log(min(n, m))) --> MIN
// ✅ SC = O(1)
function findMedian(arr, brr, n, m) {
    // Ensure arr is the smaller array
    if (n > m) {
        return findMedian(brr, arr, m, n);
    }
    
    let total = n + m;
    let half = Math.floor((total + 1) / 2);
    
    let low = 0, high = n;
    
    while (low <= high) {
        let i = Math.floor((low + high) / 2); // partition in arr
        let j = half - i; // partition in brr
        
        let arrLeft = (i === 0) ? Number.NEGATIVE_INFINITY : arr[i-1];
        let arrRight = (i === n) ? Number.POSITIVE_INFINITY : arr[i];
        let brrLeft = (j === 0) ? Number.NEGATIVE_INFINITY : brr[j-1];
        let brrRight = (j === m) ? Number.POSITIVE_INFINITY : brr[j];
        
        if (arrLeft <= brrRight && brrLeft <= arrRight) {
            // Valid partition found
            if (total % 2 === 1) {
                return Math.max(arrLeft, brrLeft);
            } else {
                let leftMax = Math.max(arrLeft, brrLeft);
                let rightMin = Math.min(arrRight, brrRight);
                return Math.floor((leftMax + rightMin) / 2);
            }
        } else if (arrLeft > brrRight) {
            high = i - 1;
        } else {
            low = i + 1;
        }
    }
    
    return -1; // Should not reach here for valid inputs
}

/*🎯 CORE IDEA: Instead of merging arrays (O(n+m)), we use BINARY SEARCH to find the correct partition point.

📋 STEP-BY-STEP FLOW:

1️⃣ PREPROCESSING:
   - Ensure arr is smaller array (swap if needed)
   - Calculate total elements = n + m
   - Calculate half = floor((total + 1) / 2) - this gives us the position where median lies

2️⃣ BINARY SEARCH ON PARTITION POINTS:
   - low = 0, high = n (search space is size of smaller array)
   - For each iteration:
     * i = partition point in arr (how many elements to take from arr)
     * j = half - i (how many elements to take from brr)
     * This ensures we always take exactly 'half' elements total

3️⃣ CHECK PARTITION VALIDITY:
   - arrLeft = last element in left partition of arr
   - arrRight = first element in right partition of arr  
   - brrLeft = last element in left partition of brr
   - brrRight = first element in right partition of brr
   
   ✅ Valid partition when: arrLeft ≤ brrRight AND brrLeft ≤ arrRight
   ❌ Invalid partition when: arrLeft > brrRight OR brrLeft > arrRight

4️⃣ ADJUST SEARCH SPACE:
   - If arrLeft > brrRight: take fewer elements from arr (high = i-1)
   - If brrLeft > arrRight: take more elements from arr (low = i+1)

5️⃣ RETURN MEDIAN:
   - Odd total: median = max(arrLeft, brrLeft)
   - Even total: median = floor((max(arrLeft, brrLeft) + min(arrRight, brrRight)) / 2)

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(log(min(n,m))) vs O(n+m) for merging
2️⃣ SPACE: O(1) vs O(n+m) for storing merged array
3️⃣ INTUITION: We don't need the actual merged array, just the median position
4️⃣ BINARY SEARCH: We're searching for the "correct partition" that gives us median

💡 KEY INSIGHT:
The median divides the merged array into two equal halves. We use binary search to find 
the partition point in the smaller array such that:
- Left half has exactly floor((n+m+1)/2) elements
- All elements in left half ≤ all elements in right half
*/


/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [1,2,3,4,5]     (n=5)
brr = [3,4,5,6,7,8]   (m=6)
total = 11, half = 6

🎯 GOAL: Find median without merging arrays!

🔍 BINARY SEARCH PROCESS:

ITERATION 1: low=0, high=5
i = (0+5)/2 = 2, j = 6-2 = 4

📋 PARTITION VISUALIZATION:
arr: [1,2] | [3,4,5]     (take 2 from arr)
brr: [3,4,5,6] | [7,8]   (take 4 from brr)

🔍 CHECK VALUES:
arrLeft = arr[1] = 2     (last of left partition)
arrRight = arr[2] = 3   (first of right partition)  
brrLeft = brr[3] = 6    (last of left partition)
brrRight = brr[4] = 7   (first of right partition)

✅ VALIDITY CHECK:
2 ≤ 7 ✓ (arrLeft ≤ brrRight)
6 ≤ 3 ✗ (brrLeft > arrRight) → INVALID!

🔄 ADJUSTMENT: Need MORE elements from arr
low = 2+1 = 3, high = 5

─────────────────────────────────────────

ITERATION 2: low=3, high=5  
i = (3+5)/2 = 4, j = 6-4 = 2

📋 PARTITION VISUALIZATION:
arr: [1,2,3,4] | [5]     (take 4 from arr)
brr: [3,4] | [5,6,7,8]   (take 2 from brr)

🔍 CHECK VALUES:
arrLeft = arr[3] = 4     (last of left partition)
arrRight = arr[4] = 5   (first of right partition)
brrLeft = brr[1] = 4    (last of left partition)  
brrRight = brr[2] = 5   (first of right partition)

✅ VALIDITY CHECK:
4 ≤ 5 ✓ (arrLeft ≤ brrRight)
4 ≤ 5 ✓ (brrLeft ≤ arrRight) → VALID! 🎉

🏆 FINAL RESULT:
Left half: [1,2,3,4] + [3,4] = [1,2,3,3,4,4] (6 elements)
Right half: [5] + [5,6,7,8] = [5,5,6,7,8] (5 elements)

Since total=11 (odd), median = max(arrLeft, brrLeft) = max(4,4) = 4

🎯 VERIFICATION: Merged array = [1,2,3,3,4,4,5,5,6,7,8]
Median at position 6 = 4 ✓

*/