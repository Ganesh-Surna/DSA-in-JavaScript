// Minimum Size Subarray Sum
// Problem: Find the smallest subarray with sum ≥ target.

// Approach:
// Expand the window until sum >= target, then shrink from the left.


// ✅ TC = O(n), ✅ SC = O(1)
function minSubArrayLen(target, nums) {
    let left = 0, sum = 0, minLen = Infinity;
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
let target1 = 7
let nums1 = [2, 3, 1, 2, 4, 3]
console.log(minSubArrayLen(target1, nums1))
// Output: 2

// Flow:
// right=0: [2] sum=2, left=0, minLen=∞
// right=1: [2,3] sum=5, left=0, minLen=∞
// right=2: [2,3,1] sum=6, left=0, minLen=∞
// right=3: [2,3,1,2] sum=8 >= 7, minLen=4, left=1, sum=6
// right=4: [3,1,2,4] sum=10 >= 7, minLen=4, left=2, 
//                    sum=7 >= 7, minLen=3, left=3, sum=6
// right=5: [2,4,3] sum=9 >= 7, minLen=3, left=4, sum=7 >= 7, minLen=2, left=5, sum=3
// Final result: 2 (subarray [4,3] with sum 7)

let target2 = 99
let nums2 = [1, 2, 3, 4, 5, 100]
console.log(minSubArrayLen(target2, nums2))
// Output: 1

// Flow:
// right=0: [1] sum=1, left=0, minLen=∞
// right=1: [1,2] sum=3, left=0, minLen=∞
// right=2: [1,2,3] sum=6, left=0, minLen=∞
// right=3: [1,2,3,4] sum=10, left=0, minLen=∞
// right=4: [1,2,3,4,5] sum=15, left=0, minLen=∞
// right=5: [1,2,3,4,5,100] sum=115 >= 99, minLen=6, left=1, sum=114 >= 99, minLen=5, left=2, sum=112 >= 99, minLen=4, left=3, sum=109 >= 99, minLen=3, left=4, sum=105 >= 99, minLen=2, left=5, sum=100 >= 99, minLen=1, left=6, sum=0
// Final result: 1 (subarray [100] with sum 100)

let target3 = 99
let nums3 = [1, 2, 99, 4, 90, 9]
console.log(minSubArrayLen(target3, nums3))
// Output: 1

// Flow:
// right=0: [1] sum=1, left=0, minLen=∞
// right=1: [1,2] sum=3, left=0, minLen=∞
// right=2: [1,2,99] sum=102 >= 99, minLen=3, left=1, sum=101 >= 99, minLen=2, left=2, sum=99 >= 99, minLen=1, left=3, sum=0
// right=3: [4] sum=4, left=3, minLen=1
// right=4: [4,90] sum=94, left=3, minLen=1
// right=5: [4,90,9] sum=103 >= 99, minLen=3, left=4, sum=99 >= 99, minLen=2, left=5, sum=9
// Final result: 1 (subarray [99] with sum 99)



let see_Below_For_Better_Understanding;
//✅ Is TC=O(n^2) for test case 2? (answer: NO)
// You're absolutely right to question this! 
// Let me clarify why the time complexity is O(n) (linear) and not O(n²) (quadratic),
//  even in cases where the left pointer moves multiple times.

// Key Insight: Each element is processed at most twice
// * The "right" pointer touches each element once while expanding the window.
// * The "left" pointer touches each element at most once while shrinking the window.

// Thus, total operations ≈ 2n → O(n).

// Your Example: nums = [1, 2, 3, 4, 5, 100], target = 99
// Let’s count the operations:

// Expansion Phase (right moves forward):
//      right=0: sum=1
//      right=1: sum=3
//      right=2: sum=6
//      right=3: sum=10
//      right=4: sum=15
//      right=5: sum=115 (now sum ≥ 99)
// Total so far: 6 operations (one per element).

// Shrinking Phase (left moves forward):
//      sum=115 → shrink left (sum -= 1 → sum=114)
//      sum=114 → shrink left (sum -= 2 → sum=112)
//      sum=112 → shrink left (sum -= 3 → sum=109)
//      sum=109 → shrink left (sum -= 4 → sum=105)
//      sum=105 → shrink left (sum -= 5 → sum=100)
//      sum=100 → shrink left (sum -= 100 → sum=0)
// Total shrinking steps: 6 operations (one per element).

// ✅ Total operations = 6 (expand) + 6 (shrink) = 12 (for n=6) → O(2n) ≈ O(n).

// ⭐ In a true O(n²) algorithm (like nested loops), each element would be compared with every other element, leading to n × n = n² operations.
// ⭐ Here, each element is only processed twice at most (once by right, once by left), so it’s O(n).


// ⭐⭐⭐ Edge Case Where It Feels Like O(n²)
// If nums = [100, 100, 100, ..., 100] and target = 100, the left pointer moves every time right moves, but even then:

// right processes n elements.
// left processes n elements (but only once per element).
// → Still O(2n) = O(n).