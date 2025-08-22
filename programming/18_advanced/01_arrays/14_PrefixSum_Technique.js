// Problem 1: Find the sum of a subarray in O(1) time

var arr = [2, 8, 3, 9, 6, 5, 4]
let n = arr.length
var prefixSums = new Array(n)
prefixSums[0] = arr[0]

// Pre-processing Time
// ✅ Tc = O(n)
for(let i=1; i<n; i++){
    prefixSums[i] = prefixSums[i-1]+arr[i]
}

// Query Time
// ✅ TC = O(1)
function getSum(l, r){
    if(l===0){
        console.log(prefixSums[r])
    }else{
        console.log(prefixSums[r] - prefixSums[l-1])
    }
}

getSum(0, 2) // 13 <-- pSum[2]
getSum(1, 3) // 20 <-- pSum[3] - pSum[0]
getSum(2, 6) // 27 <-- pSum[6] - pSum[1]