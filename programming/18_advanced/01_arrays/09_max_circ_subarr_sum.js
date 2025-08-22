// Problem: Find the maximum sum of a circular subarray.

// Better than below sol: In single function (without helpers)
// (Using Kadane's Algorithm)
// ✅ TC = O(n)
// ✅ SC = O(1)
function maxCircSubarrSum(arr) {
  let n = arr.length;
  let sum = arr[0]; // To hold total sum of arr
  let max_ending_sum = arr[0], max_normal = arr[0]; // To hold max sum of normal subarr
  let min_ending_sum = arr[0], min_normal = arr[0]; // To hold min sum of normal subarr

  for (let i = 1; i < n; i++) {
    // 1. Sum of arr
    sum += arr[i];

    // 2. Max normal subarr sum
    max_ending_sum = Math.max(arr[i], max_ending_sum + arr[i]);
    max_normal = Math.max(max_normal, max_ending_sum);

    // 3. Min normal subarr sum
    min_ending_sum = Math.min(arr[i], min_ending_sum + arr[i]);
    min_normal = Math.min(min_normal, min_ending_sum);
  }

  // To handle all negatives array
  if (max_normal < 0) {
    return max_normal;
  }

  // max_normal is the max sum of normal subarr
  // sum - min_normal is the max sum of "ONLY circular subarr"
  // We need to return the max of these two
  return Math.max(max_normal, sum - min_normal);
}




// With Helpers
// Above is much better (because single traversal only)
// ✅ TC = O(n)
// ✅ SC = O(1)
function maxCircSubarrSum1(arr) {
  let max_normal_subarr_sum = maxNormalSubarrSum(arr);

  if (max_normal_subarr_sum < 0) {
    // To handle all negatives array
    return max_normal_subarr_sum;
  }

  return Math.max(max_normal_subarr_sum, maxOnlyCircSubarrSum(arr));
}

function maxNormalSubarrSum(arr) {
  let n = arr.length;
  let res = arr[0];
  let max_ending_sum = arr[0];

  for (let i = 1; i < n; i++) {
    max_ending_sum = Math.max(arr[i], max_ending_sum + arr[i]);
    res = Math.max(res, max_ending_sum);
  }

  return res;
}

function maxOnlyCircSubarrSum(arr) {
  return normalArrSum(arr) - minNormalSubarrSum(arr);
}

function normalArrSum(arr) {
  let n = arr.length;
  let sum = arr[0];
  for (let i = 1; i < n; i++) {
    sum += arr[i];
  }
  return sum;
}

function minNormalSubarrSum(arr) {
  let n = arr.length;
  let res = arr[0];
  let min_ending_sum = arr[0];

  for (let i = 1; i < n; i++) {
    min_ending_sum = Math.min(arr[i], min_ending_sum + arr[i]);
    res = Math.min(res, min_ending_sum);
  }

  return res;
}

let arr = [5, -2, 3, 4]; // 12 = 3+4+5
arr = [2, 3, -4]; // 5 = 2+3
arr = [8, -4, 3, -5, 4]; // 12 = 4+8
arr = [-3, 4, 6, -2]; // 10 = 4+6
arr = [3, -4, 5, 6, -8, 7]; // 17 = 7+3-4+5+6
console.log(maxCircSubarrSum(arr));
