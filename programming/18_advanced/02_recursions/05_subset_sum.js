// Problem: Count subsets with sum equal to target
// Given an array of integers and a target sum, count the number of subsets that have a sum equal to the target.
// Example:
// Input: arr = [1, 2, 4, 8, 12, 16, 8, 15], target = 16
// Output: 4
// Explanation: The subsets that have a sum equal to 16 are: [16], [12, 4], [8, 8], [1, 15]
// Input: arr = [10, 5, 2, 3, 6], target = 8
// Output: 2
// Explanation: The subsets that have a sum equal to 8 are: [5, 3], [2, 6]

// ✅ TC = O(2^n)  ( T(n) = T(n-1) + T(n-1) --> O(2^n) )
// ✅ SC = O(n)  ( due to recursion stack )
function countSubsetsWithSum(arr, target, i=0){
    let c = 0

    if(i===arr.length){  // Stop when we have considered all elements
        if(target === 0){
            return 1 // count
        }
        return 0 // don't count
    }
    
    c += countSubsetsWithSum(arr, target, i+1) // exclude element
    c += countSubsetsWithSum(arr, target-arr[i], i+1) // include element
    
    return c
}

let arr = [1, 2, 4, 8, 12, 16, 8, 15], target = 16; // 4
arr = [10, 5, 2, 3, 6], target = 8; // 2

console.log(countSubsetsWithSum(arr, target))