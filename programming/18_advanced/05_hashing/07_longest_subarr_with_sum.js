// Problem: Find the longest subarray with a given sum in an array.

// ✅ TC = O(n), ✅ SC = O(n)
function maxLenSubarrWithSum(arr, target){
    let n = arr.length
    let pSum = 0;
    let pSumMap = new Map();
    
    let maxLen = 0;
    
    for(let i=0; i<n; i++){
        let num = arr[i]
        pSum += num
        if(pSum === target){ // Means the start index of subarr is 0, end Index is i. So len = i+1
            maxLen = i+1
        }
        if(pSumMap.has(pSum) === false){ //Ensures only update the start index of subarr only if the key(pSum) does not exist. Do not update the value if the key(pSum) already exist because we need longest subarr
            pSumMap.set(pSum, i)
        }
        if(pSumMap.has(pSum - target)){ // Start index of subarr is somewhere but not 0
            // ✅ pSumMap.get(pSum-target) is the index just before the start of subarr (start index of subarr - 1). That is why we are not adding 1 to index difference to get len.
            maxLen = Math.max(maxLen, i - pSumMap.get(pSum-target))
        }
        
    }
    
    return maxLen
}

let arr = [10, 2, -2, -20, 10], sum = -10; // 4 <-- [10, 2, -2, -20], [-20, 10]
arr = [5, 8, -4, -4, 9, -2, 2], sum = 0; // 3
arr = [3, 1, 0, 1, 8, 2, 3, 6], sum = 5; // 4
arr = [8, 3, 7], sum = 15; // 0
arr = [5, 2, 3, 4], sum = 5; // 2
console.log(maxLenSubarrWithSum(arr, sum))