/* Problem:
You are given an array arr[] of distinct positive integers that is closely sorted, and a target element x, your task is to find the index of x in the array. If x is not present, return -1.

Closer Sorted: The array is sorted, but after sorting some elements are moved to either of the adjacent positions, i.e, maybe to the arr[i+1] or arr[i-1].

Example 1:
Input:
arr[] = [3, 2, 10, 4, 40]
x = 2
Output: 1
Explanation: 2 is present at index 1 (0-based indexing) in the given array.
The array is closely sorted: [2, 3, 4, 10, 40] with some elements moved to adjacent positions.

Example 2:
Input:
arr[] = [2, 1, 4, 3]
x = 5
Output: -1
Explanation: 5 is not in the array so the output will be -1.

Example 3:
Input:
arr[] = [5, 10, 30, 20, 50]
x = 20
Output: 3
Explanation: 20 is at index 3. The sorted array would be [5, 10, 20, 30, 50].

Constraints:
1 ≤ arr.size() ≤ 10^6
1 ≤ arr[i], x ≤ 10^9

Expected Time Complexity: O(log n)
Expected Auxiliary Space: O(1)
*/

// ✅ TC = O(log n) --> Modified Binary Search
// ✅ SC = O(1)
function searchInCloserSort(arr, x) {
    let n = arr.length;
    let l = 0, h = n - 1;

    while (l <= h) {
        let mid = Math.floor((l + h) / 2);

        // Check mid and neighbors
        if (arr[mid] === x) return mid;
        if (mid > l && arr[mid - 1] === x) return mid - 1;
        if (mid < h && arr[mid + 1] === x) return mid + 1;

        // Normal binary search move
        if (x < arr[mid]) {
            h = mid - 2; // skip mid and mid-1
        } else {
            l = mid + 2; // skip mid and mid+1
        }
    }

    return -1;
}

// ✅ Test Cases
console.log(searchInCloserSort([3, 2, 10, 4, 40], 2));  // 1
console.log(searchInCloserSort([2, 1, 4, 3], 5));       // -1
console.log(searchInCloserSort([5, 10, 30, 20, 50], 20)); // 3
console.log(searchInCloserSort([10, 3, 40, 20, 50, 80, 70], 40)); // 2

/*🎯 CORE IDEA: Instead of linear search (O(n)), we use MODIFIED BINARY SEARCH that accounts for the "closely sorted" property where elements can be at most 1 position away from their correct sorted position.

📋 STEP-BY-STEP FLOW:

1️⃣ UNDERSTANDING "CLOSELY SORTED":
   - Array is sorted, but some elements are moved to adjacent positions (±1)
   - Element at position i can be at: i-1, i, or i+1
   - This means: arr[i-1] ≤ arr[i] ≤ arr[i+1] (approximately)
   - Key insight: We can still use binary search with modifications!

2️⃣ MODIFIED BINARY SEARCH APPROACH:
   - Check current mid position: arr[mid] == x?
   - Check left neighbor: arr[mid-1] == x? (if mid > 0)
   - Check right neighbor: arr[mid+1] == x? (if mid < n-1)
   - If found, return the index
   - If not found, decide which half to search

3️⃣ SEARCH SPACE REDUCTION:
   - If x < arr[mid]: search left half
     * But skip mid-1 position (already checked)
     * Set high = mid - 2
   - If x > arr[mid]: search right half  
     * But skip mid+1 position (already checked)
     * Set low = mid + 2

4️⃣ WHY SKIP ADJACENT POSITIONS?
   - We already checked arr[mid-1] and arr[mid+1]
   - No need to check them again in next iteration
   - This maintains O(log n) complexity

5️⃣ EDGE CASES HANDLING:
   - Boundary checks: mid > l, mid < h
   - Prevents array index out of bounds
   - Handles arrays of size 1 or 2

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(log n) vs O(n) for linear search
2️⃣ LEVERAGES SORTED PROPERTY: Even though "closely sorted", still mostly sorted
3️⃣ ADJACENT CHECKING: Accounts for the ±1 position movement
4️⃣ OPTIMAL SEARCH SPACE: Skips already checked positions

💡 KEY INSIGHTS:

1️⃣ CLOSELY SORTED MEANS: Elements are at most 1 position away from correct position
2️⃣ BINARY SEARCH WORKS: Because the array is still "mostly sorted"
3️⃣ CHECK NEIGHBORS: Since elements can be at adjacent positions
4️⃣ SKIP CHECKED POSITIONS: To maintain logarithmic complexity

🎯 MATHEMATICAL PROOF:
For a closely sorted array, if we're looking for x:
- If x < arr[mid], x cannot be in positions mid+1, mid+2, ... (array is sorted)
- If x > arr[mid], x cannot be in positions mid-1, mid-2, ... (array is sorted)
- We only need to check adjacent positions due to the "closely sorted" property
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [3, 2, 10, 4, 40]     (n=5)
x = 2

🎯 GOAL: Find index of 2 in closely sorted array

🔍 BINARY SEARCH PROCESS:

ITERATION 1: l=0, h=4
mid = (0+4)/2 = 2

📋 CHECK POSITIONS:
- arr[2] = 10 ≠ 2
- arr[1] = 2 = 2 ✓ FOUND!

🏆 RESULT: Return index 1

─────────────────────────────────────────

📊 ANOTHER EXAMPLE:
arr = [5, 10, 30, 20, 50]   (n=5)  
x = 20

🔍 BINARY SEARCH PROCESS:

ITERATION 1: l=0, h=4
mid = (0+4)/2 = 2

📋 CHECK POSITIONS:
- arr[2] = 30 ≠ 20
- arr[1] = 10 ≠ 20  
- arr[3] = 20 = 20 ✓ FOUND!

🏆 RESULT: Return index 3

─────────────────────────────────────────

📊 COMPLEX EXAMPLE:
arr = [10, 3, 40, 20, 50, 80, 70]   (n=7)
x = 40

🔍 BINARY SEARCH PROCESS:

ITERATION 1: l=0, h=6
mid = (0+6)/2 = 3

📋 CHECK POSITIONS:
- arr[3] = 20 ≠ 40
- arr[2] = 40 = 40 ✓ FOUND!

🏆 RESULT: Return index 2

🎯 VERIFICATION: 
- Sorted array would be: [3, 10, 20, 40, 50, 70, 80]
- Element 40 is at position 3 in sorted array
- In closely sorted array, it's at position 2 (moved left by 1)
- Our algorithm correctly finds it! ✓

🔍 WHY THIS WORKS:
- Even though array is "closely sorted", binary search logic still applies
- We just need to check adjacent positions due to possible ±1 movement
- The search space reduction is still logarithmic
- We maintain O(log n) complexity by skipping already checked positions

*/
