function allocateMinPages(arr, k, n=arr.length){
    // Pre-processing 1-based prefix sums (useful for sum [st...end] in O(1) - while using)
    let prefixSums = new Array(n+1).fill(0)
    for(let i=1; i<n+1; i++){
        prefixSums[i] = prefixSums[i-1] + arr[i-1]
    }
    
    let dp = new Array(n+1)
    for(let i=0; i<n+1; i++){
        dp[i]=new Array(k+1).fill(Infinity)
    }
    
    // Base Cases:
    // 1. dp[0][k] --> If n=0 books, max pages = 0
    // 2. dp[n][1] --> If k=1 students, max pages = sum[0...n-1]
    for(let j=0; j<k+1; j++){
        dp[0][j] = 0
    }
    for(let i=1; i<n+1; i++){
        dp[i][1] = prefixSums[i]
    }
    
    for(let i=1; i<n+1; i++){ // Books
        for(let j=2; j<k+1; j++){ // Students
            for(let p=1; p<i; p++){ // Partition points
                let left = dp[p][j-1] // First p books for (j-1) students
                let right = prefixSums[i] - prefixSums[p] // Remaining Books [p...i-1] for jth student
                
                dp[i][j] = Math.min(dp[i][j], Math.max(left, right))
            }
        }
    }
    
    return dp[n][k]
}

console.log(allocateMinPages([10, 20, 30, 40], 2)); // 60 --> Student 1: [10, 20, 30] , Student 2: [40]
console.log(allocateMinPages([10, 20, 30], 1)); // 60
console.log(allocateMinPages([10, 5, 30, 1, 2, 5, 10, 10], 3)); // 30 --> Student 1: [10, 5] , Student 2: [30] , Student 3: [1, 2, 5, 10, 10]