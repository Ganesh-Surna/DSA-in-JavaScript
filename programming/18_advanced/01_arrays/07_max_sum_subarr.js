// Problem: Find the maximum sum of a subarray.
// Note: [] is valid subarray. but don't consider it for this problem.

// I. Efficient (Kadane's Algorithm):
// ✅ TC = O(n)
// ✅ SC = O(1)
function maxSumOfSubarrays(arr) {
    let n = arr.length;
    let max_ending_sum = arr[0]
    let res = max_ending_sum
    
    for(let i=1; i<n; i++){
        // 1. Either start new subarray from arr[i] OR extend current subarray
        max_ending_sum = Math.max(arr[i], max_ending_sum + arr[i])
        // 2. Update global maximum if current subarray is better
        res = Math.max(res, max_ending_sum)
    }
    
    console.log(res)
    
  }

// II. Efficient (Sliding Window):
// ✅ TC = O(n)
// ✅ SC = O(1)
function maxSumOfSubarrays(arr) {
  let n = arr.length;
  let sum = arr[0];
  let left = 0;

  for (let right = 1; right < n; right++) {
    sum += arr[right];

    // left < right, because if left == right, we get empty subarray
    // why not left <= right ? (ans: empty subarray has sum 0, not useful for max)
    while (sum - arr[left] > sum && left < right) {
      sum -= arr[left];
      left++;
    }
  }
  console.log(sum);
}


// Naive Sol:
// ✅ TC = O(n^2)
// ✅ SC = O(1)
function maxSumOfSubarraysNaive(arr) {
  let n = arr.length;
  let max_sum = arr[0]; // to have lower bound

  for (let i = 0; i < n; i++) {
    let curr = 0;
    for (j = i; j < n; j++) {
      curr += arr[j];
      max_sum = Math.max(max_sum, curr);
    }
  }
  console.log(max_sum);
}

let arr = [2, 3, -8, 7, -1, 2, 3]; // 11 = (7-1+2+3)
arr = [5, 8, 3]; // 16
arr = [-6, -1, -8]; // -1
maxSumOfSubarrays(arr);
