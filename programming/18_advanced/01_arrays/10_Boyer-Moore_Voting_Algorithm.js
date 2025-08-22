// Given an array arr[]. Find the majority element in the array. 
// If no majority element exists, return -1.

// Note: A majority element in an array is an element that 
// appears strictly more than arr.size()/2 times in the array.

// Expected Complexities : ✅ TC= O(n) & SC = O(1)

// ✅ Boyer-Moore Voting Algorithm:
class Solution {
    findMajority(arr) {
        let candidate = null;
        let count = 0;

        // 1. First pass to find the candidate
        for (const num of arr) {
            if (count === 0) {
                candidate = num;
                count = 1;
            } else if (num === candidate) {
                count++;
            } else {
                count--;
            }
        }

        // 2. Second pass to verify the candidate
        count = 0;
        for (const num of arr) {
            if (num === candidate) {
                count++;
            }
        }

        return count > arr.length / 2 ? candidate : -1;
    }
}