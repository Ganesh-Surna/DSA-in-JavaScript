// Given two sorted arrays arr1[] of size N and arr2[] of size M. Each array is sorted in non-decreasing order. Merge the two arrays into one sorted array in non-decreasing order without using any extra space.


// Example 1:

// Input:
// N = 4, M = 5
// arr1[] = {1, 3, 5, 7}
// arr2[] = {0, 2, 6, 8, 9}
// Output: 0 1 2 3 5 6 7 8 9
// Explanation: Since you can't use any 
// extra space, modify the given arrays
// to form 
// arr1[] = {0, 1, 2, 3}
// arr2[] = {5, 6, 7, 8, 9}

// Example 2:

// Input:
// N = 2, M = 3
// arr1[] = {10, 12}
// arr2[] = {5, 18, 20}
// Output: 5 10 12 18 20
// Explanation: Since you can't use any
// extra space, modify the given arrays
// to form 
// arr1[] = {5, 10}
// arr2[] = {12, 18, 20}
 

// Your Task:
// You don't need to read input or print anything. Complete the function merge() which takes the two arrays arr1[], arr2[] and their sizes n and m, as input parameters. The function does not return anything. Use the given arrays to sort and merge arr1[] and arr2[] in-place. 
// Note: The generated output will print all the elements of arr1[] followed by all the elements of arr2[].


class Solution {
    // ✅ TC : O((N+M) log(N+M))
    // ✅ SC : O(1)
    // This method is inspired by the "Shell Sort algorithm" and is
    //  often called the "Gap Method" for merging two sorted arrays in-place (without extra space).
    merge(arr1, arr2, N, M) {
        let gap = Math.ceil((N + M) / 2);
        // Here gap > 0. Inside the loop if the gap===1 then break it. (Because it continue the inner loop one time even for gap===1)
        while (gap > 0) {
            let i = 0, j = gap;
            while (j < N + M) {
                // Get values and their array/indices
                let a, b;
                if (i < N) a = arr1[i];
                else a = arr2[i - N];
                if (j < N) b = arr1[j];
                else b = arr2[j - N];

                // Only if they are out of order
                if (a > b) {
                    if (i < N && j < N) {
                        // Both in arr1
                        [arr1[i], arr1[j]] = [arr1[j], arr1[i]];
                    } else if (i < N && j >= N) {
                        // i in arr1, j in arr2
                        [arr1[i], arr2[j - N]] = [arr2[j - N], arr1[i]];
                    } else {
                        // Both in arr2
                        [arr2[i - N], arr2[j - N]] = [arr2[j - N], arr2[i - N]];
                    }
                }
                i++;
                j++;
            }
            if (gap === 1) break;
            gap = Math.ceil(gap / 2);
        }

        return [...arr1, ...arr2]
    }
}

// Absolutely! Let’s walk through the flow of the code using the first example:

// **Input:**
// - N = 4, M = 5  
// - arr1 = [1, 3, 5, 7]  
// - arr2 = [0, 2, 6, 8, 9]

// **Goal:**  
// After merging in-place,  
// - arr1 = [0, 1, 2, 3]  
// - arr2 = [5, 6, 7, 8, 9]

// ---

// ## Step-by-Step Flow

// ### 1. **Initialize the Gap**
// - Total length = N + M = 9
// - Initial gap = Math.ceil(9 / 2) = 5

// ### 2. **First Pass (gap = 5)**
// We compare elements that are 5 apart, swapping if out of order.

// - i = 0, j = 5: arr1[0] (1) vs arr2[1] (2) → 1 < 2, no swap
// - i = 1, j = 6: arr1[1] (3) vs arr2[2] (6) → 3 < 6, no swap
// - i = 2, j = 7: arr1[2] (5) vs arr2[3] (8) → 5 < 8, no swap
// - i = 3, j = 8: arr1[3] (7) vs arr2[4] (9) → 7 < 9, no swap
// - i = 4, j = 9: (j out of bounds, stop)

// **No swaps in this pass.**

// ---

