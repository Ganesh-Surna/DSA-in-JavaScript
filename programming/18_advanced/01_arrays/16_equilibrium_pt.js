// Problem 1: Find the equilibrium point in an array.
// Equilibrium point is the point where the sum of elements before it is equal to the sum of elements after it.

// Efficient:
// ✅ TC = O(n) + O(n) = O(n)
// ✅ SC = O(1) ⭐⭐⭐⭐
function equilibriamPoint(arr){
    let n = arr.length
    let total_sum = 0
    for(let i=0; i<n; i++){
        total_sum += arr[i]
    }
    
    let prefix_sum = 0 // not prefix_sum"s"
    let sufix_sum = total_sum
    
    for(let i=0; i<n; i++){
        sufix_sum -= arr[i]
        if(prefix_sum === sufix_sum){
            console.log('Equilibrium pt idx: ', i)
            return true
        }
        
        prefix_sum += arr[i]
    }
    return false
}


// Efficient but not better than above sol(which uses SC=O(1))
// ✅ TC = O(n) + O(n) = O(n)
// ✅ SC = O(n) + O(n) = O(n)
function equilibriamPoint(arr){
    let n = arr.length
    
    let prefix_sums = new Array(n)
    prefix_sums[0] = arr[0]
    
    let sufix_sums = new Array(n)
    sufix_sums[n-1] = arr[n-1]
    
    for(let i=1; i<n; i++){
        prefix_sums[i] = prefix_sums[i-1] + arr[i]

        // No need to run a loop from n-2 to 0, we can use the same loop to calculate the suffix sums
        sufix_sums[n-1-i] = sufix_sums[n-1-i+1] + arr[n-1-i]
    }
    // for(let i=n-2; i>=0; i--){
    //     sufix_sums[i] = sufix_sums[i+1] + arr[i]
    // }
    
    for(let i=1; i<n-1; i++){
        if(prefix_sums[i-1] === sufix_sums[i+1]){
            console.log('Equilibrium pt idx: ', i)
            return true
        }
    }
    
    if(sufix_sums[1] === 0){
        console.log('Equilibrium pt idx: ', 0)
        return true
    }
    if(prefix_sums[n-2] === 0){
        console.log('Equilibrium pt idx: ', n-1)
        return true
    }
    
    return false
}

let arr = [3, 4, 8, -9, 20, 6] // true (20 - idx=4)
arr = [4, 2, -2] // true (4 - idx=0)
arr = [4, 2, 2] // false

console.log(equilibriamPoint(arr))