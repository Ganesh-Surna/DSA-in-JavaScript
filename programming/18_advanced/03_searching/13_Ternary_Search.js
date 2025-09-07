/* Problem: Ternary Search
Given a sorted array arr[] of size N and an integer x, 
find the position of x in the array using Ternary Search.

Ternary Search is a divide and conquer algorithm that divides the array into three parts instead of two.
It compares the target element with elements at two positions that divide the array into three equal parts.

Example 1:
Input:
N = 5
x = 6
arr[] = {1,2,3,4,6}
Output: 4
Explanation: 6 is found at index 4.

Example 2:
Input:
N = 5
x = 2
arr[] = {1,3,4,5,6}
Output: -1
Explanation: 2 is not found in the array.

Expected Time Complexity: O(log3 N)
Expected Auxiliary Space: O(1) for iterative, O(log3 N) for recursive
*/

// ✅ RECURSIVE SOLUTION
// TC = O(log3 N), SC = O(log3 N) due to recursion stack
// ✅ Recurrence for the worst case of Ternary Search: ✅ T(n) = T(n/3) + 4, T(1) = 1
function ternarySearchRecursive(arr, l, r, x) {
    if (r >= l) {
        let mid1 = l + Math.floor((r - l) / 3);
        let mid2 = mid1 + Math.floor((r - l) / 3);

        // If x is present at the mid1
        if (arr[mid1] === x) return mid1;

        // If x is present at the mid2
        if (arr[mid2] === x) return mid2;

        // If x is present in left one-third
        if (arr[mid1] > x) return ternarySearchRecursive(arr, l, mid1 - 1, x);

        // If x is present in right one-third
        if (arr[mid2] < x) return ternarySearchRecursive(arr, mid2 + 1, r, x);

        // If x is present in middle one-third
        return ternarySearchRecursive(arr, mid1 + 1, mid2 - 1, x);
    }
    // We reach here when element is not present in array
    return -1;
}

// ✅ ITERATIVE SOLUTION
// ✅ TC = O(log3 N)
// ✅ SC = O(1)
function ternarySearchIterative(arr, x) {
    let l = 0;
    let r = arr.length - 1;

    while (r >= l) {
        let mid1 = l + Math.floor((r - l) / 3);
        let mid2 = mid1 + Math.floor((r - l) / 3);

        // If x is present at the mid1
        if (arr[mid1] === x) return mid1;

        // If x is present at the mid2
        if (arr[mid2] === x) return mid2;

        // If x is present in left one-third
        if (arr[mid1] > x) {
            r = mid1 - 1;
        }
        // If x is present in right one-third
        else if (arr[mid2] < x) {
            l = mid2 + 1;
        }
        // If x is present in middle one-third
        else {
            l = mid1 + 1;
            r = mid2 - 1;
        }
    }
    // We reach here when element is not present in array
    return -1;
}

// testTernarySearch();

/* 🎯 HOW TERNARY SEARCH WORKS:

📋 CORE CONCEPT:
Instead of dividing array into 2 parts (binary search), ternary search divides it into 3 parts.

🔍 ALGORITHM STEPS:
1. Calculate two mid points: mid1 = l + (r-l)/3, mid2 = mid1 + (r-l)/3
2. Compare target with arr[mid1] and arr[mid2]
3. If found at either mid, return that index
4. If target < arr[mid1]: search in left third (l to mid1-1)
5. If target > arr[mid2]: search in right third (mid2+1 to r)
6. Otherwise: search in middle third (mid1+1 to mid2-1)

📊 COMPARISON WITH BINARY SEARCH:
- Binary Search: O(log2 N) comparisons
- Ternary Search: O(log3 N) comparisons
- Ternary makes MORE comparisons per iteration but fewer iterations
- Overall: Binary Search is more efficient due to fewer comparisons per step

🎯 WHEN TO USE:
- Educational purposes to understand divide & conquer
- When you need exactly 3-way partitioning
- Binary search is generally preferred for most cases

💡 KEY INSIGHT:
Ternary search reduces search space by 2/3 each iteration, but requires 2 comparisons per iteration.
Binary search reduces by 1/2 but needs only 1 comparison per iteration.
*/