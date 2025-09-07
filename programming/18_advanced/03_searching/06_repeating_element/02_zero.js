/*
Problem: Find Repeating Element
================================

Given an array of integers where:
1. All elements from 0 to max(arr) are present in the array
2. Only one element repeats (any number of times)
3. 0 <= max(arr) <= n-2 (where n is the size of the array)
4. n >= 2

Find the repeating element.

Examples:
---------
Input: arr[] = {0, 2, 1, 3, 2, 2}
Output: 2
Explanation: Array size n=6, max element=3. All elements 0,1,2,3 are present. Element 2 repeats 3 times.

Input: arr[] = {1, 2, 3, 0, 3, 4, 5}
Output: 3
Explanation: Array size n=7, max element=5. All elements 0,1,2,3,4,5 are present. Element 3 repeats.

Input: arr[] = {0, 0}
Output: 0
Explanation: Array size n=2, max element=0. Element 0 repeats.

Approach: Floyd's Cycle Detection Algorithm (Tortoise and Hare)
- Treat the array as a linked list where arr[i] points to arr[arr[i]]
- The repeating element creates a cycle in this linked list
- Use two pointers (slow and fast) to detect the cycle
- Find the start of the cycle, which is the repeating element
*/


function findRepeatingElement(arr) {
    let slow = arr[0] + 1, fast = arr[0] + 1;
    
    // ✅ Phase 1: Detect if there's a cycle
    // Move slow pointer by 1 step, fast pointer by 2 steps
    do {
        slow = arr[slow] + 1;
        fast = arr[arr[fast] + 1] + 1; //🍑
    } while (slow !== fast);
    
    // ✅ Phase 2: Find the start of the cycle (repeating element)
    slow = arr[0] + 1;
    while (slow !== fast) {
        slow = arr[slow] + 1;
        fast = arr[fast] + 1;
    }
    
    return slow - 1; // or fast - 1 (both point to the repeating element)
}

let arr = [0, 2, 1, 3, 5, 4, 6, 2] // 2
arr = [0, 2, 1, 3, 2, 2] // 2
arr = [1, 2, 3, 0, 3, 4, 5] // 3
arr= [0, 0] // 0

console.log(findRepeatingElement(arr))