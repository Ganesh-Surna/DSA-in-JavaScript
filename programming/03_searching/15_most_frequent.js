// Problem: Find the element with the highest frequency
//  (not necessarily majority).

// Input: [1, 3, 2, 2, 3, 2]
// Output: 2

// We can use Hash Map instead of Standard Object for better performance.
function mostFrequent(nums) {
  const freq = {};
  let maxCount = 0;
  let candidate = nums[0];

  for (const num of nums) {
    freq[num] = (freq[num] || 0) + 1;
    if (freq[num] > maxCount) {
      maxCount = freq[num];
      candidate = num;
    }
  }
  return candidate;
}
