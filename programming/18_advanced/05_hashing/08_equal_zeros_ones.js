// Problem: Find the longest subarray with equal number of 0s and 1s in an array.

// ✅ TC = O(n), ✅ SC = O(n)   
function maxLenSubarrEqualOnesZeros(arr){
    let n = arr.length
    
    // ✅ 1. Replace every 0 with -1
    for(let i=0; i<n; i++){
        if(arr[i]===0){
            arr[i] = -1
        }
    }
    
    // ✅ 2. Find len of longest subarr with sum=0
    let pSum = 0;
    let pSumMap = new Map();
    
    let maxLen = 0;
    
    for(let i=0; i<n; i++){
        pSum += arr[i]
        
        if(pSum === 0){
            maxLen = i+1
        }
        if(pSumMap.has(pSum) === false){
            pSumMap.set(pSum, i)
        }
        if(pSumMap.has(pSum-0)){
            maxLen = Math.max(maxLen, i-pSumMap.get(pSum-0))
        }
    }
    
    return maxLen
}

let arr = [1, 0, 1, 1, 1, 0, 0]; // 6
arr = [1, 1, 1, 1]; // 0
arr = [0, 0, 1, 1, 1, 1, 0]; // 4
arr = [0, 0, 1, 0, 1, 1]; // 6
console.log(maxLenSubarrEqualOnesZeros(arr))