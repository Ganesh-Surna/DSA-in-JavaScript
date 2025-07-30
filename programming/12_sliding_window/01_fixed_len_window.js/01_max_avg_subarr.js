// Maximum Average Subarray I
// Problem: Find the contiguous subarray of length k with the maximum average.

// Approach:
// Slide a window of size k and track the maximum sum.

// ✅ TC = O(n), ✅ SC = O(1)
function findMaxAverage(nums, k) {
    let sum = 0;
    for (let i = 0; i < k; i++) sum += nums[i];
    let maxSum = sum;
    for (let i = k; i < nums.length; i++) {
        // Remove the first element of the previous window (i-k)
        // Add the current element to the window (i)
        // Update the maximum sum
        sum += nums[i] - nums[i - k];
        maxSum = Math.max(maxSum, sum);
    }
    return maxSum / k;
}

// Test Cases
let nums = [1, 12, -5, -6, 50, 3]
let k = 4
console.log(findMaxAverage(nums, k))
// Output: 12.75