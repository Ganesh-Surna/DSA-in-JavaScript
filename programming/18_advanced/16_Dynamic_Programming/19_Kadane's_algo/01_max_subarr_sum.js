// Kadane's Algorithm

// 1. If asked to print max subarray sum ending at each index
// ✅ TC = O(n)
// ✅ SC = O(n)
function maximumSum(arr, n = arr.length) {
    let dp = new Array(n);
    let maxSoFar = arr[0];

    // dp[i] = max subarray sum ending at index i
    dp[0] = arr[0];

    for (let i = 1; i < n; i++) {
        // Either extend previous subarray or start fresh
        dp[i] = Math.max(arr[i], arr[i] + dp[i - 1]);
        maxSoFar = Math.max(maxSoFar, dp[i]);
    }

    console.log(dp);
    return maxSoFar;
}

console.log(maximumSum([5, -2, -3, 32, -5, 65])); // [5, 3, 0, 32, 27, 92] & 92
console.log(maximumSum([-9, -8, 8, 3, -4])); // [-9, -8, 8, 11, 7] & 11


// 2. If asked to print the max subarray sum
// ✅ TC = O(n)
// ✅ SC = O(1)
function maximumSum(arr, n = arr.length) {
    let max_ending_sum = arr[0];
    let maxSoFar = arr[0];

    for (let i = 1; i < n; i++) {
        // Either extend previous subarray or start fresh
        max_ending_sum = Math.max(arr[i], max_ending_sum + arr[i]);
        maxSoFar = Math.max(maxSoFar, max_ending_sum);
    }

    return maxSoFar;
}
console.log(maximumSum([5, -2, -3, 32, -5, 65])); // 92
console.log(maximumSum([-9, -8, 8, 3, -4])); // 11