// ### 3. **Second Pass (gap = 3)**
// gap = Math.ceil(5 / 2) = 3

// - i = 0, j = 3: arr1[0] (1) vs arr1[3] (7) → 1 < 7, no swap
// - i = 1, j = 4: arr1[1] (3) vs arr2[0] (0) → 3 > 0, swap → arr1[1]=0, arr2[0]=3  
//   Now arr1 = [1, 0, 5, 7], arr2 = [3, 2, 6, 8, 9]
// - i = 2, j = 5: arr1[2] (5) vs arr2[1] (2) → 5 > 2, swap → arr1[2]=2, arr2[1]=5  
//   arr1 = [1, 0, 2, 7], arr2 = [3, 5, 6, 8, 9]
// - i = 3, j = 6: arr1[3] (7) vs arr2[2] (6) → 7 > 6, swap → arr1[3]=6, arr2[2]=7  
//   arr1 = [1, 0, 2, 6], arr2 = [3, 5, 7, 8, 9]
// - i = 4, j = 7: arr2[0] (3) vs arr2[3] (8) → 3 < 8, no swap
// - i = 5, j = 8: arr2[1] (5) vs arr2[4] (9) → 5 < 9, no swap

// ---

// ### 4. **Third Pass (gap = 2)**
// gap = Math.ceil(3 / 2) = 2

// - i = 0, j = 2: arr1[0] (1) vs arr1[2] (2) → 1 < 2, no swap
// - i = 1, j = 3: arr1[1] (0) vs arr1[3] (6) → 0 < 6, no swap
// - i = 2, j = 4: arr1[2] (2) vs arr2[0] (3) → 2 < 3, no swap
// - i = 3, j = 5: arr1[3] (6) vs arr2[1] (5) → 6 > 5, swap → arr1[3]=5, arr2[1]=6  
//   arr1 = [1, 0, 2, 5], arr2 = [3, 6, 7, 8, 9]
// - i = 4, j = 6: arr2[0] (3) vs arr2[2] (7) → 3 < 7, no swap
// - i = 5, j = 7: arr2[1] (6) vs arr2[3] (8) → 6 < 8, no swap
// - i = 6, j = 8: arr2[2] (7) vs arr2[4] (9) → 7 < 9, no swap

// ---

// ### 5. **Fourth Pass (gap = 1)**
// gap = Math.ceil(2 / 2) = 1

// - i = 0, j = 1: arr1[0] (1) vs arr1[1] (0) → 1 > 0, swap → arr1[0]=0, arr1[1]=1  
//   arr1 = [0, 1, 2, 5], arr2 = [3, 6, 7, 8, 9]
// - i = 1, j = 2: arr1[1] (1) vs arr1[2] (2) → 1 < 2, no swap
// - i = 2, j = 3: arr1[2] (2) vs arr1[3] (5) → 2 < 5, no swap
// - i = 3, j = 4: arr1[3] (5) vs arr2[0] (3) → 5 > 3, swap → arr1[3]=3, arr2[0]=5  
//   arr1 = [0, 1, 2, 3], arr2 = [5, 6, 7, 8, 9]
// - i = 4, j = 5: arr2[0] (5) vs arr2[1] (6) → 5 < 6, no swap
// - i = 5, j = 6: arr2[1] (6) vs arr2[2] (7) → 6 < 7, no swap
// - i = 6, j = 7: arr2[2] (7) vs arr2[3] (8) → 7 < 8, no swap
// - i = 7, j = 8: arr2[3] (8) vs arr2[4] (9) → 8 < 9, no swap

// ---

// ### 6. **Done!**
// After the last pass, the arrays are:
// - arr1 = [0, 1, 2, 3]
// - arr2 = [5, 6, 7, 8, 9]

// ---

// ## **Summary of the Flow**
// - The code uses a shrinking gap to compare and swap elements that are far apart, gradually bringing the arrays closer to sorted order.
// - It works across both arrays as if they were a single combined array.
// - No extra space is used; all swaps are in-place.

// Let me know if you want a step-by-step for the second example or have any questions!