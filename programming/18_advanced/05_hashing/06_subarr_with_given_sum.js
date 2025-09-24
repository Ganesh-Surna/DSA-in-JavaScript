// ✅✅✅✅ Prob1 - Sol: (Works for both with & without -ve numbers)
  // ✅ TC = O(n), ✅ SC = O(n)
  function subArrWithSumNegative(arr, target_sum) {
    let prefixSum = 0;
    let prefixSums = new Set([0]); // Start with prefix sum 0
    
    for (let num of arr) {
      prefixSum += num;
      
      // Check if (prefixSum - target_sum) exists in our set
      if (prefixSums.has(prefixSum - target_sum)) {
        return true;
      }
      // else if(prefixSum === target_sum) return true // if we didn't add zero to set initially, then we need to add this condition

      
      prefixSums.add(prefixSum);
    }
    
    return false;
}
// With negative numbers (need different approach)
let arr2 = [10, 2, -2, -20, 10], sum2 = -10 // true <-- [-20, 10]
arr2 = [1, 4, 20, 3, 10, 5], sum2 = 33; // true <-- [20, 3, 10]
console.log(subArrWithSumNegative(arr2, sum2));





// ✅✅✅✅ Prob2 - Sol: (Return the starting and ending index of the 1st subarray with given sum)
// ✅ TC = O(n), ✅ SC = O(n)
function subarrWithSum(arr, target) {
    let n = arr.length;
    let pSum = 0;
    let pSumMap = new Map();
    pSumMap.set(0, -1); // Initialize with prefix sum 0 at index -1

    for (let i = 0; i < n; i++) {
        pSum += arr[i];
        if (pSumMap.has(pSum - target)) {
            let start = pSumMap.get(pSum - target) + 1;
            return `From ${start} to ${i}`;
        }
        // Only store the first occurrence of a prefix sum to get the longest subarray
        if (!pSumMap.has(pSum)) {
            pSumMap.set(pSum, i);
        }
    }
    return -1;
}

// OR

function subarrWithSum(arr, target) {
    let n = arr.length;
    let pSum = 0;
    let pSumMap = new Map();

    for (let i = 0; i < n; i++) {
        pSum += arr[i];

        // Case 1: Subarray from start
        if (pSum === target) {
            return `From 0 to ${i}`;
        }

        // Case 2: Subarray from some index j+1 to i
        if (pSumMap.has(pSum - target)) {
            return `From ${pSumMap.get(pSum - target) + 1} to ${i}`;
        }

        // Store current prefix sum
        if(pSumMap.has(pSum)===false){
            pSumMap.set(pSum, i);
        }
    }
    return -1;
}

let arr = [11, 2, -2, -20, 10], sum = -10 // From 1 to 4 <-- [-20, 10]
arr = [10, 2, -2, -20, 10], sum = -10 // From 0 to 3 <-- [10, 2, -2, -20]
arr = [1, 4, 20, 3, 10, 5], sum = 33; // From 2 to 4 <-- [20, 3, 10]
console.log(subarrWithSum(arr, sum))



/* ✅✅✅✅ Prob3 : 
Given an unsorted array of integers arr[], and a target tar, 
determine the number of subarrays whose elements sum up to the target value.

Input: arr = [10, 2, -2, -20, 10], tar = -10
Output: 3
Explanation: There are three subarrays with sum -10:
[-20, 10], [2, -2, -20, 10], and [-20, 10, 2, -2]

Input: arr = [1, 4, 20, 3, 10, 5], tar = 33
Output: 1
Explanation: There is only one subarray with sum 33: [20, 3, 10]
*/

// ✅ TC = O(n), ✅ SC = O(n)
function subArraySum(arr, tar) {
    let pSum = 0;
    let pSumFreq = new Map();
    let res = 0;
    
    // Initialize with prefix sum 0 having frequency 1
    pSumFreq.set(0, 1);
    
    for (let i = 0; i < arr.length; i++) {
        pSum += arr[i];
        
        // Check if (pSum - tar) exists and add its frequency to result
        if (pSumFreq.has(pSum - tar)) {
            res += pSumFreq.get(pSum - tar);
        }
        
        // Update the frequency of current prefix sum
        pSumFreq.set(pSum, (pSumFreq.get(pSum) || 0) + 1);
    }
    
    return res;
}