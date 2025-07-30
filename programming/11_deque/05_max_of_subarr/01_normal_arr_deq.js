// Max of subarrays of size K

// Given an array and an integer K, 
// find the maximum for each and every contiguous subarray of size K.

// Examples : 

// Input: arr[] = {1, 2, 3, 1, 4, 5, 2, 3, 6}, K = 3 
// Output: 3 3 4 5 5 5 6
// Explanation: Maximum of 1, 2, 3 is 3
//              Maximum of 2, 3, 1 is 3
//              Maximum of 3, 1, 4 is 4
//              Maximum of 1, 4, 5 is 5
//              Maximum of 4, 5, 2 is 5 
//              Maximum of 5, 2, 3 is 5
//              Maximum of 2, 3, 6 is 6

// Input: arr[] = {8, 5, 10, 7, 9, 4, 15, 12, 90, 13}, K = 4 
// Output: 10 10 10 15 15 90 90
// Explanation: Maximum of first 4 elements is 10, similarly for next 4 
//                        elements (i.e from index 1 to 4) is 10, So the sequence 
//                        generated is 10 10 10 15 15 90 90


// ✅ TC: O(n),  SC: O(k)
function maxOfSubarrays(arr, K) {
    const result = [];
    const deque = []; // Stores indices of elements in the window

    for (let i = 0; i < arr.length; i++) {
        // Remove elements from the front that are out of the current window
        while (deque.length > 0 && deque[0] <= i - K) {
            deque.shift(); // ✅ O(n) (because of normal array implementation of deque)
        }

        // Remove elements from the deque that are smaller than the current element
        while (deque.length > 0 && arr[deque[deque.length - 1]] < arr[i]) {
            deque.pop();
        }

        // Add the current element's index to the deque
        deque.push(i);

        // The front of the deque is the maximum of the current window
        if (i >= K - 1) {
            result.push(arr[deque[0]]);
        }
    }

    return result;
}

// Test Cases
const arr1 = [1, 2, 3, 1, 4, 5, 2, 3, 6];
const K1 = 3;
console.log(maxOfSubarrays(arr1, K1).join(' ')); // Output: 3 3 4 5 5 5 6

const arr2 = [8, 5, 10, 7, 9, 4, 15, 12, 90, 13];
const K2 = 4;
console.log(maxOfSubarrays(arr2, K2).join(' ')); // Output: 10 10 10 15 15 90 90