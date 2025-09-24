// Problem 1: Find if there is a subarray with zero sum in arr.
// Problem 2: Find if there is a subarray with given sum in arr "without -ve numbers".
// Problem 3: Find if there is a subarray with given sum in arr "with -ve numbers".
// Problem 4: Find the smallest subarray length with sum ≥ target.
// Problem 5: Count the number of subarrays with zero sum.

// Prob1 - Sol:
// ✅ TC: O(n)
// ✅ SC: O(n)
function subarrWithZeroSum(arr) {
  let pSumsSet = new Set([0]);
  let pSum = 0;

  for (let num of arr) {
    pSum += num;
    if (pSumsSet.has(pSum)) {
      // if prefixSum is stayed same means, there exist a subarr with zero sum
      // (for any target sum we use pSumsSet.has(pSum - target_sum) --> here target_sum = 0)
      return true;
    }
    // else if(pSum === 0) return true // if we didn't add zero to set initially, then we need to add this condition

    pSumsSet.add(pSum);
  }

  return false;
}

let arr1 = [1, 4, 13, -3, -10, 5]; // true
arr1 = [3, 1, -2, 5, 6]; // false
arr1 = [-1, 4, -3, 5, 1]; // true
arr1 = [5, 6, 0, 8]; // true
console.log(subarrWithZeroSum(arr));

// Prob2 - Sol:
// ✅ TC = O(n)
// ✅ SC = O(1)
function subArrWithSum(arr, target_sum) {
  let n = arr.length;
  let sum = 0;
  let left = 0;

  for (let right = 0; right < n; right++) {
    sum += arr[right];

    /* if sum is greater than target_sum, remove the leftmost element and move the left pointer to the right
          until the sum is less than or equal to target_sum
          This is important to avoid the sum of elements being greater than target_sum
          and to avoid the sum of elements being less than target_sum
      */
    while (sum > target_sum) {
      // here no need to have && left <= right this condition
      sum -= arr[left];
      left++;
    }

    if (sum === target_sum) return true;
  }

  return false;
}

let arr = [1, 4, 20, 3, 10, 5],
  sum = 33; // true <-- [20, 3, 10]
(arr = [1, 4, 0, 0, 3, 10, 5]), (sum = 7); // true <-- [1, 4, 0, 0, 3]
(arr = [2, 4]), (sum = 3); // false
console.log(subArrWithSum(arr, sum));


// Prob3 - Sol: (Works for both with & without -ve numbers)
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

    prefixSums.add(prefixSum);
  }

  return false;
}
// With negative numbers (need different approach)
let arr2 = [10, 2, -2, -20, 10],
  sum2 = -10; // true <-- [-20, 10]
(arr = [1, 4, 20, 3, 10, 5]), (sum = 33); // true <-- [20, 3, 10]
console.log(subArrWithSumNegative(arr2, sum2));


// Prob4 - Sol:
// ✅ TC = O(n), ✅ SC = O(1)
function minSubArrayLen(target, nums) {
  let left = 0,
    sum = 0,
    minLen = Infinity;
  for (let right = 0; right < nums.length; right++) {
    // Expand the window from the right until sum >= target
    sum += nums[right];

    // Shrink the window from the left until sum < target
    while (sum >= target) {
      // Update the minimum length
      minLen = Math.min(minLen, right - left + 1);
      // Remove the leftmost element from the sum
      sum -= nums[left];
      // Move the left pointer by 1
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}

// Test Cases
let target1 = 7;
let nums1 = [2, 3, 1, 2, 4, 3];
console.log(minSubArrayLen(target1, nums1));
// Output: 2




/* Prob5 - Sol:  To count the number of subarrays with zero sum */
// ✅ TC = O(n) --> Single pass through array
// ✅ SC = O(n) --> Hash map for prefix sum frequencies
function findSubarray(arr) {
  let pSum = 0; // Prefix sum
  let freq = new Map(); // Frequency map for prefix sums
  let res = 0; // Result counter

  // Base case: one way to have sum 0 before starting. This handles subarrays starting from index 0
  freq.set(0, 1);

  for (let num of arr) {
    pSum += num; // Update prefix sum

    if (freq.has(pSum)) {
      // If we've seen this prefix sum before, we found zero sum subarrays
      res += freq.get(pSum); // Add all previous occurrences
    }

    // Update frequency of current prefix sum
    freq.set(pSum, (freq.get(pSum) || 0) + 1);
  }

  return res;
}
