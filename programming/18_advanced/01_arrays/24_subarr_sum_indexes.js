/*
Given an array arr[] containing only non-negative integers,
your task is to find a continuous subarray (a contiguous sequence of elements) whose sum equals a specified value target. 
You need to return the 1-based indices of the leftmost and rightmost elements of this subarray. 
You need to find the first subarray whose sum is equal to the target.

Note: If no such array is possible then, return [-1].
*/

// ✅ TC = O(n)
// ✅ SC = O(1)
function subarraySum(arr, target) {
    let n = arr.length
    
    let sum = 0;
    let left = 0;
    
    for(let i=0; i<n; i++){
        sum += arr[i]
        
        while(sum > target){
            sum -= arr[left]
            left++
        }
        
        if(sum === target){
            return [left+1, i+1]
        }
    }
    
    return [-1]
}