// Note: XOR of a number with itself is 0 (x ^ x = 0)
// XOR of a number with 0 is the number itself (x ^ 0 = x)
// XOR is associative and commutative (i.e., x ^ y = y ^ x and (x ^ y) ^ z = x ^ (y ^ z)= x ^ y ^ z )

// Idea: XOR of all numbers will cancel out even occurring numbers and leave the odd occurring number

// I. Optimized Sol:
// ✅ TC = O(n)
// ✅ SC = O(1)  ( SC=O(n) if we use Map to solve this)
function oddOccurringNum(arr){
    let x = arr[0]
    for(let i=1; i<arr.length; i++){
        x = x ^ arr[i]
    }
    
    return x
}

let arr = [4, 4, 3, 4, 5, 5, 4] // 3 is odd occurring number
/*
    4 ^ 4 ^ 3 ^ 4 ^ 5 ^ 5 ^ 4
    = (4 ^ 4 ^ 4 ^ 4) ^ (3) ^ (5 ^ 5)
    = 0 ^ 3 ^ 0
    = 3
*/
console.log(oddOccurringNum(arr))