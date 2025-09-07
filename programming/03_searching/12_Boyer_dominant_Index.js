// Problem: Find the index of the largest element that is 
// at least twice as large as every other number.

// Input: [3, 6, 1, 0]
// Output: 1 (since 6 is at least twice as large as 3, 1, and 0).


function dominantIndex(nums) {
    let max1 = -1, max2 = -1;
    let index = -1;

    // Find the two largest numbers (similar to Boyer-Moore)
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > max1) {
            max2 = max1;
            max1 = nums[i];
            index = i;
        } else if (nums[i] > max2) {
            max2 = nums[i];
        }
    }

    return max1 >= 2 * max2 ? index : -1;
}

console.log(dominantIndex([3, 6, 1, 0])); // Output: 1 (since 6 is at least twice as large as 3, 1, and 0).