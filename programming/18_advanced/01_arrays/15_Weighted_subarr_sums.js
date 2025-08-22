// Problem 1: Find the weighted sum of a subarray in O(1) time

var arr = [2, 3, 5, 4, 6, 1]
let n = arr.length
var pSums = new Array(n)
pSums[0] = arr[0]

var pWeightedSums = new Array(n)
pWeightedSums[0] = 1 * arr[0]

// Pre-processing
// ✅ Tc = O(n)
for(let i=1; i<n; i++){
    pSums[i] = pSums[i-1]+arr[i]
    pWeightedSums[i] = pWeightedSums[i-1] + (i+1) * arr[i] 
}
console.log("pSums: ", pSums)
console.log("pWeightedSums: ", pWeightedSums)

// Query Time
// ✅ TC = O(1)
function getWSum(l, r){
    if(l===0){
        let res = pWeightedSums[r]
        console.log(res)
    }else{
        // weighted_sum[l..r] = weighted_sum[0..r] - weighted_sum[0..l-1] - l * (sum[l..r])
        let res = pWeightedSums[r] - pWeightedSums[l-1] - l*(pSums[r]-pSums[l-1])
        console.log(res)
    }
}
// Test cases
console.log("Testing weighted sums:");
getWSum(0, 2); // Should be: 1*2 + 2*3 + 3*5 = 2 + 6 + 15 = 23 ✓
getWSum(2, 3); // Should be: 1*5 + 2*4 = 5 + 8 = 13 ✓
getWSum(1, 4); // Should be: 1*3 + 2*5 + 3*4 + 4*6 = 3 + 10 + 12 + 24 = 49
getWSum(3, 5); // Should be: 1*4 + 2*6 + 3*1 = 4 + 12 + 3 = 19