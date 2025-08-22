// Problem: Find the amount of water that can be trapped between the bars.

// Efficient Sol (Two Pointers):
// ✅ TC = O(n)
// ✅ SC = O(1)
var trap = function(height) {
    let left = 0, right = height.length - 1;
    let left_max = 0, right_max = 0;
    let trapped_water = 0;
    
    while (left < right) {
        let left_height = height[left]
        let right_height = height[right]

        if (left_height < right_height) {
            if (left_height >= left_max) {
                left_max = left_height;
            } else {
                trapped_water += left_max - left_height;
            }
            left++;
        } else {
            if (right_height >= right_max) {
                right_max = right_height;
            } else {
                trapped_water += right_max - right_height;
            }
            right--;
        }
    }
    
    return trapped_water;
};

// Algorithm(short & main steps):
// 1) Initialize two pointers and running maxima:
//    left=0, right=n-1, left_max=0, right_max=0, trapped=0
// 2) While left < right:
//    - If height[left] < height[right]:
//        - If height[left] >= left_max: left_max = height[left]
//        - Else trapped += (left_max - height[left])
//        - left++
//      Else:
//        - If height[right] >= right_max: right_max = height[right]
//        - Else trapped += (right_max - height[right])
//        - right--
// 3) Return trapped

// Flow with example:
// Example: height = [4, 2, 0, 3, 2, 5]
// Start: left=0 (4), right=5 (5), left_max=0, right_max=0, water=0
// - Step 1: 4 < 5 → use left side
//   left_max = max(0,4)=4, add 0, left→1, water=0
// - Step 2: left=1 (2) vs right=5 (5) → left side
//   2 < left_max(4) → add 4-2=2, left→2, water=2
// - Step 3: left=2 (0) vs right=5 (5) → left side
//   0 < 4 → add 4-0=4, left→3, water=6
// - Step 4: left=3 (3) vs right=5 (5) → left side
//   3 < 4 → add 4-3=1, left→4, water=7
// - Step 5: left=4 (2) vs right=5 (5) → left side
//   2 < 4 → add 4-2=2, left→5, water=9
// Stop (left==right). Answer = 9


// Efficient but not better than above sol:
// ✅ TC = O(n) + O(n) + O(n) = O(3n) = O(n)
// ✅ SC = O(n)
var trap = function(height) {
    let n = height.length;
    let left_max = new Array(n);
    let right_max = new Array(n);
    
    // Step1: compute left_max
    left_max[0] = height[0]
    for(let i=1; i<n; i++){
        left_max[i] = Math.max(height[i], left_max[i-1])
    }
    
    // Step2: compute right_max
    right_max[n-1] = height[n-1]
    for(let i=n-2; i>=0; i--){
        right_max[i]=Math.max(height[i], right_max[i+1])
    }
    
    // Step3: compute trapped water
    let trapped = 0
    // first & last bars can't hold water above it
    for(let i=1; i<n-1; i++){
        trapped += Math.min(left_max[i], right_max[i]) - height[i]
    }
    
    console.log(trapped)
}