/* Problem:
Given an array arr[] of integers, 
find the minimum absolute difference between any two elements in the array.
*/

// ✅ TC = O(nlogn) --> For Sorting
// ✅ SC = O(1)
// ✅✅✅ (NOTE: If we are not allowed to modify the array, then we need to create a copy of the array, in that case SC = O(n))
function minDiff(arr){
    let n = arr.length
    let res = Number.POSITIVE_INFINITY
    
    // 1. Sort the array --> O(nlogn)
    arr.sort((a, b)=>a-b)
    
    // 2. Find the minimum difference --> O(n)
    for(let i=1; i<n; i++){
        res = Math.min(res, arr[i]-arr[i-1])
    }
    
    return res
}

let arr = [10, 2, 5]; // 3 (i.e, 5-2 = 3)
console.log(minDiff(arr))