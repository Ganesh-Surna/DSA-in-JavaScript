function minMatrixMultiplications(arr, i=0, j=arr.length-1){
    if(i+1 === j) return 0 // base case: only one matrix. No multiplication needed.

    let res = Infinity
    for(let k=i+1; k<j; k++){ // k is the partition point
        let left = minMatrixMultiplications(arr, i, k) // [i...k] means left matrix
        let right = minMatrixMultiplications(arr, k, j) // [k...j] means right matrix
        let curr = arr[i] * arr[k] * arr[j] // [i...k] * [k...j] = [i...j]
        res = Math.min(res, left + right + curr)
    }
    return res
}

console.log(minMatrixMultiplications([2, 1, 3, 4])); // 20 
console.log(minMatrixMultiplications([1, 2, 3])); // 6
console.log(minMatrixMultiplications([1, 2])); // 0 --> only one matrix. No multiplication needed.