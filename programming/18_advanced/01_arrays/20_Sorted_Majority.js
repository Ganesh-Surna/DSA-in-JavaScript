// Problem : Given a sorted array arr[] of size N, 
// check if there is a majority element in the array.
// A majority element in an array of size N is an element 
// that appears more than N/2 times in the array.

/*
Key Insight: 
    In a sorted array,if an element appears more than n/2 times, 
    it must appear at the middle position (i.e., at index n/2). 
    This is because the array is sorted, 
    and if an element has a majority, it will span across the center. 
*/

// ✅ TC= O(log n)
// ✅ SC = O(1)
function isMajorityElement(arr, n) {
    // 1. Find the candidate element
    // In Sorted arr the candidate should be at mid index (because it should appear > n/2)
    let mid = Math.floor(n / 2);
    let candidate = arr[mid];
    
    // 2. Find first occurrence of candidate using binary search
    let low = 0;
    let high = mid;
    let firstOccurrence = mid;
    while (low <= high) {
        let middle = Math.floor((low + high) / 2);
        if (arr[middle] === candidate) {
            firstOccurrence = middle;
            high = middle - 1;
        } else if (arr[middle] < candidate) {
            low = middle + 1;
        }
    }
    
    // 3. Find last occurrence of candidate using binary search
    low = mid;
    high = n - 1;
    let lastOccurrence = mid;
    while (low <= high) {
        let middle = Math.floor((low + high) / 2);
        if (arr[middle] === candidate) {
            lastOccurrence = middle;
            low = middle + 1;
        } else if (arr[middle] > candidate) {
            high = middle - 1;
        }
    }
    
    let count = lastOccurrence - firstOccurrence + 1;
    return count > n / 2;
}

// Example usage:
let arr = [1, 2, 3, 3, 3, 3, 10];
let n = arr.length;
console.log(isMajorityElement(arr, n));  // Output: true (3 appears 4 times > 7/2=3.5)