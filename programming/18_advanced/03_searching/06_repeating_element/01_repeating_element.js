/*
Problem: Find Repeating Element
================================

Given an array of integers where:
1. All elements from 1 to max(arr) are present in the array
2. Only one element repeats one or more times
3. 1 <= max(arr) <= n-1 (where n is the size of the array)

Find the repeating element in O(n) time, O(1) space, and without modifying the original array.

Examples:
---------
Input: arr[] = {1, 3, 2, 4, 3, 3}
Output: 3
Explanation: Array size n=6, max element=4. All elements 1,2,3,4 are present. Element 3 repeats.

Input: arr[] = {1, 1}
Output: 1
Explanation: Array size n=2, max element=1. Element 1 repeats.

Input: arr[] = {3, 4, 5, 1, 2, 4, 4}
Output: 4
Explanation: Array size n=7, max element=5. All elements 1,2,3,4,5 are present. Element 4 repeats.

Approach: Floyd's Cycle Detection Algorithm (Tortoise and Hare)
- Treat the array as a linked list where arr[i] points to arr[arr[i]]
- The repeating element creates a cycle in this linked list
- Use two pointers (slow and fast) to detect the cycle
- Find the start of the cycle, which is the repeating element
*/

// ✅ Floyd's Cycle Detection Algorithm (Tortoise and Hare)
// ✅Does not modify the original array

// ✅ TC = O(n)
// ✅ SC = O(1)
function findRepeatingElement(arr) {
    let slow = arr[0], fast = arr[0];
    
    // ✅ Phase 1: Detect if there's a cycle
    // Move slow pointer by 1 step, fast pointer by 2 steps
    do {
        slow = arr[slow];
        fast = arr[arr[fast]];
    } while (slow !== fast);
    
    // ✅ Phase 2: Find the start of the cycle (repeating element)
    slow = arr[0];
    while (slow !== fast) {
        slow = arr[slow];
        fast = arr[fast];
    }
    
    return slow; // or fast (both point to the repeating element)
}

// Alternative implementation with debugging traces
function findRepeatingElementWithTrace(arr) {
    let slow = arr[0], fast = arr[0];
    let slowTrace = [slow];
    let fastTrace = [fast];
    
    // Phase 1: Detect cycle
    do {
        slow = arr[slow];
        fast = arr[arr[fast]];
        slowTrace.push(slow);
        fastTrace.push(fast);
    } while (slow !== fast);
    
    slowTrace.push("--- PHASE 2 START ---");
    fastTrace.push("--- PHASE 2 START ---");
    
    // Phase 2: Find cycle start
    slow = arr[0];
    while (slow !== fast) {
        slow = arr[slow];
        fast = arr[fast];
        slowTrace.push(slow);
        fastTrace.push(fast);
    }
    
    console.log("Slow pointer trace:", slowTrace);
    console.log("Fast pointer trace:", fastTrace);
    
    return slow;
}

// Test cases from the problem examples
console.log("=== Test Cases ===");

// Test case 1: arr[] = {1, 3, 2, 4, 3, 3}
let arr1 = [1, 3, 2, 4, 3, 3];
console.log(`Input: [${arr1.join(', ')}]`);
console.log(`Output: ${findRepeatingElement(arr1)}`); // Expected: 3
console.log();

// Test case 2: arr[] = {1, 1}
let arr2 = [1, 1];
console.log(`Input: [${arr2.join(', ')}]`);
console.log(`Output: ${findRepeatingElement(arr2)}`); // Expected: 1
console.log();

// Test case 3: arr[] = {3, 4, 5, 1, 2, 4, 4}
let arr3 = [3, 4, 5, 1, 2, 4, 4];
console.log(`Input: [${arr3.join(', ')}]`);
console.log(`Output: ${findRepeatingElement(arr3)}`); // Expected: 4
console.log();

// Additional test case with debugging
console.log("=== Debugging Example ===");
let debugArr = [1, 3, 2, 4, 3, 3];
console.log(`Input: [${debugArr.join(', ')}]`);
console.log(`Output: ${findRepeatingElementWithTrace(debugArr)}`);