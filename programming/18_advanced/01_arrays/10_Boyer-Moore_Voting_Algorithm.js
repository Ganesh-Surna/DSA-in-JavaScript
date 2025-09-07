// Problem 1 : Given an array arr[]. Find the majority element in the array. 
//          If no majority element exists, return -1.

// Problem 2: Check is majority element in Sorted Array.

// Note: A majority element in an array is an element that 
// appears strictly more than arr.size()/2 times in the array.

// Expected Complexities : 

// Prob 1 - Sol:
// Boyer-Moore Voting Algorithm: (If Unsorted array)
// ✅ TC= O(n)
// ✅ SC = O(1)
function findMajority(arr) {
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

// Prob 2 - Sol:
// Binary Search Approach (If Sorted Array)
// ✅ TC= O(log n)
// ✅ SC = O(1)
function isMajorityElementInSortedArr(arr, n) {
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